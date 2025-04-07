import styled, { keyframes } from "styled-components";
import { Tabs, Tab } from "@material-ui/core";

export const PreviewOrderStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #f5f7fa;
  z-index: 3;
  position: relative;
  .headerpreviewfilters {
    h4 {
      margin-right: 5px;
    }
    .input {
      width: 40%;
      padding: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      outline: none;
      height: 34px;
      margin-right: 10px;
      padding-left: 30px;
    }
    position: sticky;
    top: 0;
    background: white;
    border-radius: 8px;
    display: flex;
    align-items: center;
    padding: 10px;
  }
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
      .btnEdit {
        background-color: #f9f9fb;
        color: #616161;
        border: 1px solid #ccc;
        border-radius: 5px;
      }

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

  .executivedata {
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
      margin-top: 20px;
    }

    .rowprevalig {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
    }
    .contentInfo{
      width: 90%;
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
    .dataContainer {
      margin-left: 42px;
      display: flex;
      width: 100%;
      justify-content: space-between;
      &__item{
        display: flex;
        flex-direction: column;
      }
    }
    .cardsDirection {
      display: flex;
      gap: 5px;
      margin-top: 15px;
      margin-left: 42px;
      flex-flow: wrap;
      overflow: auto;
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
      margin-top: 40px;
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        thead {
          /* position: sticky; */
          top: 0;
          /* z-index: 1; */
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
            td {
              padding: 4px 0px 0px 9px;
              text-align: left;
              color: #616161;
              font-weight: bold;
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

export const CustomTabs = styled(Tabs)`
  margin-top: 10px;
  background-color: #fff;
  border-bottom: 1px solid #e0e0e0;

  .MuiTabs-indicator {
    background-color: #034d6f;
  }
`;

export const CustomTab = styled(Tab)`
  text-transform: none;
  font-weight: bold;
  color: #555;

  &.Mui-selected {
  color: #405189;
  font-weight: bold;
  }
`;