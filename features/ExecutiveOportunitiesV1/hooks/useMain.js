import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";

class OportunitiesService {
  async getOportunitiesByPhase({}) {
    let params = {
      limit: 5,
      order: "-createdAt",
      subquery: 1,
      where: { iscloseout: false },
    };
    return await api.get("prospects/oportunitiesbyphases", {
      params,
    });
  }
}

export default function useMain() {
  const service = new OportunitiesService();

  const [data, setData] = useState({
    columns: {},
    columnOrder: [],
    isFetching: false,
  });

  const [oportunityData, setOportunityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isFetching: true }));
      try {
        const response = await service.getOportunitiesByPhase({});

        setData((prev) => ({
          ...prev,
          columns: response.data?.columns,
          columnOrder: response.data?.columnsOrder,
          isFetching: false,
        }));

        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setData((prev) => ({ ...prev, isFetching: false }));
      }
    };

    fetchData();
  }, []);

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;

    console.log(result);

    if (!destination) return;
    const startColumnId = source.droppableId; // Columna original
    const endColumnId = destination.droppableId; // Columna destino

    console.log("Drag Result:");
    console.log(`  Draggable ID: ${result.draggableId}`);
    console.log(`  Source:`);
    console.log(`    Droppable ID: ${source.droppableId}`);
    console.log(`    Index: ${source.index}`);
    if (destination) {
      console.log(`  Destination:`);
      console.log(`    Droppable ID: ${destination.droppableId}`);
      console.log(`    Index: ${destination.index}`);
    } else {
      console.log("  Destination: None");
    }

    if (type === "column") {
      const newColumnOrder = Array.from(data.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      setData((prev) => ({
        ...prev,
        columnOrder: newColumnOrder,
      }));
    }

    if (type === "item") {
      // Si el ítem se mueve dentro de la misma columna
      if (startColumnId === endColumnId) {
        const newColumnItems = Array.from(data.columns[startColumnId].items);
        const [movedItem] = newColumnItems.splice(source.index, 1); // Eliminar ítem de la columna original
        newColumnItems.splice(destination.index, 0, movedItem); // Insertar ítem en la nueva posición

        const updatedColumns = {
          ...data.columns,
          [startColumnId]: {
            ...data.columns[startColumnId],
            items: newColumnItems, // Actualizar los ítems de la columna
          },
        };

        setData((prev) => ({
          ...prev,
          columns: updatedColumns,
        }));
      } else {
        // Si el ítem se mueve entre columnas
        const startColumnItems = Array.from(data.columns[startColumnId].items);
        const [movedItem] = startColumnItems.splice(source.index, 1); // Eliminar ítem de la columna de origen

        const endColumnItems = Array.from(data.columns[endColumnId].items);
        endColumnItems.splice(destination.index, 0, movedItem); // Insertar ítem en la columna de destino

        const updatedColumns = {
          ...data.columns,
          [startColumnId]: {
            ...data.columns[startColumnId],
            items: startColumnItems, // Actualizar los ítems de la columna de origen
          },
          [endColumnId]: {
            ...data.columns[endColumnId],
            items: endColumnItems, // Actualizar los ítems de la columna de destino
          },
        };

        setData((prev) => ({
          ...prev,
          columns: updatedColumns,
        }));
      }
    }
    // TYPE item
  };

  return {
    data,
    onDragEnd,
  };
}
