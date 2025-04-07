import { Button, Grid, Switch, Dialog, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { DialogContainer } from "./styles";

export default function ModalTracking(props) {
  const { orderData, open, close, refreshTrackings } = props;
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();
  const { actions, phases } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [act, setAct] = useState({
    value: "",
    name: "",
  });
  const oportunity = orderData.oportunity;
  const prospect = orderData.oportunity.prospect;
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open) {
      SetValues(prospect);
      let oldActions = actions.results.find(phaseArr => phaseArr.name === "Seguimiento Automatico");
      if (oldActions) {
        setValue("action", oldActions.id);
        setAct({ value: oldActions?.id, name: oldActions?.name });
      }
      getCatalogBy("phases");
    }
  }, [open]);

  useEffect(() => {
    cleanForm();
  }, [close]);

  function SetValues(prospect) {
    setValue("phase", prospect?.phaseId);
    setValue("contact", prospect.fullname);
  }

  const cleanForm = () => {
    setValue("reason", "");
    setValue("observations", "");
  };

  const validatePhase = idPhase => {
    let phase = phases.results.find(item => item.id === idPhase);
    return phase.name ? toUpperCaseChart(phase.name) : "Sin Fase Anterior";
  };

  const handleAddTracing = async formData => {
    try {
      setIsLoadingCreate(true);
      handleGlobalAlert("info", "Un momento - Creando Seguimiento", "basic", dispatch, 6000);
      let newTracing = {};
      newTracing.prospectId = prospect?.id;
      newTracing.oportunityId = oportunity?.id;
      newTracing.orderId = orderData?.id;
      newTracing.status = "5";
      ///////////////////////////////////////////
      newTracing.actionId = formData.action;
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.phaseId = formData.phase;
      newTracing.createdbyId = id_user;
      let addTracking = await api.post(`trackings`, newTracing);

      if (addTracking.status == 201) {
        handleGlobalAlert("success", "Seguimientos - Creado Correctamente!", "basic", dispatch, 6000);
        if (formData.phase !== prospect?.phaseId) {
          let newTracingPhase = {};

          newTracingPhase.prospectId = prospect?.id;
          newTracingPhase.oportunityId = oportunity?.id;
          newTracingPhase.orderId = orderData?.id;
          newTracingPhase.status = "5";

          newTracingPhase.actionId = formData.action;
          newTracingPhase.reason = formData.reason;
          newTracingPhase.observations = `La fase ha sido cambiada. Fase anterior: ${validatePhase(prospect.phaseId)} `;
          newTracingPhase.phaseId = formData.phase;
          newTracingPhase.createdbyId = id_user;
          await api.put(`prospects/${prospect?.id}`, {
            phaseId: formData.phase,
          });

          if (prospect.isclient !== true) {
            if (prospect?.isoportunity == true) {
              await api.put(`oportunities/${oportunity.id}`, {
                phaseId: formData.phase,
              });
            }
          }
          await api.post(`trackings`, newTracingPhase);
        }
        setIsLoadingCreate(false);
        close();
        refreshTrackings();
      }
    } catch (err) {
      handleGlobalAlert("error", "Seguimiento - Error al crear seguimiento automático!", "basic", dispatch, 6000);
      setIsLoadingCreate(false);
      console.log(err);
    }
  };
  const handleSelectChange = e => {
    const selectedAction = actions.results.find(item => item.id == e.target.value);
    setAct({ value: selectedAction.id, name: selectedAction.name });
  };

  return (
    <Dialog
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Agregar Seguimiento</p>
          {isLoadingCreate && <CircularProgress className="headerDialog__loader" />}
        </div>
        <form onSubmit={handleSubmit(handleAddTracing)}>
          <Grid spacing={1} container className="ctr_inputs">
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Contacto</label>
              <input {...register("contact")} name="contact" disabled={true} className="ctr_inputs__input capitalize" />
            </Grid>
            {/* <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Empresa</label>
              <input
                id="company"
                name="company"
                disabled={true}
                className="ctr_inputs__input capitalize"
                value={data?.prospect?.itemBD?.companyname}
              />
            </Grid> */}

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
                  <option disabled={true} value={null}>
                    Cargando Opciones...
                  </option>
                )}
                {phases.results.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
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
                  <option disabled={true} value={null}>
                    Cargando Opciones...
                  </option>
                )}
                {actions.results.map((item, index) => (
                  <option value={item.id} key={index}>
                    {item.name}
                  </option>
                ))}
              </select>
            </Grid>
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Asunto *</label>
              <input
                {...register("reason", { required: true })}
                id="reason"
                name="reason"
                className={errors?.reason?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>

            <Grid item xs={12}>
              <label className="ctr_inputs__label">Comentarios *</label>
              <textarea
                {...register("observations", { required: true })}
                id="observations"
                name="observations"
                className={errors?.observations?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              color="secondary"
              className="btn_cancel"
              onClick={() => close()}
            >
              Cancelar
            </Button>
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              color="primary"
              className="btn_upload"
              onClick={handleSubmit(handleAddTracing)}
            >
              Guardar
            </Button>
          </Grid>
        </form>
      </DialogContainer>
    </Dialog>
  );
}
