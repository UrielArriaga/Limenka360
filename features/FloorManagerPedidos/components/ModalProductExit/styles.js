import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";

export const ModalProductExitStyled = styled(Drawer)`
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    /* width: 70vw; */

    background: #f3f3f3;
    min-height: 100vh;
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

  .container_exit {
    width: 80vw;
  }

  .container_order {
    width: 100%;
    // background-color: red;
    display: flex;

    .select {
      margin-left: auto;
      padding-right: 20px;
      display: flex;
      align-items: center;
      gap: 10px;

      select {
        appearance: none; /* Remueve el estilo predeterminado */
        background-color: #fff; /* Fondo blanco */
        border: 1px solid #ccc; /* Borde delgado y gris */
        border-radius: 4px; /* Bordes redondeados */
        padding: 4px 5px; /* Espaciado interno */
        font-size: 14px; /* Tamaño de fuente */
        color: #333; /* Color del texto */
        cursor: pointer;
        outline: none; /* Elimina el borde azul al hacer clic */
        transition: border-color 0.3s ease;
      }
    }
  }

  .container_table {
    padding: 17px;
  }
.circule-indicator {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white; 
  font-size: 14px;
  font-weight: bold;
  text-transform: capitalize; 
}
  .bg-rojo {
  background-color: red;
}

.bg-verde {
  background-color: green;
}

.bg-azul {
  background-color: blue;
}

.bg-amarillo {
  background-color: yellow;
}
  .table {
    width: 100%;
    border-collapse: separate; /* Cambiado a 'separate' para permitir el borde redondeado */
    border-spacing: 0; /* Para que no haya espacio entre las celdas */
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px; /* Borde redondeado */
    overflow: hidden; /* Para que el contenido no sobresalga de los bordes */
  }

  .table thead {
    background-color: #405189;
    color: #fff;
    font-size: 14px;
    text-transform: uppercase;
  }

  .table th,
  .table td {
    padding: 12px;
    text-align: left;
    font-size: 11px;
    font-weight: bold;
  }
  .reparair {
    display: flex;
    gap: 3px;
  }
  .reparation {
    background-color: #059be5;
  }

  .text-reparation {
    /* position: fixed; */
    margin-top:-22px ;
    margin-left: 15px;
    color: #fff;
  }
 

  .center-td {
    /* justify-items: center; */
    /* background-color: #059be5; */
    margin-left: 20px;
  svg{
  color:#857e7e;
  }
  }
  .radio-visual-green {
    background-color: green;
    width: 50%;
    text-align:center;
    height: 30px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .radio-visual-red {
    background-color: red;
     width: 50%;
    text-align:center;
    height: 30px;
    border-radius: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .text {
    color: #fff;
  }

  .table tbody tr {
    background-color: #fff;
    transition: background-color 0.3s ease;
    cursor: pointer;
  }

  .table tbody tr:hover {
    background-color: #f5f5f5;
  }

  .table-checkbox {
    text-align: center;
  }

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    height: 60px;
    background-color: #103c82;
    /* margin-bottom: 20px; */

    .close {
      display: flex;
      align-items: center;
      .title {
        font-weight: bold;
        color: #fff;
        font-size: 20px;
      }
      .close {
        width: 30px;
        height: 30px;
        padding: 5px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 50%;
        color: #fff;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    .btn_save {
      text-transform: capitalize;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  }

  .search_container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 15px 12px;

    h4 {
      font-size: 16px;
      font-weight: normal;
      color: #585858;
      margin-right: 20px;
    }

    .textSerial {
      width: 100px;
    }

    .selectSearch {
      width: 150px;
      outline: none;
      margin-left: 7px;
      margin-right: 5px;
      border-radius: 5px;
      border: 1px solid #ccc;
      padding: 8px;
      color: #585858;
    }

    .inputSerial {
      width: 95%;
      position: relative;
      margin-right: 10px;
    }

    .inputContainer {
      width: 95%;
      position: relative;
      margin-right: 10px;
      &__icon {
        position: absolute;
        font-size: 16px;
        top: 8px;
        left: 10px;
        color: #ccc;
      }

      &__input {
        width: 100%;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid #ccc;
        outline: none;
        height: 34px;
        margin-right: 20px;
        padding-left: 30px;
      }

      &__clean {
        position: absolute;
        font-size: 16px;
        top: 6px;
        right: 5px;
        color: #ccc;
        padding: 0;
        margin: 0;
        color: #059be5;
      }
    }
  }
`;
