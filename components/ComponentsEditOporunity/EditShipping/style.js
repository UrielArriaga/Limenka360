import styled from "styled-components";
import { Dialog } from "@material-ui/core";
export const EditStyle = styled(Dialog)`
  .container {
    padding: 10px;
    .header {
      display: flex;
      align-items: center;
      margin: -10px -10px 10px -10px;
      padding: 5px;
      justify-content: space-between;
      background-color: #0f3c81;
      .title {
        color: #fff;
        font-weight: 500;
      }
      .button {
        width: 26px;
        height: 26px;
        .icon {
          font-size: 20px;
          color: red;
        }
      }
    }
    .body {
      padding: 5px;
      margin-bottom: 10px;
      .options {
        height: 100%;
        display: flex;
        align-items: flex-end;
      }
      .inputlabel {
        display: flex;
        flex-direction: column;
        .title {
          color: rgb(86 86 86);
          font-weight: 600;
          font-size: 14px;
          .alert {
            color: red;
          }
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
        .textarea {
          resize: vertical;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
          padding: 5px;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #d3d3d3;
          outline: none;
          font-size: 13px;
          resize: none;
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
        /* color: #0f3c81; */
      }
    }
    .footer {
      display: flex;
      justify-content: flex-end;
      .btStyle {
        font-size: 13px;
        text-transform: capitalize;
      }
      .confirmBt {
        color: #fff;
        background-color: #0f3c81;
      }
      .cancelBt {
        margin-right: 10px;
        border: 1px solid red;
        color: red;
      }
    }
  }
`;
