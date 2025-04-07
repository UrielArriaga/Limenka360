import React, { useEffect, useState } from "react";
import { Button, Divider, Drawer, Grid, LinearProgress } from "@material-ui/core";
import styled from "styled-components";
import ButtonClose from "../ButtonClose";
import { userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import { useRouter } from "next/router";

export default function DrawerDemo(props) {
  const { show, closeDrawer, demoItem, routeNavigate, demos } = props;
  const { userData } = useSelector(userSelector);
  const router = useRouter();
  const { idOportunity } = router.query;
  // const { products } = usePreviDemo(idOportunity);

  console.log(demoItem, "123");
  // console.log(products,"XXX");

  return (
    <DrawerStyled anchor="right" open={show} onClose={() => closeDrawer()}>
      {demoItem && (
        <div className="drawer_container">
          <ButtonClose close={() => closeDrawer()} />
          <div className="content-Btn">
            <Button onClick={() => routeNavigate(demoItem)} className="navigate" variant="contained">
              Ver Demo Completo
            </Button>
          </div>

          <Grid container={true} spacing={2} style={{ marginBottom: 10 }}>
            <Grid item={true} md={4} xs={6}>
              <b>Ejecutivo:</b>
              <p>{userData?.name}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Esfera:</b>
              <p>{userData?.groupName}</p>
            </Grid>

            <Grid item={true} md={4} xs={6}>
              <b>Instructor:</b>
              <p>{demoItem?.instructor}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Fecha de demostracion</b>
              <p>{dayjs(demoItem?.itemBD?.date).format("DD MMM YYYY H:mm A")}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Unidad Asignada</b>
              <p>{demoItem?.itemBD?.dessignatedunit}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Viáticos</b>
              <p>${demoItem?.itemBD?.expensebudget}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}></Grid>
          </Grid>

          <Grid container={true} spacing={2}>
            <Grid item={true} md={4} xs={6}>
              <b>Estado</b>
              <p>{demoItem?.estado}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Ciudad</b>
              <p>{demoItem?.ciudad}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Calle</b>
              <p>{demoItem?.calle}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Num Ext.</b>
              <p>{demoItem?.itemBD?.address?.ext_number}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Num Int.</b>
              <p>{demoItem?.itemBD?.address?.int_number}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Referencias</b>
              <p>{demoItem?.itemBD?.address?.references}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Asentamiento</b>
              <p>{demoItem?.itemBD?.address?.settlement}</p>
            </Grid>
            <Grid item={true} md={4} xs={6}>
              <b>Cod. Postal</b>
              <p>{demoItem?.itemBD?.address?.postal?.postal_code}</p>
            </Grid>
          </Grid>
          <br />
          <div className="content_table">
            <table className="table">
              <thead className="head">
                <tr className="tr_head">
                  <th className="th">Modelo</th>
                  <th className="th">Descripción</th>
                  <th className="th">No. Piezas</th>
                  <th className="th">No. Serie </th>
                </tr>
              </thead>
              <tbody className="body">
                {/* {products.length >= 1 ? (
                  products.map((item, index) => (
                    <tr key={index} className="tr_body">
                      <td className="td">{item.model}</td>
                      <td className="td">{item.description}</td>
                      <td className="td">{item.quantity}</td>
                      <td className="td">{item.serial}</td>
                    </tr>
                  ))
                ) : ( */}
                <tr>
                  <td className="empty_products" colSpan={5}>
                    No Hay Productos.
                  </td>
                </tr>
                {/* )} */}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!demoItem && (
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
    </DrawerStyled>
  );
}

const DrawerStyled = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    @media (max-width: 600px) {
      width: 100%;
    }
    overflow: hidden;
    border-top-left-radius: 10px;
  }
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }
  .ctr_information {
    padding: 20px;

    overflow: auto;
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
    &__top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .title {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
      .btn_view {
        text-transform: capitalize;
        margin: 5px;
      }
      .btn_reasign {
        text-transform: capitalize;
        margin-right: 5px;
      }
    }
    &__data {
      margin-bottom: 10px;
      .label {
        font-size: 13px;
        font-weight: bold;
        color: #4f4f4f;
        margin-bottom: 2px;
      }
      .paragraph {
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }
      .capitalize {
        text-transform: capitalize;
      }

      .light {
        color: #2979ff;
      }
      .whatsApp {
        &:hover {
          cursor: pointer;
        }
      }
      span {
        color: #d1d1d1;
        font-size: 12px;
        font-weight: 500;
      }
      .name {
        text-transform: capitalize;
      }
    }
    &__ctr_targets {
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
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
        }
      }
      .cont {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }
      .order {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        p {
          margin-top: 7px;
          margin-right: 7px;
          font-weight: 600;
          color: #495057;
        }
        .input {
          margin-top: 7px;
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          height: 40px;
          border: 2px solid #f3f3f3;

          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
            color: #405189;
          }
        }
      }
      .cont {
        display: flex;

        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }
      .titlePendings {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        justify-content: space-between;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
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
        }
      }
      .ctr_grid {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding: 0px 10px;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }
      .ctr_grid2 {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding: 0px 10px;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }
      .containerLoader {
        display: flex;
        padding: 5px;
        margin: auto;
        height: 265px;

        align-items: center;
      }
      .MuiCircularProgress-root.MuiCircularProgress-indeterminate {
        color: #3f51b5;
      }
      .target_tracing {
        padding: 10px;
        height: 210px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
        border-radius: 8px;
        position: relative;
        box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
        &::before {
          top: 0px;
          left: 0px;
          width: 5px;
          bottom: 0px;
          content: "";
          position: absolute;
          background-image: linear-gradient(
            to right bottom,
            #3f51b5,
            #2d499e,
            #1e4086,
            #13376f,
            #0e2d58,
            #122d55,
            #142c51,
            #172c4e,
            #20355c,
            #2a3e6b,
            #35487a,
            #405189
          );
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          .item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .icon {
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
        }
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }
      }
      .tracing_empty {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        img {
          width: 320px;
          height: 120px;
          object-fit: contain;
        }
        .btn_tracking {
          margin-top: 10px;
          text-transform: capitalize;
          background: #103c82;
          color: #fff;
          font-size: 12px;
          padding: 5px 10px;
        }
      }
      .target_pendings {
        padding: 10px;
        height: 245px;
        width: max-content;
        min-width: 320px;
        max-width: 350px;
        border-radius: 8px;
        position: relative;
        box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
        &::before {
          top: 0px;
          left: 0px;
          width: 5px;
          bottom: 0px;
          content: "";
          position: absolute;
          background-image: linear-gradient(
            to right bottom,
            #3f51b5,
            #2d499e,
            #1e4086,
            #13376f,
            #0e2d58,
            #122d55,
            #142c51,
            #172c4e,
            #20355c,
            #2a3e6b,
            #35487a,
            #405189
          );
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          .item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .icon {
              color: #3f51b5;
              font-size: 16px;
            }
            .date {
              font-size: 12px;
              font-weight: bold;
              color: #0c203b;
            }
          }
        }
        .ct_icon_complete {
          justify-content: center;
          color: #008000;
        }
        .ct_icon_incomplete {
          justify-content: center;
          color: red;
        }
        .pendingButton {
          position: absolute;
          width: 300px;
          margin-left: 5px;
          margin: 2px 0px;
          text-transform: capitalize;
          font-size: 12px;
          margin-top: -11px;
        }
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }

        .time {
          font-size: 14px;
          font-weight: bold;
          color: #103c82;
        }
      }
    }
    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
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
  .link {
    margin-left: 8px;
    :hover {
      color: blue;
    }
  }
  .tooltip {
    width: 90px;
  }

  .drawer_container {
    padding: 20px;
    &__info {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    &__top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .title {
        font-weight: bold;
      }

      .close_icon {
        color: #8a8a88;
        font-size: 20px;
        &:hover {
          cursor: pointer;
          color: #f50;
        }
      }
    }
    &__form {
      &__containerSelect {
        width: 100%;
        p {
          font-size: 14px;
          font-weight: 500;
          margin-top: 10px;
          margin-bottom: 10px;
        }
        &__select {
          font-size: 15px;
          margin-bottom: 10px;
          width: 100%;
          border-color: hsl(0, 0%, 80%);
          outline: none;
          height: 35px;
        }
        &__calendarFrom {
          width: 100%;
          margin-right: 5px;
          font-size: 14px;
          padding: 5px;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
        &__calendarTo {
          width: 100%;
          margin-left: 5px;
          font-size: 14px;
          padding: 5px;
          outline: none;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
        }
      }
    }
    &__ctr_inputs {
      transition: all 0.4s ease;
      margin-bottom: 20px;
      &__input {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
        .label {
          font-weight: 500;
          font-size: 14px;
          margin-bottom: 5px;
        }
        .input {
          background-clip: padding-box;
          background-color: #fff;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          color: #495057;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          padding: 0.47rem 0.75rem;
          width: 100%;
          height: 40px;
          border: 2px solid #f3f3f3;
          color: #000;
          text-transform: capitalize;
          &:focus {
            outline: none;
            border: 2px solid #405189;
          }
        }
        &__with_icon {
          display: flex;
          align-items: center;
          svg {
            width: 40px;
            height: 40px;
            padding: 8px;
          }
        }
      }
    }
    &__ctr_buttons {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      margin-top: 10%;
      .btn_cancel {
        background: #0c203b;
        margin-right: 10px;
        color: #fff;
        text-transform: capitalize;
      }
      .btn_apply {
        background: #405189;
        color: #fff;
        text-transform: capitalize;
      }
    }
    .flex {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-bottom: 10px;
    }
    .navigate {
      background: #103c82;
      color: #fff;
      text-transform: capitalize;
      margin-bottom: 10px;
    }
    .content-Btn {
      display: flex;
      justify-content: flex-end;
    }
  }
  .table-container {
    margin-top: 10px;
    max-width: 100%;
    overflow-x: auto;
  }

  .table {
    width: 100%;
    border-collapse: collapse;
  }

  .table th,
  .table td {
    padding: 6px;
    text-align: center;
    border: 1px solid #ddd;
  }

  .table th {
    background-color: #103c82;
    font-weight: bold;
  }

  .table tr:hover {
    background-color: #f1f1f1;
  }
  .content_table {
    margin-bottom: 20px;

    .table {
      width: 100%;
      border: none;
      border-collapse: collapse;
      .head {
        .tr_head {
          color: #fff;
          background-color: #103c82;
          height: 30px;
          .th {
            text-align: center;
          }
        }
      }
      .body {
        .tr_body {
          .td {
            .input_data {
              margin: 5px 0px;
              font-size: 14px;
              padding: 5px;
              border: 1px solid #d4d4d4;
              outline: none;
              width: 90%;
            }
          }
        }
      }
    }
  }
`;
