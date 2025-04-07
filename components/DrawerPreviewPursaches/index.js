import React, { useEffect, useState } from "react";
import { Button, Grid, CircularProgress, LinearProgress, Box, Link, Tooltip, Modal } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { Assignment, CheckCircle, FiberManualRecord, Launch, Today } from "@material-ui/icons";
import { formatDate, formatNumber, handleGlobalAlert, toUpperCaseChart, validateURL } from "../../utils";
import { useRouter } from "next/router";
import useModal from "../../hooks/useModal";
import { DrawerStyled } from "./styles";
import { api } from "../../services/api";
import { saveAs } from "file-saver";
import Files from "../Files";
import VerifyOrder from "../ModalVerifyOrder";
import ProductsShipping from "../ProductsShipping";
import RemoveVerifyOrder from "../ModalRemoveVerifiedOrder";
export default function DrawerPursaches({
  openDrawerPreviewOrder,
  setOpenDrawerPreviewOrder,
  dataDrawerPreviewOrder,
  flag,
  setFlag,
}) {
  const dispatch = useDispatch();
  const { open: openVerify, toggleModal: toggleOpenVerify, closeModal: closeModalVerify } = useModal();
  const { open: openRemoveVerify, toggleModal: toggleRemoveVerify, closeModal: closeRemoveVerify } = useModal();
  const router = useRouter();
  const [tracking, setTracking] = useState([]);
  const [dataOrder, setDataOrder] = useState({});
  //envios
  const [shippings, setShippings] = useState([]);
  //productos
  const [load, setload] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const [loadingPdf, setLoadingpdf] = useState(false);
  const idOrder = dataDrawerPreviewOrder?.id;
  const idShipping = shippings?.id;
  const [loaderComplete, setLoaderComplete] = useState(false);
  const [ordersVerify, setOrdersVerify] = useState({});
  //pedidios
  useEffect(() => {
    let mounted = true;
    if ((mounted, idOrder)) {
      getInitialData();
    }
    return () => (mounted = false);
  }, [idOrder, flag]);
  //envios
  useEffect(() => {
    getDataShippings();
  }, [idOrder]);

  const getInitialData = async () => {
    try {
      let queryTracking = {};
      setload(true);
      let include =
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime";
      let params = { showproducts: 2, include: include, subquery: 1, showbilladdress: 0 };
      let p = await api.get(`orders/${idOrder}`, { params });
      p.data.orderId = p.data.id;
      p.data.prospectId = p.data.oportunity.prospectId;
      let results = p.data;
      setDataOrder(results);
      queryTracking.orderId = dataDrawerPreviewOrder?.id;
      let tracking = await api.get(`trackings?where=${JSON.stringify(queryTracking)}&order=-createdAt&include=phase`);
      setTracking(tracking.data.results);
      setload(false);
    } catch (error) {
      setload(false);
      handleGlobalAlert("error", " ¡Error al cargar Datos de pedidos!", "basic", dispatch);
    }
  };

  //envio de una order
  const getDataShippings = async () => {
    try {
      let query = { orderId: idOrder };
      const params = {
        where: JSON.stringify(query),
        include: "address,address.city,address.entity,address.postal",
      };
      let shipping = await api.get(`shippings`, { params });
      let result = shipping.data.results[0];
      setShippings(result);
    } catch (error) {
      handleGlobalAlert("error", " ¡Error al cargar Datos de Envios!", "basic", dispatch);
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

  const handleDownloadFile = async item => {
    try {
      setLoadingpdf(true);
      let typeFile = item?.url.split(".").pop();
      let typeFileName = item?.url.split("/").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: validateURL(item?.url),
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
      pathname: "/compras/pedidos/pedido",
      query: { pe: item.id, pr: item?.oportunity?.prospectId, op: item?.oportunityId },
    });
  };
  const handleClickVerify = item => {
    if (item?.data?.isverified !== true) {
      setOrdersVerify(item);
      toggleOpenVerify();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya está verificado!", "basic", dispatch);
    }
  };
  const handleClickRemoveVerified = item => {
    if (item?.data?.isverified !== false) {
      setOrdersVerify(item);
      toggleRemoveVerify();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya fue removido de verificados!", "basic", dispatch);
    }
  };

  const thereIsData = data => {
    if (data) {
      return <p className="cell">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
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
              <Tooltip title="Ver más información">
                <Launch className="redirec" onClick={() => handleClickOrders(dataOrder)} />
              </Tooltip>
            </div>
            <div>
              {dataOrder?.isverified !== true && (
                <Button
                  variant="contained"
                  className="button_Verified"
                  disabled={loaderComplete}
                  onClick={() => handleClickVerify(dataOrder)}
                >
                  Verificar Pedido
                </Button>
              )}
              {dataOrder?.isverified !== false && (
                <Button
                  variant="contained"
                  className="button_RemoveVerified"
                  disabled={loaderComplete}
                  onClick={() => handleClickRemoveVerified(dataOrder)}
                >
                  Remover de Verificados
                </Button>
              )}
              {loadingPdf === false ? (
                <Button className="button_download" onClick={() => handleDownloadFile(dataOrder)}>
                  Descargar PDF
                </Button>
              ) : (
                <Button variant="contained" className="button_download">
                  <CircularProgress style={{ color: "white" }} size={23} />
                  Descargando
                </Button>
              )}
            </div>
          </div>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más Información">
              <p className="text" onClick={() => handleClickOrders(dataOrder)}>
                Datos Pedido
              </p>
            </Tooltip>
          </div>
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

            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Observaciones Generales Pedido</p>
              {thereIsData(dataOrder?.observations)}
            </Grid>
          </Grid>
          <div className="divider" />

          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text">Dirección de envio</p>
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
              {thereIsData(dataOrder?.phone)}
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
            <Grid item xs={12}>
              <ProductsShipping
                typeOrder={"order"}
                dataIdShipping={idShipping}
                data={dataOrder}
                isShipping={"compras"}
              />
            </Grid>
          </Grid>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <p className="text">Datos de Facturación</p>
          </div>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Facturación</p>
              <p className="cell">{dataOrder?.billing ? "Si" : "No"}</p>
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
              dataOrder?.billing == true && (
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
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text" onClick={() => handleClickOrders(dataOrder)}>
                Datos Ejecutivo
              </p>
            </Tooltip>
          </div>
          <div className="divider_white" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Nombre</p>
              {thereIsData(dataOrder?.oportunity?.soldby?.fullname)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Teléfono</p>
              {thereIsData(dataOrder?.oportunity?.soldby?.phone)}
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Correo</p>
              {thereIsData(dataOrder?.oportunity?.soldby?.email)}
            </Grid>
          </Grid>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más información">
              <p className="text" onClick={() => handleClickOrders(dataOrder)}>
                Datos Venta
              </p>
            </Tooltip>
          </div>
          <div className="divider_white" />
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Concepto</p>
              {thereIsData(dataOrder?.oportunity?.concept)}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Monto Total</p>
              {thereIsData(formatNumber(dataOrder?.oportunity?.amount))}
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <p className="headers">Fecha de Venta</p>
              {thereIsData(formatDate(dataOrder?.oportunity?.soldat))}
            </Grid>

            <Grid item xs={12}>
              <p className="headers">Observaciones de Venta</p>

              {thereIsData(dataOrder?.oportunity?.generalobservations)}
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

      <VerifyOrder
        isRoleShopping={false}
        open={openVerify}
        ordersVerify={ordersVerify}
        close={closeModalVerify}
        refetch={flag}
        setRefetch={setFlag}
        toggleVerify={toggleOpenVerify}
      />
      <RemoveVerifyOrder
        open={openRemoveVerify}
        ordersVerify={ordersVerify}
        close={closeRemoveVerify}
        refetch={flag}
        setRefetch={setFlag}
        toggleVerify={toggleRemoveVerify}
      />
    </DrawerStyled>
  );
}
