import React, { useState } from "react";
import { handleGlobalAlert } from "../../../utils";
import {  api } from "../../../services/api";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export default function useNewUnit({handleToggleUnits,refreshData,isEditing,unitSelect}){
    const [loadingCreated, setLoadingCreated] = useState(false);
    const dispatch = useDispatch();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
      } = useForm();

  const handleAddUnit = async formData => {
    setLoadingCreated(true);
        try {
          let newUnit = {};
          newUnit.brand = formData.brand;
          newUnit.model = formData.model;
          newUnit.mileage = formData.mileage;
          newUnit.tuition = formData.tuition;
          //newUnit.engine_number = formData.engine_number;
          newUnit.vehicle_series = formData.vehicle_series;
          //newUnit.circulation_card = formData.circulation_card;
          newUnit.insurance_policy = formData.insurance_policy;
          let addUnit = await api.post(`transportunits`, newUnit);
          if (addUnit.status === 201) {
            handleGlobalAlert("success", "Unidad Agregada correctamente!", "basic", dispatch, 6000);
            resetForm();
            handleToggleUnits();
            refreshData();
          }
          setLoadingCreated(false);
        } catch (error) {
        handleGlobalAlert("error", "No se pudo agregar, intentalo más tarde!", "basic", dispatch, 6000);
        setLoadingCreated(false);
          console.log(error); 
    }
  }

  const handleEditUnit = async formData => {
    setLoadingCreated(true);
        try {
          let newUnit = {};
          newUnit.brand = formData.brand;
          newUnit.model = formData.model;
          newUnit.mileage = formData.mileage;
          newUnit.tuition = formData.tuition;
          //newUnit.engine_number = formData.engine_number;
          newUnit.vehicle_series = formData.vehicle_series;
          //newUnit.circulation_card = formData.circulation_card;
          newUnit.insurance_policy = formData.insurance_policy;
          let addUnit = await api.put(`transportunits/${unitSelect.id}`, newUnit);
          if (addUnit.status === 200) {
            handleGlobalAlert("success", "Unidad Editada correctamente!", "basic", dispatch, 6000);
            resetForm();
            handleToggleUnits();
            refreshData();
          }
          setLoadingCreated(false);
        } catch (error) {
        handleGlobalAlert("error", "No se pude Editar, intentalo más tarde!", "basic", dispatch, 6000);
        setLoadingCreated(false);
          console.log(error); 
    }
  }

  if (isEditing && unitSelect) {
    setValue("brand", unitSelect.brand);
    setValue("model", unitSelect.model);
    setValue("mileage", unitSelect.mileage);
    setValue("tuition", unitSelect.tuition);
    //setValue("engine_number",unitSelect.engine_number);
    setValue("vehicle_series", unitSelect.vehicle_series);
    //setValue("circulation_card",unitSelect.circulation_card);
    setValue("insurance_policy", unitSelect.insurance_policy);
}


  const resetForm = () => {
    setValue("brand", "");
    setValue("model", "");
    setValue("mileage", "");
    setValue("tuition","");
    //setValue("engine_number","");
    setValue("vehicle_series","");
    //setValue("circulation_card","");
    setValue("insurance_policy","");
  };
      return { register, handleSubmit, errors, handleAddUnit,loadingCreated,resetForm,handleEditUnit};
}
