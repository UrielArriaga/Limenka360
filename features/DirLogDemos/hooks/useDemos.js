import { useEffect, useState } from "react";
import normalizeTableDemos from "../utils/normalizeData";
import dayjs from "dayjs";
import usePagination from "../../../hooks/usePagination";
import RequestApi from "../services/services";

export default function useDemos(activeFilters) {
  const request = new RequestApi();
  const [keySearch, setKeySearch] = useState("");
  const [demos, setDemos] = useState({ results: [], count: 0, isFeching: false });
  const [orderBy, setOrderBy] = useState("createdAt");
  const {
    page: pageCurrent,
    limit: limitResults,
    handlePage,
    setPage: setPageCurrent,
  } = usePagination({ defaultLimit: 20, defaultPage: 1, count: demos?.count });

  useEffect(() => {
    getDemos();
  }, [pageCurrent, orderBy, keySearch, activeFilters]);

  const buildQuery = () => {
    console.log(activeFilters, "  :activefilters");
    let query = {};
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "entities":
              query[element.valuedb] = {
                entityId: element.value,
              };
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
    return query;
  };

  const getDemos = async () => {
    try {
      let query = {};
      query = buildQuery();

      if (keySearch?.length > 3) {
        if (/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)*$/im.test(keySearch.trim())) {
          query.assignedinstructor = `${keySearch.trim()}`;
        } else if (/^\d+$/) {
          query.expensebudget = `${keySearch.trim()}`;
        }

        if (pageCurrent > 1) setPageCurrent(1);
      }

      setDemos({ ...demos, isFeching: true });
      let response = await request.getDemosales(limitResults, orderBy, pageCurrent, query);

      let demos = normalizeTableDemos(response.data.results) || [];
      setDemos({ ...demos, results: demos, count: response.data.count, isFeching: false });
    } catch (error) {
      setDemos(prevState => ({ ...prevState, isFeching: false }));
    }
  };

  const handleKeySearch = string => setKeySearch(string);

  const refetchData = () => getDemos();

  return {
    keySearch,
    setKeySearch,
    orderBy,
    handleKeySearch,
    setOrderBy,

    tableData: {
      heads,
      demos,
    },

    paginationData: {
      handlePage,
      page: pageCurrent,
      limit: limitResults,
    },
    refetchData,
  };
}

const heads = [
  //   {
  //     headText: "id",
  //     headNormalize: "id",
  //     orderby: null,
  //   },
  {
    headText: "instructor",
    headNormalize: "instructor",
    orderby: "-assignedinstructor",
  },
  {
    headText: "estatus",
    headNormalize: "estatus",
    orderby: null,
  },
  {
    headText: "viaticos",
    headNormalize: "viaticos",
    orderby: null,
  },
  {
    headText: "fecha estimada",
    headNormalize: "fecha estimada",
    orderby: null,
  },
  {
    headText: "unidad asignada",
    headNormalize: "unidad asignada",
    orderby: null,
  },
  {
    headText: "estado",
    headNormalize: "estado",
    orderby: null,
  },
  {
    headText: "ciudad",
    headNormalize: "ciudad",
    orderby: null,
  },
  {
    headText: "asentamiento",
    headNormalize: "asentamiento",
    orderby: null,
  },
  {
    headText: "calle",
    headNormalize: "calle",
    orderby: null,
  },
  {
    headText: "fecha de creacion",
    headNormalize: "fecha de creacion",
    orderby: "-createdAt",
  },
];
