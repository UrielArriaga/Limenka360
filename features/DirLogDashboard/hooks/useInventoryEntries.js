import React, { useState, useEffect } from "react";
import { ApiRequest } from "../services/service";
import useAlertToast from "../../../hooks/useAlertToast";

function useInventoryEntries() {
  const request = new ApiRequest();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
  const [allEntries, setAllEntries] = useState({
    data:[],
    count:0,
    isFetching:false
  });

  useEffect(()=>{
    getAllInventoryEntries();
  },[])

  const getAllInventoryEntries = async() => {
    try {
      setAllEntries({...allEntries, isFetching:true});
      let response = await request.getInventoryEntries();
      if(response.status == 200){
        setAllEntries({data:response.data.results, count:response.data.count, isFetching:false});
      } else {
        showAlertWarning("Fallo al traer las entradas");
      }
    } catch (error) {
        console.log(error);
        setAllEntries({...allEntries, isFetching:false});
        showAlertError("Error al  traer las entradas");
    }
  }
  return {
    allEntries
  };
}

export default useInventoryEntries;
