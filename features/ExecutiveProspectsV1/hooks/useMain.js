import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import ProspectsService from "../service";
import { is } from "date-fns/locale";

const initialState = {
  columns: {},
  columnOrder: [],
  isFetching: false,
};

const initialDataSet = {
  results: [],
  count: 0,
  isFetching: false,
};

export default function useMain(viewType) {
  const service = new ProspectsService();
  const [flagToRefetch, setFlagToRefetch] = useState(false);

  const [modalViews, setModalViews] = useState({
    preview: false,
    limiBotChat: false,
    newOportunity: false,
    movePhase: false,
  });

  const handleToggleModal = (modalName) => {
    setModalViews((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const [data, setData] = useState(initialState);

  const [dataSet, setDataSet] = useState(initialDataSet);

  const [oportunityData, setOportunityData] = useState(null);

  // * Prospecto Data
  const [prospectSelected, setProspectSelected] = useState(null);

  //* PRospecto

  // * EFFECTO PRINICIPAL QUE TRAE LOS PROSPECTOS

  useEffect(() => {
    if (viewType === "kanban") {
      fetchDataByPhases();
    }
    if (viewType === "table") {
      fetchDataByTable();
    }
  }, [flagToRefetch, viewType]);

  // *¨PETICIONES PARA TIPOS DE VISTA

  const fetchDataByPhases = async () => {
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

  const fetchDataByTable = async () => {
    setDataSet((prev) => ({ ...prev, isFetching: true }));
    try {
      const response = await service.getProspects({});

      setDataSet((prev) => ({
        ...prev,
        results: service.mapToNormalizeProspects(response.data?.results),
        count: response.data?.count,
        isFetching: false,
      }));

      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData((prev) => ({ ...prev, isFetching: false }));
    }
  };

  const handleInfiniteScroll = async (phaseId) => {
    let column = data.columns[phaseId];

    console.log(column);
    if (column.items.length >= column.total || column.isFetching) return;

    setData((prev) => ({ ...prev, isFetching: true }));
    try {
      const response = await service.getProspectsByPhase({
        phaseId,
        page: column.page + 1,
      });

      let newData = {
        ...data,
        columns: {
          ...data.columns,
          [phaseId]: {
            ...data.columns[phaseId],
            page: response.data?.page + 1,
            total: response.data?.total,
            items: [
              ...data.columns[phaseId].items,
              ...service.mapToNormalizeProspects(response.data?.results),
            ],
          },
        },
      };

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [phaseId]: {
            ...prev.columns[phaseId],
            page: column.page + 1,
            items: [
              ...prev.columns[phaseId].items,
              ...service.mapToNormalizeProspects(response.data?.results),
            ],
          },
        },
        isFetching: false,
      }));

      console.log(newData);

      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData((prev) => ({ ...prev, isFetching: false }));
    }
  };

  const handleRefetch = () => setFlagToRefetch((prev) => !prev);

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
      if (startColumnId === "convert-zone") {
        handleToggleModal("newOportunity");
        // setShowDragAreaOportunity(false);
      }

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
        console.log("move between columns");
        handleToggleModal("modalPhase");

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
        return;
      }
    }

    if (destination.droppableId === "convert-zone") {
      console.log("object");
    }
    // setShowDragAreaOportunity(false);
  };

  const onDragStart = (result) => {
    const { source } = result;
    const { droppableId } = source;

    // setShowDragAreaOportunity(true);
  };

  const handleOnClickProspects = (item) => {
    setProspectSelected(item);
    handleToggleModal("preview");
  };
  const handleOnClickNewOportunity = () => {
    handleToggleModal("newOportunity");
  };
  const handleOnClickLimiBotChat = (item) => {
    setProspectSelected(item);
    handleToggleModal("limiBotChat");
  };

  const handleNewTracking = async (data) => {};

  return {
    data,
    dataSet,
    onDragEnd,
    onDragStart,
    handleRefetch,
    handleInfiniteScroll,
    modalActions: {
      modalViews,
      handleToggleModal,
    },
    actionsItem: {
      handleOnClickProspects,
      handleOnClickNewOportunity,
      handleOnClickLimiBotChat,
    },
  };
}
