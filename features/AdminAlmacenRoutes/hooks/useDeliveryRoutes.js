import React, { useEffect } from "react";
import { useState } from "react";
import DeliveryRoutesApi from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";
import useAlertToast from "../../../hooks/useAlertToast";
import dayjs from "dayjs";

export default function useDeliveryRoutes(activeFilters) {
  const DeliveryRouteService = new DeliveryRoutesApi();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();

  const [routeData, setRouteData] = useState({});

  const [orderBy, setOrderBy] = useState("-assigned_date");
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [routeSelected, setRouteSelected] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [orderSelectedData, setOrderSelectedData] = useState({
    data: {},
    isfetching: false,
  });
  // Rutas
  const [dataRoutes, setDataRoutes] = useState({
    data: [],
    isfetching: false,
    count: 0,
    isError: false,
    errorMessage: "",
  });
  const [tabSeletect, setTabSeletect] = useState("infoProduct");
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);

  const handleOnClickTab = tab => setTabSeletect(tab);

  const handleOnClickRowRoutes = item => {
    setRouteSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);
  const deleteKeyWord = () => setKeyword("");

  // RUTAS
  useEffect(() => {
    fetchDeliveryRoutes();
  }, [page, limit, orderBy, activeFilters, keyword]);

  useEffect(() => {
    if (routeSelected == null) {
      return;
    }
    getOrdenByRoute();
  }, [routeSelected]);

  const getOrdenByRoute = async () => {
    console.log(routeSelected);
    try {
      // setOrderSelectedData({ ...orderSelectedData, isfetching: true });
      // let response = await DeliveryRouteService.getOrder(routeSelected?.data?.orderId);
      // console.log(response, " response");
      // setOrderSelectedData({ data: response.data, isfetching: false });
      setIsFetchingOrder(true);
      let res = await DeliveryRouteService.getDeliveryRouteById(routeSelected?.id);
      console.log(res);

      setRouteData(res?.data);

      // setRouteSelected(res?.data);
      setIsFetchingOrder(false);
    } catch (error) {
      setIsFetchingOrder(false);
      // setOrderSelectedData({ ...orderSelectedData, isfetching: false });
      console.log(error, "Error get orden by route");
    }
  };

  const fetchDeliveryRoutes = async () => {
    try {
      // falta construir la query en base a los filtros activeFilters
      let query = {};

      if (activeFilters.length > 0) {
        activeFilters.forEach(element => {
          if (element.parent) {
            switch (element.parent) {
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
                case "transportunits":
                query[element.valuedb] = element.value;
                break;
            }
          }
        });
      }

      setDataRoutes({ ...dataRoutes, isfetching: true });
      let responseRoutes = await DeliveryRouteService.getDeliveryRoutes(limit, page, orderBy, query);
      let routes = responseRoutes?.data?.results || [];
      const normalize = routes.map(DeliveryRouteService.normalizeDeliveryRoutes);
      setDataRoutes({ ...dataRoutes, isfetching: false, data: normalize, count: responseRoutes?.data?.count });
    } catch (error) {
      console.log(error, "Error get routes");
      setDataRoutes({ ...dataRoutes, isfetching: false, isError: true, errorMessage: error });
    }
  };
  const refetchData = () => fetchDeliveryRoutes();

  const handleOnClickSaveDelivery = async data => {
    let body = {
      delivered: true,
    };
    console.log(body, " body to put");
    try {
      let response = await DeliveryRouteService.putDeliveryRoute(data.id, body);
      console.log(response, " result");
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Se actualizo a entregado");
        setRouteSelected(response?.data?.deliveryroute);
        refetchData();
      }
    } catch (error) {
      console.log(error, "Error put delivery");
      showAlertError("Ocurrio un error al actualizar");
    }
  };

  return {
    handleOnClickClosePreview,
    isOpenPreview,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    setOrderBy,
    refetchData,
    orderBy,
    handleOnChangeKeyWord,
    keyword,
    deleteKeyWord,

    // RUTAS
    routeSelected,
    handleOnClickRowRoutes,
    tableDataRoutes: {
      allData: dataRoutes,
      data: dataRoutes?.data,
      heads: headsRoutes,
      customColumns: customColumnsRoutes,
    },
    handleOnClickSaveDelivery,
    tabSeletect,
    handleOnClickTab,
    orderSelectedData,
  };
}

let customColumnsRoutes = {
  name: {
    columname: "name",
    component: item => {
      return (
        <div className="TableName">
          <Tooltip title={item.name}>
            <p
              style={{
                textTransform: "uppercase",
              }}
            >
              {item.name}
            </p>
          </Tooltip>
        </div>
      );
    },
  },

  brand: {
    columname: "brand",
    component: item => {
      return (
        <div className="TableName">
          <p
            style={{
              textTransform: "uppercase",
              color: "#034D6F",
              fontWeight: "bold",
            }}
          >
            {item.brand}
          </p>
        </div>
      );
    },
  },
};

let headsRoutes = [
  {
    headText: "Fecha de Asigancion",
    headNormalize: "assigned_date",
    orderby: "-assigned_date",
  },
  {
    headText: "Nombre del chofer",
    headNormalize: "name",
    orderby: null,
  },
  {
    headText: "Unidad",
    headNormalize: "brand",
    orderby: null,
  },
  {
    headText: "Salida KM",
    headNormalize: "km_output",
    orderby: null,
  },
  {
    headText: "Llegada KM",
    headNormalize: "km_arrival",
    orderby: null,
  },
];
