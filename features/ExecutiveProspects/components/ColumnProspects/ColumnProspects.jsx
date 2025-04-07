import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { ColumnProspectsStyled } from "./ColumnProspects.styles";
import { FiberManualRecord } from "@material-ui/icons";
import ProspectItem from "../ProspectItem/ProspectItem";

export default function ColumnProspects({ columnId, column, index, handleScrollColumn, handleClickProspect }) {
  return (
    <ColumnProspectsStyled
      // style={{
      //   display: "flex",
      //   flexDirection: "column",
      //   alignItems: "center",
      // }}
      key={columnId}
    >
      <div className="title">
        <h1>{column.name}</h1>
        <div className="counter">
          <FiberManualRecord />
          <p>({column?.total || 0})</p>
        </div>
      </div>
      {/* <h2>
        {column.name}
        <span style={{ fontSize: 10 }}>{column.total}</span>
      </h2> */}
      <div style={{ margin: 8 }}>
        <Droppable droppableId={columnId} key={columnId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                onScroll={e => handleScrollColumn(e, column)}
                className="containerscroll"
                style={{
                  overflowY: "auto",
                  height: 500,
                  width: 300,
                }}
                // style={{
                //   background: snapshot.isDraggingOver ? "lightblue" : column.color,
                //   padding: 4,
                //   width: 250,
                //   height: 500,
                //   overflowY: "auto",
                //   border: "2px dashed #ccc",
                //   borderRadius: "4px",
                // }}
              >
                {column?.items?.map((item, index) => {
                  return (
                    <ProspectItem handleClickProspect={handleClickProspect} key={item.id} item={item} index={index} />
                  );
                })}

                {column.isFetching && (
                  <div>
                    <p>Cargando...</p>
                  </div>
                )}

                {column.total > column.items.length && (
                  <div>
                    <p>Cargar Mas</p>
                  </div>
                )}

                {provided.placeholder}
              </div>
            );
          }}
        </Droppable>
        {/* <Column
        handleScroll={handleScrollColumn}
        handleClickProspect={handleClickProspect}
        droppableId={columnId}
        key={columnId}
        index={index}
        column={column}
      /> */}
      </div>
    </ColumnProspectsStyled>
  );
}
