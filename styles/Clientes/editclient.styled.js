import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";

export const EditClientStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .contentEdit {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;

      &__head {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .button_back {
          width: 30px;
          height: 30px;
          margin-right: 10px;
          margin-bottom: -4px;
          background-color: #407aff;
          .icon {
            font-size: 22px;
            color: #fff;
          }
        }
        .title {
          font-size: 21px;
          font-weight: 500;
        }
      }
      &__body {
        margin-bottom: 30px;
        .container_dataOportunity {
          margin-bottom: 20px;
          .title {
            font-size: 14px;
            color: grey;
          }
          .data {
            font-weight: 500;
          }
          .date {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            font-size: 15px;
            border: 1px solid #dcdcdc;
            padding: 5px;
            outline: none;
            cursor: pointer;
          }
          .text_observations {
            width: 100%;
            border-radius: 5px;
            border: 1px solid #dcdcdc;
            padding: 5px;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
            outline: none;
            cursor: default;
            resize: vertical;
            min-height: 50px;
          }
          .button_visualizer {
            margin-top: 5px;
            background-color: #285091;
            color: #fff;
            text-transform: capitalize;
            font-size: 12px;
            .icon_see {
              margin-top: -2px;
              font-size: 16px;
            }
          }
          .capitalize {
            text-transform: capitalize;
          }
        }
        .products_oportunity {
          width: 100%;
          margin-bottom: 2%;
          .products_header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1%;

            .title {
              font-size: 19px;
              font-weight: 500;
              margin-bottom: 10px;
              .count_p {
                font-size: 15px;
                color: #407aff;
              }
            }
            .button_restore {
              text-transform: capitalize;
              font-size: 12px;
              border: 1px solid #285091;
              color: #285091;
            }
          }
          .container_table {
            overflow: auto;
            width: 100%;
            height: auto;
            max-height: 40vh;
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
            .table {
              width: 100%;
              border-collapse: collapse;
              table-layout: auto;
              tr:nth-child(even) {
                background: #ddd;
                td {
                  background-color: #ddd;
                }
              }
              tr:nth-child(odd) {
                background: #fff;
                td {
                  background-color: #fff;
                }
              }
              &__head {
                .tr_head {
                  .th {
                    position: sticky;
                    top: 0;
                    padding: 5px;
                    background-color: #285091;
                    color: #fff;
                    z-index: 1;
                  }
                }
              }
              &__body {
                .td {
                  text-align: center;
                  padding: 3px;
                  font-size: 14px;
                  .bt_edit {
                    border-radius: 8px;
                    width: 35px;
                    height: 35px;
                    svg {
                      font-size: 20px;
                      color: #285091;
                    }
                  }
                }
                .empty_products {
                  .title_empty {
                    padding: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 16px;
                    font-weight: 500;
                  }
                }
              }
              .align_left {
                text-align: left;
              }
              .align_center {
                text-align: center;
              }
              .weight {
                font-weight: 500;
              }
            }
            .hold_scroll {
              left: 0;
            }
            margin-bottom: 20px;
          }
          .products_totals {
            display: flex;
            flex-direction: column;
            padding: 5px;
            margin-bottom: 10px;
            font-size: 15px;
            .total {
              font-weight: 500;
            }
          }
          .buttons_products {
            display: flex;
            align-items: center;
            flex-direction: row-reverse;
            justify-content: space-between;
            .bt_add {
              background-color: #285091;
              text-transform: capitalize;
              color: #fff;
              font-size: 13px;
            }
            .bt_shipping {
              color: #285091;
              border: 1px solid #285091;
              border-radius: 5px;
              font-size: 13px;
              text-transform: capitalize;
            }
          }
        }
        .payments_oportunity {
          width: 100%;
          .title {
            font-size: 19px;
            font-weight: 500;
            margin-bottom: 10px;
            .count_p {
              font-size: 15px;
              color: #407aff;
            }
          }
          .tab_payments {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 10px;
            margin-bottom: 10px;
            position: sticky;
            top: 0;
            z-index: 1;
            background-color: #285091;
            .title_tab {
              display: flex;
              align-items: center;
              font-weight: 500;
              color: #fff;
              svg {
                margin-right: 5px;
                font-size: 20px;
              }
            }
            .buttons_tab {
              .add_bt {
                height: 35px;
                width: 35px;
                border-radius: 8px;
                background-color: #cfd8dc;
                margin-right: 10px;
              }
              .calculate_bt {
                height: 35px;
                width: 35px;
                border-radius: 8px;
                background-color: #cfd8dc;
              }
            }
          }
          .container_payments {
            width: 100%;
            overflow: auto;
            height: auto;
            max-height: 40vh;
            margin-bottom: 30px;
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
            .table_payments {
              width: 100%;
              &__head {
              }
              &__body {
                .payment {
                  width: 100%;
                  display: flex;
                  align-items: center;
                  justify-content: space-between;
                  .title_p {
                    font-size: 14px;
                    color: grey;
                  }
                  .data_p {
                    width: 200px;
                    font-weight: 500;
                    padding: 13px;
                    border-radius: 5px;
                    border: 1px solid #dcdcdc;
                    outline: none;
                  }
                  .input_date {
                    width: 200px;
                    border: 1px solid #dcdcdc;
                    border-radius: 5px;
                    padding: 5px;

                    input#date-picker-inline {
                      font-size: 14px;
                    }
                    svg {
                      font-size: 20px;
                    }
                  }
                  .text_area {
                    width: 250px;
                    height: 43px;
                    padding: 5px;
                    border: 1px solid #dcdcdc;
                    resize: none;
                    outline: none;
                    border-radius: 5px;
                    margin-bottom: -3px;
                    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu,
                      Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
                  }
                  .observations {
                  }
                  .payed {
                    color: green;
                  }
                  .pending {
                    color: #c0c0c0;
                  }
                  .bt_delete {
                    height: 40px;
                    width: 40px;
                    border-radius: 7px;
                    svg {
                      color: red;
                    }
                  }
                  .new {
                    background-color: #90caf9;
                  }
                }
                .margin {
                  margin-bottom: 2%;
                }
              }
              .empty_payments {
                .title_empty {
                  padding: 20px;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-size: 16px;
                  font-weight: 500;
                }
              }
            }
          }
          .buttons_payments {
            display: flex;
            flex-direction: row-reverse;
            margin-bottom: -27px;
            .reload_payments {
              border: 1px solid #285091;
              color: #285091;
              text-transform: capitalize;
              font-size: 12px;
            }
          }
          .totals_payments {
            .item_total {
              .total {
                width: fit-content;
                font-size: 14px;
                max-width: 200px;
                font-weight: 500;
                padding: 13px;
                border-radius: 5px;
                border: 1px solid #dcdcdc;
                outline: none;
                margin-right: 5%;
              }
              .com_total {
                width: fit-content;
                font-size: 14px;
                max-width: 200px;
                font-weight: 500;
                padding: 13px;
                border-radius: 5px;
                border: 1px solid #dcdcdc;
                outline: none;
              }
              .error {
                color: red;
                background-color: #ffcdd2;
              }
              .success {
                color: green;
                background-color: rgb(174, 213, 129, 0.4);
              }
              .totals_title {
                color: #285091;
                font-size: 15px;
                font-weight: bold;
                margin: 20px 0px;
              }
            }
            .margin_top {
              padding-top: 10px;
            }
          }
        }
      }
      &__footer {
        display: flex;
        flex-direction: row-reverse;
        .button_cancel {
          text-transform: capitalize;
          background-color: red;
          color: #fff;
          margin-right: 5px;
          border: 1px solid red;
          &:hover {
            background-color: #fff;
            color: red;
          }
        }
        .button_save {
          background-color: #285091;
          color: #fff;
          text-transform: capitalize;
          border: 1px solid #285091;
          margin-left: 5px;
          &:hover {
            background-color: #fff;
            color: #285091;
          }
        }
        .button_template {
          color: #285091;
          text-transform: capitalize;
          border: 1px solid #285091;
          margin-right: 10px;
          font-size: 13px;
        }
      }
      .ctr_load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        margin-top: 10%;
        /* height: 400px; */
        &__img {
          width: 150px;
          animation: slide_img 3s infinite;
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
        @keyframes slide_img {
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
    }
  }
`;

export const VisualizerDoc = styled(Drawer)`
  .MuiDrawer-paperAnchorRight {
    overflow-x: hidden;
    overflow-y: hidden;
    @media (min-width: 1151px) {
      width: 40%;
    }
    @media (max-width: 1150px) {
      width: 50%;
    }
    @media (max-width: 900px) {
      width: 70%;
    }
    @media (max-width: 590px) {
      width: 100%;
    }
  }

  .container {
    &__head {
      padding: 10px;
      background-color: #285091;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        color: #fff;
        font-weight: 500;
        font-size: 17px;
      }
      .button_close {
        width: 35px;
        height: 35px;
        transition: 0.2s;
        &:hover {
          background-color: red;
          .icon {
            color: #fff;
          }
        }
        .icon {
          font-size: 20px;
          color: red;
        }
      }
    }
    &__body {
    }
  }
`;

export const EditProduct = styled(Dialog)`
  .edit_container {
    &__head {
      padding: 6px;
      .title {
        font-size: 16px;
        margin-left: 14px;
        font-weight: 500;
      }
    }
    &__body {
      margin: 10px;
      padding: 10px;
      .data_product {
        .title {
          color: grey;
          font-size: 13px;
        }
        .data {
          font-size: 15px;
        }
        .data_input {
          width: 100%;
          outline: none;
          font-size: 14px;
          padding: 7px;
          border: 1px solid #d3d3d3;
          border-radius: 3px;
        }
        .data_area {
          width: 100%;
          outline: none;
          font-size: 12px;
          padding: 7px;
          border: 1px solid #d3d3d3;
          border-radius: 3px;
          resize: vertical;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }
      }
    }
    &__footer {
      padding: 5px;
      display: flex;
      flex-direction: row-reverse;
      .bt {
        text-transform: capitalize;
        color: #fff;
        height: 30px;
      }
      .save {
        margin-left: 5px;
        background-color: #285091;
      }
      .cancel {
        background-color: red;
      }
    }
  }
`;

export const AlertRequired = styled.span`
  color: red;
  font-weight: 500;
`;

export const ConfirmDeleteProduct = styled(Dialog)`
  .container_confirm {
    padding: 10px;
    &__header {
      padding: 5px;
      display: flex;
      align-items: center;

      .title_header {
        font-size: 17px;
        color: #285091;
      }
      .icon {
        font-size: 25px;
        margin-right: 10px;
        color: #285091;
      }
    }
    &__body {
      padding: 10px;
      .cont {
        font-size: 14px;
        margin-bottom: 7%;
        .product {
          font-weight: 500;
        }
      }
      .buttons {
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .bt_cancel {
          text-transform: capitalize;
          background-color: red;
          margin-right: 7px;
          color: #fff;
          font-size: 13px;
        }
        .bt_save {
          background-color: #285091;
          text-transform: capitalize;
          color: #fff;
          font-size: 13px;
        }
      }
    }
  }
`;

export const CalculateAutoStyle = styled(Dialog)`
  .calculate_container {
    &__header {
      padding: 10px;
      background-color: #285091;
      margin-bottom: 3%;
      .title_haeder {
        color: #fff;
        font-weight: 500;
      }
    }
    &__body {
      .calc_info {
        width: 100%;
        height: 100%;
        padding: 20px;
        .item_pay {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title_item {
            width: 50%;
            font-size: 14px;
          }
          .number_pay {
            width: 50%;
            height: 39px;
            outline: none;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            padding: 5px;
          }
          .select_pay {
            width: 50%;
            height: 42px;
            outline: none;
            font-size: 14px;
          }
          .date_pay {
            display: flex;
            align-items: center;
            width: 50%;
            outline: none;
            font-size: 14px;
            border: 1px solid #ced4da;
          }
          input#date-picker-inline {
            font-size: 14px;
            margin: 2px;
            align-items: center;
          }
        }
      }
      .buttons_pay {
        padding: 20px;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        width: 100%;
        .bt_cancel {
          background-color: #0c203b;
          margin-right: 5px;
          text-transform: capitalize;
          color: #fff;
        }
        .bt_save {
          text-transform: capitalize;
          background-color: #103c82;
          color: #fff;
        }
        .disabled {
          background-color: grey;
        }
      }
    }
    &__footer {
    }
  }
`;

export const RedirectOrderStyle = styled(Dialog)`
  .container_redirect {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .message {
      font-size: 15px;
      font-weight: 500;
      margin: 15px;
    }
    .progress_bar {
      padding: 2px;
      width: 100%;
    }
  }
`;

export const MessageOrderStyle = styled(Dialog)`
  .container_message {
    padding: 8px;
    .message {
      display: flex;
      flex-direction: row;
      align-items: center;
      .icon_info {
        font-size: 28px;
        color: #285091;
      }
      .title_info {
        margin-left: 10px;
        font-size: 16px;
      }
    }
    .buttons {
      display: flex;
      flex-direction: row-reverse;
      .bt_back {
        text-transform: capitalize;
        background-color: #285091;
        color: #fff;
        font-size: 12px;
      }
    }
  }
`;
