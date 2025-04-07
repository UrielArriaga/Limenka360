import React, { useState, useEffect } from "react";
import { Button, CircularProgress, Dialog, DialogContent, IconButton, LinearProgress, Paper } from "@material-ui/core";
import styled from "styled-components";
import { Close, FiberManualRecord, Today } from "@material-ui/icons";
import { formatDate, formatNumber } from "../../utils";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { setArrayProducts } from "../../redux/slices/quotesSlice";
import { useDispatch } from "react-redux";

export default function ModalSales({ open, close, dataSales }) {
  const router = useRouter();
  const [sales, setSales] = useState([]);
  const [orderBySales, setOrderBySales] = useState("soldat");
  const [ASCOrderBySales, setASCOrderBySales] = useState(true);
  const [isLoadingSales, setisLoadingSales] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getPaymnetsByOportunity();

      return () => (mounted = false);
    }
  }, [dataSales, orderBySales, ASCOrderBySales]);

  const getPaymnetsByOportunity = async () => {
    try {
      setisLoadingSales(true);
      let query = {};
      query.prospectId = dataSales?.id;
      query.discarted = false;
      query.iscloseout = true;
      const params = {
        all: "1",
        count: "1",
        where: JSON.stringify(query),
        include: "prospect",
        order: ASCOrderBySales ? orderBySales : `-${orderBySales}`,
      };
      let payment = await api.get("oportunities", { params });
      let salese = payment.data?.results;
      setSales(salese);
      setisLoadingSales(false);
    } catch (error) {
      console.log(error);
      setisLoadingSales(false);
    }
  };
  const handleClickSelectedSales = item => {
    router.push({
      pathname: "pedidos/nuevo",
      query: { o: item.id, p: item.prospectId },
    });
    dispatch(setArrayProducts([]));
  };
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={close}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <ShowProducts>
        <div className="header">
          <p className="header__title">Ventas de {sales[0]?.prospect?.name} </p>
          <IconButton onClick={close}>
            <Close className="header__icon" />
          </IconButton>
        </div>
        {isLoadingSales && (
          <DialogContent className="contenido">
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          </DialogContent>
        )}
        {!isLoadingSales && (
          <DialogContent className="contenido">
            <div className="content-select" style={{ marginLeft: 4 }}>
              <label className="orderBy">Ordenar por:</label>
              <select onChange={e => setASCOrderBySales(e.target.value)} value={ASCOrderBySales} name="" id="">
                {addOptionsOrderBy.map((item, index) => (
                  <option key={index} value={item.value} name={item.label}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            {sales?.map((item, index) => (
              <Paper elevation={2} className="sale" key={index}>
                <div className="top">
                  <div className="item">
                    <FiberManualRecord className="icon" />
                    <p className="date capitalize">Venta #{index + 1}</p>
                  </div>
                  <div className="item">
                    <Today className="icon" />
                    <p className="date">Fecha de Venta: {formatDate(item.soldat)}</p>
                  </div>
                </div>
                <div className="sale__infoName">
                  <p className="sale__infoName__title">Concepto:</p>
                  <p className="sale__infoName__info">{item.concept}</p>
                </div>
                <div className="sale__infoName">
                  <p className="sale__infoName__title">Monto:</p>
                  <p className="sale__infoName__info"> {formatNumber(item.amount)}</p>
                </div>
                <div className="sale__infoName">
                  <p className="sale__infoName__title">Comisión:</p>
                  <p className="sale__infoName__info"> {formatNumber(item.comission)}</p>
                </div>

                <div className="sale__infoName">
                  <p className="sale__infoName__title">Observaciones:</p>
                  <p className="sale__infoName__info"> {item.observations.slice(0, 80)}</p>
                </div>
                <div className="buttonSale">
                  {item.isorder == false ? (
                    <Button
                      onClick={() => handleClickSelectedSales(item)}
                      className="OrderButton"
                      variant="contained"
                      color="primary"
                      size="small"
                    >
                      Realizar Pedido
                    </Button>
                  ) : (
                    <Button className="OrderButtonDisabled" variant="contained" color="primary" size="small" disabled>
                      Realizar Pedido
                    </Button>
                  )}
                </div>
              </Paper>
            ))}
          </DialogContent>
        )}
      </ShowProducts>
    </Dialog>
  );
}
const addOptionsOrderBy = [
  { label: "Descendente", value: "-" },
  { label: "Ascendente ", value: "" },
];

export const ShowProducts = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #0d47a1;
    color: white;

    &__title {
      font-size: 20px;
      margin-left: 10px;
      font-weight: 500;
    }
    &__icon {
      color: #f3f3f3;
    }
  }

  .contenido {
    flex: 1 1 auto;
    padding: 8px 24px;
    overflow-y: auto;
    height: 561px;
    width: 605px;

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
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .item {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 5px;
      .icon {
        color: #3f51b5;
        font-size: 16px;
      }
      .iconStatus {
        color: #3f51b5;
        font-size: 16px;
      }
      .date {
        font-size: 12px;
        font-weight: bold;
        color: #0c203b;
      }
      .capitalize {
        text-transform: capitalize;
      }
    }
    .sale {
      border-radius: 13px;
      width: 100%;
      padding: 7px;
      margin-bottom: 15px;
      &__infoName {
        display: flex;
        flex-direction: column;
        &__title {
          font-weight: 500;
          font-size: small;
          color: rgba(64, 123, 254, 1);
        }
        &__info {
          font-weight: 500;
          font-size: 14px;
        }
      }

      .buttonSale {
        display: flex;
        align-items: end;
        align-items: end;
        justify-content: end;
        .OrderButton {
          height: 25px;
          text-transform: capitalize;
          border: 2px solid #103c82;
          background: #103c82;
          border-radius: 2px solid;
          font-size: 12px;
          border-radius: 10px;
          color: white;
        }
        .OrderButtonDisabled {
          height: 25px;
          text-transform: capitalize;
          background: rgb(0 0 0 / 20%);
          border-radius: 2px solid;
          font-size: 12px;
          border-radius: 10px;
        }
      }
    }
    .content-select {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      justify-content: end;
    }

    .content-select select {
      display: inline-block;
      cursor: pointer;
      padding: 7px 1px;
      outline: 0;
      border: 0;
      border-radius: 0;
      font-size: 12px;
      color: #0d47a1;
      font-weight: 600;
      border: 1px solid #776ceb33;
      border-radius: 7px;
      position: relative;
      transition: all 0.25s ease;
    }

    .content-select select:hover {
      background: #3f51b50a;
    }
    .content-select i {
      position: absolute;
      right: 20px;
      top: calc(50% - 13px);
      width: 16px;
      height: 16px;
      display: block;
      border-left: 4px solid #2ac176;
      border-bottom: 4px solid #2ac176;
      transform: rotate(-45deg);
      transition: all 0.25s ease;
    }
    .content-select:hover i {
      margin-top: 3px;
    }
    label {
      font-size: 12px;
      font-weight: 600;
      color: #0c203b;
      margin-right: 4px;
    }
    .options {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      left: 0;
      z-index: 999;
      margin: 0 0;
      padding: 0 0;
      list-style: none;
      border: 1px solid #ccc;
      background-color: white;
      -webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      -moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }

    .options li {
      padding: 0 6px;
      margin: 0 0;
      padding: 0 10px;
    }

    .options li:hover {
      background-color: #39f;
      color: white;
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
