import React from "react";
import { PendingsStyle } from "./style";
import dayjs from "dayjs";
import { Button, Grid } from "@material-ui/core";
import {
  Assignment,
  Event,
  NotificationsActive,
  PersonPinCircle,
  PinDrop,
  RingVolume,
  WatchLater,
} from "@material-ui/icons";
import LoaderPreview from "../LoaderPreviews";
import EmptyData from "../PreviewEmpty";
export default function PendingsEjecutive(props) {
  const { pendings, fetching, handlePendingsComplete } = props;
  const designTypePendings = type => {
    switch (type) {
      case "Visita":
        return <PersonPinCircle className="icon visit" />;
      case "Cita":
        return <WatchLater className="icon date" />;
      case "Llamada":
        return <RingVolume className="icon call" />;
      case "Recordatorio":
        return <NotificationsActive className="icon remember" />;
      case "Tarea":
        return <Assignment className="icon task" />;

      default:
        break;
    }
  };

  if (fetching) return <LoaderPreview />;
  if (pendings.count <= 0) return <EmptyData />;
  return (
    <PendingsStyle>
      {pendings?.pendings?.map((item, index) => (
        <Grid className="card_style" container={true} spacing={1} key={index}>
          {item?.place && (
            <Grid item={true} md={6}>
              <p className="location">
                <PinDrop className="icon" />
                {item?.place}
              </p>
            </Grid>
          )}

          <Grid item={true} md={4}>
            <p className="title">Tipo de Pendiente</p>
            <p className="data">
              {designTypePendings(item?.pendingstype?.name)}
              {item?.pendingstype?.name}
            </p>
          </Grid>
          <Grid item={true} md={4}>
            <p className="title">Estado del Pendiente</p>
            <p className="data status">{item?.isdone ? "Realizado" : "Pendiente"}</p>
          </Grid>
          <Grid item={true} md={4}>
            <p className="title">Asunto</p>
            <p className="data">{item?.subject}</p>
          </Grid>
          <Grid item={true} md={12}>
            <p className="title">Observaciones</p>
            <textarea
              className="observations"
              value={item?.description ? item.description : "Sin Observaciones"}
              readOnly={true}
            />
          </Grid>
          <Grid item={true} md={4}>
            <p className="title">Fecha Inicio Pendiente</p>
            <p className="date">
              <Event className="icon" />
              {dayjs(item?.date_from).format("MMMM DD, YYYY")}
            </p>
          </Grid>

          <Grid item={true} md={4}>
            <p className="title">Fecha de Fin</p>
            <p className="data">
              {item?.date_to ? dayjs(item?.date_to).format("MMMM DD, YYYY - hh:mm a") : "Sin Fecha de Fin"}
            </p>
          </Grid>
          <Grid item={true} md={4}>
            <p className="title">Fecha de Creacion</p>
            <p className="data">
              {item?.createdAt ? dayjs(item?.createdAt).format("DD-MMMM-YYYY") : "Sin Fecha de Creación"}
            </p>
          </Grid>
          <Grid item={true} md={12}>
            <div className="actions">
              <Button
                onClick={() => handlePendingsComplete(item)}
                className="pendingButton"
                variant="contained"
                color="primary"
              >
                Marcar como terminado
              </Button>
            </div>
          </Grid>
        </Grid>
      ))}
    </PendingsStyle>
  );
}
