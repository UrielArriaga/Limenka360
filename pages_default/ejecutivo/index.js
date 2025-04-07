import React, { useEffect, useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { Add, DashboardOutlined, PanTool } from "@material-ui/icons";
import { motion } from "framer-motion";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import styled from "styled-components";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import NavBarDashboard from "../../components/NavBarDashboard";
import SideBar from "../../components/SideBar";
import { dialogSelector } from "../../redux/slices/dialogSlice";
import { userSelector } from "../../redux/slices/userSlice";
import { colors, customWidth } from "../../styles/global.styles";
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
import DashboardEjecutiveCalendary from "../../components/DashboardEjecutiveCalendary";
import DashboardEjecutiveClients from "../../components/DashboardEjecutiveClients";
import DashboardEjecutivePendings from "../../components/DashboardEjecutivePendings";
import RequestCommon from "../../services/request_Common";
import EjecutiveTargets from "../../components/DashboardEjecutiveTargets";
import DashboardProspects from "../../components/DashboardEjecutiveProspects";
import DashboardClients from "../../components/DashboardEjecutiveClientsGraph";
import DashboardOportunities from "../../components/DashboardEjecutiveOportunities";
import { Box } from "@mui/material";
import Limenka from "../../components/ModalLimenka";
import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import { toUpperCaseChart } from "../../utils";
import CardsExecutive from "../../components/UI/organism/CardsExecutive";
import MainLayout from "../../components/MainLayout";
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

  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const handleOnChangeDate = (date, type) => {
    let newDate = dayjs(date).format();
    if (type === "start") {
      setStartDate(newDate);
      return;
    }

    setFinishDate(newDate);
  };

  return (
    <MainLayout>
      <DashboardStyled isOpen={openMenuSide}>
        <Head>
          <title>CRM JOBS - Dashboard Ejecutivo</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <Container className="main">
          <Grid container={true} className="top">
            <Grid item={true} md={6}>
              <div className="welcome">
                <h3>Hola, {toUpperCaseChart(name)}</h3>
                <p>Bienvenid@ a limenka360 </p>
              </div>
            </Grid>
            <Grid item={true} md={6}>
              <Grid container={true} className="actions">
                <Grid item={true} md={9} className="actions__dates">
                  <Grid container={true} className="contaier_dates">
                    <Grid item={true} md={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="DD-MM-YYYY"
                        views={["year", "month", "date"]}
                        margin="normal"
                        id="date-picker-inline"
                        className="inputdate inputdate_lte"
                        value={startDate}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        onChange={date => handleOnChangeDate(date, "start")}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                    <Grid item={true} md={6}>
                      <KeyboardDatePicker
                        disableToolbar
                        format="DD-MM-YYYY"
                        views={["year", "month", "date"]}
                        margin="normal"
                        id="date-picker-inline"
                        className="inputdate inputdate_lte"
                        value={finishDate}
                        InputProps={{ disableUnderline: true, readOnly: true }}
                        onChange={date => handleOnChangeDate(date, "finish")}
                        KeyboardButtonProps={{
                          "aria-label": "change date",
                        }}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item={true} md={3} className="actions__buttonGoal">
                  <Button className="btn_add" onClick={() => router.push("/herramientas/metas")}>
                    <Add />
                    Agregar Nueva Meta
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Divider h={20} w={0} />
          <div className="cards">
            <CardsExecutive startDate={startDate} finishDate={finishDate} type="ejecutive" />
          </div>

          <div className="main__ctr_dashboard">
            <Box mt={4}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <DashboardEjecutiveCalendary
                  type="ejecutive"
                  handleAlert={handleAlert}
                  setFlag={() => setflagPendings(!flagPendings)}
                  actions={actions}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardEjecutiveClients type="ejecutive" />
              </Grid>
            </Grid>
            <DashboardEjecutivePendings typePendings={typePendings} handleAlert={handleAlert} type="ejecutive" />
            <div style={{ height: "15px" }}></div>
            <DashboardClients handleAlert={handleAlert} type="ejecutive" />
            <div style={{ height: "15px" }}></div>
            <DashboardProspects handleAlert={handleAlert} type="ejecutive" />
            <div style={{ height: "15px" }}></div>
            <DashboardOportunities handleAlert={handleAlert} type="ejecutive" />
          </div>
        </Container>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </DashboardStyled>
    </MainLayout>
  );
};

export default Dashboard;

const DashboardStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100vh;
  background-size: cover;
  /* * {
    margin: 0;
  } */
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
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
        flex-direction: column;
        margin-bottom: 10px;
        &__title_page {
          display: flex;
          align-items: center;
          font-weight: bold;
          svg {
            background-color: ${colors.primaryColor};
            border-radius: 50%;
            padding: 5px;
            font-size: 36px;
            margin-right: 5px;
          }
        }
        &__title_name {
          display: flex;
          margin-left: 30px;
          p {
            font-size: 24px;
            font-weight: bold;
            text-transform: capitalize;
          }
          .hello {
            font-size: 18px;
            margin-left: 5px;
          }
        }
      }
    }
  }
`;

export const Container = styled.div`
  overflow-y: auto;
  padding: 10px;
  .top {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    /* padding: 10px 10px 0 10px; */
  }
  .top .welcome {
    h3 {
      font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
      font-size: 22px;
      font-weight: bold;
    }
    p {
      color: #616161;
      font-size: 14px;
    }
  }

  .actions {
    display: flex;
    align-items: center;
    &__dates {
      .contaier_dates {
        .inputdate {
          margin: 5px;
          height: 30px;
          width: 100%;
          border-radius: 2px;
          background-color: #ffff;
          box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        }
      }
    }
    &__buttonGoal {
      .btn_add {
        height: 30px;
        background-color: #3aade6;
        color: #fff;
        width: 100%;
        text-transform: capitalize;
        font-size: 14px;
        white-space: nowrap;
      }
    }

    .divider-date {
      margin-right: 4px;
    }
  }

  .cards {
    /* padding: 10px 10px 0 10px; */
  }
  .ejecutives {
  }
`;
export const Divider = styled.div`
  width: ${props => (props.w ? `${props.w}px` : "0px")};

  height: ${props => (props.h ? `${props.h}px` : "0px")};

  background-color: ${props => (props.bg ? `${props.bg}` : "transparent")};
`;
