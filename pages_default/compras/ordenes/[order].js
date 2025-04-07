import styled from "styled-components";
import MainLayout from "../../../components/MainLayout";
import ReturnButton from "../../../components/ReturnButton";
import { colors } from "../../../styles/global.styles";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "../../../services/api";
import { Grid, LinearProgress, Tooltip } from "@material-ui/core";
import { Assignment, CheckCircle, LocalShipping } from "@material-ui/icons";
import dayjs from "dayjs";

export default function OrdenView() {
  const router = useRouter();
  const { id } = router.query;
  const [unitOrder, setUnitOrder] = useState({
    isfeching: false,
    data: [],
  });

  useEffect(() => {
    if (id) {
      getPurchaseOrders(id);
    } else {
      return;
    }
  }, [id]);

  const getPurchaseOrders = async id => {
    try {
      setUnitOrder({ ...unitOrder, isfeching: true });
      let params = {
        include: "taxinformation,provider,taxinformation.address",
      };
      let response = await api.get(`purchaseorders/${id}`, { params });
      setUnitOrder({ ...unitOrder, isfeching: false, data: response.data });
    } catch (error) {
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
    <MainLayout>
      <OrderPush>
        <div className="main">
          <div className="ctr_prospecto">
            <ReturnButton text={"Orden"} />
            {unitOrder?.isfeching && (
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
            {!unitOrder?.isfeching && (
              <div className="container">
                <div className="divider" />
                <div className="title">
                  <Assignment className="icon" />

                  <p className="text">Datos Fiscales</p>
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
                    {thereIsData(dayjs(data?.provider?.createdAt).format("DD-MMMM-YYYY H:mm A"))}
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
                  <Grid item xs={12} sm={6} md={6}>
                    <p className="headers">Telefono</p>
                    {thereIsData(data?.phone)}
                  </Grid>
                </Grid>
              </div>
            )}
          </div>
        </div>
      </OrderPush>
    </MainLayout>
  );
}

const OrderPush = styled.div`
  * {
    margin: 0;
  }
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 200px;
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

  .griditem-menu {
    position: relative;
  }

  .container {
    .title {
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      margin-top: 10px;

      .text {
        font-weight: bold;
        letter-spacing: 0.03em;
        cursor: pointer;
      }
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
      .redirec {
        cursor: pointer;
        margin-bottom: 6px;
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220 225 246 / 0%);
        color: #0c203b;
        border-radius: 50%;
      }
    }
    .headers {
      font-size: 13px;
      font-weight: bold;
      color: #4f4f4f;
    }
    .divider_white {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 1.5px solid white;
    }
    .divider {
      margin-top: 20px;
      margin-bottom: 20px;
      border-bottom: 1.5px solid rgb(241, 241, 241);
    }
  }

  .griditem-menuchiquito {
    padding: 5px;
    background-color: #fff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    height: 100%;
    width: 150px;
    position: absolute;
    top: 0;
    right: -50%;
    transition: all 3s ease-in-out;
    .item {
      transition: all 0.4s ease-in-out;
      &:hover {
        background-color: red;
      }
    }

    /* .form {
      width: 0;
      height: 0;
      transform: rotate(10deg);
      border-left: 100px solid #f0ad4e;
      border-top: 50px solid transparent;
      border-bottom: 50px solid transparent;
    } */
  }
  .ctr_prospecto {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 22px;
      font-weight: bold;
      letter-spacing: 0.04em;
      margin-bottom: 15px;
    }
    &__info {
      width: 100%;
      &__ctr_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &__title {
          display: flex;
          align-items: center;
          svg {
            width: 30px;
            height: 30px;
            padding: 5px;
            margin-right: 5px;
            background: #dce1f6;
            color: #0c203b;
            border-radius: 50%;
          }
          p {
            font-size: 18px;
            letter-spacing: 0.04em;
            font-weight: 600;
          }
        }
        &__edit {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #103c82;
          color: #fff;
          border-radius: 50%;
          cursor: pointer;
        }
      }
      &__data {
        margin-bottom: 10px;
        transition: all 0.5s ease;
        .label {
          display: flex;
          align-items: center;
          font-size: 13px;
          font-weight: bold;
          color: #4f4f4f;
          margin-bottom: 2px;
          height: 32px;
          svg {
            color: #103c82;
          }
        }
        .paragraph {
          font-size: 16px;
          padding: 0 10px;
          font-weight: 500;
        }
        .primary_paragraph {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: bold;
          /* padding: 0 10px; */
          svg {
            font-size: 25px;
            color: ${colors.iconColor};
          }
        }
        .sendMessage {
          &:hover {
            cursor: pointer;
            text-decoration: underline;
          }
        }
        .capitalize {
          text-transform: capitalize;
        }
        span {
          color: #d1d1d1;
          font-size: 12px;
          font-weight: 500;
        }
        .oportunity {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          button {
            p {
              font-size: 14px;
              text-transform: capitalize;
              color: #fff;
            }
          }
          .bt_reasign {
            margin-right: 10px;
          }
          .view {
            font-size: 14px;
            color: #82b1ff;
            font-weight: 500;
            cursor: pointer;
          }
        }
      }
      .divider {
        margin-top: 10px;
        margin-bottom: 10px;
        border-bottom: 1.5px solid #f3f3f3;
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: calc(100vh - 200px);
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
  }
`;
