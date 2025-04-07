import React, { useEffect } from "react";
import { Dialog, Grid, TextField, Button } from "@material-ui/core";
import { DialogFullScreen } from "./styles";
import { CloseOutlined } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
export default function FormatReview({
  open,
  onClose,
  register,
  handleSubmit,
  errors,
  reset,
  handleCancel,
  onSubmit,
  items,
  productSelect,
}) {
  const { name } = useSelector(userSelector);
  useEffect(() => {
    if (productSelect) {
      reset({
        model: productSelect.code,
        serialNumber: productSelect.serialnumber,
        description: productSelect.product,
        responsiblePerson: name,
        revisionDate: "",
        functioning: { selected: "", observations: "" },
        accessories: { selected: "", observations: "" },
        aestheticDetails: { selected: "", observations: "" },
        cleaning: { selected: "", observations: "" },
      });
    }
  }, [productSelect, reset]);

  return (
    <DialogFullScreen anchor="right" open={open} onClose={onClose}>
      <div className="ctr_edit">
        <div className="ctr_edit__header">
          <div className="ctr_edit__header__close">
            <CloseOutlined className="close" onClick={handleCancel} />
            <p className="title">Formato Revisión</p>
          </div>
          <Button variant="contained" className="btn_save" onClick={handleSubmit(onSubmit)}>
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_edit__ctr_info">
          <p className="ctr_edit__ctr_info__title">Check General</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container className="form">
              <Grid item xs={12} md={6} className="item">
                <p>Modelo*</p>
                <input {...register("model", { required: true })} className="disabled" disabled />
              </Grid>

              <Grid item xs={12} md={6} className="item">
                <p>Número de Serie*</p>
                <input {...register("serialNumber", { required: true })} className="disabled" disabled />
              </Grid>
              <Grid item xs={12} className="item">
                <p>Descripción del Equipo* {errors.description && <span className="error-message"> Requerido</span>}</p>

                <input
                  {...register("description", { required: true })}
                  className="disabled" disabled
                  placeholder="Ingresa descripcion"
                />
              </Grid>
              <Grid item xs={12}>
                <div style={{ height: "20px" }} />
              </Grid>
              <Grid item xs={3} className="item">
                <strong>Lista</strong>
              </Grid>
              <Grid item xs={3} className="item">
                <strong>Si / No</strong>
              </Grid>
              <Grid item xs={6} className="item">
                <strong>Observaciones</strong>
              </Grid>

              {items.map((item, key) => (
                <Grid container key={key} alignItems="center">
                  <Grid item xs={3} className="item">
                    <p>{item.label} </p>
                  </Grid>
                  <Grid item xs={3} className="item">
                    <div className="radios">
                      <input
                        className="radiosInput"
                        type="radio"
                        value="true"
                        {...register(`${item.name}.selected`, { required: "Requerido" })}
                      />

                      <input
                        className="radiosInput"
                        type="radio"
                        value="false"
                        {...register(`${item.name}.selected`, { required: "Requerido" })}
                      />
                    </div>
                    {errors[item.name]?.selected && (
                      <span style={{ color: "red" }}>{errors[item.name].selected.message}</span>
                    )}
                  </Grid>
                  <Grid item xs={6} className="item">
                    <TextField
                      {...register(`${item.name}.observations`, { required: true })}
                      placeholder="Observaciones"
                      variant="outlined"
                      size="small"
                    />
                  </Grid>
                </Grid>
              ))}

              <Grid item xs={12} md={6} className="item">
                <p>
                  Persona Responsable* {errors.responsiblePerson && <span className="error-message"> Requerido</span>}
                </p>
                <input
                  {...register("responsiblePerson", { required: true })}
                  className="disabled" disabled
                  placeholder="Persona Responsable"
                />
              </Grid>

              <Grid item xs={12} md={6} className="item">
                <p>Fecha Revision* {errors.revisionDate && <span className="error-message"> Requerido</span>}</p>
                <input type="date" className="input capitalize" {...register("revisionDate", { required: true })} />
              </Grid>

              <div className="formActions">
                <Button variant="contained" onClick={handleCancel} className="cancel">
                  Cancelar
                </Button>
                <Button variant="contained" type="submit" className="save">
                  Guardar
                </Button>
              </div>
            </Grid>
          </form>
        </div>
      </div>
    </DialogFullScreen>
  );
}
