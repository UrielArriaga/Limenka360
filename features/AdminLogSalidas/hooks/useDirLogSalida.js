import React, { useEffect, useState } from "react";
import { ExitsServices } from "../services";
import usePagination from "../../../hooks/usePagination";
export default function useDirLogSalida(exitSelected) {
  const exitsService = new ExitsServices();

  const [exitSelectedData, setExitSelectedData] = useState(null);
  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [productsExit, setProductsExit] = useState();
  const [isFechingProduct,setIsFechingProduct] =useState(false);
  const [totalProductsExits, setTotalProductsExts]= useState(1);


  useEffect(() => {
    const getExitOrder = async () => {
      try {
        setIsFetchingOrder(true);
        const res = await exitsService.getExit(exitSelected.id);
        setExitSelectedData(res.data);
        setIsFetchingOrder(false);
      } catch (error) {
        console.log(error);
        setIsFetchingOrder(false);
      }
    };

    if (exitSelected) {
      getExitOrder();
    }
  }, [exitSelected]);

  useEffect(() => {
    const getProductExit = async () => {
        try {
        setIsFechingProduct(true);
         const products = await exitsService.getProductExit(exitSelectedData.id);
         const res = products.data.results;
         let normalizeData = res.map(item => exitsService.normalizeDataProducts(item));
         const count = res.length;
         setProductsExit(normalizeData);
         setTotalProductsExts(count);
         setIsFechingProduct(false);
        } catch (error) {
             console.log(error);
             setIsFechingProduct(false);
        }
    }
    if (exitSelectedData) {
        getProductExit ();
      }
  }, [exitSelected,exitSelectedData]);
  return {
    exitSelectedData,
    isFetchingOrder,
    productsExit,
    isFechingProduct,
    totalProductsExits,
        
  };
}