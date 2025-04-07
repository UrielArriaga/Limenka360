import styled from "styled-components";

export const MetasStyled = styled.div`
  background-color: #f3f3f8;
  height: 100vh;
  display: flex;
  .main {
    background: url(https://img.freepik.com/foto-gratis/textura-pared-estuco-azul-marino-relieve-decorativo-abstracto-grunge-fondo-color-rugoso-gran-angular_1258-28311.jpg?t=st=1660239016~exp=1660239616~hmac=cfca96be2fc16afcbcbebcde45a58e0f4f6b8d3dad43c0600c676f1d640b7b92);
    width: calc(100% - 250px);
    height: calc(100vh - 60px);
    margin-top: 60px;
    overflow-y: scroll;
    padding: 0px 20px;
    .container {
      width: 100%;
      max-width: 1400px;
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 30px 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &__titles {
          font-size: 14px;
          margin-bottom: 10px;
          &__results {
            display: flex;
            align-items: center;
            &__icon {
              font-size: 14px;
              color: #103c82;
              margin-bottom: -2px;
            }
            &__iconReload {
              font-size: 18px;
              color: #103c82;
              margin-left: 5px;

              &:hover {
                cursor: pointer;
              }
            }
            &__total {
              font-weight: 600;
              margin-right: 4px;
            }
          }
        }
        .btn_add {
          padding: 10px 15px;
          text-transform: capitalize;
          background: #103c82;
          color: #fff;
          font-size: 13px;
          border-radius: 10px;
          svg {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid #fff;
            padding: 2px;
            margin-right: 5px;
          }
        }
      }
      .ctr_filter {
        display: flex;
        align-items: center;
        justify-content: right;
        width: 100%;
        margin-top: 25px;
        margin-bottom: 25px;
        &__button {
          border: 1px solid;
          border-radius: 10px;
          display: flex;
          align-items: center;
          padding: 10px;
          width: 85px;
          height: 40px;
          background-color: #103c82;
          color: #fff;
          &:hover {
            cursor: pointer;
          }
          &__title {
            font-weight: 500;
            margin-right: 5px;
          }
        }
      }
      .table {
        margin-top: 15px;
      }
      .tfooter {
        width: 100%;
        &__ctr_pagination {
          display: flex;
          justify-content: right;
          margin: 15px 0px;
        }
      }
    }
  }
`;

export const DialogAlert = styled.div`
  padding: 15px;
  .title {
    font-size: 16px;
    font-weight: 500;
  }
  .message {
    font-size: 14px;
    font-weight: 400;
  }
  .buttons {
    display: flex;
    justify-content: right;
    margin-top: 15px;
    &__cancel {
      background: #0c203b;
      margin-right: 10px;
      color: #fff;
      text-transform: capitalize;
      border: 1px solid transparent;
      padding: 6px 16px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
    &__accept {
      background: #405189;
      border: 1px solid transparent;
      color: #fff;
      text-transform: capitalize;
      padding: 6px 16px;
      border-radius: 4px;
      font-weight: 500;
      font-size: 14px;
      &:hover {
        cursor: pointer;
      }
    }
    &__disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
`;
