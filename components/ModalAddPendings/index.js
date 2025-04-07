import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, Grid } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { refetchSlopes, refetchSlopesToday } from "../../redux/slices/slopesSlice";
import { DialogContainer } from "./styles";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";
const prioritys = [
  { name: "Baja", priority: 0 },
  { name: "Media", priority: 1 }, 
  { name: "Alta", priority: 2 },
];
const N = 6;
const zones = [
  { gmt: "GMT-05:00", zones: ["Quintana Roo"] },
  { gmt: `GMT-0${N}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: false },
  { gmt: `GMT-0${N - 1}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: true },
  { gmt: `GMT-0${N + 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: false },
  { gmt: `GMT-0${N + 1 - 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: true },

  { gmt: `GMT-0${N + 2}:00`, zones: "Baja California", summer: false },
  { gmt: `GMT-0${N + 2 - 1}:00`, zones: "Baja California", summer: true },
];
export default function AddPending(data) {
  const { actions, pendingstypes } = useSelector(commonSelector);
  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { id_user } = useSelector(userSelector);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [type, setType] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    cleanForm();
  }, [data.close]);

  useEffect(() => {
    getCatalogBy("actions");
  }, []);

  const cleanForm = () => {
    setValue("subject", "");
    setType("");
    setValue("type", "");
    setValue("cotiza", "");
    setValue("venta", "");
    setValue("pendingSale", "");
    setValue("priority", "");
    setType("Recordatorio");
    setValue("place", "");
    setValue("zone", "");
    setValue("date_from", "");
    setValue("notify_by", "");
    setValue("date_to", "");
    setValue("remember", false);
    setValue("description", "");
    setValue("remember_by", "");
    setValue("notify", false);
  };

  function formatnewDate(str) {
    let date = new Date(str);
    return date.toISOString();
  }

  const handleAddPending = async formData => {
    try {
      setIsLoadingCreate(true);
      data.handleAlert({
        severity: "info",
        show: true,
        message: "Un momento - Creando Pendiente",
        type: "load",
      });

      let newPending = {};
      //se modificados los status por banderas 10/11/2022
      newPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
      newPending.status = "1";

      if (data?.prospect?.itemBD ? data?.prospect?.itemBD?.isoportunity : data?.prospect?.isoportunity === true) {
        newPending.oportunityId = data?.prospect?.id;
        newPending.status = "2";
        newPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
      }
      if (data?.isclient == true) {
        newPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
        newPending.status = "3";
        newPending.oportunityId = "";
      }
      if (data?.isCloseOut == true) {
        newPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
        newPending.oportunityId = data?.prospect?.id;
        newPending.status = "4";
      }
      ///////////////////////////////////////////////
      newPending.createdbyId = id_user;
      newPending.priority = formData.priority;
      newPending.subject = formData.subject;
      newPending.place = formData.place;
      newPending.pendingstypeId = formData.type;
      newPending.zone = formData.zone;
      newPending.description = formData.description;
      newPending.remember = true;
      newPending.remember_by = "correo";
      newPending.notify = true;
      newPending.notify_by = "correo";
      newPending.date_from = formatnewDate(formData.date_from);
      if (formData.type == "62dp9dPnCtgdfTodXAUuzr1N" || formData.type == "62dN6LUisuI0rTZm1p5l5Lcp") {
        newPending.date_to = formatnewDate(formData.date_to);
        console.log("se agrego segunda fecha");
      }

      if (data?.tipo) {
        newPending.ejecutiveId = data?.prospect?.itemBD
          ? data?.prospect?.itemBD?.ejecutiveId
          : data?.prospect?.ejecutiveId;
      } else {
        newPending.ejecutiveId = id_user;
      }

      let addPending = await api.post(`pendings`, newPending);
      if (addPending.status == 201) {
        data.setAlert({ severity: null, show: false, message: null, type: null });
        data.handleAlert("success", "Pendiente - Creado Correctamente!", "basic");
        setIsLoadingCreate(false);
        let trackingPending = {};
        //se modificados los status por banderas 10/11/2022
        trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
        trackingPending.status = "1";

        if (data?.prospect?.itemBD ? data?.prospect?.itemBD?.isoportunity : data?.prospect?.isoportunity == true) {
          trackingPending.oportunityId = data?.prospect?.id;
          trackingPending.status = "2";
          trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
        }
        if (data?.isclient == true) {
          trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
          trackingPending.status = "3";
          trackingPending.oportunityId = "";
        }
        if (data?.isCloseOut == true) {
          trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
          trackingPending.oportunityId = data?.prospect?.id;
          trackingPending.status = "4";
        }
        trackingPending.observations = `Nuevo pendiente asignado como: ${type.name}`;
        let action = actions.results.filter(item => item.name == type.name);
        trackingPending.actionId = action[0].id;
        trackingPending.reason = "Seguimiento automático";
        trackingPending.phaseId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.phaseId : data?.prospect?.phaseId;
        trackingPending.createdbyId = id_user;
        await api.post(`trackings`, trackingPending);
        dispatch(refetchSlopes());
        dispatch(refetchSlopesToday());
        data.close();
        data.setFlag(!data.flag);
      }
    } catch (error) {
      data.setAlert({ severity: null, show: false, message: null, type: null });
      setIsLoadingCreate(false);
      if (error.response?.config?.url.includes("pendings")) {
        data.handleAlert("error", "Pendientes - Error al crear!", "basic");
      }
      console.log(error);
      if (error.response?.config?.url.includes("trackings")) {
        data.handleAlert("error", "Seguimiento - Error al crear seguimiento automático!", "basic");
      }
      data.setFlag(!data.flag);
    }
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
        <div style={{ color: "#fff" }} className="headerDialog">
          <p className="headerDialog__title">Agregar Pendiente</p>
          {isLoadingCreate && <CircularProgress className="headerDialog__loader" />}
        </div>
        <Grid spacing={1} container className="ctr_inputs">
          <Grid item xs={12} md={4}>
            <label className="ctr_inputs__label">Tipo *</label>
            <select
              {...register("type", { required: true })}
              id="type"
              name="type"
              value={type.id}
              onClick={() => getCatalogBy("pendingstypes")}
              onChange={e => {
                let type = pendingstypes.results.filter(item => item.id == e.target.value);
                setType({ name: type[0].name, id: type[0].id });
              }}
              className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            >
              <option value="" hidden>
                Seleccione un tipo
              </option>
              {pendingstypes.isFetching && (
                <option disabled={true} value={null}>
                  Cargando Opciones...
                </option>
              )}
              {pendingstypes.results.map((item, index) => {
                return (
                  <option key={index} value={item.id} className="option">
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={12} md={4}>
            <label className="ctr_inputs__label">Lugar </label>
            <input
              {...register("place", { required: false })}
              id="place"
              type="text"
              disabled={type.name !== "Cita" && type.name !== "Visita"}
              name="place"
              className={errors?.place?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <label className="ctr_inputs__label">Prioridad *</label>
            <select
              {...register("priority", { required: true })}
              className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            >
              <option value="" hidden>
                {" "}
                Seleccione uno...
              </option>
              {prioritys?.map(item => (
                <option className="option" key={item.priority} value={item.priority}>
                  {item.name}
                </option>
              ))}
            </select>
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">Asunto *</label>
            <input
              {...register("subject", { required: true })}
              id="subject"
              name="subject"
              className={errors?.subject?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>
          <Grid item xs={12}>
            <label className="ctr_inputs__label">Descripción</label>
            <textarea
              {...register("description", { required: false })}
              id="description"
              name="description"
              minLength={"600"}
              className={errors?.description?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">Fecha Inicio* </label>
            <input
              {...register("date_from", { required: true })}
              type="datetime-local"
              className={errors?.date_from?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <label className="ctr_inputs__label">Fecha Termino </label>
            <input
              {...register(
                "date_to",
                type.name !== "Cita" && type.name !== "Visita" ? { required: false } : { required: true }
              )}
              id="date_to"
              type="datetime-local"
              disabled={type.name !== "Cita" && type.name !== "Visita"}
              name="date_to"
              className={errors?.date_to?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>

          <Grid item xs={12}>
            <label className="ctr_inputs__label">Zona Horaria* </label>
            <select
              {...register("zone", { required: true })}
              className={errors?.zone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            >
              <option value="" hidden>
                Seleccione uno...
              </option>
              {zones?.map((item, index) => (
                <option key={index} value={item.gmt}>
                  ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano)" : null}
                </option>
              ))}
            </select>
          </Grid>
        </Grid>
        <Grid container className="ctr_buttons">
          <Button
            disabled={isLoadingCreate}
            variant="contained"
            className={`btn_cancel ${isLoadingCreate && "disabled"}`}
            onClick={() => data.close()}
          >
            Cancelar
          </Button>
          <Button
            disabled={isLoadingCreate}
            variant="contained"
            className={`btn_upload ${isLoadingCreate && "disabled"}`}
            onClick={handleSubmit(handleAddPending)}
          >
            Guardar
          </Button>
        </Grid>
      </DialogContainer>
    </Dialog>
  );
}
