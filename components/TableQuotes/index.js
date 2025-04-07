import { Button, Chip, CircularProgress, Dialog, Grid, Tooltip, Switch, IconButton } from "@material-ui/core";
import {
  Cached,
  NavigateBefore,
  NavigateNext,
  TableChartOutlined,
  PersonPinCircle,
  WatchLater,
  NotificationsActive,
  RingVolume,
  Assignment,
  Extension,
  FilterList,
  Close,
  Nature,
  DateRange,
  DonutLarge,
  DynamicFeed,
  Edit,
  MoreVert,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import TableCustom from "../TableCustom";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { capitalizeString, formatDate, formatHour, formatNumber, isEmptyArray } from "../../utils";
import RequestCommon from "../../services/request_Common";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { DialogContainer, DrawerContainer, TableQuoteStyled } from "./tablequotes.styles";
import { Pagination } from "@material-ui/lab";
import dayjs from "dayjs";
import { months } from "../../BD/databd";
import { setArrayProducts } from "../../redux/slices/quotesSlice";
import { MenuSale } from "../TableSales/tablesales.styles";

const TableQuotes = ({ handleClickQuote, footer, prospect, handleAlert, setAlert, setFlag, hiddeAddNew }) => {
  const router = useRouter();
  const { id_user } = useSelector(userSelector);
  const commonApi = new RequestCommon();

  // * My own States
  const [oportunities, setOportunities] = useState([]);

  const [oportunidad, setOportunidad] = useState([]);

  // * My own States

  const [isLoading, setIsLoading] = useState(false);
  const [phases, setPhases] = useState([]);
  const [actions, setActions] = useState([]);
  const [action, setAction] = useState("");
  const [phase, setphase] = useState(prospect?.phase?.id);
  const [showAdd, setshowAdd] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleCloseAdd = () => setshowAdd(!showAdd);
  const [showTracking, setShowTracking] = useState(false);
  const handleCloseShow = () => setShowTracking(!showTracking);

  const { isLogged_User, roleId } = useSelector(userSelector);
  const heads = [
    "fecha de creación",
    "",
    "Concepto",
    "Certeza",
    "Fase",
    "Comisión",
    "Monto Total",
    "Descuento",
    "Fecha estimada de cierre",
    "Empresa",
    "",
  ];

  //* filters
  const dispatch = useDispatch();
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [filterFase, setFilterFase] = useState("");

  //paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalQuotes, setTotalQuotes] = useState(0);
  const totalPages = Math.ceil(totalQuotes / limit);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
  };
  const [typeq, setTypeQ] = useState("");
  const [phaseq, setPhaseQ] = useState("");
  const [fecha, setFecha] = useState("");

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => setAnchorEl(null);
  const [saleSelected, setSaleSelected] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPashes();
      getActions();
    }
    return () => (mounted = false);
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getOportunitiesByProspect();
    }
    return () => (mounted = false);
  }, [refetch, page, prospect]);

  const getOportunitiesByProspect = async () => {
    try {
      setIsLoading(true);
      let query = {};
      let inQuery = {};
      query.prospect = inQuery;
      query.iscloseout = false;
      inQuery.isoportunity = true;
      query.discarted = false;
      query.prospectId = prospect.id;
      if (typeq !== "") {
        query.certainty = typeq.value;
      } else {
        delete query.certainty;
      }
      if (phaseq !== "") {
        query.phaseId = phaseq.value;
      } else {
        delete query.phaseId;
      }
      if (fecha !== "") {
        query.estimatedclossing = { $gte: `${fecha.value}T00:01:00.000Z` };
      } else {
        delete query.estimatedclossing;
      }

      let params = {
        include: "prospect,phase",
        where: JSON.stringify(query),
        count: "0",
        limit: limit,
        order: "-createdAt",
        skip: page,
      };

      let oportuntiesResponse = await api.get(`oportunities`, { params });
      setOportunities(oportuntiesResponse.data?.results);
      setTotalQuotes(oportuntiesResponse.data?.count);
      setIsLoading(false);
      // setOportunitiesTable(oportunitiesNormalize);
    } catch (error) {
      handleAlert("error", "Cotizaciones - Error al cargar datos!", "basic");
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleAddTracing = async formData => {
    try {
      let newTracing = {};
      setAlert({ severity: "info", show: true, message: "Un momento - Creando Seguimiento", type: "load" });
      newTracing.reason = formData.reason;
      newTracing.observations = formData.observations;
      newTracing.actionId = action;
      newTracing.prospectId = router.query.prospecto;
      newTracing.createdbyId = id_user;
      if (phase !== "") {
        newTracing.phaseId = phase;
      }
      let addTracking = await api.post(`trackings`, newTracing);
      if (addTracking.status == 200) {
        setAlert({ severity: null, show: false, message: null, type: null });
        handleAlert("success", "Seguimientos - Creado Correctamente!", "basic");
        setRefetch(!refetch);
        resetForm();
      }
      if (formData.phase !== "" && phase !== prospect?.phase?.id) {
        let trackingFase = {};
        trackingFase.prospectId = router.query.prospecto;
        trackingFase.observations = `La fase ha sido cambiada. Fase anterior: ${
          prospect.phaseId ? capitalizeString(prospect?.phase?.name) : "Sin fase anterior"
        } `;
        trackingFase.actionId = action;
        trackingFase.reason = "Seguimiento automático";
        trackingFase.phaseId = phase;
        trackingFase.createdbyId = id_user;
        await api.put(`prospects/${prospect?.id}`, { phaseId: phase });
        await api.post(`trackings`, trackingFase);
        setFlag();
      }
    } catch (error) {
      handleAlert("error", "Seguimientos - No se pudo crear el seguimiento!", "basic");
      console.log(error);
    }

    setshowAdd(false);
  };
  const getPashes = async () => {
    try {
      let phases = await commonApi.getPashes();
      setPhases(phases.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getActions = async () => {
    try {
      let actions = await commonApi.getActions();
      setActions(actions.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const resetForm = () => {
    setValue("observations", "");
    setValue("action", "");
    setValue("reason", "");
    setphase(prospect?.phase?.id);
  };

  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };
  const handleFilters = () => {
    if (page > 1) {
      setPage(1);
    }
    setShowChips(!showChips);
    setRefetch(!refetch);
    handleCloseFilter();
  };
  const removeTypeQ = () => {
    setTypeQ("");
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };
  const removePhaseQ = () => {
    setPhaseQ("");
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };

  const removeFecha = () => {
    setFecha("");
    if (page > 1) {
      setPage(1);
    }
    setRefetch(!refetch);
  };

  function formatnewDate(str) {
    let date = new Date(str);
    return date.toISOString();
  }

  const handleClickMenu = (event, sale) => {
    setSaleSelected(sale);
    setAnchorEl(event.currentTarget);
  };
  const handleClickConverToSale = item => {
    console.log("item", item);
    router.push({
      pathname: `/clientes/nuevo/`,
      query: {
        p: item.prospectId,
        o: item.id,
      },
    });
  };
  const handleClickEdit = item => {
    handleClose();
    router.push({
      pathname: `/oportunidades/editar/`,
      query: { o: item?.id },
    });
  };
  return (
    <TableQuoteStyled>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Cotizaciones ({totalQuotes})</p>
          {isLoading ? (
            <CircularProgress size={20} className="load" />
          ) : (
            <Cached className="reload" onClick={() => setRefetch(!refetch)} />
          )}
        </div>
        {showChips && (
          <div>
            {typeq !== "" && (
              <Chip color="primary" size="small" onDelete={removeTypeQ} label={typeq.value} className="chip" />
            )}
            {phaseq !== "" && (
              <Chip color="primary" size="small" onDelete={removePhaseQ} label={phaseq.name} className="chip" />
            )}
            {fecha !== "" && (
              <Chip
                color="primary"
                size="small"
                onDelete={removeFecha}
                label={`${formatDate(fecha.value)}`}
                className="chip"
              />
            )}
          </div>
        )}
        <div
          className="secondary"
          onClick={() => {
            setShowChips(false);
            setShowFilters(!showFilters);
          }}
        >
          <FilterList />
          <p>Filtros</p>
        </div>
      </div>

      {isEmptyArray(oportunities) && TableEmpty(heads)}
      {/* clientCompanyId */}
      {!isEmptyArray(oportunities) && (
        <div className="table">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th key={index} className={`title ${item == "fecha de creación" && "checkbox"}`}>
                    <div className="ctr_title">
                      <p>{item}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {oportunities.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed" onClick={() => handleClickQuote(item)}>
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.createdAt)}, ${formatHour(item?.createdAt)}`}</span>
                      </p>
                    </td>
                    <td className="data">
                      <p className={`ctr_td ctr_icon_complete`}>
                        {item?.actionId && (
                          <Tooltip arrow title={item?.action?.name}>
                            {iconReturn(item?.action?.name)}
                          </Tooltip>
                        )}
                      </p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item?.concept}</p>
                    </td>

                    <td className="data">
                      <p className="ctr_td">{item.certainty}%</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item.phase?.name}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{formatNumber(item.comission)}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{formatNumber(item.amount)}</p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item.discount}</p>
                    </td>
                    <td className="data fixed">
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.estimatedclossing)}`}</span>
                      </p>
                    </td>
                    <td className="data">
                      <p className="ctr_td">{item.clientCompanyId ? item.clientCompanyId : "N/A"}</p>
                    </td>
                    <td>
                      <IconButton aria-describedby={id} onClick={e => handleClickMenu(e, item)}>
                        <MoreVert />
                      </IconButton>
                      <MenuSale
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <div className="container">
                          <Button
                            className="option"
                            onClick={() => {
                              handleClickConverToSale(saleSelected);
                            }}
                          >
                            Convertir a Venta
                          </Button>
                          <Button
                            className="option"
                            onClick={() => {
                              handleClickEdit(saleSelected);
                            }}
                          >
                            Editar Cotización
                          </Button>
                        </div>
                      </MenuSale>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {footer && (
        <div className="tfooter">
          {!hiddeAddNew && (
            <div className="tfooter__ctr_button">
              {roleId !== "administrador_de_ventas" && (
                <Button
                  variant="contained"
                  color="primary"
                  className="add_buton"
                  onClick={() => {
                    router.push({
                      pathname: `/oportunidades/nuevo/`,
                      query: { p: prospect.id },
                    });

                    dispatch(setArrayProducts([]));
                  }}
                >
                  Agregar Cotización
                </Button>
              )}
            </div>
          )}

          <div className="pagination">
            <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
          </div>
        </div>
      )}

      <DrawerContainer anchor="right" open={showFilters} onClose={handleCloseFilter}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={handleCloseFilter} />
          </div>
          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">
                {" "}
                <DynamicFeed className="icon" />
                Fase
              </label>
              <select
                value={phaseq.value}
                onChange={e => {
                  let phase = phases.filter(item => item.id == e.target.value);
                  setPhaseQ({ value: phase[0].id, name: phase[0].name });
                  setTypeQ("");
                }}
                className="input"
              >
                <option value="" hidden>
                  Seleccione un tipo
                </option>
                {phases.map((item, index) => {
                  return (
                    <option value={item.id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">
                {" "}
                <DonutLarge className="icon" /> Certeza
              </label>
              <select
                className="input"
                value={typeq.value}
                onChange={e => {
                  setTypeQ({ value: e.target.value });
                  setPhaseQ("");
                }}
              >
                <option value="" hidden>
                  Seleccione un porcentaje
                </option>

                <option value={"10"}>10 %</option>
                <option value={"20"}>20 %</option>
                <option value={"30"}>30 %</option>
                <option value={"40"}>40 %</option>
                <option value={"50"}>50 %</option>
                <option value={"60"}>60 %</option>
                <option value={"70"}>70 %</option>
                <option value={"80"}>80 %</option>
                <option value={"90"}>90 %</option>
                <option value={"100"}>100 %</option>
              </select>
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">
                {" "}
                <DateRange className="icon" />
                Fecha estimada de cierre
              </label>

              <input
                onChange={e => {
                  setFecha({ value: e.target.value });
                }}
                className="input"
                type="date"
              />
            </div>
          </div>
          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={handleCloseFilter}>
              Cancelar
            </Button>

            <Button variant="contained" className="btn_apply" onClick={() => handleFilters()}>
              Aplicar
            </Button>
          </div>
        </div>
      </DrawerContainer>
    </TableQuoteStyled>
  );
};

export default TableQuotes;

const iconReturn = type => {
  switch (type) {
    case "Visita":
      return <PersonPinCircle />;
    case "Cita":
      return <WatchLater />;
    case "Recordatorio":
      return <NotificationsActive />;
    case "Llamada":
      return <RingVolume />;
    case "Tarea":
      return <Assignment />;
    case "Pendiente":
      return <Extension />;
    default:
      break;
  }
};
function TableEmpty(heads) {
  return (
    <>
      <div className="table empty">
        <table className="ctr_table">
          <thead className="ctr_table__head">
            <tr className="ctr_table__head__tr">
              {heads.map((item, index) => (
                <th className="title " key={index}>
                  <div className="ctr_title">
                    <p>{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="body_empty">
        <div className="message_ctr">
          <img src="/empty_table.svg" />
          <p>Aun no hay datos</p>
        </div>
      </div>
    </>
  );
}
