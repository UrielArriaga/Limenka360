import { Drawer } from "@material-ui/core";
import { colors } from "../../styles/global.styles";
import styled from "styled-components";
export const DrawerPermissions = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 400px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .contenedor {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: sticky;
      z-index: 50;
      top: 0;
      padding: 15px 8px;
      background-color: ${colors.primaryColor};
      margin-bottom: 15px;
      box-shadow: 0px 1px 2px #abb2b9;
      &__title {
        display: flex;
        align-items: center;
        font-size: 22px;
        color: #fff;
        .iconReload {
          margin-bottom: -5px;
          margin-left: 8px;
          font-size: 20px;
          &:hover {
            cursor: pointer;
          }
        }
      }
      &__icon {
        width: 20px;
        height: 20px;
        color: red;
        &:hover {
        }
      }
    }
    &__body {
      padding: 0px 5px;
      &__formRequest {
        width: 100%;
        padding: 10px;
        margin-bottom: 30px;
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__info {
          font-weight: 500;
        }
        &__buttons {
          display: flex;
          justify-content: right;
          .send {
            background-color: #405189;
            font-size: 14px;
            border-radius: 4px;
            border: 1px solid transparent;
            color: #fff;
            padding: 5px;
            &:hover {
              cursor: pointer;
            }
          }
          .delete {
            background-color: #ff0000;
            font-size: 14px;
            border-radius: 4px;
            border: 1px solid transparent;
            color: #fff;
            padding: 5px;
            margin-right: 5px;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }
      &__card {
        margin: 10px;
        padding: 8px;
        border-radius: 8px;
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        &__head {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
          &__title {
            font-weight: 500;
            font-size: 15px;
          }
          &__permit {
            font-weight: 500;
            font-size: 13px;
            color: #47d61d;
            background-color: rgb(0, 255, 0, 0.1);
            border-radius: 8px;
            padding: 3px;
          }
          &__denied {
            font-weight: 500;
            font-size: 13px;
            color: #ff0000;
            background-color: rgb(255, 0, 0, 0.1);
            border-radius: 8px;
            padding: 3px;
          }
          &__pending {
            font-weight: 500;
            font-size: 13px;
            color: #ecba1d;
            background-color: rgb(236, 186, 29, 0.1);
            border-radius: 8px;
            padding: 3px;
          }
        }
        &__body {
          &__concept {
            font-size: 14px;
            font-weight: 500;
            margin-bottom: 10px;
          }
          &__allowBy {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            &__icon {
              font-size: 15px;
            }
            &__title {
              font-size: 14px;
              color: gray;
            }
            .permit {
              color: #47d61d;
            }
            .denied {
              color: #ff0000;
            }
          }

          &__date {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            &__icon {
              font-size: 15px;
              color: ${colors.primaryColorDark};
            }
            &__dateSoli {
              color: gray;
              font-size: 14px;
              .info {
                color: black;
                font-weight: 500;
              }
            }
          }
        }
      }
    }
    &__footer {
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      /* height: 400px; */
      &__img {
        width: 130px;
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
`;
