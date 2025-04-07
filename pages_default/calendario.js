import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AlertGlobal from "../components/Alerts/AlertGlobal";
import NavBarDashboard from "../components/NavBarDashboard";
import SideBar from "../components/SideBar";
import { dialogSelector } from "../redux/slices/dialogSlice";
import { userSelector } from "../redux/slices/userSlice";
import { customWidth } from "../styles/global.styles";
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
import Calendary from "../components/Calendary";
import RequestCommon from "../services/request_Common";
import DashboardEjecutivePendings from "../components/DashboardEjecutivePendings";
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

const Dashboard = () => {
  // *¨limpieza de estados
  const router = useRouter();
  const { name } = useSelector(userSelector);
  const commonApi = new RequestCommon();
  const [typePendings, setTypePendings] = useState([]);
  const [actions, setActions] = useState([]);
  const { openMenuSide } = useSelector(dialogSelector);
  const [open, setOpen] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  useEffect(() => {
    getActions();
    getTypePendings();
  }, []);

  // ? fin

  const getActions = async () => {
    try {
      let actions = await commonApi.getActions();
      setActions(actions.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getTypePendings = async () => {
    try {
      let type = await commonApi.getTypePendings();
      setTypePendings(type.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <DashboardStyled isOpen={openMenuSide}>
      <Head>
        <title>CRM JOBS - Calendario</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="main__ctr_dashboard">
          <Grid container spacing={2}>
            {/* <Grid item xs={12} md={3}>
              <DashboardEjecutiveClients />
            </Grid> */}
            <Grid item xs={12} md={12}>
              <Calendary handleAlert={handleAlert} setFlag={() => setflagPendings(!flagPendings)} actions={actions} />
            </Grid>
            <Grid item xs={12} md={12}>
              <DashboardEjecutivePendings typePendings={typePendings} handleAlert={handleAlert} />
            </Grid>
            <Grid item xs={12} md={12}></Grid>
            <Grid item xs={12} md={12}></Grid>
          </Grid>
        </div>
      </div>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </DashboardStyled>
  );
};

export default Dashboard;

const DashboardStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    ${customWidth}
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;
    overflow-x: hidden;
    &__ctr_dashboard {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      border-radius: 10px;
      /* padding: 25px 20px;
      background: #fff; */
      &__welcome {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        p {
          font-size: 24px;
          color: #fff;
          font-weight: bold;
        }
        .hello {
          font-size: 18px;
          margin-left: 5px;
          color: #fff;
        }
      }
    }
  }
`;
