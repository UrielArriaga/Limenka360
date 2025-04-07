import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import InformationNotificationOrders from "../InformationNotificationOrder";
import styled from "styled-components";
import { Close } from "@material-ui/icons";
import { Tooltip } from "@material-ui/core";
export default function NotificationOrder({ isThereNewOrder, setIsThereNewOrder, orderData }) {
  if (isThereNewOrder == false) return null;
  return (
    <Container>
      <div className="head">
        <p className="title">Nuevos Pedidos</p>
        <Tooltip title="Cerrar todas las notificaciones">
          <Close className="iconClose" onClick={() => setIsThereNewOrder(false)}></Close>
        </Tooltip>
      </div>

      {orderData?.map((element, index) => (
        <InformationNotificationOrders
          key={index}
          element={element?.order}
          setIsThereNewOrder={setIsThereNewOrder}
          isThereNewOrder={isThereNewOrder}
        />
      ))}
    </Container>
  );
}
const Container = styled(motion.div)`
  position: absolute;
  z-index: 1000 !important;
  top: 70px;
  right: 30px;
  border-radius: 5px;
  width: 428px;
  overflow: hidden;
  box-shadow: rgba(0, 0, 0, 0.25) -14px 14px 28px, rgba(0, 0, 0, 0.22) -10px 10px 10px;
  background: white;
  height: 90%;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
    border-radius: 8px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px rgb(16 60 130 / 45%);
    border-radius: 10px;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: -webkit-sticky;
    position: sticky;
    z-index: 50;
    top: 0px;
    padding: 10px 8px;
    background-color: #d8dbe6;
    background-color: rgb(16, 60, 130);
    margin-bottom: 15px;
    box-shadow: rgb(171, 178, 185) 0px 1px 2px;
    .title {
      color: white;
      font-weight: 600;
      font-size: 16px;
    }
    .iconClose {
      color: #fefefe;
      &:hover {
        cursor: pointer;
        color: #fff;
      }
    }
  }
`;
