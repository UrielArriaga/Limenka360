import { Grid } from "@material-ui/core";
import Select from "react-select";
import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs from "dayjs";
import { useState,  } from "react";
import { LayoutReport } from "./styles";
import TableReports from "./components/TableReportsEjecutves";
import Graphics from "./components/GraphicsGeneral";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import {Heads} from './hooks/useHeads'
import {Limits} from './hooks/useOptions'
import {filteroptions} from './hooks/useOptions'
import {optionsOportunities} from './hooks/useOptions'
import {optionsProspects} from './hooks/useOptions'
import {optionsSales} from './hooks/useOptions'
import useRequest from './services/Request'




export default function ReportsExecutives() {


  const [optionsSelect, SetOptionsSelect] = useState([]);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const {
    setFinishDate,
    setStartDate,
    SetLimit,
    setPage,
    setSearchBy,
    SetOptions,
    handleRequest,
    finishDate, 
    startDate, 
    page,
    searchBy,
    dataReport,
    options, 
    count,
    isLoading,
    totals,
    labels
    
  } = useRequest();



  const handleOnChangeSelect = e => {
    setSearchBy(e.value);
    handleRequest(e.value);
    SetLimit(e.value);
    setPage(1);
  };


   const handleOnChangeDate = (date, type) => {
    if (finishDate <= startDate) {
      handleAlert("warning", "Selecciona otra fecha, la fecha de termino no puede ser mayor!", "basic");
    } else {
      let newDate = dayjs(date).format();
      if (type === "start") {
        setStartDate(newDate);
        return;
      }
      setFinishDate(newDate);
    }
  };

 
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };




  const HandleOnChangeOptions = value => {
    switch (value) {
      case "oportunities":
        SetOptionsSelect(optionsOportunities);
        break;
      case "prospects":
        SetOptionsSelect(optionsProspects);
        break;
      case "sales":
        SetOptionsSelect(optionsSales);
        break;
    }
  };

  const handleOnChangeSelectOptions = e => {
    HandleOnChangeOptions(e.value);
    SetOptions(e.value);
    setPage(1);
  };



  const handleOnChangeSelectLimit = e => {
    SetLimit(e.value);
    setPage(1);
  };


  const handleChange = (event, value) => {
    setPage(value);
  };

  


  return (
    <LayoutReport>
      {/* <NavBarDashboard /> */}
      <Grid className="filters" container={true}>
        <Grid className="filters__selects" item={true} md={6}>
          <Select
            className="select"
            placeholder={"Seleccionar una opcion"}
            options={filteroptions}
            onChange={e => handleOnChangeSelectOptions(e)}
            noOptionsMessage={() => "Sin Opciones"}
          />
          <Select
            className="select"
            options={optionsSelect}
            placeholder={"Seleccionar una opcion"}
            value={options}
            onChange={e => handleOnChangeSelect(e)}
            noOptionsMessage={() => "Sin Opciones"}
          />
        </Grid>
        <Grid item={true} md={6} className="filters__dates">
          <KeyboardDatePicker
            disableToolbar
            format="DD-MM-YYYY"
            views={["year", "month", "date"]}
            margin="normal"
            id="date-picker-inline"
            className="input_date"
            value={startDate}
            InputProps={{ disableUnderline: true, readOnly: true }}
            onChange={date => handleOnChangeDate(date, "start")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
          <KeyboardDatePicker
            disableToolbar
            format="DD-MM-YYYY"
            views={["year", "month", "date"]}
            margin="normal"
            id="date-picker-inline"
            className="input_date"
            value={finishDate}
            InputProps={{ disableUnderline: true, readOnly: true }}
            onChange={date => handleOnChangeDate(date, "finish")}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </Grid>
        <Grid item={true} md={12} className="filters__options_show">
          <label className="title">Mostrar</label>
          <Select
            className="options"
            placeholder={"Seleccionar una opcion"}
            options={Limits}
            defaultValue={Limits[0]}
            onChange={e => handleOnChangeSelectLimit(e)}
          />
        </Grid>
      </Grid>
      <Grid className="section_reports" container={true}>
        <Grid className="table reports" item={true} md={6}>
          <TableReports
            isLoading={isLoading}
            type={searchBy}
            heads={Heads(searchBy)}
            data={dataReport}
            secondaryColor="#dce1f6"
            primaryColor="#405189"
            page={page}
            count={count}
            handleChange={handleChange}
          />
        </Grid>
        <Grid className="table graphics" item={true} md={6}>
          <Graphics
            type={"doughnut"}
            title={"Prospectos por ejecutivo"}
            datalabels={labels}
            graphicsData={totals}
            isLoading={isLoading}
          />
        </Grid>
      </Grid>
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </LayoutReport>
  );
}
