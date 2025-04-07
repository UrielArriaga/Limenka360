import React, { useEffect, useState } from "react";
import ApiRuequestFormation from "../services/service";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";

function useFormation(activeFilters) {
  const request = new ApiRuequestFormation();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [allFormation, setAllFormation] = useState({
    data: [],
    isFetching: false,
    total: 0,
  });
  const [selectedTraining,setSelectedTraining] = useState({});
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  let heads = [
    {
      headText: "Folio",
      headNormalize: "folio",
      orderby: null,
    },
    {
      headText: "Titulo",
      headNormalize: "title",
      orderby: null,
    },
    {
      headText: "Responsable",
      headNormalize: "responsable",
      orderby: null,
    },
    {
      headText: "Creado Por",
      headNormalize: "creadorBy",
      orderby: null,
    },

    {
      headText: "Fecha de Capacitacion",
      headNormalize: "date",
      orderby: null,
    },
  ];
  let actions = [
    {
      name: "Ver",
      action: e => {
        setSelectedTraining(e);
        setIsOpenPreview(true);
      },
    },
  ];
  const customColumns = {
    folio: {
      columname: "Folio",
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
              {item.folio}
            </p>
          </div>
        );
      },
    },
  };

  const [keyword, setKeyWord] = useState("");

  const buildQuery = () => {
    let query = {};
    if (activeFilters.length > 0) {
      activeFilters.forEach(element => {
        if (element.parent) {
          switch (element.parent) {
            case "executives":
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
          }
        }
      });
    }
    return query;
  };

  useEffect(() => {
    getDataFormation();
  }, [page, keyword, activeFilters]);

  const getDataFormation = async () => {
    try {
      setAllFormation(prevState => ({ ...prevState, isFetching: true }));
      let query = {};
      query = buildQuery();
      if (keyword.length > 3) {
        query.folio = {
          $iRegexp: keyword.trim(),
        };
      }
      let response = await request.getFormation(page, limit, query);
      
      if (response.status == 200 || response.status == 201) {
        let { count, results } = response?.data;
        let dataNormalize = results?.map(item => request.normalizeData(item));
        setAllFormation({ isFetching: false, total: count, data: dataNormalize });
      }
    } catch (error) {
      console.log(error, "error");
      setAllFormation(prevState => ({ ...prevState, isFetching: false }));
    }
  };

  const refetchData = () => getDataFormation();

  const handleOnChangeKeyWord = e => setKeyWord(e.target.value);
  const deleteKeyWord = () => setKeyWord("");

  const handleOnClickRow = item => {
    setSelectedTraining(item)
    setIsOpenPreview(true);
  };

  return {
    allFormation,
    refetchData,
    keyword,
    handleOnChangeKeyWord,
    deleteKeyWord,
    paginationData: {
      handlePage,
      page,
      limit,
    },
    tableData: {
      heads,
      actions,
      data: allFormation?.data,
      customColumns,
    },
    handleOnClickRow,
    selectedTraining,
    isOpenPreview,
    setIsOpenPreview
  };
}

export default useFormation;
