import React, { useEffect } from "react";
import { useState } from "react";
import { api } from "../../../services/api";
import DirLogInventaryUnitService from "../services";
import usePagination from "../../../hooks/usePagination";

export default function useDirLogInventarioProduct(productInventorySelected) {
  const [tabSeletect, setTabSeletect] = useState("infoProduct");
  const apirequest = new DirLogInventaryUnitService();
  const [isFetchingProduct, setIsFetchingProduct] = useState(false);
  const [orderSelectedData, setOrderSelectedData] = useState(null);
  const [flag, setFlag] = useState(false);
  const { page, handlePage, limit, setPage } = usePagination({defaultLimit:10, defaultPage:1})
  const [returnsProducts, setReturnsProducts] = useState({
    data: [],
    isFetchingReturn: false,
    total:0
  });

  useEffect(() => {
    let getDataProduct = async () => {
      try {
        let query = { id: productInventorySelected?.productId };
        let params = {
          where: JSON.stringify(query),
          include: "brand,category,provider",
        };
        setIsFetchingProduct(true);
        const response = await api.get(`products`, { params });
        setOrderSelectedData(response?.data?.results[0]);
        setIsFetchingProduct(false);
      } catch (error) {
        console.log(error);
        setIsFetchingProduct(false);
      }
    };

    if (productInventorySelected) {
      getDataProduct();
    }
  }, [productInventorySelected, flag]);

  useEffect(()=>{
    getDataReturnsByProduct();
  },[productInventorySelected, tabSeletect, page])

  useEffect(()=>{
    if(productInventorySelected && tabSeletect === "returns"){
      if(page > 1) setPage(1)
    }
  },[productInventorySelected, tabSeletect])

  const handleOnClickTab = tab => {
    setTabSeletect(tab);
  };

  const getDataReturnsByProduct = async () => {
    try {
      setReturnsProducts(prevState => ({ ...prevState, isFetchingReturn: true }));
      let response = await apirequest.getReturnsByProduct(productInventorySelected?.id, page, limit);
      if (response.status == 200 || response.status == 201) {
        setReturnsProducts({ data: response?.data?.results, isFetchingReturn: false, total:response?.data?.count });
      }
    } catch (error) {
      console.log(error);
      setReturnsProducts(prevState => ({ ...prevState, isFetchingReturn: false }));
    }
  };

  return {
    tabSeletect,
    handleOnClickTab,
    isFetchingProduct,
    orderSelectedData,
    returnsProducts,
    setFlag,
    flag,
    pagination:{
      handlePage,
      limit,
      page,
      total:returnsProducts?.total
    }
  };
}
