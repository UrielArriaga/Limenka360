import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { useForm } from "react-hook-form";
import { handleGlobalAlert } from "../../../utils";
import { ACTIONIDPRODUCTIONMODE, api } from "../../../services/api";

export default function useNewTracking(params) {
  const { orderSelectedData = null, reloadTrackings, setShowAddForm } = params;
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loadingCreated, setLoadingCreated] = useState(false);

  const handleAddTracing = async formData => {
    setLoadingCreated(true);
    try {
      let newTracing = {};
      newTracing.status = "5";
      newTracing.prospectId = orderSelectedData?.oportunity?.prospectId;
      newTracing.oportunityId = orderSelectedData?.oportunityId;
      newTracing.orderId = orderSelectedData?.id;
      newTracing.status = "5";
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.actionId = ACTIONIDPRODUCTIONMODE;
      newTracing.createdbyId = id_user;
      newTracing.phaseId = orderSelectedData?.oportunity?.phaseId;
      let addTracking = await api.post(`trackings`, newTracing);
      if (addTracking.status === 201) {
        handleGlobalAlert("success", "Seguimientos - Creado Correctamente!", "basic", dispatch, 6000);
        resetForm();
        reloadTrackings();
      }
      setLoadingCreated(false);
    } catch (error) {
      handleGlobalAlert("error", "Seguimientos - No se pudo crear el seguimiento!", "basic", dispatch, 6000);
      setLoadingCreated(false);
      console.log(error);
    }
  };

  const resetForm = () => {
    setValue("observations", "");
    setValue("reason", "");
    setShowAddForm(false);
  };
  return { register, handleSubmit, errors, handleAddTracing, resetForm, loadingCreated };
}
