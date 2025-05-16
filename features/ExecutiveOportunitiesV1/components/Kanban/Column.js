import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Item from "./Item";
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
              {column.name}({column.total})
            </h3>
          </div>
          <Droppable droppableId={column.id} type="item">
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
                  <Item
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
