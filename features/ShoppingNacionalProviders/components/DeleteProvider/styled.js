import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const DialogContainer = styled(Dialog)`
  * {
    margin: 0;
    padding: 0;
  }
  .MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
  label {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #405189;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
  }
  .containerBody {
    padding: 0px 20px 0px 20px;
    margin-top: 20px;
  }
  .DialogText {
    margin-top: 14px;
    margin-bottom: 0;
  }
  .dialogContainer {
    height: auto;
    transition: 0.2s;
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 20px;
      }
      &__select__value-container {
        height: 15px;
      }
      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
  }
  .addHeight {
    margin-bottom: 30vh;
  }
  .buttons {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 17px;
    .cancel {
      color: #fff;
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 14px;
      border-radius: 10px;
      background: white;
      margin-right: 11px;
      cursor: pointer;
    }
    .acept {
      text-transform: capitalize;
      border: 2px solid;

      font-size: 14px;
      border-radius: 10px;
      color: #fff;

      background-color: #103c82;

      &:hover {
        text-transform: capitalize;
        border: 2px solid #103c82;
        color: #103c82;
        font-size: 14px;
        border-radius: 10px;
        background: white;
        cursor: pointer;
      }
    }
  }
  .descarted_input {
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
    height: 40px;
    border: 2px solid #f3f3f3;
    color: #000;
    &:focus {
      outline: none;
      border: 2px solid #405189;
    }
  }
`;
