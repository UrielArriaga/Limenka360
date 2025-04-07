import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = {
  columns: {
    // Columns is a object
    column1: {
      id: "column1",
      title: "Prospecto nuevo",
      taskIds: ["task1", "task2"],
    },
    column2: {
      id: "column2",
      title: "Contactado",
      taskIds: ["task3"],
    },
    column3: {
      id: "column3",
      title: "No Contactado",
      taskIds: ["task3"],
    },
  },
  tasks: {
    task1: { id: "task1", content: "Llamar a cliente" },
    task2: { id: "task2", content: "Enviar cotización" },
    task3: { id: "task3", content: "Agendar demo" },
  },
  columnOrder: ["column1", "column2", "column3"],
};

export default function ExecutivesProspectsV1() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) return;

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData({ ...data, columnOrder: newColumnOrder });
      return;
    }

    const start = data.columns[source.droppableId];
    const finish = data.columns[destination.droppableId];

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
  };

  return (
    <div
      style={{
        backgroundImage:
          "url ('https://b24-5laalz.bitrix24.mx/bitrix/templates/bitrix24/themes/light/foggy-horizon/foggy-horizon.jpg')",
      }}
    >
      <p>Prospectos</p>
      <DragDropContext onDragEnd={onDragEnd}>
        <ColumnList data={data} />
      </DragDropContext>
    </div>
  );
}

function ColumnList({ data }) {
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
              />
            );
          })}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}

function Column({ column, tasks, index }) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          style={{
            ...provided.draggableProps.style,
            margin: "0 8px",
            width: 250,
          }}
        >
          <div {...provided.dragHandleProps}>
            <h3>{column.title}</h3>
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
                  <Task key={task.id} task={task} index={index} />
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

function Task({ task, index }) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
            marginBottom: 8,
            padding: 8,
            background: "white",
            borderRadius: 4,
            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
          }}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
}

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
