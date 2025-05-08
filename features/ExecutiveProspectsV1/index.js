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
import TableProspects from "./components/TableProspects";
import ModalMovePhase from "./components/ModalMovePhase";

const DropContextStyled = styled.div`
  display: flex;
  justify-content: space-between;

  .kanban {
  }

  .convertarea {
    top: 10%;
    right: 0;
    width: 10%;
    z-index: 10;
    height: 100vh;
  }
`;

export default function ExecutivesProspectsV1() {
  const [viewType, setViewType] = useState("kanban");
  const {
    actionsItem,
    data,
    dataSet,
    modalActions,
    handleRefetch,
    handleInfiniteScroll,
    onDragEnd,
    onDragStart,
  } = useMain(viewType);

  const [prospectSelected, setProspectSelected] = useState(null);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);

  const onClickProspect = (item) => {
    setProspectSelected(item);
    modalActions.handleToggleModal("preview");
  };

  const onClickNewOportunity = () => {
    modalActions.handleToggleModal("newOportunity");
  };

  const toogleLimiBotChat = (item) => {
    setProspectSelected(item);
    setOpenLimiBotChat(!openLimiBotChat);
  };

  return (
    <ExecutiveProspectsStyled>
      <FilterProspects
        viewType={viewType}
        setViewType={setViewType}
        handleRefetch={handleRefetch}
      />
      {/* 
      <button
        onClick={() => {
          console.log(data);
        }}
      >
        click me
      </button> */}

      {/* <pre>{JSON.stringify(dataSet, null, 2)}</pre> */}
      {viewType === "table" && (
        <TableProspects
          data={dataSet.results}
          heads={[
            {
              headText: "Fecha de Creacion",
              headNormalize: "createdAt",
              orderby: "-createdAt",
            },
            {
              headText: "Nombre del prospecto",
              headNormalize: "fullname",
              orderby: "-createdAt",
            },
            {
              headText: "Correo",
              headNormalize: "email",
              orderby: "-createdAt",
            },
            {
              headText: "Telefono",
              headNormalize: "phone",
              orderby: "-createdAt",
            },
            {
              headText: "Fase",
              headNormalize: "createdAt",
              orderby: "-createdAt",
            },
            {
              headText: "Producto de interes",
              headNormalize: "createdAt",
              orderby: "-createdAt",
            },
            {
              headText: "Proximo pendiente",
              headNormalize: "createdAt",
              orderby: "-createdAt",
            },
            {
              headText: "ultimo seguimiento",
              headNormalize: "createdAt",
              orderby: "-createdAt",
            },
          ]}
        />
      )}

      {viewType === "kanban" && (
        <div className="scrollsection">
          <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
            <DropContextStyled>
              <div className="kanban">
                <Kanban
                  data={data}
                  handleFecthMore={handleInfiniteScroll}
                  actions={actionsItem}
                />
              </div>
            </DropContextStyled>
          </DragDropContext>
        </div>
      )}
      <ModalPreview
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={modalActions.modalViews.preview}
        toggleModal={() => modalActions.handleToggleModal("preview")}
      />
      <LimiBotChatIA
        trackings={[]}
        pendingsData={[]}
        prospectSelected={prospectSelected}
        open={openLimiBotChat}
        toggleModal={toogleLimiBotChat}
      />
      <NewOportunity
        open={modalActions.modalViews.newOportunity}
        toggleModal={() => modalActions.handleToggleModal("newOportunity")}
      />
      <ModalMovePhase
        open={modalActions.modalViews.modalPhase}
        toggleModal={() => modalActions.handleToggleModal("modalPhase")}
      />
    </ExecutiveProspectsStyled>
  );
}

function ConvertArea() {
  return (
    <Droppable droppableId="convert-zone" type="item">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{
            height: "80vh",
            padding: 16,
            borderRadius: 8,
            background: snapshot.isDraggingOver ? "#d1e7dd" : "#f8f9fa",
            border: "2px dashed #6c757d",
            transition: "0.3s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              fontWeight: 600,
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            Convertir a oportunidad
          </p>
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
