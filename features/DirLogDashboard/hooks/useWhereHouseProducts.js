import React, { useState, useEffect } from 'react'
import { ApiRequest } from "../services/service";
import useAlertToast from "../../../hooks/useAlertToast";

function useWhereHouseProducts() {
    const request = new ApiRequest();
    const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
    const [allProducts, setAllProducts] = useState({
      data:[],
      count:0,
      isFetching:false
    });

    useEffect(()=>{
        getProducts();
      },[])
      const getProducts = async() => {
        try {
            setAllProducts({...allProducts, isFetching:true});
          let response = await request.getWhereHouseProducts();
          if(response.status == 200){
            setAllProducts({...allProducts, count:response.data.totalstock, isFetching:false});
          } else {
            showAlertWarning("Fallo al traer los productos");
          }
        } catch (error) {
            console.log(error);
            setAllProducts({...allProducts, isFetching:false});
            showAlertError("Error al  traer los productos");
        }
      }
  return {
    allProducts
  }
}

export default useWhereHouseProducts
