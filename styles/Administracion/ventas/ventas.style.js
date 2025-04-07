import { colors } from "../../global.styles";
import styled from "styled-components";

export const SalesStyle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;

  * {
    margin: 0;
  }

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .sales_content {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      &__header {
        margin-bottom: 30px;
        .containerTitle {
          font-size: 14px;
          margin-bottom: 10px;
          .total {
            display: flex;
            align-items: center;
            font-weight: 500;
            svg {
              font-size: 14px;
              margin-right: 5px;
              color: #103c82;
              cursor: pointer;
            }
            .reload {
              font-size: 18px;
              margin-left: 10px;
              cursor: pointer;
            }
          }
        }
      }
      &__body {
        .filtersOrders {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          .orders {
            display: flex;
            align-items: center;
          }
        }

        .ctr_load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          /* height: 400px; */
          &__img {
            width: 150px;
            animation: slide 3s infinite;
            img {
              width: 100%;
              object-fit: contain;
            }
          }
          &__load {
            display: flex;
            flex-direction: column;
            justify-content: center;
            line-height: 30px;
            width: 200px;
            p {
              text-align: center;
              font-weight: bold;
            }
          }
          @keyframes slide {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
        }
      }
      &__footer {
      }
    }
  }

  box {
    background-color: white;
  }
`;
