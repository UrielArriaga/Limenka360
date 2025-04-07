import { Dialog } from "@material-ui/core";
import styled from "styled-components";
export const AddFilesStyled = styled(Dialog)`
  .container {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: sticky;
      top: 0;
      z-index: 1;
      margin-bottom: 15px;
      font-weight: bold;
      background: #0c203b;
      padding: 10px 20px;
      .title {
        font-size: 18px;
        color: #fff;
      }
      .progress {
        color: #fff;
      }
    }
    &__body {
      padding: 15px;
      margin-bottom: 15px;
      .form_file {
        .title {
          font-size: 14px;
          color: grey;
        }
        .input_data {
          background-color: hsl(0, 0%, 100%);
          border: 1px solid hsl(0, 0%, 80%);
          border-radius: 4px;
          height: 38px;
          outline: none;
          padding: 5px;
          width: 100%;
          font-size: 15px;
        }
        .select_data {
          font-size: 14px;
        }
        .title_hidden {
          color: transparent;
          cursor: default;
        }
        .buttonFile {
          background-color: #3f51b5;
          color: #fff;
          text-transform: capitalize;
        }
        .style_viewFile {
          padding: 10px;
          margin-top: 20px;
          display: flex;
          align-items: center;
          .iconData {
            margin-right: 10px;
            font-size: 30px;
          }
          .pdf_icon {
            color: red;
          }
          .word_icon {
            background-color: #285091;
            border-radius: 5px;
            color: #fff;
            padding: 2px;
            font-size: 25px;
          }
          .xlsx_icon {
            background-color: green;
            border-radius: 5px;
            color: #fff;
            padding: 2px;
            font-size: 25px;
          }
          .data_file {
            .title {
              color: black;
              font-size: 14px;
              text-decoration: underline;
            }
          }
        }
      }
    }
    &__footer {
      margin-top: 70px;
      display: flex;
      flex-direction: row-reverse;
      padding: 15px;
      .button_save {
        background-color: #0c203b;
        color: #fff;
        text-transform: capitalize;
      }
      .button_cancel {
        background-color: #0d0d0d;
        color: #fff;
        margin-right: 10px;
        text-transform: capitalize;
      }
    }
  }
`;

export const ErrorForm = styled.span`
  color: red;
  margin-left: 10px;
  font-weight: 500;
  font-size: 12px;
`;
