import { Tooltip } from "@material-ui/core";
import { CalendarToday, Edit, WhatsApp } from "@material-ui/icons";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = {
  columns: {
    // Columns is a object
    column1: {
      id: "column1",
      title: "Prospecto nuevo",
      taskIds: ["task1", "task2"],
    },
    column2: {
      id: "column2",
      title: "Contactado",
      taskIds: ["task3"],
    },
    column3: {
      id: "column3",
      title: "No Contactado",
      taskIds: ["task3"],
    },
    column4: {
      id: "column4",
      title: "Inactivo",
      taskIds: [],
    },
  },
  tasks: {
    task1: {
      id: "ioynubwNrd07TMyG2zsNk3Rs",
      name: "adan",
      fullname: "adan ",
      email: "adan.23@gmail.com",
      createdAt: "2023-06-08T15:41:39.397Z",
      categoryId: "2JKxfDFZ52v7udBgYM77ZbyD",
      clientTypeId: "Jdwfj45JM1gaV9UxrvcLt7Tm",
      lastTracking: {
        id: "JynMR8QyrGCa8wAJLTMXu45e",
        url: "",
        type: 1,
        reason: "Seguimiento automático",
        status: 1,
        orderId: null,
        phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
        actionId: "62hHzqoSCj0452fT1sUAEzba",
        certainty: null,
        createdAt: "2025-03-05T19:46:38.281Z",
        updatedAt: "2025-03-05T19:46:38.281Z",
        prospectId: "ioynubwNrd07TMyG2zsNk3Rs",
        createdbyId: "YNQHRt32OCbt0shXa0yOa51t",
        observations: "La fase ha sido cambiada. Fase anterior: contactado",
        oportunityId: null,
        purchaseorderId: null,
      },
      lastTrackingcreatedAt: "2025-03-05T19:46:38.281Z",
      category: {
        id: "2JKxfDFZ52v7udBgYM77ZbyD",
        name: "SIN CATEGORIA",
        system: true,
        createdAt: "2023-05-19T18:18:16.545Z",
        updatedAt: "2023-05-19T18:18:16.545Z",
        companyId: "62dz3qnimTqzfPfKpt7JtOtE",
      },
    },
    task2: {
      id: "xqIeb2Z8u1tEQPwueniMgsvZ",
      name: "test",
      fullname: "test test",
      email: "andres_vasa2@gmail.com",
      createdAt: "2025-01-20T19:20:40.755Z",
      categoryId: null,
      clientTypeId: "62dZ7raLRS7R3NhVjfPkSqJn",
      lastTracking: {
        id: "RqratoxaVGEvQp5Ph89QkDjJ",
        url: "",
        type: 1,
        reason: "Seguimiento automático",
        status: 1,
        orderId: null,
        phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
        actionId: "62hHzqoSCj0452fT1sUAEzba",
        certainty: null,
        createdAt: "2025-04-04T20:07:35.377Z",
        updatedAt: "2025-04-04T20:07:35.377Z",
        prospectId: "xqIeb2Z8u1tEQPwueniMgsvZ",
        createdbyId: "YNQHRt32OCbt0shXa0yOa51t",
        observations: "La fase ha sido cambiada. Fase anterior: No contactado",
        oportunityId: null,
        purchaseorderId: null,
      },
      lastTrackingcreatedAt: "2025-04-04T20:07:35.377Z",
      category: null,
    },
    task3: {
      id: "f7lzbEoDIsKqTOzapnOJRzwl",
      name: "mc d",
      fullname: "mc d ",
      email: "uriel123@gmail.com",
      createdAt: "2024-08-23T15:33:50.209Z",
      categoryId: null,
      clientTypeId: "Jdwfj45JM1gaV9UxrvcLt7Tm",
      lastTracking: {
        id: "ilNpzKfSkXawYRXRJqf6YJj1",
        url: "",
        type: 1,
        reason: "Seguimiento automático",
        status: 1,
        orderId: null,
        phaseId: "62dqqR1IIAB3T4SiVuZZSxQl",
        actionId: "62hHzqoSCj0452fT1sUAEzba",
        certainty: null,
        createdAt: "2025-03-05T20:09:06.265Z",
        updatedAt: "2025-03-05T20:09:06.265Z",
        prospectId: "f7lzbEoDIsKqTOzapnOJRzwl",
        createdbyId: "YNQHRt32OCbt0shXa0yOa51t",
        observations: "La fase ha sido cambiada. Fase anterior: contactado",
        oportunityId: null,
        purchaseorderId: null,
      },
      lastTrackingcreatedAt: "2025-03-05T20:09:06.265Z",
      category: null,
    },
  },
  columnOrder: ["column1", "column2", "column3", "column4"],
};

export default function ExecutivesProspectsV1() {
  const [data, setData] = useState(initialData);
  const [prospectSelected, setProspectSelected] = useState(null);
  const [openPreview, setopenPreview] = useState(false);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({ ...data, columnOrder: newColumnOrder });
      return;
    }

    if (destination.droppableId === "convert-zone") {
      const task = data.tasks[draggableId];
      console.log("Convertir a oportunidad:", task);

      // Aquí puedes llamar a una función para hacer la conversión real
      // por ejemplo: convertToOpportunity(task)

      // También puedes removerlo visualmente de su columna actual:
      const start = data.columns[source.droppableId];
      const newTaskIds = start.taskIds.filter((id) => id !== draggableId);
      const newColumn = { ...start, taskIds: newTaskIds };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });

      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

    // Mismo columna
    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      setData({
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      });
      return;
    }

    // Entre columnas diferentes
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    setData({
      ...data,
      columns: {
        ...data.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    });
  };

  const onClickProspect = (item) => {
    setProspectSelected(item);
    toogleModalPreview();
  };

  const toogleModalPreview = () => {
    setopenPreview(!openPreview);
  };

  const toogleLimiBotChat = () => {
    setOpenLimiBotChat(!openLimiBotChat);
  };

  return (
    <ExecutiveProspectsStyled>
      <FilterProspects />
      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextStyled>
          <ColumnList
            data={data}
            actions={{
              onClickProspect,
              toogleLimiBotChat,
            }}
          />
          {/* <ConvertArea /> */}
        </DropContextStyled>
      </DragDropContext>

      <ModalPreview
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={openPreview}
        toggleModal={toogleModalPreview}
      />

      <LimiBotChatIA
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={openLimiBotChat}
        toggleModal={toogleLimiBotChat}
      />
    </ExecutiveProspectsStyled>
  );
}

function ConvertArea() {
  return (
    <Droppable droppableId="convert-zone" type="task">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            width: 150,
            height: "100vh",
            padding: 16,
            borderRadius: 8,
            background: snapshot.isDraggingOver ? "#d1e7dd" : "#f8f9fa",
            border: "2px dashed #6c757d",
            transition: "0.3s",
          }}
        >
          <p style={{ textAlign: "center", fontWeight: 600 }}>
            Convertir a oportunidad
          </p>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function ColumnList({ data, actions }) {
  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ display: "flex", gap: "1rem" }}
        >
          {data.columnOrder.map((columnId, index) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                index={index}
                actions={actions}
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function Column({ column, tasks, index, actions }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            margin: "0 8px",
            width: 300,
          }}
        >
          <div
            {...provided.dragHandleProps}
            style={{
              marginBottom: 10,
            }}
          >
            <h3>{column.title}</h3>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: "#eee",
                  padding: 8,
                  minHeight: 100,
                  borderRadius: 4,
                }}
              >
                {tasks.map((task, index) => (
                  <Task
                    key={task.id}
                    task={task}
                    index={index}
                    actions={actions}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

function Task({ task, index, actions }) {
  const cutString = (str = "", len = 40) => {
    if (str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <ItemProspect
          onClick={() => actions.onClickProspect(task)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="prospect-data">
            <div className="prospect-data__top">
              <p className="fullname">{task.fullname}</p>
            </div>

            <div className="prospect-data__center">
              <p className="client-type">Tipo de cliente : Doctor</p>

              <p className="last-tracking">
                {cutString(task?.lastTracking?.observations)} -{" "}
                <span>{dayjs(task?.lastTrackingcreatedAt).fromNow()}</span>
              </p>
            </div>

            <div className="prospect-data__bottom">
              <div className="createdAt">
                <CalendarToday />
                <p>{dayjs(task?.createdAt).format("DD/MM/YYYY")}</p>
              </div>
            </div>
          </div>

          <div className="prospect-actions">
            <Tooltip
              title={`Enviar Whastapp `}
              placement="top"
              onClick={(e) => {
                e.stopPropagation();
                // window.open(`https://wa.me/${item?.phone}`, "_blank");
              }}
            >
              <WhatsApp className="whats iconaction" />
            </Tooltip>

            <Tooltip title="Editar" placement="top">
              <Edit className="whats iconaction" />
            </Tooltip>

            <Tooltip
              title="LIMIBOT"
              placement="top"
              onClick={(e) => {
                e.stopPropagation();
                actions.toogleLimiBotChat();
              }}
            >
              {/* <Edit className="whats iconaction" /> */}

              <img
                style={{ width: 20, height: 20 }}
                src="/LOGOLIMENKA360_NAVBAR_COLOR_small.png"
              />
            </Tooltip>
          </div>
        </ItemProspect>
      )}
    </Draggable>
  );
}

import styled from "styled-components";
import ModalPreview from "../ExecutiveProspects/components/ModalPreview";
import { ExecutiveProspectsStyled } from "./styled";
import FilterProspects from "./components/FilterProspects";
import dayjs from "dayjs";
import LimiBotChatIA from "./components/LimiBotChatIA";

const DropContextStyled = styled.div`
  display: flex;
`;

const ItemProspect = styled.div`
  position: relative;
  border-radius: 6px;
  padding: 10px;
  background-color: #fff;
  min-height: 10px;
  margin-bottom: 10px;
  display: flex;

  .prospect-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .fullname {
        font-size: 16px;
        font-weight: 600;
        color: #39b8df;
        text-transform: capitalize;
      }
    }

    &__center {
      display: flex;
      flex-direction: column;
      gap: 2px;

      .client-type {
        font-size: 12px;
        /* color: #bdbdbd; */
      }

      .last-tracking {
        font-size: 12px;
        /* color: #bdbdbd; */

        span {
          font-weight: 600;
          color: #39b8df;
        }
      }
    }

    &__bottom {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 12px;
      /* color: #bdbdbd; */

      .createdAt {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 12px;
        /* color: #bdbdbd; */

        svg {
          font-size: 16px;
          /* color: #bdbdbd; */
        }
      }
    }
  }

  .prospect-actions {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 10px;
    /* margin-top: 8px; */

    .iconaction {
      color: #bdbdbd;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        color: #39b8df;
      }
    }

    .whats {
      &:hover {
        color: #25d366;
        cursor: pointer;
      }
    }
  }
`;

// * DragDropContext
/* 
DragDropContext es el componente fundamental y obligatorio de 
la biblioteca react-beautiful-dnd que proporciona el contexto necesario para que funcione 
todo el sistema de arrastrar y soltar (drag and drop) en tu aplicación React.

Características principales:
Componente contenedor: Envuelve toda la parte de tu interfaz donde quieres habilitar el drag and drop.
Administrador de eventos: Maneja todos los eventos relacionados con el arrastre.
Proveedor de contexto: Proporciona el contexto necesario para que los componentes Droppable y Draggable funcionen.

*/

// * Droppable
/* 
¿Qué es Droppable en React Beautiful DnD?
Droppable es un componente de react-beautiful-dnd que define un área donde se 
pueden soltar elementos arrastrables (Draggable). Es esencial para crear 
interfaces donde los elementos pueden ser reordenados o movidos entre diferentes zonas.

Características principales:
Define zonas de destino: Áreas donde los elementos arrastrados pueden ser soltados.

Proporciona contexto: Da información visual durante el arrastre (placeholder, estilo al pasar sobre él).

Puede contener múltiples Draggables: Una lista de elementos que pueden ser reordenados.
 */

/* 🧩 DragDropContext    => Es el cerebro del drag and drop.
🧩 Droppable          => Es el "contenedor" donde puedes soltar cosas.
🧩 Draggable          => Es lo que puedes mover (arrastrar).

 */
