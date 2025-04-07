import styled from "styled-components";
import { customWidth, device } from "../global.styles";

export const VistaEjecutivoStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100vh;
  background-size: cover;

  .alert {
    background-color: #00bc8c;
    width: 80%;
    margin: auto;
    margin-top: 20px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
    padding: 10px;
    border-radius: 4px;
    padding: 20px 20px;
    z-index: 100000;
    animation: settings 0.2s forwards;

    @keyframes settings {
      0% {
        transform: translate(-50%, 0);
      }

      100% {
        transform: translate(-50%, 20%);
      }
    }
    p {
      color: #fff;
      font-weight: bold;
    }
  }

  .main {
    padding: 1em;

    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;

    .top {
      @media ${device.md} {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
        /* padding: 10px 10px 0 10px; */
      }
    }
    .top .welcome {
      h4 {
        font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif;
        font-size: 24px;
        font-weight: bold;
      }
      p {
        color: #616161;
        font-size: 14px;
      }
    }

    .top .actions {
      display: flex;
      align-items: center;

      .inputdate {
        height: 30px;
        width: 200px;
        background-color: #ffff;
        border-radius: 2px;
        padding-left: 10px;
        margin-right: 4px;
        margin-bottom: 8px;
        /* border: 2px solid #cfd8dc; */
        background-color: #ffff;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }

      .divider-date {
        margin-right: 4px;
      }
      .btn_add {
        height: 30px;
        background-color: #3aade6;
        color: #fff;
        width: 220px;
        margin-top: 6px;
      }
    }
    .actions {
      display: flex;
      align-items: center;

      .inputdate {
        height: 30px;
        width: 200px;
        background-color: #ffff;
        border-radius: 2px;
        padding-left: 10px;
        margin-right: 4px;
        margin-bottom: 8px;
        /* border: 2px solid #cfd8dc; */
        background-color: #ffff;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
      }

      .divider-date {
        margin-right: 4px;
      }
      .btn_add {
        height: 30px;
        background-color: #3aade6;
        color: #fff;
        width: 220px;
        margin-top: 6px;
      }
    }
  }

  .dashboard_content {
    background-color: #f3f3f8;
    height: 100%;
    overflow: scroll;
    padding: 10px;
    &__welcome {
      margin-bottom: 10px;
    }
    &__cards {
      display: flex;
      justify-content: space-between;
      &__card {
        border-radius: 4px;
        width: calc((100% / 4) - 10px);
        height: 100px;
        padding: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        background-color: #ffff;
        &__top {
          display: flex;
          justify-content: space-between;
          &__txtleft {
            font-size: 12px;
            color: #878a99;
          }

          &__right {
            font-size: 16px;
            color: red;
            svg {
              font-size: 12px;
            }

            &--active {
              color: green;
              svg {
                font-size: 12px;
              }
            }
          }
        }

        &__middle {
          margin: 10px 0px;
          &__total {
            p {
              font-size: 25px;
              color: #485056;
            }
          }
        }

        &__bottom {
          display: flex;
          justify-content: space-between;
          flex-direction: row-reverse;
          &__txtleft {
            font-size: 12px;
            color: #46568d;
            cursor: pointer;
            text-decoration: underline;
          }

          &__right {
            &__iconitem {
              background-color: red;
            }
            svg {
              font-size: 20px;
            }
          }
        }
      }
    }
  }
`;
