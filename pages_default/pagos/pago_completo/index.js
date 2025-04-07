import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Close, Visibility, ArrowBack, CheckCircle } from "@material-ui/icons";
import {
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Paper,
  Tooltip,
  Dialog,
  CircularProgress,
  LinearProgress,
} from "@material-ui/core";
import { api } from "../../../services/api";
import { toUpperCaseChart } from "../../../utils";
import { months } from "../../../BD/databd";
import { useRouter } from "next/router";
import Head from "next/head";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import dayjs from "dayjs";
import NumberFormat from "react-number-format";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import MainLayout from "../../../components/MainLayout";
export default function PagoCompleto() {
  const router = useRouter();
  const [showConfirmPay, setShowConfirmPay] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [open, setOpen] = useState(false);
  const [totalDebt, setTotalDebt] = useState(0);
  const [isLoaderProducts, setIsLoaderProducts] = useState(true);
  const [isRefetch, setIsRefetch] = useState(false);
  const [dataPayment, setDataPayment] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [formPayUpdate, setFormPayUpdate] = useState([]);
  const [data, setData] = useState([]);
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  useEffect(() => {
    getDataPayments();
    getProductsFromOportunity(router.query.o);
  }, [router.query, isRefetch]);

  const getDataPayments = () => {
    setIsLoaderProducts(true);
    let query = {
      oportunityId: router.query.o,
    };
    const params = {
      where: JSON.stringify(query),
      include: "oportunity,oportunity.prospect",
      join: "oportunity,oportunity.prospect",
      order: "date",
      all: "1",
    };
    api
      .get(`salespayments`, { params })
      .then(res => {
        let resultados = res.data.results;
        let total = 0;
        let search = [];
        resultados.forEach(item => {
          if (item.ispaid === false) {
            search.push(item);
          }
        });
        for (let i = 0; i < search.length; i++) {
          total += search[i].payment;
        }
        console.log("forEach ", search);
        // console.log(resultados);
        setTotalDebt(total);
        setData(resultados);
        setIsLoaderProducts(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoaderProducts(false);
      });
  };
  const getProductsFromOportunity = async idOportunity => {
    try {
      let query = {};
      query.id = idOportunity;
      let oportunity = await api.get(`oportunities?where=${JSON.stringify(query)}&showproducts=1`);
      let products = oportunity.data.results[0].productsoportunities;
      //Ordenar los productos alfabéticamente
      products.sort((a, b) => {
        let nameA = a.product.name.toUpperCase();
        let nameB = b.product.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
        return 0;
      });
      setAllProducts(products);
    } catch (error) {
      console.log("error al mostrar los productos", error);
    }
  };
  const splitDate = str => {
    let dates = dayjs(str);
    let month = months.filter((i, ix) => ix == dates.month());
    let day = dates.format("D");
    let year = dates.year();
    return `${month[0]} ${day}, ${year}`;
  };
  const openConfirmPay = item => {
    let payments = [];
    payments.push({
      oportunityId: item.oportunityId,
      payment: item.payment,
      comission: item.comission,
      date: item.date,
      observations: item.observations,
      ispaid: true,
      paymentId: item.id,
    });
    setShowConfirmPay(true);
    setFormPayUpdate(payments);
    setDataPayment(item);
  };
  const closeConfirmPay = () => {
    setFormPayUpdate([]);
    setShowConfirmPay(false);
  };
  const openProducts = () => {
    setShowProducts(true);
  };
  const closeProducts = () => {
    setShowProducts(false);
  };
  const validateOptionPay = index => {
    //validar que el pago anterior este pagado para poder confirmar el siguiente pago
    let positionBefore = index - 1;
    if (index >= 1) {
      if (data[positionBefore]?.ispaid === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };
  const updatePayment = async () => {
    try {
      let payment = await api.get(`salespayments/${dataPayment.id}`);
      if (!payment.data.ispaid) {
        payment.data.ispaid = true;
        payment.data.paymentId = payment.data.id;
        delete payment.data.id;
        let data = { payments: [payment.data] };
        await api.put("salespayments", data);
      }
      if (payment.status === 200) {
        closeConfirmPay();
        setIsRefetch(!isRefetch);
        handleAlert("success", "Pago - Se ha confirmado el Pago, Estatus Actualizado!", "basic");
      }
    } catch (error) {
      handleAlert("error", "Pago - Ocurrió un problema al Actualizar el Estatus!", "basic");
      console.log(error);
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: null, show: null, message: "", type: null });
    }, 3000);
  };

  return (
    <MainLayout>
      <SeeFullPaymentContainer>
        <Head>
          <title>CRM JOBS - Pago Completo</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="contenido_pagos">
            <div className="title">
              <IconButton onClick={() => router.back()}>
                <ArrowBack className="icon" />
              </IconButton>
            </div>
            <div className="information">
              <p className="information__title" onClick={() => console.log(data)}>
                Información de los Pagos
              </p>
              <Grid container spacing={2} className="information__container">
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Folio</p>
                  <p className="information__container__item__data">{data[0]?.oportunity?.concept}</p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">No. de Pagos</p>
                  <p className="information__container__item__data">{data[0]?.oportunity?.payments}</p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Adeudo Por Pagar</p>
                  <p className="information__container__item__data">
                    <NumberFormat value={totalDebt} displayType="text" thousandSeparator="," prefix={"$"} />
                  </p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Periocidad</p>
                  <p className="information__container__item__data">{data[0]?.oportunity?.paymentperiodicity}</p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Comisión</p>
                  <p className="information__container__item__data">{data[0]?.oportunity?.comissiontype}</p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Nombre del Cliente</p>
                  <p className="information__container__item__data">
                    {toUpperCaseChart(data[0]?.oportunity?.prospect?.name) +
                      " " +
                      toUpperCaseChart(data[0]?.oportunity?.prospect?.lastname)}
                  </p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Observaciones de la Venta</p>
                  <p className="information__container__item__data">
                    {toUpperCaseChart(data[0]?.oportunity?.generalobservations)}
                  </p>
                </Grid>
                <Grid item md={4} sm={6} xs={12} className="information__container__item">
                  <p className="information__container__item__title">Productos</p>
                  <p className="information__container__item__data">
                    Ver Todos
                    <IconButton onClick={openProducts}>
                      <Visibility />
                    </IconButton>
                  </p>
                </Grid>
              </Grid>
            </div>
            <div className="payments">
              <div className="payments__head">
                <p className="payments__head__title">Todos los Pagos</p>
              </div>
              <div className="payments__containerAll">
                {/* {data &&
                data?.map((item, index) => (
                  <Paper
                    elevation={2}
                    key={index}
                    className={`paperContent ${router.query.i === item.id && "paymentSelect"}`}
                  >
                    <div>
                      <p>No. de Pago</p>
                      <p className="value">{index + 1}</p>
                    </div>
                    <div>
                      <p>Fecha</p>
                      <p className="value">{splitDate(item.date)}</p>
                    </div>
                    <div>
                      <p>Monto</p>
                      <p className="value">
                        <NumberFormat
                          value={item.payment}
                          displayType="text"
                          thousandSeparator=","
                          prefix={"$"}
                        />
                      </p>
                    </div>
                    <div>
                      <p>Comisión</p>
                      <p className="value">
                        <NumberFormat
                          value={item.oportunity.comission}
                          displayType="text"
                          thousandSeparator=","
                          prefix={"$"}
                        />
                      </p>
                    </div>
                    <div>
                      <p>Estado de pago</p>
                      {item.ispaid ? (
                        <p className="p--green">Pagado</p>
                      ) : (
                        <p className={"p--red"} disabled>
                          Pendiente
                        </p>
                      )}
                    </div>
                    <div>
                      <p>Acciones</p>

                      {item.ispaid ? (
                        <Tooltip title="Pagado">
                          <CheckCircle className="iconPayed" />
                        </Tooltip>
                      ) : (
                        <p
                          className={validateOptionPay(index) === true ? "iconConfirm" : "disabled"}
                          onClick={validateOptionPay(index) === true ? () => openConfirmPay(item) : () => {}}
                        >
                          Confirmar Pago
                        </p>
                      )}
                    </div>
                  </Paper>
                ))} */}
                {data &&
                  data.map((item, index) => (
                    <Grid
                      container
                      key={index}
                      className={`paperContent ${router.query.i === item.id && "paymentSelect"}`}
                    >
                      <Grid item md={2} sm={6} xs={12} className="itemCenter">
                        <p>No. de Pago</p>
                        <p className="value">{index + 1}</p>
                      </Grid>
                      <Grid item md={2} sm={6} xs={12}>
                        <p>Fecha</p>
                        <p className="value">{splitDate(item.date)}</p>
                      </Grid>
                      <Grid item md={2} sm={6} xs={12}>
                        <p>Monto</p>
                        <p className="value">
                          <NumberFormat
                            value={item.payment?.toFixed(2)}
                            displayType="text"
                            thousandSeparator=","
                            prefix={"$"}
                          />
                        </p>
                      </Grid>
                      <Grid item md={2} sm={6} xs={12}>
                        <p>Comisión</p>
                        <p className="value">
                          <NumberFormat value={item.comission} displayType="text" thousandSeparator="," prefix={"$"} />
                        </p>
                      </Grid>
                      <Grid item md={2} sm={6} xs={12}>
                        <p>Estado de pago</p>
                        {item.ispaid ? (
                          <p className="p--green">Pagado</p>
                        ) : (
                          <p className={"p--red"} disabled>
                            Pendiente
                          </p>
                        )}
                      </Grid>
                      <Grid item md={2} sm={6} xs={12}>
                        <p>Acciones</p>
                        {item.ispaid ? (
                          <Tooltip title="Pagado">
                            <CheckCircle className="iconPayed" />
                          </Tooltip>
                        ) : (
                          <p
                            className={validateOptionPay(index) === true ? "iconConfirm" : "disabled"}
                            onClick={validateOptionPay(index) === true ? () => openConfirmPay(item) : () => {}}
                          >
                            Confirmar Pago
                          </p>
                        )}
                      </Grid>
                    </Grid>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <AlertConfirmPay open={showConfirmPay} onClose={closeConfirmPay}>
          <DialogTitle id="alert-dialog-title">{"Confirmación de Pago"}</DialogTitle>
          <DialogContent>
            ¿Confirmas que se ha realizado el pago?
            <Grid container spacing={1} className="oportunityData">
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Folio </p>
                <p className="oportunityData__data">{dataPayment?.oportunity?.concept}</p>
              </Grid>
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Monto a Pagar</p>
                <p className="oportunityData__data">
                  <NumberFormat value={dataPayment?.payment} thousandSeparator="," displayType="text" prefix="$" />
                </p>
              </Grid>
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Fecha limite de Pago</p>
                <p className="oportunityData__data">{splitDate(dataPayment?.date)}</p>
              </Grid>
              <Grid item md={6} xs={12} s={6}>
                <p className="oportunityData__title">Nombre del Cliente</p>
                <p className="oportunityData__data">{`${toUpperCaseChart(
                  dataPayment?.oportunity?.prospect?.name
                )} ${toUpperCaseChart(dataPayment?.oportunity?.prospect?.lastname)}`}</p>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions className="buttons">
            <button className="buttons__cancel" onClick={closeConfirmPay}>
              Cancelar
            </button>
            <button className="buttons__save" onClick={updatePayment}>
              Aceptar
            </button>
          </DialogActions>
        </AlertConfirmPay>
        <ShowProducts open={showProducts} onClose={closeProducts}>
          <div className="header">
            <p className="header__title">Productos</p>
            <IconButton onClick={() => closeProducts()}>
              <Close className="header__icon" />
            </IconButton>
          </div>
          <DialogContent className="contenido">
            {allProducts?.map((item, index) => (
              <Paper elevation={2} className="product" key={index}>
                <div className="product__infoName">
                  <p className="product__infoName__title">Nombre</p>
                  <p className="product__infoName__info">{item.product.name}</p>
                </div>
                <div className="quantities">
                  <div className="quantities__infoPrice">
                    <p className="quantities__infoPrice__title">Precio Unitario</p>
                    <NumberFormat
                      value={item.product.callamount}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      className="quantities__infoPrice__info"
                    />
                  </div>
                  <div className="quantities__infoQuantity">
                    <p className="quantities__infoQuantity__title">Cantidad</p>
                    <NumberFormat
                      value={item.quantity}
                      displayType="text"
                      thousandSeparator=","
                      className="quantities__infoQuantity__info"
                    />
                  </div>
                </div>
              </Paper>
            ))}
          </DialogContent>
        </ShowProducts>
        {alert?.show && (
          <AlertGlobal severity={alert.severity} message={alert.message} show={alert.show} type={alert.type} />
        )}
      </SeeFullPaymentContainer>
    </MainLayout>
  );
}
const SeeFullPaymentContainer = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .contenido_pagos {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .title {
        display: grid;
        grid-template-columns: 35px auto;
        margin-bottom: 15px;
        p {
          letter-spacing: 0.04em;
          margin-bottom: 15px;
          font-size: 22px;
          font-weight: bold;
        }
        button {
          height: 30px;
          width: 30px;
          border-radius: 50px;
          border-width: 0px;
          background-color: #407aff;
        }
        .icon {
          color: #fff;
        }
      }
      .information {
        &__title {
          font-size: 22px;
          font-weight: 500;
          margin-bottom: 18px;
        }
        &__container {
          margin-bottom: 35px;
          &__item {
            width: 100%;
            &__title {
              font-size: 14px;
              color: grey;
            }
            &__data {
              font-size: 16.5px;
              font-weight: 500;
            }
          }
        }
        input {
          margin-top: 10px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 10px 23px 9px 11px;
          -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
          outline: none;
        }
        select {
          margin-top: 10px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 10px 23px 9px 11px;
          -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
        }
      }
      .payments {
        display: grid;
        grid-template-columns: auto;
        &__head {
          display: flex;
          &__title {
            font-size: 16px;
            font-weight: 500;
          }
          &__icon {
            margin-left: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
        &__containerAll {
          max-height: 500px;
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
          .paperContent {
            margin-top: 20px;
            border-radius: 5px;
            padding: 10px;
            .itemCenter {
              display: flex;
              flex-direction: column;
              align-items: center;
            }
            .productsList {
              margin-top: 5px;
              margin-left: 15px;
              &__item {
                font-size: 11px;
                font-weight: 500;
              }
            }
            p {
              font-size: 13px;
              font-weight: bold;
              color: #4f4f4f;
              width: fit-content;
            }
            .p--red {
              font-size: 13px;
              font-weight: bold;
              color: #a53232;
            }
            .p--disabled {
              font-size: 13px;
              font-weight: bold;
              color: grey;
            }
            .p--green {
              font-size: 13px;
              font-weight: bold;
              color: #1b5e20;
            }

            .iconConfirm {
              transition: 0.3s;
              text-decoration: underline;
              &:hover {
                color: #407aff;
                cursor: pointer;
              }
            }
            .disabled {
              color: grey;
            }
            .iconPayed {
              color: #1b5e20;
            }
            .value {
              color: #000;
              font-size: 16px;
            }

            @media (max-width: 900px) {
              grid-template-columns: auto auto;
            }
          }
          .paymentSelect {
            border: 3px solid #88c82d;
          }
        }
      }
    }
  }
`;

const AlertConfirmPay = styled(Dialog)`
  .oportunityData {
    margin-top: 15px;
    &__title {
      font-size: 14px;
    }
    &__data {
      font-size: 15px;
      font-weight: bold;
    }
  }
  .buttons {
    margin-top: 15px;
    &__cancel {
      background: #0c203b;
      color: #fff;
      text-transform: capitalize;
      margin-right: 10px;
      padding: 5px;
      border-radius: 6px;
      font-size: 15px;
      &:hover {
        cursor: pointer;
      }
    }
    &__save {
      background: #103c82;
      color: #fff;
      text-transform: capitalize;
      padding: 5px;
      border-radius: 6px;
      font-size: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`;
const ShowProducts = styled(Dialog)`
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__title {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
    &__icon {
      color: red;
    }
  }
  .contenido {
    .product {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 7px;
      margin-bottom: 15px;
      &__infoName {
        display: flex;
        flex-direction: column;
        &__title {
          font-size: 12px;
        }
        &__info {
          font-weight: 500;
          font-size: 14px;
        }
      }
      .quantities {
        display: flex;
        margin-left: 15px;
        &__infoPrice {
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
            white-space: nowrap;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
        &__infoQuantity {
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          &__title {
            font-size: 12px;
          }
          &__info {
            font-weight: 500;
            font-size: 14px;
          }
        }
      }
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 80px;
    width: 100%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
