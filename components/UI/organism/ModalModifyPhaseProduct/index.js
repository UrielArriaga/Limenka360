import React, { useContext, useEffect, useState } from "react";
import { toUpperCaseChart, handleGlobalAlert } from "../../../../utils";
import { Dialog, CircularProgress, Grid, Button, Box } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { Note } from "@material-ui/icons";
import { DialogModify, Error } from "./styles";
import Select from "react-select";
import { api } from "../../../../services/api";
import { useForm, Controller } from "react-hook-form";
export default function ModifiPhaseProduct({ dataShipping, close, open, setRefetchShipping, refetchShipping }) {
  const dispatch = useDispatch();
  const [phases, setPhases] = useState([]);
  const [loaderCompletephase, setLoaderCompletephase] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (open === true) {
      getShippins();
      showValuesForm();
    } else {
      cleanFormValues();
    }
  }, [open]);

  const getShippins = async () => {
    try {
      let res = await api.get("/productphases");
      setPhases(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const ModifyPhase = async formData => {
    setLoaderCompletephase(true);
    try {
      let responseUpdate = await api.put(`productsshippings/${dataShipping?.id}`, { productphaseId: formData.phase });
      if (responseUpdate.status == 200) {
        handleGlobalAlert("success", "Fase Actualizada con Exito !", "basic", dispatch, 6000);
        setRefetchShipping(!refetchShipping);
        close();
        setLoaderCompletephase(false);
      }
    } catch (error) {
      setLoaderCompletephase(false);
      handleGlobalAlert("error", " ocurrio un error al modificar la fase", "basic", dispatch, 6000);
    }
  };

  const handleSelectPhases = item => {
    if (item === "") {
      setValue("phase", "");
    } else {
      setValue("phase", item.id);
    }
  };
  const showValuesForm = () => {
    setValue("phase", dataShipping?.productphaseId);
  };
  const cleanFormValues = () => {
    setValue("phase", "");
  };

  return (
    <Dialog onClose={close} open={open}>
      <DialogModify>
        <div className="title">
          <p>Editar Fase Producto</p>
          {loaderCompletephase && <CircularProgress className="title__loader" />}
        </div>
        <div className="containerBody">
          <form onSubmit={handleSubmit(ModifyPhase)}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12}>
                <div className="column">
                  <Box m={1}></Box>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <div className="column">
                  <p className="content">Datos de Envio:</p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="column">
                  <div className="row">
                    <p className="label">Recibe</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(dataShipping?.shipping?.receive)} </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className="column">
                  <div className="row">
                    <p className="label">Telefono</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(dataShipping?.shipping?.phone)} </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <div className="column">
                  <Box m={1}></Box>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <div className="column">
                  <p className="content">Datos de Producto:</p>
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <div className="column">
                  <div className="row">
                    <p className="label">Nombre Producto</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(dataShipping?.productsoportunity?.product?.name)} </p>
                </div>
              </Grid>
              <Grid item xs={12} sm={6} md={6}>
                <div className="column">
                  <div className="row">
                    <p className="label">Codigo Producto</p>
                  </div>

                  <p className="content"> {toUpperCaseChart(dataShipping?.productsoportunity?.product?.code)} </p>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={6}>
                <div className="column">
                  <div className="row">
                    <Note />
                    <p className="label">Fase</p>
                    {watch("phase") === "" && errors.phase && errors.phase.type === "required" && (
                      <Error>{"Requerido"}</Error>
                    )}
                  </div>

                  <Controller
                    name="phase"
                    control={control}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        className="dialogContainer__item__select"
                        placeholder="elige una opción"
                        isClearable={true}
                        options={phases}
                        onChange={e => (e === null ? handleSelectPhases("") : handleSelectPhases(e))}
                        value={phases.filter(item => item.id === field.value)}
                        getOptionValue={option => `${option["id"]}`}
                        getOptionLabel={option => `${option.name} `}
                        maxMenuHeight={120}
                      />
                    )}
                  />
                </div>
              </Grid>

              <Grid item xs={12} sm={12} md={12}>
                <div className="column">
                  <Box m={4}></Box>
                </div>
              </Grid>
            </Grid>

            <div className="buttons">
              <button
                disabled={loaderCompletephase}
                className={`dialogContainer__buttons__cancel ${loaderCompletephase && "disabled"}`}
                color="primary"
                onClick={close}
              >
                Cancelar
              </button>

              <button
                disabled={loaderCompletephase}
                className={`dialogContainer__buttons__acept ${loaderCompletephase && "disabled"}`}
                color="primary"
                type="submit"
              >
                Aceptar
              </button>
            </div>
          </form>
        </div>
      </DialogModify>
    </Dialog>
  );
}
