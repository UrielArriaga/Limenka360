import { useEffect, useState } from "react";
import { DrawerPurchasingOrderStyle } from "./styles";
import { Divider, Grid, LinearProgress, Tooltip } from "@material-ui/core";
import { api } from "../../services/api";
import { Assignment, CheckCircle, Launch, LocalShipping } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";

export default function DrawerPurchasingOrder({ show, closeDrawer, dataOrder }) {
  const router = useRouter()
  const [orderPush, setOrderPush] = useState({
    isfeching: false,
    data: [],
  });

  useEffect(() => {
    if (dataOrder?.id) {
      getPurchaseOrders(dataOrder?.id);
    } else {
      return;
    }
  }, [dataOrder]);

  const getPurchaseOrders = async id => {
    try {
      setOrderPush({ ...orderPush, isfeching: true });
      let params = {
        include: "taxinformation,provider,taxinformation.address",
      };
      let response = await api.get(`purchaseorders/${id}`, { params });
      setOrderPush({ ...orderPush, isfeching: false, data: response.data });
    } catch (error) {
      console.log(error);
    }
  };

  const { data } = orderPush;

  const thereIsData = data => {
    if (data) {
      return <p className="cell">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };

  const handleRouter=()=>{
    router.push({
      pathname: "../compras/ordenes/order",
      query: {
        id: dataOrder?.id,
      },
    });
  }
  
  return (
    <DrawerPurchasingOrderStyle anchor="right" open={show} onClose={closeDrawer} width={600}>
      {orderPush?.isfeching && (
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
      {!orderPush?.isfeching && (
        <div className="container">
          <div className="container__head">
            <div className="container__titleBox">
              <p className="title">Pedido</p>
              <Tooltip title="Ver más información">
                <Launch className="redirec" onClick={() => handleRouter()} />
              </Tooltip>
            </div>
          </div>
          <div className="divider" />
          <div className="title">
            <Assignment className="icon" />
            <Tooltip title="Ver más Información">
              <p className="text">Datos Fiscales</p>
            </Tooltip>
          </div>
          <Grid container={true} spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Contacto</p>
              {thereIsData(data?.taxinformation?.contact)}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">RFC</p>
              {thereIsData(data?.taxinformation?.rfc)}
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Telefono</p>
              {thereIsData(data?.taxinformation?.phone)}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Email</p>
              {thereIsData(data?.taxinformation?.email)}
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <p className="headers">Direccion</p>
              {thereIsData(data?.taxinformation?.address?.street)}
              {thereIsData(data?.taxinformation?.address?.settlement)}
            </Grid>
          </Grid>
          <div className="divider" />
          <div className="title">
            <LocalShipping className="icon" />
            <Tooltip title="Ver más Información">
              <p className="text">Datos Proveedor</p>
            </Tooltip>
          </div>
          <Grid container={true} spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Fecha de pedido</p>
              {thereIsData(dayjs(data?.provider?.createdAt).format("DD-MMMM-YYYY"))}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">RFC</p>
              {thereIsData(data?.provider?.rfc)}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Telefono</p>
              {thereIsData(data?.provider?.phone)}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Correo</p>
              {thereIsData(data?.provider?.email)}
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Compania</p>
              {thereIsData(data?.provider?.companyname)}
            </Grid>
           
          </Grid>
          <div className="divider" />
          <div className="title">
            <CheckCircle className="icon" />
            <Tooltip title="Ver más Información">
              <p className="text">Orden</p>
            </Tooltip>
          </div>
          <Grid container={true} spacing={3}>
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Observaciones</p>
              {thereIsData(data?.observations)}
            </Grid>

            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Metodo de pago</p>
              {thereIsData(data?.paymentcondition)}
            </Grid>
           
            <Grid item xs={12} sm={6} md={6}>
              <p className="headers">Metodo de entrega</p>
              {thereIsData(data?.methoddelivery)}
            </Grid>
            
          </Grid>
        </div>
      )}
    </DrawerPurchasingOrderStyle>
  );
}
