import React, { useEffect, useState } from "react";
import { api } from "../../../services/api";
import dayjs from "dayjs";

class OportunitiesService {
  async getOportunities({}) {
    const params = {
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
      include: "prospect,prospect.clienttype",
      keys: "id,amount,certainty,concept,estimatedclossing,quoteurl,observations,nextpendingat",
      join: "prospect,prospect.clienttyp",
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
      where: { iscloseout: false },
    };
    return await api.get("prospects/oportunitiesbyphases", {
      params,
    });
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
        const reponse = await service.getOportunities({});
        setOportunitiesData((prev) => ({
          ...prev,
          results: reponse.data?.results?.map((item, index) => {
            return {
              fullname: item?.prospect?.fullname,
              email: item?.prospect?.email,
              folio: item?.concept,
              monto: item?.amount,
              vencimiento: dayjs(item?.estimatedclossing).format("YYYY-MM-DD"),
              ultimocontacto: item?.lasttracking,
              siguientecontato: item?.nextpendingat,
            };
          }),
          count: reponse.count,
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
  }, [viewType]);

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
    oportunitiesData,
    onDragEnd,
    modalActions: {
      modalViews,
      handleToggleModal,
    },
  };
}
