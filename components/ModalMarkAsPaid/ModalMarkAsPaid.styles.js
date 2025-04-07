import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const StyledBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  border-radius: 3px;
  padding: 16px;

  .item {
    display: flex;
    flex-direction: column;
    margin-top: 5px;

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
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;
  display: flex;
  justify-content: flex-end; /* Alineación a la derecha */
  align-items: center;

  & > button {
    margin: 0 4px;
    padding: 6px 12px; /* Botones más pequeños */
    font-weight: bold;
    border-radius: 3px;
    transition: background-color 0.3s ease;
    min-width: 80px; /* Ancho mínimo para consistencia */
    font-size: 0.8rem; /* Tamaño de fuente más pequeño */

    &:first-child {
      background-color: #f44336; /* Rojo */
      color: white;
      border: none;

      &:hover {
        background-color: #d32f2f; /* Rojo más oscuro */
      }
    }

    &:last-child {
      background-color: #103c82; /* Azul */
      color: white;
      border: none;

      &:hover {
        background-color: #103c82; /* Azul más oscuro */
      }
    }
  }
`;