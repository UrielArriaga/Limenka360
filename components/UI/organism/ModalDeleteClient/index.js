import { DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Button, Modal } from "@material-ui/core";
import { AccountBox, Email } from "@material-ui/icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { userSelector } from "../../../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, api } from "../../../../services/api";
import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { DialogContainer } from "./styles";
import { createNewTrackingGlobal } from "../../../../redux/slices/trackingSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { ContainerModal, ContainerModalDiscard } from "../../../../styles/Clientes/clientes.styled";

export default function ModalDeleteClient(props) {
  const { openModal, closeModal, prospectDelete, flag, setFlag, handleAlert, ConfirmDelete, step, setStep } = props;
  const { discardreasons } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { id_user } = useSelector(userSelector);
  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const deleteClient = async formData => {
    try {
      switch (step) {
        case 0:
          setStep(prev => prev + 1);
          break;
        case 1:
          let update = {};
          let reason = discardreasons?.results.filter(item => item?.id == formData?.descarted?.id);
          update.status = 3;
          update.discartedbyId = id_user;
          update.reasonId = formData?.descarted?.id;
          update.discartedreason = reason[0].reason;

          let deleteProspect = await api.put(`prospects/discardprospect/${prospectDelete.id}`, update);
          if (deleteProspect.status == 200) {
            ConfirmDelete();
            closeModal();
            setStep(0);
            setFlag(!flag);
            handleAlert("success", "Cliente - Descartado!", "basic");
            setValue("descarted", "");
          }
          break;
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se descarto el Cliente!", "basic");
      console.log(error);
    }
  };
  // * funcion para restablecer prospecto
  const restoreClient = async () => {
    try {
      let update = {};
      update.discarted = false;
      update.discartedreason = "";
      update.discartedbyId = null;
      update.reasonId = null;
      update.deletedAt = null;
      let deleteProspect = await api.put(`prospects/resetprospect/${prospectDelete?.id}`, update);
      if (deleteProspect.status == 200) {
        closeModal();
        setFlag(!flag);
        handleAlert("success", "Prospecto - Restablecido!", "basic");
        setValue("descarted", "");
      }
    } catch (error) {
      handleAlert("error", "Ocurrio un problema - No se restablecio el prospecto!", "basic");
      console.log(error);
    }
  };

  const modalRestore = (
    <ContainerModal>
      <div className="title">
        <p>Restablecer Cliente</p>
      </div>
      <div className="containerBody">
        <p className="titleName">Se restablecera cliente a registros</p>
        <div className="buttons-restore">
          <Button className="cancel" color="primary" onClick={() => closeModal()}>
            Cancelar
          </Button>
          <Button className="accept" color="primary" onClick={() => restoreClient()}>
            Aceptar
          </Button>
        </div>
      </div>
    </ContainerModal>
  );

  const body = () => {
    switch (step) {
      case 0:
        return (
          <Grid container className="dialogContainer">
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <AccountBox className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Nombre</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(prospectDelete?.nombre?.slice(0, 50)))}{" "}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Email className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Correo</p>
              </div>
              <p className="dialogContainer__item__content">
                {toUpperCaseChart(validateInfo(prospectDelete?.correo?.slice(0, 50)))}{" "}
              </p>
            </Grid>
            <Grid item xs={12} className="dialogContainer__item">
              <p className="dialogContainer__item__header__title">
                Razon:
                {errors.descarted && errors.descarted.type === "required" && (
                  <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
                )}{" "}
              </p>
              <Controller
                name="descarted"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    maxMenuHeight={220}
                    className="dialogContainer__item__select"
                    placeholder="Selecciona una opción"
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={discardreasons?.isFetching}
                    options={discardreasons?.results}
                    isClearable={true}
                    onMenuOpen={() => {
                      getCatalogBy("discardreasons");
                    }}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${toUpperCaseChart(option?.reason)}`}
                  />
                )}
              />
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container className="dialogContainer">
            <Grid item xs={12} className="dialogContainer__item">
              <p className="dialogContainer__item__content">¿Está seguro de proceder?</p>
              <p className="dialogContainer__item__contentAccept">
                Al descartar este cliente se eliminarán pagos y oportunidades activas.
              </p>
            </Grid>
          </Grid>
        );
      default:
        break;
    }
  };

  return (
    <Modal
      open={openModal.activate}
      onClose={closeModal}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {openModal.type == "restore" ? (
        modalRestore
      ) : (
        <ContainerModalDiscard>
          <div className="title">
            <p>Descartar Cliente</p>
          </div>
          <div className="containerBody">
            {body()}
            <div className="dialogContainer__buttons">
              <Button className="dialogContainer__buttons__cancel" color="primary" onClick={() => closeModal()}>
                Cancelar
              </Button>
              {step >= 1 && (
                <Button
                  className="dialogContainer__buttons__cancel"
                  onClick={() => {
                    if (step > 0) setStep(prev => prev - 1);
                  }}
                  color="primary"
                >
                  Regresar
                </Button>
              )}
              <Button className="dialogContainer__buttons__acept" color="primary" onClick={handleSubmit(deleteClient)}>
                Continuar
              </Button>
            </div>
          </div>
        </ContainerModalDiscard>
      )}
    </Modal>
  );
}

const validateInfo = item => {
  if (item === undefined || item === null || item === "") {
    return "";
  } else {
    return item;
  }
};
