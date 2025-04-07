import React, { useEffect, useState } from "react";
import { Button, DialogActions, Input, Divider } from "@material-ui/core";
import { Dialog, Slide } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { StylesDirectModalNewEvent, StylesNothingData } from "./styles";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import dayjs from "dayjs";
import Select from "react-select";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ModalCreatePending({
  openModalCreate,
  createNewPending,
  slotSelected,
  closeModalCreate,
  setAvaliableModal,
  avaliableModal,
}) {
  const { getCatalogBy } = useGlobalCommons();
  const { users, pendingstypes } = useSelector(commonSelector);
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [today, setToday] = useState(dayjs(new Date()).format("YYYY-MM-DD"));

  useEffect(() => {
    getCatalogBy("pendingstypes");
    getCatalogBy("users", {
      count: 1,
      all: 1,
      where: JSON.stringify({ roleId: "LOsE6ldJgT0162Um78bJH4kM" }),
    });
  }, []);

  useEffect(() => {
    if (slotSelected?.start) {
      setValue("eventDate", dayjs(slotSelected?.start).format("YYYY-MM-DD hh:mm:ss"));
      setValue("eventDateEnd", dayjs(slotSelected.start).add(1, "hour").format("YYYY-MM-DD hh:mm:ss"));
    }
    let dateSlot = dayjs(slotSelected?.start).format("YYYY-MM-DD");
    if (dateSlot >= today) setAvaliableModal(true);
  }, [slotSelected, setValue]);

  const onSubmit = data => {
    createNewPending(data);
    reset();
  };

  return (
    <Dialog
      open={openModalCreate}
      TransitionComponent={Transition}
      keepMounted
      onClose={closeModalCreate}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      {avaliableModal == true ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <StylesDirectModalNewEvent>
            <h2>Crear Nuevo Pendiente</h2>
            <Divider />
            <div className="content_inputs">
              <p className="name_title">
                Nombre del evento: {errors?.eventName && <span style={{ color: "red" }}>*Requerido</span>}
              </p>
              <Controller
                name="eventName"
                rules={{ required: true }}
                control={control}
                defaultValue=""
                render={({ field }) => <Input placeholder="Nombre del evento" className="input" {...field} />}
              />
              <p className="name_title">Tipo: {errors?.typeName && <span style={{ color: "red" }}>*Requerido</span>}</p>
              <Controller
                name="typeName"
                control={control}
                defaultValue=""
                rules={{ required: "Requerido" }}
                render={({ field }) => (
                  <Select
                    {...field}
                    className="inputSelected"
                    placeholder="Elige una Opción"
                    options={pendingstypes?.results}
                    getOptionLabel={e => e.name}
                    getOptionValue={e => e.id}
                    maxMenuHeight={230}
                    noOptionsMessage={() => "Sin Opciones"}
                  />
                )}
              />

              <p className="name_title">
                Fecha de Inicio: {errors?.eventDate && <span style={{ color: "red" }}>*Requerido</span>}
              </p>
              <Controller
                name="eventDate"
                rules={{ required: true }}
                control={control}
                defaultValue=""
                render={({ field }) => (
                  <Input type="datetime-local" className="inputDate" value={field.value || ""} {...field} />
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
                  <Input type="datetime-local" className="inputDate" value={field.value || ""} {...field} />
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
              <Button
                onClick={() => {
                  closeModalCreate();
                }}
                color="primary"
                className="button btncancel"
              >
                Cancelar
              </Button>
              <Button type="submit" color="primary" className="button btnadd">
                Agregar
              </Button>
            </DialogActions>
          </StylesDirectModalNewEvent>
        </form>
      ) : (
        <StylesNothingData>
          <h2 className="title">No puedes crear pendientes en dias anteriores al actual</h2>
        </StylesNothingData>
      )}
    </Dialog>
  );
}
