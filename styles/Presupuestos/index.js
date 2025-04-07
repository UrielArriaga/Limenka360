import styled from "styled-components";
import { device, colors } from "../global.styles";

export const BudgetStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100%;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin-top: 10%;
    /* height: 400px; */
    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
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
    @keyframes slide_img {
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
  .ctr_prospects {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 20px;
    }
    &__tfooter {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 20px;
      &__ctr_button {
        margin-top: 10px;
        margin-bottom: 10px;
        .add_buton {
          text-transform: capitalize;
          background-color: #405189;
        }
      }
      &__ctr_pagination {
        display: flex;
        align-items: center;
        justify-content: space-around;
        &__pagination {
          display: flex;
          align-items: center;
          .before {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background: #f3f3f3;
            border-radius: 8px;
            margin-right: 5px;
            margin-left: 10px;
            color: #0c203b;
            border: none;
            transition: all 0.2s ease;
            &:hover {
              cursor: pointer;
              background: #dce1f6;
            }
          }
          .next {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 30px;
            height: 30px;
            background: #f3f3f3;
            border-radius: 8px;
            margin-left: 5px;
            color: #0c203b;
            border: none;
            transition: all 0.2s ease;
            &:hover {
              cursor: pointer;
              background: #dce1f6;
            }
          }
        }
      }
    }
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    &__title {
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
        }
        .reload {
          font-size: 18px;
          margin-left: 10px;
          cursor: pointer;
        }
      }
      .MuiBadge-badge {
        top: 5px;
        height: 15px;
        font-size: 0.6rem;
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
        /* font-size: 25px; */
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
    width: 100%;
    justify-content: space-between;
    &__ctr_input {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      .inputText {
        width: 100%;
        height: 40px;
        input {
          padding-left: 40px;
          padding-right: 70px;
        }
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
        border-radius: 10px;
      }
      .search {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        left: 10px;
        top: 5px;
      }
      .ctr_filters {
        display: flex;
        align-items: center;
        position: absolute;
        right: 10px;
        color: #8a8a8a;
        cursor: pointer;
        .filters {
          width: 30px;
          height: 30px;
          padding: 5px;
          transition: all 0.4s ease;
        }
        .text {
          font-size: 12px;
        }
        &:hover .filters {
          padding: 3px;
        }
      }
    }
  }

  .ordersAndView {
    display: grid;
    align-items: end;
    justify-content: end;
    @media ${device.sm} {
      display: flex;
      align-items: center;
      justify-content: end;
    }
  }

  .contentOrders {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .order-select {
    cursor: pointer;
    padding: 2px 1px;
    outline: 0;
    border: 0;
    border-radius: 0;
    font-size: 12px;
    color: #0d47a1;
    font-weight: 600;
    border: 1px solid #776ceb33;
    border-radius: 7px;
    position: relative;
    transition: all 0.25s ease;
  }
  .orderAsc {
    display: flex;
    align-items: center;
    justify-content: end;
  }
`;
