import React, { useEffect } from "react";
import { useState } from "react";
import { WareHouseService } from "../services";
import usePagination from "../../../hooks/usePagination";

export default function useDirLogAlmacenes() {
  const wareHouseService = new WareHouseService();
  const [data, setData] = useState(initialData);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [orderBy, setOrderBy] = useState("-createdAt");
  const [totalResults, setTotalResults] = useState(0);
  const { page, limit, handlePage, handlePagination } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const [wareHouseSelected, setWareHouseSelected] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      let query = {};
      if(keyword.length > 3){
        query.name = keyword
      }
      const response = (await wareHouseService.getWareHouses(limit, page,orderBy,query)).data;
      let normalizeData = response?.results.map(wareHouseService.normalizeWareHouser);
      setTotalResults(response?.count);
      setData(normalizeData);
    };

    fetchData();
  }, [page, keyword]);

  const handleOnClickRow = item => {
    console.log(item);
    setWareHouseSelected(item);
    setIsOpenPreview(true);
  };

  const handleOnChangeKeyWord = (e) => setKeyword(e.target.value);

  return {
    setWareHouseSelected,
    isOpenPreview,
    setIsOpenPreview,
    wareHouseSelected,
    page,
    limit,
    handlePage,
    handlePagination,
    isFetchingData,
    orderBy,
    totalResults,
    handleOnClickRow,
    tableData: {
      heads,
      data,
      // actions,
      // data,
      // customColumns,
    },
    keyword,
    handleOnChangeKeyWord
  };
}

let heads = [
  {
    headText: "Fecha de salida",
    headNormalize: "createdAt",
    orderby: null,
  },
  {
    headText: "Nombre del alamacen",
    headNormalize: "name",
    orderby: null,
  },
  {
    headText: "Total de Productos",
    headNormalize: "totalProductos",
    orderby: null,
  },
];

const initialData = [
  {
    createdAt: "03 jun 2024",
    encargado: "Juan Perez",
    name: "Almacen 1",
    totalProductos: 5,
  },
  // {
  //   createdAt: "03 jun 2024",
  //   encargado: "Juan Perez",
  //   totalProductos: 5,
  // },
  // {
  //   createdAt: "03 jun 2024",
  //   encargado: "Juan Perez",
  //   totalProductos: 5,
  // },
  // {
  //   createdAt: "03 jun 2024",
  //   encargado: "Juan Perez",
  //   totalProductos: 5,
  // },
];
