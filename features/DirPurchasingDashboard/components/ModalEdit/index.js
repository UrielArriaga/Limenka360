import React, { useEffect, useState } from "react";
import { Button, DialogActions, Input, Divider } from "@material-ui/core";
import { Dialog, Slide } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { StylesDirectModalEditEvent } from "./styles";
import dayjs from "dayjs";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEdit({ openModalEdit, handleCloseModalEdit, handleFormDataEdit, selectDate, typesData, ejecutivesData, modalFinish}) {
  const { control, handleSubmit, reset, setValue } = useForm();
  const [isEditable, setIsEditable] = useState(false);
  
  useEffect(() => {
    if (selectDate) {
      setValue("eventComment", selectDate.description);
      setValue("eventName", selectDate.subject);
      setValue("ejecutiveName", selectDate.ejecutiveId      );
      setValue("typeName",typesData.find(item => item.id === selectDate.pendingstypeId));
      setValue("eventDate", dayjs(selectDate.date_from).format("YYYY-MM-DD hh:mm:ss"));

      setValue("eventDateEnd", dayjs(selectDate.date_from).add(1, "hour").format("YYYY-MM-DD hh:mm:ss"));
    }
  }, [selectDate, setValue]);

  const enableEditing = () => setIsEditable(true);

  const onSubmitEdit = data => {
    handleFormDataEdit(data);
    handleCloseModalEdit();
    reset();
  };

  return (
    <Dialog
      open={openModalEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={()=>{handleCloseModalEdit()}}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(onSubmitEdit)}>
        <StylesDirectModalEditEvent>
          <div className="title">
            <h2>Editar Evento</h2>    
          </div>
          <div className="content_inputs">
            <p className="name_title">Nombre del evento:</p>
            <Controller
              name="eventName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  placeholder="Nombre del evento"
                  className="input"
                  disabled={!isEditable}
                  {...field}
                />
              )}
            />
            <p className="name_title">Tipo:</p>
            <Controller
              name="typeName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  className="input"
                  placeholder="Elige una Opción"
                  options={typesData}
                  value={field.value || ""}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  maxMenuHeight={230}
                  noOptionsMessage={() => "Sin Opciones"}
                  isDisabled={!isEditable}
                />
              )}
            />
             <p className="name_title">Ejecutive:</p>
            <Controller
              name="ejecutiveName"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  className="input"
                  placeholder="Elige una Opción"
                  options={ejecutivesData}
                  value={field.value || ""}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  maxMenuHeight={230}
                  noOptionsMessage={() => "Sin Opciones"}
                  isDisabled={!isEditable}
                />
              )}
            />
            <p className="name_title">Fecha de Inicio:</p>
            <Controller
              name="eventDate"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="datetime-local"
                  className="input"
                  value={field.value || ""}
                  disabled={!isEditable}
                  {...field}
                />
              )}
            />
            <p className="name_title">Fecha Termino:</p>
            <Controller
              name="eventDateEnd"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="datetime-local"
                  className="input"
                  value={field.value || ""}
                  disabled={!isEditable}
                  {...field}
                />
              )}
            />
            <p className="name_title">Agrega un Comentario:</p>
            <Controller
              name="eventComment"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input
                  value={field.value || ""}
                  placeholder="Comentario"
                  className="input"
                  disabled={!isEditable}
                  {...field}
                />
              )}
            />
          </div>
          <DialogActions>
            {!isEditable ? (
              <>
                <Button onClick={()=> { handleCloseModalEdit(), modalFinish.toggleModal()}}  color="primary" className="button">
                  Finalizar
                </Button>
                <Button onClick={enableEditing} color="primary" className="button">
                  Editar
                </Button>
              </>
            ) : (
              <>
                <Button onClick={()=>{handleCloseModalEdit(),reset()}} color="primary" className="button">
                  Cancelar
                </Button>
                <Button type="submit" color="primary" className="button">
                  Actualizar
                </Button>
              </>
            )}
          </DialogActions>
        </StylesDirectModalEditEvent>
      </form>
    </Dialog>
  );
}
