import { Box, Dialog, Slide, Button } from "@material-ui/core";
import {
  ArrowBackIos,
  BusinessCenter,
  Close,
  MonetizationOn,
  Payment,
  PeopleAlt,
  TrendingDown,
  TrendingUp,
} from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
export default function ModalExecutiveDetails({ open, setOpen, executive }) {
  const { id_user } = useSelector(userSelector);
  const [prospects, setProspects] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [oportunities, setOportunities] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [payments, setPayments] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [customers, setCustomers] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [totalSales, setTotalSales] = useState({ isLoading: true, total: 0, totalbefore: 0, percentage: 0 });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [dataGraph, setDataGraph] = useState(undefined);
  const [reportType, setReportType] = useState("sales");
  const [dateSelected, setDateSelected] = useState("month");
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());

  useEffect(() => {
    if (dateSelected === "month") {
      setStartDate(dayjs().startOf("month").format());
      setFinishDate(dayjs().endOf("month").format());
    }

    if (dateSelected === "week") {
      setStartDate(dayjs().startOf("week").format());
      setFinishDate(dayjs().endOf("week").format());
    }

    if (dateSelected === "today") {
      setStartDate(dayjs().startOf("day").format());
      setFinishDate(dayjs().endOf("day").format());
    }
  }, [dateSelected]);

  useEffect(() => {
    if (executive) {
      getProspectRequest();
      getOportunitiesRequest();
      requestExecutives();
      getCustomers();
      getPaymentsRequest();

      // handleRequestAmountSales();
      // handleRequestPhaseAmount();
    }
  }, [executive]);

  useEffect(() => {
    if (executive) {
      handleRequests();
    }
  }, [executive, reportType]);

  const handleRequests = () => {
    switch (reportType) {
      case "phases":
        handleRequestPhaseAmount();
        break;
      case "sales":
        handleRequestAmountSales();
        break;
      case "entities":
        handleRequestEntites();
        break;

      case "origines":
        handleRequestOriginAmount();
        break;

      case "quotes":
        handleRequestQuotesAmount();
        break;
      default:
        break;
    }
  };

  const handleRequestEntites = async () => {
    setIsLoadingData(true);
    try {
      let query = {
        id: executive.id,
      };
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };

      let params = {
        order: "name",
        include: "group",
        where: JSON.stringify(query),
      };
      let responseEntities = await api.get("dashboard/ejecutivesentities", { params });

      let results = responseEntities.data?.results;
      normalizeData("entities", results);
      normalizeDataTable("entities", results);
    } catch (error) {
      console.log(error);
    }
    setIsLoadingData(false);
  };

  const iterateValues = (keyProperty, results) => {
    let labels = results[0]?.[keyProperty].map(item => item.name);
    let asdasdasdas = [];
    for (let i = 0; i < results.length; i++) {
      let itemTable = {};
      const ejecutiveByPhases = results[i];

      itemTable.ejecutivo = {
        fullname: ejecutiveByPhases.fullname,
        id: ejecutiveByPhases.id,
      };
      labels.forEach((element, index) => {
        itemTable[element] = ejecutiveByPhases[keyProperty][index];
      });
      asdasdasdas.push(itemTable);
    }
    labels.unshift("Ejecutivo");
    return [labels, asdasdasdas];
  };
  const normalizeData = (type, results) => {
    switch (type) {
      case "phases":
        let dataChart = {};
        let labels = results[0]?.phases.map(item => item.name);
        let finalDataset = [];
        for (let i = 0; i < results.length; i++) {
          let colors = generateRandomColorRgb(9);
          const ejecutiveByPhases = results[i];
          let itemDataSet = {};
          let values = ejecutiveByPhases.phases.map(item => Number(item.totalProspects));
          itemDataSet.label = ejecutiveByPhases.fullname;
          itemDataSet.data = values;
          itemDataSet.borderColor = colors[0];
          itemDataSet.backgroundColor = colors[1];
          finalDataset.push(itemDataSet);
        }
        dataChart.datasets = finalDataset;
        dataChart.labels = labels;
        setDataGraph(dataChart);
        break;

      case "sales":
        let dataChartSales = {};
        let labelsSales = results[0]?.months.map(item => item.name);
        console.log(labelsSales);
        let finalDatasetSales = [];
        for (let i = 0; i < results.length; i++) {
          let colors = generateRandomColorRgb(9);
          const ejecutiveByAmount = results[i];
          let itemDataSet = {};
          let values = ejecutiveByAmount.months.map(item => Number(item.totalAmount));
          itemDataSet.label = ejecutiveByAmount.fullname;
          itemDataSet.data = values;
          itemDataSet.borderColor = colors[0];
          itemDataSet.backgroundColor = colors[1];
          finalDatasetSales.push(itemDataSet);
        }
        dataChartSales.datasets = finalDatasetSales;
        dataChartSales.labels = labelsSales;
        console.log(dataChartSales);
        setDataGraph(dataChartSales);
        break;

      case "entities":
        let dataChartEntites = {};
        let labelsEntites = results[0]?.entities.map(item => item.name);
        let finalDatasetEntities = [];
        for (let i = 0; i < results.length; i++) {
          let colors = generateRandomColorRgb(9);
          const ejecutiveByAmount = results[i];
          let itemDataSet = {};
          let values = ejecutiveByAmount.entities.map(item => Number(item.totalProspects));
          itemDataSet.label = ejecutiveByAmount.fullname;
          itemDataSet.data = values;
          itemDataSet.borderColor = colors[0];
          itemDataSet.backgroundColor = colors[1];
          finalDatasetEntities.push(itemDataSet);
        }
        dataChartEntites.datasets = finalDatasetEntities;
        dataChartEntites.labels = labelsEntites;

        console.log(dataChartEntites);
        setDataGraph(dataChartEntites);
        break;

      case "origines":
        let dataChartOrigenes = {};
        let labelsOrigenes = results[0]?.origins.map(item => item.name);

        console.log(labelsOrigenes);
        let finalDatasetOrigenes = [];
        for (let i = 0; i < results.length; i++) {
          let colors = generateRandomColorRgb(9);
          const ejecutiveByAmount = results[i];
          let itemDataSet = {};
          let values = ejecutiveByAmount.origins.map(item => Number(item.totalProspects));
          itemDataSet.label = ejecutiveByAmount.fullname;
          itemDataSet.data = values;
          itemDataSet.borderColor = colors[0];
          itemDataSet.backgroundColor = colors[1];
          finalDatasetOrigenes.push(itemDataSet);
        }
        dataChartOrigenes.datasets = finalDatasetOrigenes;
        dataChartOrigenes.labels = labelsOrigenes;

        console.log(dataChartOrigenes);
        setDataGraph(dataChartOrigenes);
        break;

      case "quotes":
        let dataChartQuotes = {};
        let labelQuotes = results[0]?.months.map(item => item.name);

        console.log(labelQuotes);
        let finalDatasetQuotes = [];
        for (let i = 0; i < results.length; i++) {
          let colors = generateRandomColorRgb(9);
          const ejecutiveByAmount = results[i];
          let itemDataSet = {};
          let values = ejecutiveByAmount.months.map(item => Number(item.totalAmount));
          itemDataSet.label = ejecutiveByAmount.fullname;
          itemDataSet.data = values;
          itemDataSet.borderColor = colors[0];
          itemDataSet.backgroundColor = colors[1];
          finalDatasetQuotes.push(itemDataSet);
        }
        dataChartQuotes.datasets = finalDatasetQuotes;
        dataChartQuotes.labels = labelQuotes;

        console.log(dataChartQuotes);
        setDataGraph(dataChartQuotes);

        break;

      default:
        console.log("null");
        break;
    }
  };

  const normalizeDataTable = (type, results) => {
    switch (type) {
      case "phases":
        let [labels, dataset] = iterateValues("phases", results);
        setDataTable({ heads: labels, data: dataset });
        break;

      case "sales":
        let labelsSales = results[0]?.months.map(item => item.name);
        console.log(labelsSales);
        let asdasdasdasSales = [];
        for (let i = 0; i < results.length; i++) {
          let itemTable = {};
          const ejecutiveByPhases = results[i];

          itemTable.ejecutivo = {
            fullname: ejecutiveByPhases.fullname,
            id: ejecutiveByPhases.id,
          };
          labelsSales.forEach((element, index) => {
            itemTable[element] = ejecutiveByPhases.months[index];
          });
          asdasdasdasSales.push(itemTable);
          console.log(itemTable);
        }
        console.log("values", asdasdasdasSales);
        labelsSales.unshift("Ejecutivo");

        setDataTable({ heads: labelsSales, data: asdasdasdasSales });

        break;

      case "entities":
        let labelsEntities = results[0]?.["entities"].map(item => item.name);
        labelsEntities.unshift("Ejecutivo");
        console.log(labelsEntities);
        let asdasdasdasEntities = [];
        for (let i = 0; i < results.length; i++) {
          let itemTable = {};
          const ejecutiveByPhases = results[i];

          itemTable.ejecutivo = {
            fullname: ejecutiveByPhases.fullname,
            id: ejecutiveByPhases.id,
          };
          labelsEntities.forEach((element, index) => {
            itemTable[element] = ejecutiveByPhases.entities[index];
          });
          asdasdasdasEntities.push(itemTable);
        }

        setDataTable({ heads: labelsEntities, data: asdasdasdasEntities });
        break;

      case "origines":
        let labelsOrigines = results[0]?.["origins"].map(item => item.name);
        console.log(labelsOrigines);
        labelsOrigines.unshift("Ejecutivo");

        let asdasdasdasOrigines = [];
        for (let i = 0; i < results.length; i++) {
          let itemTable = {};
          const ejecutiveByPhases = results[i];

          itemTable.ejecutivo = {
            fullname: ejecutiveByPhases.fullname,
            id: ejecutiveByPhases.id,
          };
          labelsOrigines.forEach((element, index) => {
            console.log(index);
            if (index !== 0) itemTable[element] = ejecutiveByPhases.origins[index];
          });
          asdasdasdasOrigines.push(itemTable);
        }

        setDataTable({ heads: labelsOrigines, data: asdasdasdasOrigines });
        break;

      case "quotes":
        let labelsQuotes = results[0]?.months.map(item => item.name);
        console.log(labelsQuotes);
        let asdasdasdasQuotes = [];
        for (let i = 0; i < results.length; i++) {
          let itemTable = {};
          const ejecutiveByPhases = results[i];

          itemTable.ejecutivo = {
            fullname: ejecutiveByPhases.fullname,
            id: ejecutiveByPhases.id,
          };
          labelsQuotes.forEach((element, index) => {
            itemTable[element] = ejecutiveByPhases.months[index];
          });
          asdasdasdasQuotes.push(itemTable);
          console.log(itemTable);
        }
        console.log("values", asdasdasdasQuotes);
        labelsQuotes.unshift("Ejecutivo");

        setDataTable({ heads: labelsQuotes, data: asdasdasdasQuotes });
        break;
        break;

      default:
        break;
    }
  };

  const handleClose = () => setOpen(!open);

  const handleRequestAmountSales = async () => {
    try {
      setIsLoadingData(true);
      let query = {
        id: executive.id,
      };
      // query.oportunity = {};
      // query.oportunity.soldat = {
      //   $gte: startDate,
      //   $lte: finishDate,
      // };
      // query.oportunity.iscloseout = true;
      // query.groupId = groupId;

      let params = {
        // limit: 5,
        // order: "-totalAmount",
        // count: 1,
        all: 1,
        where: JSON.stringify(query),
      };
      let res = await api.get("dashboard/ejecutivesquoteamounthistory", { params });
      let results = res.data.results;
      console.log(results);
      normalizeData("sales", results);
      normalizeDataTable("sales", results);

      // console.log(res);
      // setData(res.data.results, res.data?.count);
      // if (res.data?.results?.length > 0 && page == 1) {
      //   dispatch(setEjecutiveSelectedG({ item: res.data.results[0] }));
      // }
    } catch (error) {
      console.log(error);
    }

    setIsLoadingData(false);
  };
  const handleRequestPhaseAmount = async () => {
    try {
      // setIsLoadingData(true);
      // let query = {
      //   year: "2022-08-17T21:40:45.805Z",
      // };

      let query = {
        id: executive.id,
      };
      // query.createdAt = {
      //   $gte: startDate,
      //   $lte: finishDate,
      // };
      let params = {
        order: "name",
        include: "group",
        phaseorder: "-name",
        where: JSON.stringify(query),
      };
      let response = await api.get("dashboard/ejecutivesphases", { params });
      console.log(response);
      let results = response.data?.results;
      console.log(results);
      normalizeData("phases", results);
      normalizeDataTable("phases", results);
      setIsLoadingData(false);
    } catch (error) {
      console.log(error);
      // setIsLoadingData(false);
    }
  };
  const getProspectRequest = async () => {
    try {
      setProspects({ ...prospects, isLoading: true });
      let query = {
        isclient: false,
        isoportunity: false,
      };
      let queryBefore = {
        isclient: false,
        isoportunity: false,
      };
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };

      queryBefore.createdAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };

      query.ejecutive = {
        id: executive.id,
      };
      queryBefore.ejecutive = {
        id: executive.id,
      };
      let params = {
        limit: 0,
        count: 1,
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
        countcustomdate: 1,
      };
      // console.log(params);
      let totalProspects = await api.get("prospects", { params });
      // console.log(totalProspects);
      setProspects({
        ...prospects,
        total: totalProspects.data.count,
        totalbefore: totalProspects.data.countcustomdate,
        percentage: totalProspects.data.percentage,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOportunitiesRequest = async () => {
    try {
      setOportunities({ ...oportunities, isLoading: true });

      let query = {
        isoportunity: true,
        isclient: false,
      };
      let queryBefore = {
        isoportunity: true,
        isclient: false,
      };
      query.oportunityAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      queryBefore.oportunityAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };
      query.ejecutive = {
        id: executive.id,
      };

      queryBefore.ejecutive = {
        id: executive.id,
      };
      let params = {
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
        countcustomdate: 1,
        limit: 0,
        count: 1,
      };
      // query.ejecutiveId = {
      //   groupId: groupId,
      // };
      let totalOportunities = await api.get("prospects", { params });
      console.log(totalOportunities);
      // let totalOportunities = await api.get(`prospects?where={"ejecutiveId":"${id_user}"}&limit=0&count=1`);
      setOportunities({
        ...oportunities,
        total: totalOportunities.data.count,
        totalbefore: totalOportunities.data.countcustomdate,
        percentage: totalOportunities.data.percentage,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const requestExecutives = async () => {
    try {
      let query = {
        roleId: "62d94hH7xnfeqrfYLLDSKAtR",
        id: executive.id,
        oportunity: {
          // iscloseout: true,
          soldat: {
            $gte: startDate,
            $lte: finishDate,
          },
        },
      };
      let params = {
        where: JSON.stringify(query),
        all: 1,
      };
      let response = await api.get("dashboard/ejecutivessappapp", { params });
      setTotalSales({ ...totalSales, total: response.data.results[0].salesAmount });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomers = async () => {
    try {
      setCustomers({ ...customers, isLoading: true });
      let query = {
        isclient: true,
      };
      let queryBefore = {
        isclient: true,
      };
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      queryBefore.createdAt = {
        $gte: dayjs(startDate).subtract(1, "month").format(),
        $lte: dayjs(finishDate).subtract(1, "month").format(),
      };
      query.ejecutive = {
        id: executive.id,
      };
      queryBefore.ejecutive = {
        id: executive.id,
      };
      query.isclient = true;
      let params = {
        limit: 0,
        count: 1,
        where: JSON.stringify(query),
        wherecustom: JSON.stringify(queryBefore),
        countcustomdate: 1,
      };
      console.log(params);
      let totalProspects = await api.get("prospects", { params });
      console.log(totalProspects);
      setCustomers({
        ...customers,
        total: totalProspects.data.count,
        totalbefore: totalProspects.data.countcustomdate,
        percentage: totalProspects.data.percentage,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentsRequest = async () => {
    try {
      let query = {};
      query.ispaid = false;
      query.createdAt = {
        $gte: startDate,
        $lte: finishDate,
      };
      query["oportunity"] = {
        prospect: {
          ejecutiveId: executive.id,
          // ejecutiveId: payload.id,
        },
      };
      let params = {
        where: JSON.stringify(query),
        limit: 0,
        count: "1",
        order: "-createdAt",
        include: "oportunity,oportunity.prospect",
        join: "oportunity,oportunity.prospect,ejecutive",
        showejecutive: 1,
      };
      let responseOportunities = await api.get(`salespayments`, { params });
      console.log(responseOportunities);
      setPayments({ ...payments, total: responseOportunities.data.count, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  function generateRandomColorRgb(opacity, type) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return [
      "rgb(" + red + ", " + green + ", " + blue + ")",
      "rgba(" + red + ", " + green + ", " + blue + "," + opacity / 10 + ")",
    ];
  }

  const handleOnChangeDate = type => {
    setDateSelected(type);
  };
  if (executive === undefined) return null;

  return (
    <DialogContainer fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <div className="header">
        <Box flexDirection={"row"} display="flex" alignItems={"center"}>
          <ArrowBackIos onClick={() => setOpen(false)}>Test</ArrowBackIos>
          <p className="executivename">Ejecutivo: {executive.fullname}</p>
        </Box>
        <Close onClick={() => handleClose()} />
      </div>
      <div className="date"></div>
      <div className="content">
        {/* <div className="cardsbig ">
          <CardByExecutiveBig isMoney item={{ ...data[4], ...totalSales }} />
        </div> */}
        <div className="cards">
          <CardByExecutive isMoney item={{ ...data[4], ...totalSales }} />
          <CardByExecutive item={{ ...data[0], ...prospects }} />
          <CardByExecutive item={{ ...data[1], ...oportunities }} />
          <CardByExecutive item={{ ...data[3], ...customers }} />
          <CardByExecutive item={{ ...data[2], ...payments }} />
        </div>

        <div className="date_bar">
          <div className="current_date">
            <p>{dayjs(startDate).format("DD/MM/YYYY")}</p>
            <p>A</p>
            <p>{dayjs(finishDate).format("DD/MM/YYYY")}</p>
          </div>

          <div className="dates">
            <Button
              onClick={() => handleOnChangeDate("today")}
              className={`${dateSelected === "today" ? "date_selected" : ""}`}
            >
              Hoy
            </Button>
            <Button
              onClick={() => handleOnChangeDate("week")}
              className={`${dateSelected === "week" ? "date_selected" : ""}`}
            >
              Semanal
            </Button>
            <Button
              onClick={() => handleOnChangeDate("month")}
              className={`${dateSelected === "month" ? "date_selected" : ""}`}
            >
              Mensual
            </Button>
          </div>
        </div>
        <DashboardEjecutiveCalendary
          type="manager"
          id_executive={executive.id}
          handleAlert={() => {}}
          setFlag={() => {}}
          actions={[]}
        />
      </div>
    </DialogContainer>
  );
}

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

import styled from "styled-components";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { colors } from "../../styles/global.styles";
import { formatNumber } from "../../utils";
import ChartBar from "../UI/organism/ChartBar";
import ResumeExecutive from "../UI/organism/ResumeExecutive";
import DashboardEjecutiveCalendary from "../DashboardEjecutiveCalendary";

const DialogContainer = styled(Dialog)`
  .header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    height: 60px;
    background-color: ${colors.primaryColorDark};
  }

  .header .executivename {
    color: #fff;
    font-weight: bold;
  }

  .header svg {
    color: #fff;
    font-size: 30px;
  }

  .content {
    padding: 20px;
  }

  .cards {
    display: flex;
    gap: 20px;
  }

  .cards .card {
  }

  .filters {
    select {
      height: 46px;
      width: 309px;
      padding-left: 15px;
      border-width: 0px;
      outline: none;
      border-radius: 5px;
      background-color: #fff;
      border: 1px solid #bdbdbd;
    }
  }

  .date_bar {
    display: flex;
    justify-content: space-between;
  }
  .current_date {
    display: flex;
    align-items: center;
  }
  .dates {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }

  .date_selected {
    background-color: ${colors.primaryColor};
  }
`;

//  TODO CARD BY EXUCITVE COMPONENT AND STYLES
function CardByExecutive({ item, isMoney }) {
  return (
    <CardByExecutiveStyled isMoney={isMoney} className={`card ${isMoney && "ismoney"}`}>
      <div className="content">
        <div className="top">
          {item.icon}
          <p className="title">{item.title}</p>
        </div>
        <div className="totals">
          <p className="total">{isMoney ? formatNumber(item.total) : item.total}</p>
        </div>
        <div className="percentajes">
          <p className="percentaje plus"></p>
          <span className="before">
            {item.totalbefore}
            {/* {JSON.stringify(item.totalbefore)} */}
            {/* xxx{isMoney ? formatNumber(item.totalbefore.toFixed(2)) : item.totatotalbeforel} */}
          </span>

          <span className={`${item.total > item.totalbefore ? "up" : "down"}`}>
            {item.total > item.totalbefore
              ? ((item.totalbefore * 100) / item.total).toFixed(2)
              : (-(item.total * 100) / item.totalbefore).toFixed(2)}
          </span>

          <span className={`text ${item.total > item.totalbefore ? "up" : "down"}`}> % desde el mes pasado</span>
          {item.total > item.totalbefore ? (
            <TrendingUp className="trendingup trending" />
          ) : (
            <TrendingDown className="trendingdown trending" />
          )}
        </div>
      </div>
    </CardByExecutiveStyled>
  );
}

function CardByExecutiveBig({ item, isMoney }) {
  return (
    <CardByExecutiveStyled isMoney={isMoney} className={`card ${isMoney && "ismoney"}`}>
      <div className="content">
        <div className="top">
          {item.icon}
          <p className="title">{item.title}</p>
        </div>
        <div className="totals">
          <p className="total">{isMoney ? formatNumber(item.total) : item.total}</p>
        </div>
        <div className="percentajes">
          <p className="percentaje plus"></p>
          <span className="before">{isMoney ? formatNumber(item.totalbefore.toFixed(2)) : item.totatotalbeforel}</span>

          <span className={`${item.total > item.totalbefore ? "up" : "down"}`}>
            {item.total > item.totalbefore
              ? ((item.totalbefore * 100) / item.total).toFixed(2)
              : (-(item.total * 100) / item.totalbefore).toFixed(2)}
          </span>

          <span className={`text ${item.total > item.totalbefore ? "up" : "down"}`}> % desde el mes pasado</span>
          {item.total > item.totalbefore ? (
            <TrendingUp className="trendingup trending" />
          ) : (
            <TrendingDown className="trendingdown trending" />
          )}
        </div>
      </div>
    </CardByExecutiveStyled>
  );
}

const CardByExecutiveStyled = styled.div`
  width: 100px;

  width: calc(100% / 3 - 10px);
  /* height: 70px; */
  background-color: ${({ isMoney }) => (isMoney ? colors.primaryColorDark : "#ffff")};
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 10px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .content {
    .top {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      /* border-bottom: 1px solid #eeeeee; */
      padding: 0px 10px;

      .icon {
        color: ${({ bg }) => (bg ? bg : "#000")};
        margin-right: 5px;
      }
    }
    .title {
      /* color: #ffff; */
      font-weight: bold;
    }

    .totals {
      padding: 10px 10px;

      .total {
        font-weight: bold;
        font-size: 20px;
        letter-spacing: 2px;
      }
    }

    .percentajes {
      padding: 0px 10px;
      span {
        margin-right: 10px;
      }
      .percentaje {
        color: #43bb88;
      }

      .before {
        color: #757575;
        font-weight: bold;
        font-size: 16px;
      }

      .trendingup {
        color: #00e676;
      }
      .trendingdown {
        color: #d50000;
      }

      .up {
        color: #00e676;
        color: #757575;
      }
      .down {
        color: #d50000;
        color: #757575;
      }

      .text {
        color: #757575;
      }
    }

    .graph {
      height: 400px;
    }
  }
`;

let data = [
  {
    index: 0,
    title: "Prospectos",
    colorbar: "#44cbe4",
    icon: <PeopleAlt className="icon icon_prospect" />,
  },
  {
    index: 1,
    title: "Oportunidades",
    colorbar: "#88c82d",
    icon: <MonetizationOn className="icon icon_oportunities" />,
  },
  {
    index: 2,
    title: "Cuentas por cobrar",
    colorbar: "#f77132",
    icon: <BusinessCenter className="icon icon_payments" />,
  },
  {
    index: 3,
    title: "Clientes",
    colorbar: "#6b34bc",
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 4,
    title: "Monto Vendido",
    colorbar: "#616161",
    icon: <Payment className="icon icon_discarted" />,
  },

  {
    index: 5,
    title: "Monto a cobrar",
    colorbar: "#f50057",
    icon: <Payment className="icon icon_discarted" />,
  },
];
//  TODO CARD BY EXUCITVE COMPONENT AND STYLES
