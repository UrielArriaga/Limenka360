import React, { useEffect, useState } from "react";
import { api } from "../../../../services/api";
import dayjs from "dayjs";
import { normalizeActivities } from "../../../../utils/normalizeData";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import RequestCommon from "../../../../services/request_Common";
import { getDataDay, getDataDaysMonth, getDataDaysWeek } from "../../../../utils";
import TableCustom from "../../../../components/TableCustom";
import { Grid, LinearProgress, Button,Chip } from "@material-ui/core";
import { FilterListOutlined, Close, TramRounded } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { TrackingsStyled } from "./styles";
import { DrawerContainer } from "../../../../styles/Propectos";
import { useRouter } from "next/router";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { FormatOptionLabel } from "../../../../redux/slices/reactSelect";
import Select from "react-select";

export default function ExecutivesActivities() {
  const [dataTrackins, setDastaTrakins] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [totalTrakings, setTotalPTrakins] = useState(0);
  const [showDrawer, setshowDrawer] = useState(false);
  const [ejecutives, setEjecutives] = useState([]);
  const [ejecutive, setEjecutive] = useState("");
  const commonApi = new RequestCommon();
  const [period, setPeriod] = useState(localStorage.getItem("period") || "day");
  const [newDate, setNewDate] = useState(new Date());
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());
  const [showChips, setShowChips] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const router = useRouter();
  const {roleId, groupId} = useSelector(userSelector);
  const optionDefault = {
    name: "Todos los Ejecutivos de mi grupo",
    lastname: "",
    email:"",
    id: "",
  };

  useEffect(() => {
    gettrackins();
    getUsers();
    localStorage.setItem("period", period.toString());
  }, [page, flag, startDate, finishDate, period]);

  useEffect(() => {}, [dataTrackins]);

  const gettrackins = async () => {
    try {
      setIsLoading(true);
      let query = {};
     
      if (ejecutive.id) {
        query.createdbyId = ejecutive.id;
     }

     if(roleId == "gerente"){
      query.prospect = {
        ejecutive : {
          groupId : groupId
        }
      }
     }
      switch (period) {
        case "day":
          query.createdAt = { between: getDataDay(newDate) };
          break;
        case "week":
          query.createdAt = { between: getDataDaysWeek(newDate) };
          break;
        case "month":
          query.createdAt = { between: getDataDaysMonth(newDate) };
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
        limit: "20",
        skip: page,
        count: "1",
        order: "-createdAt",
      };

      let datatrackins = await api.get(`trackings`, { params });
      normalizeTrackins(datatrackins.data.results);
      setTotalPTrakins(datatrackins.data.count);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      let ejecutive = await commonApi.getUsers();
      let EjecutivesResults = ejecutive?.data?.results;
      setEjecutives(EjecutivesResults);
      setEjecutives(old => [optionDefault, ...old]);
    } catch (error) {
      console.log(error);
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
    setFinishDate(newDate);
  };

  const handleLocalStorage = e => {
    setPeriod(e.target.value);
    setIsLoading(true);
  };
  const handleAction = item => {
    let prospect = item?.prospect;
    if (prospect.isoportunity === true && prospect.isclient === true) {
      router.push({ pathname: "/ventas/[prospecto]", query: { prospecto: prospect.id } });
    } else if (prospect.isoportunity === true && prospect.isclient === false) {
      router.push({ pathname: "/oportunidades/[prospecto]", query: { prospecto: prospect.id } });
    } else {
      router.push({ pathname: "/prospectos/[prospecto]", query: { prospecto: prospect.id } });
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

    item !== "" ? setEjecutive(eje) : setEjecutive({});
  };

  const handleCloseDrawer = () => {
    setshowDrawer(!showDrawer);
  }

   const handleFilter = () => {
    setShowChips(true);
    setFlag(!flag);
    handleCloseDrawer();
    if (page > 1) {
      setPage(1);
    }
  };
  const removeTypeEjecutive = () => {
    setEjecutive("");
    setFlag(!flag);
       if (page > 1) {
      setPage(page - 1);
    }
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
         </div> 
      )}}

  return (
    <TrackingsStyled>
      <Grid className="container_trackins">
        <h1 className="titletactities">Actividades</h1>
        <Grid className="filter">
        {Chips()}
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
          {roleId !== "ejecutivo" && (
            <div className="filters_manager">
              <FilterListOutlined
                onClick={() => {
                  setshowDrawer(!showDrawer);
                }}
              />
              <p>Filtros</p>
            </div>
          )}
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
                <label className="label">Ejecutivo o Grupo</label>
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
          <Pagination
            onChange={(e, value) => {
              setPage(value);
              setFlag(!flag);
            }}
            count={Math.ceil(totalTrakings / 20)}
            value={page}
            size="small"
            color="primary"
          />
        </div>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </Grid>
    </TrackingsStyled>
  );
}
