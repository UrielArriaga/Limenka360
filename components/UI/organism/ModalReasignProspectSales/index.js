import { DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Button } from "@material-ui/core";
import { AccountBox, Email } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector, getDiscardReasons } from "../../../../redux/slices/commonSlice";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { DialogContainer } from "./styles";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function ModalReasignedProspect(props) {
  const { openConfirmDelete, setopenConfirmDelete, Prospect, setProspect, flag, setFlag } = props;

  const dispatch = useDispatch();
  const { discardreasons } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  const { id_user } = useSelector(userSelector);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const deleteProspect = async formData => {
    try {
      if (step === 0) return setStep(prev => prev + 1);

      let update = {};
      let reason = discardreasons.results.filter(item => item.id == formData?.descarted);
      update.status = 0;
      update.discartedbyId = id_user;
      update.reasonId = formData?.descarted;
      update.discartedreason = reason[0].reason;
      let deleteProspect = await api.put(`prospects/discardprospect/${Prospect.id}`, update);
      if (deleteProspect.status == 200) {
        handleCloseConfirmDelete();
        handleGlobalAlert("success", "Prospecto - Descartado!", "basic", dispatch);
        setValue("descarted", "");
        setFlag(!flag);
      }
    } catch (error) {
      handleGlobalAlert("error", "Ocurrió un problema - No se descarto el prospecto!", "basic", dispatch);
      console.log(error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setProspect({});
    setopenConfirmDelete(false);
    setStep(0);
    setValue("descarted", "");
  };

  const bodyModal = () => {
    switch (step) {
      case 0:
        return (
          <Grid container className="dialogContainer">
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <AccountBox className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Nombre</p>
              </div>
              <p className="dialogContainer__item__content">{toUpperCaseChart(Prospect?.nombre?.slice(0, 50))} </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Email className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Correo</p>
              </div>
              <p className="dialogContainer__item__content">{Prospect?.correo?.slice(0, 50)} </p>
            </Grid>
            <Grid item xs={12} md={12} sm={12} className="dialogContainer__item">
              <p className="dialogContainer__item__header__title">
                Razón:
                {errors.descarted && errors.descarted.type === "required" && (
                  <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
                )}
              </p>

              <select {...register("descarted", { required: true })} onClick={() => getCatalogBy("discardreasons")}>
                {discardreasons.isFetching && <option disabled>Cargando Opciones...</option>}
                {discardreasons.results.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.reason}
                    </option>
                  );
                })}
              </select>
            </Grid>
          </Grid>
        );
      case 1:
        return <Grid container className="dialogContainer"></Grid>;
      default:
    }
  };
  const validateInfo = item => {
    if (item === undefined || item === null || item === "") {
      return "";
    } else {
      return item;
    }
  };
  const handleClickNext = type => {
    if (type === "next") {
    } else {
      if (step > 0) setStep(prev => prev - 1);
    }
  };

  return (
    <DialogContainer
      open={openConfirmDelete}
      onClose={handleCloseConfirmDelete}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle className="title" id="alert-dialog-title">
        {"¿Estas seguro de esto?"}
      </DialogTitle>
      <DialogContent className="containerBody">
        <DialogContentText className="DialogText" id="alert-dialog-description">
          Se descartara el prospecto de tus registros.
        </DialogContentText>
        {bodyModal()}
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleCloseConfirmDelete} color="primary">
          Cancelar
        </Button>
        {step >= 1 && (
          <Button className="cancel" onClick={() => handleClickNext("goback")} color="primary">
            Regresar
          </Button>
        )}
        <Button className="acept" onClick={handleSubmit(deleteProspect)} type="submit" color="primary" autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
