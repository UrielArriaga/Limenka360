import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";

export const ModalAddProductStyled = styled(Drawer)`
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
  .contentPreview {
    width: 60vw;
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    max-height: calc(100vh - 268px);
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
    .input_data {
      color: #616161;
      margin: 0px 0px;
      font-size: 12px;
      padding: 2px;
      border: 1px solid #d4d4d4;
      outline: none;
      width: 80%;
      font-weight: bold;
      height: 36px;
      border-radius: 5px;
      padding-left: 10px;
    }
    .button_add {
      color: white;
      background-color: #405189;
      margin-left: 4px;
      text-transform: capitalize;
      font-size: 10px;
      margin-top: 4px;
    }

    .containerTable {
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

      max-height: 70vh;
      margin-top: 29px;
      &__products {
        .tablebody {
          .odd-row {
            background-color: #e3e3e3;
          }
          .even-row {
            /* background-color: #f0f0f0; */
          }
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        .tableheader {
          display: flex;
          background-color: #405189;
          color: white;
          border-top-left-radius: 9px;
          border-top-right-radius: 9px;
          padding: 10px;
          font-weight: bold;
          position: sticky;

          .tablehead {
            flex: 1;

            text-align: left;
            font-weight: bold;
          }

          .tableheadproductname {
            flex: 3;
          }
        }

        .tablerow {
          display: flex;
          border-bottom: 1px solid #e0e0e0;
          padding: 20px;
          font-weight: bold;
          min-height: 40px;
          color: #616161;
          cursor: pointer;

          .tablecell {
            flex: 1;

            text-align: left;
            color: #616161;
            font-weight: bold;
          }
          .code {
            color: #000;
          }

          .actions {
            .disabled {
              background-color: #e0e0e0;
              color: #616161;
            }
            button {
              margin-right: 10px;

              background-color: #405189;
              color: #fff;
              border: 1px solid #ccc;
              border-radius: 5px;
              padding: 5px 10px;
            }
          }

          .tableheadproductrow {
            flex: 3;
          }
        }

        .tablelist {
          padding-left: 10px;

          .tablelititem {
            font-size: 11px;
            display: flex;
            align-items: flex-start;
            padding: 20px 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #000;
            font-weight: bold;
            .description {
              display: flex;
              margin-right: 10px;
            }
            .contentMenu {
              box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 5px 0px;
              border-radius: 5px;
              background-color: #f0f1f1;
              margin-left: 7px;
            }
            .icon {
              font-size: 11px;
              margin-right: 10px;
            }
            .serialnumber {
              text-transform: uppercase;
              color: #00738e;
              margin-right: 10px;
              font-weight: bold;
            }
            .name {
              margin-right: 10px;
              &:hover {
                color: red;
                cursor: pointer;
                .delete {
                  visibility: visible;
                }
              }
            }

            textarea {
              width: 50%;
              padding: 5px;
              height: 50px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: vertical;
            }

            .delete {
              color: red;
              visibility: hidden;
            }
            .btndelete {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .iconBtnDelete {
              background-color: red;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }

            .icondelete {
              font-size: 15px;
            }
          }
        }

        .tablelistsaved {
          padding-left: 10px;
          .tablelititem {
            font-size: 11px;
            display: flex;
            align-items: flex-start;
            padding: 20px 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #000;
            font-weight: bold;

            .description {
              display: flex;
              margin-right: 10px;
            }
            .icon {
              font-size: 11px;
              margin-right: 10px;
            }
            .serialnumber {
              text-transform: uppercase;
              color: #00738e;
              margin-right: 10px;
              font-weight: bold;
            }
            .name {
              margin-right: 10px;
              &:hover {
                color: red;
                cursor: pointer;
                .delete {
                  visibility: visible;
                }
              }
            }

            textarea {
              width: 300px;
              padding: 5px;
              height: 50px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: none;
            }

            .delete {
              color: red;
              visibility: hidden;
            }
            .btndelete {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .iconBtnDelete {
              background-color: red;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }

            .iconAdd {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .icondelete {
              font-size: 15px;
            }
          }
        }

        .selected {
          background-color: #f1f1fa;
        }

        .stocksavailables {
          background-color: #f1f1fa;
          padding: 10px;
          font-size: 12px;
          h4 {
            margin-bottom: 10px;
            font-size: 14px;
          }

          .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .itemwerehouse {
            padding: 10px;
            background-color: rgba(0, 230, 118, 0.3);
            border-radius: 8px;
          }

          .unit {
            color: #616161;
            font-weight: bold;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 1%;
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

    .inputContainer {
      width: 93%;
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
