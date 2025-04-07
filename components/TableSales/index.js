import { Button, Chip, CircularProgress, Dialog, Grid, Tooltip, Switch, IconButton, Divider } from "@material-ui/core";
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
  MoreVert,
  PlayForWork,
  Edit,
  ShoppingBasket,
  Visibility,
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
import { DialogContainer, DrawerContainer, MenuSale, TableSalesStyled } from "./tablesales.styles";
import dayjs from "dayjs";
import { months } from "../../BD/databd";
import { Pagination } from "@material-ui/lab";
import { setArrayProducts } from "../../redux/slices/quotesSlice";

const TableSales = ({ handleClickSales, footer, prospect, handleAlert, setAlert, setFlag, scrollTo }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const commonApi = new RequestCommon();

  // * My own States
  const [ventas, setVentas] = useState([]);

  // * My own States
  const [trackings, setTrackings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalTracking, setTotalTracking] = useState(0);
  const [trackingsTable, settrackingsTable] = useState([]);
  const [phases, setPhases] = useState([]);
  const [actions, setActions] = useState([]);
  const [action, setAction] = useState("");
  const [saleSelected, setSaleSelected] = useState({});
  const [phase, setphase] = useState(prospect?.phase?.id);
  const [showSeguimiento, setShowSeguimiento] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const handleCloseAdd = () => setShowSeguimiento(!showSeguimiento);
  const [trackingShow, setTrackingShow] = useState({});
  const [showTracking, setShowTracking] = useState(false);
  const handleCloseShow = () => setShowTracking(!showTracking);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClose = () => setAnchorEl(null);
  const heads = [
    "fecha ",
    "",
    "Concepto",
    "Certeza",
    "Fase",
    "Comisión",
    "Monto Total",
    "Descuento",
    "Fecha de cierre",
    "",
  ];

  //* filters
  const [showFilters, setShowFilters] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const [filterFase, setFilterFase] = useState("");

  //*Paginacion
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalSales, setTotalSales] = useState(0);
  const totalPages = Math.ceil(totalSales / limit);

  const [highlight, setHighlight] = useState(false);

  const [showAdd, setshowAdd] = useState(false);
  const handleCloseAd = () => setshowAdd(!showAdd);

  const handleCloseFilter = () => {
    setShowChips(true);
    setShowFilters(!showFilters);
  };
  const [typeq, setTypeQ] = useState("");
  const [phaseq, setPhaseQ] = useState("");
  const [fecha, setFecha] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const handleChange = (event, value) => {
    setPage(value);
  };

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
      setHighlight(scrollTo);
      getOportunitiesByProspect();
      setInitial();
      console.log(prospect.status);
    }
    return () => (mounted = false);
  }, [refetch, page, prospect]);

  const getOportunitiesByProspect = async () => {
    try {
      let query = {
        prospectId: prospect.id,
      };
      query.iscloseout = true;
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
        query.estimatedclossing = { $gte: `${fecha.value}T00:01:00.000Z`, $lte: `${fecha.value}T23:59:59.000Z` };
      } else {
        delete query.estimatedclossing;
      }
      let oportuntiesResponse = await api.get(
        `oportunities?where=${JSON.stringify(
          query
        )}&count=1&limit=${limit}&skip=${page}&include=phase,prospect&order=-createdAt`
      );
      setVentas(oportuntiesResponse.data?.results);
      setTotalSales(oportuntiesResponse.data?.count);
      setTimeout(setHighlight(false), 4000);
      // setOportunitiesTable(oportunitiesNormalize);
    } catch (error) {
      console.log(error);
      setTimeout(setHighlight(false), 4000);
    }
  };

  function setInitial() {
    setphase(prospect?.phase?.id);
    setAction("62dEUlcqck7L1f8JvFtRSeoX");
  }

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
  const handleNextPage = () => {
    if (page < Math.ceil(totalTracking / limit)) {
      setPage(page + 1);
    }
  };
  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
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

  const handleClickMenu = (event, sale) => {
    setSaleSelected(sale);
    setAnchorEl(event.currentTarget);
  };

  const handleClickOrder = itemClient => {
    router.push({
      pathname: "/pedidos/nuevo",
      query: { o: itemClient.id, p: itemClient.prospectId },
    });
  };

  return (
    <TableSalesStyled highlight={highlight}>
      <div className="title_table">
        <div className="primary">
          <TableChartOutlined className="icon_primary" />
          <p>Ventas Realizadas ({totalSales})</p>
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

      {isEmptyArray(ventas) && TableEmpty(heads)}

      {!isEmptyArray(ventas) && (
        <div className="table">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th key={index} className={`title ${item == "fecha " && "checkbox"}`}>
                    <div className="ctr_title">
                      <p>{item}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {ventas.map((item, index) => {
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    <td className="data fixed" onClick={() => handleClickSales(item)}>
                      <p className="ctr_td">
                        <span className="span">{`${formatDate(item?.soldat)}, ${formatHour(item?.soldat)}`}</span>
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
                    <td className="data">
                      <p className="ctr_td">{`${formatDate(item?.estimatedclossing)}`}</p>
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
                            endIcon={<Edit className="icon_option" />}
                            onClick={() => {
                              handleClose();
                              router.push({
                                pathname: "/clientes/editar",
                                query: {
                                  o: saleSelected.id,
                                },
                              });
                            }}
                          >
                            Editar
                          </Button>

                          {saleSelected.isorder ? (
                            <Button
                              className="optionDisabled"
                              disabled={true}
                              endIcon={<ShoppingBasket className="icon_option" />}
                              // onClick={() => {
                              //   handleClose();
                              //   handleClickOrder(saleSelected);
                              // }}
                            >
                              Realizar Pedido
                            </Button>
                          ) : (
                            <Button
                              className="option"
                              endIcon={<ShoppingBasket className="icon_option" />}
                              onClick={() => {
                                handleClose();
                                handleClickOrder(saleSelected);
                                dispatch(setArrayProducts([]));
                              }}
                            >
                              Realizar Pedido
                            </Button>
                          )}
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
        <div style={{ marginTop: "0.5%", justifyContent: "flex-end", display: "flex", alignItems: "end" }}>
          <Pagination count={totalPages} page={page} onChange={handleChange} color="primary" />
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
                Fecha
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
    </TableSalesStyled>
  );
};

export default TableSales;

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
      return;
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
