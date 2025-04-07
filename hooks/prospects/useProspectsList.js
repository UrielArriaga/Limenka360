import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import useModal from "../useModal";
import { Call, WhatsApp } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../useGlobalCommons";
import { userSelector } from "../../redux/slices/userSlice";

export default function useProspectsList() {
  const prospectsApi = new ProspectsApi();
  const { getCatalogBy } = useGlobalCommons();

  const { actions, phases } = useSelector(commonSelector);
  const { id_user } = useSelector(userSelector);
  const [columns, setColumns] = useState([]);
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

  useEffect(() => {
    console.log(actions);
    console.log(phases);
  }, [actions.isFetching]);

  useEffect(() => {
    // console.log(columns);
    // console.log(phases);
  }, [columns]);

  useEffect(() => {
    fetchProspectByEachPhase();
  }, []);

  useEffect(() => {
    if (prospectSelected) {
      fetchPendings(prospectSelected?.id);

      console.log("here");
    }
  }, [prospectSelected]);

  useEffect(() => {
    if (prospectSelected) {
      fetchTrackings(prospectSelected.id);
    }
  }, [prospectSelected]);

  async function fetchProspectByEachPhase() {
    try {
      let results = (
        await prospectsApi.getProspectsByPhases({
          order: "-createdAt",
          include: "category",
          subquery: 1,
          join: "catego",
          where: {
            isclient: false,
            isoportunity: false,
            discarted: false,
            ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
          },
        })
      ).data?.results;
      setColumns(results);

      let newValues = {};

      for (let i = 0; i < results.length; i++) {
        const element = results[i];
        newValues[Object.keys(element)[0]] = {
          items: element[Object.keys(element)[0]].prospects,
          name: element[Object.keys(element)[0]].name,
          total: element[Object.keys(element)[0]].total,
          totalPages: Math.abs(element[Object.keys(element)[0]].total / element[Object.keys(element)[0]].limit),
          limit: element[Object.keys(element)[0]].limit,
          page: element[Object.keys(element)[0]].page,
          id: Object.keys(element)[0],
          isFetching: false,
        };
      }

      setColumns(newValues);
    } catch (error) {
      console.log(error);
    }
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

      console.log(results);
      setpendingsData({
        results: [...pendingsData.results, ...results],
        isFetching: false,
        count: results.length,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function updateProspectPhase(prospectId, phaseId, lastPhaseName) {
    try {
      await prospectsApi.updateProspectPhase(prospectId, phaseId);
      createTrakingAutomatic(prospectId, phaseId, lastPhaseName);
    } catch (error) {
      console.log(error);
    }
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
    } catch (error) {
      console.log(error);
    }
  }

  // * Events
  const handleScrollColumn = async (event, column) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log(`Llegó al final de la columna ${column.name}`);

      if (column.isFetching) return;

      if (column.page >= column.totalPages) return;

      try {
        setColumns(prev => {
          return {
            ...prev,
            [column.id]: {
              ...column,
              isFetching: true,
            },
          };
        });

        let params = {
          skip: column.page + 1,
          order: "-createdAt",
          order: "-createdAt",
          include: "category",
          subquery: 1,
          join: "catego",
          limit: column.limit,

          where: JSON.stringify({
            isclient: false,
            isoportunity: false,
            discarted: false,
            ejecutiveId: "YNQHRt32OCbt0shXa0yOa51t",
            phaseId: column.id,
          }),
        };

        console.log(params);

        let results = (await prospectsApi.getProspectByPhase(column.id, params)).data?.results;

        setColumns(prev => {
          return {
            ...prev,
            [column.id]: {
              ...column,
              items: [...column.items, ...results],
              page: column.page + 1,
              isFetching: false,
            },
          };
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleClickProspect = prospect => {
    console.log(prospect);
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
    console.log(actionsTrackingAumtomatic);
    console.log(actions);

    fetchProspectByEachPhase();
  };

  return {
    prospectSelected,
    updateProspectPhase,
    columns,
    trackings,
    pendingsData,
    setColumns,
    openPreview,
    toogleModalPreview,
    handleScrollColumn,
    handleClickProspect,

    // ! Delete after finish
    handleTest,
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

class ProspectsApi {
  async getPhasesProspects(queryParams = {}) {
    let params = {
      limit: 20,
      ...queryParams,
      where: JSON.stringify({
        or: [
          { name: "prospecto nuevo" },
          {
            name: "contactado",
          },
        ],
      }),
    };
    return api.get("phases", { params });
  }

  async getProspectByPhase(phaseId, queryParams = {}) {
    let params = {
      ...queryParams,

      // where: JSON.stringify({
      //   phaseId: phaseId,
      // }),
    };

    console.log(params);

    return api.get("prospects", { params });
  }

  async getProspects(queryParams = {}) {
    let params = {
      limit: 20,

      ...queryParams,
    };

    return api.get("prospects", { params });
  }

  async getProspectsByPhases(queryParams = {}) {
    let params = {
      limit: 5,
      ...queryParams,
    };

    return api.get("prospects/byphases", { params });
  }

  async getTrackings(queryParams = {}) {
    let params = {
      limit: 5,
      ...queryParams,
      order: "-createdAt",
      include: "action",
    };

    return api.get("trackings", { params });
  }

  async getPendings(queryParams = {}) {
    let params = {
      limit: 5,
      include: "pendingstype",

      ...queryParams,
    };

    return api.get("pendings", { params });
  }

  async updateProspectPhase(prospectId, phaseId) {
    return api.put(`prospects/${prospectId}`, { phaseId });
  }

  async addAutomaticTracking(dataTracking) {
    // let trackingFase = {};
    // trackingFase.prospectId = router.query.prospecto;
    // trackingFase.observations = `La fase ha sido cambiada. Fase anterior: ${
    //   prospect.phaseId ? capitalizeString(prospect?.phase?.name) : "Sin fase anterior"
    // } `;
    // trackingFase.actionId = action;
    // trackingFase.reason = "Seguimiento automático";
    // trackingFase.phaseId = phase;
    // trackingFase.createdbyId = id_user;
    // await api.put(`prospects/${prospect?.id}`, { phaseId: phase });
    // await api.post(`trackings`, trackingFase);
    return api.post("trackings", dataTracking);
  }
}
