import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const ContainerOrder = styled.div`
  position: fixed;
  top: 90px;
  right: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) -14px 14px 28px, rgba(0, 0, 0, 0.22) -10px 10px 10px;
  width: 550px;
  z-index: 50;
  .alert {
    border-radius: 8px;
    padding: 10px 15px;
    position: absolute;
    bottom: 0;
    background-color: #fff;
    position: relative;
    display: flex;
    flex-direction: row;
    &__content {
      .titleOrder {
        font-weight: 600;
        margin: 5px;
      }
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: -33px -15px 0px -15px;
        padding: 5px 15px;
        border-radius: 8px 8px 0px 0px;
        background-color: rgb(16, 60, 130);
        .icon {
          display: flex;
          align-items: center;
          &__title {
            color: #fff;
            font-weight: 500;
          }
          &__purchaseIcon {
            font-size: 22px;
            color: #fff;
            margin-right: 10px;
          }
          &__loader {
            color: white;
            margin-left: 14px;
          }
        }
        .button {
          height: 20px;
          width: 20px;
          transition: 0.3s;
          &:hover {
            background-color: #ec1313;
            .icon {
              color: #fff;
            }
          }
          .icon {
            transition: 0.3s;
            font-size: 24px;
            color: #fff;
          }
        }
      }
      &__headerRejected {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: -33px -15px 0px -15px;
        padding: 5px 15px;
        border-radius: 8px 8px 0px 0px;
        background-color: #c10d0d;
        .icon {
          display: flex;
          align-items: center;
          &__title {
            color: #fff;
            font-weight: 500;
          }
          &__purchaseIcon {
            font-size: 22px;
            color: #fff;
            margin-right: 10px;
          }
          &__loader {
            color: white;
            margin-left: 14px;
          }
        }
        .button {
          height: 20px;
          width: 20px;
          transition: 0.3s;
          &:hover {
            background-color: #ec1313;
            .icon {
              color: #fff;
            }
          }
          .icon {
            transition: 0.3s;
            font-size: 24px;
            color: #fff;
          }
        }
      }
      &__headerApproved {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: -33px -15px 0px -15px;
        padding: 5px 15px;
        border-radius: 8px 8px 0px 0px;
        background-color: #c10d0d;
        .icon {
          display: flex;
          align-items: center;
          &__title {
            color: #fff;
            font-weight: 500;
          }
          &__purchaseIcon {
            font-size: 22px;
            color: #fff;
            margin-right: 10px;
          }
          &__loader {
            color: white;
            margin-left: 14px;
          }
        }
        .button {
          height: 20px;
          width: 20px;
          transition: 0.3s;
          &:hover {
            background-color: #ec1313;
            .icon {
              color: #fff;
            }
          }
          .icon {
            transition: 0.3s;
            font-size: 24px;
            color: #fff;
          }
        }
      }
      &__body {
        background-color: #fff;
        margin: 0px;
        &__item {
          width: 100%;
          padding: 0px 0px 2px 0px;
          .title {
            font-weight: 500;
            font-size: small;
            color: rgba(64, 123, 254, 1);
          }
          .selectReasons {
            margin-bottom: 9px;
          }
          .view {
            font-size: 14px;
            color: #0c203b;
            font-weight: 500;
            cursor: pointer;
            text-decoration: underline;
          }
          .avatarEjecutive {
            display: flex;
            align-items: center;
            &__avatar {
              width: 20px;
              height: 20px;
              margin-right: 5px;
              background-color: rgba(64, 123, 254, 1);
            }
          }
          .info {
            font-weight: 500;
            font-size: 14px;
            &__subTitle {
              color: grey;
              margin-right: 5px;
            }
          }
          .titleBill {
            width: fit-content;
            display: flex;
            align-items: center;
            /* margin: 10px 0px; */
            font-size: 13px;
            transition: 0.3s;
            color: grey;
            &:hover {
              cursor: pointer;
              color: rgba(64, 123, 254, 1);
              .iconShowMore {
                transform: translateY(2px);
              }
            }
            .iconShowMore {
              transition: 0.1s;
              margin-bottom: -1px;
            }
          }
          .onlyRow {
            white-space: nowrap;
          }
        }
      }
      &__footer {
        display: flex;
        justify-content: space-between;
        .button {
          &__btAll {
            font-size: 12px;
            border: 1px solid rgb(16, 60, 130);
            background-color: rgb(16, 60, 130);
            color: #fff;
            text-transform: capitalize;
            &:hover {
              color: rgb(16, 60, 130);
              background-color: #fff;
            }
          }
        }
        .buttonsAction {
          display: flex;
          flex-direction: row-reverse;
          &__bt {
            text-transform: capitalize;
            font-weight: 500;
            font-size: 12px;
          }
          .denied {
            border: 1px solid #c10d0d;
            background-color: #c10d0d;
            color: #fff;
            margin-right: 10px;
            &:hover {
              color: #c10d0d;
              background-color: #fff;
            }
          }
          .aproved {
            border: 1px solid #409118;
            background-color: #409118;
            color: #fff;
            &:hover {
              color: #409118;
              background-color: #fff;
            }
          }
          .goBack {
            border: 1px solid #103c82;
            background-color: #fff;
            color: #103c82;
            margin-right: 11px;
          }
          .accept {
            border: 1px solid #103c82;
            background-color: #103c82;
            color: #fff;
          }
          .disabled {
            background-color: rgba(0, 0, 0, 0.26);
            color: white;
            border: none;
          }
          &__loader {
            margin-top: -5px;
            margin-right: 25px;
          }
        }
      }
    }
  }
`;
