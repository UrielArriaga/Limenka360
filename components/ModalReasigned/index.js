import { Button, CircularProgress, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { SocketContext } from "../../context/socketContext";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";
import { companySelector } from "../../redux/slices/companySlice";
import { createNewTrackingGlobal } from "../../redux/slices/trackingSlice";
import { userSelector } from "../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import { handleGlobalAlert, toUpperCaseChart } from "../../utils";
import { DialogContainer, ExecutiveOptions } from "./styles";

export default function ModalReasigned({
  open,
  setopen,
  Prospect = undefined,
  setProspect,
  flag,
  setFlag,
  isMultiReasign,
  prospects,
  setIsMultiReasign,
  handleOpenNoAdd,
  setNoAdded,
  fromOportunity,
}) {
  const dispatch = useDispatch();
  const { socket } = useContext(SocketContext);
  const [optionsSharedTo, setOptionsSharedTo] = useState([]);
  // const [phases, setPhases] = useState([]);
  const { id_user, roleId, groupId, name } = useSelector(userSelector);
  const [loaderComplete, setLoaderComplete] = useState(false);
  const { id_company, company } = useSelector(companySelector);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const { getCatalogBy } = useGlobalCommons();

  const { phases, users } = useSelector(commonSelector);

  useEffect(() => {
    if (roleId !== "ejecutivo") {
      getCatalogBy("executives");
    }

    if (Prospect) {
      getCatalogBy("phases");
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      getEjecutivesGroup();
    }
  }, [users.results]);

  useEffect(() => {
    let oldPhaseA = phases.results.find(phaseArr => phaseArr.id === Prospect?.phaseId);
    setValue("phaseId", oldPhaseA);
  }, [Prospect]);

  const getEjecutivesGroup = () => {
    let newOptions = users.results.filter(item => item.id !== id_user);
    let newFormatOptions = newOptions.map(item => ({
      id: item.id,
      name: item.fullname,
      email: item.email,
    }));
    return newFormatOptions;
  };

  const reasignedProspect = async formData => {
    setLoaderComplete(true);

    try {
      if (isMultiReasign) {
        let prospectsIds;

        if (fromOportunity) {
          prospectsIds = prospects.map(function (pros) {
            return pros.prospectId;
          });
        } else {
          prospectsIds = prospects.map(function (pros) {
            return pros.id;
          });
        }

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
              message: `(${name}) reasignó el prospecto al ejecutivo ${formData?.ejecutiveId?.email}`,
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
            observations: `Se reasigno el prospecto,ejecutivo anterior ${Prospect?.ejecutive?.email}`,
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
    if (!fromOportunity) setProspect({});
    if (isMultiReasign) {
      setIsMultiReasign();
    }
    setopen(false);
    setValue("ejecutiveId", "");
    setValue("phaseId", "");
  };

  return (
    <DialogContainer
      open={open}
      onClose={handleCloseConfirmDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        Reasignar prospecto
        {loaderComplete && <CircularProgress className="loader" />}
      </DialogTitle>

      <DialogContent className="containerBody">
        <div className="InfoProspect">
          <p className="prospectTitle">Elige una fase:</p>
        </div>
        <Controller
          name="phaseId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              onMenuOpen={() => getCatalogBy("phases")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={phases.isFetching}
              {...field}
              isClearable={true}
              placeholder="Selecciona una fase"
              options={phases.results}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
              maxMenuHeight={115}
            />
          )}
        />
        <div className="InfoProspect">
          <p className="prospectTitle">Elige un ejecutivo:</p>
        </div>
        <Controller
          name="ejecutiveId"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <Select
              {...field}
              isClearable={true}
              onMenuOpen={() => getCatalogBy("executives")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={users.isFetching}
              placeholder="Selecciona una Opción"
              options={getEjecutivesGroup()}
              formatOptionLabel={option => <ExecutiveOp executive={option} />}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.email}`}
              maxMenuHeight={115}
            />
          )}
        />
        {prospects?.length > 0 ? (
          <div className="InfoProspect">
            <p className="prospectTitle">({prospects.length}) Prospectos a Reasignar : </p>
            {prospects?.map(prospect => {
              return (
                <p className="prospectName" key={prospect.id}>
                  {prospect?.nombre ? prospect?.nombre : prospect?.name}
                </p>
              );
            })}
          </div>
        ) : (
          <div className="InfoProspect">
            <p className="prospectTitle">Prospecto a Reasignar:</p>
            <p className="prospectName">{Prospect?.name}</p>
          </div>
        )}
      </DialogContent>
      <DialogActions className="buttons">
        <Button
          disabled={loaderComplete}
          className={`cancel ${loaderComplete && "disabled"}`}
          onClick={handleCloseConfirmDelete}
          color="primary"
        >
          Cancelar
        </Button>

        <Button
          disabled={loaderComplete}
          className={`acept ${loaderComplete && "disabled"}`}
          onClick={handleSubmit(reasignedProspect)}
          color="primary"
          autoFocus
        >
          Aplicar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}

function ExecutiveOp({ executive }) {
  return (
    <ExecutiveOptions>
      <p className="name">{executive.name}</p>
      <p className="email">{executive.email}</p>
    </ExecutiveOptions>
  );
}
