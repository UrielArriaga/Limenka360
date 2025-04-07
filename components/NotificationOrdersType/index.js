import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Avatar, Button, CircularProgress, Fade, Grid, IconButton } from "@material-ui/core";
import { Close, ExpandLess, ExpandMore, ShoppingBasket } from "@material-ui/icons";
import { ContainerOrder } from "./styles";
import { useDispatch } from "react-redux";
import RequestCommon from "../../services/request_Common";
import { api } from "../../services/api";
import { getCountOrders } from "../../redux/slices/dashboardSlice";
import { useSelector } from "react-redux";
import { handleGlobalAlert } from "../../utils";
import { userSelector } from "../../redux/slices/userSlice";
import Router, { useRouter } from "next/router";
import AlertGlobal from "../Alerts/AlertGlobal";
export default function NotificationOrderRejected({ setIsThereNewOrder, orderData }) {
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const [isLoaderOrder, setIsLoaderOrder] = useState(false);
  const dispatch = useDispatch();
  const commonApi = new RequestCommon();
  const [isShowBill, setIsShowBill] = useState(false);
  const router = useRouter();
  const handleRedirect = () => {
    router.push({
      pathname: "/pedidos/pedido",
      query: {
        pe: orderData?.order[0]?.id,
        pr: orderData?.order[0]?.oportunity?.prospect?.id,
      },
    });
    setIsThereNewOrder(false);
  };

  const thereIsData = data => {
    if (data) {
      return data;
    } else {
      return "N/A";
    }
  };
  return (
    <ContainerOrder>
      <motion.div
        className="alert"
        initial={{ opacity: false ? 1 : 0, scale: 0.5, right: false ? 0 : -200 }}
        animate={{ opacity: false ? 0 : 1, scale: 1, right: false ? -200 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="alert__content">
          <div className="alert__content__header">
            <div className="icon">
              <ShoppingBasket className="icon__purchaseIcon" />
              <p className="icon__title">Pedido {orderData?.order[0]?.folio}</p>
            </div>
            <IconButton className="button" onClick={() => setIsThereNewOrder(false)}>
              <Close className="icon" />
            </IconButton>
          </div>
          <Grid container spacing={1} className="alert__content__body">
            <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
              <p className="infoMessage">{orderData?.message}.</p>
            </Grid>
            <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
              <div className="divider" />
            </Grid>

            <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
              <p className="infoTitle"> Datos de Pedido</p>
            </Grid>
            <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
              <p className="title">Folio</p>
              <p className="info onlyRow">{orderData?.order[0]?.folio}</p>
            </Grid>
            <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
              <p className="title">Estatus</p>
              <p className="info onlyRow">{orderData?.order[0]?.orderstatus?.name}</p>
            </Grid>
            <Grid item md={6} xs={6} sm={6} className="alert__content__body__item">
              <p className="title">Cuenta de Pago</p>
              <p className="info onlyRow">{orderData?.order[0]?.paymentaccount?.name}</p>
            </Grid>
            <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
              <p className="title">Datos de Envió</p>
              <p className="info">
                <span className="info__subTitle">Recibe:</span>
                {thereIsData(orderData?.order[0]?.receive)}
              </p>
              <p className="info">
                <span className="info__subTitle">Dirección de Envio:</span>
                calle: {thereIsData(orderData?.order[0]?.address?.street)} , #Exterior:
                {thereIsData(orderData?.order[0]?.address?.ext_number)}, #Interior:
                {thereIsData(orderData?.order[0]?.address?.int_number)}, Municipio:{" "}
                {thereIsData(orderData?.order[0]?.address?.city?.name)}, Estado:{" "}
                {thereIsData(orderData?.order[0]?.address?.entity?.name)}, CP:{" "}
                {thereIsData(orderData?.order[0]?.address?.postal?.postal_code)}.
              </p>
              <p className="info">
                <span className="info__subTitle">Referencias:</span>
                {thereIsData(orderData?.order[0]?.address?.references)}
              </p>
            </Grid>
            <Grid item md={12} xs={12} sm={12} className="alert__content__body__item">
              <p className="title">Factura</p>
              <p className="info">{orderData?.order[0]?.billing ? "Facturado" : "Sin Factura"}</p>
              {orderData?.order[0]?.billing && (
                <>
                  <span className="titleBill" onClick={() => setIsShowBill(!isShowBill)}>
                    {isShowBill ? (
                      <>
                        Ocultar Datos de Factura <ExpandLess className="iconShowMore" />
                      </>
                    ) : (
                      <>
                        Ver Datos de Factura <ExpandMore className="iconShowMore" />
                      </>
                    )}
                  </span>
                  {isShowBill && (
                    <Fade in={isShowBill}>
                      <Grid container spacing={1}>
                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">Razón Social</p>
                          <p className="info">{thereIsData(orderData?.order[0]?.bill?.businessname)}</p>
                        </Grid>
                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">RFC</p>
                          <p className="info">{thereIsData(orderData?.order[0]?.bill?.rfc)}</p>
                        </Grid>

                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">Teléfono</p>
                          <p className="info">{thereIsData(orderData.order[0]?.phone)}</p>
                        </Grid>
                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">Forma de Pago</p>
                          <p className="info">{thereIsData(orderData?.order[0]?.bill?.paymentway?.name)}</p>
                        </Grid>
                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">Método de Pago</p>
                          <p className="info">{thereIsData(orderData.order[0]?.bill?.paymentmethod?.name)}</p>
                        </Grid>
                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">CFDI</p>
                          <p className="info">{thereIsData(orderData.order[0]?.bill?.cfdi?.name)}</p>
                        </Grid>
                        <Grid item md={4} xs={4} sm={4}>
                          <p className="title">Regimen Fiscal</p>
                          <p className="info">{thereIsData(orderData.order[0]?.bill?.taxregime?.name)}</p>
                        </Grid>
                      </Grid>
                    </Fade>
                  )}
                </>
              )}
            </Grid>
          </Grid>
          <div className="alert__content__footer">
            <div className="buttonsAction">
              <Button className={`buttonsAction__bt denied`} onClick={() => setIsThereNewOrder(false)}>
                Cerrar
              </Button>
            </div>
            <div className="button">
              {isLoaderOrder === false && (
                <Button className="button__btAll" onClick={handleRedirect}>
                  Ver Información Pedido
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </ContainerOrder>
  );
}
