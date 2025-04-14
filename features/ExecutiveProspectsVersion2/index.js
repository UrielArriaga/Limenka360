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
import { motion } from "framer-motion";
import { IconButton } from "@material-ui/core";
import { Add } from "@material-ui/icons";

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

export default function ExecutiveProspectsVersion2() {
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
      <ExcelTabs />
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

const ExcelTabs = () => {
  const [tabs, setTabs] = useState([
    { id: 1, name: "Prospectos", editing: false },
    { id: 2, name: "Prospectos doctores", editing: false },
    {
      id: 3,
      name: "Prospectos con especialidad Anestesiología ",
      editing: false,
    },
    {
      id: 4,
      name: "Prospectos sin seguimiento",
      editing: false,
    },
  ]);
  const [activeTabId, setActiveTabId] = useState(1);

  const handleTabClick = (id) => {
    setActiveTabId(id);
  };

  const startEditing = (id) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, editing: true } : tab))
    );
  };

  const handleNameChange = (id, newName) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, name: newName } : tab))
    );
  };

  const finishEditing = (id) => {
    setTabs((prev) =>
      prev.map((tab) => (tab.id === id ? { ...tab, editing: false } : tab))
    );
  };

  const handleAddTab = () => {
    const newTabId = tabs.length + 1;
    setTabs((prev) => [
      ...prev,
      { id: newTabId, name: `Prospectos ${newTabId}`, editing: false },
    ]);
    setActiveTabId(newTabId);
  };

  return (
    <TabsWrapper>
      {tabs.map((tab) => (
        <Tab
          as={motion.div}
          layout
          key={tab.id}
          active={tab.id === activeTabId}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.editing ? (
            <TabInput
              autoFocus
              value={tab.name}
              onChange={(e) => handleNameChange(tab.id, e.target.value)}
              onBlur={() => finishEditing(tab.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter") finishEditing(tab.id);
              }}
            />
          ) : (
            <>
              <span>{tab.name}</span>
              <IconButton
                style={{ padding: 0, marginLeft: "auto" }}
                onClick={(e) => {
                  e.stopPropagation();
                  startEditing(tab.id);
                }}
              >
                <Add size={14} />
              </IconButton>
            </>
          )}
        </Tab>
      ))}

      <Tab as={motion.div} layout>
        <span>{""}</span>
        <IconButton
          style={{ padding: 0, marginLeft: "auto" }}
          onClick={(e) => {
            e.stopPropagation();
            handleAddTab();
          }}
        >
          <Add size={14} />
        </IconButton>
      </Tab>
    </TabsWrapper>
  );
};

const TabsWrapper = styled.div`
  display: flex;
  gap: 6px;
  padding: 10px;
  background: #e3e7ed;
  margin-bottom: 20px;
  overflow: auto;
`;

const Tab = styled.div`
  padding: 6px 12px;
  background: ${({ active }) => (active ? "#ffffff" : "#d0d4da")};
  border-radius: 6px 6px 0 0;
  box-shadow: ${({ active }) =>
    active ? "0 -2px 5px rgba(0,0,0,0.1)" : "none"};
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #333;

  &:hover {
    background: #f3f4f6;
  }
`;

const TabInput = styled.input`
  font-size: 13px;
  padding: 4px 6px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
`;

const EditIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #888;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;
