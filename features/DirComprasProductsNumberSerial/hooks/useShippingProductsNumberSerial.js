import React, { useEffect, useState } from "react";
import { ProductsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

export default function useShippingProductsNumberSerial(
  openDrawer,
  setSelectItemProduct,
  optionsFilterSelected,
  selectItemProduct
) {
  let heads = [
    {
      headText: "Numero de Serie",
      headNormalize: "serial",
      orderby: null,
    },
    {
      headText: "Código",
      headNormalize: "code",
      orderby: null,
    },
    {
      headText: "Nombre",
      headNormalize: "name",
      orderby: null,
    },
  ];

  let actions = [
    {
      name: "Editar",
      action: e => {
        toggleModal();
        setSelectItemProduct(e);
      },
    },
  ];

  const customColumns = {
    code: {
      columname: "Código",
      component: item => {
        return (
          <div className="TableName">
            <p
              className="name"
              style={{
                color: "#034D6F",
                fontWeight: "bold",
              }}
              onClick={() => {}}
            >
              {item.code}
            </p>
          </div>
        );
      },
    },
  };
  const { id_user } = useSelector(userSelector);
  const { open, toggleModal } = openDrawer;
  const productsService = new ProductsServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 60, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("createdAt");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [orderSelected, setOrderSelected] = useState(null);
  const [dataAllProducts, setDataAllProducts] = useState({
    data: [],
    fetching: false,
    count: 0,
  });
  const router = useRouter();

  useEffect(() => {
    if (open == false) getData();
  }, [page, orderBy, keyword, optionsFilterSelected, open, selectItemProduct]);

  const getData = async () => {
    try {
      setIsFetchingData(true);
      setDataAllProducts({ ...dataAllProducts, fetching: true });
      let query = {};

      query = buildQuery();
      if (keyword.length > 3) {
        query.name = {
          $iRegexp: keyword.trim(),
        };
      }

      const response = await productsService.getProducts(limit, page, orderBy, query);
      console.log("hgfhhgjrtg--->", response.data.results);

      let { results, count } = response?.data;
      let normalizeData = results?.map(item => productsService.normalizeDataOrders(item));
      setDataAllProducts({ data: normalizeData, fetching: false, count });
      setIsFetchingData(false);
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrio un error al obtener los productos");
      setIsFetchingData(false);
      setDataAllProducts({ ...dataAllProducts, fetching: false });
    }
  };

  const buildQuery = () => {
    let query = {};
    query.purchaseorderId = { $not: null };
    query.productId = { $not: null };
    for (let i = 0; i < optionsFilterSelected.length; i++)
      if (optionsFilterSelected[i].parent) query[optionsFilterSelected[i].valuedb] = optionsFilterSelected[i].value;
    return query;
  };
  const handleOnClickRow = item => {
    console.log(item, "----->");

    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => setKeyword("");

  const refetchData = () => getData();

  const createWarranty = async data => {
    try {
      let body = {
        comments: data?.Descriptions,
        warehouseproductId: orderSelected?.data?.id,
        purchaseorderId: orderSelected?.data?.purchaseorderId,
        createdbyId: id_user,
        reasonwarrantyId: data?.reason?.id,
      };
      let response = await productsService.postWarranty(body);
      if (response.status == 200 || response.status == 201) {
        showAlertSucces("Garantia generada.");
        getData();
      }
    } catch (error) {
      console.log(error, "error");
      showAlertError("Error al generar la garantia");
    }
  };

  return {
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleOnClickClosePreview,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    setIsFetchingData,
    orderSelected,
    handleOnClickRow,
    isFetchingData,
    refetchData,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data: dataAllProducts,
      customColumns,
    },
    router,
    createWarranty,
  };
}
