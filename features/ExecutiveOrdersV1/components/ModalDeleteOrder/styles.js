import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const DialogContainer = styled(Dialog)`
  .MuiDialog-paper {
    background: #fdfcfb !important;
    width: 500px;
    max-width: 95vw;
    border-radius: 8px;
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .title {
    display: flex;
    align-items: center;
    padding: 18px 25px;
    background-color: #9a0f11;
    color: #fff;
    font-size: 22px;
    font-weight: 600;
    margin-bottom: 0;
    position: sticky;
    top: 0;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    justify-content: space-between;
    z-index: 1;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  }

  .containerBody {
    padding: 25px;
    margin-top: 0;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .MuiDialogContent-root:first-child {
    padding-top: 0px !important;
  }

  label {
    font-weight: 600;
    font-size: 14px;
    margin-bottom: 8px;
    color: #333;
    display: block;
  }

  .titleLoader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .DialogText {
    margin-top: 15px;
    margin-bottom: 10px;
    line-height: 1.6;
    color: #555;
  }

  .dialogContainer {
    &__item {
      margin-top: 25px;
      &:first-of-type {
        margin-top: 0;
      }

      &__header {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        &__icon {
          color: #7f8c8d;
          margin-right: 6px;
          font-size: 16px;
        }

        &__title {
          font-size: 15px;
          color: #1d3967;
          font-weight: 600;
        }

        &__titleAlert {
          font-size: 14px;
          color: #e74c3c;
          font-weight: 600;
        }
      }

      &__content {
        font-weight: 500;
        color: #333;
        font-size: 15px;
        line-height: 1.6;
      }

      &__contentAccept {
        font-weight: 500;
        font-size: 15px;
        margin-top: 10px;
        color: #333;
      }

      &__select {
        font-weight: 500;
        color: #333;
        font-size: 15px;
        margin-top: 20px;
      }

      &__select__value-container {
        height: 38px;
        padding: 0 12px;
      }

      &__textArea {
        width: 100%;
        resize: vertical;
        outline: none;
        border-radius: 5px;
        margin-top: 8px;
        padding: 10px 12px;
        min-height: 100px;
        font-family: inherit;
        font-size: 14px;
        border: 1px solid #cdcdcd;
        transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

        &:focus {
          border-color: #9a0f11;
          box-shadow: 0 0 0 2px rgba(154, 15, 15, 0.2);
        }
      }
    }
  }

  .MuiDialogActions-root {
    padding: 15px 25px;
    background: #f0f0f0;
    border-top: 1px solid #eee;

    button {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      text-transform: capitalize;
      min-width: 100px;
    }

    .cancel {
      background-color: #fff;
      color: #193364;
      border: 1px solid #193364;

      &:hover {
        background-color: rgba(25, 51, 100, 0.05);
        color: #193364;
      }
    }

    .acept {
      background-color: #9a0f11;
      color: #fff;
      border: 1px solid #9a0f11;
      margin-left: 15px;

      &:hover {
        background-color: #7c0101;
        border-color: #7c0101;
      }
    }
  }

  .descarted_input {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    color: #888;
    padding: 10px 12px;
    width: 100%;
    height: 40px;
    border-radius: 5px;
    font-size: 14px;
    line-height: 1.5;
    pointer-events: none;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .dialogContainer__item__header__input {
    padding: 10px 12px;
    background-color: #fff;
    border: 1px solid #cdcdcd;
    border-radius: 5px;
    display: block;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.5;
    width: 100%;
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: #9a0f11;
      box-shadow: 0 0 0 2px rgba(154, 15, 15, 0.2);
    }
  }
`;
