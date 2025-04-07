import styled from "styled-components";
import { Drawer } from "@material-ui/core";
export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  .containerTitle {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;

    letter-spacing: 0.05em;
    svg {
      cursor: pointer;
    }
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    .alertRequired {
      display: flex;
      align-items: center;
      p {
        font-size: 12px;
        font-weight: bold;
        color: #b10c0c;
      }
    }
    &__label {
      font-size: 12px;
      font-weight: bold;
      color: #4f4f4f;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      min-height: 36px;
      resize: none;
      padding: 0px 5px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    &__inputFolio {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      min-height: 36px;
      resize: none;
      padding: 0px 5px 0px 66px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
    .folio {
      display: flex;
      align-items: baseline;
      .folioUser {
        position: absolute;
        transition: all 500ms ease;
        font-size: 16px;

        margin-top: 5px;
      }
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
    }
  }
  .ctr_slope {
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      span {
        color: #0c203b;
      }
    }
    &__item {
      width: 100%;
      .label {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 0.02em;
        color: #626262;
        svg {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 5px;
          color: #115293;
        }
      }
      .text {
        color: #000;
        font-weight: 600;
      }
      .span {
        color: #c7c7c7;
        font-size: 14px;
        font-weight: 500;
      }
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .btn_close {
        text-transform: capitalize;
        background-color: #000;
        color: #fff;
        margin-right: 10px;
      }
      .btn_complete {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }
`;
