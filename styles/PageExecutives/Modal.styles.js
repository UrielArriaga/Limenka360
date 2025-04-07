import { Dialog } from "@material-ui/core";
import styled from "styled-components";

export const ModalEdit = styled(Dialog)`
  .modal-body {
    .container-input {
      margin-top: 1em;
      .symbol {
        position: absolute;
        margin-left: 1px;
        margin-top: 5px;
      }
      .input_symbol {
        padding-left: 18px;
      }
    }
    padding: 2em;
    .container-buttons {
      display: flex;
      justify-content: end;
      padding: 1em 0;

      .btnGuardar {
        margin: 0 15px;
      }
      .btnDelete {
        margin: 0 15px;

        background-color: #990000;
      }
      .disabled {
        background: grey;
        color: #fff;
        &:hover {
          cursor: default;
        }
      }
    }

    .ctr_inputs {
      padding: 0 20px 20px 20px;
      &__label {
        font-size: 12px;
        font-weight: bold;
        color: #4f4f4f;
        display: flex;
        span {
          color: red;
        }
        &_checkbox {
          margin-left: 10px;
          display: flex;
          color: blue;
          .checkbox {
            display: flex;
            align-items: center;
            text-align: center;
            width: 9px;
            margin: 0 2px;

            :checked + label:before {
              background-color: blue;
              border: 1px solid blue;
              text-align: center;
            }
          }
        }
      }
      &__span {
        font-size: 10px;
        font-weight: bold;
        color: #990000;
      }
      &__input {
        width: 100%;
        border: none;
        border-bottom: 1.5px solid #ccc;
        transition: all 0.3s ease;
        font-size: 16px;
        min-height: 36px;
        resize: none;
        padding: 5px 5px;
        background-color: #fff;
        &:focus {
          outline: none;
          border: none;
          transition: all 0.3s ease;
          border-bottom: 1.5px solid #0d0d0d;
        }
        &__adornment {
          position: absolute;
          top: 8px;
          left: 12px;
          &-text {
            color: #5d5d5d;
          }
          &-placeholder {
            margin-left: 5px;
            color: #bdbdbd;
          }
        }
      }

      &__span_error {
        font-weight: bold;
        font-size: 10px;
        color: #f50;
      }
    }
    .error {
      border-bottom: 1.5px solid red;
      &:focus {
        border-bottom: 1.5px solid red;
      }
    }
  }

  .textfield {
    position: relative;
    &__textarea {
      box-shadow: 0 0 7px 0 gray;
      &:focus {
        outline: none;
        box-shadow: 0 0 7px 0 red;
        + .textfield__adornment {
          display: none;
        }
      }
    }
    &__input {
      display: flex;
      align-items: center;
      &-field {
        width: 100%;
        border: none;
        border-bottom: 1.5px solid #ccc;
        transition: all 0.3s ease;
        font-size: 16px;
        min-height: 36px;
        resize: none;
        padding: 5px 5px;
        background-color: #fff;
        &:focus {
          outline: none;
          border: none;
          transition: all 0.3s ease;
          border-bottom: 1.5px solid #0d0d0d;
        }
      }
    }
    &__adornment {
      position: absolute;
      top: 8px;
      left: 12px;
      &-text {
        color: #5d5d5d;
      }
      &-placeholder {
        margin-left: 5px;
        color: #bdbdbd;
      }
    }
  }
`;
