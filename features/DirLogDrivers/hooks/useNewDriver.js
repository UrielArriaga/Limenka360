import React, { useState } from "react";
import { handleGlobalAlert } from "../../../utils";
import {  api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";

export default function useNewDriver({handleToggleDriver,refreshData,isEditing,driverSelect}){
    const [loadingCreated, setLoadingCreated] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

      
  const handleAddDriver = async formData => {
    setLoadingCreated(true);
        try {
          let newDriver = {};
          newDriver.name = formData.name;
          newDriver.RFC = formData.RFC;
          newDriver.license = formData.license;
          newDriver.expiration_date = formData.expiration_date;
          let addDriver = await api.post(`drivers`, newDriver);
          if (addDriver.status === 201) {
            handleGlobalAlert("success", "Chofer Agregado correctamente!", "basic", dispatch, 6000);
            resetForm();
            handleToggleDriver();
            refreshData();
          }
          setLoadingCreated(false);
        } catch (error) {
        handleGlobalAlert("error", "No se pudo agregar, intentalo más tarde!", "basic", dispatch, 6000);
        setLoadingCreated(false);
          console.log(error); 
    }
  }

  const handleEditDriver = async formData => {
    setLoadingCreated(true);
        try {
          let newDriver = {};
          newDriver.name = formData.name;
          newDriver.RFC = formData.RFC;
          newDriver.license = formData.license;
          newDriver.expiration_date = formData.expiration_date;
          let addDriver = await api.put(`drivers/${driverSelect.id}`, newDriver);
          if (addDriver.status === 200) {
            handleGlobalAlert("success", "Chofer Editado correctamente!", "basic", dispatch, 6000);
            resetForm();
            handleToggleDriver();
            refreshData();
          }
          setLoadingCreated(false);
        } catch (error) {
        handleGlobalAlert("error", "No se pude Editar, intentalo más tarde!", "basic", dispatch, 6000);
        setLoadingCreated(false);
          console.log(error); 
    }
  }

  if (isEditing && driverSelect) {
    setValue("name", driverSelect.name);
    setValue("RFC", driverSelect.rfc);
    setValue("license", driverSelect.license);
    const formattedDate = dayjs(driverSelect?.expiration_date).format("YYYY-MM-DD");
    setValue("expiration_date", formattedDate);
}


  const resetForm = () => {
    setValue("name", "");
    setValue("RFC", "");
    setValue("license", "");
    setValue("expiration_date");
  };
      return { register, handleSubmit, errors, handleAddDriver,loadingCreated,resetForm,handleEditDriver};
}
