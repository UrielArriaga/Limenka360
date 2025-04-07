import React, { useContext, useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { ShippingsOrdersServices } from "../services";
import { useRouter } from "next/router";
import { getColorStatusSHOPPINGORDER } from "../../../utils/DirLog";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

export default function useShippingOrders(activeFilters) {
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { roleId } = useSelector(userSelector);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("provider.name");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState();
  const [orderSelected, setOrderSelected] = useState(null);

  console.log(orderSelected);
  const [totalOrders, setTotalOrders] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [dataProducts, setDataProducts] = useState({
    isFeching: false,
    data: [],
    count: 0,
  });

  const {
    page: pageProduct,
    limit: limitProduct,
    handlePage: handlePageProduct,
  } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const router = useRouter();
  const ordersService = new ShippingsOrdersServices();

  useEffect(() => {
    getData();
  }, [page, orderBy, keyword, activeFilters]);

  useEffect(() => {
    if (orderSelected) {
      getProducts(orderSelected?.id);
    } else {
      return;
    }
  }, [orderSelected]);

  const getData = async () => {
    try {
      setIsFetchingData(true);
      let query = {
        national: roleId === "compras" ? true : false,
      };

      if (activeFilters.length > 0) {
        activeFilters.forEach(element => {
          if (element.parent) {
            switch (element.parent) {
              case "draft":
                query[element.parent] = element.value === "Mostrar Borradores" ? true : false;
                break;
              case "providers":
                query[element.valuedb] = element.value;
                break;
            }
          }
        });
      }
      if (keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword,
        };
      }
      const response = await ordersService.getShippingsOrders(limit, page, orderBy, query);
      let results = response.data.results;
      console.log("37", results);
      let normalizeData = results.map(item => ordersService.normalizeDataOrdersShipping(item));
      setData(normalizeData);
      setTotalOrders(response.data.count);
      setIsFetchingData(false);
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrio un error al obtener ordenes de compra");
      setIsFetchingData(false);
    }
  };

  const getProducts = async id => {
    try {
      setDataProducts({ ...dataProducts, isFeching: true });
      let query = {
        purchaseorderId: id,
      };

      let response = await ordersService.getSupplies(limitProduct, pageProduct, query);
      console.log("productos", response);
      let resultsProducts = response.data.results;
      let normalizeDataProducts = resultsProducts.map(item => ordersService.normalizeDataProduct(item));
      setDataProducts({ isFeching: false, data: normalizeDataProducts, count:response.data.count });
    } catch (error) {
      setDataProducts({...dataProducts, isFeching:false});
      console.log(error);
    }
  };

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => setKeyword("");

  const refetchData = () => getData();

  const handleClickName = item => {
    router.push({
      pathname: "/comprasinternacional/ordenes/[orden]",
      query: {
        orden: item.id,
      },
    });
  };

  let actions = [
    {
      name: "Ver",
      action: e => {
        handleClickName(e);
      },
    },
    {
      name: "Editar",
      action: e =>
        router.push({
          pathname: `/comprasinternacional/ordenes/editarorden`,
          query: {
            o: e?.id,
          },
        }),
    },
  ];
  return {
    isOpenPreview,
    orderSelected,
    keyword,
    isFetchingData,
    orderBy,
    tableData: {
      heads,
      actions,
      data,
      customColumns,
    },
    paginationData: {
      handlePage,
      page,
      limit,
    },
    totalOrders,
    setOrderBy,
    handleOnClickRow,
    handleOnClickClosePreview,
    handleOnChangeKeyWord,
    deleteKeyWord,
    refetchData,
    dataProducts,
  };
}

let heads = [
  {
    headText: "Folio",
    headNormalize: "folio",
    orderby: null,
  },

  {
    headText: "Estatus Orden",
    headNormalize: "statuspoo",
    orderby: null,
  },

  {
    headText: "Proveedor",
    headNormalize: "proveedor",
    orderby: null,
  },
  {
    headText: "Condicion",
    headNormalize: "condicion",
    orderby: null,
  },
  {
    headText: "Telefono",
    headNormalize: "telefono",
    orderby: null,
  },
  {
    headText: "Observaciones",
    headNormalize: "observaciones",
    orderby: null,
  },
  {
    headText: "Metodo de entrega",
    headNormalize: "metodo de entrega",
    orderby: null,
  },
  {
    headText: "Fecha de creacion",
    headNormalize: "fecha de creacion",
    orderby: null,
  },
];

const customColumns = {
  folio: {
    columname: "folio",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            style={{
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.folio}
          </p>
          {/* {console.log("iotem", item)} */}
          {item?.item?.draft && <span className="badge">Borrador</span>}
        </div>
      );
    },
  },

  statuspoo: {
    columname: "Estatus",
    component: item => {
      return (
        <div
          className="TableName"
          style={{
            display: "inline-block",
            padding: "2px 10px",
            borderRadius: 15,
            background: getColorStatusSHOPPINGORDER(item.statuspoo).bgColor,
          }}
        >
          <p
            className="name"
            style={{
              color: getColorStatusSHOPPINGORDER(item.statuspoo).color,
            }}
            onClick={() => {}}
          >
            {item.statuspoo}
          </p>
        </div>
      );
    },
  },
};
