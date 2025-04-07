import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const DialogStyled = styled(Dialog)`
  .inputlabel {
    display: flex;
    flex-direction: column;
    label {
      color: rgb(86 86 86);
      font-weight: 600;
      font-size: 14px;
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

    .disabled {
      background-color: #e0e0e0;
    }
  }
`;
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
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    .ContentTitleandAlert {
      font-size: 12px;
      font-weight: bold;
      color: rgb(79, 79, 79);
      display: flex;
      margin-bottom: 4px;
      strong {
        color: red;
      }
    }

    .input_data {
      background-color: hsl(0, 0%, 100%);
      border: 1px solid hsl(0, 0%, 80%);
      border-radius: 4px;
      height: 31px;
      outline: none;
      padding: 5px;
      width: 100%;
      font-size: 15px;
      color: #626262;
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
      color: #fff;
    }
    .btn_add {
      background: #0c203b;
      color: #fff;
      text-transform: capitalize;
    }

    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
`;
