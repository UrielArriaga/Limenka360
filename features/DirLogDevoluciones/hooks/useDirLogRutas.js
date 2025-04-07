import React, { useEffect } from "react";
import { useState } from "react";
import DirLogRutasApi from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";

export default function useDirLogRecolecion(activeFilters) {
  const DirLogService = new DirLogRutasApi();
  const [orderBy, setOrderBy] = useState("-createdAt");
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [routeSelected, setRouteSelected] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [isFetchingEntrance, setIsFetching] = useState(false);
  const [dataEntrance, setDataEntries] = useState();
  const [totalEntries, setTotalEntries] = useState(0);
  // Rutas
  const [dataRoutes, setDataRoutes] = useState({
    data: [],
    isfetching: false,
    count: 0,
    isError: false,
    errorMessage: "",
  });

  const handleOnClickRowRoutes = item => {
    setRouteSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };
  const deleteKeyWord = () => setKeyword("");

  // const buildQuery = () => {
  //   let query = {};
  //   for (let i = 0; i < activeFilters.length; i++)
  //     if (activeFilters[i].parent) query[activeFilters[i].valuedb] = activeFilters[i].value;
  //   return query;
  // };

  const buildQuery = () => {
      let query = {};
      if (activeFilters.length > 0) {
        activeFilters.forEach(element => {
          if (element.parent) {
            switch (element.parent) {
              case "warehouse":
                query[element.valuedb] = element.value;
  
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
              case "users":
                query[element.valuedb] = element.value;
                break;
            }
          }
        });
      }
  
      return query;
    };

  // RUTAS
  useEffect(() => {
    fetchDeliveryRoutes();
  }, [page, limit, orderBy, activeFilters, keyword]);

  useEffect(() => {
    console.log("***", dataRoutes);
  }, [dataRoutes]);

  useEffect(() => {
    fetchEntries();
}, [page,limit,routeSelected]);



  const fetchDeliveryRoutes = async () => {
    try {
      // falta construir la query en base a los filtros activeFilters
      setDataRoutes(prevState => ({ ...prevState, isfetching: true}));
      let query = {};
      query = buildQuery();
      if (keyword.length >= 3) {
        query.createdby = {
          fullname: {$iRegexp: keyword.trim(),}
        };
        // inQuery.name = keyword
      }
      // setDataRoutes({ ...dataRoutes, isfetching: true });
      let responseRoutes = await DirLogService.getDeliveryRoutes(limit, page, orderBy, query);
      let routes = responseRoutes?.data?.results || [];
      const normalize = routes?.map(DirLogService.normalizeDeliveryRoutes);
      setDataRoutes({ ...dataRoutes, isfetching: false, data: normalize, count: normalize?.length });
    } catch (error) {
      console.log(error, "Error get routes");
      setDataRoutes({ ...dataRoutes, isfetching: false, isError: true, errorMessage: error });
    }
  };

  const fetchEntries = async () => {
    try {
     let query = {};
     query.returnsId = routeSelected?.id;
      setIsFetching(true);
      let response = await DirLogService.getEntry(limit, page,query);
      let products = response?.data.results || [];
      let normalizeData = products?.map(item => DirLogService.normalizeDeliveryReturns(item));
      console.log("response", response);
      setDataEntries(normalizeData);
      setTotalEntries(response?.data?.count)
      setIsFetching(false);
    } catch (error) {
      console.error("Error fetching entries:", error);
      setIsFetching(false);
    }
  };


  const refetchData = () => fetchDeliveryRoutes();

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
    isFetchingEntrance,
    dataEntrance,
    // RUTAS
    routeSelected,
    handleOnClickRowRoutes,
    tableDataRoutes: {
      allData: dataRoutes,
      data: dataRoutes?.data,
      heads: headsRoutes,
      customColumns: customColumnsRoutes,
    },
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
    headText: "Fecha de Devolucion",
    headNormalize: "createdAt",
    orderby: "-createdAt",
  },
  {
    headText: "Cantidad Productos",
    headNormalize: "quantity",
    orderby: null,
  },

  {
    headText: "Comentario",
    headNormalize: "comment",
    orderby: null,
  },
  {
    headText: "Creado Por",
    headNormalize: "createdby",
    orderby: null,
  },
  {
    headText: "Almacen",
    headNormalize: "warehouse",
    orderby: null,
  },
  // {
  //   headText: "Nombre del chofer",
  //   headNormalize: "name",
  //   orderby: null,
  // },
  // {
  //   headText: "Unidad",
  //   headNormalize: "brand",
  //   orderby: null,
  // },

  // {
  //   headText: "Salida KM",
  //   headNormalize: "km_output",
  //   orderby: null,
  // },
  // {
  //   headText: "Llegada KM",
  //   headNormalize: "km_arrival",
  //   orderby: null,
  // },
];
