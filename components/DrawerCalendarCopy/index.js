import React, { useState, useEffect } from "react";
import Drawer from "@material-ui/core/Drawer";
import styled from "styled-components";
import dayjs from "dayjs";
import { months } from "../../BD/databd";
import { PersonOutlineOutlined } from "@material-ui/icons";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import Button from "@material-ui/core/Button";
import Link from "@material-ui/core/Link";
import { Close } from "@material-ui/icons";
import Select from "react-select"
const DraweCalendarCopy = ({
  openDrawerFilters,
  setOpenDrawerFilters,
  filterIsPaid,
  setFilterIsPaid,
  setExpiredPaidFilter,
  getPayments,
  openDrawerPagos,
  setOpenDrawerPagos,
  dataDrawerPagos,
  setActiveteSeeFullPayment,
  activeteSeeFullPayment,
  flag,
  filters,
  setFilters,
  dataPendingsTypes,
  priorities,
  setFlag
}) => {
  return (
    <DrawerStyled anchor={"right"} open={openDrawerFilters} onClose={() => setOpenDrawerFilters(false)}>
      <div className="ctr_drawer__top">
        <p className="title">Filtra por tu preferencia</p>
        <Close className="close_icon" onClick={() => setOpenDrawerFilters(false)} />
      </div>
      <br/>
      <div className="ctr_drawer__subtitle">
        Pendientes
      </div>
      <hr/>
      <label>Tipo de pendiente</label>
          <Select
            options={dataPendingsTypes}
            getOptionValue={(type) => `${type}`}
            getOptionLabel={(type) => `${(type.name)}`}
            onChange={(e)=>{setFilters({...filters, pendings:{...filters.pendings, type: e}}); }}
            placeholder={"Seleccionar tipo de pendiente"}
          />
          <label>Prioridad</label>
          <Select
            options={priorities}
            getOptionValue={(priority) => `${priority.priority}`}
            getOptionLabel={(priority) => `${(priority.name)}`}
            onChange={(e)=>{setFilters({...filters, pendings:{...filters.pendings, priority: e}}); }}
            placeholder={"Seleccionar prioridad"}
          />          
      
      <br/>
      <br/>
      
      <div className="ctr_drawer__subtitle">
        Pagos
      </div>
      <hr/>
      <Field>
        <p>Pagado</p>
        <div className="radioContainer">
          <label>Si</label>
          <input
            onChange={(e) => {
              setFilterIsPaid("Si");
              setFilters({...filters, payments:{...filters.payments, ispaid: "si"}})
            }}
            type="radio"
            name="paid"
          />
          <p>No</p>
          <input
            onChange={(e) => {
              setFilterIsPaid("No");
              setFilters({...filters, payments:{...filters.payments, ispaid: "no"}})
            }}
            type="radio"
            name="paid"
          />
        </div>
      </Field>

      <Field>
        <p>Expirado</p>
        <div className="radioContainer">
          <label>Si</label>
          <input
            onChange={(e) => {
                setExpiredPaidFilter("Si");
                setFilters({...filters, payments:{...filters.payments, expired: "si"}})
            }}
            value="si"
            type="radio"
            name="expired"
          />
          <p>No</p>
          <input
            onChange={(e) => {
                setExpiredPaidFilter("No");
                setFilters({...filters, payments:{...filters.payments, expired: "no"}})
            }}
            type="radio"
            name="expired"
          />
        </div>
      </Field>

      

      <div className="ctr_drawer__ctr_buttons">
        <Button variant="contained" className="btn_apply" onClick={() => {
            if(setFlag){
              console.log("bandera")
              setFlag(!flag)
              setOpenDrawerFilters(false)
            }
            }
          }>
          Aplicar
        </Button>
      </div>
    </DrawerStyled>
  );
};

export default DraweCalendarCopy;

const DrawerStyled = styled(Drawer)`
  background-color: none;

  /* backdrop-filter: blur(2px); */
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }

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
  }
  .ctr_drawer {
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
    &__subtitle{
      background-color: #0c203b;
      color: white;
      font-size: 25px;
      border-radius: 4px 4px 0 0 ;
      padding-left: 5px;
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
      margin-top: 5%;
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

    .container {
      display: flex;
      margin-left: 0%;
      margin-top: 10%;
      width: 90%;

      .casilla {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-block-end: 5%;
        margin-left: 5%;

        .checkBox {
          display: flex;
          transform: scale(1.5);
        }

        .label2 {
          display: flex;
          font-size: 18px;
          opacity: 0.9;
        }

        .icon {
          margin-right: 1%;
          font-size: 30px;
          color: #103c82;
        }
      }
      .label3 {
        margin-left: 8%;
        display: flex;
        margin-right: 5%;
        font-size: 18px;
        opacity: 0.9;
        margin-top: 2%;
      }
      .select2 {
        display: flex;
        margin-left: 8%;
        margin-top: 3%;
        width: 95%;
        height: 40px;
        border: 2px solid #f3f3f3;
        color: #000;
        text-transform: capitalize;
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        margin-block-end: 15%;
        text-align: left;
        &:focus {
          outline: none;
          border: 2px solid #405189;
        }
      }
    }
  }
`;

export const Field = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  margin-top: 20px;

  select {
    margin-top: 10px;
    height: 35px;
    border-radius: 5px;
  }

  .radioContainer {
    display: grid;
    grid-template-columns: 30px auto 30px auto;
    margin-top: 10px;

    input {
      width: 15px;
    }
  }

  .switch {
    display: grid;
    grid-template-columns: auto 50px;
    p {
      margin-top: 5px;
    }
  }

  .rangeOfDate {
    display: grid;
    grid-template-columns: 50% 50%;
    margin-bottom: 10px;
    margin-top: 3px;

    p {
      color: rgba(0, 0, 0, 0.7);
    }

    input {
      width: 99%;
      height: 35px;
      padding-left: 8px;
      color: rgba(0, 0, 0, 0.7);
      border: 1px solid #c8c8c8;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }
  }

  .orderInput {
    display: grid;
    grid-template-columns: 20px auto;
    margin-top: 5px;
    input {
      width: 15px;
    }
  }
`;

export const ChipsContainer = styled.div`
  margin-top: 2px;
  margin-bottom: 5px;
  min-height: 50px;

  .chip {
    margin: 1px;
  }
`;
