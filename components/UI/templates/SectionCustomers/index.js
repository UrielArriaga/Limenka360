import React, { useEffect } from "react";
import { Close, FilterList } from "@material-ui/icons";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { useSelector } from "react-redux";
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
ChartJS.register(
  ArcElement,
  Legend,
  RadialLinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  LinearScale,
  PointElement,
  LineElement,
  Filler
);
import { dashboardManagerSelector } from "../../../../redux/slices/dashboardManager";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import RequestDashboard from "../../../../services/request_dashboard";
export default function SectionCustomers({ startDate, finishDate }) {
  const dashboardApi = new RequestDashboard();
  const { ejecutiveSelected } = useSelector(dashboardManagerSelector);
  const { id_user, groupId } = useSelector(userSelector);
  const [showFilters, setShowFilters] = useState(false);
  const [searchBy, setSearchBy] = useState("bysales");
  const [customers, setCustomers] = useState([]);
  const initalCount = { isLoading: true, total: 0, totalbefore: 0, succes: false, error: false };
  const [countProspects, setCountProspects] = useState(initalCount);
  const [countOportunities, setCountOportunities] = useState(initalCount);
  const [countPayments, setCounPayments] = useState(initalCount);
  const [dataSet, setDataSet] = useState(data);

  // * Handlers
  const handleClickFilter = value => {
    setShowFilters(value);
  };

  useEffect(() => {
    if (ejecutiveSelected !== null) {
      getProspectRequest();
      getOportunitiesRequest();
      getPaymentsRequest();
      generateDataSet();
    }
  }, [ejecutiveSelected]);

  useEffect(() => {
    generateDataSet();
  }, [countProspects]);

  const generateDataSet = (prospects, oportunities) => {
    let data = {};
    data.labels = ["Prospectos", "Oportunidades", "Ventas"];
    data.datasets = [];

    let dataSetCurrent = {
      label: `Resumen ${ejecutiveSelected?.name}`,
      data: [countProspects.total, countOportunities.total, countPayments.total],
      backgroundColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderWidth: 0,
    };
    let dataSetBefore = {
      label: `Resumen ${ejecutiveSelected?.name}`,
      data: [countProspects.totalbefore, countOportunities.total, countPayments.total],
      backgroundColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderWidth: 0,
    };

    data.datasets.push(dataSetCurrent);
    data.datasets.push(dataSetBefore);
    setDataSet(data);
    console.log(data);
  };

  const getProspectRequest = async () => {
    try {
      setCountProspects({ ...countProspects, isLoading: true });
      let totalProspects = await dashboardApi.getProspectRequestCount(startDate, finishDate, ejecutiveSelected, {});
      console.log(totalProspects);
      setCountProspects({
        ...countProspects,
        total: totalProspects.data?.count,
        totalbefore: totalProspects?.data?.countcustomdate,
        isLoading: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getOportunitiesRequest = async () => {
    try {
      setCountOportunities({ ...countOportunities, isLoading: true });
      let totalOportunities = await dashboardApi.getOportunitiesRequestCount(
        startDate,
        finishDate,
        ejecutiveSelected,
        {}
      );
      console.log(totalOportunities);
      setCountOportunities({ ...countOportunities, total: totalOportunities.data.count, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  const getPaymentsRequest = async () => {
    try {
      setCounPayments({ ...countPayments, isLoading: true });
      let totalOportunities = await dashboardApi.getCustomers(startDate, finishDate, ejecutiveSelected, {});
      console.log(totalOportunities);
      setCounPayments({ ...countPayments, isLoading: false, total: totalOportunities.data.count });
    } catch (error) {
      console.log(error);
    }
  };

  const getCustomersRequest = async () => {
    try {
      // query.goal = {};
      // query.initialperiodate = {
      //   $gte: startDate,
      //   $lte: finishDate,
      // };

      // query.or = [{ groupId: groupId }, { ejecutiveId: id_user }];

      // let params = {
      //   include: validateIncludes({}),
      //   join: validateJoins({}),
      //   where: JSON.stringify(query),
      //   limit: 20,
      //   count: "0",
      //   order: "-createdAt",
      //   skip: 1,
      // };

      let query = {
        isclient: true,
        ejecutive: {
          groupId,
        },
      };

      let params = {
        include: "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal",
        where: JSON.stringify(query),
        limit: 3,
        count: "1",

        // all: 1,
        // order: `${isOrderLast}${order}`,
        // skip: page,
        join: "cat,cy,ey,pe,ee,cy,on,ce,sy,pl",
      };
      let responseCustomers = await api.get("prospects", { params });
      console.log(responseCustomers);
      setCustomers(responseCustomers.data?.results);
      // setGoals(responseGoals.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnChangeSelect = () => {
    console.log("handleOnChangeSelect");
  };

  if (countProspects.isLoading === true) <div></div>;
  return (
    <EjecutiveComponent>
      <div className="top_customers">
        <h3>
          {ejecutiveSelected?.name} {ejecutiveSelected?.lastname}
        </h3>

        <div className="filter row">
          <FiltersContainer
            animate={{
              width: showFilters ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            <select name="" id="" onChange={e => handleOnChangeSelect(e)}>
              {optionsExecutives.map((item, index) => {
                return (
                  <option key={item.value} defaultValue={searchBy} value={item.value}>
                    {item.name}
                  </option>
                );
              })}
            </select>
          </FiltersContainer>
          {showFilters ? (
            <Close className="icon_filter" onClick={() => handleClickFilter(false)} />
          ) : (
            <FilterList className="icon_filter" onClick={() => handleClickFilter(true)} />
          )}
        </div>
      </div>
      <div className="cards">
        <div className="graph">
          <div className="pie">
            <Bar data={dataSet} />
          </div>
        </div>

        {/* {customers.map((item, index) => {
          return <CardCustomer key={item.id}>{item.email}</CardCustomer>;
        })} */}
      </div>
    </EjecutiveComponent>
  );
}

const data = {
  labels: ["Prospectos", "Oportunidades", "Ventas"],
  datasets: [
    {
      label: "Prospecto de x",
      data: [0, 0, 0],
      backgroundColor: ["#775ea6", "#70b5c0        ", "#ffb1b7"],
      borderColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderWidth: 1,
    },
  ],
};

const CardCustomer = styled.div`
  background-color: #fff;
  margin-bottom: 10px;
`;

const EjecutiveComponent = styled.div`
  background-color: #eeeeee;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  height: 380px;

  .cards {
    /* height: 180px; */

    display: flex;
    align-items: center;
    justify-content: center;
    height: 80%;
    width: 100%;
    background-color: #fff;
  }

  .graph {
    background-color: #fff;
    width: 100%;
  }

  .top_customers {
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: capitalize;
    .filter {
      select {
        /* background-color: red; */
        /* box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px; */
      }
      .icon_filter {
        margin-bottom: 8px;
      }
    }
  }

  /* //* GlobalStyles */

  .row {
    display: flex;
    align-items: center;
  }
  /* //* GlobalStyles */
  /* .container {
    &__top {
      display: flex;
      justify-content: space-between;
    }
    &__top .filter {
      display: flex;
      align-items: center;
      svg {
        cursor: pointer;
      }
    }
  }

  .container .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 100%;
  } */
`;

const FiltersContainer = styled(motion.div)`
  display: flex;
  select {
    border: none;
    height: 30px;
    width: 200px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 8px;
    /* border: 2px solid #cfd8dc; */
    background-color: #ffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:focus {
      outline: 1px solid green;
    }
  }
  /* .icon_filter {
    transition: all 1s ease-in-out;
  } */
`;

const optionsExecutives = [
  {
    value: "bysales",
    name: "Por monto de ventas",
  },
  {
    value: "byoportunities",
    name: "Por Oportunidades",
  },
  {
    value: "bygoals",
    name: "Por Metas",
  },
];
