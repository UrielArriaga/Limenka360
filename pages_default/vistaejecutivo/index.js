import { Box, Button, colors, Grid } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DashboardEjecutiveCalendary from "../../components/DashboardEjecutiveCalendary";
import DashboardEjecutiveClients from "../../components/DashboardEjecutiveClients";
import DashboardClients from "../../components/DashboardEjecutiveClientsGraph";
import DashboardOportunities from "../../components/DashboardEjecutiveOportunities";
import DashboardEjecutivePendings from "../../components/DashboardEjecutivePendings";
import DashboardProspects from "../../components/DashboardEjecutiveProspects";
import SideBarCustomExecutive from "../../components/SideBar/SideBarCustomExecutive";
import CardsExecutive from "../../components/UI/organism/CardsExecutive";

import useFetch from "../../hooks/useFetch";
import { dashboardViewExecutiveSelector } from "../../redux/slices/dashboardViewExecutiveSlice";
import RequestCommon from "../../services/request_Common";
import { VistaEjecutivoStyled } from "../../styles/VistaEjecutivo";
import { toUpperCaseChart } from "../../utils";
import MainLayout from "../../components/MainLayout";
import MainLayoutEjecutive from "../../components/MainLayoutEjecutive";

export default function VistaEjecutivo() {
  const router = useRouter();
  const dispatch = useDispatch();
  const commonApi = new RequestCommon();

  const [isShowingAlert, setIsShowingAlert] = useState(true);
  const [actions, setActions] = useState([]);
  const [typePendings, setTypePendings] = useState([]);

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
  const [showIsChanginProfile, setShowIsChanginProfile] = useState(false);
  const { userDataExecutive, id_executive, isFetchingData } = useSelector(dashboardViewExecutiveSelector);

  useEffect(() => {
    if (isFetchingData) return;
    // dispatch(setGlobalExecutive({ id_user: router.query.id, userData: executive }));
  }, [isFetchingData]);

  // useEffect(() => {
  //   try {
  //     if (router.query.id) {
  //       let queryProspectsExecutive = {
  //         isclient: false,
  //         isoportunity: false,
  //         ejecutiveId: router.query.id,
  //       };

  //       let paramsProspectsExecutive = {
  //         where: JSON.stringify(queryProspectsExecutive),
  //         count: 1,
  //         limit: 0,
  //       };

  //       dispatch(getCountProspect({ params: paramsProspectsExecutive }));

  //       let queryOportunitiesExecutive = {
  //         isoportunity: true,
  //         ejecutiveId: router.query.id,
  //         isclient: false,
  //       };

  //       let paramsOportunitiesExecutive = {
  //         where: JSON.stringify(queryOportunitiesExecutive),
  //         count: 1,
  //         limit: 0,
  //       };

  //       dispatch(getCountOportunities({ params: paramsOportunitiesExecutive }));

  //       let queryCustomersExecutive = {
  //         isclient: true,
  //         ejecutiveId: router.query.id,
  //       };

  //       let paramsCustomersExecutive = {
  //         where: JSON.stringify(queryCustomersExecutive),
  //         count: 1,
  //         limit: 0,
  //       };

  //       dispatch(getCountCustomers({ params: paramsCustomersExecutive }));
  //       dispatch(getCountClientes({ params: paramsCustomersExecutive }));

  //       let queryPaymentsExecutive = {
  //         ispaid: false,
  //         oportunity: {
  //           prospect: {
  //             ejecutiveId: router.query.id,
  //           },
  //         },
  //       };
  //       let paramsPaymentsExecutive = {
  //         where: JSON.stringify(queryPaymentsExecutive),
  //         count: 1,
  //         limit: 0,
  //         include: "oportunity,oportunity.prospect",
  //         join: "oportunity,oportunity.prospect",
  //         showejecutive: 1,
  //       };
  //       dispatch(getPayments({ params: paramsPaymentsExecutive }));
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [router.id]);

  useEffect(() => {
    setTimeout(() => {
      setIsShowingAlert(false);
    }, [6000]);
  }, []);

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

  if (isFetchingData) {
    return <div>Cargando datos usuario</div>;
  }
  return (
    <MainLayoutEjecutive>
      <VistaEjecutivoStyled>
        {isShowingAlert && (
          <div className="alert">
            <p>Estas ahora en el dashboard {toUpperCaseChart(userDataExecutive?.fullname)}</p>
          </div>
        )}
        <Head>
          <title>CRM JOBS - Dashboard Ejecutivo</title>
        </Head>
        {/* <SideBarCustomExecutive open={true} setOpen={() => {}} /> */}
        <div className="main">
          <div className="top">
            <div className="welcome">
              <h4>Está viendo al ejecutivo: {toUpperCaseChart(userDataExecutive?.fullname)}</h4>
            </div>

            <div className="actions">
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
              <p className="divider-date">-</p>
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
            </div>
          </div>
          <Divider h={20} w={0} />
          <div className="cards">
            <CardsExecutive startDate={startDate} finishDate={finishDate} id_executive={id_executive} type="manager" />
          </div>

          <div className="main__ctr_dashboard">
            <Box mt={4}></Box>
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <DashboardEjecutiveCalendary
                  type="manager"
                  handleAlert={handleAlert}
                  setFlag={() => setflagPendings(!flagPendings)}
                  actions={actions}
                  id_executive={id_executive}
                />
              </Grid>
              <Grid item xs={12} md={3}>
                <DashboardEjecutiveClients type="manager" id_executive={userDataExecutive?.id} />
              </Grid>
            </Grid>
            <DashboardEjecutivePendings
              typePendings={typePendings}
              handleAlert={handleAlert}
              type="manager"
              id_executive={userDataExecutive?.id}
            />
            <div style={{ height: "15px" }}></div>
            <DashboardClients handleAlert={handleAlert} type="manager" id_executive={userDataExecutive?.id} />
            <div style={{ height: "15px" }}></div>
            <DashboardProspects handleAlert={handleAlert} type="manager" id_executive={userDataExecutive?.id} />
            <div style={{ height: "15px" }}></div>
            <DashboardOportunities handleAlert={handleAlert} type="manager" id_executive={userDataExecutive?.id} />
          </div>
        </div>
      </VistaEjecutivoStyled>
    </MainLayoutEjecutive>
  );
}

export const Divider = styled.div`
  width: ${props => (props.w ? `${props.w}px` : "0px")};

  height: ${props => (props.h ? `${props.h}px` : "0px")};

  background-color: ${props => (props.bg ? `${props.bg}` : "transparent")};
`;
