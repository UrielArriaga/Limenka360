import React from 'react'
import  { DepAttendantServices }  from '../services';
import useAlertToast from '../../../hooks/useAlertToast';

function useCreateRoute() {
  const request = new DepAttendantServices();
  const { showAlertError, showAlertSucces, showAlertWarning } = useAlertToast();

  const CreateRoute = async(form) => {
    try {
        let response = await request.postRoute(form);
        if(response.status == 201){
          showAlertSucces("Se creo ruta");
        }
    } catch (error) {
        console.log("error create route: ", error);
        showAlertError("Error al crear ruta")
    }
  }
  return {
    CreateRoute
  }
}

export default useCreateRoute
