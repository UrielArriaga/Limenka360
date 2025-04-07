import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { TransporUnitsServices } from "../services";
export default function useDeleteUnit({refreshData,setUnitSelect}){
    const UnitDeleteid = new TransporUnitsServices (); 
    const { showAlertSucces, showAlertError } = useAlertToast();
    const { open: openDeleteUnit, toggleModal: handleToggleDeleteUnit } = useModal();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnclickDelete = item => {
        handleToggleDeleteUnit();  
        setUnitSelect(item);
    }


    const handledeleteUnit = async unit =>{
        setIsLoading(true); 
        try {
             const res = await UnitDeleteid.deleteUnits(unit.id);
             if(res.status === 200){
                showAlertSucces("Unidad eliminada Correctamente"); 
                handleToggleDeleteUnit();
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
        openDeleteUnit,
        handledeleteUnit,
        handleOnclickDelete,
        handleToggleDeleteUnit
    }
}