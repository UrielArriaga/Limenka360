import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { useForm } from "react-hook-form";
import { handleGlobalAlert } from "../../../utils";
import {  api } from "../../../services/api";

export default function useNewTraking(productSelect,handleToggleTraking,getTrankings){
const [loadingCreated, setLoadingCreated] = useState(false);
const [selectedFile, setSelectedFile] = useState(null);

const dispatch = useDispatch();
const { id_user } = useSelector(userSelector);
const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAddTraking = async formData => {
    setLoadingCreated(true);
    try {    
        let newTraking = {};
        newTraking.reason = formData.reason;
        newTraking.status = "4";
        newTraking.observations= formData.observations;
        newTraking.warehouseproductId= productSelect.id;
        newTraking.createdbyId = id_user; 
        let addTracking;
        
        if (selectedFile) {
          const uploadData = new FormData();
          uploadData.append('file', selectedFile);
          uploadData.append('reason', formData.reason);
          uploadData.append('status', "4");
          uploadData.append('observations', formData.observations);
          uploadData.append('warehouseproductId', productSelect.id);
          uploadData.append('createdbyId', id_user);
          addTracking = await api.post(`inventorytrackings/file`, uploadData);
        }else{
          addTracking = await api.post(`inventorytrackings`, newTraking);
        }

        if (addTracking.status === 201) {
          handleGlobalAlert("success", "Seguimientos - Creado Correctamente!", "basic", dispatch, 6000);
          resetForm();
          handleToggleTraking();
          getTrankings();
          setSelectedFile();
        }
        setLoadingCreated(false);
    } catch (error) {
      handleGlobalAlert("error", "Seguimientos - No se pudo crear el seguimiento!", "basic", dispatch, 6000);
      setLoadingCreated(false);
        console.log(error); 
    }
  }
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);

  };
  const resetForm = () => {
    setValue("observations", "");
    setValue("reason", "");
  
  };
  const handleClose = () => {
    console.log("Modal closed, resetting selected file");
    setSelectedFile(null); 
    handleToggleTraking();
  };
  return { register, handleSubmit, errors, handleAddTraking, resetForm, loadingCreated,handleFileChange,handleClose };

} 