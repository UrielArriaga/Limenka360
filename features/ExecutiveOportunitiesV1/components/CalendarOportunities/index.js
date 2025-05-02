import React, { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "moment/locale/es"; // Importar el locale de español
import dayjs from "dayjs";
// import dayjsLocalizer from "@react-big-calendar/moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Email,
  Person,
  Close,
  VideoCall,
  Assignment,
  AccessTime,
  Alarm,
  WhatsApp,
} from "@material-ui/icons";
import { Box, Typography, IconButton } from "@material-ui/core";

const localizer = dayjsLocalizer(dayjs);
const iconStyle = { marginRight: 4, color: "#1a237e" };

const iconByType = {
  Cita: <Person fontSize="small" style={iconStyle} />,
  Llamada: <Phone fontSize="small" style={iconStyle} />,
  Correo: <Email fontSize="small" style={iconStyle} />,
  Tarea: <Assignment fontSize="small" style={iconStyle} />,
  Recordatorio: <Alarm fontSize="small" style={iconStyle} />,
};

const blueShades = {
  Cita: { bg: "#e3f2fd", border: "#2196f3" },
  Llamada: { bg: "#d0e5f9", border: "#1976d2" },
  Correo: { bg: "#bbdefb", border: "#1565c0" },
  Tarea: { bg: "#c5cae9", border: "#3f51b5" },
  Recordatorio: { bg: "#e1f5fe", border: "#0288d1" },
};

const eventStyleGetter = (event) => {
  const type = event.pendingstype?.name;
  const shade = blueShades["Cita"] || { bg: "#e3f2fd", border: "#2196f3" };

  return {
    style: {
      backgroundColor: shade.bg,
      borderLeft: `4px solid ${shade.border}`,
      color: "#0d1b2a",
      fontSize: "0.8rem",
      fontFamily: "'Roboto', sans-serif",
      borderRadius: "6px",
      padding: "5px 6px",
      marginBottom: "6px",
      textTransform: "capitalize",
    },
  };
};

const StyledEvent = styled.div`
  padding: 5px 6px;
  margin-bottom: 6px;
  border-radius: 6px;
  cursor: pointer;
  background-color: transparent;
`;

const EventCard = ({ event }) => {
  const eventType = event.pendingstype?.name;
  const icon = iconByType[eventType] || null;

  const horaInicio = dayjs(event.start).format("HH:mm");
  const horaFin = dayjs(event.end).format("HH:mm");

  const borderColor = "#1565c0";

  return (
    <StyledEvent etapa={event.etapa}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          {icon}
          <strong
            style={{
              fontSize: "0.85rem",
              fontWeight: "bold",
              color: borderColor,
            }}
          >
            {event.title}
          </strong>
        </div>
        <span
          style={{
            fontSize: "0.75rem",
            color: "#1a237e",
            marginLeft: "1.3rem",
          }}
        >
          <AccessTime style={{ fontSize: 14, marginRight: 4 }} />
          {horaInicio} - {horaFin}
        </span>
      </div>
    </StyledEvent>
  );
};

const Modal = styled(motion.div)`
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 1.5rem;
  border-radius: 1rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
  z-index: 100;
`;

const Backdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
`;

const ProspectCalendar = ({ events = [], actions }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ padding: "20px 20px 20px 20px" }}>
      <div style={{ height: "70vh", padding: "1rem" }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          components={{ event: EventCard }}
          onSelectEvent={(event) => {
            actions.onClickProspect(event);
          }}
          eventPropGetter={eventStyleGetter}
          messages={{
            next: ">",
            today: "Hoy",
            previous: "<",
            month: "Mes",
            week: "Semana",
            day: "Día",
            date: "Fecha",
            time: "Horario",
            event: "Pendiente",
          }}
        />
      </div>

      <AnimatePresence>
        {selected && (
          <>
            <Backdrop
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <Modal
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="h6">{selected.title}</Typography>
                <IconButton size="small" onClick={() => setSelected(null)}>
                  <Close />
                </IconButton>
                <Typography variant="body2" style={{ marginTop: "1rem" }}>
                  Hora: {dayjs(selected.start).format("HH:mm")} -{" "}
                  {dayjs(selected.end).format("HH:mm")}
                </Typography>
              </Box>
            </Modal>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProspectCalendar;
