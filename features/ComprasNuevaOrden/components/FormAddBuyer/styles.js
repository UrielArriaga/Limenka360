import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
import { Button } from "@material-ui/core";

export const ContainerNew = styled.div`
  width: 100%;
  display: flex;
  background-size: cover;
  height: 250px;
  * {
    margin: 0;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__comeback {
      display: flex;
      align-items: center;
      cursor: pointer;
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
    }
    &__title {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 9px;
      h1 {
        margin-bottom: 8px;
      }
      svg {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: #dce1f6;
        color: #0c203b;
        border-radius: 50%;
      }
    }
  }
  .main {
    height: 310px;
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .ctr_provider {
    width:100%;
    margin-top: 0px;
    margin-bottom: 0px;
    border-radius: 10px;

    .form {
      .subtitles {
        display: flex;
        align-items: center;
        margin-top: 8px;
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
        margin-top: 20px;
        display: flex;
        -webkit-box-pack: end;
        justify-content: end;
        gap: 8px;

        .btnGuardar {
          background: #193364;
          color: white;
          text-transform: capitalize;
          font-size: 12px;
        }
        .cancel {
          text-transform: capitalize;
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

export const AddressContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  width: 24%;
  max-height: 166px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px;
  }
  .directionIndex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleDirectionCount {
      display: flex;
      align-items: center;
      color: rgb(97, 97, 97);
      font-weight: 500;
      font-size: 14px;
      word-wrap: break-word;
      .fire {
        font-size: 12px;
        color: rgb(63, 81, 181);
        font-size: 16px;
      }
    }
  }
  .data {
    color: rgb(97, 97, 97);
    font-weight: 500;
    font-size: 14px;
    word-wrap: break-word;
    strong {
      font-weight: 300;
      font-size: 14px;
      color: #000;
    }
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;
