import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import useModal from "../../../hooks/useModal";
import { commonSelector } from "../../../redux/slices/commonSlice";
import { userSelector } from "../../../redux/slices/userSlice";
import ProspectsApi from "../services";
import { heads, initialData } from "../data";
import { set } from "date-fns";
import { api } from "../../../services/api";
import { keys } from "highcharts";

export default function useProspectsList() {
  const prospectsApi = new ProspectsApi();
  const { getCatalogBy } = useGlobalCommons();
  const columnRefs = useRef([]);

  const { actions, phases } = useSelector(commonSelector);
  const [data, setData] = useState(initialData);
  const { id_user } = useSelector(userSelector);
  const [columnsData, setColumns] = useState({
    columns: {},
    columnsOrder: [],
  });
  const [trackings, setTrackings] = useState([]);
  const [pendingsData, setpendingsData] = useState({
    results: [],
    isFetching: false,
    count: 0,
  });

  const [prospectSelected, setProspectSelected] = useState(null);

  const { open: openPreview, toggleModal } = useModal();

  useEffect(() => {
    getCatalogBy("actions");
  }, []);

  useEffect(() => {}, [actions.isFetching]);

  useEffect(() => {}, [columnsData]);

  useEffect(() => {
    fetchProspectByEachPhase();
  }, []);

  useEffect(() => {
    if (prospectSelected) {
      fetchPendings(prospectSelected?.id);
    }
  }, [prospectSelected]);

  useEffect(() => {
    if (prospectSelected) {
      fetchTrackings(prospectSelected.id);
    }
  }, [prospectSelected]);

  async function fetchProspectByEachPhase() {
    try {
      let resData = await prospectsApi.getProspectsByPhases({
        order: "-createdAt",
        subquery: 1,
        include: "category,clienttype",
        join: "catego,clienttyp",
        where: {
          isclient: false,
          isoportunity: false,
          discarted: false,
          ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
        },
      });

      console.log(resData?.data);

      // columnRefs.current = columnRefs.current.slice(0, resData?.data?.columnsOrder.length);

      setColumns(resData.data);

      console.log(columnRefs);
    } catch (error) {}
  }

  async function fetchProspectByPhase(phaseId) {
    try {
      let results = (await prospectsApi.getProspectByPhase({ phaseId })).data?.results;
      setColumns(results);
    } catch (error) {}
  }

  async function fetchTrackings(prospectId) {
    try {
      let params = {
        where: JSON.stringify({
          prospectId: prospectId,
        }),
      };
      let results = (await prospectsApi.getTrackings(params)).data?.results;
      setTrackings(results);
    } catch (error) {}
  }
  async function fetchPendings(prospectId) {
    try {
      setpendingsData(prev => {
        return {
          ...prev,
          isFetching: true,
        };
      });
      let params = {
        where: {
          prospectId: prospectId,
        },
        order: "date_from",
      };
      let results = (await prospectsApi.getPendings(params)).data?.results;

      setpendingsData({
        results: [...pendingsData.results, ...results],
        isFetching: false,
        count: results.length,
      });
    } catch (error) {}
  }

  async function updateProspectPhase(prospectId, phaseId, lastPhaseName) {
    try {
      await prospectsApi.updateProspectPhase(prospectId, phaseId);
      createTrakingAutomatic(prospectId, phaseId, lastPhaseName);
    } catch (error) {}
  }

  async function createTrakingAutomatic(prospectId, phaseId, lastPhaseName) {
    try {
      let actionsTrackingAumtomatic = actions.results.filter(action => action.name == "Seguimiento Automatico")[0];
      let actionId = actionsTrackingAumtomatic.id;

      let dataTracking = {
        prospectId: prospectId,
        observations: `La fase ha sido cambiada. Fase anterior: ${lastPhaseName}`,
        actionId: actionId,
        reason: "Seguimiento automático",
        phaseId: phaseId,
        createdbyId: id_user,
        status: 1,
      };

      await prospectsApi.addAutomaticTracking(dataTracking);
    } catch (error) {}
  }

  const handleScrollColumn = async (event, column) => {
    try {
      const target = event.target;

      const isScrollingVertically = target.scrollHeight > target.clientHeight;

      let newColumn = {};
      if (isScrollingVertically && target.scrollTop + target.clientHeight >= target.scrollHeight) {
        console.log(`Columna ${column.id} ha llegado al final del scroll vertical`);

        if (column.isFetching) return;

        if (column.page >= column.totalPages) return;

        // if (column.totalPages && column.page >= column.totalPages) return;

        let nextPage = column.page + 1;

        console.log(nextPage);

        newColumn = {
          ...column,
          isFetching: true,
        };

        let newStates = {
          ...columnsData,
          columns: {
            ...columnsData.columns,
            [column.id]: newColumn,
          },
        };

        setColumns(newStates);

        let respNextProspects = await api.get("prospects", {
          params: {
            keys: "id,name,phone,fullname,email,categoryId,phaseId,createdAt",
            limit: 5,
            count: 1,
            skip: nextPage,
            order: "-createdAt",
            include: "category",
            join: "catego",
            where: JSON.stringify({
              phaseId: column.id,
              isclient: false,
              isoportunity: false,
              ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
            }),
          },
        });

        let newColumnfinish = {
          ...column,
          items: [...column.items, ...respNextProspects.data.results],
          isFetching: false,
          page: nextPage,
        };

        let newState = {
          ...columnsData,
          columns: {
            ...columnsData.columns,
            [column.id]: newColumnfinish,
          },
        };

        console.log(newState);

        setColumns(newState);

        // console.log(respNextProspects);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickProspect = prospect => {
    setProspectSelected(prospect);
    toogleModalPreview(true);
  };

  const toogleModalPreview = isOpen => {
    if (isOpen) {
      toggleModal();
      return;
    }

    setProspectSelected(null);
    setTrackings([]);
    setpendingsData({
      results: [],
      isFetching: false,
      count: 0,
    });
    toggleModal();
  };

  const handleTest = () => {
    let actionsTrackingAumtomatic = actions.results.filter(action => action.name == "Seguimiento Automatico")[0];

    fetchProspectByEachPhase();
  };

  const onDragEnd = async result => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(columnsData.columnsOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...columnsData,
        columnsOrder: newColumnOrder,
      };

      setColumns(newState);
      return;
    }

    const startColumn = columnsData.columns[source.droppableId];
    const finishColumn = columnsData.columns[destination.droppableId];

    if (startColumn === finishColumn) {
      let newItems = [...startColumn.items];

      let initialPosition = source.index;

      let finalPosition = destination.index;

      let [removed] = newItems.splice(initialPosition, 1);

      newItems.splice(finalPosition, 0, removed);

      const newColumn = {
        ...startColumn,
        items: newItems,
      };

      const newState = {
        ...columnsData,
        columns: {
          ...columnsData.columns,
          [newColumn.id]: newColumn,
        },
      };

      setColumns(newState);

      return;
    }

    updateProspectPhase(draggableId, destination.droppableId, startColumn.name);

    let initialPosition = source.index;
    let finalPosition = destination.index;

    let startitems = [...startColumn.items];

    let finishitems = [...finishColumn.items];

    let [removed] = startitems.splice(initialPosition, 1);

    finishitems.splice(finalPosition, 0, removed);

    let newStartColumn = {
      ...startColumn,
      items: startitems,
    };

    let newFinishColumn = {
      ...finishColumn,
      items: finishitems,
    };

    let newState = {
      ...columnsData,
      columns: {
        ...columnsData.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };
    setColumns(newState);
  };

  return {
    prospectSelected,
    updateProspectPhase,
    onDragEnd,
    columnsData,
    trackings,
    pendingsData,
    setColumns,
    openPreview,
    toogleModalPreview,
    handleScrollColumn,
    handleClickProspect,
    handleTest,
    columnRefs,
    fetchProspectByEachPhase,
    tableData: {
      heads,
      data,
    },
  };
}

const itemsFromBackend = [
  { id: "UAZA1", content: "First task", name: "Uriel Arriaga", phone: "1234567890" },
  { id: "UAZA2", content: "Second task", name: "Juan Perez", phone: "1234567890" },
  { id: "UAZA3", content: "Third task", name: "Pedro Lopez", phone: "1234567890" },
  { id: "UAZA4", content: "Fourth task", name: "Maria Martinez", phone: "1234567890" },
  { id: "UAZA5", content: "Fifth task", name: "Jose Hernandez", phone: "1234567890" },
];

export const phases = {
  ["b7aNJhPhlbeE1fGJfWNSsieC"]: {
    name: "prospecto nuevo",
    color: "#FFFAE6",
    items: itemsFromBackend,
  },
  ["sXbDsFb7g6CVO1bvSyN1f4Vl"]: {
    name: "contactado",
    color: "#EAE6FF",
    items: [],
  },
  ["55HoCt487ESGH9R7wZSuYhhA"]: {
    name: "reasignacion",
    color: "#DEEBFF",
    items: [],
  },
  ["0Cx5FaWOhNcDY1NUoEnjANre"]: {
    name: "No contacto",
    color: "#E3FCEF",
    items: [],
  },
};
