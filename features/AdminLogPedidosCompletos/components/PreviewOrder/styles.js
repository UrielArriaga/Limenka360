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

  .tabs {
    display: flex;
    gap: 20px;
    margin-top: 0px;
    .tab {
      background: #cfd8dc;
      padding: 10px 20px;

      border-radius: 8px;
      cursor: pointer;
      .tab__title {
        color: #263238;
        font-size: 12px;
        font-weight: bold;
      }
    }
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
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

      max-height: 70vh;
      margin-top: 29px;
    }

    &__products {
      .tablebody {
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }

      .tableheader {
        display: flex;
        background-color: #405189;
        color: white;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        padding: 10px;
        font-weight: bold;
        position: sticky;

        .tablehead {
          flex: 1;

          text-align: left;
          font-weight: bold;
        }

        .tableheadproductname {
          flex: 3;
        }
        .center {
          text-align: center;
        }
      }

      .tablerow {
        display: flex;
        border-bottom: 1px solid #e0e0e0;
        padding: 10px;
        font-weight: bold;
        min-height: 40px;

        color: #616161;
        cursor: pointer;

        .tablecell {
          flex: 1;

          text-align: left;
          color: #616161;
          font-weight: bold;
        }
        .code {
          color: #000;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 10px;

          justify-content: center;
          /* button {
            margin-right: 10px;

            background-color: #405189;
            color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px 10px;
          } */
          .icnButton {
            background-color: #405189;
            padding: 2px;

            .icon {
              font-size: 19px;
              color: #fff;
            }
          }
          .icnRed {
            background-color: rgb(128, 17, 17);
            padding: 2px;

            .icon {
              font-size: 19px;
              color: #fff;
            }
          }
          .icnButtonDisabled {
            background-color: #e0e0e0;
            padding: 2px;
          }
        }

        .tableheadproductrow {
          flex: 3;

          .content {
            width: 80%;
          }
        }
        .center {
          text-align: center;
          font-size: 14px;
        }
      }

      .selected {
        background-color: #f1f1fa;
      }

      .stocksavailables {
        background-color: #f1f1fa;
        padding: 10px;
        font-size: 12px;
        h4 {
          margin-bottom: 10px;
          font-size: 14px;
        }

        .content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 10px;
        }

        .itemwerehouse {
          padding: 10px;
          background-color: rgba(0, 230, 118, 0.3);
          border-radius: 8px;
        }

        .unit {
          color: #616161;
          font-weight: bold;
          margin-top: 10px;
        }
      }
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;

        thead {
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
              min-width: 150px;
            }

            .thproduct {
            }
          }
        }

        tbody {
          tr {
            border-bottom: 1px solid #e0e0e0;
            td {
              padding: 10px;

              text-align: left;
              color: #616161;
              font-weight: bold;
              height: 40px;
            }

            .actions {
              display: flex;

              button {
                margin-right: 10px;

                background-color: #405189;
                color: #fff;
                border: 1px solid #ccc;
                border-radius: 5px;

                cursor: pointer;
                font-size: 12px;
                padding: 5px 6px;
              }
              .iconButton {
                margin: 0;
                padding: 0;
              }

              .icon {
              }
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
  &__containerTable {
    margin-bottom: 20px;
    box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

    max-height: 70vh;
    margin-top: 29px;
  }

  &__products {
    .tablebody {
    }
    .table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;
    }

    .tableheader {
      display: flex;
      background-color: #405189;
      color: white;
      border-top-left-radius: 9px;
      border-top-right-radius: 9px;
      padding: 10px;
      font-weight: bold;
      position: sticky;

      .tablehead {
        flex: 1;

        text-align: left;
        font-weight: bold;
      }

      .tableheadproductname {
        flex: 3;
      }
    }

    .tablerow {
      display: flex;
      border-bottom: 1px solid #e0e0e0;
      padding: 10px;
      font-weight: bold;
      min-height: 40px;

      color: #616161;
      cursor: pointer;

      .tablecell {
        flex: 1;

        text-align: left;
        color: #616161;
        font-weight: bold;
      }
      .code {
        color: #000;
      }

      .actions {
        button {
          margin-right: 10px;

          background-color: #405189;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
          padding: 5px 10px;
        }
      }

      .tableheadproductrow {
        flex: 3;
      }
    }

    .selected {
      background-color: #f1f1fa;
    }

    .stocksavailables {
      background-color: #f1f1fa;
      padding: 10px;
      font-size: 12px;
      h4 {
        margin-bottom: 10px;
        font-size: 14px;
      }

      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;
      }

      .itemwerehouse {
        padding: 10px;
        background-color: rgba(0, 230, 118, 0.3);
        border-radius: 8px;
      }

      .unit {
        color: #616161;
        font-weight: bold;
        margin-top: 10px;
      }
    }
  }

  &__products {
    table {
      width: 100%;
      border-collapse: collapse;
      font-size: 11px;

      thead {
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
            min-width: 150px;
          }

          .thproduct {
          }
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #e0e0e0;
          td {
            padding: 10px;

            text-align: left;
            color: #616161;
            font-weight: bold;
            height: 40px;
          }

          .actions {
            display: flex;

            button {
              margin-right: 10px;

              background-color: #405189;
              color: #fff;
              border: 1px solid #ccc;
              border-radius: 5px;

              cursor: pointer;
              font-size: 12px;
              padding: 5px 6px;
            }
            .iconButton {
              margin: 0;
              padding: 0;
            }

            .icon {
            }
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
  .titleLoader {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .title {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #405189;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    justify-content: space-between;
  }
  .containerBody {
    padding: 11px 20px 83px 20px;
    margin-top: 20px;
  }
  .DialogText {
    margin-top: 14px;
    margin-bottom: 0;
  }
  .dialogContainer {
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
        &__input {
          padding: 10px 23px 9px 8px;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: 0.25rem;
          display: block;
          font-size: 0.8125rem;
          font-weight: 400;
          line-height: 1.5;
          -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          width: 100%;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 20px;
      }
      &__select__value-container {
        height: 15px;
      }

      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
  }

  .buttons {
    margin-top: 30px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 17px;
    .cancel {
      color: #fff;
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 14px;
      border-radius: 10px;
      background: white;
      margin-right: 11px;
      cursor: pointer;
    }
    .accept {
      color: #fff;
      text-transform: capitalize;
      /* border: 2px solid #103c82; */
      color: #ffff;
      border-radius: 2px solid;
      font-size: 14px;
      border-radius: 10px;
      background: white;
      margin-right: 11px;
      cursor: pointer;
      background: #103c82;
    }
  }
  .descarted_input {
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
    width: 100%;
    height: 40px;
    border: 2px solid #f3f3f3;
    color: #000;
    &:focus {
      outline: none;
      border: 2px solid #405189;
    }
  }
`;
