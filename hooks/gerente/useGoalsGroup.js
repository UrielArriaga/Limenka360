import { useEffect } from "react";
import { useState } from "react";
import { api } from "../../services/api";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";

const useGoalsGroup = (startDate, finishDate) => {
  const { groupId } = useSelector(userSelector);
  const [typeDataChart, setTypeDataChart] = useState({
    id: "montovendido",
    name: "Monto Vendido ",
  });
  const [totalResults, setTotalResults] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [goalsNames, setGoalsNames] = useState([]);
  const [ejecutiveGoalsData, setEjecutiveGoals] = useState({
    labels: [],
    datasets: [],
  });

  const [orderBy, setOrderBy] = useState({
    value: "-totalAmount",
    label: "Total Vendido",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getGoalsNames();
  }, []);

  useEffect(() => {
    let localtypeDataChart = JSON.parse(localStorage.getItem("typeDataChart"));

    if (localtypeDataChart) {
      setTypeDataChart(localtypeDataChart);
      handleGetData(localtypeDataChart);
    } else {
      handleGetData({
        id: "montovendido",
        name: "Monto Vendido",
      });
    }
  }, [startDate, finishDate]);

  const handleGetData = (typeParam = {}) => {
    // if (typeParam.id === "montovendido") {
    //   requestExecutives();
    // } else {
    //   getGoalsGroup();
    // }
    // localStorage.setItem("typeDataChart", JSON.stringify(typeDataChart));

    if (typeParam.id === "montovendido") {
      requestExecutives();
    } else {
      getGoalsGroup();
    }

    localStorage.setItem("typeDataChart", JSON.stringify(typeParam));
  };

  const requestExecutives = async () => {
    try {
      setIsFetching(true);
      let query = {};
      query.oportunity = {};
      query.oportunity.soldat = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.oportunity.iscloseout = true;
      query.groupId = groupId;
      let params = {
        limit: 8,
        order: "-totalAmount",
        count: 1,
        where: JSON.stringify(query),
      };
      let response = await api.get("dashboard/ejecutivesamount", { params });

      let [valuesAmount, labels] = normalizeValuesAmount(response.data.results);

      let datasetsOne = {
        label: "Monto Vendido",
        data: valuesAmount,
        backgroundColor: "rgba(44, 175, 254,1)",
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      };

      setEjecutiveGoals({
        labels,
        datasets: [datasetsOne],
      });

      setTotalResults(response.data.count);

      setIsFetching(false);
    } catch (error) {
      alert("Error al obtener los datos");
      setIsFetching(false);
      console.log(error);
    }
  };

  const getGoalsGroup = async () => {
    try {
      setIsFetching(true);
      let query = {
        goal: {
          goalnameId: typeDataChart.id,
          goaltype: {
            name: "Individual",
          },
        },
        ejecutive: {
          groupId: groupId,
        },
        initialperiodate: {
          $gte: startDate,
        },
        // finalperiodate: {
        //   $lte: finishDate,
        // },
      };

      let params = {
        include: "goal,goal.goaltype,goal.goalname,ejecutive",
        order: orderBy.value,
        where: JSON.stringify(query),
        count: 1,
      };
      const response = await api.get(`ejecutivesgoals`, { params });
      setTotalResults(response.data.count);

      let [valuesProgress, valuesGoals, labels] = normalizeValues(response.data.results);

      let datasetsOne = {
        label: "Progreso",
        data: valuesProgress,
        backgroundColor: "rgba(84, 79, 197, 1)",
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      };

      let datasetsTwo = {
        label: "Meta",
        data: valuesGoals,
        backgroundColor: "rgba(44, 175, 254,1)",
        barPercentage: 0.5,
        categoryPercentage: 1.0,
      };

      setEjecutiveGoals({
        labels,
        datasets: [datasetsOne, datasetsTwo],
      });
      setIsFetching(false);
    } catch (error) {
      console.log(error);
      setError(true);
      setIsFetching(false);
    }
  };

  const getGoalsNames = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      const response = await api.get(`goalnames`, { params });

      let values = [...response.data.results];

      values.unshift({
        id: "montovendido",
        name: "Monto Vendido ",
        socketcode: "CobDC",
        system: true,
        identifier: "percentage",
        createdAt: "2022-08-03T17:08:16.554Z",
        updatedAt: "2022-08-03T17:08:16.554Z",
        companyId: "qgOItY3xVi0PPremG27S3btf",
      });
      setGoalsNames(values);
    } catch (error) {}
  };

  const normalizeValues = ejecutives => {
    let valuesProgress = [];
    let valuesGoals = [];
    let labels = [];

    ejecutives.map(item => {
      valuesProgress.push(item?.progress);
      valuesGoals.push(item.finalgoal);
      labels.push(item?.ejecutive?.username);
    });

    console.log(labels);

    return [valuesProgress, valuesGoals, labels];
  };

  const normalizeValuesAmount = ejecutives => {
    let valuesAmount = [];
    let labels = [];

    ejecutives.map(item => {
      valuesAmount.push(item?.totalAmount);
      labels.push(item?.username);
    });

    return [valuesAmount, labels];
  };

  return {
    ejecutiveGoalsData,
    goalsNames,
    isFetching,
    orderBy,
    setTypeDataChart,
    typeDataChart,
    handleGetData,
    totalResults,
    setOrderBy,
  };
};

export default useGoalsGroup;
