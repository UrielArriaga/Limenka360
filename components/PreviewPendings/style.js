import { Card } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const PendingsStyle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  /* overflow-y: auto; */
  height: 100%;
  padding: 10px;
  /* ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #0c203b;
    } */
  .card_style {
    width: 100%;
    padding: 5px;
    border: 1px solid #c0c0c0;
    border-radius: 8px;
    border-left: 4px solid ${colors.primaryColorDark};
    margin-bottom: 20px;
    .location {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      .icon {
        color: ${colors.primaryColorDark};
        font-size: 18px;
      }
    }
    .date {
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: 500;
      text-transform: capitalize;
      .icon {
        color: ${colors.primaryColorDark};
        font-size: 18px;
      }
    }
    .title {
      font-size: 12px;
      color: grey;
    }
    .data {
      font-size: 14px;
      font-weight: 500;
      display: flex;
      align-items: center;
      .visit {
        color: #03cd71;
      }
      .date {
        color: #fba92b;
      }
      .call {
        color: #9e9e9e;
      }
      .remember {
        color: #6682f2;
      }
      .task {
        color: #b247e3;
      }
      .icon {
        font-size: 17px;
        margin-right: 3px;
      }
    }
    .observations {
      width: 100%;
      border: 1px solid #e8e8e8;
      border-radius: 8px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
      resize: vertical;
      outline: none;
      cursor: default;
    }
    .button_complete {
      width: 100%;
      text-transform: capitalize;
      padding: 1px;
      font-size: 12px;
      background-color: ${colors.primaryColorDark};
      color: #fff;
      font-weight: 500;
    }
    .status {
      color: red;
    }
  }
`;
