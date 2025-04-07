import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { DriversServices } from "../services";
export default function useDeleteDriver({refreshData,setDriverSelect}){
    const DriverDeleteid = new DriversServices(); 
    const { showAlertSucces, showAlertError } = useAlertToast();
    const { open: openDeleteDriver, toggleModal: handleToggleDeleteDriver } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnclickDelete = item => {
        handleToggleDeleteDriver();  
        setDriverSelect(item);
    }


    const handledeleteDriver = async driver =>{
        setIsLoading(true); 
        try {
             const res = await DriverDeleteid.deleteDrivers(driver.id);
             if(res.status === 200){
                showAlertSucces("Chofer eliminado Correctamente"); 
                handleToggleDeleteDriver();
                refreshData();
             }
             setIsLoading(false); 
        } catch (error) {
            showAlertError("Error al eliminar intentalo más tarde");
            setIsLoading(false); 
            console.log(error);
        }
    }
    return{
        openDeleteDriver,
        handledeleteDriver,
        handleOnclickDelete,
        handleToggleDeleteDriver
    }
}