import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import dayjs from "dayjs";
import { months } from "../../BD/databd";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, Paper, Tooltip } from "@material-ui/core";
import NumberFormat from "react-number-format";
import { toUpperCaseChart } from "../../utils";
import { api } from "../../services/api";
import { Close, Visibility } from "@material-ui/icons";
const SeeFullPayment = ({ activeteSeeFullPayment, setActiveteSeeFullPayment, dataDrawerPagos }) => {
  const [showConfirmPay, setShowConfirmPay] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [dataPayment, setDataPayment] = useState({});
  const [allProducts, setAllProducts] = useState([]);
  const [formPayUpdate, setFormPayUpdate] = useState([]);
  useEffect(() => {
    getProductsFromOportunity(dataDrawerPagos.payments[0].oportunityId);
  }, []);
  const firstCapitalLetter = (word) => {
    try {
      return word[0].toUpperCase() + word.slice(1);
    } catch (error) {
      return "";
    }
  };
  const getProductsFromOportunity = async (idOportunity) => {
    try {
      let query = {};
      query.id = idOportunity;
      let oportunity = await api.get(`oportunities?where=${JSON.stringify(query)}&showproducts=1`);
      let products = oportunity.data.results[0].productsoportunities;
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
  const splitDate = (str) => {
    let dates = dayjs(str);
    let month = months.filter((i, ix) => ix == dates.month());
    let day = dates.format("D");
    let year = dates.year();
    return `${month[0]} ${day}, ${year}`;
  };
  const openConfirmPay = (item) => {
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

  const validateOptionPay = (index) => {
    let positionBefore = index - 1;
    if (index >= 1) {
      if (dataDrawerPagos?.payments[positionBefore]?.ispaid === true) {
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
      let query = {};
      query.payments = formPayUpdate;
      let payment = await api.put(`salespayments`, query);
      if (payment.status === 200) {
        closeConfirmPay();
      }
      // console.log(payment);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SeeFullPaymentContainer>
      <div className="title">
        <button onClick={() => setActiveteSeeFullPayment(false)}>
          <ArrowBackIcon className="icon" />
        </button>
        <p>Ver pago completo de {firstCapitalLetter(dataDrawerPagos.prospect.name) + " " + firstCapitalLetter(dataDrawerPagos.prospect.lastname)}</p>
      </div>
      <div>
        <p>Calendario de pagos</p>
        <Calendar>
          <div>
            <p>Pagos</p>
            <input placeholder={dataDrawerPagos.payments[0].oportunity.payments}></input>
          </div>
          <div>
            <p>Periocidad</p>
            <select type="texto" placeholder="periocidad" name="periocidad">
              <option value="periocidad" select>
                {dataDrawerPagos.payments[0].oportunity.paymentperiodicity}
              </option>
            </select>
          </div>
          <div>
            <p>Comisión</p>
            <select type="texto" name="comision">
              <option value="comision">{dataDrawerPagos.payments[0].oportunity.comissiontype}</option>
            </select>
          </div>
        </Calendar>
        <Payments>
          <p>Mis pagos</p>
          {dataDrawerPagos?.payments &&
            dataDrawerPagos?.payments.map((item, index) => (
              <div key={index} className="container">
                <div>
                  <p>Num. Pagos</p>
                  <p className="value">{item.oportunity.payments}</p>
                </div>
                <div>
                  <p>Fecha</p>
                  <p className="value">{splitDate(item.date)}</p>
                </div>
                <div>
                  <p>Producto(s)</p>
                  <IconButton onClick={openProducts}>
                    <Visibility />
                  </IconButton>
                </div>
                <div>
                  <p>Monto</p>
                  <p className="value">
                    <NumberFormat value={item.payment} displayType="text" thousandSeparator="," prefix={"$"} />
                  </p>
                </div>
                <div>
                  <p>Comisión</p>
                  <p className="value">
                    <NumberFormat value={item.oportunity.comission} displayType="text" thousandSeparator="," prefix={"$"} />
                  </p>
                </div>
                <div>
                  <p>Estado de pago</p>
                  {item.ispaid ? (
                    <p className="p--green">Pagado</p>
                  ) : (
                    <Tooltip title={validateOptionPay(index) === true ? "Confirmar Pago" : ""} arrow>
                      <p
                        className={validateOptionPay(index) === true ? "p--red" : "p--disabled"}
                        onClick={validateOptionPay(index) === true ? () => openConfirmPay(item) : () => {}}
                        disabled
                      >
                        Pendiente
                      </p>
                    </Tooltip>
                  )}
                </div>
              </div>
            ))}
        </Payments>
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
              <p className="oportunityData__data">{`${toUpperCaseChart(dataPayment?.oportunity?.prospect?.name)} ${toUpperCaseChart(dataPayment?.oportunity?.prospect?.lastname)}`}</p>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeConfirmPay} color="primary">
            Cancelar
          </Button>
          <Button onClick={updatePayment} color="primary" autoFocus>
            Aceptar
          </Button>
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
                  <NumberFormat value={item.product.callamount} displayType="text" thousandSeparator="," prefix="$" className="quantities__infoPrice__info" />
                </div>
                <div className="quantities__infoQuantity">
                  <p className="quantities__infoQuantity__title">Cantidad</p>
                  <NumberFormat value={item.quantity} displayType="text" thousandSeparator="," className="quantities__infoQuantity__info" />
                </div>
              </div>
            </Paper>
          ))}
        </DialogContent>
      </ShowProducts>
    </SeeFullPaymentContainer>
  );
};

const SeeFullPaymentContainer = styled.div`
  .title {
    display: grid;
    grid-template-columns: 35px auto;
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
`;
const Calendar = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  margin-top: 10px;

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
`;
const Payments = styled.div`
  display: grid;
  grid-template-columns: auto;
  .container {
    display: grid;
    grid-template-columns: auto auto auto auto auto auto;
    margin-top: 20px;
    border-radius: 5px;
    background-color: #bdbdbd;
    padding: 10px;

    div {
      padding: 8px;
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
    }

    .p--red {
      font-size: 13px;
      font-weight: bold;
      color: #a53232;
      &:hover {
        cursor: pointer;
      }
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

    .value {
      color: #000;
      font-size: 16px;
    }

    @media (max-width: 900px) {
      grid-template-columns: auto auto;
    }
  }
`;
const AlertConfirmPay = styled(Dialog)`
  .oportunityData {
    margin-top: 15px;
    margin-right: -100px;
    &__title {
      font-size: 14px;
    }
    &__data {
      font-size: 15px;
      font-weight: bold;
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
`;
export default SeeFullPayment;
