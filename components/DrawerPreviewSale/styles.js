import { Drawer } from "@material-ui/core";
import Select from "react-select";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";

export const DrawerStyled = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 50%;
    padding: 20px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
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
  .drawer_container {
    &__top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;

      p {
        font-size: 18px;
        font-weight: bold;
        letter-spacing: 0.03em;
      }
    }

    &__data {
      .label {
        font-size: 13px;
        font-weight: bold;
        color: #4f4f4f;
        margin-bottom: 2px;
      }
      .paragraph {
        font-size: 16px;
        font-weight: 500;
        color: #000;
      }
      .capitalize {
        text-transform: capitalize;
      }
    }

    &__products {
      &__top {
        p {
          font-size: 15px;
          font-weight: bold;
          letter-spacing: 0.03em;
        }
      }

      &__containercards {
        padding-top: 10px;
        &__card {
          padding: 10px;
          margin-bottom: 20px;
          box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
          background-color: #fff;

          .title {
            font-weight: bold;
            font-size: 14px;
          }
          .top {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 5px;
            .item {
              display: flex;
              align-items: center;
              flex-wrap: wrap;
              .icon {
                color: #3f51b5;
                font-size: 16px;
              }
              .iconStatus {
                color: #3f51b5;
                font-size: 16px;
              }
              .date {
                font-size: 14px;
                font-weight: bold;
              }
              .capitalize {
                text-transform: capitalize;
              }
            }
          }
          .paymentTrue {
            color: green;
          }
          .paymentFalse {
            color: red;
          }
          .itemPayment {
            display: flex;
            font-size: 14px;
          }
          .code {
            font-size: 14px;
          }
        }
      }
    }

    .ctr_targets {
      width: 100%;
      .title {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .text {
          font-weight: bold;
          letter-spacing: 0.03em;
          cursor: pointer;
        }
      }
      .ctr_grid {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        width: 100%;
        overflow-x: auto;
        padding-bottom: 10px;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #0c203b;
        }
      }

      .target_products {
        padding: 10px;
        height: 233px;
        width: max-content;
        min-width: 320px;
        max-width: 492px;
        border-radius: 8px;
        position: relative;
        box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
        &::before {
          top: 0px;
          left: 0px;
          width: 5px;
          bottom: 0px;
          content: "";
          position: absolute;
          background-image: linear-gradient(
            to right bottom,
            #3f51b5,
            #2d499e,
            #1e4086,
            #13376f,
            #0e2d58,
            #122d55,
            #142c51,
            #172c4e,
            #20355c,
            #2a3e6b,
            #35487a,
            #405189
          );
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 5px;
          .item {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            .icon {
              color: #3f51b5;
              font-size: 16px;
            }
            .date {
              font-size: 12px;
              font-weight: bold;
              color: #0c203b;
            }
            .capitalize {
              text-transform: capitalize;
            }
          }
        }
        .span {
          font-weight: bold;
          letter-spacing: 0.03em;
          font-size: 11px;
        }
      }
    }
    .divider {
      margin-top: 15px;
      margin-bottom: 15px;
      border-bottom: 1.5px solid #f1f1f1;
    }
  }
`;

export const CustomSelected = styled(Select)`
  z-index: 51;

  &.Select--multi {
    .Select-value {
      display: inline-flex;
      align-items: center;
    }
  }

  & .Select-placeholder {
    font-size: smaller;
  }
`;
