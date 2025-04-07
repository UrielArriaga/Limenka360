import React, { useEffect, useState, useRef } from "react";
import {
  IconButton,
  Dialog,
  CircularProgress,
  Tooltip,
  Popover,
  Grid,
  Button,
  Drawer,
  Divider,
  withStyles,
  Switch,
  Link,
} from "@material-ui/core";
import Select from "react-select";
import {
  Close,
  FilterListOutlined,
  CachedOutlined,
  NavigateBefore,
  NavigateNext,
  CloseOutlined,
  AssignmentOutlined,
  Done,
  MoreVert,
  ExitToApp,
  TextFields,
  PictureAsPdf,
  Image,
  FormatListNumbered,
  InsertDriveFile,
  CalendarToday,
  Functions,
  Assignment,
} from "@material-ui/icons";
import { ACTIONIDPRODUCTIONMODE, PHASEIDPRODUCTIONMODE, URL_SPACE, api } from "../../services/api";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../utils";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { ordersSelector, getOrders } from "../../redux/slices/orders";
import { getCountOrders } from "../../redux/slices/dashboardSlice";
import NumberFormat from "react-number-format";
import { Alert } from "@material-ui/lab";
import Router, { useRouter } from "next/router";
import { colors } from "../../styles/global.styles";
import { createNewTracking } from "../../redux/slices/trackingSlice";
import { saveAs } from "file-saver";
import DataOrder from "../DataOrder";
export default function DrawerOrders({ drawerShowOrders, setDrawerShowOrders, ...props }) {
  const router = useRouter();
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const { ordersresults, totalOrders, isFetching } = useSelector(ordersSelector);
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [orderStatus, setOrderStatus] = useState([]);
  const [orderOptions, setOrderOptions] = useState([]);
  const [dataOrderConfirm, setDataOrderConfirm] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [isloaderSaveChanges, setIsloaderSaveChanges] = useState(false);
  const [showChipTypePending, setShowChipTypePending] = useState(false);
  const [showConfirmOrder, setShowConfirmOrder] = useState(false);
  const [showRejectedOrder, setShowRejectedOrder] = useState(false);
  const [orderOptionSelected, setOrderOptionSelected] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);
  const [filterDefault, setFilterDefault] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState("");
  const [limitOrders, setLimitOrders] = useState(3);
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(totalOrders / limitOrders);
  const mainTop = useRef();
  const id = open ? "simple-popover" : undefined;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [rejectedOptionSelected, setRejectedOptionSelected] = useState("");
  const [rejectedReasons, setRejectedReasons] = useState([]);
  const dispatch = useDispatch();
  const [viewMore, setViewMore] = useState(false);
  const [anchorElPdf, setAnchorElPdf] = useState(null);
  const openpdf = Boolean(anchorElPdf);
  const idpdf = openpdf ? "simple-popover" : undefined;
  const menuOrderHiddenpdf = () => setAnchorElPdf(null);
  const handleClick = event => {
    setAnchorElPdf(event.currentTarget);
  };
  useEffect(() => {
    getOrderStatus();
    getRejectReasons();
  }, []);

  useEffect(() => {
    getData();
  }, [refetch, page, ASC, orderBy]);

  // funcion para obtener opciones de rechazo
  const getRejectReasons = () => {
    api
      .get("orderrejected", { params: {} })
      .then(res => setRejectedReasons(res.data.results))
      .catch(err => console.log(err));
  };

  const getOrderStatus = async () => {
    try {
      let response = await api.get("orderstatus?&order=name");
      let typeStatus = response.data.results;
      let defaultOption = typeStatus.filter(item => item.name === "Pendiente de aprobación");
      setFilterDefault(defaultOption[0].id);
      setFilterBy(defaultOption[0].id);
      setOrderStatus(typeStatus);
      let options = typeStatus.filter(item => item.name !== "Pendiente de aprobación");
      setOrderOptions(options);
      setRefetch(!refetch);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFilterSelect = () => {
    setFilterBy(filterDefault);
    setShowChipTypePending(false);
    setRefetch(!refetch);
  };

  const getData = () => {
    let query = {};
    if (filterBy === undefined || filterBy === null || filterBy === "") {
      query.orderstatusId = filterDefault;
    } else {
      if (filterBy === "all") {
        delete query.orderstatusId;
      } else {
        query.orderstatusId = filterBy;
      }
    }
    let params = {
      where: JSON.stringify(query),
      include:
        "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address,address.entity.city.postal,createdbyid,createdbyid.group,paymentaccount,docs,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
      count: 1,
      limit: limitOrders,

      order: `${ASC}${orderBy}`,
      skip: page,
      subquery: 1,
      join: "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address,address.entity.city.postal,createdbyid,createdbyid.group,p,d,bil,bill.cf,bill.p,bill.pw,bill.a,bill.tax",
    };
    dispatch(getOrders({ params }));
    dispatch(getCountOrders());
  };

  const menuOrderShow = (event, item) => {
    setAnchorEl(event.currentTarget);
    setDataOrderConfirm(item);
  };
  const menuOrderHidden = () => setAnchorEl(null);

  const closeDialogConfirm = () => {
    setShowConfirmOrder(false);
    setIsloaderSaveChanges(false);
    setOrderOptionSelected({});
  };

  const closeDialogRejected = () => {
    setShowRejectedOrder(false);
    setIsloaderSaveChanges(false);
    setOrderOptionSelected({});
  };

  const drawerClose = () => {
    setDrawerShowOrders(false);
  };
  const iconReload = () => {
    setRefetch(!refetch);
  };

  const returnDesignType = item => {
    switch (item) {
      case "Aprobado":
        return <p className="aproved">Aprobado</p>;
      case "Rechazado":
        return <p className="denied">Rechazado</p>;
      case "Pendiente de aprobación":
        return <p className="pending">Pendiente de aprobación</p>;
    }
  };

  const returnName = item => {
    if (item === "all") {
      return "";
    } else {
      let nameType = orderStatus.filter(type => type.id === item);
      return nameType[0].name;
    }
  };

  const scrollToTop = () => {
    if (showFilters === false) {
      mainTop.current.scrollIntoView({
        block: "start",
        behavior: "smooth",
      });
    }
  };

  const handleSelectOrderStatus = item => {
    setFilterBy(item);
    setRefetch(!refetch);
    if (page > 1) setPage(1);
    if (item === "") {
      setShowChipTypePending(false);
    } else {
      setShowChipTypePending(true);
    }
  };
  const handleSelectOrderBy = item => {
    setOrderBy(item);
    setRefetch(!refetch);
    if (page > 1) setPage(1);
  };

  const updateOrder = async () => {
    setIsloaderSaveChanges(true);
    try {
      let bodyNewTrackingChange = {
        prospectId: dataOrderConfirm?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: dataOrderConfirm?.oportunityId,
        orderId: dataOrderConfirm.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${dataOrderConfirm?.folio} fue Aprobado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };

      let data = {
        orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
      };

      let responseApproved = await api.put(`orders/${dataOrderConfirm?.id}`, data);
      if (responseApproved.status === 200) {
        setRefetch(!refetch);
        closeDialogConfirm();
        menuOrderHidden();
        handleAlert("success", "El estatus del pedido cambio", "basic");
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
        restorePage();
      }
    } catch (error) {
      closeDialogConfirm();
      handleAlert("error", `Error Al Guardar los Cambios!`, "basic");
      console.log(error);
    }
  };
  const rejectedOrder = async () => {
    if (rejectedOptionSelected === "") {
      handleGlobalAlert("error", "Selecciona una opción de rechazo", "basic", dispatch, 6000);
      return;
    }

    setIsloaderSaveChanges(true);
    try {
      let data = {
        rejectedreason: "",
        orderrejectId: rejectedOptionSelected,
        rejectbyId: id_user,
      };
      let bodyNewTrackingChange = {
        prospectId: dataOrderConfirm?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: dataOrderConfirm?.oportunityId,
        orderId: dataOrderConfirm.id,
        reason: `Seguimiento Automatico`,
        observations: `El Pedido ${dataOrderConfirm?.folio} fue Rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let responseRejected = await api.put(`orders/reject/${dataOrderConfirm.id}`, data);
      if (responseRejected.status === 200) {
        setRefetch(!refetch);
        closeDialogRejected();
        menuOrderHidden();
        handleAlert("success", "El estatus del pedido cambio", "basic");
        setRejectedOptionSelected("");
        dispatch(
          createNewTracking({
            data: bodyNewTrackingChange,
          })
        );
        restorePage();
      }
    } catch (error) {
      handleGlobalAlert("error", "Pedido - ocurrio un error al marcar como rechazada", "basic", dispatch, 6000);
      closeDialogRejected();
    }
  };
  const iconTypeFile = file => {
    let typeFile = file.url?.split(".").pop();
    switch (typeFile) {
      case "pdf":
        return <PictureAsPdf className="pdf" />;
      case "docx":
        return <TextFields className="word" />;
      case "xlsx":
        return <Functions className="xlsx" />;
      case "jpeg":
        return <Image className="image" />;
      case "jpg":
        return <Image className="image" />;
      case "png":
        return <Image className="image" />;
      default:
        return <InsertDriveFile className="default" />;
    }
  };
  const clickOptionMenuOrder = order => {
    if (order.status === 2) {
      if (dataOrderConfirm?.orderstatus?.status === 2) {
        return handleGlobalAlert("warning", `El pedido ya fue Aceptado`, "basic", dispatch, 6000);
      } else {
        setShowConfirmOrder(true);
        setOrderOptionSelected(order);
      }
    } else {
      if (dataOrderConfirm?.orderstatus?.status === 3) {
        return handleGlobalAlert("warning", `El pedido ya fue Rechazado`, "basic", dispatch, 6000);
      } else {
        setShowRejectedOrder(true);
        setOrderOptionSelected(order);
      }
    }
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const openFile = async item => {
    try {
      let typeFile = item.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + item.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${item.name}.${typeFile}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOrders = item => {
    router.push({
      pathname: "/compras/pedidos/pedido",
      query: { pe: item.id, pr: item?.oportunity?.prospectId, op: item?.oportunity?.id },
    });
  };
  const restorePage = () => {
    if (page > 1) setPage(1);
  };
  return (
    <DrawerStyle onClose={drawerClose} open={drawerShowOrders} anchor="right">
      <Main>
        <p ref={mainTop}></p>
        <div className="drawer_header">
          <div className="drawer_header__title">
            <p className="drawer_header__title__Subtitle">Pedidos</p>
            <span className="drawer_header__title__Subtitle__total">{totalOrders}</span>
            <Tooltip title="Recargar">
              <CachedOutlined className="drawer_header__title__iconReload" onClick={() => iconReload()} />
            </Tooltip>
            <Tooltip title="Filtrar">
              <FilterListOutlined
                className={
                  showFilters == true
                    ? "drawer_header__title__iconFilter drawer_header__title__active"
                    : "drawer_header__title__iconFilter"
                }
                onClick={() => {
                  setShowFilters(!showFilters);
                  scrollToTop();
                }}
              />
            </Tooltip>
          </div>
          <Tooltip title="Cerrar">
            <IconButton className="drawer_header__button" onClick={() => setDrawerShowOrders(false)}>
              <Close className="drawer_header__icon" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="drawer_filters__selectsOrder">
          <DataOrder
            falling={ASC}
            setFalling={setASC}
            order={orderBy}
            setOrder={setOrderBy}
            addOptions={[
              { label: "Fecha Creación ", value: "createdAt" },
              { label: "Fecha Actualización", value: "updatedAt" },
            ]}
            addOptionsOrderBy={[
              { label: "Descendente", value: "-" },
              { label: "Ascendente ", value: "" },
            ]}
          />
        </div>
        {showFilters == true && (
          <div className="drawer_filters">
            <div className="drawer_filters__selects">
              <div className="drawer_filters__selects__containerLeft">
                <div className="drawer_filters__selects__containerLeft__header">
                  <p className="drawer_filters__selects__containerLeft__header__title">Estatus de Pedido</p>
                  <AssignmentOutlined className="drawer_filters__selects__containerLeft__header__icon" />
                </div>
                <select
                  className="drawer_filters__selects__containerLeft__selectType"
                  onChange={e => handleSelectOrderStatus(e.target.value)}
                  value={filterBy}
                >
                  <option value="all">Todos</option>
                  {orderStatus.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}
        {showChipTypePending === true && (
          <div className="results">
            <p>
              Resultados: <strong>{returnName(filterBy)}</strong>
              <strong> {totalOrders}</strong>
            </p>
            <CloseOutlined className="results__icon" onClick={() => deleteFilterSelect()} />
          </div>
        )}
        <div className="contenido">
          {isFetching == true ? (
            <div className="contenido__loader">
              <CircularProgress />
            </div>
          ) : ordersresults.length == 0 ? (
            <div className="contenido__empty">
              <img src="/empty_table.svg" className="contenido__empty__image" />
              <p className="contenido__empty__title">Sin resultados</p>
            </div>
          ) : (
            <>
              {ordersresults?.map((item, index) => (
                <div className="contenido__item" key={index}>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <Assignment className="info__icon" />
                      <Tooltip title="Ver pedido">
                        <p className="info__title" onClick={() => handleClickOrders(item)}>
                          Pedido:{item.folio}
                        </p>
                      </Tooltip>
                    </Grid>
                    <Grid item md={2} sm={2} xs={2} className="contenido__header__options">
                      <IconButton onClick={e => menuOrderShow(e, item)} className="contenido__header__options__button">
                        <MoreVert className="contenido__header__options__button__icon" />
                      </IconButton>

                      <MenuOrder
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={menuOrderHidden}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <div className="bodyMenu">
                          {orderOptions.map((items, index) => (
                            <div key={index}>
                              <div className="bodyMenu__option" onClick={() => clickOptionMenuOrder(items)}>
                                {items.status === 2 ? (
                                  <Done className={`bodyMenu__option__icon confirm`} />
                                ) : (
                                  <Close className={`bodyMenu__option__icon cancel`} />
                                )}
                                {items.name}
                              </div>
                              <Divider />
                            </div>
                          ))}
                        </div>
                      </MenuOrder>
                    </Grid>
                  </Grid>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <p className="info__titles">Datos Pedido:</p>
                    </Grid>

                    <Grid item md={12} style={{ display: "flex" }}>
                      <p className="info__subject">Estado de Pedido:</p>
                      {returnDesignType(item?.orderstatus?.name)}
                    </Grid>
                    <Grid item md={12}>
                      <p className="info__subject">
                        Cuenta de Pago: {item?.paymentaccount?.name ? item?.paymentaccount?.name : "N/A"}.
                      </p>
                    </Grid>
                    <Grid item md={12}>
                      <p className="info__subject">Observaciones Generales: {item?.phone ? item.phone : "N/A"} . </p>
                    </Grid>
                  </Grid>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <p className="info__titles">Datos dirección envio:</p>
                    </Grid>
                    <Grid item>
                      <p className="info__subject">
                        Dirección: {item?.address?.street ? item?.address?.street : "N/A"}, #Exterior:
                        {item?.address?.ext_number ? item?.address?.ext_number : "N/A"}, #Interior:{" "}
                        {item?.address?.int_number ? item?.address?.int_number : "N/A"}, Municipio:{" "}
                        {item?.address?.city?.name ? item?.address?.city?.name : "N/A"}, Estado:{" "}
                        {item?.address?.entity?.name ? item?.address?.entity?.name : "N/A"},CP:{" "}
                        {item?.address?.postal?.postal_code ? item?.address?.postal?.postal_code : "N/A"}.
                      </p>
                      <p></p>
                      <p className="info__subject">
                        Referencias: {item?.address?.references ? item?.address?.references : "N/A"}.
                      </p>
                      <p className="info__subject"> Recibe: {item.receive ? item.receive : "N/A"}.</p>
                    </Grid>
                  </Grid>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <p className="info__titles">Datos Facturación:</p>
                    </Grid>
                    <Grid item md={12}>
                      <p className="info__subject">{item?.billing ? "Con Factura" : "Sin Factura"}.</p>
                    </Grid>
                    {viewMore && item.billing == true ? (
                      <>
                        <Grid item md={6}>
                          <p className="info__subject">
                            Razón social: {item?.bill?.businessname ? item?.bill?.businessname : "N/A"}.
                          </p>

                          <p className="info__subject">
                            CFDI: {item?.bill?.cfdi?.name ? item?.bill?.cfdi?.name : "N/A"}.
                          </p>
                          <p className="info__subject">
                            Forma de pago : {item?.bill?.paymentway?.name ? item?.bill?.paymentway?.name : "N/A"}.
                          </p>
                          <p className="info__subject">
                            Método de pago : {item.bill?.paymentmethod?.name ? item?.bill?.paymentmethod?.name : "N/A"}.
                          </p>
                          <p className="info__subject">
                            Regimen Filscal : {item?.bill?.taxregime?.name ? item?.bill?.taxregime?.name : "N/A"}.
                          </p>
                        </Grid>
                        <Grid item md={6}>
                          <p className="info__subject">Rfc: {item?.bill?.rfc ? item?.bill?.rfc : "N/A"}.</p>
                          <p className="info__subject">Teléfono: {item.bill?.phone ? item?.bill?.phone : "N/A"}.</p>

                          <p className="info__subject">
                            Colonia: {item.bill?.address?.settlement ? item.bill?.address?.settlement : "N/A"}.
                          </p>
                          <p className="info__subject">
                            Codigo Postal:
                            {item?.bill?.address?.postal?.postal_code
                              ? item?.bill?.address?.postal?.postal_code
                              : "N/A"}
                            .
                          </p>
                          <p className="info__subject">
                            Estado: {item.bill?.address?.entity?.name ? item.bill?.address?.entity?.name : "N/A"}.
                          </p>
                          <p className="info__subject">
                            Municipio: {item.address?.city?.name ? item.address?.city?.name : "N/A"}.
                          </p>
                        </Grid>
                        <Grid item xs={12}>
                          <Link className="info__link" onClick={() => setViewMore(false)}>
                            Ver menos
                          </Link>
                        </Grid>
                      </>
                    ) : (
                      item?.billing == true && (
                        <Grid item xs={12}>
                          <Link className="info__link" onClick={() => setViewMore(true)}>
                            Ver más información
                          </Link>
                        </Grid>
                      )
                    )}
                  </Grid>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <p className="info__titles">Archivos:</p>
                    </Grid>

                    {item?.docs?.length >= 1
                      ? item?.docs.map((item, index) => (
                          <Grid key={index} item xs={3} sm={3} md={3} className={`info__containerFiles__item`}>
                            {iconTypeFile(item)}
                            <Tooltip title={"Descargar" + " " + item.name} arrow>
                              <p className="itemTitleFile" onClick={() => openFile(item)}>
                                {item.name}
                              </p>
                            </Tooltip>
                          </Grid>
                        ))
                      : "Sin Archivos"}
                  </Grid>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <p className="info__titles">Datos Ejecutivo:</p>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className="subject">
                      <p className="info__subject">Nombre: {item.oportunity?.soldby?.fullname}</p>
                    </Grid>

                    <Grid item md={6} xs={6} sm={6} className="subject">
                      <p className="info__subject">Grupo: {item.createdbyid?.group?.name}</p>
                    </Grid>
                    <Grid item md={12} xs={12} sm={12} className="subject">
                      <p className="info__subject">Correo: {item.oportunity?.soldby?.email}</p>
                    </Grid>
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <p className="info__titles">Datos de la Venta:</p>
                    </Grid>
                    <Grid item md={6} className="subject">
                      <p className="info__subject">
                        Concepto: {item.oportunity?.concept ? item.oportunity?.concept : "N/A"}
                      </p>
                      <p className="info__subject"> Monto total: {formatNumber(item.oportunity?.amount)}</p>
                      <p className="info__subject">
                        Observaciones :
                        {item.oportunity?.generalobservations
                          ? item.oportunity?.generalobservations
                          : "Sin observaciones"}
                      </p>
                    </Grid>
                    <Grid item md={6} className="subject">
                      <p className="info__subject">Comisión: {formatNumber(item.oportunity?.comission)}</p>
                    </Grid>
                  </Grid>
                  <Grid container className="contenido__footer__seePdf">
                    <Grid item md={12} sm={12} xs={12} className="date">
                      <Tooltip title="Opciones pdf" arrow={true}>
                        <IconButton aria-describedby={idpdf} onClick={e => handleClick(e, item)} className="menuButton">
                          <PictureAsPdf className="pdf" />
                          Ver Pdf
                        </IconButton>
                      </Tooltip>
                      <MenuFile
                        id={idpdf}
                        open={openpdf}
                        anchorEl={anchorElPdf}
                        onClose={menuOrderHiddenpdf}
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
                              window.open(item?.oportunity?.quoteurl, "_blank");
                              menuOrderHiddenpdf();
                            }}
                          >
                            PDF COTIZACION
                          </Button>
                          <Button
                            className="option"
                            onClick={() => {
                              window.open(item?.url, "_blank");
                              menuOrderHiddenpdf();
                            }}
                          >
                            PDF PEDIDO
                          </Button>
                        </div>
                      </MenuFile>
                    </Grid>
                  </Grid>
                </div>
              ))}
              <div className="contenido__pagination">
                <IconButton
                  color="primary"
                  disabled={page <= 1 ? true : false}
                  className="contenido__pagination__buttonBefore"
                  onClick={() => setPage(page - 1)}
                >
                  <NavigateBefore className="contenido__pagination__buttonBefore__icon" />
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={page >= Math.ceil(totalOrders / limitOrders) ? true : false}
                  className="contenido__pagination__buttonNext"
                  onClick={() => setPage(page + 1)}
                >
                  <NavigateNext className="contenido__pagination__buttonNext__icon" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </Main>
      <div className="drawer_footer">
        <Button
          className="drawer_footer__button"
          onClick={() =>
            router.push({
              pathname: "/compras/pedidos",
            })
          }
        >
          Ver Todos los Pedidos
          <ExitToApp className="drawer_footer__button__icon" />
        </Button>
      </div>
      {alert?.show && (
        <AlertOrder>
          <Alert severity={alert.severity} show={alert.show.toString()} type={alert.type}>
            {alert.message}
          </Alert>
        </AlertOrder>
      )}

      <ConfirmOrder open={showConfirmOrder} onClose={closeDialogConfirm}>
        <div className="container">
          <div className="container__head">
            <p className="container__head__title">Confirmación de Pedido</p>
          </div>
          <Grid container className="container__body">
            <Grid item md={12} sm={12} xs={12} className="container__body__item">
              <p className="container__body__item__title">Concepto</p>
              <p className="container__body__item__info">{dataOrderConfirm?.folio}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Monto total</p>
              <NumberFormat
                className="container__body__item__info"
                value={dataOrderConfirm.oportunity?.amount}
                thousandSeparator={true}
                displayType="text"
                prefix="$"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Comisión total</p>
              <NumberFormat
                className="container__body__item__info"
                value={dataOrderConfirm.oportunity?.comission}
                thousandSeparator={true}
                displayType="text"
                prefix="$"
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="container__body__item">
              <p className="container__body__item__title">Observaciones</p>
              <p className="container__body__item__info">
                {dataOrderConfirm.oportunity?.generalobservations
                  ? dataOrderConfirm.oportunity?.generalobservations
                  : "Sin observaciones"}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Factura</p>
              <p className="container__body__item__info">{dataOrderConfirm.billing ? "Facturado" : "No Factura"}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Estatus de la Orden</p>
              <p className="container__body__item__info">{dataOrderConfirm.orderstatus?.name}</p>
            </Grid>
          </Grid>
          <div className="container__footer">
            <div className="container__footer__buttons">
              {isloaderSaveChanges ? (
                <CircularProgress className="container__footer__buttons__loader" />
              ) : (
                <>
                  <Button className="container__footer__buttons__cancel" onClick={closeDialogConfirm}>
                    Cancelar
                  </Button>

                  <Button className="container__footer__buttons__confirm" onClick={updateOrder}>
                    Confirmar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </ConfirmOrder>
      <ConfirmOrder open={showRejectedOrder} onClose={closeDialogRejected}>
        <div className="container">
          <div className="container__head">
            <p className="container__head__title">Rechazar Pedido</p>
          </div>
          <Grid container className="container__body">
            <Grid item md={12} sm={12} xs={12} className="container__body__item">
              <p className="container__body__item__title">Concepto</p>
              <p className="container__body__item__info">{dataOrderConfirm?.folio}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Monto total</p>
              <NumberFormat
                className="container__body__item__info"
                value={dataOrderConfirm.oportunity?.amount}
                thousandSeparator={true}
                displayType="text"
                prefix="$"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Comisión total</p>
              <NumberFormat
                className="container__body__item__info"
                value={dataOrderConfirm.oportunity?.comission}
                thousandSeparator={true}
                displayType="text"
                prefix="$"
              />
            </Grid>
            <Grid item md={12} sm={12} xs={12} className="container__body__item">
              <p className="container__body__item__title">Observaciones</p>
              <p className="container__body__item__info">
                {dataOrderConfirm.oportunity?.generalobservations
                  ? dataOrderConfirm.oportunity?.generalobservations
                  : "Sin observaciones"}
              </p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Factura</p>
              <p className="container__body__item__info">{dataOrderConfirm.billing ? "Facturado" : "No Factura"}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Estatus de la Orden</p>
              <p className="container__body__item__info">{dataOrderConfirm.orderstatus?.name}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="container__body__item">
              <p className="container__body__item__title">Razon</p>
              <Select
                maxMenuHeight={220}
                className="dialogContainer__item__select"
                placeholder="Selecciona una opción"
                options={rejectedReasons}
                onChange={e => setRejectedOptionSelected(e.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
              />
            </Grid>
          </Grid>
          <div className="container__footer">
            <div className="container__footer__buttons">
              {isloaderSaveChanges ? (
                <CircularProgress className="container__footer__buttons__loader" />
              ) : (
                <>
                  <Button className="container__footer__buttons__cancel" onClick={closeDialogRejected}>
                    Cancelar
                  </Button>

                  <Button className="container__footer__buttons__confirm" onClick={rejectedOrder}>
                    Confirmar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </ConfirmOrder>
    </DrawerStyle>
  );
}

const Main = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
  .drawer_header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: sticky;
    z-index: 50;
    top: 0;
    padding: 15px 8px;
    background-color: #dce1f6;
    margin-bottom: 15px;
    box-shadow: 0px 1px 2px #abb2b9;
    &__title {
      display: flex;
      align-items: center;
      &__icon {
        font-size: 20px;
        margin-right: 2px;
      }
      &__iconReload {
        margin-top: 5px;
        font-size: 20px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__iconFilter {
        margin-top: 5px;
        font-size: 18px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__iconOrder {
        margin-top: 5px;
        font-size: 20px;
        margin-left: 10px;
        transition: 0.3s;
        &:hover {
          color: green;
          cursor: pointer;
        }
      }
      &__active {
        color: #1b69b6;
        font-size: 20px;
      }
      &__Subtitle {
        font-size: 21px;
        font-weight: 500;
        margin-right: 2px;
        &__total {
          color: #fff;
          padding: 1px 4px;
          border-radius: 5px;
          background-color: #3f51b5;
          margin-top: -8px;
          font-size: 11px;
          font-weight: 600;
          margin-left: 2px;
        }
      }
    }
    &__button {
      width: 20px;
      height: 20px;
      color: red;
    }
    &__icon {
      font-size: 22px;
    }
  }
  .orderDiv {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 18px;
    &__titleOrder {
      font-size: 14px;
    }
    &__title {
      font-size: 14px;
      margin-left: 3px;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      &__icon {
        margin-bottom: -3px;
        font-size: 17px;
      }
    }
    &__title2 {
      font-size: 14px;
      margin-left: 3px;
      font-weight: 500;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
      &__icon {
        margin-bottom: -3px;
        font-size: 17px;
      }
    }
  }
  .drawer_filters {
    padding: 8px;
    padding-right: 8px;
    padding-left: 8px;
    background-color: #fff;
    background-color: #fff;
    &__selects {
      display: flex;
      justify-content: initial;
      /* margin-bottom: 10px; */
      margin-bottom: 6px;
      &__containerLeft {
        margin-left: 8px;
        margin-right: 8px;
        width: 100%;
        .order-select {
          -webkit-box-align: center;
          align-items: center;
          background-color: rgb(255, 255, 255);
          border-color: rgb(204, 204, 204);
          border-radius: 4px;
          border-style: solid;
          border-width: 1px;
          cursor: default;
          display: flex;
          flex-wrap: wrap;
          -webkit-box-pack: justify;
          justify-content: space-between;
          min-height: 25px;
          position: relative;
          transition: all 100ms ease 0s;
          box-sizing: border-box;
          outline: 0px !important;
          color: #103c82;
          font-weight: 500;
        }
        &__header {
          display: flex;
          align-items: center;
          &__title {
            color: #585858;
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 3px;
          }
          &__icon {
            margin-left: 2px;
            font-size: 14px;
            color: #585858;
          }
        }
        &__selectType {
          width: 100%;
          height: 35px;
          margin-bottom: 18px;
          font-size: 15px;
          padding: 5px;
          border-top: none;
          border-left: none;
          border-right: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
      .order {
        display: flex;
        align-items: center;

        margin-top: 6px;
      }
      &__containerRight {
        width: 100%;
        margin-left: 8px;
        margin-right: 8px;
        &__header {
          display: flex;
          align-items: center;
          &__title {
            font-size: 14px;
            color: #585858;
          }
          &__icon {
            margin-left: 2px;
            font-size: 14px;
            color: #585858;
          }
        }
        &__selectDate {
          width: 100%;
          height: 35px;
          margin-bottom: 18px;
          font-size: 15px;
          padding: 5px;
          border-top: none;
          border-left: none;
          border-right: none;
          outline: none;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }
    &__selectsOrder {
      padding-right: 8px;
      padding-bottom: 8px;
      padding-left: 8px;
      margin-left: 11px;
    }
    &__date {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      &__container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-right: 8px;
        margin-left: 8px;
        &__title {
          font-size: 14px;
          color: #585858;
        }
        &__calendar {
          font-family: Arial, Helvetica, sans-serif;
          padding: 3px;
          font-size: 13px;
          border-top: none;
          border-left: none;
          border-right: none;
          border-bottom: 1px solid;
          outline: none;
        }
      }
      &__icon {
        margin-top: -45px;
        margin-left: -28px;
        margin-right: 8px;
        font-size: 18px;
        color: red;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  .results {
    display: flex;
    align-items: center;
    z-index: 100;
    margin-bottom: 8px;
    font-style: italic;
    font-size: 14px;
    margin-left: 13px;
    border-radius: 5px;
    padding: 2px;
    background-color: #d5d8dc;
    font-weight: 500;
    width: fit-content;

    &__icon {
      margin-bottom: -2px;
      margin-left: 2px;
      font-size: 16px;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        color: red;
      }
    }
  }
  .contenido {
    &__item {
      width: 100%;
      padding: 15px 16px;
      border-bottom: 1px solid #d5d8dc;
      transition: 0.3s;
      &:hover {
        background-color: #f3f3f3;
      }
    }
    &__header {
      width: 100%;
      display: flex;
      align-items: center;
      margin-bottom: 5px;

      .info {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 4px;
        &__title {
          font-size: 15px;
          font-weight: 500;
          color: #103c82;
          &:hover {
            cursor: pointer;
          }
        }
        &__link {
          font-size: 13px;
          font-weight: 500;
          color: #1b69b6;
          margin-bottom: 1px;
          &:hover {
            cursor: pointer;
          }
        }
        &__icon {
          width: 27px;
          height: 27px;
          padding: 5px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
        &__titles {
          font-size: 15px;
          font-weight: 700;
          color: #616161;
        }
        &__subject {
          font-size: 13px;
          font-weight: 500;
          color: #585858;
          margin-bottom: 1px;
        }
        &__containerFiles {
          margin-top: 10px;

          &__item {
            display: block;
            border: 1px solid rgb(220, 225, 246);
            margin-left: 4px;
            border-radius: 5px;
            padding: 7px;
            margin-bottom: 4px;
            max-width: 68px;
            .iconFile {
              font-size: 20px;
              margin-right: 5px;
              color: #1b69b6;
            }
            .word {
              color: #2979ff;
            }
            .pdf {
              color: #ff1212;
            }
            .image {
              color: #39b2e7;
            }
            .excel {
              color: #148248;
            }
            .default {
              color: #405189;
            }
            .titleFiles {
              margin-top: 10px;
            }
            .itemTitleFile {
              width: 100%;
              font-size: 14px;
              font-weight: 500;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              &:hover {
                color: #2196f3;
                cursor: pointer;
                text-decoration: underline;
              }
            }
          }
        }
      }
      .aproved {
        color: white;
        max-width: 163px;
        width: 100%;
        padding: 4px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 100;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
        background-color: green;
        margin-left: 7px;
      }
      .denied {
        color: white;
        background-color: red;
        max-width: 163px;
        margin-left: 7px;
        width: 100%;
        padding: 4px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 100;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
      .pending {
        margin-left: 7px;
        max-width: 163px;
        background-color: rgb(229, 202, 10);
        color: rgb(255, 255, 255);
        width: 100%;
        padding: 4px;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 100;
        font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      }
      &__info {
        display: flex;
        flex-direction: row;
        &__title {
          font-size: 17px;
          font-weight: 500;
        }
        &__icon {
          font-size: 20px;
          margin-right: 5px;
          color: #fff;
          border-radius: 50%;
          padding: 3px;
          background-color: black;
        }
        &__content {
          cursor: default;
          height: fit-content;
          text-align: center;
          border-radius: 5px;
          font-weight: bold;
          font-size: 13px;
          padding: 5px;
          margin-left: 50px;
        }
        .aproved {
          color: white;
          background-color: green;
        }
        .denied {
          color: white;
          background-color: red;
        }
        .pending {
          color: #000;
          background-color: yellow;
        }
      }
      &__options {
        display: flex;
        align-items: center;
        justify-content: right;
        &__button {
          width: 20px;
          height: 20px;
          &__icon {
            color: #3f51b5;
            font-size: 35px;
            padding: 5px;
          }
        }
      }
      &__iconCheck {
        font-size: 20px;
        color: #d35400;
      }
    }
    &__content {
      font-size: 12px;
      margin-top: 5px;
      margin-bottom: 10px;
      &__infoExecutive {
        margin-bottom: 10px;
      }
      &__title {
        font-size: 13px;
        font-weight: 500;
      }
      &__subject {
        font-weight: 500;
        font-size: 12px;
      }
      &__description {
        font-size: 13px;
        margin-top: 5px;
        margin-bottom: 15px;
      }
      &__place {
        display: flex;
        align-items: center;
        &__title {
          font-size: 13px;
          font-weight: 500;
        }
      }
    }

    &__footer {
      display: flex;
      flex-direction: column;
      &__date {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 500;
      }
      &__time {
        margin-top: 3px;
        display: flex;
        justify-content: space-between;
        font-size: 12px;
      }
      &__buttons {
        display: flex;
        justify-content: right;
      }

      &__seePdf {
        display: flex;
        align-items: end;
        justify-content: end;
        .menuButton {
          border-radius: 8px 8px 8px 8px;
          font-size: 14px;
          font-weight: 600;
          color: #585858;
        }
        .date {
          display: flex;
          align-items: end;
          justify-content: end;
        }
      }
    }
    &__pagination {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      &__buttonBefore {
        width: 35px;
        height: 35px;
        margin-right: 10px;
        &__icon {
          font-size: 30px;
        }
      }
      &__buttonNext {
        width: 35px;
        height: 35px;
        margin-left: 10px;
        &__icon {
          font-size: 30px;
        }
      }
    }
    &__empty {
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      &__title {
        color: #abb2b9;
      }
      &__image {
        margin-top: 50px;
        margin-bottom: 15px;
        width: 120px;
        height: 120px;
      }
    }
    &__loader {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 50px;
    }
  }
`;

const DrawerStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 450px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .drawer_footer {
    padding: 15px;
    z-index: 100;
    position: fixed;
    bottom: 0;
    right: 0;
    display: flex;
    &__button {
      display: flex;
      align-items: center;
      text-transform: capitalize;
      font-size: 11px;
      border: 1px solid rgb(16, 60, 130);
      background-color: rgb(16, 60, 130);
      color: #fff;
      &:hover {
        color: rgb(16, 60, 130);
      }
      &__icon {
        margin-top: -2px;
        margin-left: 5px;
        font-size: 18px;
      }
    }
  }
`;

const MenuOrder = styled(Popover)`
  .bodyMenu {
    &__option {
      display: flex;
      align-items: center;
      font-size: 13px;
      padding: 5px;
      transition: 0.3s;
      &:hover {
        color: #fff;
        background-color: rgb(16, 60, 130);
        cursor: pointer;
        .confirm {
          color: #fff;
        }
      }
      &__icon {
        margin-right: 5px;
        font-size: 15px;
      }
      .cancel {
        color: red;
      }
      .confirm {
        color: #103c82;
      }
    }
  }
`;

const ConfirmOrder = styled(Dialog)`
  .container {
    &__head {
      padding: 9px;
      background-color: #103c82;
      color: #fff;
      margin-bottom: 10px;
      &__title {
        font-size: 18px;
        font-weight: 500;
      }
    }
    &__body {
      padding: 10px;
      &__item {
        margin-bottom: 10px;
        &__title {
          font-size: 15px;
          color: grey;
        }
        &__info {
          font-size: 15.5px;
          font-weight: 500;
        }
      }
    }
    &__footer {
      padding: 10px;
      display: flex;
      flex-direction: row-reverse;
      &__buttons {
        &__cancel {
          color: #fff;
          background-color: #000000;
          text-transform: capitalize;
          &:hover {
            color: #000;
            border-color: #000;
          }
        }
        &__confirm {
          margin-left: 10px;
          color: #fff;
          background-color: #0c203b;
          text-transform: capitalize;
          &:hover {
            color: #0c203b;
            border-color: #0c203b;
          }
        }
        &__loader {
          margin-right: 30px;
        }
      }
    }
  }
`;

const AlertOrder = styled.div`
  position: fixed;
  z-index: 50;
`;
const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
    "&$checked + $track": {
      backgroundColor: colors.primaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch);
export const MenuFile = styled(Popover)`
  .container {
    display: flex;
    flex-direction: column;
    .option {
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      border-radius: 0px;
      color: #3f51b5;
      font-size: 13px;
      &:hover {
        background-color: #3f51b5;
        color: #fff;
      }
    }
  }
`;
