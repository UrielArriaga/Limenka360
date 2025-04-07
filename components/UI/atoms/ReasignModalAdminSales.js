import styled from "styled-components";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  CircularProgress,
  Modal,
  Dialog,
  Grid,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import RequestCommon from "../../../services/request_Common";
import Select from "react-select";
import { handleGlobalAlert, toUpperCaseChart } from "../../../utils";
import { commonSelector, getUsersCommon } from "../../../redux/slices/commonSlice";
import { ACTIONIDPRODUCTIONMODE, api } from "../../../services/api";
import { StyleExecutiveGroup } from "../../../styles/global.styles";
import { createNewTrackingGlobal } from "../../../redux/slices/trackingSlice";
import { SocketContext } from "../../../context/socketContext";
import { companySelector } from "../../../redux/slices/companySlice";
export default function ReasignedAdminS(props) {
  const { open, setopen, Prospect, setProspect, flag, setFlag, isMultiReasign, prospects, setIsMultiReasign } = props;
  const { handleOpenNoAdd, setNoAdded } = props;
  const { users, categories, origins, clientTypes, specialties } = useSelector(commonSelector);
  const [optionsSharedTo, setOptionsSharedTo] = useState([]);
  const [executivesBackup, setExecutivesBackup] = useState([]);
  const [groups, setGroups] = useState([]);
  const [phases, setPhases] = useState([]);
  const { id_user, roleId, groupId, name } = useSelector(userSelector);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const { socket } = useContext(SocketContext);
  const { id_company, company } = useSelector(companySelector);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();
  const commonApi = new RequestCommon();

  useEffect(() => {
    getExecutives();
    getPhases();
    getGroups();
  }, []);

  useEffect(() => {
    let oldPhaseA = phases.find(phaseArr => phaseArr.id === Prospect?.phaseId);
    setValue("phaseId", oldPhaseA);
  }, [Prospect]);

  const getExecutives = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
        include: "group",
      };
      let response = await api.get(`ejecutives`, { params });
      let ejecuData = response.data.results;
      let newOptions = ejecuData.filter(item => item.id !== id_user);
      let newFormatOptions = newOptions.map(item => {
        let option = {
          id: item.id,
          fullname: item.fullname,
          email: item.email,
          group: item.group,
          name: item.name,
          lastname: item.lastname,
        };
        return option;
      });
      setExecutivesBackup(newFormatOptions);
      setOptionsSharedTo(newFormatOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const getGroups = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
      };
      let response = await api.get(`groups`, { params });
      setGroups(response?.data?.results);
    } catch (error) {}
  };

  const getPhases = async () => {
    try {
      let phasesApi = await api.get("phases?all=1");
      setPhases(phasesApi.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const reasignedProspect = async formData => {
    setLoaderComplete(true);

    try {
      if (isMultiReasign) {
        let prospectsIds = prospects.map(function (pros) {
          return pros.id;
        });

        let data = {
          tracking: {
            reason: "Reasignado",
            observations: "Se reasignó el prospecto",
            actionId: ACTIONIDPRODUCTIONMODE,
          },
          ejecutiveId: formData?.ejecutiveId.id,
          phaseId: formData.phaseId.id,
          prospects: prospectsIds,
        };

        let reassing = await api.put(`/prospects/reassign`, data);
        let alertTime = 0; // This is usefull to show alerts in a razonable time

        if (reassing.data.add !== 0) {
          socket?.emit("send_notify_activity", {
            activity: {
              type: "update",
              from: "prospects",
              message: `(${name}) reasignó ${reassing.data.add} prospectos a ${formData?.ejecutiveId?.email}`,
              data: reassing.data,
              ejecutiveId: id_user,
              groupId: groupId,
              companyId: id_company,
            },
          });
          handleGlobalAlert(
            "success",
            `${reassing.data.add} prospectos fueron asignados a ${formData?.ejecutiveId?.email}`,
            "basic",
            dispatch
          );
          alertTime = 3000;
        }

        if (reassing.data.noadd !== 0 && reassing.data.noadd) {
          setTimeout(() => {
            handleGlobalAlert("warning", `${reassing.data.noadd} prospectos no fueron asignados`, "basic", dispatch);
            handleOpenNoAdd();
            setNoAdded(reassing.data.noaddprospect);
          }, alertTime);
        }

        handleCloseConfirmDelete();
        setTimeout(() => {
          setLoaderComplete(false);
          setFlag(!flag);
        }, 3000 + alertTime);
      } else {
        let putProspect = {
          reasignedbyId: id_user,
          ejecutiveId: formData.ejecutiveId.id,
          phaseId: formData.phaseId.id,
        };

        let prospectPut = await api.put(`prospects/${Prospect.id}`, putProspect);

        if (prospectPut.status == 200) {
          socket?.emit("send_notify_activity", {
            activity: {
              type: "update",
              from: "prospects",
              message: `(${name}) reasignó el prospecto al ejecutivo a ${formData?.ejecutiveId?.email}`,
              data: prospectPut.data,
              ejecutiveId: id_user,
              groupId: groupId,
              companyId: id_company,
            },
          });
          handleGlobalAlert("success", "Prospecto Reasignado Correactamente!", "basic", dispatch);
          setTimeout(() => {
            handleCloseConfirmDelete();
            setLoaderComplete(false);
            setFlag(!flag);
          }, 1000);

          let bodyNewTracking = {
            prospectId: Prospect.id,
            observations: `Se reasigno el prospecto al ejecutivo ${Prospect?.ejecutive?.email}`,
            actionId: ACTIONIDPRODUCTIONMODE,
            status: "1",
            reason: "Seguimiento automático",
            phaseId: formData.phaseId.id,
            createdbyId: id_user,
          };

          dispatch(
            createNewTrackingGlobal({
              data: bodyNewTracking,
            })
          );
        }
      }
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "Prospecto Reasignación - Ocurrió un problema!", "basic", dispatch);
    }
    setLoaderComplete(false);
  };

  const handleCloseConfirmDelete = () => {
    setProspect({});
    if (isMultiReasign) {
      setIsMultiReasign();
    }
    setopen(false);
    setValue("ejecutiveId", "");
    setValue("phaseId", "");
  };

  const handleSelectGroup = group => {
    if (group) {
      let filterExecutives = executivesBackup.filter(item => item?.group?.id === group.id);
      setOptionsSharedTo(filterExecutives);
    } else {
      setOptionsSharedTo(executivesBackup);
    }
  };

  const FormatOptionsExecutiveGroup = ({ fullname, group, email }) => {
    return (
      <StyleExecutiveGroup>
        <div className="dataExecutive">
          <p className="fullname">{fullname} - </p>
          <p className="email">{email}</p>
        </div>
        <p className="groupname">
          Grupo: <span className="name">{group?.name}</span>
        </p>
      </StyleExecutiveGroup>
    );
  };

  return (
    <DialogContainer open={open} onClose={handleCloseConfirmDelete}>
      <div className="header">
        <p className="title">
          Ejecutivos
          {loaderComplete && <CircularProgress className="loader" />}
        </p>
      </div>
      <Grid container className="body">
        <Grid item md={12} sm={12} className="item">
          <p className="title">Fase</p>
          <Controller
            name="phaseId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isClearable={true}
                placeholder="Selecciona una fase"
                options={phases}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                maxMenuHeight={200}
              />
            )}
          />
        </Grid>
        <Grid item md={12} sm={12} className="item">
          <p className="title">Grupo</p>
          <Controller
            name="group"
            control={control}
            rules={{ required: false }}
            render={({ field }) => (
              <Select
                {...field}
                isClearable={true}
                placeholder="Selecciona una fase"
                options={groups}
                onChange={e => handleSelectGroup(e)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
                maxMenuHeight={200}
              />
            )}
          />
        </Grid>
        <Grid item md={12} sm={12} className="item">
          <p className="title">Ejecutivo</p>
          <Controller
            name="ejecutiveId"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                {...field}
                isClearable={true}
                placeholder="Selecciona una Opción"
                formatOptionLabel={e => FormatOptionsExecutiveGroup(e)}
                options={optionsSharedTo}
                noOptionsMessage={() => "No hay Ejecutivos"}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.email)}`}
                styles={{
                  menu: provided => ({ ...provided, zIndex: 9999 }),
                }}
                maxMenuHeight={150}
              />
            )}
          />
        </Grid>
        <Grid item md={12} sm={12} className="item">
          {isMultiReasign ? (
            <div className="multiProspects">
              <p className="title">
                <span className="count">({prospects.length})</span>Prospectos a Reasignar :{" "}
              </p>
              <div className="containerProspects">
                {prospects?.map(prospect => {
                  return (
                    <div key={prospect.id} className="prospecInfo">
                      <p className="name">{prospect?.nombre}</p>
                      <p className="email">{prospect?.correo}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="containerData">
              <p className="title">Prospecto a Reasignar:</p>
              <div className="InfoProspect">
                <p className="name">{Prospect?.fullname}</p>
                <p className="email">{Prospect?.email}</p>
              </div>
            </div>
          )}
        </Grid>
      </Grid>

      <div className="buttons">
        <Button
          disabled={loaderComplete}
          className={`acept ${loaderComplete && "disabled"}`}
          onClick={handleSubmit(reasignedProspect)}
          color="primary"
          autoFocus
        >
          Aplicar
        </Button>
        <Button
          disabled={loaderComplete}
          className={`cancel ${loaderComplete && "disabled"}`}
          onClick={handleCloseConfirmDelete}
          color="primary"
        >
          Cancelar
        </Button>
      </div>
    </DialogContainer>
  );
}
const DialogContainer = styled(Dialog)`
  .header {
    background-color: #405189;
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    top: 0;
    position: sticky;
    z-index: 1;
    .title {
      color: #fff;
      font-size: 20px;
      font-weight: 500;
    }
    .loader {
      color: #fff;
    }
  }
  .body {
    padding: 15px;
    margin-bottom: 20px;
    .item {
      margin-bottom: 15px;
      .multiProspects {
        .title {
          font-weight: 500;
          margin-bottom: 10px;
          .count {
            color: #405189;
            margin-right: 3px;
          }
        }
        .containerProspects {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          justify-content: space-between;
          max-height: 200px;
          overflow: scroll;
          overflow-x: hidden;
          .prospecInfo {
            padding: 3px;
            border: 1px solid #405189;
            border-radius: 5px;
            margin-bottom: 5px;
            margin-right: 5px;
            .name {
              font-size: 12px;
              color: #405189;
              font-weight: 500;
              text-transform: capitalize;
            }
            .email {
              font-size: 12px;
              color: #405189;
            }
          }
        }
      }
      .containerData {
        .title {
          font-weight: 500;
          margin-bottom: 10px;
        }
        .InfoProspect {
          padding: 3px;
          border: 1px solid #405189;
          border-radius: 5px;
          margin-bottom: 5px;
          margin-right: 5px;
          width: fit-content;
          .name {
            font-size: 13px;
            color: #405189;
            font-weight: 500;
            text-transform: capitalize;
          }
          .email {
            font-size: 13px;
            color: #405189;
          }
        }
      }
    }
  }
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
    .cancel {
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
    .acept {
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
  }
`;
