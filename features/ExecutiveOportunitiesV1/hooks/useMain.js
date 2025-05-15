import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import dayjs from "dayjs";

class OportunitiesService {
  async getOportunities({ page = 1, limit = 20 }) {
    const params = {
      limit: limit,
      skip: page,
      order: "-createdAt",
      attributes: {
        prospect: [
          "id",
          "email",
          "phone",
          "viewed",
          "totalTrackings",
          "nextpendingat",
          "fullname",
          "ejecutiveId",
        ],
        productsoportunities: ["newprice"],
        "productsoportunities.product": ["name"],
        "productsoportunities.product.category": ["name"],
      },
      count: 1,
      where: {},
      include: "prospect,prospect.clienttype,phase",
      keys: "id,amount,certainty,concept,estimatedclossing,quoteurl,observations,nextpendingat",
      join: "prospect,prospect.clienttype",
    };

    return await api.get("playground/oportunities", {
      params,
    });
  }

  async getOportunitiesByPhase({}) {
    let params = {
      limit: 5,
      order: "-createdAt",
      subquery: 1,
      where: { iscloseout: false, discarted: false },
      keys: "amount,concept,createdAt,nextpendingat,certainty,lastTracking,lastTrackingcreatedAt",
      includekeys: {
        prospect: ["fullname", "email", "phone"],
        "prospect.clienttype": ["name"],
        additionaldataoportunity: ["oportunityrouteId"],
      },
      include: "prospect,prospect.clienttype,additionaldataoportunity",
    };
    return await api.get("playground/oportunities/kanban", {
      params,
    });
  }
  async getPendings() {
    const params = {
      order: "-date_from",
      include: "pendingstype",
    };

    return await api.get("pendings", { params });
  }

  async getOportunitiesByPendings({}) {
    let params = {
      limit: 5,
      order: "-createdAt",
      where: {},
      include:
        "pendingstype,oportunity,oportunity.prospect,oportunity.prospect.entity",
      join: "pendingstype,oportunity,oportunity.prospect,oportunity.prospect.entity",
      attributes: [
        {
          "oportunity.prospect": ["name", "fullname"],
          "oportunity.prospect.entity": ["name"],
          oportunity: ["id", "quantity", "amount"],
          pendingstype: ["name"],
        },
      ],
      keys: "date_from,date_to,priority,status",
    };
    return await api.get("playground/pendingsasoportunities", {
      params,
    });
  }
}

export default function useMain({ viewType = "kanban" }) {
  const service = new OportunitiesService();
  const [modalViews, setModalViews] = useState({
    preview: false,
    limiBotChat: false,
    newOportunity: false,
  });
  const [page, setPage] = useState(1);
  const limit = 20;
  const [events, setEvents] = useState([]);

  const handleToggleModal = (modalName) => {
    setModalViews((prev) => ({
      ...prev,
      [modalName]: !prev[modalName],
    }));
  };

  const [data, setData] = useState({
    columns: {},
    columnOrder: [],
    isFetching: false,
  });

  const [oportunitiesData, setOportunitiesData] = useState({
    results: [],
    count: 0,
    isFetching: false,
  });

  const [oportunityData, setOportunityData] = useState(null);
  useEffect(() => {
    const fetchPendingsForCalendar = async () => {
      try {
        const response = await service.getPendings({});
        console.log("Respuesta completa de la API:", response);
        const pendings = response.data?.results || [];

        if (Array.isArray(pendings)) {
          const formattedEvents = pendings.map((pending) => {
            return {
              title: pending.subject,
              pendingstype: pending?.pendingstype,
              start: new Date(pending.date_from),
              end: pending.date_to
                ? new Date(pending.date_to)
                : new Date(pending.date_from),
            };
          });
          setEvents(formattedEvents);
        } else {
          console.error(
            'La respuesta no contiene un array en "results":',
            pendings
          );
        }
      } catch (error) {
        console.error("Error fetching pendings for calendar:", error);
      }
    };

    fetchPendingsForCalendar();
  }, []);

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

    const fetchDataByPendings = async () => {
      setData((prev) => ({ ...prev, isFetching: true }));
      try {
        const response = await service.getOportunitiesByPendings({});

        set;
        console.log("Oportunity Data:", response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchOportunities = async () => {
      try {
        const reponse = await service.getOportunities({ page, limit });
        setOportunitiesData((prev) => ({
          ...prev,
          results: reponse.data?.results?.map((item, index) => {
            return {
              fullname: item?.prospect?.fullname,
              fase: item?.phase?.name,
              email: item?.prospect?.email,
              phone: item?.prospect?.phone,
              folio: item?.concept,
              monto: item?.amount,
              vencimiento: dayjs(item?.estimatedclossing).format("YYYY-MM-DD"),
              ultimocontacto: item?.lasttracking,
              siguientecontato: item?.nextpendingat,
            };
          }),
          count: reponse.data?.count,
          isFetching: false,
        }));
      } catch (error) {}
    };

    console.log(viewType);
    if (viewType === "table") {
      fetchOportunities();
    }

    if (viewType === "kanban") {
      fetchData();
    }
  }, [viewType, page]);

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
    // TYPE item
  };

  return {
    data,
    oportunitiesData,
    onDragEnd,
    page,
    setPage,
    limit,
    events,
    modalActions: {
      modalViews,
      handleToggleModal,
    },
  };
}
