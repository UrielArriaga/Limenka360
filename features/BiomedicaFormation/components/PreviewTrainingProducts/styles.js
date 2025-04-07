import styled, { keyframes } from "styled-components";

export const PreviewTrainingStyled = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  overflow-y: scroll;
  padding: 16px;
  background: #f5f7fa;
  height: 75vh;
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

  .headerprview {
    background: white;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 20px;
  }
  .content-exit {
    border-radius: 9px;
    padding: 50px;
    min-height: auto;
    background: white;
    &__containerTable {
      overflow: auto;
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
      border-radius: 9px;
      max-height: 70vh;
      margin-top: 29px;
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
  .concep {
    display: flex;
    flex-direction: column;

    .text {
      font-weight: bold;
      margin-bottom: 6px;
    }
  }
  .btn-headers {
    .btn_reviwed {
      margin-right: 15px;
      background: #1e88e5;
      text-transform: capitalize;
      color: white;
    }
    .disabled {
      background: rgba(0, 0, 0, 0.26);
      margin-right: 15px;
      text-transform: capitalize;
      color: white;
    }
  }
  .actions {
    display: flex;
    height: 50px;
    background-color: #eeeeee;
  }
  .headerday {
    display: flex;
    padding: 10px;
    justify-content: space-between;
  }
  .title {
    font-weight: bold;
    margin-top: 7px;
    &__name{
      font-weight:normal;
      text-transform: capitalize;
    }
    &__status{
      font-weight: normal;
      font-size: 12px;
      background-color: #31c88c;
      color: white;
      padding: 6px;
      border-radius: 13px;
      text-transform: capitalize;
    }
  }
  .tablecontainer {
    margin-top: 20px;
    padding: 10px;
  }
  .data_order {
    padding: 10px;
    margin-top: 25px;
    background: #f5f7fa;
    border-radius: 10px;
  }
  .info_addrees {
    margin-top: 2px;
    display: flex;
    color: #757575;
    margin-bottom: 4px;
    font-size: 13px;
  }
  .table_products {
    margin-top: 20px;
  }
  .total {
    display: flex;
    justify-content: end;
    font-size: 13px;
    font-weight: bold;
    color: #034d6f;
  }
  .button {
    background-color: #405189;
    padding: 2px;
    text-transform: capitalize;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    :hover {
      background-color: rgb(84, 106, 178);
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
