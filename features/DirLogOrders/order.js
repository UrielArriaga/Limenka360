import React, { useEffect, useState } from "react";
import { StyledContainerProfile } from "./styles";
import { Grid, LinearProgress, Tooltip } from "@material-ui/core";
import { Assignment, CheckCircle, HowToVote, LocalShipping } from "@material-ui/icons";
import dayjs from "dayjs";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import ReturnButton from "../../components/ReturnButton";
import TableProducts from "./components/TableProducts";
import useShippingProducts from "./hooks/useShippingProducts";

export default function Order() {
  const router = useRouter();
  const id = router.query.orden;
  const [viewFile, setViewFile] = useState(false);
  const handleChangeFile = () => setViewFile(!viewFile);
  const [unitOrder, setUnitOrder] = useState({
    isfeching: false,
    data: [],
  });
  const { productOrder } = useShippingProducts(id);

  useEffect(() => {
    if (id) {
      getPurchaseOrders(id);
    }
  }, [id]);

  const getPurchaseOrders = async id => {
    try {
      setUnitOrder({ ...unitOrder, isfeching: true });
      let params = {
        include: "taxinformation,provider,taxinformation.address,provideraddress,provideraddress.entity,provideraddress.city,provideraddress.postal",
      };
      let response = await api.get(`purchaseorders/${id}`, { params });
      setUnitOrder({ ...unitOrder, isfeching: false, data: response.data });
    } catch (error) {
      setUnitOrder({ ...unitOrder, isfeching: false });
      console.log(error);
    }
  };

  const { data } = unitOrder;
  const thereIsData = data => {
    if (data) {
      return <p className="cell">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };
  
  return (
    <StyledContainerProfile>
      <div className="main">
        <div className="ctr_prospecto">
          <ReturnButton text={"Orden de Compra"} viewFile={viewFile} handleChangeFile={handleChangeFile} />
          {viewFile ? (
            <iframe width={"100%"} height={"750px"} src="https://pa.bibdigital.ucc.edu.ar/1990/1/TM_Bertone.pdf" />
          ) : unitOrder?.isfeching ? (
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
            !unitOrder?.isfeching && (
              <div className="container">
                <div className="divider" />
                <div className="title">
                  <CheckCircle className="icon" />
                  <Tooltip title="Ver más Información">
                    <p className="text">Datos de Compra</p>
                  </Tooltip>
                </div>
                <Grid container={true} spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                    <p className="headers">Folio: <span className="text">{thereIsData(data?.folio)}</span></p>
                    <p className="headers">Telefono: <span className="text">{thereIsData(data?.phone)}</span></p>
                    <p className="headers">Metodo de pago: <span className="text">{thereIsData(data?.paymentcondition)}</span></p>
                    <p className="headers">Metodo de entrega: <span className="text">{thereIsData(data?.methoddelivery)}</span></p>
                    <p className="headers">Observaciones: <span className="text">{thereIsData(data?.observations)}</span></p>
                  </Grid>
                </Grid>
                <div className="divider" />

                <Grid container={true} spacing={3}>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="title">
                      <Assignment className="icon" />
                      <p className="text">Razón Social</p>
                    </div>

                    <p className="headers">Contacto: <span className="text">{thereIsData(data?.taxinformation?.contact)}</span></p>
                    <p className="headers">Esfera: <span className="text">{thereIsData(data?.taxinformation?.name)}</span></p>
                    <p className="headers">RFC: <span className="text">{thereIsData(data?.taxinformation?.rfc)}</span></p>
                    <p className="headers">Telefono: <span className="text">{thereIsData(data?.taxinformation?.phone)}</span></p>
                    <p className="headers">Email: <span className="text">{thereIsData(data?.taxinformation?.email)}</span></p>
                    <p className="headers">Dirección: <span className="text">{thereIsData(data?.taxinformation?.address?.street)}{thereIsData(data?.taxinformation?.address?.settlement)}</span>
                    </p>

                  </Grid>
                  <Grid item xs={12} sm={6} md={6}>
                    <div className="title">
                      <LocalShipping className="icon" />
                      <Tooltip title="Ver más Información">
                        <p className="text">Datos Proveedor</p>
                      </Tooltip>
                    </div>
                    <p className="headers">Fecha de pedido: <span className="text"> {thereIsData(dayjs(data?.provider?.createdAt).format("DD-MMMM-YYYY H:mm A"))}</span></p>
                    <p className="headers">RFC:<span className="text">{thereIsData(data?.provider?.rfc)}</span></p>
                    <p className="headers">Telefono: <span className="text">{thereIsData(data?.provider?.phone)}</span></p>
                    <p className="headers">Correo: <span className="text">{thereIsData(data?.provider?.email)}</span></p>
                    <p className="headers">Compañia: <span className="text">{thereIsData(data?.provider?.companyname)}</span></p>
                    <p className="headers">Calle: <span className="text">{thereIsData(data?.provideraddress?.street)}</span></p>
                    <p className="headers">Num.Interior: <span className="text">{thereIsData(data?.provideraddress?.int_number)}</span></p>
                    <p className="headers">Num.Exterior: <span className="text">{thereIsData(data?.provideraddress?.ext_number)}</span></p>
                    <p className="headers">C.P: <span className="text">{thereIsData(data?.provideraddress?.postal?.postal_code)}</span></p>
                    <p className="headers">Ciudad: <span className="text">{thereIsData(data?.provideraddress?.city?.name)}</span></p>
                    <p className="headers">Estado: <span className="text">{thereIsData(data?.provideraddress?.entity?.name)}</span></p>

                  </Grid>

                </Grid>

                <div className="divider" />
                <div className="title">
                  <HowToVote className="icon" />
                  <Tooltip title="Ver más Información">
                    <p className="text">Productos de la Orden</p>
                  </Tooltip>
                </div>
                <Grid container={true} spacing={3}>
                  <Grid item xs={12} sm={12} md={12}>
                    <TableProducts productOrder={productOrder} />
                  </Grid>
                </Grid>
              </div>
            )
          )}
        </div>
      </div>
    </StyledContainerProfile>
  );
}
