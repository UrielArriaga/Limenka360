import styled from "styled-components";
import { Drawer } from "@material-ui/core";
import { colors } from "../../styles/global.styles";
export const PaymentsStyled = styled.div`
  * {
    margin: 0;
  }
  margin-bottom: 5em;

  .headform {
  }

  h3 {
    color: rgb(97 97 97 / 90%);
    margin-left: 4px;
  }

  .itemComment {
    display: flex;
    flex-direction: column;
    /* gap: 12px; */
    /* align-items: center; */

    .input {
      height: 42px;
      /* margin-top: 10px; */
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
    .item {
      font-size: 14px;
      /* margin-top: 5px; */
      font-weight: 600;

      letter-spacing: 1px;
      color: rgb(86 86 86);
      width: 184px;
    }
    strong {
      margin-left: 2px;
      color: red;
    }
  }
  .item {
    display: flex;
    flex-direction: column;

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
  .itemFile {
    display: flex;
    flex-direction: column;
    /* gap: 12px; */
    /* align-items: center; */

    .label-box {
      margin-bottom: 5px;
      color: rgb(86 86 86);
      font-weight: 600;
      letter-spacing: 1px;
      font-size: 14px;
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
      margin-top: -20px;
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

    .uploadFile {
      margin-top: 10px;
      display: flex;
      /* flex-direction: column; */
      align-items: center;
      width: 100%;
      border: 1px solid rgb(63, 81, 181, 0.2);
      height: 42px;
      svg {
        font-size: 25px;
        margin: 5px;
        color: #990000;
      }
      .content_file {
        width: 100%;
        .title_file {
          text-align: center;
          font-size: 12px;
          width: 17vh;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: fit-content;
          cursor: pointer;
        }
      }
      .content_btns{
        display: flex;
        .iconDelete{
          color: #990000;
          cursor: pointer;
        }
        .iconView{
          cursor: pointer;
          color: #0c203b;
        }
      }
    }
  }

  .ispaid {
    border: 1px solid green;
  }
  .custom-select {
    height: 42px;
    border-radius: 4px;
    padding: 0 10px;
    width: 100%;
    border: 1px solid #ccc;
    background-color: #fff;
    cursor: pointer;
  }

  .custom-select.pending {
    background-color: #fff3cd; /* Yellow background for 'Pendiente' */
  }

  .custom-select.paid {
    background-color: #d4edda; /* Green background for 'Pagado' */
  }

  .payments {
    .title {
      span {
        font-size: 0.9em;
        color: grey;
      }
    }
  }
  .row {
    display: flex;
    align-items: center;
    margin-bottom: 13px;
  }
  .headPayments {
    &__title {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 10px;
      width: 34%;

      h3 {
        color: rgb(97 97 97 / 90%);
        margin-left: 4px;
      }
      svg {
        display: flex;
        align-items: center;
        font-size: 25px;
        border-radius: 50%;
        background: #dce1f6;
        width: 30px;
        height: 30px;
        padding: 5px;
        transition: all 0.5s ease;
        &:hover {
          background: #0c203b;
          color: #fff;
        }
      }
    }
  }
  .Payments {
    &__title {
      display: flex;
      align-items: center;
      font-size: 14px;
      margin-bottom: 10px;
      width: 34%;
      margin-top: 10px;

      h3 {
        color: rgb(97 97 97 / 90%);
        margin-left: 4px;
      }
      svg {
        display: flex;
        align-items: center;
        font-size: 25px;
        border-radius: 50%;
        background: #dce1f6;
        width: 30px;
        height: 30px;
        padding: 5px;
        transition: all 0.5s ease;
        &:hover {
          background: #0c203b;
          color: #fff;
        }
      }
    }
  }
  .form {
    strong {
      color: red;
    }

    .inputNumberWheel {
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
  .iconAlert {
    color: red;
    margin-bottom: -5px;
    font-size: 20px;
    margin-left: 5px;
    cursor: pointer;
  }
`;
export const CardDefault = styled.div`
margin-top: 4px;
  .label {
    display: flex;
    height: 50px;
    padding: 0px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    border: thick dotted rgb(63, 81, 181, 0.1);
    &:hover {
      background-color: rgb(63, 81, 181, 0.2);
      cursor: pointer;
      border: thick dotted transparent;
      padding: 1;
    }
    .input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: relative;
      z-index: -1;
    }
    span{
      font-size: 12px;
      display: flex;
      align-items: center;
      color: #495057;
      font-weight: 400px;
    }
  }
  .default_icon {
    font-size: 2vh;
    color: rgb(63, 81, 181, 0.5);
  }
`;
