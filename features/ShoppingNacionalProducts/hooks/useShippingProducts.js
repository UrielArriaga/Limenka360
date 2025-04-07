import React, {useEffect, useState } from "react";
import { ProductsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { useRouter } from "next/router";

export default function useShippingProducts(openDrawer, setSelectItemProduct, optionsFilterSelected) {
  let heads = [
    {
      headText: "Código",
      headNormalize: "code",
      orderby: null,
    },
    {
      headText: "Nombre",
      headNormalize: "name",
      orderby: "-name",
    },
    {
      headText: "Stock",
      headNormalize: "stock",
      orderby: null,
    },
    {
      headText: "Proveedor",
      headNormalize: "providerId",
      orderby: null,
    },
    {
      headText: "Precio Unitario",
      headNormalize: "amount",
      orderby: null,
    },
    {
      headText: "Precio Tienda",
      headNormalize: "storeamount",
      orderby: null,
    },
    {
      headText: "Estado del producto",
      headNormalize: "isactive",
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
      isactive: {
        columname: "Estado del producto",
        component: item => {  
          return (
            <div className="TableName">
              <p
                className="name"
                style={{
                  color: item.isactive === true ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {item.isactive === true ? "Activo" : "Inactivo"}
              </p>
            </div>
          );
        },
      },
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
    stock: {
      columname: "Stock",
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
              {item.stock}
            </p>
          </div>
        );
      },
    },
    providerId: {
      columname: "Proveedor",
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
              {item.providerId}
            </p>
          </div>
        );
      },
    },
  };
  
  const { open, toggleModal } = openDrawer;
  const productsService = new ProductsServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 60, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("id");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [selecteProduct, setSelecteProduct]= useState("code");
  const [dataAllProducts, setDataAllProducts] = useState({
    data:[],
    fetching:false,
    count:0
  })
  const router = useRouter();

  const handleSelectedProduct = event =>{
    setSelecteProduct(event.target.value);
  };

  useEffect(() => {
    if(open == false) getData();
  }, [page, orderBy, keyword, optionsFilterSelected, open, selecteProduct]);

  const getData = async () => {
    try {
      setDataAllProducts({...dataAllProducts, fetching:true});
      let query = {};
      query = buildQuery();
      if (keyword.length > 3) {
        query = {[selecteProduct]: {$iRegexp: keyword.trim()}}
        };
      

      const response = await productsService.getProducts(limit, page, orderBy, query);
      let { results, count } = response?.data;
      let normalizeData = results?.map(item => productsService.normalizeDataOrders(item));
      setDataAllProducts({data:normalizeData, fetching:false, count });
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrio un error al obtener los productos");
      setDataAllProducts({...dataAllProducts, fetching:false});
    }
  };

  const buildQuery = () => {
    let query = {};
    for (let i = 0; i < optionsFilterSelected.length; i++)
      if (optionsFilterSelected[i].parent) query[optionsFilterSelected[i].valuedb] = optionsFilterSelected[i].value;
    return query;
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => setKeyword("");

  const refetchData = () => getData();

  return {
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleOnClickClosePreview,
    orderBy,
    setOrderBy,
    keyword,
    isOpenPreview,
    refetchData,
    handleSelectedProduct,
    selecteProduct,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data:dataAllProducts,
      customColumns,
    },
    router,
  };
}
