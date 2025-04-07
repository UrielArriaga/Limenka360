import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const FormNewProdStyle = styled(Dialog)`
  .content_product {
    &__header {
      padding: 10px;
      .title_header {
        font-size: 17px;
        color: ${colors.primaryColorDark};
        font-weight: 500;
      }
    }
    &__body {
      padding: 10px;
      margin-bottom: 10px;
      .form_product {
        .title {
          font-size: 13px;
          color: grey;
        }
        .input_data {
          width: 100%;
          font-size: 14px;
          border-radius: 5px;
          padding: 5px;
          border: 1px solid #d4d4d4;
          outline: none;
        }
        .description {
          resize: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }
      }
    }
    &__footer {
      padding: 10px;
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        .bt_add {
          height: 30px;
          width: 10px;
          color: #fff;
          margin-right: 5px;
          background-color: ${colors.primaryColorDark};
          text-transform: capitalize;
          font-size: 12px;
        }
        .bt_cancel {
          height: 30px;
          width: 10px;
          text-transform: capitalize;
          color: red;
          font-size: 12px;
        }
      }
    }
  }
`;
