import styled from "styled-components";
import { device } from "../../../../styles/global.styles";

import { Dialog, DialogContent, DialogTitle } from "@material-ui/core";

export const ModalExportFileStyles = styled(Dialog)`
  & .MuiDialog-paper {
    background-color: #f8f9fa;
    border-radius: 12px;
    max-width: 500px;
    width: 500px;
    height: 200px;

    margin: 0 auto;
  }
  .label{
    color: #616161;
  }

  .title {
    display: flex;
    background-color: #034d6f;
    color: white;
    align-items: center;
    padding: 10px;
    font-size: 20px;
    font-weight: 500;

    &__icon {
      color: #1ba345;

      margin-right: 10px;

      font-size: 25px;
    }

    &__loader {
      color: #fff;
    }
  }

  .articles {
    padding: 10px;
    min-height: 120px;

    overflow: auto;

    .headertable {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      font-weight: bold;
      font-size: 12px;
      background-color: #c2e5f7;
      
      div {
        padding: 5px;
        border-bottom: 1px solid #616161;
      }
    }

    .headerbody {
      .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        font-size: 12px;
        div {
          padding: 5px;
          border-bottom: 1px solid #616161;
        }
      }
    }

    ul {
      margin-top: 10px;
      list-style-type: circle;
      li {
        margin: 10px 0;
        font-size: 11px;
        border-radius: 8px;

        transition: transform 0.2s ease-in-out, background-color 0.2s;
      }
    }
  }

  .body {
    padding: 10px;

    .body__item {
      margin-top: 10px;
      .label {
        font-size: 15px;
        color: #616161;
        margin-bottom: 5px;
      }

      textarea {
        width: 100%;
        height: 50px;
        border: 1px solid #616161;
        border-radius: 4px;
        padding: 5px;
        outline: none;
        font-size: 14px;
      }
    }

    .body__resume {
      .row {
        display: flex;
        align-items: center;
      }
      p {
        font-size: 15px;
        color: #616161;
        margin-top: 10px;
        margin-right: 10px;
      }
    }
  }

  /* .description {
    font-size: 15px;
    padding: 10px;
    color: grey;

    span {
      font-weight: bold;
      color: black;
    }
  }

  .inputsDate {
    display: flex;

    padding: 12px;
    .formDate {
      display: flex;
      flex-direction: column;
      margin-left: 10px;

      p {
        font-size: 15px;
        margin-bottom: 5px;
        color: #616161;
      }
      .date {
        height: 30px;
        width: 270px;
        background-color: hsl(0, 0%, 100%);
        border: 1px solid hsl(0, 0%, 80%);
        border-radius: 4px;
        font-size: 14px;
        outline: none;
        padding: 5px;
        cursor: pointer;
        color: #616161;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
  } */

  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    margin-top: 20px;

    &__cancel {
      color: #fff;
      text-transform: capitalize;

      color: brown;
      border-radius: 2px solid;
      font-size: 14px;

      margin-right: 11px;
      cursor: pointer;
      border: 1px solid brown;
    }
    &__acept {
      background-color: #fff;
      border: 1px solid #039be5;
      color: #ffff;
      background-color: #039be5;
      text-transform: capitalize;
    }
  }

  .previewFile{
    max-width: 100%;
    overflow-y: auto;
  }
`;

const StyledDialogTitle = styled(DialogTitle)`
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-align: center;
`;

const StyledDialogContent = styled(DialogContent)`
  padding: 20px;
  font-size: 1rem;
  color: #555;
  text-align: justify;
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: red;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  margin-left: 5px;
  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
