import React, { useEffect, useState } from "react";
import { Button, DialogActions, Input, Divider } from "@material-ui/core";
import { Dialog, Slide } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { StylesDirectModalEditEvent } from "./styles";
import dayjs from "dayjs";
import Select from "react-select";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalEditPending({ openModalEdit, toggleModalEdit, slotToEdit, updatePending, modalFinish, ejecutivesData }) {
  const { getCatalogBy } = useGlobalCommons();
  const { users, pendingstypes } = useSelector(commonSelector);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [isEditable, setIsEditable] = useState(false);

  useEffect(() => {
    getCatalogBy("pendingstypes");
    {/*getCatalogBy("users", {
      count: 1,
      all: 1,
      where: JSON.stringify({ roleId: "LOsE6ldJgT0162Um78bJH4kM" }),
    });*/}
  }, []);

  useEffect(() => {
    if (slotToEdit) {
      setValue("eventComment", slotToEdit.description);
      setValue("eventName", slotToEdit.subject);
      setValue(
        "ejecutiveName",
        users?.results.find(item => item.id == slotToEdit.ejecutiveId)
      );
      setValue(
        "typeName",
        pendingstypes?.results?.find(item => item.id === slotToEdit.pendingstypeId)
      );
      setValue("eventDate", dayjs(slotToEdit.date_from).format("YYYY-MM-DD hh:mm:ss"));

      setValue("eventDateEnd", dayjs(slotToEdit.date_from).add(1, "hour").format("YYYY-MM-DD hh:mm:ss"));
    }
  }, [slotToEdit, setValue]);

  const enableEditing = () => setIsEditable(true);

  const onSubmitEdit = data => {
    setIsEditable(false);
    updatePending(data);
    reset();
  };

  return (
    <Dialog
      open={openModalEdit}
      TransitionComponent={Transition}
      keepMounted
      onClose={toggleModalEdit}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <form onSubmit={handleSubmit(onSubmitEdit)}>
        <StylesDirectModalEditEvent>
          <div className="title"></div>
          <h2>Editar Evento</h2>
          <Divider />
          <div className="content_inputs">
            <p className="name_title">
              Nombre del evento: {errors?.eventName && <span style={{ color: "red" }}>*Requerido</span>}
            </p>
            <Controller
              name="eventName"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input placeholder="Nombre del evento" className="input" disabled={!isEditable} {...field} />
              )}
            />
            <p className="name_title">Tipo: {errors?.typeName && <span style={{ color: "red" }}>*Requerido</span>}</p>
            <Controller
              name="typeName"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  className="inputSelected"
                  placeholder="Elige una Opción"
                  options={pendingstypes?.results}
                  value={field.value || ""}
                  getOptionLabel={e => e.name}
                  getOptionValue={e => e.id}
                  maxMenuHeight={230}
                  noOptionsMessage={() => "Sin Opciones"}
                  isDisabled={!isEditable}
                />
              )}
            />
           
            <p className="name_title">
              Fecha de Inicio: {errors?.eventDate && <span style={{ color: "red" }}>*Requerido</span>}
            </p>
            <Controller
              name="eventDate"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="datetime-local"
                  className="inputDate"
                  value={field.value || ""}
                  disabled={!isEditable}
                  {...field}
                />
              )}
            />
            <p className="name_title">
              Fecha Termino: {errors?.eventDateEnd && <span style={{ color: "red" }}>*Requerido</span>}
            </p>
            <Controller
              name="eventDateEnd"
              control={control}
              rules={{ required: true }}
              defaultValue=""
              render={({ field }) => (
                <Input
                  type="datetime-local"
                  className="inputDate"
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
      <Button 
        onClick={enableEditing} 
        color="primary" 
        className="button edit">
        Editar
      </Button>
      <Button 
        onClick={() => { 
          toggleModalEdit(); 
          modalFinish.toggleModal(); 
        }} 
        color="primary" 
        className="button edit">
        Finalizar
      </Button>
    </>
  ) : (
    <>
      <Button
        onClick={() => {
          reset();  
          setIsEditable(false);  
        }}
        color="primary"
        className="button btncancel"
      >
        Cancelar
      </Button>
      <Button 
        type="submit" 
        color="primary" 
        className="button btnadd">
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
