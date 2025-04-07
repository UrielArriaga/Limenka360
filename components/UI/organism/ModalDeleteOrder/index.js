import { DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Button } from "@material-ui/core";
import { AccountBox, Assignment, Email } from "@material-ui/icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { DialogContainer } from "./styles";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { handleGlobalAlert } from "../../../../utils";
import { api } from "../../../../services/api";

export default function ModalDeleteOrder(props) {
  const { openConfirmDelete, flag, setFlag, orderTable, orders, setOrders, setopenConfirmDelete } = props;

  const dispatch = useDispatch();
  const { getCatalogBy } = useGlobalCommons();
  const { discardreasonsOrders, id_user } = useSelector(commonSelector);
  const [step, setStep] = useState(0);
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const deleteOrder = async formData => {
    try {
      switch (step) {
        case 0:
          setStep(prev => prev + 1);
          break;
        case 1:
          let update = {};
          update.discartedbyId = id_user;
          update.orderreasonId = formData?.descarted?.id;
          if (formData.observations !== "") {
            update.discartedreason = formData?.observations;
          } else {
            update.discartedreason = "";
          }

          let deleteOrder = await api.put(`orders/discard/${orders?.id}`, update);
          if (deleteOrder.status == 200) {
            handleCloseConfirmDelete();
            handleGlobalAlert("success", "Pedido - Descartado!", "basic", dispatch, 6000);
            setValue("descarted", "");
            setFlag(!flag);
          }
          break;
      }
    } catch (error) {
      handleGlobalAlert("error", "Ocurrio un problema - No se descarto el pedido!", "basic", dispatch, 6000);
      console.log(error);
    }
  };

  const handleCloseConfirmDelete = () => {
    setOrders("");
    setopenConfirmDelete(false);
    setStep(0);
    setValue("descarted", "");
  };

  const body = () => {
    switch (step) {
      case 0:
        return (
          <Grid container className="dialogContainer">
            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <div className="dialogContainer__item__header">
                <Assignment className="dialogContainer__item__header__icon" />
                <p className="dialogContainer__item__header__title">Folio</p>
              </div>
              <p className="dialogContainer__item__content"> {orderTable[0]?.folio}</p>
            </Grid>

            <Grid item md={6} sm={6} xs={12} className="dialogContainer__item">
              <p className="dialogContainer__item__header__title">
                Razon:
                {errors.descarted && errors.descarted.type === "required" && (
                  <span className="dialogContainer__item__header__titleAlert"> *Requerido</span>
                )}
              </p>
              <Controller
                name="descarted"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="select-options"
                    placeholder="Selecciona una Opción"
                    onMenuOpen={() => getCatalogBy("discardreasonsOrders")}
                    loadingMessage={() => "Cargando Opciones..."}
                    isLoading={discardreasonsOrders.isFetching}
                    options={discardreasonsOrders.results}
                    isClearable={true}
                    getOptionValue={option => `${option["id"]}`}
                    getOptionLabel={option => `${option.reason}`}
                  />
                )}
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="dialogContainer__item">
              <p className="dialogContainer__item__header__title">Observaciones:</p>
              <input
                className="dialogContainer__item__header__input"
                {...register("observations", { required: false })}
                placeholder="ingresar observaciones"
              ></input>
            </Grid>
          </Grid>
        );
      case 1:
        return <Grid container className="dialogContainer"></Grid>;
      default:
        break;
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
          Se eliminara el pedido de tus registros.
        </DialogContentText>
        {body()}
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleCloseConfirmDelete} color="primary">
          Cancelar
        </Button>
        {step >= 1 && (
          <Button
            className="cancel"
            onClick={() => {
              if (step > 0) setStep(prev => prev - 1);
            }}
            color="primary"
          >
            Regresar
          </Button>
        )}
        <Button className="acept" type="submit" color="primary" onClick={handleSubmit(deleteOrder)} autoFocus>
          Continuar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
