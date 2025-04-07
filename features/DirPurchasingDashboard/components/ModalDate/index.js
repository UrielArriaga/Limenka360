import React, { useEffect } from "react";
import { Button, DialogActions, Input, Divider } from "@material-ui/core";
import { Dialog, Slide } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { StylesDirectModalNewEvent } from "./styles";
import dayjs from "dayjs";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalDate({
  openModal,
  handleCloseModal,
  handleFormData,
  selectDate,

  ejecutivesData,
  typesData,
}) {
  const { control, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (selectDate?.start) {
      setValue("eventDate", dayjs(selectDate.start || new Date).format("YYYY-MM-DD hh:mm:ss"));
      setValue("eventDateEnd", dayjs(selectDate.start || selectDate).add(1, "hour").format("YYYY-MM-DD hh:mm:ss"));
    }else{
      setValue("eventDate", dayjs().format("YYYY-MM-DD hh:mm:ss"));
      setValue("eventDateEnd", dayjs().add(1, "hour").format("YYYY-MM-DD hh:mm:ss"));
    }
  }, [selectDate, setValue]);

  const onSubmit = data => {
    handleFormData(data);
    handleCloseModal();
    reset();
  };
  return (
    <Dialog
      open={openModal}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleCloseModal}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <StylesDirectModalNewEvent>
          <div className="title">
           <h2>Crear Nuevo Evento</h2>   
          </div>
        
          <div className="content_inputs">
            <p className="name_title">Nombre del evento:</p>
            <Controller
              name="eventName"
              control={control}
              defaultValue=""
              render={({ field }) => <Input placeholder="Nombre del evento" className="input" {...field} />}
            />
            {/* <p className="name_title">Nombre del proveedor:</p>
            <Controller
              name="providerName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                {...field}
                className="input"
                placeholder="Elige una Opción"
                options={providerData}
                getOptionLabel={e => e.name}
                getOptionValue={e => e.id}
                maxMenuHeight={230}
                noOptionsMessage={() => "Sin Opciones"}
              />
              )}
            /> */}

            <p className="name_title">Ejecutivo:</p>
            <Controller
              name="ejecutiveName"
              control={control}
              defaultValue=""
              rules={{ required: "Requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="input"
                  placeholder="Elige una Opción"
                  options={ejecutivesData}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  maxMenuHeight={230}
                  noOptionsMessage={() => "Sin Opciones"}
                />
              )}
            />
            <p className="name_title">Tipo:</p>
            <Controller
              name="typeName"
              control={control}
              defaultValue=""
              rules={{ required: "Requerido" }}
              render={({ field }) => (
                <Select
                  {...field}
                  className="input"
                  placeholder="Elige una Opción"
                  options={typesData}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  maxMenuHeight={230}
                  noOptionsMessage={() => "Sin Opciones"}
                />
              )}
            />

            <p className="name_title">Fecha de Inicio:</p>
            <Controller
              name="eventDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="datetime-local" className="input" value={field.value || ""} {...field} />
              )}
            />
            <p className="name_title">Fecha Termino:</p>
            <Controller
              name="eventDateEnd"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input type="datetime-local" className="input" value={field.value || ""} {...field} />
              )}
            />
            <p className="name_title">Agrega un Comentario:</p>
            <Controller
              name="eventComment"
              control={control}
              defaultValue=""
              render={({ field }) => <Input placeholder="Comentario" className="input" {...field} />}
            />
          </div>
          <DialogActions>
            <Button onClick={handleCloseModal} color="primary" className="button">
              Cancelar
            </Button>
            <Button type="submit" color="primary" className="button">
              Agregar
            </Button>
          </DialogActions>
        </StylesDirectModalNewEvent>
      </form>
    </Dialog>
  );
}
