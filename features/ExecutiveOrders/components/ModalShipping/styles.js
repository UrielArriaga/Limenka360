import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const ModalShippingStyled = styled(Dialog)`
  .MuiDialog-paper {
    width: 1200px;
    height: 700px;
    max-width: 100%;
    max-height: 100%;
  }

  .header {
    flex: 1.3; /* Ajusta la altura de la cabecera */
  }

  .body {
    flex: 10; /* Ajusta la altura del cuerpo, ocupando el doble de espacio que la cabecera o acciones */
  }

  .actions {
    flex: 1; /* Ajusta la altura de las acciones */
    display: flex;
    justify-content: flex-end;
    padding: 10px;

    button {
    }
  }

  .header {
    padding: 0px 10px;
    display: flex;
    background-color: #103c82;
    align-items: center;
    justify-content: space-between;

    p {
      color: #fff;
      font-weight: bold;
      font-size: 24px;
    }

    svg {
      color: #fff;
      cursor: pointer;
    }
  }

  .body {
    padding: 10px;
    .title {
      margin-bottom: 20px;
      font-weight: bold;
    }

    .options {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .option {
      display: flex;

      align-items: center;
    }
  }

  .formdistribute {
    .inputlabel {
      display: flex;
      flex-direction: column;

      margin-top: 20px;
      label {
        color: rgb(86 86 86);
        font-weight: 600;
        font-size: 14px;
      }
      input {
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
      }
    }

    .listcontainer {
      /* background-color: red; */
      .listtitle {
        font-weight: bold;
        margin-bottom: 10px;
      }
      .product {
        display: flex;
        gap: 10px;
        justify-content: space-between;
        margin-bottom: 20px;
        border-bottom: 1px solid #e0e0e0;
        padding-bottom: 10px;

        .code {
          font-weight: bold;
          margin-right: 10px;
          color: #103c82;
        }
        .productname {
          flex: 4;
        }

        .producttotal {
          flex: 4;
          text-align: end;
        }

        .green {
          color: green;
        }
      }
    }
  }
`;
/* .options {
    height: 100%;
    display: flex;
    align-items: flex-end;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
  }
  .inputlabel {
    display: flex;
    flex-direction: column;
    label {
      color: rgb(86 86 86);
      font-weight: 600;
      font-size: 14px;
    }
    input {
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
    }

    .disabled {
      background-color: #e0e0e0;
    }
  }

  .amountFinal {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    label {
      color: #000;
    }

    .total {
      color: #424242;
      font-weight: bold;
    }
  } */
