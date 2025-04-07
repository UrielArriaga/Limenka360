import styled from "styled-components";
import { device } from "../../../styles/global.styles";

export const TemplatesStyled = styled.div`
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
    .head {
      padding: 15px 10px;
      display: flex;
      align-items: center;
      h1 {
        color: #fff;
      }

      &__title {
        display: flex;
        align-items: center;

        svg {
          font-size: 30px;
          color: #fff;
          border: 1px solid #fff;
          margin-left: 20px;
          border-radius: 50%;
        }
      }
    }
    .main_prospects {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      background-color: rgba(255, 255, 255, 0.85);

      .MuiSnackbarContent-root {
        color: #fff;
        display: flex;
        padding: 6px 16px;
        flex-grow: 1;
        flex-wrap: wrap;
        font-size: 0.875rem;
        align-items: center;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        font-weight: 400;
        line-height: 1.43;
        border-radius: 4px;
        letter-spacing: 0.01071em;
        background-color: #f44336;
      }

      .MuiPaper-elevation6 {
        box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%),
          0px 1px 18px 0px rgb(0 0 0 / 12%);
        background-color: #f44336;
      }
      .MuiSnackbar-anchorOriginTopRight {
        top: 94px;
        left: auto;
        right: 24px;
      }
    }
  }
  .form {
    .ContentTitleandAlert {
      display: flex;
    }

    .item {
      display: flex;
      align-content: center;
      flex-direction: column;
      font-size: 15px;
      width: auto;
      padding: 2px 9px;

      .input {
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
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        min-height: 38px;
      }
      .textarea {
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
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        min-height: 398px;
        resize: none;
      }
      .inputComments {
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
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        height: 25px;
      }
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }

      p {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }
      strong {
        color: red;
      }
    }
    .buttons {
      margin-top: 20px;
      display: flex;
      justify-content: end;
    }
    .btnsalir {
      margin-right: 15px;
    }
    .point {
      width: 0;
      height: 0;
      border-top: 13px solid transparent;
      border-bottom: 13px solid transparent;
      border-right: 13px solid rgba(241, 113, 113, 0.9);
      height: 27px;
      float: left;
    }
  }
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
