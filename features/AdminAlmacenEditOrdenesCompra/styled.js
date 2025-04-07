import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const EditOrderStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
  .content_neworder {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .title_header {
        font-size: 20px;
        margin-right: 20px;
        font-weight: 500;
      }
      .bt_back {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
    }
    &__body {
      .divider {
        margin-bottom: 15px;
        margin-top: 15px;
      }
      .head {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .iconEdit {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgb(220, 225, 246);
          color: rgb(16, 60, 130);
          border-radius: 50%;
          margin-left: 5px;
        }
        .title {
          font-size: 18px;
          letter-spacing: 0.04em;
          font-weight: 600;
          color: rgb(86, 86, 86);
        }
      }
      .form {
        .Heads {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 32px;
          .titleProducts {
            font-size: 18px;
            letter-spacing: 0.04em;
            font-weight: 600;
            color: rgb(86, 86, 86);
          }
          .button_restore {
            text-transform: capitalize;
            font-size: 12px;
            border: 1px solid rgb(40, 80, 145);
            color: rgb(40, 80, 145);
          }
        }

        .item {
          .title {
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 5px;
            font-weight: 600;
            letter-spacing: 1px;
            color: rgb(86, 86, 86);
          }

          strong {
            color: red;
          }
          .input_data {
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
            /* Remove spin buttons in WebKit browsers (Chrome, Safari) */
            -webkit-appearance: none;

            /* Remove spin buttons in Firefox */
            -moz-appearance: textfield;
          }
          .input_data::-webkit-inner-spin-button,
          .input_data::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          /* input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          } */

          .select_data {
            font-size: 14px;
          }
          .input_observations {
            font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
              "Open Sans", "Helvetica Neue", sans-serif;
            font-size: 13px;
            padding: 5px;
            outline: none;
            height: fit-content;
            max-height: 100px;
            width: 100%;
            border: 1px solid #d4d4d4;
            resize: none;
          }
        }
        .products {
          .input_products {
            color: transparent;
            border: none;
            outline: none;
            width: 0px;
            height: 0px;
          }
          .message {
            height: 10px;
            display: flex;
            align-items: center;
            color: red;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 10px;
            svg {
              margin-right: 5px;
              font-size: 18px;
            }
          }
        }
        .buttons {
          display: flex;
          flex-direction: row-reverse;
          margin-top: 2%;
          gap: 9px;

          .bt_save {
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            background-color: #0c203b;
          }
          .bt_conclude {
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            background-color: #0c203b;
          }
          .bt_cancel {
            text-transform: capitalize;

            border: 1px solid rgb(40, 80, 145);
            color: rgb(40, 80, 145);
          }
        }
      }
    }
  }
`;

export const AlertProviderStyle = styled(Dialog)`
  .content_alert {
    padding: 10px;
    .title_alert {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: 500;
      margin-bottom: 10px;
      svg {
        margin-right: 10px;
        color: red;
        font-size: 25px;
      }
    }
    .buttons {
      display: flex;
      flex-direction: row-reverse;
      width: 100%;
      .bt {
        text-transform: capitalize;
        font-size: 12px;
        margin: 5px;
      }
      .accept {
        background-color: ${colors.primaryColorDark};
        color: #fff;
      }
      .cancel {
        border: 1px solid #d4d4d4;
      }
    }
  }
`;

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 30,
    minHeight: 30,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
};
