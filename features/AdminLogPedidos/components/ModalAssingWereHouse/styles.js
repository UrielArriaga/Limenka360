import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";

export const ModalAssingWereHouseStyled = styled(Drawer)`
  * {
    margin: 0;
    padding: 0;
  }

  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
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

  .ctr_edit {
    width: 80vw;
    &__header {
      /* position: fixed; */
      /* width: 100%; */
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 60px;
      background-color: #103c82;

      &__close {
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

    &__containerTable {
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      max-height: 100vh;
      margin-top: 29px;
      margin: 18px;
      padding: 12px;
      border-radius: 12px;
      background: white;
      .form {
        margin-bottom: 12px;
        margin-top: 8px;
        width: 27%;

        .headerForm {
          margin-bottom: 3px;
          display: flex;
          align-items: center;
          svg {
            color: rgba(16, 60, 130, 0.5);
          }
          .addAll {
            color: black;
            font-weight: 600;
          }
        }
      }
    }

    &__products {
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
          /* padding: 10px; */
          text-align: left;
          font-weight: bold;
          /* min-width: 150px; */
        }

        .tableheadproductname {
          flex: 2;
        }

        .tableheadproductrow {
          flex: 2;
        }
        .tablewarehouses {
          flex: 6;
        }
      }
      .tablebody {
        overflow: auto;
        height: 486px;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }

      .complete {
        background-color: rgba(0, 230, 118, 0.2);
      }
      .major {
        background-color: rgba(244, 67, 54, 0.2);
      }

      .tablerow {
        display: flex;
        border-bottom: 2px solid #e0e0e0;
        padding: 10px;
        font-weight: bold;
        min-height: 40px;
        /* height: 40px; */
        color: #616161;
        cursor: pointer;

        .tablecell {
          flex: 1;
          /* padding: 10px; */
          text-align: left;
          color: #616161;
          font-weight: bold;
          /* min-height: 40px; */
        }

        .tableheadproductrow {
          flex: 2;
        }
        .tablewarehouses {
          flex: 6;

          .itemWareHouse {
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            font-size: 10px;
            margin-right: 30px;
            flex-direction: column;

            p {
              margin: 0;
            }

            input {
              width: 50px;
              height: 20px;
              font-size: 10px;
              border: 1px solid #e0e0e0;
              border-radius: 5px;
              padding: 5px;
              margin-top: 5px;
              text-align: center;
            }

            .numberInputContainer {
              position: relative;
              display: inline-block;
            }

            .numberInput {
              width: 80px;
              height: 40px;
              font-size: 10px;
              text-align: center;
              padding: 4px;
              border: 1px solid #ccc;
              border-radius: 4px;
              box-sizing: border-box;
            }

            input[type="number"] {
              /*for absolutely positioning spinners*/
              position: relative;
              padding: 0px;
              padding-right: 25px;
            }

            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              opacity: 1;
            }

            input[type="number"]::-webkit-outer-spin-button,
            input[type="number"]::-webkit-inner-spin-button {
              -webkit-appearance: inner-spin-button !important;
              width: 25px;
              position: absolute;
              top: 0;
              right: 0;
              height: 100%;
            }
            .warehouse-list {
              display: flex;
              flex-direction: column;
              gap: 20px;
              padding: 20px;
              background-color: #f9f9f9;
            }

            .warehouse-item {
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 15px;
              background-color: #fff;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .itemWareHouse {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
            }

            .warehouse-name {
              font-weight: bold;
              font-size: 18px;
              margin-bottom: 5px;
            }

            .warehouse-stock {
              color: #666;
              margin-bottom: 15px;
            }

            .quantity-controls {
              display: flex;
              align-items: center;
              gap: 10px;
            }

            .quantity-button {
              background-color: #007bff;
              color: #fff;
              border: none;
              border-radius: 4px;
              font-size: 18px;
              width: 36px;
              height: 36px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: background-color 0.2s;
            }

            .quantity-button:hover {
              background-color: #0056b3;
            }

            .quantity-button.decrement {
              background-color: #dc3545;
            }

            .quantity-button.decrement:hover {
              background-color: #c82333;
            }

            .number-input {
              width: 60px;
              text-align: center;
              padding: 8px;
              font-size: 16px;
              border: 1px solid #ccc;
              border-radius: 4px;
            }
            .quantityControls {
              display: flex;
              .numberInput {
                width: 80px;
                height: 40px;
                font-size: 10px;
                text-align: center;
                padding: 4px;
                border: 1px solid #ccc;
                border-radius: 4px;
                box-sizing: border-box;
                border: 1px solid #ccc;
              }
            }
            .buttons {
              display: contents;
            }
          }
        }
      }

      .selected {
        background-color: #f1f1fa;
      }
    }
  }
`;
