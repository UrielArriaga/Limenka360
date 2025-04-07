import React, { useState, useEffect } from "react";
import { Contenedor } from "../styles/micuenta.js";
import { Person, Business, ArrowBackRounded } from "@material-ui/icons";
import { Button, Grid } from "@material-ui/core";
import { api } from "../services/api.js";
import { useSelector } from "react-redux";
import { userSelector } from "../redux/slices/userSlice";
import AlertGlobal from "../components/Alerts/AlertGlobal.js";
import { handleAlert } from "../utils/index.js";
import AccountEjecutives from "../components/AccountEjecutives/index.js";
import AccountCompany from "../components/AccountCompany/index.js";
import Head from "next/head.js";
import LoaderPage from "../components/LoaderPage";
import useValidateLogin from "../hooks/useValidateLogin";
import MainLayout from "../components/MainLayout/index.js";

export default function Micuenta() {
  const { company } = useSelector(userSelector);
  const [selectView, setSelectView] = useState(1);
  const [dataCompanies, setDataCompanies] = useState(null);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [loadingCancel, setloadingCancel] = useState(false);
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo", "Admin_compania", "admin"]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    if (loadingCancel) {
      return;
    }
    try {
      setloadingCancel(true);
      console.log("company:", company);
      let companies = await api.get(`companies/${company}`);
      setDataCompanies(companies.data);
    } catch (error) {
      console.error("executive data not obtained", error);
    } finally {
      setloadingCancel(false);
    }
  };

  const alert = (type, label) => {
    handleAlert(type, label, "basic", setAlert);
  };

  const view = () => {
    switch (selectView) {
      case 1:
        return <AccountEjecutives alert={alert} />;
      case 2:
        return (
          <AccountCompany
            dataCompanies={dataCompanies}
            getData={getData}
            setSelectView={setSelectView}
            handleAlert={handleAlert}
            setAlert={setAlert}
            loadingCancel={loadingCancel}
          />
        );
      default:
        break;
    }
  };

  if (isLoadingPage) return <LoaderPage />;

  return (
    <MainLayout>
      <Contenedor>
        <Head>
          <title>CRM JOBS - Mi Cuenta</title>
        </Head>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
        <div className="box">
          <div className="contenido">
            <div className="title">
              <button className="title__button" onClick={() => window.history.back()}>
                <ArrowBackRounded />
              </button>
              <p className="title__text">Mi cuenta </p>
            </div>
            <Grid container className="box--blue" spacing={2}>
              <Grid item md={6} className="item">
                <ViewButton
                  selectView={selectView}
                  setSelectView={setSelectView}
                  n={1}
                  icon={<Person />}
                  text="Datos ejecutivo"
                  getData={getData}
                />
              </Grid>
              <Grid item md={6} className="item">
                <ViewButton
                  selectView={selectView}
                  setSelectView={setSelectView}
                  n={2}
                  icon={<Business />}
                  text="Datos empresa"
                  getData={getData}
                />
              </Grid>
            </Grid>
            {view()}
          </div>
        </div>
      </Contenedor>
    </MainLayout>
  );
}

const ViewButton = function (props) {
  const select = () => {
    props.getData();
    props.setSelectView(props.n);
  };

  return (
    <Button
      className="button"
      onClick={() => select()}
      size="small"
      variant={props.selectView == props.n ? "contained" : "outlined"}
      color={props.selectView == props.n ? "primary" : "default"}
      startIcon={props.icon}
    >
      {props.text}
    </Button>
  );
};
