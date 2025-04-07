import React, { useEffect, useState } from "react";
import { TransporUnitsServices } from "../services";
import useModal from "../../../hooks/useModal";
import usePagination from "../../../hooks/usePagination";
export default function useTransporUnits(){
    const unitsTranportService = new TransporUnitsServices();
    const [data,setData] = useState([]);
    const [isFetchingData, setIsFetchingData] = useState(true);
    const { page, limit, handlePage } = usePagination({ defaultLimit: 20, defaultPage: 1 });
    const [keyword, setKeyword] = useState("");
    const [totalUnitsTransport, setTotalUnitsTransport] = useState();
    const [allUnits, setAllUnits] = useState([]); 
    const { open: openUnits, toggleModal: handleToggleUnits} = useModal();
    const [isEditing, setisEditing] = useState(true);
    const [unitSelect, setUnitSelect] = useState(null);

  useEffect(() => {
    getUnits();
  }, [page, limit,keyword,isEditing]);

  useEffect(() => {
    filterUnitsTransport();
  }, [ allUnits,setKeyword]); 

  const getUnits = async () => {
    try {
        setIsFetchingData(true);
        const query = keyword.length > 3 ? { model: { contains: keyword } } : {};
        const response = (await unitsTranportService.getUnit(limit, page, query)).data;
        let res = response.results;
        let normalizeData = res.map(item => unitsTranportService.normalizeUnits(item));
        setAllUnits(normalizeData);
        setTotalUnitsTransport(response.count);
        setIsFetchingData(false);
    } catch (error) {
        setIsFetchingData(false);
        console.log(error);
    }
  }
  const filterUnitsTransport = () => {
    let filteredUnits = allUnits;

    if (keyword.length > 3) { 
      filteredUnits = filteredUnits.filter(units =>
        units?.model.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setData(filteredUnits);
  };
  const handleOnChangeKeyWord = e => {
    setKeyword(e.target.value);
  };

  const refreshData = () => {
    getUnits();
  }

  const deleteKeyWord = () => setKeyword("");

  const handleOnClickEdit = item => {
    handleToggleUnits();
    setisEditing(true); 
    setUnitSelect(item);
  }
  const handleOnClickUnits = () => {
    handleToggleUnits();
    setisEditing(false);
  };

 
    return {
      isFetchingData,
      openUnits,
      isEditing,
      keyword,
      unitSelect,
        totalUnitsTransport,
        tableData: {
          heads,
          data,
         },
        paginationData: {
          handlePage,
          page,
          limit,
        },
        setUnitSelect,
        refreshData,
        handleOnClickEdit,
        handleOnClickUnits,
        handleToggleUnits,
        handleOnChangeKeyWord,
        deleteKeyWord,
        
    }
} 


    const heads = [
        {
          headText: "Marca",
          headNormalize: "brand",
          orderby: null,
        },
        {
          headText: "Modelo",
          headNormalize: "model",
          orderby: null,
        },
        {
          headText: "Kilometraje",
          headNormalize: "mileage",
          orderby: null,
        },
        {
          headText: "Placa",
          headNormalize: "tuition",
          orderby: null,
        },
        /*{
          headText: "Numero de motor",
          headNormalize: "engine_number",
          orderby: null,
        },*/
        {
          headText: "Numero de serie",
          headNormalize: "vehicle_series",
          orderby: null,
        },
        /*{
          headText: "Tarjeta de circulación",
          headNormalize: "circulation_card",
          orderby: null,
        },*/
        {
          headText: "Poliza de seguro",
          headNormalize: "insurance_policy",
          orderby: null,
        },
      ]