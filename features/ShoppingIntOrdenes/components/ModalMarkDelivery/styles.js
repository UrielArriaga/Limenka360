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
      /* height: 100%; */
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
          padding: 0;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }

    .listitem {
      display: flex;
      /* justify-content: space-between; */
      padding: 20px 10px;
      /* border-bottom: 1px solid #c7c7c7; */
      /* background-color: rgba(64, 81, 137, 0.15); */
      /* padding-right: 20px; */
      /* padding-left: 20px; */
      border-radius: 4px;
      &:hover {
        background-color: #f5f5f5;
      }
    }

    .containerTable {
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

      max-height: 70vh;
      margin-top: 29px;
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
      .center {
        text-align: center;
      }
    }

    .tablerow {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      padding: 10px;
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
        button {
          margin-right: 10px;

          background-color: #405189;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 5px 10px;
        }

        .iconbuttonaction {
          margin: 0;
          padding: 2px 2px;
        }
      }

      .tableheadproductrow {
        flex: 3;

        .content {
          width: 80%;
        }
      }
      .center {
        text-align: center;
        font-size: 14px;
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
