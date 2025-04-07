import React, { useState, useEffect } from "react";
import { LindeDivider, PreviewProspectStyle } from "./styles";
import InfoProspect from "../InformationProspect";
import TimeLinePrewiew from "../UI/molecules/TimeLinePrewiew";
import PreviewPendings from "../PreviewPendings";
import { api } from "../../services/api";
import { Badge, Box, Grid, LinearProgress, Link } from "@material-ui/core";
import { formatDate, formatNumber, toUpperCaseChart } from "../../utils";
import { Category, LibraryBooks, NotesOutlined } from "@material-ui/icons";

export default function PreviewShipping(props) {
  const { shipment, isOpen, close } = props;
  const [load, setload] = useState(true);
  const [viewMore, setViewMore] = useState(false);
  const idOrder = shipment?.itemBD?.orderId;
  const [dataOrder, setDataOrder] = useState([]);
  useEffect(() => {
    let mounted = true;
    if ((mounted, idOrder)) {
      getInitialData();
    }

    return () => (mounted = false);
  }, [idOrder]);

  const getInitialData = async () => {
    try {
      setload(true);
      let include =
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime";
      let params = { showproducts: 2, include: include, subquery: 1, showbilladdress: 0 };
      let p = await api.get(`orders/${idOrder}`, { params });

      setDataOrder(p.data);
      setload(false);
    } catch (error) {
      setload(false);
      // handleGlobalAlert("error", " ¡Error al cargar Datos!", "basic", dispatch);
    }
  };

  const thereIsData = data => {
    if (data) {
      return <p className="data capitalize">{data}</p>;
    } else {
      return <span>N/A</span>;
    }
  };

  return (
    <PreviewProspectStyle open={isOpen} onClose={close} anchor="right">
      {!load && (
        <div className="preview_prospect">
          <div className="preview_prospect__header">
            <p className="title">Datos del Envío</p>
          </div>
          <LindeDivider />
          <div className="preview_prospect__body">
            <div className="info_prospect">
              <Grid container={true} spacing={2} className="info_prospect">
                <Grid item={true} md={12} sm={12} xs={12}>
                  <div className="titleHeader">
                    <LibraryBooks className="icon" />

                    <p className="headersTitle">Datos de pedido</p>
                  </div>
                </Grid>

                <Grid item={true} md={4} sm={6}>
                  <p className="title">Folio</p>
                  {thereIsData(shipment?.folio)}
                </Grid>
                <Grid item={true} md={4} sm={6} xs={6}>
                  <p className="title">Estado de Pedido</p>
                  {thereIsData(shipment?.itemBD?.order?.orderstatus?.name)}
                </Grid>
                <Grid item={true} md={4} sm={6} xs={6}>
                  <p className="title">Cuenta de Pago</p>
                  {thereIsData(toUpperCaseChart(shipment?.itemBD?.order?.paymentaccount?.name))}
                </Grid>
                <Grid item={true} md={12} sm={12} xs={12}>
                  <p className="title">Observaciones Generales</p>
                  {thereIsData(shipment?.itemBD?.order?.generalobservations)}
                </Grid>
                <LindeDivider />
                <Grid item={true} md={12} sm={12} xs={12}>
                  <div className="titleHeader">
                    <LibraryBooks className="icon" />

                    <p className="headersTitle">Datos de Envío</p>
                  </div>
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Recibe</p>
                  {thereIsData(shipment?.itemBD?.receive)}
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Teléfono</p>
                  {thereIsData(shipment?.itemBD?.order?.phone)}
                </Grid>

                <Grid item xs={4}>
                  <p className="title">Calle</p>
                  {thereIsData(shipment?.itemBD?.address?.street)}
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Número Exterior</p>
                  {thereIsData(shipment?.itemBD?.address?.ext_number)}
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Número Interior</p>
                  {thereIsData(shipment?.itemBD?.address?.int_number)}
                </Grid>

                <Grid item xs={4}>
                  <p className="title">Colonia</p>
                  {thereIsData(shipment?.itemBD?.address?.settlement)}
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Codigo Postal</p>
                  {thereIsData(shipment?.itemBD?.address?.postal?.postal_code)}
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Estado</p>
                  {thereIsData(shipment?.itemBD?.address?.entity?.name)}
                </Grid>
                <Grid item xs={4}>
                  <p className="title">Municipio</p>
                  {thereIsData(shipment?.itemBD?.address?.city?.name)}
                </Grid>

                <Grid item xs={4}>
                  <p className="title">Referencias</p>
                  {thereIsData(shipment?.itemBD?.address?.references)}
                </Grid>
                <LindeDivider />
                <Grid item={true} md={12} sm={12} xs={12}>
                  <div className="titleHeader">
                    <LibraryBooks className="icon" />

                    <p className="headersTitle">Datos de Factura</p>
                  </div>
                </Grid>

                <Grid item xs={4}>
                  <p className="title">Facturación</p>
                  <p className="data capitalize">{dataOrder?.billing ? "Si" : "No"}</p>
                </Grid>
                {viewMore && dataOrder?.billing == true ? (
                  <>
                    <Grid item xs={4}>
                      <p className="title">Razon Social</p>
                      {thereIsData(dataOrder?.bill?.businessname)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">RFC</p>
                      {thereIsData(dataOrder?.bill?.rfc)}
                    </Grid>

                    <Grid item xs={4}>
                      <p className="title">CFDI</p>

                      {thereIsData(dataOrder?.bill?.cfdi?.name)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Regimen Fiscal</p>

                      {thereIsData(dataOrder?.bill?.taxregime?.name)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Metodo de Pago</p>

                      {thereIsData(dataOrder?.bill?.paymentmethod?.name)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Forma de Pago</p>

                      {thereIsData(dataOrder?.bill?.paymentway?.name)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Teléfono de Facturación</p>
                      {thereIsData(dataOrder?.bill?.phone)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Calle</p>
                      {thereIsData(dataOrder?.bill?.address?.street)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Número interior</p>
                      {thereIsData(dataOrder?.bill?.address?.int_number)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Número exterior</p>
                      {thereIsData(dataOrder?.bill?.address?.ext_number)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Colonía</p>
                      {thereIsData(dataOrder?.bill?.address?.settlement)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Codigo Postal</p>
                      {thereIsData(dataOrder?.bill?.address?.postal?.postal_code)}
                    </Grid>

                    <Grid item xs={4}>
                      <p className="title">Estado </p>
                      {thereIsData(dataOrder?.bill?.address?.entity?.name)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Municipio</p>
                      {thereIsData(dataOrder?.bill?.address?.city?.name)}
                    </Grid>
                    <Grid item xs={4}>
                      <p className="title">Fecha de Facturación</p>
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

                <LindeDivider />
                <Grid item={true} md={12} sm={12} xs={12}>
                  <p className="headersTitle">Datos de Ejecutivo</p>
                </Grid>
                <Grid item={true} md={4} sm={6} xs={6}>
                  <p className="title">Nombre</p>
                  {thereIsData(shipment?.itemBD?.order?.createdbyid?.fullname)}
                </Grid>
                <Grid item={true} md={4} sm={6} xs={6}>
                  <p className="title">Correo</p>
                  {thereIsData(shipment?.itemBD?.order?.createdbyid?.email)}
                </Grid>
                <Grid item={true} md={4} sm={6} xs={6}>
                  <p className="title">Telefono</p>
                  {thereIsData(shipment?.itemBD?.order?.createdbyid?.phone)}
                </Grid>
                <LindeDivider />
                <Grid item={true} md={12} sm={12} xs={12}>
                  <div className="titleHeader">
                    <Category className="icon" />

                    <p className="headersTitle">Productos</p>
                  </div>
                </Grid>

                <Grid item={true} md={12} sm={12} xs={12}>
                  <div className="card">
                    <p className="title">{shipment?.itemBD?.productsoportunity?.product?.name}</p>
                    <p className="code">Codigo: {shipment?.itemBD?.productsoportunity?.product?.code}</p>
                    <p className="code">
                      Precio unitario:
                      {formatNumber(shipment?.itemBD?.productsoportunity?.newprice)}
                    </p>
                    <p className="code">Cantidad: {shipment?.itemBD?.productsoportunity?.quantity}</p>
                    <p className="code">Nota: {thereIsData(shipment?.itemBD?.productsoportunity?.note)}</p>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      )}
      {load && (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      )}
    </PreviewProspectStyle>
  );
}
