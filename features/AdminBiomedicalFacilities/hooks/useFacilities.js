import React, { useEffect, useState } from "react";
import ApiRequestFacilitiesBio from "../services";
import usePagination from "../../../hooks/usePagination";
import dayjs from "dayjs";

function useFacilities(activeFilters) {
  const request = new ApiRequestFacilitiesBio();
  const [facilities, setFacilities] = useState({
    data: [],
    isFetching: false,
    total: 0,
  });
  const [productsInstallations, setProductsInstallations] = useState({
    data:[],
    isFetching:false,
    total:0
  });
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const { page:currentPage, limit:limitData, handlePage:changePage } = usePagination({ defaultLimit: 5, defaultPage: 1 });
  const [keyword, setKeyWord] = useState("");
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState({});
  let actions = [
    {
      name: "Ver",
      action: e => {
        setSelectedFacility(e);
        setIsOpenPreview(true);
      },
    },
  ];
  let heads = [
    {
      headText: "Fecha de Creación",
      headNormalize: "createdAt",
      orderby: null,
    },
    {
      headText: "Folio",
      headNormalize: "folio",
      orderby: null,
    },
    {
      headText: "Fecha de Instalacion",
      headNormalize: "installationdate",
      orderby: null,
    },
    {
      headText: "Responsable",
      headNormalize: "responsible",
      orderby: null,
    },
    {
      headText: "Creado Por",
      headNormalize: "createdby",
      orderby: null,
    },
  ];

  useEffect(() => {
    getDataFacilities();
  }, [keyword, page, activeFilters]);

  useEffect(()=>{
    getProductsInstallation();
  },[selectedFacility, currentPage])

  const buildQuery = () => {
    let query = {};
    if (keyword.length > 3) {
      query.folio = {
        $iRegexp: keyword.trim(),
      };
    }

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
                $gte: dayjs().startOf(element?.option?.id).format(""),
                $lte: dayjs().endOf(element?.option?.id).format(""),
              };
              break;
            default:
              query[element.valuedb] = element.value;
              break;
          }
        }
      });
    }
    return query;
  };

  const getDataFacilities = async () => {
    try {
      let query = {};
      query = buildQuery();

      setFacilities(prevState => ({ ...prevState, isFetching: true }));
      let response = await request.getInstallations(page, limit, query);
      if (response.status == 200 || response.status == 201) {
        let { data, total } = response?.data;
        let dataNormalize = data?.map(item => request.NormalizeInstallations(item));
        setFacilities({ data: dataNormalize, isFetching: false, total });
      }
    } catch (error) {
      console.log(error);
      setFacilities(prevState => ({ ...prevState, isFetching: false }));
    }
  };

  const getProductsInstallation = async() => {
    try {
      setProductsInstallations(prevState => ({...prevState, isFetching:true}));
      let response = await request.getFacilities(currentPage, limitData, selectedFacility);
      if(response.status == 200 || response.status == 201 ){
        let { data, total } = response?.data;
        let dataNormalize = data?.map(item => request.Normalize(item));
        setProductsInstallations({data:dataNormalize, total, isFetching:false});
      }
    } catch (error) {
      setProductsInstallations(prevState => ({...prevState, isFetching:false}));
      console.log(error, "Error");
    }
  }

  const handleOnChangeKeyWord = e => setKeyWord(e.target.value);
  const deleteKeyWord = () => setKeyWord("");
  const refetchData = () => getDataFacilities();
  const handleOnClickRow = item => {
    setSelectedFacility(item);
    setIsOpenPreview(true);
  };

  return {
    facilities,
    findWord: {
      handleOnChangeKeyWord,
      keyword,
      deleteKeyWord,
    },
    refetchData,
    isOpenPreview,
    handleOnClickRow,
    tableData: {
      actions,
      heads,
      data: facilities,
    },
    paginationData: {
      page,
      limit,
      handlePage,
    },
    selectedFacility,
    setIsOpenPreview,
    productsInstallations,
    paginationProducts:{
      changePage,
      currentPage,
      limitData
    }
  };
}

export default useFacilities;
