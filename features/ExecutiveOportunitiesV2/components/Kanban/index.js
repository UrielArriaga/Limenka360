import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Column from "./Column";

export default function Kanban({ data, actions }) {
  return (
    <Droppable droppableId="all-columns" direction="horizontal" type="column">
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          style={{ display: "flex", gap: "1rem" }}
        >
          {data?.columnOrder?.map((columnId, index) => {
            const column = data.columns[columnId];

            return (
              <Column
                key={column.id}
                column={column}
                tasks={column.items}
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
