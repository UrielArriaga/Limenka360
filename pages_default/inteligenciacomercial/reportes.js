import React, { useEffect, useState } from "react";
import Select from "react-select";
import Head from "next/head";
import dayjs from "dayjs";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import DatePicker, { registerLocale } from "react-datepicker";
import { commonSelector } from "../../redux/slices/commonSlice";
import { IconError, ReportSyle } from "../../styles/InteligenciaComercial/reports.style";
import SideBar from "../../components/SideBar";
import NavBarDashboard from "../../components/NavBarDashboard";
import { DatePickerEsFormat } from "../../utils";
import { api } from "../../services/api";
import { handleGlobalAlert } from "../../utils";
import "react-datepicker/dist/react-datepicker.css";
import MainLayout from "../../components/MainLayout";
registerLocale("es-MX", DatePickerEsFormat());
export default function Reporte() {
  const { groups } = useSelector(commonSelector);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [idGroup, setIdGroup] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [newGroups, setNewGroups] = useState([]);

  useEffect(() => {
    let array = [...groups.results];
    var newObj = { id: "0", name: "Todos los grupos" };
    array.unshift(newObj);
    setNewGroups(array);
  }, [groups]);

  const generateReport = async () => {
    if (!startDate || !endDate || !idGroup) {
      handleGlobalAlert("warning", "Ingrese todos los Datos", "basic", dispatch, 6000);
      return;
    }
    if (startDate > endDate) {
      handleGlobalAlert(
        "warning",
        "Fechas - La fecha de inicio no puede ser mayor que la de termino!",
        "basic",
        dispatch,
        6000
      );
      return;
    }
    setIsLoading(true);
    try {
      const bodyReport = {
        ...(idGroup !== "0" && { groupId: idGroup }),
        startDate: dayjs(startDate).startOf("day").format(),
        endDate: dayjs(endDate).endOf("day").format(),
        blob: false,
      };
      let response = await api.post(`convert/prospectsexcelblob`, bodyReport);
      setIsLoading(false);
      handleGlobalAlert("success", "Reporte Generado!", "basic", dispatch, 6000);
      cleanData();
      if (response.status === 200) window.open(response.data.url, "_blank");
    } catch (error) {
      setIsLoading(false);
      handleGlobalAlert("error", "Ocurrió un error al Generar el Reporte!", "basic", dispatch, 6000);
      console.log(error);
    }
  };
  const cleanData = () => {
    setStartDate("");
    setEndDate("");
    setIdGroup("");
  };
  return (
    <MainLayout>
      <ReportSyle>
        <Head>
          <title>CRM - Reportes</title>
        </Head>
        <div className="main">
          <div className="container_reports">
            <div className="container_reports__head">
              <p
                className="title_head"
                onClick={() => {
                  console.log("grupos", idGroup);
                  console.log("star", startDate);
                  console.log("end", endDate);
                }}
              >
                Generar Reportes
              </p>
            </div>
            <div className="container_reports__body">
              <Grid container spacing={1} className="item">
                <Grid item={true} md={4}>
                  <p>
                    Grupos
                    {!idGroup && <IconError />}
                  </p>
                  <Select
                    className="select"
                    value={newGroups.filter(item => item.id === idGroup)}
                    onChange={e => setIdGroup(e.id)}
                    placeholder="Selecciona una Opción"
                    options={newGroups}
                    getOptionLabel={option => option.name}
                    getOptionValue={option => option.id}
                  />
                </Grid>
                <Grid item={true} md={4}>
                  <p>Fecha de Inicio {!startDate && <IconError />}</p>
                  <DatePicker
                    className="calendar"
                    placeholderText="Selecciona una Fecha"
                    selected={startDate}
                    showIcon={true}
                    onChange={date => setStartDate(date)}
                    dateFormat={"dd/MM/yyyy"}
                    locale="es-MX"
                  />
                </Grid>
                <Grid item={true} md={4}>
                  <p>Fecha de Fin {!endDate && <IconError />} </p>
                  <DatePicker
                    className="calendar"
                    placeholderText="Selecciona una Fecha"
                    selected={endDate}
                    showIcon={true}
                    onChange={date => setEndDate(date)}
                    dateFormat={"dd/MM/yyyy"}
                    locale="es-MX"
                  />
                </Grid>
                <Grid item={true} md={12} className="buttons">
                  {isLoading ? (
                    <CircularProgress size={30} />
                  ) : (
                    <Button
                      disabled={!startDate || !endDate || !idGroup ? true : false}
                      className={!startDate || !endDate || !idGroup ? "button_disabled" : "button_report"}
                      onClick={() => generateReport()}
                    >
                      Generar Reporte
                    </Button>
                  )}
                </Grid>
              </Grid>
            </div>
            <div className="container_reports__footer"></div>
          </div>
        </div>
      </ReportSyle>
    </MainLayout>
  );
}
