import React, { useEffect } from "react";
import { useState } from "react";
import DirLogRutasApi from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";

export default function useDirLogRecolecion(activeFilters) {
  const DirLogService = new DirLogRutasApi();
  const [orderBy, setOrderBy] = useState("-createdAt");
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [routeSelected, setRouteSelected] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");
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

  const handleOnChangeKeyWord = e => setKeyword(e.target.value);
  const deleteKeyWord = () => setKeyword("");

  const buildQuery = () => {
    let query = {};
    for (let i = 0; i < activeFilters.length; i++)
      if (activeFilters[i].parent) query[activeFilters[i].valuedb] = activeFilters[i].value;
    return query;
  };

  // RUTAS
  useEffect(() => {
    fetchDeliveryRoutes();
  }, [page, limit, orderBy, activeFilters, keyword]);

  const fetchDeliveryRoutes = async () => {
    try {
      let query = buildQuery(); // Asumiendo que esta función construye el resto de la consulta
      let inquery = {};
      query.driver = inquery;
      if (keyword.length > 3) {
        inquery.name = keyword;
      }

      setDataRoutes({ ...dataRoutes, isfetching: true });
      let responseRoutes = await DirLogService.getDeliveryRoutes(limit, page, orderBy, query);
      let routes = responseRoutes?.data?.results || [];
      const normalize = routes.map(DirLogService.normalizeDeliveryRoutes);
      setDataRoutes({ ...dataRoutes, isfetching: false, data: normalize, count: normalize?.length });

      console.log(normalize);
    } catch (error) {
      console.log(error, "Error get routes");
      setDataRoutes({ ...dataRoutes, isfetching: false, isError: true, errorMessage: error });
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
    headText: "Fecha de Asigancion",
    headNormalize: "assigned_date",
    orderby: null,
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
