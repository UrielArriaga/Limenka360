import styled from "styled-components";

export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .title {
    font-size: 18px;
    margin-bottom: 15px;
    font-weight: bold;
    background: #0c203b;
    padding: 10px 20px;
    color: #fff;
    letter-spacing: 0.05em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__loader {
      color: #fff;
    }
  }
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
  .ctr_inputs {
    padding: 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      resize: none;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .capitalize {
      text-transform: capitalize;
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
    .disabled {
      background-color: grey;
      &:hover {
        background-color: grey;
        color: #fff;
        cursor: none;
      }
    }
  }

  .ctr_tracking {
    padding: 20px;
    width: 100%;
    label {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      /* color: #eaeaea; */
      letter-spacing: 0.03em;
      .icon {
        font-size: 16px;
        margin-right: 5px;
        color: #405189;
      }
    }
    .paraghap {
      font-size: 16px;
      font-weight: bold;
      color: #000;
    }
    .capitalize {
      text-transform: capitalize;
    }
  }
`;
