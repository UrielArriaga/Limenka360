import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const CalendarPaymentsStyles = styled.div`
  .sectionBtnShow {
    &__btnshow {
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 13px;
      border-radius: 10px;
      background: white;
      margin: 2px;
    }
  }
  .sectionOptionsPayments {
    display: flex;
    gap: 12px;
    margin-top: 1%;
    .item {
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      width: 50%;
      .label-box {
        margin-bottom: 5px;
        color: rgb(86 86 86);
        font-weight: 600;
        .downpayment {
          color: green;
        }
        .checker {
          color: ${colors.primaryColorDark};
        }
        p {
          color: rgb(97 97 97 / 90%);
        }
        strong {
          margin-left: 2px;
          color: red;
        }
      }
      .error {
        border-color: #990000;
      }

      input,
      select {
        height: 42px;
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
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        &:focus {
          outline: none;
          box-shadow: 1px 1px 1px 1px rgb(120 90 248 / 25%);
        }
        &:disabled {
          color: gray;
        }
      }

      .icon {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          cursor: help;
        }
        .success {
          color: green;
        }

        .fail {
          color: gray;
        }
        .error {
          color: red;
        }
      }
      /* Styles.css */

      /* Estilo base para el select */
      .inputPaid {
        height: 42px;
        border-radius: 4px;
        padding: 0 10px;
        width: 100%;
        border: 1px solid #ccc;
        background-color: #fff; /* Color de fondo predeterminado */
        cursor: pointer;
      }

      /* Estilo para 'Pagado' */
      .inputPaid.ispaid {
        background-color: #d4edda; /* Verde para 'Pagado' */
      }

      /* Estilo para 'Pendiente' */
      .inputPaid.notpaid {
        background-color: #fff3cd; /* Amarillo para 'Pendiente' */
      }

      /* Opcional: Estilo para la lista desplegable, no cambia el color de las opciones */
      .inputPaid option {
        background-color: #fff; /* Fondo blanco para las opciones en la lista desplegable */
        color: #000; /* Color del texto en las opciones */
      }
    }
  }
  .sectionPayments {
    .error {
      box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
      padding: 5px;
      background-color: #d4edda;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
      .smsError {
        font-size: 13px;
        color: #616161;
        font-weight: bold;
        text-align: right;
      }
      .btnEdit{
        font-size: 13px;
        color: #616161;
        font-weight: bold;
        text-transform: capitalize;

      }
      .iconOk{
        color: #0cc436;
        font-size: 28px;
      }
      .iconError{
        font-size: 28px;
        color: #990000;
      }
    }
    .errorActive{
      background-color: #c89393;
      .smsError {
        font-size: 13px;
        color: white;
        font-weight: bold;
        text-align: right;
      }
    }
    .notError{
      background-color: #d4edda;
    }
  }
  .itemsPayments {
    display: flex;
    gap: 12px;
    .item {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      margin-bottom: 2%;
      width: 33%;

      .label-box {
        margin-bottom: 5px;
        color: rgb(86 86 86);
        font-weight: 600;
        width: 100%;
        .downpayment {
          color: green;
        }
        .checker {
          color: ${colors.primaryColorDark};
        }
        p {
          color: rgb(97 97 97 / 90%);
        }
        strong {
          margin-left: 2px;
          color: red;
        }
      }
      .error {
        border-color: #990000;
      }

      input,
      select {
        height: 42px;
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
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        &:focus {
          outline: none;
          box-shadow: 1px 1px 1px 1px rgb(120 90 248 / 25%);
        }
        &:disabled {
          color: gray;
        }
      }

      .icon {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        :hover {
          cursor: help;
        }
        .success {
          color: green;
        }

        .fail {
          color: gray;
        }
        .error {
          color: red;
        }
      }
      /* Styles.css */

      /* Estilo base para el select */
      .inputPaid {
        height: 42px;
        border-radius: 4px;
        padding: 0 10px;
        width: 100%;
        border: 1px solid #ccc;
        background-color: #fff; /* Color de fondo predeterminado */
        cursor: pointer;
      }

      /* Estilo para 'Pagado' */
      .inputPaid.ispaid {
        background-color: #d4edda; /* Verde para 'Pagado' */
      }

      /* Estilo para 'Pendiente' */
      .inputPaid.notpaid {
        background-color: #fff3cd; /* Amarillo para 'Pendiente' */
      }

      /* Opcional: Estilo para la lista desplegable, no cambia el color de las opciones */
      .inputPaid option {
        background-color: #fff; /* Fondo blanco para las opciones en la lista desplegable */
        color: #000; /* Color del texto en las opciones */
      }
    }
  }
`;
