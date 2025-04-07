import React, { useEffect, useState } from "react";
import { Button, Grid, Popover, CircularProgress, LinearProgress, Box, Link, Tooltip } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { Assignment, FiberManualRecord, Launch, PlayForWorkOutlined, Today } from "@material-ui/icons";
import { formatDate, formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../utils";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import DataOrder from "../DataOrder";
import useModal from "../../hooks/useModal";
import ApprovedOrder from "../ModalApprovedOrder";
import { handleAlert } from "../../utils";
import RejectedOrder from "../ModalRejectedOrder";
import { saveAs } from "file-saver";
import Files from "../Files";
import { AlertFile, DrawerStyled } from "../../styles/Administracion/pedidos/previewOrder.style";

export default function DrawePreviewOrders({
  openDrawerPreviewOrder,
  setOpenDrawerPreviewOrder,
  dataDrawerPreviewOrder,
  flag,
  setFlag,
}) {
  const router = useRouter();
  const { open: openRejectedModal, toggleModal: toggleRejectedModal, closeModal: closeModalRejected } = useModal();
  const { open: openApprovedModal, toggleModal: toggleApprovedModal, closeModal: closeModalApproved } = useModal();
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const [viewMore, setViewMore] = useState(false);
  const [load, setload] = useState(true);
  const [loadingPdf, setLoadingpdf] = useState(false);
  const [loadingQuote, setLoadingQuote] = useState(false);
  const [tracking, setTracking] = useState([]);
  const [dataOrder, setDataOrder] = useState({});
  const idOrder = dataDrawerPreviewOrder?.id;
  const [loaderCompleteRejected, setLoaderCompleteRejected] = useState(false);
  const [ordersReject, setOrdersReject] = useState();
  //*Aprobar
  const [loaderCompleteApproved, setLoaderCompleteApproved] = useState(false);
  const [ordersApproved, setOrdersApproved] = useState();
  //Aprobar*
  useEffect(() => {
    let mounted = true;
    if ((mounted, idOrder)) {
      getInitialData();
    }

    return () => (mounted = false);
  }, [idOrder, flag]);

  const getInitialData = async () => {
    try {
      let queryTracking = {};
      setload(true);
      let include =
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime";
      let params = { showproducts: 2, include: include, subquery: 1, showbilladdress: 0 };
      let p = await api.get(`orders/${idOrder}`, { params });
      p.data.orderId = idOrder;
      p.data.prospectId = p.data.oportunity.prospectId;
      setDataOrder(p.data);
      queryTracking.orderId = dataDrawerPreviewOrder?.id;
      let tracking = await api.get(`trackings?where=${JSON.stringify(queryTracking)}&order=-createdAt&include=phase`);
      setTracking(tracking.data.results);
      setload(false);
    } catch (error) {
      setload(false);
      handleGlobalAlert("error", " ¡Error al cargar Datos!", "basic", dispatch);
    }
  };
  const thereIsData = data => {
    if (data) {
      return <p className="cell">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };

  const thereIsDataContact = data => {
    if (data) {
      return <p className="contact">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };

  const applyStatusStyle = status => {
    switch (status) {
      case "Pendiente de aprobación":
        return <p className="pending">{status}</p>;
      case "Rechazado":
        return <p className="rejected">{status}</p>;
      case "Aprobado":
        return <p className="ok">{status}</p>;
      default:
        return <p className="na">N/A</p>;
    }
  };
  const checkLength = array => (array?.length > 0 ? true : false);

  const handleClickProspect = item => {
    router.push({
      pathname: "/administracion/pedidos/pedido",
      query: { pe: item.id, pr: item?.oportunity?.prospectId, op: item?.oportunityId },
    });
  };

  const handleDownloadQuote = async item =>{
    try {
      setLoadingQuote(true);
      let oportunity = item?.oportunity;
      let typeFile = oportunity?.quoteurl.split(".").pop();
      let typeFileName = oportunity?.quoteurl.split("/").pop();
      let responseURL = await api.post("convert/pdfbuffer",
        {pdfurl: oportunity?.quoteurl,}, { responseType: "blob", }
      );

      const pdfBlob = new Blob([responseURL.data], {type: `application/${typeFile};charset-utf-8`,});
      saveAs(pdfBlob, `${typeFileName}`);
      setLoadingQuote(false);
    } catch (error) {
      setLoadingQuote(false);
      console.log(error);
    }
  }

  const handleDownloadFile = async item => {
    try {
      setLoadingpdf(true);
      let typeFile = item?.url.split(".").pop();
      let typeFileName = item?.url.split("/").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: item?.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${typeFileName}`);
      setLoadingpdf(false);
    } catch (error) {
      setLoadingpdf(false);
      console.log(error);
    }
  };

  const handleClickOrders = item => {
    router.push({
      pathname: "/administracion/pedidos/pedido",
      query: { pe: item.id, pr: item?.oportunity?.prospectId, op: item?.oportunity?.id },
    });
  };
  const handleClickRejectOrders = item => {
    if (item.estado !== "Rechazado") {
      setOrdersReject(item);
      toggleRejectedModal();
    } else {
      return handleGlobalAlert("warning", "El pedido ya fue Rechazado", "basic");
    }
  };
  const handleClickapproveOrder = item => {
    if (item.estado !== "Aprobado") {
      setOrdersApproved(item);
      toggleApprovedModal();
    } else {
      return handleGlobalAlert("warning", "El pedido ya fue Aprobado", "basic");
    }
  };

  return (
    <DrawerStyled
      anchor={"right"}
      open={openDrawerPreviewOrder}
      onClose={() => setOpenDrawerPreviewOrder(false)}
      width={600}
    >
      {load ? (
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
        <div>
          <div className="head">
            <div className="title">
              <p className="title">Pedido</p>
              <Tooltip title="ver pedido">
                <Launch className="redirec" onClick={() => handleClickOrders(dataOrder)} />
              </Tooltip>
            </div>
            <div>
              {roleId !== "compras" && (
                <>
                   {loadingQuote === false ? (
                    <Button className="button_download" onClick={() => handleDownloadQuote(dataOrder)}
                    > DESCARGAR COTIZACIÓN </Button> 
                  ) : (
                    <Button variant="contained" className="button_download"> 
                    <CircularProgress style={{ color: "white"}} size={23} />
                    DESCARGANDO </Button>
                  )}
                  
                  {dataOrder?.orderstatus?.status !== 3 && (
                    <Button
                      variant="contained"
                      className="button_rejected"
                      disabled={loaderCompleteRejected}
                      onClick={() => handleClickRejectOrders(dataOrder)}
                    >
                      Rechazar
                    </Button>
                  )}

                  {dataOrder?.orderstatus?.status !== 2 && (
                    <Button
                      variant="contained"
                      className="button_ok"
                      disabled={loaderCompleteApproved}
                      onClick={() => handleClickapproveOrder(dataOrder)}
                    >
                      Aprobar
                    </Button>
                  )}
                 
                  {loadingPdf === false ? (
                    <Button className="button_download" onClick={() => handleDownloadFile(dataOrder)}>
                      DESCARGAR PDF
                    </Button>
                  ) : (
                    <Button variant="contained" className="button_download">
                      <CircularProgress style={{ color: "white" }} size={23} />
                      DESCARGANDO
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="divider" />
          <Tooltip title="Ver más información">
            <p className="text" onClick={() => handleClickOrders(dataDrawerPreviewOrder)}>
              Datos de Pedido
            </p>
          </Tooltip>
          <div className="divider_white" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Folio</p>
              {thereIsData(dataOrder?.folio)}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Estado</p>
              {applyStatusStyle(dataOrder?.orderstatus?.name)}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Total</p>
              <p className="cell">{dataOrder?.total ? formatNumber(dataOrder?.total) : 0}</p>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Cuenta de Pago</p>

              {thereIsData(toUpperCaseChart(dataOrder?.paymentaccount?.name))}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Observaciones Generales Pedido</p>
              {thereIsData(dataOrder?.observations)}
            </Grid>
          </Grid>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text" onClick={() => handleClickOrders(dataDrawerPreviewOrder)}>
                Dirección de envio
              </p>
            </Tooltip>
          </div>
          <div className="divider_white" />

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Recibe</p>
              {thereIsData(dataOrder?.receive)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Teléfono</p>
              {thereIsDataContact(dataOrder?.phone)}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Calle</p>
              {thereIsData(dataOrder?.address?.street)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Número Exterior</p>
              {thereIsData(dataOrder?.address?.ext_number)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Número Interior</p>
              {thereIsData(dataOrder?.address?.int_number)}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Colonia</p>
              {thereIsData(dataOrder?.address?.settlement)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Codigo Postal</p>
              {thereIsData(dataOrder?.address?.postal?.postal_code)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Estado</p>
              {thereIsData(dataOrder?.address?.entity?.name)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Municipio</p>
              {thereIsData(dataOrder?.address?.city?.name)}
            </Grid>
            <Grid item xs={12}>
              <p className="headers">Referencias</p>
              {thereIsData(dataOrder?.address?.references)}
            </Grid>
          </Grid>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text" onClick={() => handleClickOrders(dataDrawerPreviewOrder)}>
                Datos de Facturación
              </p>
            </Tooltip>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Facturación</p>
              <p className="cell">{dataOrder?.billing ? "Si Requiere Factura" : "No Requiere Factura"}</p>
            </Grid>
            {viewMore && dataOrder?.billing == true ? (
              <>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Razon Social</p>
                  {thereIsData(dataOrder?.bill?.businessname)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">RFC</p>
                  {thereIsData(dataOrder?.bill?.rfc)}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">CFDI</p>

                  {thereIsData(dataOrder?.bill?.cfdi?.name)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Regimen Fiscal</p>

                  {thereIsData(dataOrder?.bill?.taxregime?.name)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Metodo de Pago</p>

                  {thereIsData(dataOrder?.bill?.paymentmethod?.name)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Forma de Pago</p>

                  {thereIsData(dataOrder?.bill?.paymentway?.name)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Teléfono de Facturación</p>
                  {thereIsData(dataOrder?.bill?.phone)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Calle</p>
                  {thereIsData(dataOrder?.bill?.address?.street)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Número interior</p>
                  {thereIsData(dataOrder?.bill?.address?.int_number)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Número exterior</p>
                  {thereIsData(dataOrder?.bill?.address?.ext_number)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Colonía</p>
                  {thereIsData(dataOrder?.bill?.address?.settlement)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Codigo Postal</p>
                  {thereIsData(dataOrder?.bill?.address?.postal?.postal_code)}
                </Grid>

                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Estado </p>
                  {thereIsData(dataOrder?.bill?.address?.entity?.name)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Municipio</p>
                  {thereIsData(dataOrder?.bill?.address?.city?.name)}
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <p className="headers">Fecha de Facturación</p>
                  {thereIsData(formatDate(dataOrder?.billingAt))}
                </Grid>
                <Grid item xs={12}>
                  <Link className="link" onClick={() => setViewMore(false)}>
                    Ver menos
                  </Link>
                </Grid>
              </>
            ) : (
              dataDrawerPreviewOrder?.billing == true && (
                <Grid item xs={12}>
                  <Link className="link" onClick={() => setViewMore(true)}>
                    Ver más información
                  </Link>
                </Grid>
              )
            )}
          </Grid>
          <div className="divider" />
          <Files filesFrom={"order"} data={dataOrder} />
          {/* <p className="title">Archivos</p>
          <FilesOrdersAdminLeft idOrder={dataDrawerPreviewOrder?.id}></FilesOrdersAdminLeft> */}
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text" onClick={() => handleClickOrders(dataDrawerPreviewOrder)}>
                Datos Ejecutivo
              </p>
            </Tooltip>
          </div>
          <div className="divider_white" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Nombre</p>
              {thereIsData(dataDrawerPreviewOrder?.nombre)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Teléfono</p>
              {thereIsDataContact(dataDrawerPreviewOrder?.teléfono)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Correo</p>
              {thereIsDataContact(dataDrawerPreviewOrder?.correo)}
            </Grid>
          </Grid>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text" onClick={() => handleClickOrders(dataDrawerPreviewOrder)}>
                Datos Venta
              </p>
            </Tooltip>
          </div>
          <div className="divider_white" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Concepto</p>
              {thereIsData(dataDrawerPreviewOrder?.oportunity?.concept)}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Monto Total</p>
              {thereIsData(formatNumber(dataDrawerPreviewOrder?.oportunity?.amount))}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Fecha de Venta</p>
              {thereIsData(formatDate(dataDrawerPreviewOrder?.oportunity?.soldat))}
            </Grid>

            <Grid item xs={12}>
              <p className="headers">Observaciones de Venta</p>

              {thereIsData(dataDrawerPreviewOrder?.oportunity?.generalobservations)}
            </Grid>

            <Grid item xs={12}>
              <p className="title">Productos</p>
              {checkLength(dataOrder?.oportunity?.productsoportunities) && (
                <div className="ctr_grid">
                  {dataOrder?.oportunity?.productsoportunities.map((item, index) => (
                    <div key={index} style={{ padding: 5 }}>
                      <div className="target_tracing">
                        <div className="top">
                          <div className="item">
                            <FiberManualRecord className="icon" />
                            <p className="date capitalize"></p>
                          </div>
                          <div className="item">
                            <Today className="icon" />
                            <p className="date">{formatDate(item?.product?.createdAt)}</p>
                          </div>
                        </div>
                        <span className="span">Producto</span>
                        <p>{item?.product?.name}</p>
                        <span className="span">Monto</span>
                        <p>
                          {item?.newprice === 0 ? formatNumber(item.product?.callamount) : formatNumber(item.newprice)}
                        </p>
                        <Box position="absolute" right={10} display="flex" alignItems="center">
                          <span className="span">Cantidad</span>
                          <p style={{ marginLeft: 8 }}>{item?.quantity}</p>
                        </Box>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Grid>
          </Grid>

          <div className="divider" />
          <p className="title">Seguimientos</p>
          {tracking.length > 0 ? (
            <div className="ctr_grid">
              {tracking.slice(0, 6).map((item, index) => (
                <div key={index} style={{ padding: 5 }}>
                  <div className="target_tracing">
                    <div className="top">
                      <div className="item">
                        <FiberManualRecord className="icon" />
                        <p className="date capitalize">{item?.phase?.name}</p>
                      </div>
                      <div className="item">
                        <Today className="icon" />
                        <p className="date">{formatDate(item.createdAt)}</p>
                      </div>
                    </div>
                    <span className="span">Asunto</span>
                    <p>{item.reason}</p>
                    <span className="span">Observación</span>
                    <p>{item.observations.slice(0, 180)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="tracing_empty">
              <img src="../../../empty_tracking.svg" />
              <p>Sin Seguimientos</p>
            </div>
          )}
        </div>
      )}
      <ApprovedOrder
        isRoleShopping={false}
        open={openApprovedModal}
        ordersApproved={ordersApproved}
        close={closeModalApproved}
        handleAlert={handleAlert}
        refetch={flag}
        setRefetch={setFlag}
        setLoaderCompleteApproved={setLoaderCompleteApproved}
        loaderCompleteApproved={loaderCompleteApproved}
        toggleApprovedModal={toggleApprovedModal}
      />
      <RejectedOrder
        isRoleShopping={false}
        open={openRejectedModal}
        ordersReject={ordersReject}
        close={closeModalRejected}
        handleAlert={handleAlert}
        refetch={flag}
        setRefetch={setFlag}
        toggleRejectedModal={toggleRejectedModal}
        loaderCompleteRejected={loaderCompleteRejected}
        setLoaderCompleteRejected={setLoaderCompleteRejected}
      />

      {alert?.show && (
        <AlertFile>
          <Alert severity={alert.severity} show={alert.show.toString()} type={alert.type}>
            {alert.message}
          </Alert>
        </AlertFile>
      )}
    </DrawerStyled>
  );
}
