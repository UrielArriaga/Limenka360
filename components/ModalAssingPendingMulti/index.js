import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  Avatar,
  Badge,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tooltip,
} from "@material-ui/core";
import { Delete, DeleteOutline, ExpandLess, ExpandMore, Mail, Remove } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import RequestCommon from "../../services/request_Common";
import { URL_SPACE } from "../../services/api";
import useFetch from "../../hooks/useFetch";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { refetchSlopes, refetchSlopesToday } from "../../redux/slices/slopesSlice";

// #region constants
const priorities = [
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
// #endregion

// #region styled-components
const DialogContainer = styled.div`
  /* padding: 0 20px; */
  .tag_error {
    color: red;
    font-size: 10px;
  }
  P {
    margin: 0;
  }
  max-height: 650px;
  max-width: 550px;

  display: flex;
  flex-direction: column;
  overflow: auto;
  transition: all 0.6s ease;

  .headerDialog {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0c203b;
    /* margin-bottom: 15px; */
    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.05em;
    }
    &__loader {
      color: #fff;
    }
  }

  .bodyDialog {
    padding: 20px;
  }

  .container-user {
    margin: 1em 0;
    padding: 1em;
    border-radius: 5px;
    border: 1px solid #0c203b;
    &-header {
      display: flex;
      justify-content: space-between;
      &-left {
        display: flex;
        &-content {
          margin: 0 1em;
        }
      }
    }
  }
  .warningnBorder {
    border: 1px solid green;
  }

  .ctr_inputs {
    /* padding: 1em 0; */

    &__label {
      font-size: 12px;
      font-weight: bold;
      color: #4f4f4f;
    }
    &__input {
      width: 100%;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      min-height: 36px;
      resize: none;
      padding: 0px 5px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .ctr_input {
      padding: 0.5em;
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
      color: #fff;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
  .ctr_slope {
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      span {
        color: #0c203b;
      }
    }
    &__item {
      width: 100%;
      .label {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 0.02em;
        color: #626262;
        svg {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 5px;
          color: #115293;
        }
      }
      .text {
        color: #000;
        font-weight: 600;
      }
      .span {
        color: #c7c7c7;
        font-size: 14px;
        font-weight: 500;
      }
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .btn_close {
        text-transform: capitalize;
        background-color: #000;
        color: #fff;
        margin-right: 10px;
      }
      .btn_complete {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }
`;

// #endregion

// #region functions
function formatnewDate(str) {
  let date = new Date(str);
  return date.toISOString();
}

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const ModalAssignPendingMulti = ({
  open,
  setopen,
  flag,
  setFlag,
  prospects,
  setProspects,
  setCheckedUsers,
  handleAlert,
  setAlert,
}) => {
  const [priority, setPriority] = useState(1);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);
  const [type, setType] = useState({});
  const [pendingsType, setPendingsType] = useState([]);
  const [actions, setActions] = useState([]);
  const [infoSend, setInfoSend] = useState([]);
  const { id_user } = useSelector(userSelector);
  const dispatch = useDispatch();

  const commonApi = new RequestCommon();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const getActions = async () => {
        try {
          let actions = await commonApi.getActions();
          setActions(actions.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      const getPendingsTypes = async () => {
        try {
          let pendings = await commonApi.getTypePendings();
          setPendingsType(pendings.data.results);
        } catch (error) {
          console.log(error);
        }
      };
      getActions();
      getPendingsTypes();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let auxArr = [];
    for (let index = 0; index < prospects.length; index++) {
      auxArr.push({
        id: prospects[index].id,
        prospect: prospects[index],
        createdbyId: id_user,
        date_from: new Date().toISOString().slice(0, -8),
        date_to: "",
        name: prospects[index].name,
        pendingstypeId: "62dp9dPnCtgdfTodXAUuzr1N",
        description: "",
        ejecutiveFullname: prospects[index]?.ejecutive.fullname,
        ejecutiveId: prospects[index]?.ejecutive.id,
        notify: true,
        notify_by: "correo",
        place: "",
        priority: { name: "Baja", priority: 0 },
        prospectId: prospects[index].id,
        remember: true,
        remember_by: "correo",
        subject: "",
        zone: "",
        type: { name: "Llamada", id: "62dQiGAWr0P53bbpmnYtXmd5" },
      });
    }

    setInfoSend(auxArr);
  }, [prospects]);

  const handleDelete = id => {
    const updatedItems = infoSend.filter(item => item.id !== id);
    const updatedItemsPros = prospects.filter(item => item.id !== id);

    setInfoSend(updatedItems);
    setProspects(updatedItemsPros);
    if (updatedItemsPros.length === 0) {
      setopen(false);
    }
  };

  // #region Handlers
  //This could be maded has generic one but urge to implement
  const handleType = (id, e) => {
    const updatedItems = infoSend.map(item => {
      if (item.id === id) {
        return { ...item, type: e };
      }
      return item;
    });

    setInfoSend(updatedItems);
  };

  const handlePlace = (id, e) => {
    const updatedItems = infoSend.map(item => {
      if (item.id === id) {
        return { ...item, place: e };
      }
      return item;
    });

    setInfoSend(updatedItems);
  };

  const handlePriority = (id, e) => {
    const updatedItems = infoSend.map(item => {
      if (item.id === id) {
        return { ...item, priority: e };
      }
      return item;
    });

    setInfoSend(updatedItems);
  };

  const handleDateFrom = (id, e) => {
    let newDate = new Date(e).toISOString().slice(0, -8);
    const updatedItems = infoSend.map(item => {
      if (item.id === id) {
        return { ...item, date_from: newDate };
      }
      return item;
    });

    setInfoSend(updatedItems);
  };

  const handleDateTo = (id, e) => {
    const updatedItems = infoSend.map(item => {
      if (item.id === id) {
        return { ...item, date_to: e };
      }
      return item;
    });

    setInfoSend(updatedItems);
  };

  const handleZone = (id, e) => {
    const updatedItems = infoSend.map(item => {
      if (item.id === id) {
        return { ...item, zone: e };
      }
      return item;
    });

    setInfoSend(updatedItems);
  };

  // #endregion

  const handleClose = () => {
    setopen(false);
    // if (setCheckedUsers)
    setCheckedUsers([]);
  };

  const handleAddPending = formData => {
    if (date_from) {
      handleAlert("error", "Pendientes - Error al crear!", "basic");
    }
    if (infoSend.some(e => e.zone === "")) {
      alert("Elemento vacio");
      return;
    }

    try {
      setIsLoadingCreate(true);

      handleAlert({
        severity: "info",
        show: true,
        message: "Un momento - Creando Pendiente",
        type: "load",
      });

      for (var i = 0; i < infoSend.length; i++) {
        infoSend[i].description = formData.description;
        infoSend[i].subject = formData.subject;
      }

      infoSend.forEach(postData => {
        postPending(postData);
      });

      handleClose();
    } catch (error) {
      setAlert({ severity: null, show: false, message: null, type: null });
      setIsLoadingCreate(false);
      if (error.response?.config?.url.includes("pendings")) {
        handleAlert("error", "Pendientes - Error al crear!", "basic");
      }
      console.log(error);
      if (error.response?.config?.url.includes("trackings")) {
        handleAlert("error", "Seguimiento - Error al crear seguimiento automático!", "basic");
      }
      setFlag(!flag);
    }
    handleClose();
  };
  const postPending = async data => {
    try {
      // let newDataToSend = getNewData(data);
      const newDataToSend = JSON.parse(JSON.stringify(data));

      newDataToSend.status = "1";

      if (data?.prospect?.isoportunity) {
        newDataToSend.oportunityId = data?.prospect?.id;
        newDataToSend.status = "2";
      }
      if (data?.isclient == true) {
        newDataToSend.oportunityId = "";
        newDataToSend.status = "3";
      }
      if (data?.isCloseOut == true) {
        newDataToSend.oportunityId = data?.prospect?.id;
        newDataToSend.status = "4";
      }

      ///////////////////////////////////////////////

      newDataToSend.priority = data.priority.priority;
      newDataToSend.pendingstypeId = data.type.id;
      newDataToSend.date_from = formatnewDate(data.date_from);

      if (data.type.id == "62dp9dPnCtgdfTodXAUuzr1N" || data.type.id == "62dN6LUisuI0rTZm1p5l5Lcp") {
        newDataToSend.date_to = formatnewDate(data.date_to);
      } else {
        delete newDataToSend.date_to;
      }
      delete newDataToSend.prospect;
      delete newDataToSend.name;
      delete newDataToSend.ejecutiveFullname;

      // if (data?.tipo) {
      //   newPending.ejecutiveId = data?.prospect?.itemBD
      //     ? data?.prospect?.itemBD?.ejecutiveId
      //     : data?.prospect?.ejecutiveId;
      // } else {
      //   newPending.ejecutiveId = id_user;
      // }

      let addPending = await api.post(`pendings`, newDataToSend);
      setIsLoadingCreate(false);

      if (addPending.status == 201) {
        // data.setAlert({ severity: null, show: false, message: null, type: null });
        // data.handleAlert("success", "Pendiente - Creado Correctamente!", "basic");
        setIsLoadingCreate(false);
        let trackingPending = {};
        //se modificados los status por banderas 10/11/2022
        trackingPending.prospectId = data?.prospectId;
        trackingPending.status = "1";

        // #region example
        if (data?.prospect?.isoportunity) {
          newDataToSend.oportunityId = data?.prospect?.id;
          newDataToSend.status = "2";
        }
        if (data?.isclient == true) {
          newDataToSend.oportunityId = "";
          newDataToSend.status = "3";
        }
        if (data?.isCloseOut == true) {
          newDataToSend.oportunityId = data?.prospect?.id;
          newDataToSend.status = "4";
        }
        // #endregion

        if (data?.prospect?.isoportunity) {
          trackingPending.oportunityId = data?.prospect?.id;
          trackingPending.status = "2";
          trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
        }
        if (data?.prospect?.isclient) {
          trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
          trackingPending.status = "3";
          trackingPending.oportunityId = "";
        }
        if (data?.prospect?.isCloseOut) {
          trackingPending.prospectId = data?.prospect?.itemBD ? data?.prospect?.itemBD?.id : data?.id;
          trackingPending.oportunityId = data?.prospect?.id;
          trackingPending.status = "4";
        }

        trackingPending.observations = `Nuevo pendiente asignado como: ${data.type.name}`;
        let action = actions.filter(item => item.name == data.type.name);
        trackingPending.actionId = action[0]?.id;
        trackingPending.reason = "Seguimiento automático";
        trackingPending.phaseId = data?.prospect?.itemBD?.phaseId;
        trackingPending.createdbyId = id_user;

        await api.post(`trackings`, trackingPending);
        dispatch(refetchSlopes());
        dispatch(refetchSlopesToday());
        setFlag(!flag);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoadingCreate(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">Agregar Pendientes</p>
          {isLoadingCreate && <CircularProgress className="headerDialog__loader" />}
        </div>
        <div className="bodyDialog">
          {infoSend.map(toAssingn => {
            return (
              <AssignPending
                key={toAssingn.id}
                toAssingn={toAssingn}
                pendingsType={pendingsType}
                actions={actions}
                handleType={handleType}
                handlePlace={handlePlace}
                handlePriority={handlePriority}
                handleDateFrom={handleDateFrom}
                handleDateTo={handleDateTo}
                handleZone={handleZone}
                handleDelete={handleDelete}
              />
            );
          })}

          <Grid container className="ctr_inputs">
            <Grid item xs={12} md={6}>
              <label className="ctr_inputs__label">Asunto *</label>
              <input
                placeholder="Revisa tus pendientes"
                {...register("subject", { required: true })}
                id="subject"
                name="subject"
                className={errors?.subject?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
            <Grid item xs={12}>
              <label className="ctr_inputs__label">Descripción</label>
              <textarea
                placeholder="Descripción optativa"
                {...register("description", { required: false })}
                id="description"
                name="description"
                minLength={"600"}
                className={errors?.description?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
              />
            </Grid>
          </Grid>
          <Grid container className="ctr_buttons">
            <Button
              disabled={isLoadingCreate}
              variant="contained"
              className={`btn_cancel ${isLoadingCreate && "disabled"}`}
              onClick={handleClose}
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
        </div>
      </DialogContainer>
    </Dialog>
  );
};

ModalAssignPendingMulti.propTypes = propTypes;
ModalAssignPendingMulti.defaultProps = defaultProps;
// #endregion

export default ModalAssignPendingMulti;

const AssignPending = ({
  toAssingn,
  pendingsType,
  actions,
  handleType,
  handlePlace,
  handlePriority,
  handleDateFrom,
  handleDateTo,
  handleZone,
  handleDelete,
}) => {
  const [openMore, setOpenMore] = useState(false);
  const [type, setType] = useState({});
  const [priority, setPriority] = useState({});

  const [incompleInfo, setIncompleInfo] = useState(true);

  const {
    register,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setType(toAssingn?.type);
    setPriority(toAssingn?.priority);
    if (priority?.priority === 1) {
      setIncompleInfo(true);
    } else {
      setIncompleInfo(false);
    }
  }, []);

  const checkDates = () => {
    if (toAssingn.date_to < toAssingn.date_from) {
      return false;
    }
    return true;
  };

  const handleSeeMore = () => {
    setOpenMore(!openMore);
  };

  return (
    <Grid container className={`ctr_inputs container-user ${toAssingn.zone === "" && "warningnBorder"}`}>
      <Grid item xs={12} className="container-user-header">
        <div className="container-user-header-left">
          <Tooltip title="Borrar selección">
            <IconButton variant="filled" color="secondary" onClick={() => handleDelete(toAssingn.id)}>
              <Delete />
            </IconButton>
          </Tooltip>

          <Avatar src={toAssingn.photo ? URL_SPACE + toAssingn.photo : ""} />

          <div className="container-user-header-left-content">
            <p>
              <b>Nombre ejecutivo: </b>
              {toAssingn.ejecutiveFullname}
            </p>
            <p>
              <b>Nombre prospecto: </b>
              {toAssingn?.name}
            </p>
          </div>
        </div>
        <Tooltip title="Abrir selección">
          <IconButton onClick={handleSeeMore}>{openMore ? <ExpandLess /> : <ExpandMore />}</IconButton>
        </Tooltip>
      </Grid>
      {openMore && (
        <>
          <Grid item xs={12} md={4} className="ctr_input">
            <label className="ctr_inputs__label">Tipo *</label>
            <select
              {...register("type", { required: true })}
              id="type"
              name="type"
              value={toAssingn.type?.id}
              onChange={e => {
                let type = pendingsType.filter(item => item.id == e.target.value);
                setType({ name: type[0].name, id: type[0].id });
                handleType(toAssingn.id, type[0]);
              }}
              className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            >
              {pendingsType.map((item, index) => {
                return (
                  <option key={index} value={item.id} className="option">
                    {item.name}
                  </option>
                );
              })}
            </select>
          </Grid>
          <Grid item xs={12} md={4} className="ctr_input">
            <label className="ctr_inputs__label">Lugar </label>
            <input
              id="place"
              type="text"
              disabled={type?.id !== "62dp9dPnCtgdfTodXAUuzr1N" && type?.id !== "62dN6LUisuI0rTZm1p5l5Lcp"}
              name="place"
              onChange={e => handlePlace(toAssingn.id, e.target.value)}
              className={errors?.place?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
          </Grid>
          <Grid item xs={12} md={4} className="ctr_input">
            <label className="ctr_inputs__label">Prioridad *</label>
            <select
              {...register("priority", { required: true })}
              id="priority"
              name="priority"
              value={toAssingn.priority?.priority}
              onChange={e => {
                let priority = priorities.filter(item => item.priority == e.target.value);
                setPriority({ name: priority[0].name, priority: priority[0].priority });
                handlePriority(toAssingn.id, priority[0]);
              }}
              className={errors?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
            >
              {priorities?.map(item => (
                <option className="option" key={item.priority} value={item.priority}>
                  {item.name}
                </option>
              ))}
            </select>
          </Grid>

          <Grid item xs={12} md={4} className="ctr_input">
            <label className="ctr_inputs__label">Fecha Inicio* </label>
            <input
              defaultValue={toAssingn.date_from}
              onChange={e => handleDateFrom(toAssingn.id, e.target.value)}
              type="datetime-local"
              className={checkDates() ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
            {checkDates() && (
              <label className="tag_error">Las fecha de inicio debe ser menor a la de finalización</label>
            )}
          </Grid>

          <Grid item xs={12} md={4} className="ctr_input">
            <label className="ctr_inputs__label">Fecha Termino </label>
            <input
              defaultValue={toAssingn.date_to}
              onChange={e => handleDateTo(toAssingn.id, e.target.value)}
              id="date_to"
              type="datetime-local"
              disabled={type?.id !== "62dp9dPnCtgdfTodXAUuzr1N" && type?.id !== "62dN6LUisuI0rTZm1p5l5Lcp"}
              name="date_to"
              className={checkDates() ? "ctr_inputs__input error" : "ctr_inputs__input"}
            />
            {checkDates() && !toAssingn.date_to && (
              <label className="tag_error">Las fecha de inicio debe ser menor a la de finalización</label>
            )}
          </Grid>
          <Grid item xs={12} md={4} className="ctr_input">
            <label className="ctr_inputs__label">Zona Horaria* </label>
            <select
              value={toAssingn.priority?.zone}
              {...register("zone", { required: true })}
              onChange={e => handleZone(toAssingn.id, e.target.value)}
              className={toAssingn.zone === "" ? "ctr_inputs__input error" : "ctr_inputs__input"}
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
        </>
      )}
    </Grid>
  );
};
