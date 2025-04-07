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
      text-transform: capitalize;
      border-radius: 8px;
      background: rgba(255, 255, 255, 0.1);
      color: #fff;
    }
  }

  .body {
    padding: 10px;
    height: 100%;
    .warnning {
      color: #f3bb1b;
    }

    .listorders {
      padding-top: 20px;
      /* background-color: red; */
      height: 100%;
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

  .crearnueva {
    position: absolute;
    /* bottom: -100px; */
    right: 10px;
    top: 80px;
    color: #fff;
    /* background-color: red; */
  }
`;
