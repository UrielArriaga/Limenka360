import React, { useEffect, useState } from "react";
import { api } from "../services/api";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, userSelector, fetchUserBytoken, clearState } from "../redux/slices/userSlice";
import { useRouter } from "next/router";
import { RedirectPage } from "../utils";
import styled from "styled-components";
import { Button, Collapse, Grid, IconButton } from "@material-ui/core";
import { Close, MonetizationOn } from "@material-ui/icons";
import dayjs from "dayjs";
export default function PaginaPrueba() {
  const [showMore, setShowMore] = useState(false);
  const date = dayjs().format("MMM D, YYYY h:mm A");
  return (
    <NotificationSale>
      <div className="container_sale">
        <div className="contentalert__header">
          <p className="title_alert">
            <MonetizationOn className="icon_alert" />
            ¡Alerta de Cotización!
          </p>
          <IconButton className="bt_close">
            <Close />
          </IconButton>
        </div>
        <div className="contentalert__body">
          <div className="message">
            <p className="text_message">
              Se ha realizado una cotización superando el monto establecido de manera grupal
            </p>
            <p>Ver más...</p>
            <Collapse>
              <Grid container={true}>
                <Grid item={true} md={6}>
                  <p>Concepto</p>
                </Grid>
                <Grid item={true} md={6}>
                  <p>Monto</p>
                </Grid>
                <Grid item={true} md={6}>
                  <p>Comisión</p>
                </Grid>
                <Grid item={true} md={6}></Grid>
              </Grid>
            </Collapse>
          </div>
        </div>
        <div className="contentalert__footer">
          <p className="date_alert">{date}</p>
          <Button className="bt accept">Ver Cotización</Button>
        </div>
      </div>
    </NotificationSale>
  );
}

const NotificationSale = styled.div`
  .container_sale {
    background-color: rgb(136, 200, 45);
    padding: 10px;
    width: 30%;
    height: 10%;
    border-radius: 6px;
    .contentalert {
      padding: 5px;
      &__header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-bottom: 15px;
        .title_alert {
          display: flex;
          align-items: center;
          color: #fff;
          font-weight: 500;
          .icon_alert {
            font-size: 20px;
            color: #fff;
            margin-right: 10px;
          }
        }
        .bt_close {
          height: 18px;
          width: 18px;
          background-color: red;
          color: #fff;
          border-radius: 6px;
          svg {
            font-size: 20px;
          }
        }
      }
      &__body {
        /* border: 1px solid red; */
        margin-bottom: 10px;
        .message {
          font-size: 14px;
          color: #fff;
        }
      }
      &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* flex-direction: row-reverse; */
        .date_alert {
          color: #fff;
          font-weight: 500;
          font-size: 13px;
        }
        .bt {
          text-transform: capitalize;
          color: #fff;
          font-size: 11px;
        }
        .accept {
          background-color: #103c82;
        }
      }
    }
  }
`;
