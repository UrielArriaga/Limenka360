import React, { useState } from "react";
import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "moment/locale/es"; // Importar el locale de español
import dayjs from "dayjs";
// import dayjsLocalizer from "@react-big-calendar/moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

// al principio del archivo

import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Email, Close } from "@material-ui/icons";
import { Box, Typography, IconButton } from "@material-ui/core";

const localizer = dayjsLocalizer(dayjs);

// 🧪 Datos mock de prospectos
const events = [
  {
    id: 1,
    title: "Emma Johnson",
    phone: "555-1234",
    email: "emma@mail.com",
    etapa: "Contactado",
    start: dayjs().hour(11).minute(0).toDate(),
    end: dayjs().hour(11).minute(0).toDate(),
  },
  {
    id: 2,
    title: "Emma Johnson",
    phone: "555-1234",
    email: "emma@mail.com",
    etapa: "Contactado",
    start: dayjs().hour(10).minute(0).toDate(),
    end: dayjs().hour(11).minute(0).toDate(),
  },

  {
    id: 3,
    title: "Lucas Pérez",
    phone: "555-5678",
    email: "lucas@mail.com",
    etapa: "Cita agendada",
    start: dayjs().add(1, "day").hour(14).toDate(),
    end: dayjs().add(1, "day").hour(15).toDate(),
  },
];

// 🎨 Estilos por etapa
const etapaColor = {
  Contactado: "#f39c12",
  "Cita agendada": "#2980b9",
  "En seguimiento": "#8e44ad",
  Cerrado: "#27ae60",
};

const StyledEvent = styled.div`
  padding: 5px;
  color: white;
  font-size: 0.8rem;
  border-radius: 6px;
  background-color: ${({ etapa }) => etapaColor[etapa] || "#7f8c8d"};
  cursor: pointer;
  /* height: 300px; */
`;

const EventCard = ({ event }) => (
  <StyledEvent etapa={event.etapa}>
    <strong>{event.title}</strong>
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Phone style={{ fontSize: 14 }} /> {event.phone}
    </div>
  </StyledEvent>
);

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

const ProspectCalendar = ({ actions }) => {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{ height: "90vh", padding: "1rem" }}>
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
              </Box>
              <Typography variant="body2" mt={2}>
                <Phone fontSize="small" /> {selected.phone}
              </Typography>
              <Typography variant="body2">
                <Email fontSize="small" /> {selected.email}
              </Typography>
              <Typography variant="body2">Etapa: {selected.etapa}</Typography>
            </Modal>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProspectCalendar;
