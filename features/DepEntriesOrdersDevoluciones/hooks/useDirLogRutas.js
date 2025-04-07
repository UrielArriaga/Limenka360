import React, { useEffect, useState } from "react";
import DirLogRutasApi from "../services";
import { Tooltip } from "@material-ui/core";
import usePagination from "../../../hooks/usePagination";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import dayjs from "dayjs";

export default function useDirLogRecolecion(activeFilters) {
  const DirLogService = new DirLogRutasApi();
  const { userData } = useSelector(userSelector);
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


  const [totalRoutes, setTotalRoutes] = useState(0);

  useEffect(() => {
    fetchDeliveryRoutes();
  }, [page, limit,orderBy, activeFilters, keyword]);

  const fetchDeliveryRoutes = async () => {
    try {
      let query = buildQuery();
      console.log("query:", query);
      setDataRoutes({ ...dataRoutes, isfetching: true });

      let responseRoutes = await DirLogService.getDeliveryRoutes(limit, page, orderBy, query);
      let routes = responseRoutes?.data?.results || [];
      const normalize = routes.map(DirLogService.normalizeDeliveryRoutes);

      setTotalRoutes(responseRoutes?.data?.count || 0);

      setDataRoutes({ ...dataRoutes, isfetching: false, data: normalize, count: normalize?.length });
    } catch (error) {
      console.error("Error fetching routes:", error);
      setDataRoutes({ ...dataRoutes, isfetching: false, isError: true, errorMessage: error.message });
    }
  };

  const handleOnClickRowRoutes = (item) => {
    setRouteSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnClickClosePreview = () => {
    setIsOpenPreview(false);
  };

  const handleOnChangeKeyWord = (e) => setKeyword(e.target.value);
  const deleteKeyWord = () => setKeyword("");

  /*query para incluir filtros*/
  const buildQuery = () => {
    let query = {};
    if (userData?.warehouse?.id) {
      query.warehouseId = userData.warehouse.id;
    }
    if (activeFilters && activeFilters.length > 0) {
      for (let i = 0; i < activeFilters.length; i++) {
        const filter = activeFilters[i];
        if (filter.parent) {
          switch (filter.parent) {
            case "typesentries":
              query[filter.valuedb] = filter.value;
              break;
            case "dates":
              if (filter.option.id === "range") {
                query[filter.valuedb] = {
                  $gte: filter.option?.value?.startDate,
                  $lt: filter.option?.value?.endDate,
                };
              } else {
                query[filter.valuedb] = {
                  $gte: dayjs().startOf(filter.option?.id).format(),
                  $lt: dayjs().endOf(filter.option?.id).format(),
                };
              }
              break;
            default:
              query[filter.valuedb] = filter.value;
          }
        }
      }
    }

    if (keyword.length > 3) {
      query.name = {
        $iRegexp: keyword,
      };
    }

    return query;
  };

  const refetchData = () => fetchDeliveryRoutes();

  return {
    handleOnClickClosePreview,
    isOpenPreview,
    paginationData: {
      handlePage,
      page,
      limit,
      total: totalRoutes,
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
    totalRoutes,  
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
    component: (item) => {
      return (
        <div className="TableName">
          <Tooltip title={item.name}>
            <p style={{ textTransform: "uppercase" }}>
              {item.name}
            </p>
          </Tooltip>
        </div>
      );
    },
  },

  brand: {
    columname: "brand",
    component: (item) => {
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
];
