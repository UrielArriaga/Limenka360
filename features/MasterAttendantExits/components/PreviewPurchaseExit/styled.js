import styled, { keyframes } from "styled-components";

export const ContainerExitStyled = styled.div`
  width: 100%;

  overflow-y: hidden;

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
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 313px);
    overflow: auto;
    margin-top: 13px;

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
    .title {
      font-weight: bold;

      letter-spacing: 0.03em;
      cursor: pointer;
      margin-top: 12px;
      margin-bottom: 14px;
      display: flex;

      align-items: center;
      margin-bottom: 13px;
      margin-top: 21px;
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220, 225, 246);
        color: rgb(12, 32, 59);
        border-radius: 50%;
      }
      .na {
        color: #757575;
        font-weight: 700;
        font-size: 12px;
      }
    }

    .headers {
      font-size: 13px;
      font-weight: bold;
      color: rgb(79, 79, 79);
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
      overflow: auto;
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      border-radius: 9px;
      max-height: 70vh;
      margin-top: 29px;
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

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

  .totalAmount {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    p {
      font-weight: bold;
    }
  }

  .rowprev {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    margin-bottom: 40px;
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
      overflow: auto;
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      border-radius: 9px;
      max-height: 70vh;
      margin-top: 29px;
    }

    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 12px;

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
            }
            .code {
              border-radius: 10px 0px 0px 0px;
              width: 10%;
            }
            .pro {
              width: 70%;
            }
            .acc {
              border-radius: 0px 10px 0px 0px;
              width: 10%;
            }
          }
        }

        tbody {
          tr {
            td {
              /* padding: 2px 0px 0px 9px; */

              color: #616161;
              font-weight: bold;
              .content__actions {
                .icon {
                  color: white;
                  border-radius: 4px;
                  font-size: 25px;
                  background-color: #405189;
                  padding: 4px;
                  margin: 3px;
                }
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

export const TrackinsHistoryStyled = styled.div`
  margin-top: 40px;
  h3 {
    font-size: 15px;
    font-weight: bold;
    color: #000;
    margin-bottom: 1rem;
  }

  .containertext {
    width: 100%;
    /* height: 100px; */
    border: 1px solid #ccc;
    /* padding: 10px; */
    border-radius: 5px;
    /* background-color: red; */
  }
  .load-more-button {
    width: 23%;
    margin-top: 20px;
    background: #ffd740;
    border: none;
    padding: 5px;
    border-radius: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-weight: bold;
    cursor: pointer;

    svg {
      margin-right: 5px;
    }
  }
  .headercontainertracking {
    background-color: #f3f4f8;
    padding: 10px;
    p {
      font-size: 12px;
      color: #616161;
    }
  }

  .subtitle {
    margin-bottom: 10px;
  }

  .textareatrackings {
    outline: none;
    border: none;
    width: 100%;
    /* height: 20px; */
    min-height: 20px;
    resize: none;
    font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
    padding: 10px;
  }
  .containertext .line {
    width: 98%;
    height: 1px;
    margin: auto;
    background-color: #ccc;
    margin-top: 10px;
  }

  .actionscontainertracking {
    padding: 10px;
    button {
      margin-right: 10px;
    }
  }
  .containertext button {
    /* background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
    padding: 5px 10px; */
  }

  .containerlisttrackings .activebutton {
    margin-top: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #000;
    color: #fff;
    border-radius: 5px;
    cursor: pointer;
  }
  h5 {
    margin-top: 20px;
    margin-bottom: 20px;
  }

  .actionscontainertracking .active {
    background-color: #000;
    color: #fff;
    cursor: pointer;
    padding: 5px 10px;
    border: none;
  }

  .actionscontainertracking .disablebutton {
    background-color: #ccc;
    color: #fff;
    cursor: not-allowed;
    padding: 5px 10px;
    border: none;
  }

  .containerlisttrackings {
  }

  .itemtracking {
    display: flex;
    margin-bottom: 10px;

    .columnicon {
      width: 20px;
      display: flex;
      /* align-items: center; */
      justify-content: center;
      margin-right: 20px;

      color: #ffd740;

      position: relative;

      .iconsvg {
        z-index: 100;
      }
      .line {
        position: absolute;
        top: 14px;
        width: 2px;
        height: 90%;
        background-color: #e0e0e0;
        /* margin: 0 10px; */
      }
    }

    .columninfo {
      &__header {
        color: #9e9e9e;
        margin-bottom: 10px;
        /* background-color: #f3f4f8; */
        /* padding: 10px 20px; */
        p {
          font-size: 13px;
        }
      }
      &__description {
        background-color: #f9f9fb;
        padding: 10px 20px;
        p {
          font-size: 13px;
        }
      }
      &__createdBy {
        color: #9e9e9e;
        p {
          font-size: 12px;
          text-align: end;
        }
      }
    }
  }

  .row {
    display: flex;
    align-items: center;
  }
`;
