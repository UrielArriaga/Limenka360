import styled from "styled-components";
import { Dialog } from "@material-ui/core";
export const DeleteStyled = styled(Dialog)`
  .container {
    &__head {
      background-color: #405189;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-size: 17px;
        color: #fff;
        font-weight: 500;
      }
      .progress_loader {
        color: #fff;
      }
    }
    &__body {
      margin-bottom: 15px;
      .alert_title {
        padding: 10px;
        font-size: 17px;
      }
      .file_info {
        display: flex;
        flex-direction: column;
        padding: 10px;
        font-size: 14px;
        color: grey;
        .data {
          font-weight: 500;
          font-size: 16px;
          color: black;
        }
      }
    }
    &__footer {
      display: flex;
      flex-direction: row-reverse;
      padding: 5px;
      .accept_button {
        background-color: #405189;
        color: #fff;
        text-transform: capitalize;
      }
      .cancel_button {
        background-color: red;
        color: #fff;
        text-transform: capitalize;
        margin-right: 5px;
      }
    }
  }
`;
