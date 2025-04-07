import React, { useEffect, useState } from "react";
import { DriversServices } from "../services";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
export default function useDrivers() {
  const driversService = new DriversServices();
  const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [keyword, setKeyword] = useState("");
  const { open: openDriver, toggleModal: handleToggleDriver } = useModal();
  const [isEditing, setisEditing] = useState(true);
  const [driverSelect, setDriverSelect] = useState(null);
  const [dataResponseDrivers, setDataResponseDrivers] = useState({
    isFetchingData:false,
    data:[],
    total:0
  });

  useEffect(() => {
    getDrivers();
  }, [page, limit, keyword, isEditing]);

  const getDrivers = async () => {
    try {
      let query = {};
      if (keyword.length > 3) {
        query.name = {
          iRegexp: keyword.trim(),
        };
      }
      setDataResponseDrivers({...dataResponseDrivers, isFetchingData:true});
      const response = (await driversService.getDrivers(20, 1, query)).data;
      let res = response.results;
      let normalizeData = res.map(item => driversService.normalizeDrivers(item));
      setDataResponseDrivers({isFetchingData:false, total:response.count, data:normalizeData});
    } catch (error) {
      setDataResponseDrivers({...dataResponseDrivers, isFetchingData:false});
      console.log(error);
    }
  };
  const handleOnChangeKeyWord = e => setKeyword(e.target.value);

  const refreshData = () => getDrivers();

  const deleteKeyWord = () => setKeyword("");

  const handleOnClickEdit = item => {
    handleToggleDriver();
    setisEditing(true);
    setDriverSelect(item);
  };
  const handleOnClickDriver = item => {
    handleToggleDriver();
    setisEditing(false);
  };

  return {
    openDriver,
    isEditing,
    keyword,
    driverSelect,
    tableData: {
      heads,
      data: dataResponseDrivers?.data,
      isFetching: dataResponseDrivers?.isFetchingData,
      total: dataResponseDrivers?.total
    },
    paginationData: {
      handlePage,
      page,
      limit,
    },
    setDriverSelect,
    refreshData,
    handleOnClickEdit,
    handleOnClickDriver,
    handleToggleDriver,
    handleOnChangeKeyWord,
    deleteKeyWord,
  };
}

const heads = [
  {
    headText: "Nombre",
    headNormalize: "name",
    orderby: null,
  },
  {
    headText: "RFC",
    headNormalize: "rfc",
    orderby: null,
  },
  {
    headText: "Licencia",
    headNormalize: "license",
    orderby: null,
  },
  {
    headText: "Fecha de expiración",
    headNormalize: "expiration_date",
    orderby: null,
  },
];
