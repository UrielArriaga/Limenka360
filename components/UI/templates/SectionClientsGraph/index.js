import { Grid } from "@material-ui/core";
import { ErrorOutline, PeopleOutline, SearchOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { ClientsGerente } from "../SectionClientsGraph/styles";
import { Pie, PolarArea, Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Legend,
  RadialLinearScale,
  BarElement,
  Tooltip,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
ChartJS.register(ArcElement, Legend, RadialLinearScale, CategoryScale, BarElement, Tooltip, LinearScale, PointElement, LineElement, Filler);
const SectionClientsGraph = ({ startDate, finishDate }) => {
  const { id_user, groupId } = useSelector(userSelector);
  const [origins, setOrigins] = useState([]);
  const [dateInitProspects, setDateInitProspects] = useState(new Date());
  const [dateFinishProspects, setdateFinishProspects] = useState("");
  const [flagProspect, setFlagProspect] = useState(false);
  const [entitesProspect, setEntitiesProspect] = useState([]);
  const [totalsEntities, setTotalsEntities] = useState([]);
  const [initialQuery, setInitialQuery] = useState(true);
  const [clientTypeProspect, setClientTypeProspect] = useState([]);
  const [totalClientType, setTotalClientType] = useState([]);
  useEffect(() => {
    getOriginisProspect();
    getEntitiesProspects();
    getClientTypeProspect();
  }, [flagProspect, startDate, finishDate]);

  const getOriginisProspect = async () => {
    try {
      let query = {};
      !initialQuery
        ? (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            status: 3,
            isclient: true,
          })
        : (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            status: 3,
            isclient: true,
          });
      let originsProspects = await api.get(`dashboard/originsprospect?where=${JSON.stringify(query)}&order=name`);
      setOrigins(originsProspects.data.results);
      setInitialQuery(false);
    } catch (error) {
      console.log(error);
    }
  };
  const getEntitiesProspects = async () => {
    try {
      let query = {};
      !initialQuery
        ? (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            status: 3,
            isclient: true,
          })
        : (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            status: 3,
            isclient: true,
          });
      let entityProspects = await api.get(`dashboard/entitiesprospect?where=${JSON.stringify(query)}&order=-totalProspects&limit=5`);
      let entitiesTop = entityProspects.data.results;
      let entities = [];
      let totals = [];
      for (let i = 0; i < entitiesTop.length; i++) {
        const element = entitiesTop[i];
        entities.push(element.name);
        totals.push(element.totalProspects);
      }
      setEntitiesProspect(entities);
      setTotalsEntities(totals);
      setInitialQuery(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getClientTypeProspect = async () => {
    try {
      let query = {};
      !initialQuery
        ? (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            status: 3,
            isclient: true,
          })
        : (query.prospect = {
            createdAt: { $gte: startDate, $lte: finishDate },
            status: 3,
            isclient: true,
          });
      let clientProspects = await api.get(`dashboard/clienttypeprospect?where=${JSON.stringify(query)}&order=-totalProspects&limit=5`);
      let clientTypes = clientProspects.data.results;
      let type = [];
      let totals = [];
      for (let i = 0; i < clientTypes.length; i++) {
        const element = clientTypes[i];
        type.push(element.name);
        totals.push(element.totalProspects);
      }
      setClientTypeProspect(type);
      setTotalClientType(totals);
      setInitialQuery(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataDaysMonth = (dates) => {
    let date = new Date(dates.toISOString().slice(0, 10));
    let firtsDay = new Date(date.getFullYear(), date.getMonth(), 1);
    let lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    setDateInitProspects(firtsDay.toISOString().slice(0, 10));
    setdateFinishProspects(lastDay.toISOString().slice(0, 10));
    return [firtsDay.toISOString(), lastDay.toISOString()];
  };

  const formatDateQuery = (date) => date.slice(0, 10).concat("T00:00:00.000Z");

  const dataOriginProspect = {
    labels: ["Facebook", "Google", "Instagram", "Propio"],
    datasets: [
      {
        label: "# of Votes",
        data: [origins[0]?.totalProspects, origins[1]?.totalProspects, origins[2]?.totalProspects, origins[3]?.totalProspects],
        backgroundColor: ["rgba(66,103,178,0.5)", "rgba(15,157,88,0.5)", "rgba(131,58,180,0.5)", "rgba(252,142,91,0.5)"],
        borderColor: ["rgba(66,103,178,0.3)", "rgba(15,157,88,0.3)", "rgba(131,58,180,0.3)", "rgba(252,142,91,0.3)"],
      },
    ],
  };

  const dataClientTypeProspect = {
    labels: clientTypeProspect,
    datasets: [
      {
        label: "# of Votes",
        data: totalClientType,
        backgroundColor: ["#a7c6e5", "#b5dcc9", "#ec95a6", "#fbcbc7", "#fee7bb"],
        borderColor: ["#3058a6", "#36a793", "#db3e4d", "#f18c78", "#f3c770"],
      },
    ],
  };

  const dataEntityProspect = {
    labels: entitesProspect,
    datasets: [
      {
        fill: true,
        label: "Total de prospectos",
        data: totalsEntities,
        borderColor: "#487aa1",
        backgroundColor: "#b2d9f7",
        borderWidth: 1,
      },
    ],
  };
  const optionsEntityProspect = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };
  return (
    <ClientsGerente>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <div className="origin_prospect">
            <p className="title">Origen de Clientes</p>
            <div className="graph">
              <PolarArea data={dataOriginProspect} />
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div className="graph_entity">
            <p className="title">Clientes por Estado</p>
            <Line options={optionsEntityProspect} data={dataEntityProspect} />
          </div>
        </Grid>
        <Grid item xs={12} md={3}>
          <div className="origin_prospect">
            <p className="title">Tipo de Cliente de Clientes</p>
            <div className="graph">
              <PolarArea data={dataClientTypeProspect} />
            </div>
          </div>
        </Grid>
      </Grid>
    </ClientsGerente>
  );
};

export default SectionClientsGraph;
