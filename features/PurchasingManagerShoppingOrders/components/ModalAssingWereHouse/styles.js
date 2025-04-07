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

  .container {
    width: 70vw;
    position: relative;
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
          }
        }
      }

      .selected {
        background-color: #f1f1fa;
      }
    }
  }

  .header {
    /* position: fixed; */
    /* width: 100%; */
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    height: 60px;
    background-color: #103c82;
    h2 {
      color: white;
    }
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
      /* text-transform: capitalize; */
      font-size: 17px;
      border: none;
      color: #fff;
      background-color: #103c82;
    }
  }

  .body {
    padding: 10px;
    height: 100%;

    .listorders {
      padding-top: 20px;
      /* background-color: red; */
      height: 100%;
      .contentPreview {
        flex: 1;
        overflow-y: auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 9px;
        margin-top: 3%;
        /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */

        /* max-height: calc(100vh - 268px); */
        height: 80vh;
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

        .containerTable {
          margin-bottom: 20px;
          box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

          max-height: 100vh;
          /* margin-top: 29px; */
          &__products {
            .tablebody {
              .odd-row {
                background-color: #e3e3e3;
              }
              .even-row {
                /* background-color: #f0f0f0; */
              }
              .notExits {
                color: rgb(88, 88, 88);
                font-size: 14px;
                padding: 5px;
                text-align: center;
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
              &:hover {
                background-color: #f0f1f1;
              }
              .tablecell {
                flex: 1;

                text-align: left;
                color: #616161;
                font-weight: bold;
              }
              .code {
                color: #000;
                .input_data {
                  color: #616161;
                  margin: 0px 0px;
                  font-size: 12px;
                  padding: 2px;
                  border: 1px solid #d4d4d4;
                  outline: none;
                  width: 90%;
                  font-weight: bold;
                  height: 27px;
                  border-radius: 5px;
                }
                .input_observations {
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
                  min-height: 38px;
                  outline: none;
                  resize: none;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
                    "Open Sans", "Helvetica Neue", sans-serif;
                }
                .btnAdd {
                  background-color: #405189;
                  color: white;
                  text-transform: capitalize;
                  border-radius: 7px;
                }
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
    }

    .itemorder {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding: 10px 0;
      border-bottom: 1px solid #c7c7c7;
      background-color: rgba(64, 81, 137, 0.15);
      /* width: 70%; */
      padding-right: 20px;
      padding-left: 20px;
      border-radius: 4px;
      &:hover {
        /* background-color: #f5f5f5; */
      }

      .row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 0;
      }

      .providername {
        text-transform: capitalize;
      }

      &--name {
        font-size: 14px;
        font-weight: 600;
        color: #000;
      }

      &--date {
        font-size: 12px;
        font-weight: 600;
        color: #616161;
      }

      &--provider {
        font-size: 12px;
        font-weight: 600;
        color: #616161;
      }

      .actions {
        button {
          margin-right: 24px;
          color: #0c203b;
          background: transparent;
          border: none;
          cursor: pointer;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }

  .infoproductselected {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .infoTile {
      padding-left: 25px;
      font-size: 16px;
      width: 55%;
      .warnning {
        color: #f3bb1b;
      }
    }
    .crearnueva {
      /* position: absolute; */
      /* bottom: -100px; */
      right: 10px;
      top: 80px;
      color: #fff;
      width: 45%;
      display: flex;
      justify-content: flex-end;
      padding-right: 20px;
      /* background-color: red; */
      &__btn {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }
`;
