import { Cancel, CheckCircle, FiberManualRecord, Visibility } from "@material-ui/icons";
import React, { useContext, useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import usePagination from "../../../hooks/usePagination";
import { ActionsAdminServices } from "../services/api";
import { useDispatch } from "react-redux";

export default function useActivities(activeFilters, setActiveFilters) {
  const service = new ActionsAdminServices();
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [keyword, setKeyword] = useState("");
  const [keywordValue, setKeywordValue] = useState("");
  const [data, setData] = useState([]);
  const [totalActivities, setTotalActivities] = useState(0);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    getData();
  }, [page, orderBy, activeFilters]);

  const buildQuery = () => {
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
      if (!removeKeyword && keyword?.length > 3) {
        query.prospect = {
          fullname: {
            $iRegexp: `${keyword?.toLocaleLowerCase()}`,
          },
        };
      }
      const response = await service.getActions(limit, page, orderBy, query);
      let results = response?.data?.results;
      setTotalActivities(response?.data?.count);
      let normalizeData = results.map(item => service.normalizeDataActions(item));
      setData(normalizeData);
      setIsFetchingData(false);
    } catch (error) {
      setIsFetchingData(false);
    }
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
    console.log("item", item);
  };

  const deleteKeyWord = () => {
    setKeyword("");
    setKeywordValue("");
    getData(true);
  };

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
  };
}

let heads = [
  {
    headText: "Fecha",
    headNormalize: "createdAt",
    orderby: null,
  },
  {
    headText: "Nombre",
    headNormalize: "nameprospect",
    orderby: null,
  },
  {
    headText: "*Ejecutivo",
    headNormalize: "ejecutive",
    orderby: null,
  },

  {
    headText: "Tipo Seguimiento",
    headNormalize: "typetracking",
    orderby: null,
  },

  {
    headText: "Observaciones",
    headNormalize: "observations",
    orderby: null,
  },
];
const customColumns = {
  createdAt: {
    columname: "createdAt",
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
            {item.createdAt}
          </p>
        </div>
      );
    },
  },
};
