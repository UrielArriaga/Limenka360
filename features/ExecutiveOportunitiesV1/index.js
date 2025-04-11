import React, { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import ModalPreview from "../ExecutiveProspects/components/ModalPreview";
import FilterProspects from "./components/FilterProspects";
import Kanban from "./components/Kanban";
import LimiBotChatIA from "./components/LimiBotChatIA";
import NewOportunity from "./components/NewOportunity";
import useMain from "./hooks/useMain";
import { ExecutiveProspectsStyled } from "./styled";
import ProspectCalendar from "./components/CalendarOportunities";

export default function ExecutiveOportunitiesV1() {
  const { data, onDragEnd } = useMain();

  const [prospectSelected, setProspectSelected] = useState(null);
  const [openPreview, setopenPreview] = useState(false);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);
  const [openNewOportunity, setOpenNewOportunity1] = useState(false);
  const [showArea, setShowArea] = useState(false);

  const onClickProspect = (item) => {
    setProspectSelected(item);
    setopenPreview(!openPreview);
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

      <ProspectCalendar
        actions={{
          onClickProspect,
          toogleLimiBotChat,
        }}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <DropContextStyled>
          <Kanban
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

const DropContextStyled = styled.div`
  display: flex;

  justify-content: space-between;
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
