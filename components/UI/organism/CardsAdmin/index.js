import { AssignmentTurnedIn, CancelPresentation, ListAlt, LiveHelp } from "@material-ui/icons";
import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { Skeleton } from "@material-ui/lab";
import NumberFormat from "react-number-format";
import { Grid, Paper, Tooltip } from "@material-ui/core";

const CardAdminOrders = ({
  loaderCountOrders,
  countAllOrders,
  countApprovedOrders,
  countDeniedOrders,
  countPendingOrders,
  applyFilter,
}) => {
  return (
    <CardsComponent>
      <Grid container spacing={2} className="total_cards">
        <Grid item md={3}>
          <TotalOrders elevation={2}>
            <p className="title">
              <ListAlt className="icon" />
              Total de Pedidos
            </p>
            {loaderCountOrders ? (
              <Skeleton variant="text" animation="wave" width={40} height={31} />
            ) : (
              <NumberFormat className="data" displayType="text" value={countAllOrders} thousandSeparator="," />
            )}
          </TotalOrders>
        </Grid>
        <Grid item md={3}>
          <Tooltip title="Filtrar Pedidos Aprobados" placement="top">
            <OrdersApproved
              elevation={2}
              onClick={() => {
                applyFilter({ name: "Aprobados", id: "9eQCIBnRvc990VlJfgswanCh" });
              }}
            >
              <p className="title">
                <AssignmentTurnedIn className="icon" />
                Pedidos Aprobados
              </p>
              {loaderCountOrders ? (
                <Skeleton variant="text" animation="wave" width={40} height={31} />
              ) : (
                <NumberFormat className="data" displayType="text" value={countApprovedOrders} thousandSeparator="," />
              )}
            </OrdersApproved>
          </Tooltip>
        </Grid>
        <Grid item md={3}>
          <Tooltip title="Filtrar  Pedidos Pendientes" placement="top">
            <OrdersPending
              elevation={2}
              onClick={() => {
                applyFilter({ name: "Pendientes de Aprobación", id: "YDBO8hIj4LPZzGvgzSeyhhOs" });
              }}
            >
              <p className="title">
                <LiveHelp className="icon" />
                Pedidos Pendientes
              </p>
              {loaderCountOrders ? (
                <Skeleton variant="text" animation="wave" width={40} height={31} />
              ) : (
                <NumberFormat className="data" displayType="text" value={countPendingOrders} thousandSeparator="," />
              )}
            </OrdersPending>
          </Tooltip>
        </Grid>
        <Grid item md={3}>
          <Tooltip title="Filtrar  Pedidos Rechazados" placement="top">
            <OrdersDenied
              elevation={2}
              onClick={() => {
                applyFilter({ name: "Rechazados", id: "CwNWIj2RxW6N2B9v4WiwD1V9" });
              }}
            >
              <p className="title">
                <CancelPresentation className="icon" />
                Pedidos Rechazados
              </p>
              {loaderCountOrders ? (
                <Skeleton variant="text" animation="wave" width={40} height={31} />
              ) : (
                <NumberFormat className="data" displayType="text" value={countDeniedOrders} thousandSeparator="," />
              )}
            </OrdersDenied>
          </Tooltip>
        </Grid>
      </Grid>
    </CardsComponent>
  );
};

const CardsComponent = styled.div`
  width: 100%;
  .total_cards {
    margin-bottom: 10px;
    .filters {
      display: flex;
      flex-direction: row-reverse;
    }
  }
  .container {
    &__top {
      display: flex;
      justify-content: space-between;
    }
    &__top .filter {
      display: flex;
      align-items: center;
      svg {
        cursor: pointer;
      }
    }
  }
`;

export default CardAdminOrders;

export const TotalOrders = styled(Paper)`
  padding: 6px;

  border-bottom: 5px solid #3f51b5;
  .title {
    display: flex;
    align-items: center;
    color: #3f51b5;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
`;

export const OrdersApproved = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #00c853;

  .title {
    display: flex;
    align-items: center;
    color: #00c853;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const OrdersDenied = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #ff0000;
  .title {
    display: flex;
    align-items: center;
    color: #ff0000;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const OrdersPending = styled(Paper)`
  padding: 6px;
  border-bottom: 5px solid #ffa500;
  .title {
    display: flex;
    align-items: center;
    color: #ffa500;
    font-weight: 500;
    margin-bottom: 5px;
    .icon {
      margin-right: 5px;
    }
  }
  .data {
    font-size: 23px;
    font-weight: 500;
    letter-spacing: 2px;
  }
  &:hover {
    cursor: pointer;
  }
`;
