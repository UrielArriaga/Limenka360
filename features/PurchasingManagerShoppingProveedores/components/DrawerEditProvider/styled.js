import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
import { Drawer } from "@material-ui/core";

export const DialogFullScreen = styled(Drawer)`
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
  .ctr_edit {
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
`;

export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

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
