import React, { useContext, useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import { ShippingsOrdersServices } from "../services";
import { useRouter } from "next/router";
import dayjs from "dayjs";

export default function useShippingOrders(activeFilters) {
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("provider.name");
  const [keyword, setKeyword] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [data, setData] = useState();
  const [orderSelected, setOrderSelected] = useState(null);
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
  const folioParamUrl = router?.query?.folio;
  const ordersService = new ShippingsOrdersServices();

  useEffect(() => {
    getData();
  }, [page, orderBy, keyword, activeFilters, folioParamUrl]);

  useEffect(() => {
    if (orderSelected) {
      getProducts(orderSelected?.id);
    } else {
      return;
    }
  }, [orderSelected]);

  const getData = async removeKeyword => {
    try {
      setIsFetchingData(true);
      let query = {
        delivered: true,
        draft: false,
      };

      if (activeFilters.length > 0) {
        activeFilters.forEach(element => {
          if (element.parent) {
            switch (element.parent) {
              case "draft":
                query[element.parent] = element.value === "Mostrar Borradores" ? true : false;
                break;
              case "dates":
                if (element.option.id === "range") {
                  query[element.valuedb] = {
                    $gte: element.option?.value?.startDate,
                    $lt: element.option?.value?.endDate,
                  };
                  return;
                }

                query[element.valuedb] = {
                  $gte: dayjs().startOf(element?.option?.id).format(),
                  $lt: dayjs().endOf(element?.option?.id).format(),
                };

                break;
            }
          }
        });
      }
      if (!removeKeyword && keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }
      if (!removeKeyword && folioParamUrl) {
        query.folio = {
          $iRegexp: folioParamUrl,
        };
        setKeyword(folioParamUrl);
      }

      const response = await ordersService.getShippingsOrders(limit, page, orderBy, query);
      let results = response.data.results;
      let normalizeData = results.map(item => ordersService.normalizeDataOrdersShipping(item));
      setData(normalizeData);
      setTotalOrders(response.data.count);
      setIsFetchingData(false);
      if (folioParamUrl) {
        let order = normalizeData?.find(item => item.folio === folioParamUrl);
        if (order) handleOnClickRow(order);
      }
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
      let resultsProducts = response.data.results;
      let normalizeDataProducts = resultsProducts.map(item => ordersService.normalizeDataProduct(item));
      setDataProducts({ ...dataProducts, isFeching: false, data: normalizeDataProducts });
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);

  const handleOnClickRow = item => {
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const deleteKeyWord = () => {
    setKeyword("");
    getData(true);
    delete router?.query;
    if (folioParamUrl) router.push("ordenesdecompra");
  };

  const refetchData = () => getData();

  const handleClickName = item => {
    router.push({
      pathname: "/administracionalmacen/ordenesdecompra/[orden]",
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
    headText: "Entregado",
    headNormalize: "entregado",
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
    orderby: "-createdAt",
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
  entregado: {
    columname: "entregado",
    component: item => {
      return (
        <div className="TableName">
          <p
            className="name"
            style={{
              fontWeight: "bold",
              backgroundColor: "#13e36e",
              color: "green",
              padding: "3px",
              borderRadius: "5px",
            }}
          >
            {item.entregado}
          </p>
        </div>
      );
    },
  },
};
