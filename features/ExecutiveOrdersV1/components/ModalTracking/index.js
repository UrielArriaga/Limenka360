import { Button, Grid, Dialog, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DialogContainer } from "./styles";
import { api } from "../../../../services/api";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { toUpperCaseChart } from "../../../../utils";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import useAlertToast from "../../../../hooks/useAlertToast";

export default function ModalTracking({
  open,
  close,
  prospect: prospectData,
  isOrder,
  refetchDataTrackings,
}) {
  const { id_user } = useSelector(userSelector);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm();
  const { actions, phases } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const { showAlertError, showAlertSucces } = useAlertToast();
  const [act, setAct] = useState({
    value: "",
    name: "",
  });

  useEffect(() => {
    if (open) {
      setValue(
        "contact",
        `${prospectData?.name || ""} ${prospectData?.lastname || ""}`
      );
      setValue("company", prospectData?.clientCompanyId || "");
      setValue(
        "concept",
        prospectData?.lastTracking?.oportunity?.concept || ""
      );
      setValue("phase", prospectData?.phase?.id || "");

      let autoAction = actions.results.find(
        (action) => action.name === "Seguimiento Automatico"
      );
      if (autoAction) {
        setValue("action", autoAction.id);
        setAct({ value: autoAction.id, name: autoAction.name });
      }
    } else {
      reset();
      setAct({ value: "", name: "" });
    }
  }, [open, prospectData, actions.results, setValue, reset]);

  const handleAddTracing = async (formData) => {
    try {
      setIsLoadingCreate(true);
      let newTracing = {};
      newTracing.prospectId = prospectData?.id;
      newTracing.status = "1";

      if (prospectData?.isoportunity) {
        newTracing.oportunityId = prospectData?.lastTracking?.oportunityId;
        newTracing.status = "2";
      }
      if (prospectData?.isclient) {
        newTracing.status = "3";
        if (prospectData?.lastTracking?.oportunityId) {
          newTracing.oportunityId = prospectData.lastTracking.oportunityId;
        }
      }

      if (prospectData?.lastTracking?.oportunity?.iscloseout) {
        newTracing.oportunityId = prospectData?.lastTracking?.oportunityId;
        newTracing.status = "4";
      }

      if (isOrder) {
        newTracing.oportunityId = prospectData?.lastTracking?.oportunityId;
        newTracing.orderId = prospectData?.lastTracking?.orderId;
        newTracing.status = "5";
      }

      newTracing.actionId = formData.action;
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.phaseId = formData.phase;
      newTracing.createdbyId = id_user;
      let addTracking = await api.post(`trackings`, newTracing);

      if (addTracking.status === 201) {
        showAlertSucces("Seguimiento creado correctamente");

        if (formData.phase !== prospectData?.phase?.id) {
          let newTracingPhase = { ...newTracing };
          newTracingPhase.observations = `La fase ha sido cambiada. Fase anterior: ${
            prospectData?.phase?.name
              ? toUpperCaseChart(prospectData.phase.name)
              : "Sin fase anterior"
          }`;
          newTracingPhase.phaseId = formData.phase;
          newTracingPhase.actionId = formData.action;

          await api.put(`prospects/${prospectData.id}`, {
            phaseId: formData.phase,
          });

          if (!prospectData?.isclient && prospectData?.isoportunity) {
            await api.put(
              `oportunities/${prospectData?.lastTracking?.oportunityId}`,
              { phaseId: formData.phase }
            );
          }
          await api.post(`trackings`, newTracingPhase);
        }
        setIsLoadingCreate(false);
        close();
        refetchDataTrackings();
      }
    } catch (err) {
      showAlertError("Error al crear seguimiento");
      setIsLoadingCreate(false);
      console.error("Error creating tracking:", err);
    }
  };

  const handleSelectChange = (e) => {
    const selectedAction = actions.results.find(
      (item) => item.id == e.target.value
    );
    setAct({
      value: selectedAction?.id || "",
      name: selectedAction?.name || "",
    });
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") return;
        close();
      }}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Agregar Seguimiento</p>
          {isLoadingCreate && (
            <CircularProgress className="headerDialog__loader" />
          )}
        </div>
        <form onSubmit={handleSubmit(handleAddTracing)}>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Contacto</label>
              <input
                {...register("contact")}
                name="contact"
                disabled={true}
                className="ctr_inputs__input capitalize"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Empresa</label>
              <input
                id="company"
                name="company"
                disabled={true}
                className="ctr_inputs__input capitalize"
                value={prospectData?.clientCompany?.name || "N/A"}
              />
            </Grid>
            {prospectData?.isoportunity && !prospectData?.isclient && (
              <Grid item xs={12} md={12}>
                <label className="ctr_inputs__label">
                  Agregar seguimiento a Cotización
                </label>
                <input
                  {...register("concept")}
                  id="concept"
                  name="concept"
                  disabled={true}
                  className="ctr_inputs__input capitalize"
                />
              </Grid>
            )}
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Fase</label>
              <select
                className="ctr_inputs__input capitalize"
                {...register("phase", { required: true })}
                onClick={() => getCatalogBy("phases")}
              >
                <option hidden value="">
                  Selecciona una Opción
                </option>
                {phases.isFetching && (
                  <option disabled={true} value="">
                    Cargando Opciones...
                  </option>
                )}
                {phases.results.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.phase && (
                <span className="error-message">Este campo es requerido</span>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Acción*</label>
              <select
                value={act.value}
                className="ctr_inputs__input capitalize"
                {...register("action", { required: true })}
                onChange={handleSelectChange}
                onClick={() => getCatalogBy("actions")}
              >
                <option hidden value="">
                  Selecciona una Opción
                </option>
                {actions.isFetching && (
                  <option disabled={true} value="">
                    Cargando Opciones...
                  </option>
                )}
                {actions.results.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
              {errors.action && (
                <span className="error-message">Este campo es requerido</span>
              )}
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Asunto *</label>
              <input
                {...register("reason", { required: true })}
                id="reason"
                name="reason"
                className={
                  errors?.reason?.type === "required"
                    ? "ctr_inputs__input error"
                    : "ctr_inputs__input"
                }
              />
              {errors.reason && (
                <span className="error-message">Este campo es requerido</span>
              )}
            </Grid>

            <Grid item xs={12}>
              <label className="ctr_inputs__label">Comentarios *</label>
              <textarea
                {...register("observations", { required: true })}
                id="observations"
                name="observations"
                className={
                  errors?.observations?.type === "required"
                    ? "ctr_inputs__input error"
                    : "ctr_inputs__input"
                }
              />
              {errors.observations && (
                <span className="error-message">Este campo es requerido</span>
              )}
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              color="secondary"
              size="small"
              className="btn_cancel"
              onClick={() => {
                close();
              }}
            >
              Cancelar
            </Button>
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              color="primary"
              size="small"
              className="btn_upload"
              type="submit"
            >
              Guardar
            </Button>
          </Grid>
        </form>
      </DialogContainer>
    </Dialog>
  );
}
