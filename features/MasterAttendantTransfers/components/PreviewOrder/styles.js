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
          text-transform: capitalize;
        }
        .entry{
          background-color: #405189;
        }

.button.entry.button-disabled {
  background-color: #ccc !important;
  color: #666 !important;
  cursor: not-allowed;
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

  .text_observations {
    color: #858585;
    margin: 10px 0px 10px 0px;
    font-weight: 500;
  }
  .contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

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

    .content_day {
      background: red;
      color: white;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
    }
    .content_daypast {
      background: #00e676;
      color: white;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
    }
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
    &__clientinfo {
      margin-top: 5px;
      &--title {
        font-size: 16px;
        font-weight: bold;
      }
      &--item {
        display: flex;
        margin-bottom: 4px;
      }
      .hightligth {
        margin-left: 10px;
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
        .btnhightligth {
          margin-left: 5px;
          background: #039be5;
          color: white;
          padding: 0px 8px 3px 8px;
          border-radius: 6px;
        }
      }
    }

    &__containerTable {
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      margin-top: 29px;
    }

    &__products {
      .tablebody {
        max-height: 350px;
        overflow-y: auto;
      }
      .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 11px;
      }
      .content_actions {
        padding: 3px;
        background-color: #405189;
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
        .button_options_table {
          /* height: 20px; */
          margin: 0px 5px 0px 5px;
          background-color: white;
          font-size: 10px;
          text-transform: capitalize;
          align-items: center;
          font-weight: 600;
          color: #405189;
          .icon_tables {
            font-size: 14px;
          }
        }
      }

      .tableheader {
        display: flex;
        background-color: #405189;
        color: white;

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

      .inPackage {
        background-color: #eceff1;
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
          display: flex;
          align-items: center;
          text-align: left;
          color: #616161;
          font-weight: bold;
        }

        .totalToExit {
          flex: 1;

          color: #fff;
          font-weight: bold;
          background-color: #039be5;
          border-radius: 8px;
          padding: 4px;
          text-align: center;
        }
        .code {
          color: #000;
        }

        .actions {
          button {
            margin-right: 10px;
            background-color: #d9e2ff;
            color: #fff;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px 10px;
            text-transform: capitalize;
          }
        }

        .tableheadproductrow {
          flex: 3;

          .content {
            width: 80%;
          }
        }
        .center {
          display: flex;
          align-items: center; /* Centrado vertical */
          justify-content: center; /* Centrado horizontal */
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
  .contentpreview_orderinfo {
    span {
      font-weight: 500;
      text-transform: capitalize;
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

export const StyledMenu = styled.div`
  position: absolute;
  background-color: white;
  border: 0.5px solid #cdcdcd;
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%), 0px 3px 5px 2px rgb(0 0 0 / 5%);
  }

  .options {
    display: flex;
    flex-direction: column;

    &__option {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
      }

      svg {
        color: #f97faa;
        margin-right: 5px;
      }
      &:hover {
        transition: all 0.3s ease;
        background: #fae0e9;
        cursor: pointer;
      }
    }
  }
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
