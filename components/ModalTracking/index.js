import { Button, Grid, Switch, Dialog, CircularProgress } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DialogContainer } from "../TableTracing/tabletracing.styles";
import RequestCommon from "../../services/request_Common";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { capitalizeString, toUpperCaseChart } from "../../utils";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";

export default function ModalTracking(data) {
  const { id_user } = useSelector(userSelector);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { actions, phases } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [act, setAct] = useState({
    value: "",
    name: "",
  });

  useEffect(() => {
    if (data.open) {
      SetValues(data.prospectEdit);
      let oldActions = actions.results.find(phaseArr => phaseArr.name === "Seguimiento Automatico");
      if (oldActions) {
        setValue("action", oldActions.id);
        setAct({ value: oldActions?.id, name: oldActions?.name });
      }
    }
  }, [data.open]);

  function SetValues(prospect) {
    setValue("concept", prospect.itemBD ? prospect?.concepto : prospect?.concept);
    setValue(
      "contact",
      prospect.itemBD
        ? prospect?.itemBD?.name + " " + prospect?.itemBD?.lastname
        : prospect?.name + " " + prospect?.lastname
    );
    setValue("phase", prospect?.phase?.id);
  }

  useEffect(() => {
    cleanForm();
  }, [data.close]);

  const cleanForm = () => {
    setValue("reason", "");
    setValue("observations", "");
  };

  const handleAddTracing = async formData => {
    try {
      setIsLoadingCreate(true);
      data.setAlert({
        severity: "info",
        show: true,
        message: "Un momento - Creando Seguimiento",
        type: "load",
      });
      let newTracing = {};

      //se modificados los status por banderas 10/11/2022
      newTracing.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
      newTracing.status = "1";

      if (data?.prospect?.itemBD ? data?.prospect?.itemBD?.isoportunity : data?.prospect?.isoportunity == true) {
        newTracing.oportunityId = data?.prospect?.id;
        newTracing.status = "2";
        newTracing.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
      }

      if (data?.isclient == true) {
        newTracing.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
        newTracing.status = "3";
        newTracing.oportunityId = "";
      }
      if (data?.isCloseOut == true) {
        newTracing.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
        newTracing.oportunityId = data?.prospect?.id;
        newTracing.status = "4";
      }
      if (data?.isOrder == true) {
        newTracing.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
        newTracing.oportunityId = data?.prospect?.oportunityData?.id;
        newTracing.orderId = data?.prospect?.orderId;
        newTracing.status = "5";
      }
      ///////////////////////////////////////////
      newTracing.actionId = formData.action;
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.phaseId = formData.phase;
      newTracing.createdbyId = id_user;
      let addTracking = await api.post(`trackings`, newTracing);

      if (addTracking.status == 201) {
        data.setAlert({ severity: null, show: false, message: null, type: null });
        data.handleAlert("success", "Seguimientos - Creado Correctamente!", "basic");
        if (formData.phase !== data?.prospect?.phase?.id) {
          let newTracingPhase = {};
          newTracingPhase.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
          newTracingPhase.status = "1";
          if (data?.prospect?.itemBD ? data?.prospect?.itemBD?.isoportunity : data?.prospect?.isoportunity == true) {
            newTracingPhase.oportunityId = data?.prospect?.id;
            newTracingPhase.status = "2";
            newTracingPhase.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
          }
          if (data?.isclient == true) {
            newTracingPhase.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
            newTracingPhase.status = "3";
            newTracingPhase.oportunityId = "";
          }
          if (data?.isCloseOut == true) {
            newTracingPhase.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
            newTracingPhase.oportunityId = data?.prospect?.id;
            newTracingPhase.status = "4";
          }
          if (data?.isOrder == true) {
            newTracingPhase.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id;
            newTracingPhase.oportunityId = data?.prospect?.oportunityData?.id;
            newTracingPhase.orderId = data?.prospect?.orderId;
            newTracingPhase.status = "5";
          }
          newTracingPhase.actionId = formData.action;
          newTracingPhase.reason = formData.reason;
          newTracingPhase.observations = `La fase ha sido cambiada. Fase anterior: ${
            data?.prospect?.itemBD
              ? toUpperCaseChart(data?.prospect?.itemBD ? data?.prospect?.phase?.name : data?.prospect?.name)
              : "Sin fase anterior"
          } `;
          newTracingPhase.phaseId = formData.phase;
          newTracingPhase.createdbyId = id_user;
          await api.put(`prospects/${data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.prospect?.id}`, {
            phaseId: formData.phase,
          });

          if (data?.isclient !== true) {
            if (data?.prospect?.itemBD ? data?.prospect?.itemBD?.isoportunity : data?.prospect?.isoportunity == true) {
              await api.put(
                `oportunities/${data?.isOrder == true ? data?.prospect?.oportunityData?.id : data?.prospect?.id}`,
                {
                  phaseId: formData.phase,
                }
              );
            }
          }
          await api.post(`trackings`, newTracingPhase);
        }
        setIsLoadingCreate(false);
        data.close();
        data.setFlag(!data.flag);
      }
    } catch (err) {
      data.setAlert({ severity: null, show: false, message: null, type: null });
      data.handleAlert("error", "Seguimiento - Error al crear seguimiento automático!", "basic");
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
      open={data.open}
      keepMounted
      onClose={(event, reason) => {
        if (reason && reason === "backdropClick") return;
        data.close();
      }}
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
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Empresa</label>
              <input
                id="company"
                name="company"
                disabled={true}
                className="ctr_inputs__input capitalize"
                value={data?.prospect?.itemBD?.companyname}
              />
            </Grid>
            {data?.prospect?.itemBD?.isoportunity == true && data?.prospect?.itemBD?.isclient == false && (
              <Grid item xs={12} md={12}>
                <label className="ctr_inputs__label"> Agregar seguimiento a Cotización</label>
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
              onClick={() => {
                data?.close();
              }}
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
