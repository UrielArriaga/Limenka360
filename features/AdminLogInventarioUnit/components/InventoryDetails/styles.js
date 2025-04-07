import styled, { keyframes } from "styled-components";

export const PreviewOrderStyled = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y: scroll;
  ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #616161;
    }

  .headerpreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-radius: 6px;
    background: white;
    .concept {
      font-weight: bold;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;
      .close {
        margin: 0 11px;
      }
      &--item {
        display: flex;
        align-items: center;
        /* padding: 0 10px; */

        color: #616161;

        .icon {
          font-size: 15px;
        }

        .text {
          margin-left: 5px;
          font-size: 13px;
        }

        .buttonRepair {
          background-color: #034d6ff5;
          color: rgb(255, 255, 255);
          margin: 0px 0px 0px 5px;
          height: 35px;
          text-transform: capitalize;
          border-radius: 5px;
          margin: 0 11px;
          font-size: 11px;
          :hover {
            cursor: pointer;
          }
        }
        .buttonTranckings {
          border: 1px solid #1e88e5;
          background-color: #1e88e5;
          color: rgb(255, 255, 255);
          margin: 0px 0px 0px 5px;
          height: 35px;
          font-size: 11px;
          text-transform: capitalize;
        }
        .disabled {
          border: 1px solid #e0e0e0;
          background: white;
          margin: 0px 0px 0px 5px;
          height: 35px;
          font-size: 11px;
          text-transform: capitalize;
          margin: 0 11px;
        }
        .buttonTrans {
          border: 1px solid #851313;
          color: #851313;
          font-size: 11px;
          background-color: #851313eb;
          color: rgb(255, 255, 255);
          margin: 0px 0px 0px 5px;
          height: 35px;
          text-transform: capitalize;
          :hover {
            cursor: pointer;
          }
        }
      }
    }
  }

  .actions {
    display: flex;

    height: 50px;
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
    min-height: 630px;
    margin-top: 12px;
    background: white;
    border-radius: 6px;
    padding: 6px;

    &__tabs {
      /* background-color: red; */
      padding: 10px 10px 0px 10px;
      margin: 0;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #ccc;
      &__content{
        width: 50%;
        display: flex;
        &--tab {
          /* background-color: blue; */
          font-size: 12px;
          margin-right: 20px;
          padding-bottom: 6px;
          border-bottom: 2px solid transparent;
          :hover {
            cursor: pointer;
            border-bottom: 2px solid #1e88e5;
          }
        }
      }

      &--tabStatus{
        font-size: 12px;
        margin-right: 20px;
        padding-bottom: 6px;
        border-bottom: 2px solid transparent;
        p{
          background-color: #1e88e5;
          padding: 6px;
          border-radius: 15px;
          color: white;
        }
      }

      .active {
        /* background-color: #f9f9fb; */
        /* border-radius: 5px; */
        font-weight: bold;
        padding-bottom: 6px;
        border-bottom: 2px solid #1e88e5;
      }
    }
    &__render {
      overflow: auto;
      height: 552px;
    }
    .rowprev {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      margin-top: 50px;
      align-items: center;
    }

    &__customer {
      &--title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }

      .hightligth {
        color: #1e88e5;
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

    &__products {
      margin-top: 50px;
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #f9f9fb;
          tr {
            th {
              padding: 10px;
              text-align: left;
              color: #616161;
              font-weight: bold;
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 10px;
              text-align: left;
              color: #616161;
              font-weight: bold;
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
