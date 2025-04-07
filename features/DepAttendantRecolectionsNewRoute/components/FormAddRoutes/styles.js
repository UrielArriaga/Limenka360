import styled from "styled-components";
import { device } from "../../../../styles/global.styles";

export const FormStyles = styled.div`
  width: 100%;
  display: flex;
  background-size: cover;
  * {
    margin: 0;
  }
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    h4 {
      font-size: 20px;
      font-weight: bold;
    }

    .actions {
      display: flex;

      &__item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        color: #616161;

        .icon {
          font-size: 15px;
        }

        .text {
          font-size: 13px;
          margin-left: 5px;
        }

        .button {
          background-color: #039be5;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .buttondisabled {
          background-color: #ccc;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }
  .main {
    /* height: calc(70vh - 60px); */
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .container {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    /* padding: 25px 20px; */
    background: #fff;
    border-radius: 10px;
    /* box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px; */

    .form {
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
      .item {
        display: flex;
        align-content: center;
        flex-direction: column;
        font-size: 15px;
        width: auto;
        padding: 5px 9px;
        p {
          span {
            color: #ac5555;
          }
        }

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
          min-height: 38px;
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
        .ContentTitleandAlert {
          display: flex;
        }
      }

      .notFound {
        margin-left: 12px;
        /* margin-top: 12px; */
        font-weight: 600;
        color: #565661;
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

      .direction {
        margin-top: 16px;
        margin-bottom: 1px;
        color: rgb(86 86 86);
        font-weight: 600;
      }

      .actions {
        margin-top: 100px;
        display: flex;
        -webkit-box-pack: end;
        justify-content: end;
        gap: 8px;

        .btnGuardar {
          background: #193364;
          color: white;
          text-transform: capitalize;
          background: #0c203b;
        }
        .cancel {
          border: 1px solid rgb(25 51 100);
          padding: 5px 15px;
          color: #193364;
        }
      }

      .buttons {
        margin-top: 100px;
        display: flex;
        justify-content: end;
      }
      .btnsalir {
        margin-right: 15px;
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
      .refresh {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 35px;
        cursor: pointer;
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
