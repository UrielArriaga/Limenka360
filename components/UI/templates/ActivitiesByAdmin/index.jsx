import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { normalizeActivities } from "../../../../utils/normalizeData";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import RequestCommon from "../../../../services/request_Common";
import { getDataDay, getDataDaysMonth, getDataDaysWeek } from "../../../../utils";
import TableCustom from "../../../../components/TableCustom";
import { Grid, LinearProgress, Button, Chip, TextField, Tooltip } from "@material-ui/core";
import { Close, SearchOutlined, FilterList, People, Cached } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { TrackingsStyled } from "./styles";
import { DrawerContainer } from "../../../../styles/Propectos";
import { useRouter } from "next/router";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FormatOptionLabel } from "../../../../redux/slices/reactSelect";
import Select from "react-select";
import axios from "axios";
import useAlert from "../../../../hooks/useAlert";

export default function AdminActivities() {
  const router = useRouter();

  const [dataTrackins, setDastaTrakins] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const { roleId, groupId } = useSelector(userSelector);
  const { open, toggleModal } = useModal();
  const [dataToDowloand, setDataToDowloand] = useState({});

  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [totalTrakings, setTotalPTrakins] = useState(0);
  const [showDrawer, setshowDrawer] = useState(false);
  const [ejecutives, setEjecutives] = useState([]);
  const [groups, setgroups] = useState([]);

  const commonApi = new RequestCommon();
  const [newDate] = useState(new Date());
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());

  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingGroups, setLoadingGroups] = useState(true);

  const [period, setPeriod] = useState(localStorage.getItem("admin-period"));
  const [ejecutive, setEjecutive] = useState(JSON.parse(localStorage.getItem("admin-ejecutive")) || "");
  const [group, setgroup] = useState(JSON.parse(localStorage.getItem("admin-group")) || "");
  const [nameSearch, setNameSearch] = useState(
    localStorage.getItem("admin-nameSearch" != null || localStorage.getItem("admin-nameSearch") != undefined)
      ? localStorage.getItem("admin-nameSearch")
      : ""
  );
  const [showChips, setShowChips] = useState(
    localStorage.getItem("admin-ejecutive") ||
      localStorage.getItem("admin-group") ||
      localStorage.getItem("admin-nameSearch")
  );

  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });

  const { showError, showSuccess } = useAlert();
  useEffect(() => {
    getUsers();
    getGroups();
  }, []);

  useEffect(() => {
    gettrackings();
    localStorage.setItem("admin-period", period?.toString());
    localStorage.setItem("admin-ejecutive", JSON.stringify(ejecutive));
    localStorage.setItem("admin-group", JSON.stringify(group));
    localStorage.setItem("admin-nameSearch", nameSearch?.toString());
  }, [page, flag, startDate, finishDate, period]);

  const gettrackings = async () => {
    try {
      setIsLoading(true);
      let query = {};

      if (ejecutive.id) {
        query.createdbyId = ejecutive.id;
      }

      if (group.id) {
        query.prospect = { ejecutive: { groupId: group.id } };
      }

      if (nameSearch) {
        if (!query.prospect) {
          query.prospect = {};
        }
        query.prospect.fullname = { iRegexp: `${nameSearch?.toLocaleLowerCase()}` };
      }

      if (roleId == "gerente") {
        query.prospect = {
          ejecutive: {
            groupId: groupId,
          },
        };
      }
      switch (period) {
        case "day":
          query.createdAt = { between: [dayjs(newDate).startOf("day").format(), dayjs(newDate).endOf("day").format()] };
          break;
        case "week":
          query.createdAt = {
            between: [dayjs(newDate).startOf("week").format(), dayjs(newDate).endOf("week").format()],
          };
          break;
        case "month":
          query.createdAt = {
            between: [dayjs(newDate).startOf("month").format(), dayjs(newDate).endOf("month").format()],
          };
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
            query.createdAt = { between: [startDate, finishDate] };
          }
          break;
        default:
          break;
      }

      let params = {
        where: JSON.stringify(query),
        include: "prospect,prospect.ejecutive,action,ejecutive",
        limit: "10",
        skip: page,
        count: "1",
        order: "-createdAt",
      };

      let datatrackins = await api.get(`trackings`, { params });
      normalizeTrackins(datatrackins.data.results);
      setTotalPTrakins(datatrackins.data.count);
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoadingUsers(true);

      let params = {
        count: "1",
        order: "name",
        all: 1,
      };
      let EjecutivesResults = await api.get(`ejecutives`, { params });
      setEjecutives(EjecutivesResults.data?.results);
      setLoadingUsers(false);
    } catch (error) {
      console.log(error);
      setLoadingUsers(false);
    }
  };

  const getGroups = async () => {
    try {
      setLoadingGroups(true);
      let groups = await commonApi.getGroups(); //Test under offline
      setgroups(groups?.data?.results);
      setLoadingGroups(false);
    } catch (error) {
      console.log(error);
      setLoadingGroups(false);
    }
  };

  const normalizeTrackins = activitis => {
    let newActivities = normalizeActivities(activitis);
    setDastaTrakins(newActivities);
    setIsLoading(false);
  };

  const handleOnChangeDate = (date, type) => {
    let newDate = dayjs(date).format();
    if (type === "start") {
      setStartDate(newDate);
      return;
    }
    setPage(1);
    setFinishDate(newDate);
  };

  const handleLocalStorage = e => {
    setPeriod(e.target.value);
    setIsLoading(true);
  };

  const handleAction = item => {
    let prospect = item?.prospect;
    if (prospect.isoportunity === true && prospect.isclient === true) {
      router.push({ pathname: "/administracionventas/ventas/[prospecto]", query: { prospecto: prospect.id } });
    } else if (prospect.isoportunity === true && prospect.isclient === false) {
      router.push({ pathname: "/administracionventas/oportunidades/[prospecto]", query: { prospecto: prospect.id } });
    } else {
      router.push({ pathname: "/administracionventas/prospectos/[prospecto]", query: { prospecto: prospect.id } });
    }
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

    item !== "" ? setEjecutive(eje) : setEjecutive("");

    localStorage.setItem("admin-ejecutive", JSON.stringify(eje));
  };

  const handleSelectGroup = item => {
    let eje = {
      id: item.id,
      name: item.name,
      type: "Grupo",
    };

    item !== "" ? setgroup(eje) : setgroup("");
    localStorage.setItem("admin-group", JSON.stringify(eje));
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

  const removeName = () => {
    setPage(1);
    setNameSearch("");
    localStorage.setItem("admin-nameSearch", "");
    setFlag(!flag);
  };

  const handleChange = e => {
    if (e.target.value === "") {
      setFlag(!flag);
    }
    setNameSearch(e.target.value);
    localStorage.setItem("admin-nameSearch", e.target.value.toString());
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
          {nameSearch !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeName}
              label={`${"Palabras buscadas"}: ${nameSearch}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  const handleExportData = async () => {
    try {
      let resp = await api.post("convert/reportactivitiescloud", {
        periodDate: {
          between: [startDate, finishDate],
        },
      });

      toggleModal();

      setDataToDowloand({
        url: resp.data.url,
      });
      // let file = await axios.get(resp.data.url, { responseType: "blob" });
      // const url = window.URL.createObjectURL(new Blob([file.data]));
      // const link = document.createElement("a");
      // link.href = url;
      // link.setAttribute("download", "reporte-actividades.xlsx");
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
    <TrackingsStyled>
      <Grid className="container_trackins">
        <div className="rowheader">
          <div className="col">
            <h1 className="">Actividades</h1>
            <p className="total">
              <People />
              {`${totalTrakings} Registros`}
              <Tooltip arrow title="Recargar" placement="right">
                <Cached
                  className="reload"
                  onClick={() => {
                    setFlag(!flag);
                  }}
                />
              </Tooltip>
            </p>
          </div>

          <div className="colactions">
            <Button className="buttonexport" onClick={() => handleExportData()}>
              Exportar Datos
            </Button>
          </div>
        </div>{" "}
        <div className="ctr_filter">
          <div className="ctr_filter__ctr_input">
            <TextField
              variant="outlined"
              value={nameSearch}
              onChange={handleChange}
              label={nameSearch !== "" && "Buscar actividad"}
              placeholder="Ingresa Nombre o correo"
              size="small"
              className="inputText"
              onKeyDown={e => {
                if (e.key === "Enter" && e.target.value.length > 0) {
                  setPage(1);
                  setNameSearch(e.target.value);
                  localStorage.setItem("admin-nameSearch", e.target.value.toString());
                  setFlag(!flag);
                  setShowChips(true);
                }
              }}
            />
            <SearchOutlined className="search" />
            <div
              className="ctr_filters"
              onClick={() => {
                setshowDrawer(!showDrawer);
                setShowChips(false);
              }}
            >
              <FilterList className="filters" />
              <p className="text">Filtros</p>
            </div>
          </div>
        </div>
        {Chips()}
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
        {isLoading ? (
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
            <TableCustom
              heads={["Fecha", "Nombre", "Ejecutivo", "Tipo de Seguimiento", "Observaciones"]}
              data={dataTrackins}
              identificador={"createdAt"}
              custom={false}
              selectmultiple={false}
              primaryColor={"#405189"}
              secondaryColor={"#dce1f6"}
              actionsPerItem={[{ title: "Ver información", action: item => handleAction(item) }]}
            />
          </>
        )}
        <div className="pagination_trakings">
          <div>
            <p className="pagination_trakings__total">{`Total: ${totalTrakings} `}</p>
          </div>
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
                  value={ejecutives?.filter(item => item.id === ejecutive?.id)}
                  placeholder="selecciona un ejecutivo"
                  isClearable={true}
                  formatOptionLabel={FormatOptionLabel}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                  isLoading={loadingUsers}
                />
              </div>
              <div className="ctr_drawer__ctr_inputs__input">
                <label className="label"> Grupo</label>
                <Select
                  options={groups}
                  onChange={e => (e === null ? handleSelectGroup("") : handleSelectGroup(e))}
                  value={groups?.filter(item => item.id === group?.id)}
                  placeholder="selecciona un grupo"
                  isClearable={true}
                  formatOptionLabel={FormatOptionLabel}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
                  isLoading={loadingGroups}
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
          {!isLoading && (
            <Pagination
              page={page}
              onChange={(e, value) => {
                setPage(value);
                setFlag(!flag);
              }}
              count={Math.ceil(totalTrakings / 10)}
              size="small"
              color="primary"
            />
          )}
        </div>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </Grid>

      <ModalShowLink dataToDowloand={dataToDowloand} open={open} close={toggleModal} toggle={toggleModal} />
    </TrackingsStyled>
  );
}
// import React, { useState, useEffect } from "react";
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
