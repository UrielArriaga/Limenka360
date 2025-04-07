import styled, { keyframes } from "styled-components";

export const PreviewOrderStyled = styled.div`
  width: 100%;
  /* height: 100vh; */
  border: 1px solid #ccc;
  overflow-y: hidden;

  .headerpreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .concept {
      font-weight: bold;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;

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
      }
    }
  }

  .actions {
    display: flex;

    height: 10px;
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
    padding: 0px 50px;
    min-height: 500px;

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
      /* 
      .hightligth {
        color: #1e88e5;
      } */

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

    &__products {
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
        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;
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
