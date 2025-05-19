import { useEffect, useState } from "react";
import ProspectsService from "../service";

const initialKanbanState = {
  columns: {},
  columnOrder: [],
  isFetching: false,
};

const initialTableState = {
  results: [],
  count: 0,
  isFetching: false,
};

const initialCalendarState = {
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

  const [data, setData] = useState(initialKanbanState);
  const [dataSet, setDataSet] = useState(initialTableState);
  const [dataCalendar, setDataCalendar] = useState(initialCalendarState);

  const [prospectSelected, setProspectSelected] = useState(null);

  console.log(viewType);
  const viewFetchers = {
    kanban: async () => {
      setData((prev) => ({ ...prev, isFetching: true }));
      try {
        const response = await service.getProspectsByPhases({});
        setData({
          columns: response.data?.columns,
          columnOrder: response.data?.columnsOrder,
          isFetching: false,
        });
      } catch (error) {
        console.error("Error fetching kanban:", error);
        setData((prev) => ({ ...prev, isFetching: false }));
      }
    },
    table: async () => {
      setDataSet((prev) => ({ ...prev, isFetching: true }));
      try {
        const response = await service.getProspects({});
        setDataSet({
          results: service.mapToNormalizeProspects(response.data?.results),
          count: response.data?.count,
          isFetching: false,
        });
      } catch (error) {
        console.error("Error fetching table:", error);
        setDataSet((prev) => ({ ...prev, isFetching: false }));
      }
    },
    calendar: async () => {
      console.log("im here");
      setDataCalendar((prev) => ({ ...prev, isFetching: true }));
      try {
        const response = await service.getProspectsPendings({});
        setDataCalendar({
          results: response.data?.results,
          // results: service.normalizeProspectsPendings(response.data?.results),
          count: response.data?.count,
          isFetching: false,
        });
      } catch (error) {
        console.error("Error fetching calendar:", error);
        setDataCalendar((prev) => ({ ...prev, isFetching: false }));
      }
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fn = viewFetchers[viewType];
        if (!fn) {
          console.error("Invalid view type:", viewType);
          return;
        }
        await fn();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [flagToRefetch, viewType]);

  const handleInfiniteScroll = async (phaseId) => {
    const column = data.columns[phaseId];
    if (!column || column.items.length >= column.total || column.isFetching)
      return;

    setData((prev) => ({ ...prev, isFetching: true }));

    try {
      const response = await service.getProspectsByPhase({
        phaseId,
        page: column.page + 1,
      });

      setData((prev) => ({
        ...prev,
        columns: {
          ...prev.columns,
          [phaseId]: {
            ...column,
            page: response.data?.page + 1,
            total: response.data?.total,
            items: [
              ...column.items,
              ...service.mapToNormalizeProspects(response.data?.results),
            ],
          },
        },
        isFetching: false,
      }));
    } catch (error) {
      console.error("Error on scroll:", error);
      setData((prev) => ({ ...prev, isFetching: false }));
    }
  };

  const handleRefetch = () => setFlagToRefetch((prev) => !prev);

  const handleToggleModal = (modalName) => {
    setModalViews((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const reorderColumns = (source, destination, draggableId) => {
    const newOrder = Array.from(data.columnOrder);
    newOrder.splice(source.index, 1);
    newOrder.splice(destination.index, 0, draggableId);
    setData((prev) => ({ ...prev, columnOrder: newOrder }));
  };

  const reorderItemsWithinColumn = (columnId, sourceIndex, destIndex) => {
    const items = Array.from(data.columns[columnId].items);
    const [moved] = items.splice(sourceIndex, 1);
    items.splice(destIndex, 0, moved);

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [columnId]: { ...prev.columns[columnId], items },
      },
    }));
  };

  const moveItemBetweenColumns = (source, destination) => {
    const startItems = Array.from(data.columns[source.droppableId].items);
    const [moved] = startItems.splice(source.index, 1);
    const endItems = Array.from(data.columns[destination.droppableId].items);
    endItems.splice(destination.index, 0, moved);

    setData((prev) => ({
      ...prev,
      columns: {
        ...prev.columns,
        [source.droppableId]: {
          ...prev.columns[source.droppableId],
          items: startItems,
        },
        [destination.droppableId]: {
          ...prev.columns[destination.droppableId],
          items: endItems,
        },
      },
    }));
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) return;

    if (type === "column") {
      return reorderColumns(source, destination, draggableId);
    }

    if (type === "item") {
      if (source.droppableId === destination.droppableId) {
        return reorderItemsWithinColumn(
          source.droppableId,
          source.index,
          destination.index
        );
      } else {
        handleToggleModal("modalPhase");
        return moveItemBetweenColumns(source, destination);
      }
    }
  };

  const onDragStart = (result) => {};

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

  return {
    prospectSelected,
    data,
    dataSet,
    dataCalendar,
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
    tableData: {
      heads: [
        {
          headText: "Fecha de Creacion",
          headNormalize: "createdAt",
          orderby: "-createdAt",
        },
        {
          headText: "Nombre del prospecto",
          headNormalize: "fullname",
          orderby: "-createdAt",
        },
        { headText: "Correo", headNormalize: "email", orderby: "-createdAt" },
        {
          headText: "Telefono",
          headNormalize: "phone",
          orderby: "-createdAt",
        },
        {
          headText: "Fase",
          headNormalize: "phase",
          orderby: "-createdAt",
        },
        {
          headText: "Producto de interes",
          headNormalize: "product",
          orderby: "-createdAt",
        },
        {
          headText: "ultimo seguimiento",
          headNormalize: "lastTrackingcreatedAt",
          orderby: "-createdAt",
        },
        {
          headText: "Proximo pendiente",
          headNormalize: "nextpendingat",
          orderby: "-createdAt",
        },
      ],
    },
  };
}
