import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";
export const ModalStyled = styled(Drawer)`
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

  .containermodal {
    overflow-y: hidden;
    width: 60vw;
    .button-close {
      background-color: #103c82;
      color: white;
      padding: 5px;
      border-radius: 4px;
      border: 1px solid white;
      cursor: pointer;
      transition: .2s linear;
      :hover {
        background-color: #145dd1;
            }

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
    .title {
      font-weight: bold;
      color: #fff;
      font-size: 20px;
    }

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
    padding: 20px 10px;
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

  .bodymodal {
    padding: 20px;
  }

  .containertable {
    margin-bottom: 20px;
    overflow-y: auto;
    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
    max-height: 80vh;
    margin-top: 29px;
    /* padding: 20px; */

    &__products {
      .tablebody {
        .stocksavailables {
          padding: 8px;
        }
        h4 {
          margin-bottom: 5px;
        }
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;
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

        .checkboxhead {
          flex: 0.2;
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

        .tablecellcheckbox {
          flex: 0.2;
          input {
            cursor: pointer;
          }
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
  }
`;
