import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { normalizeExecutives } from "../../../../utils/normalizeData";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import RequestCommon from "../../../../services/request_Common";
import { getDataDay, getDataDaysMonth, getDataDaysWeek } from "../../../../utils";
// import TableCustom from "../../../../components/TableCustom";
import { Grid, LinearProgress, Button, Chip, TextField, Tooltip } from "@material-ui/core";
import { Close, SearchOutlined, FilterList, People, Cached } from "@material-ui/icons";
import { ExecutivesStyled } from "./styles";
import { DrawerContainer } from "../../../../styles/Propectos";
import { useRouter } from "next/router";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FormatOptionLabel } from "../../../../redux/slices/reactSelect";
import Select from "react-select";
import TableCustomColors from "../../../TableCustomColors";
import axios from "axios";

export default function AdminActivities() {
  const { company } = useSelector(userSelector);
  const [dataExecutives, setDastaExecutives] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [flag, setFlag] = useState(false);
  const [totalExecutives, setTotalExecutives] = useState(0);
  const [showDrawer, setshowDrawer] = useState(false);
  const [ejecutives] = useState([]);
  const [ejecutive, setEjecutive] = useState("");
  const [groups] = useState([]);
  const [group, setgroup] = useState("");

  const { open, toggleModal } = useModal();
  const [dataToDowloand, setDataToDowloand] = useState({});

  const [period, setPeriod] = useState(localStorage.getItem("admin-executives") || "day");
  const [newDate] = useState(new Date());
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [showChips, setShowChips] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [totals, setTotals] = useState({ Leads: 0, cotizado: 0, ventas: 0 });
  const router = useRouter();

  useEffect(() => {
    const getExecutives = async () => {
      try {
        setIsLoading(true);
        let finalDates = [];

        switch (period) {
          case "day":
            finalDates = [dayjs(newDate).startOf("day").format(), dayjs(newDate).endOf("day").format()];
            break;
          case "week":
            finalDates = [dayjs(newDate).startOf("week").format(), dayjs(newDate).endOf("week").format()];
            break;
          case "month":
            finalDates = [dayjs(newDate).startOf("month").format(), dayjs(newDate).endOf("month").format()];
            break;
          case "range":
            if (startDate > finishDate) {
              handleAlert(
                "warning",
                "La fecha de termino no puede ser menor que la de inicio, cambia la fecha!",
                "basic"
              );
              setIsLoading(false);
            } else {
              finalDates = [startDate, finishDate];
            }
            break;
          default:
            break;
        }

        let sumres = await api.get(`summary/summaryexecutive?start_date=${finalDates[0]}&end_date=${finalDates[1]}`);

        let newActivities = normalizeExecutives(sumres.data.results);

        console.log(newActivities);
        setDastaExecutives(newActivities);
        setTotals(newActivities[0]);
        setTotalExecutives(sumres.data.results.length);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        alert("Error al cargar los ejecutivos");
        setIsLoading(false);
      }
    };
    getExecutives();
    localStorage.setItem("admin-executives", period.toString());
  }, [flag, startDate, finishDate, period]);

  useEffect(() => {}, [dataExecutives]);

  const handleOnChangeDate = (date, type) => {
    let newDate = dayjs(date).format();
    if (type === "start") {
      setStartDate(newDate);
      return;
    }
    setFinishDate(newDate);
  };

  const handleLocalStorage = e => {
    setPeriod(e.target.value);
    setIsLoading(true);
  };

  const handleAction = item => {
    alert(`Aún en construcción ${JSON.stringify(item)}`);
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 5000);
  };
  const handleSelectEjecutive = item => {
    let eje = {
      id: item.id,
      name: item.name,
      lastname: item.lastname,
      type: "Ejecutivo",
    };

    item !== "" ? setEjecutive(eje) : setEjecutive({});
  };

  const handleSelectGroup = item => {
    let eje = {
      id: item.id,
      name: item.name,
      type: "Grupo",
    };

    item !== "" ? setgroup(eje) : setgroup({});
  };

  const handleCloseDrawer = () => {
    setshowDrawer(!showDrawer);
  };

  const handleFilter = () => {
    setPage(1);
    setShowChips(true);
    setFlag(!flag);
    handleCloseDrawer();
  };

  const removeTypeEjecutive = () => {
    setPage(1);
    setEjecutive("");
    setFlag(!flag);
  };

  const removeTypeGroup = () => {
    setPage(1);
    setgroup("");
    setFlag(!flag);
  };

  const Chips = () => {
    if (showChips) {
      return (
        <div>
          {ejecutive !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeTypeEjecutive}
              label={`${"Ejecutivo"}: ${ejecutive.name} ${ejecutive.lastname}`}
              className="chip"
            />
          )}
          {group !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeTypeGroup}
              label={`${"Grupo"}: ${group.name}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  const handleExportData = async () => {
    try {
      let finalDates = [];

      switch (period) {
        case "day":
          finalDates = [dayjs(newDate).startOf("day").format(), dayjs(newDate).endOf("day").format()];
          break;
        case "week":
          finalDates = [dayjs(newDate).startOf("week").format(), dayjs(newDate).endOf("week").format()];
          break;
        case "month":
          finalDates = [dayjs(newDate).startOf("month").format(), dayjs(newDate).endOf("month").format()];
          break;
        case "range":
          if (startDate > finishDate) {
            handleAlert(
              "warning",
              "La fecha de termino no puede ser menor que la de inicio, cambia la fecha!",
              "basic"
            );
            setIsLoading(false);
          } else {
            finalDates = [startDate, finishDate];
          }
          break;
        default:
          break;
      }

      let resp = await api.post("convert/reportleadscloud", {
        startDate: finalDates[0],
        endDate: finalDates[1],
        companyId: company,
      });

      toggleModal();

      setDataToDowloand({
        url: resp.data.url,
      });
      // let file = await axios.get(resp.data.url, { responseType: "blob" });
      // const url = window.URL.createObjectURL(new Blob([file.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "reporte-leads.xlsx");
      // document.body.appendChild(link);
      // link.click();

      // window?.URL?.revokeObjectURL(url);

      console.log(resp);
    } catch (error) {
      console.log(error);
      // showError("Ocurrio un problema al generar el documento");
      handleAlert("error", "Ocurrio un problema al generar el documento", "basic");
    }
  };

  return (
    <ExecutivesStyled>
      <Grid className="container_executives">
        <div className="rowheader">
          <div className="col1">
            <h1 className={``}>Ejecutivos</h1>
            <p className="total">
              {/* <People />
              {`${totalExecutives} Registros`}
              <Tooltip arrow title="Recargar" placement="right">
                <Cached
                  className="reload"
                  onClick={() => {
                    setFlag(!flag);
                  }}
                />
              </Tooltip> */}
            </p>
          </div>

          <div className="colactions">
            <Button className="buttonexport" onClick={() => handleExportData()}>
              Exportar Datos
            </Button>
          </div>
        </div>

        {/* {Chips()} */}
        <Grid className="filter">
          {period == "range" && (
            <div className="filter__range">
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
          )}

          <div className="filter__date">
            <label>Periodo</label>
            <select className="filter__period" onChange={e => handleLocalStorage(e)} value={period}>
              <option value="day" name="Hoy">
                Hoy
              </option>
              <option value="week" name="Semana">
                Semana
              </option>
              <option value="month" name="Mes">
                Mes
              </option>
              <option value="range" name="Mes">
                Rango de fechas
              </option>
            </select>
          </div>
        </Grid>
        {/* 
        <Button className="buttonexport" onClick={() => handleExportData()}>
          Exportar Datos
        </Button> */}
        {/* {isLoading ? (
          <div className="ctr_load">
            <div className="ctr_load__img">
              <img src="/load.png" />
            </div>
            <div className="ctr_load__load">
              <p>Cargando</p>
              <LinearProgress color="primary" />
            </div>
          </div>
        ) : (
          <>
            <TableCustomColors
              heads={[
                "nombre",
                "LeadsAnteriores",
                "LeadsMensual",
                "TotalLeads",
                "OportunidadesAnteriores",
                "OportunidadesMensual",
                "Oportunidades",
                "Clientes",
              ]}
              data={dataExecutives}
              identificador={"createdAt"}
              custom={false}
              selectmultiple={false}
              primaryColor={"#405189"}
              secondaryColor={"#dce1f6"}
              actionsPerItem={[{ title: "Ver información", action: item => handleAction(item) }]}
              firstTotal
              totals={totals}
            />
          </>
        )} */}
        <div className="pagination_ex">
          <div>{/* <p className="pagination_ex__total">{`Total: ${totalExecutives} `}</p> */}</div>
          <DrawerContainer
            anchor="right"
            open={showDrawer}
            onClose={() => {
              setshowDrawer(!showDrawer);
            }}
          >
            <div className="ctr_drawer">
              <div className="ctr_drawer__top">
                <p className="title">Filtra por tu preferencia</p>
                <Close className="close_icon" onClick={() => setshowDrawer(false)} />
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label">Ejecutivo</label>
                <Select
                  options={ejecutives}
                  onChange={e => (e === null ? handleSelectEjecutive("") : handleSelectEjecutive(e))}
                  value={ejecutives.filter(item => item.id === ejecutive?.id)}
                  placeholder="selecion un ejecutivo"
                  isClearable={true}
                  formatOptionLabel={FormatOptionLabel}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                />
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label"> Grupo</label>
                <Select
                  options={groups}
                  onChange={e => (e === null ? handleSelectGroup("") : handleSelectGroup(e))}
                  value={groups.filter(item => item.id === group?.id)}
                  placeholder="selecion un ejecutivo"
                  isClearable={true}
                  formatOptionLabel={FormatOptionLabel}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                />
              </div>
              <div className="ctr_drawer__ctr_buttons">
                <Button variant="contained" className="btn_cancel" onClick={handleCloseDrawer}>
                  Cancelar
                </Button>

                <Button variant="contained" className="btn_apply" onClick={() => handleFilter()}>
                  Aplicar
                </Button>
              </div>
            </div>
          </DrawerContainer>
        </div>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </Grid>

      <ModalShowLink dataToDowloand={dataToDowloand} open={open} close={toggleModal} toggle={toggleModal} />
    </ExecutivesStyled>
  );
}

import { CircularProgress, Dialog } from "@material-ui/core";
import { useDispatch } from "react-redux";
import useModal from "../../../../hooks/useModal";

function ModalShowLink({ open, close, toggle, dataToDowloand }) {
  const [loaderComplete, setLoaderComplete] = useState(false);
  const dispatch = useDispatch();

  const handleAddPottential = async () => {};
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogContainer>
        <div className="headerDialog">
          <p className="headerDialog__title">{"Generando archivo"}</p>
          {loaderComplete && <CircularProgress className="headerDialog__loader" />}
        </div>
        <Grid spacing={1} container className="ctr_inputs">
          <p className="title">
            El archivo estara listo en 1 a 5 minutos, porfavor espere y vuelva a intentar acceder al archivo
          </p>

          <a
            href={dataToDowloand?.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#448aff",
              fontSize: 20,
            }}
          >
            Ir a archivo
          </a>
        </Grid>
        <Grid container className="ctr_buttons">
          <Button
            disabled={loaderComplete}
            variant="contained"
            className={`btn_cancel ${loaderComplete && "disabled"}`}
            onClick={() => close()}
          >
            Cancelar
          </Button>
          <Button
            disabled={loaderComplete}
            variant="contained"
            className={`btn_upload ${loaderComplete && "disabled"}`}
            onClick={handleAddPottential}
          >
            Guardar
          </Button>
        </Grid>
      </DialogContainer>
    </Dialog>
  );
}

import styled from "styled-components";

const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  .headerDialog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0c203b;
    margin-bottom: 15px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.05em;
    }
    &__loader {
      color: #fff;
    }
  }
  .title {
    font-size: 18px;
    color: gray;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
      color: #4f4f4f;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      min-height: 36px;
      resize: none;
      padding: 0px 5px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
      color: #fff;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
  .ctr_slope {
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      span {
        color: #0c203b;
      }
    }
    &__item {
      width: 100%;
      .label {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 0.02em;
        color: #626262;
        svg {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 5px;
          color: #115293;
        }
      }
      .text {
        color: #000;
        font-weight: 600;
      }
      .span {
        color: #c7c7c7;
        font-size: 14px;
        font-weight: 500;
      }
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .btn_close {
        text-transform: capitalize;
        background-color: #000;
        color: #fff;
        margin-right: 10px;
      }
      .btn_complete {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }
`;
