import React, { useEffect, useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";

import styled from "styled-components";
import Item from "./Item";

export default function Column({
  column,
  tasks = [],
  index,
  actions,
  handleFecthMore,
}) {
  const lastItemRef = useRef(null);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const observerRootElement = scrollContainerRef.current;
    const lastItemElement = lastItemRef.current;

    if (
      !observerRootElement ||
      !lastItemElement ||
      tasks.length === 0 ||
      tasks.length < 5
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("🌟 Hello world - reached the end!", column.id);
          handleFecthMore(column.id);
        }
      },
      {
        root: observerRootElement,
        rootMargin: "0px",
        threshold: 0.5,
      }
    );

    observer.observe(lastItemElement);

    return () => {
      observer.unobserve(lastItemElement);
    };
  }, [tasks, column.id]);

  return (
    <Draggable draggableId={column.id} index={index}>
      {(providedDraggable) => (
        <div
          ref={providedDraggable.innerRef}
          {...providedDraggable.draggableProps}
          style={{
            ...providedDraggable.draggableProps.style,
            margin: "0 8px",
            width: 360,
            display: "flex",
            flexDirection: "column",
            height: "100%",
          }}
        >
          {/* Column Header */}
          <div
            {...providedDraggable.dragHandleProps}
            style={{
              marginBottom: 10,
              flexShrink: 0,
            }}
          >
            <h3 style={{ textTransform: "capitalize", margin: 0 }}>
              {column.title} ({column.total}){/* {column.id} */}
              {/* <pre>{JSON.stringify(column, null, 2)}</pre> */}
              {/* Use tasks.length here, show 0 if no tasks */}
            </h3>
          </div>

          {/* Droppable Area (Scrollable List) */}
          <Droppable droppableId={column.id} type="item">
            {(providedDroppable) => (
              <ColumStyled
                ref={(node) => {
                  providedDroppable.innerRef(node);
                  scrollContainerRef.current = node;
                }}
                {...providedDroppable.droppableProps}
              >
                {tasks.map((task, idx) => {
                  const isLast = idx === tasks.length - 1;
                  return (
                    <Item
                      key={task.id}
                      task={task}
                      index={idx}
                      actions={actions}
                      ref={isLast ? lastItemRef : null}
                    />
                  );
                })}

                {column.isFetching && (
                  <Loader>
                    <div className="spinner"></div>
                  </Loader>
                )}
                {providedDroppable.placeholder}
              </ColumStyled>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

const ColumStyled = styled.div`
  background: #eee;
  padding: 8px;
  min-height: 80px;
  border-radius: 4px;
  overflow-y: scroll;
  height: 800px;
  flex-grow: 1;

  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #b3b5bd;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  .loader {
  }
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  /* margin-bottom: 100px; */
  position: absolute;
  bottom: 0;
  width: 360px;
  /* background-color: rgba(52, 152, 219, 0.1); */
  /* width: 100%; */

  .spinner {
    width: 24px;
    height: 24px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

// Replace the loader div in the JSX with the new Loader component
