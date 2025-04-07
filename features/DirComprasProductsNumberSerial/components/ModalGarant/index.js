import { Button, Dialog, DialogActions, Slide } from "@mui/material";
import React, { useEffect } from "react";
import { StylesDirectModalGaranties } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { Input } from "@material-ui/core";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import Select from "react-select";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalGaranties({ openModalGaranties, closeModalGaranties, orderSelected, createWarranty }) {
  const { control, handleSubmit, reset, setValue, formState:{errors} } = useForm();
  const onSubmit = data => {
    createWarranty(data);
    reset();
    closeModalGaranties();
  };
  const { reasonwarranties } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  useEffect(()=> {
    getCatalogBy("reasonwarranties")
  },[])

  
  const warehouseProduct = orderSelected?.data;

  return (
    <Dialog
      open={openModalGaranties}
      TransitionComponent={Transition}
      keepMounted
      onClose={()=> { reset(), closeModalGaranties()}}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <StylesDirectModalGaranties>
          <h3>¿Deseas agregar garantia a este producto?</h3>
          <div className="content_inputs">
            <p className="name_title">Rason de la Grantia: {errors?.reason ? (<span style={{color:"#b80c3d"}}>* Requerido</span>):""} </p>
            <Controller
              name="reason"
              control={control}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="inputSelect"
                  placeholder="Elige una Opción"
                  options={reasonwarranties?.results}
                  value={field.value || ""}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  maxMenuHeight={230}
                  noOptionsMessage={() => "Sin Opciones"}
                />
              )}
            />

            <p className="name_title">Comentarios del Articulo:</p>
            <Controller
              name="Descriptions"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input placeholder="Descripcion de la garantia" className="input" {...field} required />
              )}
            />
          </div>
          <DialogActions>
            <Button size="small" onClick={()=> { reset(), closeModalGaranties()}} color="primary" className="button cancel">
              Cancelar
            </Button>
            <Button size="small" type="submit" color="primary" className="button acept">
              Aceptar
            </Button>
          </DialogActions>
        </StylesDirectModalGaranties>
      </form>
    </Dialog>
  );
}
