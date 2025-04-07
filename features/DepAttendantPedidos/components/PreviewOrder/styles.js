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
          margin-left: 5px;
          font-size: 13px;
        }

        .button {
          background-color: #039be5;
          color: #fff;
          border: 1px solid #ccc;
          border-radius: 5px;
        }

        .buttondisabled {
          background-color: #e0e0e0;
          color: #616161;
        }
      }
    }
  }

  .actions {
    display: flex;

    /* height: 10px; */
    background-color: #f9f9fb;

    &__item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      color: #616161;

      &--icon {
        font-size: 15px;
      }

      &--text {
        margin-left: 5px;
        font-size: 13px;
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
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 50px;
      align-items: center;
      h4 {
        margin-bottom: 20px;
      }
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
        max-height: 400px;
        overflow-y: auto;
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
          .disabled {
            background-color: #e0e0e0;
            color: #616161;
          }
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

      .tablelist {
        padding-left: 10px;
        .tablelititem {
          font-size: 11px;
          display: flex;
          align-items: flex-start;
          padding: 20px 10px;
          border-bottom: 1px solid #e0e0e0;
          color: #000;
          font-weight: bold;

          .description {
            display: flex;
            margin-right: 10px;
          }
          .icon {
            font-size: 11px;
            margin-right: 10px;
          }
          .serialnumber {
            text-transform: uppercase;
            color: #00738e;
            margin-right: 10px;
            font-weight: bold;
          }
          .name {
            margin-right: 10px;
            &:hover {
              color: red;
              cursor: pointer;
              .delete {
                visibility: visible;
              }
            }
          }

          textarea {
            width: 300px;
            padding: 5px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: vertical;
          }

          .delete {
            color: red;
            visibility: hidden;
          }
          .btndelete {
            background-color: #039be5;
            padding: 5px;
            color: #fff;
            margin-left: 10px;
          }
          .iconBtnDelete {
            background-color: red;
            padding: 5px;
            color: #fff;
            margin-left: 10px;
          }

          .icondelete {
            font-size: 15px;
          }
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

    &__actionstoexit {
      margin-top: 50px;
      display: flex;
      justify-content: flex-end;

      .buttonexit {
        background-color: #00738e;
        color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
      }
    }

    .divider {
      margin-top: 50px;
      border-top: 4px dotted #ccc;
      margin-bottom: 20px;
    }

    &__productstoexit {
      margin-top: 50px;

      .title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }

      thead {
        position: sticky;
        top: 0;
        z-index: 1;
        background-color: #034d6f;
        tr {
          th {
            padding: 5px 5px;
            text-align: left;
            color: #616161;
            color: #fff;
            font-weight: bold;
          }
        }
      }

      tbody {
        tr {
          background-color: #f9f9fb;

          &:hover {
            background-color: #e0e0e0;
          }
          td {
            padding: 10px;
            text-align: left;
            color: #616161;
            font-weight: bold;

            .buttonexit {
              background-color: #039be5;
              padding: 5px;
              color: #fff;

              .icon {
                font-size: 24px;
              }
            }
          }
        }
      }
    }

    &__amounts {
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
  .btnhightligth {
    margin-left: 5px;
    background: #039be5;
    color: white;
    padding: 0px 8px 3px 8px;
    border-radius: 6px;
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
