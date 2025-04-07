import React, { useState, useEffect } from 'react'
import { ApiRequest } from "../services/service";
import useAlertToast from "../../../hooks/useAlertToast";

function useInventoryExit() {
    const request = new ApiRequest();
    const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();
    const [allExit, setAllExit] = useState({
      data:[],
      count:0,
      isFetching:false
    });

    useEffect(()=>{
        getAllInventoryExit();
      },[])
    
      const getAllInventoryExit = async() => {
        try {
            setAllExit({...allExit, isFetching:true});
          let response = await request.getInventoryExit();
          if(response.status == 200){
            setAllExit({data:response.data.results, count:response.data.count, isFetching:false});
          } else {
            showAlertWarning("Fallo al traer las salidas");
          }
        } catch (error) {
            console.log(error);
            setAllExit({...allExit, isFetching:false});
            showAlertError("Error al  traer las salidas");
        }
      }
  return {
    allExit
  }
}

export default useInventoryExit
