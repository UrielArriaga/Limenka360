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
export default function SectionCustomersGraph({ startDate, finishDate }) {
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

  //* New states
  const [clientTypes, setclientTypes] = useState([]);
  const [countClients, setCountClients] = useState(0);
  // * Handlers
  const handleClickFilter = value => {
    setShowFilters(value);
  };

  useEffect(() => {
    getRequestClients();
  }, [countProspects]);

  const getRequestClients = async () => {
    try {
      let where = {
        ejecutive: {
          groupId: groupId,
        },
      };

      let params = {
        where: JSON.stringify(where),
        count: 1,
        order: "-totalProspects",
        limit: 3,
        // order:""
      };
      let res = await api("dashboard/clienttypeprospect", { params });
      setclientTypes(res.data.results);
      setCountClients(res.data?.count);
      generateDataSet(res.data.results);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const generateDataSet = arrayClients => {
    let data = {};
    data.labels = [];
    data.datasets = [];

    let valuesDataSet = [];
    let valuesLabels = [];

    for (let i = 0; i < arrayClients.length; i++) {
      const client = arrayClients[i];
      valuesLabels.push(client?.name);
      valuesDataSet.push(client?.totalProspects);
    }
    data.labels = valuesLabels;

    let dataSetCurrent = {
      label: `Resumen`,
      data: valuesDataSet,
      backgroundColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderColor: ["#775ea6", "#70b5c0", "#ffb1b7"],
      borderWidth: 0,
    };
    data.datasets.push(dataSetCurrent);

    setDataSet(data);
    console.log(data);
  };

  const getProspectRequest = async () => {
    try {
      setCountProspects({ ...countProspects, isLoading: true });
      let totalProspects = await dashboardApi.getProspectRequestCount(startDate, finishDate, ejecutiveSelected, {});
      setCountProspects({ ...countProspects, total: totalProspects.data?.count, isLoading: false });
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

  if (countProspects.isLoading === true) <div></div>;
  const handleOnChangeSelect = e => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <EjecutiveComponent>
      <div className="top_customers">
        <h3>Clientes por tipo</h3>

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

      <div className="total">
        <p>Total {countClients}</p>
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
