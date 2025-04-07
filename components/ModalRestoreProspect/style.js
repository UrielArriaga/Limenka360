import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { Dialog } from "@material-ui/core";
export const RestoreProspectStyle = styled.div`
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  display: flex;
  justify-content: right;
  .container {
    .button_restore {
      text-transform: capitalize;
      background-color: rgb(144, 238, 144, 0.5);
      font-weight: 500;
      color: green;
      svg {
        color: green;
      }
    }
  }
`;
export const ConfirmRestore = styled(Dialog)`
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #405189;
    padding: 10px;
    margin-bottom: 5px;
    .title_head {
      font-size: 17px;
      color: #fff;
      font-weight: 500;
    }
    .loading {
      color: #fff;
    }
  }
  .body {
    padding: 10px;
    margin-bottom: 10px;
    .text {
      font-weight: 500;
      margin-bottom: 15px;
    }
    .data_prospect {
      .title {
        font-size: 12px;
        color: grey;
      }
      .capitalize {
        text-transform: capitalize;
      }
      .data {
        font-size: 15px;
        font-weight: 500;
      }
    }
  }
  .footer {
    padding: 5px;
    .buttons {
      display: flex;
      justify-content: right;
      .cancel {
        text-transform: capitalize;
        margin-right: 8px;
      }
      .acept {
        text-transform: capitalize;
        color: #fff;
        background-color: #405189;
      }
    }
  }
`;
