import React, { useState } from "react";
import { Button, Grid, Tooltip } from "@material-ui/core";
import { motion } from "framer-motion";
import useNewTracking from "../../hooks/useNewTracking";
import { AddTrackingsStyled } from "./styles";
import { Close } from "@material-ui/icons";
export default function AddTrackings({ orderSelectedData, reloadTrackings, setShowAddForm }) {
  const { register, handleSubmit, errors, handleAddTracing, resetForm, loadingCreated } = useNewTracking({
    orderSelectedData,
    reloadTrackings,
    setShowAddForm,
  });
  return (
    <AddTrackingsStyled>
      <div className="add-tracking">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="add-form"
          style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", borderRadius: "10px" }}
        >
          <div className="headerAdd">
            <p className="titleAdd">Agregar Nuevo Pendiente.</p>
            <Tooltip title="Cancelar Seguimiento">
              <Close className="iconClose" onClick={() => setShowAddForm(false)} />
            </Tooltip>
          </div>
          <form onSubmit={handleSubmit(handleAddTracing)}>
            <Grid spacing={1} container className="ctr_inputs">
              <Grid item xs={12} md={12}>
                <label className="ctr_inputs__label">Pendiente *</label>
                <input
                  {...register("reason", { required: true })}
                  id="reason"
                  name="reason"
                  className={errors?.reason?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <label className="ctr_inputs__label">Comentarios *</label>
                <textarea
                  {...register("observations", { required: true })}
                  id="observations"
                  name="observations"
                  className={
                    errors?.observations?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                  }
                />
              </Grid>
            </Grid>
            <Grid container className="ctr_buttons">
              <Button
                variant="contained"
                color="secondary"
                disabled={loadingCreated}
                className="btn_cancel"
                onClick={() => {
                  setShowAddForm(false);
                  resetForm();
                }}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="btn_upload"
                disabled={loadingCreated}
              >
                Guardar
              </Button>
            </Grid>
          </form>
        </motion.div>
      </div>
    </AddTrackingsStyled>
  );
}
