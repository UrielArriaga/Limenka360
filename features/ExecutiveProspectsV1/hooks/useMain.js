import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";

class OportunitiesService {
  async getProspectsByPhases({}) {
    let params = {
      limit: 5,
      order: "-createdAt",
      subquery: 1,
      include: "category,clienttype",
      join: "catego,clienttype",
      where: {
        isclient: false,
        isoportunity: false,
        discarted: false,
        ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
      },
    };
    return await api.get("prospects/byphases", {
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

  const [showDragAreaOportunity, setShowDragAreaOportunity] = useState(false);

  const [oportunityData, setOportunityData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setData((prev) => ({ ...prev, isFetching: true }));
      try {
        const response = await service.getProspectsByPhases({});

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
    const startColumnId = source.droppableId;
    const endColumnId = destination.droppableId;

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
      if (startColumnId === endColumnId) {
        const newColumnItems = Array.from(data.columns[startColumnId].items);
        const [movedItem] = newColumnItems.splice(source.index, 1);
        newColumnItems.splice(destination.index, 0, movedItem);

        const updatedColumns = {
          ...data.columns,
          [startColumnId]: {
            ...data.columns[startColumnId],
            items: newColumnItems,
          },
        };

        setData((prev) => ({
          ...prev,
          columns: updatedColumns,
        }));
      } else {
        const startColumnItems = Array.from(data.columns[startColumnId].items);
        const [movedItem] = startColumnItems.splice(source.index, 1);

        const endColumnItems = Array.from(data.columns[endColumnId].items);
        endColumnItems.splice(destination.index, 0, movedItem);

        const updatedColumns = {
          ...data.columns,
          [startColumnId]: {
            ...data.columns[startColumnId],
            items: startColumnItems,
          },
          [endColumnId]: {
            ...data.columns[endColumnId],
            items: endColumnItems,
          },
        };

        setData((prev) => ({
          ...prev,
          columns: updatedColumns,
        }));
      }
    }

    if (destination.droppableId === "convert-zone") {
      console.log("object");
    }
    setShowDragAreaOportunity(false);
  };

  const onDragStart = (result) => {
    const { source } = result;
    const { droppableId } = source;

    setShowDragAreaOportunity(true);
  };

  return {
    data,
    showDragAreaOportunity,
    onDragEnd,
    onDragStart,
  };
}
