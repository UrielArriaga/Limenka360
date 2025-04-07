import { Dialog } from "@material-ui/core";
import styled, { keyframes } from "styled-components";

export const PreviewOrderStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  z-index: 3;
  position: relative;

  .headerpreview {
    position: sticky;
    top: 0;
    background: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    z-index: 1000;

    .concept {
      font-weight: bold;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;
      gap: 10px;

      &--item {
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
          /* border: 1px solid #ccc; */
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

  .executivedata {
  }
  .logisticStatus {
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    max-height: calc(100vh - 268px);
    overflow: auto;
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

    .headerinstructions {
      border: 1px solid #ccc;
      padding: 20px 10px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;

      .icon {
        font-size: 20px;
        margin-right: 10px;
        color: #039be5;
      }

      .guide {
        font-size: 14px;
        font-weight: bold;
      }

      .guidedescription {
        font-size: 12px;
        color: #757575;
        margin-left: 10px;
      }
    }

    .content_day,
    .content_daypast {
    display: inline-block;
    min-width: 80px;
    text-align: center;
    border-radius: 5px;
    font-size: 12px;
    padding: 5px 10px;
    margin: 2px 0;
   }

   .content_day {
    background: #ff4444;
    color: white;
   }

   .content_daypast {
    background: #4CAF50;
    color: white;
 }

    .rowprev {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__customer {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__address {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      &--item {
        display: flex;
        color: #757575;
        margin-bottom: 4px;
        font-size: 13px;

        .hightligth {
          margin-left: 10px;
        }
      }
    }

    &__containerTable {
      overflow: auto;
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      border-radius: 9px;
      max-height: 70vh;
      .OrderAdd {
        background-color: #405189;
        padding: 1px 0px 0px 13px;
        display: flex;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 10;
        .ButtonAdd {
          background: white;
          margin: 7px 0px 0px 13px;
          color: #405189;
          font-size: 11px;
        }
        .cancel {
          background: white;
          margin: 7px 0px 0px 13px;
          color: #b31c1c;
          font-size: 11px;
        }
        .totalSelected {
          margin-left: 7px;
          color: white;
        }
      }
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        .row-different-role {
          background-color: #f5f5f5;
          color: #b0b0b0;
          cursor: not-allowed;
        }

        .header-active {
          position: sticky;
          top: 40px;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }
        .header-inactive {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }

        tbody {
          tr {
            border-bottom: 2px solid #e0e0e0;
            td {
              padding: 4px 0px 0px 9px;
              text-align: left;
              color: #616161;
              font-weight: bold;
              height: 60px;
            }

            .tdutility {
              text-align: center;
            }

            .normal {
              font-weight: normal;
            }
            .bajo {
              color: #e53935;
            }
            .alto {
              color: #08933f;
            }
          }
        }

        .load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;

          &__img {
            width: 150px;
            animation: slide 3s infinite;

            img {
              width: 100%;
              object-fit: contain;
            }
          }
        }
      }

      .icnButton {
        background-color: #405189;
        padding: 2px;

        .icon {
          color: #fff;
        }
      }
      .icnButtonDisabled {
        background-color: #e0e0e0;
        padding: 2px;
      }
    }

    &__amounts {
      padding: 10px;
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;

      .row {
        display: flex;
        margin-bottom: 10px;

        p {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }
  }
`;

export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
  border: 1px solid #ccc;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
export const DialogContainer = styled(Dialog)`
  * {
    margin: 0;
    padding: 0;
  }
  .MuiDialogContent-root:first-child {
    padding-top: 0px;
  }
  label {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #193364;
    color: #fff;
    font-size: 20px;
    font-weight: 500;

    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
    .loader {
      color: #fff;
    }
  }

  .containerBody {
    padding: 0px 20px 0px 20px;
    margin-top: 20px;
    height: 280px;
    width: 443px;
    .description {
      font-weight: 400;
      margin-bottom: 15px;
      text-align: justify;
    }
    select {
      -webkit-box-align: center;
      align-items: center;
      background-color: rgb(255, 255, 255);
      border-color: rgb(204, 204, 204);
      border-radius: 4px;
      border-style: solid;
      border-width: 1px;
      cursor: default;
      display: flex;
      flex-wrap: wrap;
      -webkit-box-pack: justify;
      justify-content: space-between;
      min-height: 38px;
      position: relative;
      transition: 100ms;
      box-sizing: border-box;
      outline: 0px !important;
      color: #3f51b5;
      font-weight: 700;
    }
  }
  .buttons {
    .cancel {
      color: rgb(12 32 59);
      background: white;
      text-transform: capitalize;
      border: 1px solid #0c203b;
    }
    .accept {
      background-color: rgb(12 32 59);
      color: white;
      cursor: pointer;
    }
  }
`;
