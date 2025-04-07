import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import {BiomedicServices} from "../services";

export default function useReview({setIsOpenPreview,setIsFetchingData,refreshData,setProductSelect}){
 const RapairStatus = new BiomedicServices();
 const { showAlertSucces, showAlertError } = useAlertToast();
 const { open: openReviewed, toggleModal: handleToggleReviwed } = useModal();
 const [isLoading, setIsLoading] = useState(false);
 

 const handleOnClickReviwed = item => {
    handleToggleReviwed();
    setProductSelect(item)
  };
 const handleReviwed = async product => {
   let changeStatus = true;
   try {
    setIsLoading(true);
    const res = await RapairStatus.changeReviewed(product.id,changeStatus);
    if(res.status === 200){
    showAlertSucces("Status Modificado"); 
    handleToggleReviwed();
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
 const indicators = [
  { value: 'Verde', label: 'Funcionamiento, estética y accesorios correctos'},
  { value: 'Amarillo', label: 'Faltan accesorios, daño estetico'},
  { value: 'Rojo', label: 'No funciona, reparación'},
  { value: 'Azul', label: 'Revisión accesorios y estética completa, no se puede realizar prueba de funcionamiento'},
 ]
 return{
handleReviwed,
openReviewed,
indicators,
handleOnClickReviwed,
handleToggleReviwed
 }
};
