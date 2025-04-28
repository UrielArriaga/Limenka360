import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Item from "./Item";
import styled from "styled-components";
export default function Column({ column, tasks, index, actions }) {
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
            <h3 style={{ textTransform: "capitalize" }}>
              {column.title} ({column.total})
            </h3>
          </div>
          <Droppable droppableId={column.id} type="item">
            {(provided) => (
              <ColumStyled
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: "#eee",
                  padding: 8,
                  minHeight: 80,
                  borderRadius: 4,
                  overflowX: "scroll",
                  height: 700,
                }}
              >
                {tasks.map((task, index) => (
                  <Item
                    key={task.id}
                    task={task}
                    index={index}
                    actions={actions}
                  />
                ))}
                {provided.placeholder}
              </ColumStyled>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

const ColumStyled = styled.div`
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #b3b5bd;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
`;
