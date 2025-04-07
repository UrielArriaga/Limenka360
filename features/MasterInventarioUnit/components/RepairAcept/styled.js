import styled from "styled-components";

export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  .headerDialog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0c203b;
    margin-bottom: 15px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.05em;
    }
    &__loader {
      color: #fff;
    }
  }
  .ctr_body {
    padding: 0 20px 20px 20px;
    width: 409px;
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
      color: #fff;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
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
