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

const DropContextStyled = styled.div`
  display: flex;
  justify-content: space-between;

  .kanban {
  }

  .convertarea {
    /* position: absolute; */
    top: 10%;
    right: 0;
    width: 10%;
    z-index: 10;
    height: 100vh;
  }
`;

export default function ExecutivesProspectsV1() {
  const { data, showDragAreaOportunity, onDragEnd, onDragStart, modalActions } =
    useMain();
  const [prospectSelected, setProspectSelected] = useState(null);
  const [openPreview, setopenPreview] = useState(false);
  const [openLimiBotChat, setOpenLimiBotChat] = useState(false);
  const [openNewOportunity, setOpenNewOportunity1] = useState(false);
  const [showArea, setShowArea] = useState(false);

  const onClickProspect = (item) => {
    setProspectSelected(item);
    modalActions.handleToggleModal("preview");
  };

  const onClickNewOportunity = () => {
    modalActions.handleToggleModal("newOportunity");
  };

  const onClickOpenPreview = (item) => {
    setProspectSelected(item);
    modalActions.handleToggleModal("preview");
  };

  const toogleModalPreview = () => {
    setopenPreview(!openPreview);
  };

  const toogleLimiBotChat = (item) => {
    setProspectSelected(item);
    setOpenLimiBotChat(!openLimiBotChat);
  };

  const datos = [
    { id: 1, name: "Juan", email: "juan@mail.com", phone: "123456789" },
    { id: 2, name: "María", email: "maria@mail.com", phone: "987654321" },
    { id: 3, name: "Carlos", email: "carlos@mail.com", phone: "555123456" },
  ];

  const [columns, setColumns] = useState([
    { field: "name", headerName: "Nombre" },
    { field: "email", headerName: "Correo" },
    { field: "phone", headerName: "Teléfono" },
  ]);

  const handleEdit = (row) => {
    console.log("Editar fila:", row);
  };

  const handleDelete = (row) => {
    console.log("Eliminar fila:", row);
  };

  const [viewType, setViewType] = useState("kanban");

  return (
    <ExecutiveProspectsStyled>
      <FilterProspects viewType={viewType} setViewType={setViewType} />

      {/* <TableProspects
        data={datos}
        columns={columns}
        setColumns={setColumns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      /> */}

      <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
        <DropContextStyled>
          <div className="kanban">
            <Kanban
              data={data}
              actions={{
                onClickProspect,
                toogleLimiBotChat,
                onClickNewOportunity,
              }}
            />
          </div>
          {/* 
          <Droppable droppableId="convert-zone" type="item">
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{ height: 200, background: "lightblue", marginLeft: 20 }}
              >
                Drop here
                {provided.placeholder}
              </div>
            )}
          </Droppable> */}
          {/* <div className="convertarea">
            {showDragAreaOportunity && <ConvertArea />}
          </div> */}
        </DropContextStyled>
      </DragDropContext>

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
