import { Cancel, CheckCircle, FiberManualRecord, Visibility } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import usePagination from "../../../hooks/usePagination";
import { ActionsAdminServices } from "../services/api";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

export default function useSales(activeFilters, setActiveFilters) {
  const service = new ActionsAdminServices();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [data, setData] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dispatch = useDispatch();
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [orderSelected, setOrderSelected] = useState(null);

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters]);

  const buildQuery = () => {
    let query = {};
    query.discarted = false;
    query.iscloseout = true;
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
          }
        }
      });
    }

    return query;
  };

  const getData = async removeKeyword => {
    try {
      setIsFetchingData(true);
      let query = {};
      query = buildQuery();
      query.prospect = generateInQuery();
      if (!removeKeyword && keyword?.length > 3) {
        query.prospect = {
          fullname: {
            $iRegexp: `${keyword?.toLocaleLowerCase()}`,
          },
        };
      }
      const response = await service.getSales(limit, page, orderBy, query);
      let results = response?.data?.results;
      setTotalActivities(response?.data?.count);
      let normalizeData = results.map(item => service.normalizeDataSales(item));
      setData(normalizeData);
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
    }
  };

  const generateInQuery = () => {
    let inQuery = {};
    inQuery.isoportunity = true;
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "groups":
              inQuery[element.valuedb] = {
                groupId: element.value,
              };
              break;
            case "users":
              inQuery[element.valuedb] = element.value;
              break;
          }
        }
      });
    }
    return inQuery;
  };

  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const handleOnKeyEnter = e => {
    if (e.key === "Enter") {
      setKeywordValue(keyword);
      getData();
    }
  };

  const handleOnClickRow = item => {
    // setproductoportunityorder(null);
    setIsOpenPreview(true);
    setOrderSelected(item);
  };

  const deleteKeyWord = () => {
    setKeyword("");
    setKeywordValue("");
    getData(true);
  };

  const handleOnClickClosePreview = () => setIsOpenPreview(false);

  const refetchData = () => getData();

  let actions = [];

  return {
    handleOnChangeKeyWord,
    deleteKeyWord,
    handleOnClickRow,
    handleOnKeyEnter,
    orderBy,
    setOrderBy,
    keyword,
    totalActivities,
    setIsFetchingData,
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
      data,
      customColumns,
    },
    dispatch,
    orderSelected,
    isOpenPreview,
    handleOnClickClosePreview,
  };
}

let heads = [
  {
    headText: "Nombre",
    headNormalize: "nombre",
    orderby: null,
  },
  {
    headText: "Concepto",
    headNormalize: "concepto",
    orderby: null,
  },

  {
    headText: "Correo",
    headNormalize: "correo",
    orderby: null,
  },

  {
    headText: "Monto total",
    headNormalize: "monto total",
    orderby: null,
  },
  {
    headText: "Certeza",
    headNormalize: "certeza",
    orderby: null,
  },

  {
    headText: "Fecha de venta",
    headNormalize: "soldat",
    orderby: null,
  },
  {
    headText: "Fecha de cierre",
    headNormalize: "estimatedclossing",
    orderby: null,
  },
];
const customColumns = {
  nombre: {
    columname: "Nombre",
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
            {item.nombre}
          </p>
        </div>
      );
    },
  },
};
