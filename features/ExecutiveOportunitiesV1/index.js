import {
  CalendarToday,
  CheckCircle,
  Edit,
  Email,
  History,
  Phone,
  Schedule,
  WhatsApp,
} from "@material-ui/icons";
import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { motion } from "framer-motion";
const initialData = {
  columns: {
    // Columns is a object
    column1: {
      id: "column1",
      title: "Prospecto nuevo",
      taskIds: ["task1"],
    },
    column2: {
      id: "column2",
      title: "Contactado",
      taskIds: [],
    },
    column3: {
      id: "column3",
      title: "No Contactado",
      taskIds: [],
    },
    column4: {
      id: "column4",
      title: "Inactivo",
      taskIds: [],
    },
  },
  tasks: {
    task1: {
      id: "wLfG8UIE0PPBmc4gJD3bourt",
      concept: "UDIAM-133",
      amount: 50849.76,
      estimatedclossing: "2024-09-12T06:00:01.000Z",
      createdAt: "2024-09-04T16:17:47.665Z",
      phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
      prospectId: "by89HK4nR7bHp6JSwlG612qb",
      lastTracking: {
        id: "TLz4eglzdeA5IUTKsEA8cF2u",
        url: "",
        reason: "Seguimiento Automatico",
        status: 5,
        orderId: "wBeFvpWMnu0N5wchF7VoijMm",
        phaseId: "qJzenUoCQ3amgoRZihcsHWus",
        actionId: "62hHzqoSCj0452fT1sUAEzba",
        certainty: null,
        createdAt: "2024-09-04T16:20:56.082Z",
        updatedAt: "2024-09-04T16:20:56.082Z",
        prospectId: "by89HK4nR7bHp6JSwlG612qb",
        createdbyId: "RHraMOYQfACPNq8T1Bcqq6dA",
        observations: "El Pedido UDIAMSEP2420 fue Aprobado.",
        oportunityId: "wLfG8UIE0PPBmc4gJD3bourt",
      },
      lastTrackingcreatedAt: "2024-09-04T16:20:56.082Z",
      nextpendingat: null,
      certainty: 60,
      prospect: {
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
        categoryId: null,
        fullname: "dr starbucks ",
        email: "drstarbucks@gmail.com",
        createdAt: "2024-08-06T16:42:37.013Z",
        clientTypeId: "62dSBtINiDWsqcUN8oQXSh82",
        category: null,
        clienttype: {
          id: "62dSBtINiDWsqcUN8oQXSh82",
          name: "Consultorio",
        },
      },
    },
  },
  columnOrder: ["column1", "column2", "column3", "column4"],
};

export default function ExecutiveOportunitiesV1() {
  const [data, setData] = useState(initialData);
  const [prospectSelected, setProspectSelected] = useState(null);
  const [openPreview, setopenPreview] = useState(false);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);
  const [openNewOportunity, setOpenNewOportunity1] = useState(false);
  const [showArea, setShowArea] = useState(false);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    console.log("Drag Result:");
    console.log(`  Draggable ID: ${result.draggableId}`);
    console.log(`  Source:`);
    console.log(`    Droppable ID: ${source.droppableId}`);
    console.log(`    Index: ${source.index}`);
    if (destination) {
      console.log(`  Destination:`);
      console.log(`    Droppable ID: ${destination.droppableId}`);
      console.log(`    Index: ${destination.index}`);
    } else {
      console.log("  Destination: None");
    }

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

    console.log(start, finish);

    return;

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

    setShowArea(false);
  };

  const onClickProspect = (item) => {
    setProspectSelected(item);
    setopenPreview(!openPreview);

    // setOpenNewOportunity1(!openNewOportunity);
    // setProspectSelected(item);
    // toogleModalPreview();
  };

  const toogleModalPreview = () => {
    setopenPreview(!openPreview);
  };

  const toogleLimiBotChat = (item) => {
    setProspectSelected(item);
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

      <NewOportunity
        open={openNewOportunity}
        toggleModal={() => {
          setOpenNewOportunity1(!openNewOportunity);
        }}
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
            width: 360,
          }}
        >
          <div
            {...provided.dragHandleProps}
            style={{
              marginBottom: 10,
            }}
          >
            <h3>
              {column.title} {column.id}
            </h3>
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

function Task({ task: prospect, index, actions }) {
  const cutString = (str = "", len = 40) => {
    if (str.length > len) {
      return str.substring(0, len) + "...";
    }
    return str;
  };

  return (
    <Draggable draggableId={prospect.id} index={index}>
      {(provided) => (
        <ItemProspect
          onClick={() => actions.onClickProspect(prospect)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div className="prospect-data">
            <div className="prospect-data__top">
              <h3 className="fullname">{prospect?.prospect.fullname}</h3>
              <span
                className="probability-badge"
                certainty={prospect.certainty}
              >
                {prospect.certainty}% certeza
              </span>
            </div>

            <div className="prospect-data__center">
              <div className="product-info">
                <span className="product-label">Producto:</span>
                <span className="product-value">{prospect.product}</span>
              </div>
              <div className="amount-info">
                <span className="amount-label">Monto:</span>
                <span className="amount-value">
                  ${prospect.amount.toLocaleString()}
                </span>
              </div>
              <div className="last-tracking">
                Últ. seguimiento:{" "}
                <span>
                  {new Date(
                    prospect.lastTracking.createdAt
                  ).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* <div className="prospect-data__bottom">
              <div className="createdAt">
                <Schedule fontSize="small" />
                {new Date(prospect.createdAt).toLocaleDateString()}
              </div>
              <div className="contact-methods">
                <WhatsApp className="contact-icon whatsapp" />
                <Phone className="contact-icon phone" />
                <Email className="contact-icon email" />
              </div>
            </div> */}
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

            <Tooltip title="Ver historial" arrow>
              <History className="iconaction history" />
            </Tooltip>
            <Tooltip title="Agendar seguimiento" arrow>
              <Schedule className="iconaction schedule" />
            </Tooltip>
            <Tooltip title="Marcar como cerrada" arrow>
              <CheckCircle className="iconaction close-deal" />
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
import NewOportunity from "./components/NewOportunity";
import { Tooltip } from "@material-ui/core";

const DropContextStyled = styled.div`
  display: flex;
  /* border: 1px solid red; */
  justify-content: space-between;
`;

const ItemProspect = styled.div`
  position: relative;
  border-radius: 8px;
  padding: 15px;
  background-color: #fff;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #39b8df;
  transition: all 0.3s ease;

  .prospect-data {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    gap: 12px;

    &__top {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;

      .fullname {
        font-size: 16px;
        font-weight: 600;
        color: #2a2f3a;
        margin: 0;
      }

      .probability-badge {
        font-size: 12px;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 12px;
        background-color: ${(props) => {
          const certainty = props.certainty;
          if (certainty >= 75) return "#4caf5050";
          if (certainty >= 50) return "#ff980050";
          return "#f4433650";
        }};
        color: ${(props) => {
          const certainty = props.certainty;
          if (certainty >= 75) return "#2e7d32";
          if (certainty >= 50) return "#ff6d00";
          return "#d32f2f";
        }};
      }
    }

    &__center {
      display: flex;
      flex-direction: column;
      gap: 6px;

      .product-info,
      .amount-info {
        display: flex;
        gap: 8px;
        font-size: 13px;

        .product-label,
        .amount-label {
          color: #757575;
          font-weight: 500;
        }

        .product-value,
        .amount-value {
          color: #2a2f3a;
          font-weight: 600;
        }
      }

      .last-tracking {
        font-size: 12px;
        color: #757575;
        margin-top: 4px;

        span {
          font-weight: 600;
          color: #39b8df;
        }
      }
    }

    &__bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #9e9e9e;

      .createdAt {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 11px;

        svg {
          font-size: 14px;
        }
      }

      .contact-methods {
        display: flex;
        gap: 8px;

        .contact-icon {
          font-size: 18px;
          cursor: pointer;
          transition: all 0.2s ease;

          &.whatsapp:hover {
            color: #25d366;
          }
          &.phone:hover {
            color: #39b8df;
          }
          &.email:hover {
            color: #d32f2f;
          }
        }
      }
    }
  }

  .prospect-actions {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 12px;
    padding-left: 15px;
    border-left: 1px solid #eee;
    margin-left: 15px;

    .iconaction {
      color: #9e9e9e;
      font-size: 20px;
      cursor: pointer;
      transition: all 0.2s ease;

      &.history:hover {
        color: #7b1fa2;
      }
      &.schedule:hover {
        color: #39b8df;
      }
      &.close-deal:hover {
        color: #4caf50;
      }
    }
  }
`;

// const Tooltip = ({ title, children, className }) => (
//   <TooltipWrapper className={className}>
//     {children}
//     <TooltipText className="tooltip-text">{title}</TooltipText>
//   </TooltipWrapper>
// );

// const TooltipWrapper = styled.div`
//   position: relative;
//   display: inline-block;

//   &:hover .tooltip-text {
//     visibility: visible;
//     opacity: 1;
//   }
// `;

// const TooltipText = styled.span`
//   visibility: hidden;
//   width: max-content;
//   background-color: #2a2f3a;
//   color: #fff;
//   text-align: center;
//   border-radius: 4px;
//   padding: 4px 8px;
//   position: absolute;
//   z-index: 1;
//   bottom: 125%;
//   left: 50%;
//   transform: translateX(-50%);
//   opacity: 0;
//   transition: opacity 0.3s;
//   font-size: 12px;
//   font-weight: normal;

//   &::after {
//     content: "";
//     position: absolute;
//     top: 100%;
//     left: 50%;
//     margin-left: -5px;
//     border-width: 5px;
//     border-style: solid;
//     border-color: #2a2f3a transparent transparent transparent;
//   }
// `;

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
