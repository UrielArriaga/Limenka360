import React, { use, useEffect } from "react";
import styled from "styled-components";
export default function Prueba() {
  return (
    <Container>
      <CustomCalendar />
    </Container>
  );
}

const Container = styled.div``;

import { Calendar, Views } from "react-big-calendar";
import { dayjsLocalizer } from "react-big-calendar";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import "react-big-calendar/lib/css/react-big-calendar.css";

dayjs.extend(isoWeek);

const localizer = dayjsLocalizer(dayjs);

const resources = [
  { resourceId: 1, resourceTitle: "📞 Llamada" },
  { resourceId: 2, resourceTitle: "📹 Videollamada" },
  { resourceId: 3, resourceTitle: "📝 Tarea" },
  { resourceId: 4, resourceTitle: "📝 Whatsapp" },
];

const events = [
  {
    title: "Llamada con cliente",
    start: new Date(2025, 3, 23, 8, 0),
    end: new Date(2025, 3, 23, 8, 1),
    resourceId: 1,
    leadtype: 1,
  },
  {
    title: "Llamada con cliente",
    start: new Date(2025, 3, 23, 10, 0),
    end: new Date(2025, 3, 23, 11, 0),
    resourceId: 1,
    leadtype: 2,
  },
  {
    title: "Videollamada de equipo",
    start: new Date(2025, 3, 23, 12, 0),
    end: new Date(2025, 3, 23, 13, 0),
    resourceId: 2,
    leadtype: 1,
  },
  {
    title: "Redactar propuesta",
    start: new Date(2025, 3, 23, 15, 0),
    end: new Date(2025, 3, 23, 16, 0),
    resourceId: 3,
    leadtype: 3,
  },
];

const generateRandomEvents = (numEvents) => {
  const randomEvents = [];
  const leadTypes = [1, 2, 3];
  const resourceIds = [1, 2, 3, 4];
  const usedTimes = new Set();

  for (let i = 0; i < numEvents; i++) {
    let randomStartHour;
    let randomDuration;
    let start;
    let end;

    do {
      randomStartHour = Math.floor(Math.random() * 10) + 8;
      randomDuration = Math.floor(Math.random() * 2) + 1;
      start = new Date(2025, 3, 23, randomStartHour, 0);
      end = new Date(2025, 3, 23, randomStartHour + randomDuration, 0);
    } while (usedTimes.has(start.getTime()));

    usedTimes.add(start.getTime());

    const randomLeadType =
      leadTypes[Math.floor(Math.random() * leadTypes.length)];
    const randomResourceId =
      resourceIds[Math.floor(Math.random() * resourceIds.length)];

    randomEvents.push({
      title: `Evento ${i + 1}`,
      start,
      end,
      resourceId: randomResourceId,
      leadtype: randomLeadType,
    });
  }

  return randomEvents;
};

useEffect(() => {}, []);

// const randomEvents = generateRandomEvents(10);
// events.push(...randomEvents);

const StyledCalendarWrapper = styled.div`
  height: 100vh;
  padding: 20px;

  .rbc-time-header-cell {
    background-color: #f0f0f0;
    font-weight: bold;
    text-align: center;
  }

  .rbc-event {
    background-color: #4a90e2;
    color: white;
    border-radius: 4px;
    padding: 4px;
    font-size: 0.9rem;
  }
`;

const CustomCalendar = () => {
  return (
    <StyledCalendarWrapper>
      <Calendar
        min={new Date(0, 0, 0, 8, 0)}
        max={new Date(0, 0, 0, 18, 0)}
        localizer={localizer}
        events={events}
        defaultView={Views.WEEK}
        views={["week", "day", "month", "agenda"]}
        defaultDate={new Date(2025, 3, 23)}
        resources={resources}
        resourceIdAccessor="resourceId"
        resourceTitleAccessor="resourceTitle"
        style={{ height: "100%" }}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={(event) => {
          let backgroundColor = "#4a90e2";
          if (event.leadtype === 1) {
            backgroundColor = "rgba(102, 205, 170,0.4)";
          } else if (event.leadtype === 2) {
            backgroundColor = "#B22222   ";
          } else if (event.leadtype === 3) {
            backgroundColor = "#A9B86E ";
          }
          return { style: { backgroundColor, border: "none" } };
        }}
        components={{
          event: ({ event }) => (
            <div
              style={{
                color: "white",
              }}
            >
              {event.title} P1
            </div>
          ),
        }}
      />
    </StyledCalendarWrapper>
  );
};
