import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import {BiomedicServices} from "../services";

export default function useRepairStatus({setIsOpenPreview,setIsFetchingData,refreshData,setProductSelect}){
 const RapairStatus = new BiomedicServices();
 const { showAlertSucces, showAlertError } = useAlertToast();
 const { open: openRepair, toggleModal: handleToggleRepair } = useModal();
 const [isLoading, setIsLoading] = useState(false);
 

 const handleOnClickRepair = item => {
    handleToggleRepair();
    setProductSelect(item)
  };
 const handleRepair = async product => {
   let changeStatus = false;
   try {
    setIsLoading(true);
    const res = await RapairStatus.changeStatusRepairs(product.id,changeStatus);
    if(res.status === 200){
    showAlertSucces("Status Modificado"); 
    handleToggleRepair();
    setIsOpenPreview(false);
    setIsFetchingData(false);
    refreshData();
    }
   } catch (error) {
    console.log(error);
    setIsLoading(true);
    showAlertError("Error al marcar como reparado");
   } 
 }
 return{
handleRepair,
openRepair,
handleOnClickRepair,
handleToggleRepair
 }
};
