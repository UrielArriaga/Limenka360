import styled, { keyframes } from "styled-components";

export const PreviewRecolecionStyled = styled.div`
  width: 100%;
  height: 100vh;
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
          background-color: #f9f9fb;
          color: #616161;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }
.title {
    margin-bottom: 15px;
    font-weight: bold;
     margin-top: 15px;
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
      border-bottom: 4px solid rgba(46, 55, 164, 0.05);

      /* width: auto; */

      &--tab {
        font-size: 13px;
        margin-right: 20px;
        font-weight: 500;
        padding-bottom: 6px;
        color: #616161;
        border-bottom: 2px solid transparent;
        :hover {
          cursor: pointer;
          border-bottom: 2px solid #1e88e5;
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
    .products {
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
