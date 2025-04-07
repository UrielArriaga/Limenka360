import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import styled from "styled-components";
import { device } from "../../styles/global.styles";
import { useForm, Controller } from "react-hook-form";
import { toUpperCaseChart, formatDate, returnFomatTime } from "../../utils";
import { IconButton, Dialog, CircularProgress, Tooltip, Fade, Popover, Grid } from "@material-ui/core";
import RequestCommon from "../../services/request_Common";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { refetchSlopes, refetchSlopesToday } from "../../redux/slices/slopesSlice";
import { AccountBox, Create, DoubleArrowOutlined, ListOutlined, TodayOutlined } from "@material-ui/icons";
export default function CompletePending(data) {
  const commonApi = new RequestCommon();
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const [dataActions, setDataActions] = useState([]);
  const [dataPhases, setDataPhases] = useState([]);
  const [loaderCompletePending, setLoaderCompletePending] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: { reason: '', observations: '', phase: data.pending?.prospect?.phaseId || '',
    }
  });

  useEffect(() => {
    console.log("role en modal:", data.role);
    if (data.open === true) {
      showValuesForm();
      if (dataPhases.length <= 0) {
        getPhases();
      }
      if (dataActions.length <= 0) {
        getActions();
      }
    } else {
      cleanFormValues();
    }
  }, [data.open]);

  const getPhases = async () => {
    try {
      let phases = await commonApi.getPashes();
      setDataPhases(phases.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getActions = async () => {
    try {
      let actions = await commonApi.getActions();
      setDataActions(actions.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const showValuesForm = () => {
    setValue("phase", data.pending?.prospect?.phaseId);
  };
  const cleanFormValues = () => {
    setValue("phase", "");
    setValue("observations", "");
  };
  const validateInfo = item => {
    if (item === undefined || item === null || item === "") {
      return "";
    } else {
      return item;
    }
  };
  const handleSelectPhases = item => {
    if (item === "") {
      setValue("phase", "");
    } else {
      setValue("phase", item.id);
    }
  };
  const completePending = async formData => {
    setLoaderCompletePending(true);
    try {
      if (["director_compras", "gerente_compras"].includes(data.role)) {
        const trackingData = {
          reason: formData.reason,
          observations: formData.observations,
          createdbyId: id_user
        };
  
        await api.post(`trackingsshoppings`, trackingData);

        await api.put(`pendingsshopping/${data.pending.id}`, { 
          isdone: true,
          description: formData.observations
        });
      } else {
      let responseUpdate = await api.put(`pendings/${data.pending.id}`, { isdone: true });
      if (responseUpdate.status === 200) {
        updatePhaseProspect(data.pending?.prospectId, formData.phase);
        createTracking(formData.observations);
      }
      }
      dispatch(refetchSlopes());
      dispatch(refetchSlopesToday());
      data.close();
      data.setRefetch(!data.refetch);
      if (data?.title) {
        data.GlobaldataRefetch();
      }
      const successMessage = ["director_compras", "gerente_compras"].includes(data.role) 
      ? "Pendiente finalizado correctamente" 
      : "Pendiente - Realizado Correctamente!";
      data.handleAlert("success", successMessage, "basic");
    } catch (error) {
      console.log(error);
      const errorMessage = ["director_compras", "gerente_compras"].includes(data.role)
      ? "Error al finalizar pendiente"
      : "Pendientes - Error al Marcar como Completado!";
      data.handleAlert("error", errorMessage);
    } finally {
      setLoaderCompletePending(false);
    }
  };
  const createTracking = async observationsComplete => {
    try {
      let query = {};
      let action = dataActions.filter(action => action.name == data.pending.pendingstype.name);
      query.prospectId = data.pending.prospectId;
      query.observations = `${observationsComplete}`;
      query.actionId = action[0].id;
      // query.status = data.pending.prospect.status;
      query.status = data.pending.status;
      query.reason = `Seguimiento Automático`;
      query.phaseId = data.pending.prospect.phaseId;
      query.createdbyId = id_user;
      if (data.pending.status === 2 || data.pending.status === 4 || data.pending.status === 5) {
        query.oportunityId = data.pending.oportunityId;
      }
      await api.post(`trackings`, query);
    } catch (error) {
      console.log(error);
    }
  };
  const updatePhaseProspect = async (idProspect, idPhase) => {
    try {
      if (data.pending?.prospect?.phaseId !== idPhase) {
        let updateProspect = await api.put(`prospects/${idProspect}`, { phaseId: idPhase });
      }
    } catch (error) {
      data.handleAlert("error", "Prospecto - Error al Actualizar la Fase");
      console.log(error);
    }
  };

  return (
    <Dialog onClose={data.close} open={data.open}>
      <DialogComplete>
        <div className="title">
          <p>Completar Pendiente</p>
          {loaderCompletePending && <CircularProgress className="title__loader" />}
        </div>
        <form onSubmit={handleSubmit(completePending)}>
          <Grid container className="dialogContainer">
          {["director_compras", "gerente_compras"].includes(data.role) ? (
              <>
                {/* campo de razon */}
                <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
                  <div className="dialogContainer__item__header">
                    <Create className="dialogContainer__item__header__icon" />
                    <p className="dialogContainer__item__header__title">Razón*</p>
                    {errors.reason && <Error>{"Requerido"}</Error>}
                  </div>
                  <textarea
                    className="dialogContainer__item__textArea"
                    {...register("reason", { required: ["director_compras", "gerente_compras"].includes(data.role) })}
                    placeholder="Ingrese la razón de finalización"
                  />
                </Grid>
              </>
            ) : (
              <>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <ListOutlined className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Asunto</p>
              </div>
              <p className="dialogContainer__item__content">{validateInfo(data.pending?.subject)}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <AccountBox className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Contacto</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(data.pending?.prospect?.name))}{" "}
                {toUpperCaseChart(validateInfo(data.pending?.prospect?.lastname))}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <TodayOutlined className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Fecha</p>
              </div>
              <p className="dialogContainer__item__content">
                {formatDate(data.pending?.date_from)} {returnFomatTime(data.pending?.date_from)}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <TodayOutlined className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Hasta</p>
              </div>
              <p className="dialogContainer__item__content">
                {data.pending?.date_to === null
                  ? "Sin Fecha Limite"
                  : formatDate(data.pending?.date_to) + " " + returnFomatTime(data.pending?.date_to)}
              </p>
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <ListOutlined className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Descripción</p>
              </div>
              <p className="dialogContainer__item__content">
                {data.pending?.description === "" ? "Sin Descripción" : data.pending?.description}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <DoubleArrowOutlined className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Fase*</p>
                {watch("phase") === "" && errors.phase && errors.phase.type === "required" && (
                  <Error>{"Requerido"}</Error>
                )}
              </div>
              <Controller
                name="phase"
                control={control}
                rules={{ required: ["director_compras", "gerente_compras"].includes(data.role) }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="dialogContainer__item__select"
                    placeholder="elige una opción"
                    isClearable={true}
                    options={dataPhases}
                    onChange={e => (e === null ? handleSelectPhases("") : handleSelectPhases(e))}
                    value={dataPhases.filter(item => item.id === field.value)}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${option.name} `}
                    maxMenuHeight={220}
                  />
                )}
              />
            </Grid>
            </>
            )}
            <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Create className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">{["director_compras", "gerente_compras"].includes(data.role) ? "Comentarios*" : "Observaciones*"}</p>
                {errors.observations && errors.observations.type === "required" && <Error>{"Requerido"}</Error>}
              </div>
              <textarea
                className="dialogContainer__item__textArea"
                {...register("observations", {
                  required: true,
                })}
                placeholder={["director_compras", "gerente_compras"].includes(data.role) 
                ? "Agregue comentarios adicionales"
                : "Escriba alguna Observación, esta se agregará al seguimiento"
                }
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="dialogContainer__buttons">
              <button
                disabled={loaderCompletePending}
                onClick={data.close}
                className={`dialogContainer__buttons__cancel ${loaderCompletePending && "disabled"}`}
              >
                Cancelar
              </button>
              <button
                disabled={loaderCompletePending}
                type="submit"
                className={`dialogContainer__buttons__acept ${loaderCompletePending && "disabled"}`}
              >
                {["director_compras", "gerente_compras"].includes(data.role) ? "Finalizar Pendiente" : "Marcar como Completado"}
              </button>
            </Grid>
          </Grid>
        </form>
      </DialogComplete>
    </Dialog>
  );
}

const DialogComplete = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #103c82;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: sticky;
    top: 0;
    &__loader {
      color: #fff;
    }
  }
  .dialogContainer {
    overflow-x: hidden;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
    display: flex;
    padding: 20px;
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
      }
      &__content {
        font-weight: 500;
      }
      &__select {
        font-weight: 500;
      }
      &__select__value-container {
        height: 15px;
      }

      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      &__cancel {
        color: #fff;
        padding: 5px;
        background-color: #000000;
        border-radius: 4px;
        margin-right: 5px;
        transition: 0.3s;
        &:hover {
          background-color: #fff;
          color: #000000;
          cursor: pointer;
        }
      }
      &__acept {
        margin-left: 5px;
        color: #fff;
        padding: 5px;
        background-color: #0c203b;
        border-radius: 4px;
        transition: 0.3s;
        &:hover {
          background-color: #fff;
          color: #0c203b;
          cursor: pointer;
        }
      }
      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__loader {
      }
    }
  }
`;

const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: red;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  margin-left: 5px;
  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
