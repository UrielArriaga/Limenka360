import { Dialog, Drawer } from "@material-ui/core";
import styled, { keyframes } from "styled-components";

export const PreviewBudgetsStyled = styled.div`
  .content_title {
    display: flex;
    justify-content: space-between;
  }
  .close {
    display: flex;
    color: red;
    cursor: pointer;
  }
  .headerpreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    background: white;
    .concept {
      font-weight: bold;
      text-transform: capitalize;
    }
    .button_edit {
      text-transform: capitalize;
      color: white;
      padding: 7px;
      border: none;
      border-radius: 8px;
      font-weight: bold;
      border: 1px solid #407aff;
      cursor: pointer;
      color: #407aff;
      background: white;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;

      &--item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        color: #616161;

        .icon {
          font-size: 15px;
        }

        .text {
          margin-left: 5px;
          font-size: 13px;
        }

        .button {
          background-color: #039be5;
          color: #ffffff;
          border: 1px solid #ccc;
          border-radius: 5px;

          font-size: 13px;
        }
      }
    }
  }
  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 313px);
    overflow: auto;
    margin-top: 13px;

    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
    .title {
      font-weight: bold;

      letter-spacing: 0.03em;
      cursor: pointer;
      margin-top: 12px;
      margin-bottom: 14px;
      display: flex;

      align-items: center;
      margin-bottom: 13px;
      margin-top: 21px;
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220, 225, 246);
        color: rgb(12, 32, 59);
        border-radius: 50%;
      }
      .na {
        color: #757575;
        font-weight: 700;
        font-size: 12px;
      }
    }
    &__products {
      margin-top: 33px;
      margin-bottom: 59px;
      .titleProducts {
        margin-bottom: 14px;
      }
      .refresh {
        display: flex;
        align-items: end;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }

        tbody {
          tr {
            border-bottom: 2px solid #e0e0e0;
            td {
              padding: 4px 0px 0px 9px;
              text-align: left;
              color: #616161;
              font-weight: bold;
              height: 60px;
            }
            .iconEdit {
              color: #103c82;
              cursor: pointer;
            }
            .iconDelete {
              color: #103c82;
              cursor: pointer;
            }
            .icons {
              display: flex;
              align-items: center;
            }
          }
        }

        .load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__img {
            width: 150px;
            animation: slide 3s infinite;

            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }

      .icnButton {
        background-color: #405189;
        padding: 2px;

        .icon {
          color: #fff;
        }
      }
    }
    &__Actions {
      display: flex;
      justify-content: end;
      margin-top: 12px;
      .add {
        background: #405189;
        color: white;
        font-size: 13px;
        border-radius: 8px;
      }
    }
  }
`;
export const ContainerProduct = styled(Drawer)`
  p {
    margin: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 100%;
    background: #f3f3f3;
    min-height: 100vh;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__title {
      font-size: 15px;
      font-weight: 500;
      letter-spacing: 0.03em;
      display: flex;
      align-items: center;
      justify-content: space-around;
    }

    &__close {
      cursor: pointer;
      color: red;
    }
  }

  .ctr_inputs {
    padding: 1px 20px 25px 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
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
    &__input {
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
      -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      min-height: 38px;
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    &__textarea {
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
      min-height: 38px;
      outline: none;
      resize: none;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
        "Helvetica Neue", sans-serif;
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
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide_img {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .ctr_add {
    .autosuggest-container {
      position: relative;
      outline: none;
    }

    .autosuggest-input {
      width: 100%;
      border: 1px solid #ced4da;
      border-bottom: none;
      border-radius: 4px;
      padding: 8px;
      box-sizing: border-box;
      box-shadow: none;
    }

    .autosuggest-suggestions {
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: white;
      max-height: 150px;
      overflow-y: auto;
      position: absolute;
      width: 100%;
      z-index: 1;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      transition: max-height 0.2s ease-in-out;
    }

    .autosuggest-suggestion {
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }

    .autosuggest-suggestion:hover {
      background-color: #f0f0f0;
    }

    .autosuggest-input.error {
      border-color: red;
    }

    .autosuggest-suggestion.error {
      color: red;
    }

    &__header {
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 20px;
      height: 60px;
      background-color: #103c82;

      &__close {
        display: flex;
        align-items: center;
        .title {
          font-weight: bold;
          color: #fff;
          font-size: 20px;
        }
        .close {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          margin-right: 10px;
          cursor: pointer;
        }
      }
      .btn_save {
        text-transform: capitalize;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
      }
    }
    &__ctr_info {
      width: 100%;
      max-width: 1300px;
      margin: auto;
      padding: 20px;
      background: #fff;
      margin-top: 20px;
      margin-bottom: 20px;
      height: calc(100% - 100px);
      border-radius: 8px;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      &__title {
        display: flex;
        align-items: center;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 20px;

        svg {
          margin-right: 10px;
          width: 30px;
          height: 30px;
          padding: 5px;
          border-radius: 50%;
          background: rgba(16, 60, 130, 0.5);
          color: #fff;
        }
        span {
          font-weight: bold;
          color: #103c82;
          text-transform: capitalize;
          margin-left: 5px;
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
          padding: 5px 9px;

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
            height: 38px;
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
            height: 38px;
            outline: none;
            resize: vertical;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
          }
          .capitalize {
            text-transform: capitalize;
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
        .subtitles {
          display: flex;
          align-items: center;
          margin-top: 12px;
          margin-left: 8px;
          .icon {
            width: 30px;
            height: 30px;
            padding: 5px;
            background: rgb(220, 225, 246);
            color: rgb(16, 60, 130);
            border-radius: 50%;
            margin-right: 6px;
          }
          .titleDirection {
            font-weight: 600;
            color: #565661;
          }
        }
        .cardsDirection {
          display: flex;
          gap: 8px;
          margin-top: 12px;

          .deleteIcon {
            cursor: pointer;
            color: #ac5555;
          }
        }
        .MoreDirection {
          display: flex;
          .actionDirection {
            text-transform: capitalize;
            /* background: rgb(25 51 100); */
            color: rgb(25 51 100);
            font-size: 13px;
            border-radius: 10px;
            font-weight: 700;
            margin: 20px 10px;
            border: 1px solid #193364;
          }
        }
        .ctr_buttons {
          display: flex;
          justify-content: end;
          margin-top: 20px;

          .btn_cancel {
            background: #0c203b;
            color: #fff;
            text-transform: capitalize;
            margin-right: 10px;
          }
          .btn_upload {
            background: #103c82;
            color: #fff;
            text-transform: capitalize;
          }
          .btn_disabled {
            background: #9e9e9e;
            color: #fff;
            text-transform: capitalize;
            margin-right: 10px;
          }
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
    }
  }
  .ctr_buttons {
    display: flex;
    justify-content: end;
    .btn_add {
      background: #103c82;
      color: #fff;
      text-transform: capitalize;
    }
    .btn_cancel {
      background: #0c203b;
      color: #fff;
      text-transform: capitalize;
      margin-right: 10px;
    }
  }
`;

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
  .titleLoader {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
        &__input {
          padding: 10px 23px 9px 8px;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
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
