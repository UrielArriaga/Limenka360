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
  }
  h5 {
    padding: 10px 20px;
  }
  .ctr_inputs {
    padding: 0 20px 40px 50px;
    &__label {
      font-size: 12px;
      font-weight: bold;
    }
    &__input {
      width: 250px;
      /* padding: 5px 0; */
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
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
      font-size: 12px;
      padding: 4px;
    }
    .btn_upload {
      font-size: 12px;
      padding: 4px;
      text-transform: capitalize;
      background: #0c203b;
    }
  }
`;
