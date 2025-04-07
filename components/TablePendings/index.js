import { Tooltip, Grid, Backdrop, Modal, Button } from "@material-ui/core";
import { Assignment, NotificationsActive, PersonPinCircle, RingVolume, WatchLater, MoreVert, Edit, Timer } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatDate, formatHour } from "../../utils";
import { StyledMenu } from "../../styles/TableDataComponent";
import CompletePending from "../ModalCompletePendings";
import { Alert } from "@material-ui/lab";
import { api } from "../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { ModalNewPending } from "../DashboardEjecutiveCalendary/calendaryejecutive.styles";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";

const TablePendings = ({ pendings, type, id_executive, }) => {
  const router = useRouter();
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const [rowSelected, setRowSelected] = useState(null);
  const [pendingItem, setPendingItem] = useState({});
  const [confirmationPending, setConfirmationPending] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { id_user } = useSelector(userSelector);
  const { pendingstypes } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const [dataProspects, setDataProspects] = useState(null);
  const [prospectSelected, setProspectSelected] = useState(null);
  const [oportunitiesFromProspectSelected, setOportunitiesFromProspectSelected] = useState(null);
  const [flag, setFlag] = useState(false);
  const [openEditPending, setOpenEditPending] = useState(false);
  const [pendingToEdit, setPendingToEdit] = useState(null);
  const [typePending, setTypePending] = useState({});
  const handleCloseEditPending = () => setOpenEditPending(false);

  const handleClickOpenActions = (event, item) => {
    setOpenActionsRow(event.currentTarget);
    setRowSelected(item);
  };
  const handleCloseActionsRow = () => {
    setOpenActionsRow(null);
    setRowSelected(null);
  };
  const finishPending = item => {
    setPendingItem(item);
    setConfirmationPending(true);
  };
  const handleCloseComplete = () => {
    setConfirmationPending(false);
    setPendingItem({});
  };
  const handleAlert = (severity, message) => {
    setAlert({ severity, show: true, message });
    setTimeout(() => {
      setAlert((prev) => ({ ...prev, show: false }));
    }, 3000);
  };
  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  const prioritys = [
    { name: "Baja", priority: 0 },
    { name: "Media", priority: 1 },
    { name: "Alta", priority: 2 },
  ];

  useEffect(() => {
    getDataProspects();
    getCatalogBy("pendingstypes");
  }, [flag]);

  useEffect(() => {
    if (!pendingToEdit) {
      return;
    }
    let tzoffset = new Date().getTimezoneOffset() * 60000;
    setValueEditPending("description", pendingToEdit?.description);
    setValueEditPending("priority", pendingToEdit?.priority);
    setValueEditPending("type", pendingToEdit?.pendingstypeId);
    setValueEditPending("subject", pendingToEdit?.subject);
    setValueEditPending("prospect", pendingToEdit?.prospectId);
    setValueEditPending("place", pendingToEdit?.place);
    setValueEditPending("notify", pendingToEdit?.notify);
    setValueEditPending("remember", pendingToEdit?.remember);
    setValueEditPending(
      "date_from",
      `${new Date(new Date(pendingToEdit.date_from) - tzoffset).toISOString().slice(0, -1).split(":")[0]}:${new Date(new Date(pendingToEdit.date_from) - tzoffset).toISOString().slice(0, -1).split(":")[1]
      }`
    );
    setValueEditPending("zone", pendingToEdit?.zone);
    if (pendingToEdit.date_to) {
      setValueEditPending(
        "date_to",
        `${new Date(new Date(pendingToEdit.date_to) - tzoffset).toISOString().slice(0, -1).split(":")[0]}:${new Date(new Date(pendingToEdit.date_to) - tzoffset).toISOString().slice(0, -1).split(":")[1]
        }`
      );
    }
    if (pendingToEdit.oportunityId) {
      setValueEditPending("oportunity", pendingToEdit?.oportunityId);
    }
    setProspectSelected(pendingToEdit.prospectId);

  }, [pendingToEdit, flag,]);

  const {
    register: registerEditPending,
    handleSubmit: handleSubmitEditPending,
    setValue: setValueEditPending,
    reset: resetEditPending,
    formState: { errorsEditPending },
  } = useForm();

  const NZONE = 6;
  const zones = [
    { gmt: "GMT-05:00", zones: ["Quintana Roo"] },
    { gmt: `GMT-0${NZONE}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: false },
    { gmt: `GMT-0${NZONE - 1}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: true },
    { gmt: `GMT-0${NZONE + 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: false },
    { gmt: `GMT-0${NZONE + 1 - 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: true },
    { gmt: `GMT-0${NZONE + 2}:00`, zones: "Baja California", summer: false },
    { gmt: `GMT-0${NZONE + 2 - 1}:00`, zones: "Baja California", summer: true },
  ];

  const getDataProspects = async () => {
    let query = {};
    if (id_user) {
      query.ejecutiveId = type === "ejecutive" ? id_user : id_executive;
    }
    try {
      let prospects = await api.get(`prospects?where=${JSON.stringify(query)}&order=-createdAt&all=1`);
      console.log("Datos actualizados:", prospects.data.results);
      setDataProspects(prospects.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdatePending = async formData => {
    if (!pendingToEdit) {
      return;
    }
    let json = {
      notify: true,
      remember: true,
      isdone: false,
      notify_by: formData.notify_by,
      remember_by: formData.remember_by,
      description: formData.description,
      pendingstypeId: formData.type,
      subject: formData.subject,
      date_from: new Date(formData.date_from).toISOString(),
      prospectId: formData.prospect,
      oportunityId: "",
      zone: formData.zone,
      status: 1,
      priority: formData.priority,
    };
    if (formData.place) {
      json.place = formData.place;
    }
    if (formData.notify_by) {
      json.notify_by = new Date(formData.notify_by).toDateString();
    } else {
      json.notify_by = "correo";
    }
    if (formData.remember_by) {
      json.remember_by = new Date(formData.remember_by).toISOString();
    } else {
      json.remember_by = "correo";
    }
    if (formData.date_to) {
      json.date_to = new Date(formData.date_to).toISOString();
    }
    let prospect = dataProspects.filter(prospect => prospect.id == formData.prospect)[0];
    if (prospect.isoportunity && formData.oportunity) {
      json.status = 2;
      json.oportunityId = formData.oportunity;
    }
    if (prospect.isclient) {
      json.status = 3;
    }
    let oportunity = oportunitiesFromProspectSelected?.filter(oportunity => oportunity.id == formData.oportunity)[0];
    if (oportunity?.iscloseout) {
      json.status = 4;
    }
    try {
      const responsePendings = await api.put(`pendings/${pendingToEdit.id}`, json);
      if (responsePendings.status === 200) {
        handleAlert("success", "Pendiente - Actualizado Correctamente!", "basic");
        setOpenEditPending(!openEditPending);
        setFlag(!flag);
      }
    } catch (error) {
      console.log('Error al actualizar el recordatorio', error);
    }
  };

  const handleEditPending = (item) => {
    setPendingToEdit(item);
    setOpenEditPending(true);
  };

  return (
    <ContainerTable>
      {alert.show && (
        <Alert severity={alert.severity} onClose={() => setAlert({ ...alert, show: false })}>
          {alert.message}
        </Alert>
      )}
      {pendings.length > 0 ? (
        <div className="table full">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                <th className="title checkbox">
                  <div className="ctr_title">
                    <p>Fecha</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p></p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Pendiente</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Asunto / Observaciones</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Prospecto</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Realizado por</p>
                  </div>
                </th>
                <th className="title">
                  <div className="ctr_title">
                    <p>Opciones</p>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {pendings?.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed">
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.date_from)}, ${formatHour(item?.date_from)}`}</span>
                      </p>
                    </td>
                    <td className="data">
                      <p className={`ctr_td ${item.isdone ? "ctr_icon_complete" : "ctr_icon_incomplete"}`}>
                        <Tooltip arrow title={item.isdone ? "Completo" : "No completado"}>
                          {iconReturn(item?.pendingstype.name)}
                        </Tooltip>
                      </p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.pendingstype.name}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{`${item?.subject} ${item?.description !== "" ? `- ${item?.description}` : ""
                        }`}</p>
                    </td>
                    <td className="data">
                      <p
                        className="ctr_td capitalize"
                        onClick={() => {
                          router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: item.prospect.id } });
                        }}
                      >{`${item?.prospect?.name} ${item?.prospect?.lastname}`}</p>
                    </td>
                    <td className="data">
                      {item?.createdbyId && (
                        <Tooltip
                          arrow
                          placement="bottom"
                          title={`${item?.ejecutive?.name} ${item?.ejecutive?.lastname}`}
                        >
                          <p className="ejecutive">{`${item?.ejecutive?.name.slice(0, 1)}${item?.ejecutive?.lastname !== "" ? `${item?.ejecutive?.lastname.slice(0, 1)}` : "-AD"
                            }`}</p>
                        </Tooltip>
                      )}
                    </td>
                    <td className="data">
                      <div>
                        <div className="content">
                          <div
                            aria-controls="fade-menu"
                            aria-haspopup="true"
                            className="content__icon"
                            onClick={(e) => handleClickOpenActions(e, item)}
                          >
                            <MoreVert />
                          </div>
                        </div>
                        <StyledMenu
                          id="fade-menu"
                          anchorEl={openActionsRow}
                          keepMounted
                          open={openActionsRow && rowSelected === item}
                          onClose={handleCloseActionsRow}
                        >
                          <div className="options">
                            <div
                              className="options__option"
                              onClick={() => {
                                handleEditPending(item);
                                handleCloseActionsRow();
                              }}
                            >
                              <Edit />
                              <p>Editar</p>
                            </div>
                            <div
                              className="options__option"
                              onClick={() => {
                                finishPending(item)
                                handleCloseActionsRow();
                              }}
                            >
                              <Timer />
                              <p>Completar Pendiente</p>
                            </div>
                          </div>
                        </StyledMenu>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <div className="table empty">
            <table className="ctr_table">
              <thead className="ctr_table__head">
                <tr className="ctr_table__head__tr">
                  <th className="title checkbox">
                    <div className="ctr_title">
                      <p>Fecha</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p></p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Pendiente</p>
                    </div>
                  </th>
                  <th className="title">
                    <div className="ctr_title">
                      <p>Asunto / Observaciones</p>
                    </div>
                  </th>

                  <th className="title">
                    <div className="ctr_title">
                      <p>Realizado por</p>
                    </div>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="body_empty">
            <div className="message_ctr">
              <img src="/empty_table.svg" />
              <p>Aun no hay datos</p>
            </div>
          </div>
        </>
      )}
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
        open={openEditPending}
        onClose={handleCloseEditPending}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
          <ModalNewPending>
            <p className="title">Editar Pendiente</p>
            <div className="modalBody">
              <form onSubmit={handleSubmitEditPending(handleUpdatePending)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Tipo de pendiente *</label>
                    <select
                      {...registerEditPending("type")} defaultValue={pendingToEdit?.pendingstypeId}
                      onChange={e => {
                        let type = pendingstypes.results.filter(item => item.id == e.target.value);
                        setTypePending({ name: type[0].name, id: type[0].id });
                      }}
                      className={errorsEditPending?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}>
                      <option value="" hidden>
                        Seleccione uno...
                      </option>
                      {pendingstypes.isFetching && (
                        <option disabled={true} value={null}>
                          Cargando Opciones...
                        </option>
                      )}
                      {pendingstypes.results?.map(type => (
                        <option key={type.id} value={type.id}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Prioridad *</label>
                    <select
                      {...registerEditPending("priority", { required: true })}
                      className={
                        errorsEditPending?.type?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    >
                      <option value="" hidden>
                        Seleccione uno...
                      </option>
                      {prioritys?.map(item => (
                        <option className="option" key={item.priority} value={item.priority}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Prospecto:</label>
                    <select
                      {...registerEditPending("prospect", { required: true })}
                      className={
                        errorsEditPending?.prospect?.type === "required"
                          ? "ctr_inputs__input error"
                          : "ctr_inputs__input"
                      }
                      onChange={e => {
                        setProspectSelected(e.target.value);
                      }}
                    >
                      <option value={""} hidden>
                        Selecciona uno...
                      </option>
                      {dataProspects?.map(item => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  {oportunitiesFromProspectSelected ? (
                    <Grid item xs={12} md={4}>
                      <label className="ctr_inputs__label">Cotizaciones *:</label>
                      <select
                        {...registerEditPending("oportunity", { required: true })}
                        className={
                          errorsEditPending?.prospect?.type === "required"
                            ? "ctr_inputs__input error"
                            : "ctr_inputs__input"
                        }
                      >
                        <option value={""} hidden>
                          Selecciona uno...
                        </option>
                        {oportunitiesFromProspectSelected.map(item => (
                          <option key={item.id} value={item.id}>
                            {item.concept}
                          </option>
                        ))}
                      </select>
                    </Grid>
                  ) : (
                    <Grid item xs={12} md={4}></Grid>
                  )}
                  <Grid item xs={12} md={7}>
                    <label className="ctr_inputs__label">Asunto</label>
                    <input
                      {...registerEditPending("subject", { required: true })}
                      className={
                        errorsEditPending?.subject?.type === "required"
                          ? "ctr_inputs__input error"
                          : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={5}>
                    <label className="ctr_inputs__label">Lugar</label>
                    <input
                      {...registerEditPending("place", { required: false })}
                      disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
                      className={
                        errorsEditPending?.place?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <label className="ctr_inputs__label">Descripción</label>
                    <textarea
                      {...registerEditPending("description", { required: false })}
                      className={
                        errorsEditPending?.description?.type === "required"
                          ? "ctr_inputs__input error"
                          : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Fecha inicio</label>
                    <input
                      {...registerEditPending("date_from", { required: true })}
                      type="datetime-local"
                      className={
                        errorsEditPending?.date_from?.type === "required"
                          ? "ctr_inputs__input error"
                          : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Fecha Termino </label>
                    <input
                      {...registerEditPending("date_to", { required: false })}
                      type="datetime-local"
                      disabled={typePending.name !== "Cita" && typePending.name !== "Visita"}
                      className={
                        errorsEditPending?.date_to?.type === "required"
                          ? "ctr_inputs__input error"
                          : "ctr_inputs__input"
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <label className="ctr_inputs__label">Zona Horaria:</label>
                    <select
                      {...registerEditPending("zone", { required: true })}
                      className={
                        errorsEditPending?.zone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                      }
                    >
                      <option value={""} hidden>
                        Selecciona uno...
                      </option>
                      {zones?.map((item, index) => (
                        <option key={index} value={item.gmt}>
                          ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano)" : null}
                        </option>
                      ))}
                    </select>
                  </Grid>
                  <Grid container className="ctr_buttons">
                    <Button variant="contained" color="primary" type="submit" className="btn_save">
                      Guardar
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="reset"
                      className="btn_cancel"
                      onClick={() => {
                        setOpenEditPending(!openEditPending);
                        resetEditPending();
                        setPendingToEdit(null);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </div>
          </ModalNewPending>
        </motion.div>
      </Modal>
      <CompletePending
        pending={pendingItem}
        open={confirmationPending}
        close={handleCloseComplete}
        handleAlert={handleAlert}
        refetch={refetch}
        setRefetch={setRefetch}
      />
    </ContainerTable>
  );
};

export default TablePendings;

const iconReturn = type => {
  switch (type) {
    case "Visita":
      return <PersonPinCircle />;
    case "Cita":
      return <WatchLater />;
    case "Recordatorio":
      return <NotificationsActive />;
    case "Llamada":
      return <RingVolume />;
    case "Tarea":
      return <Assignment />;
    default:
      return <NotificationsActive />;
      break;
  }
};

const ContainerTable = styled.div`
  height: calc(430px - 110px);
  background-color: #eaeaea;
  .content__icon, options__option{
    cursor: pointer;
  }
  .table {
    width: 100%;
    overflow-x: auto;
    transition: all 0.3s ease;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 4px;

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
    .ctr_table {
      border-spacing: 0;
      margin: auto;
      width: inherit;

      &__head {
        position: sticky;
        top: 0;
        z-index: 50;
        &__tr {
          background-color: #dce1f6;
          padding: 5px 10px;
          height: 40px;
          .checkbox {
            position: sticky;
            left: 0;
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;
            background-color: #405189;
            color: #fff;
            min-width: 250px;
            height: inherit;
            .MuiFormControlLabel-root {
              margin-right: 5px;
            }
            @media (max-width: 600px) {
              min-width: 100px;
              position: relative;
            }
          }
          .title {
            text-transform: capitalize;
            padding: 0 10px;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
              /* min-width: 150px; */
            }
          }
        }
      }
      &__body {
        .row {
          background: #fff;
          font-weight: bold;
          color: #2c2c2c;
          transition: all 0.3s ease;
          min-height: 50px;

          .fixed {
            position: sticky;
            left: 0;
            background: #fff;
            transition: all 0.3s ease;
            @media (max-width: 600px) {
              position: relative;
            }
          }
          .data {
            font-size: 14px;
            padding: 0 10px;
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;
              .span {
                width: 100%;
                cursor: pointer;
              }
            }
            .capitalize {
              text-transform: capitalize;
              cursor: pointer;
            }
            .select {
              cursor: pointer;
            }
            .ejecutive {
              display: flex;
              align-items: center;
              min-height: 42px;
              text-transform: capitalize;
              cursor: pointer;
              justify-content: center;
            }
            .ctr_icon_complete {
              justify-content: center;
              svg {
                cursor: pointer;
                width: 25px;
                height: 25px;
                padding: 5px;
                background: #103c82;
                color: #fff;
                border-radius: 50%;
              }
            }
            .ctr_icon_incomplete {
              justify-content: center;
              svg {
                cursor: pointer;
                width: 25px;
                height: 25px;
                padding: 5px;
                background: #8a8a8a;
                color: #fff;
                border-radius: 50%;
              }
            }
          }
          &:hover {
            background: #d8dbe6;
            opacity: 0.8;
            color: #000;
            .fixed {
              background: #d8dbe6;
            }
          }
        }
        .inpar {
          background: #f3f3f3;
          .fixed {
            background: #f3f3f3;
          }
          .options-td {
            background: #f3f3f3;
          }
        }
      }
    }
  }
  .body_empty {
    position: relative;
    width: 100%;
    padding: 40px;
    height: 250px;
    .message_ctr {
      height: 100%;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      p {
        text-align: center;
        color: #8a8a8a;
      }
    }
  }
  .full {
    height: 100%;
  }
`;
