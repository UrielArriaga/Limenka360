import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const ContainerOrder = styled.div`
  position: fixed;
  top: 90px;
  right: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.25) -14px 14px 28px, rgba(0, 0, 0, 0.22) -10px 10px 10px;
  width: 400px;
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
      &__header {
        width: 400px;
        border: 1px solid;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: -10px -15px 15px -15px;
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
            color: white;
          }
        }
      }
      &__body {
        background-color: #fff;
        margin-bottom: 20px;
        &__item {
          width: 100%;
          .title {
            font-weight: 500;
            font-size: small;
            color: rgba(64, 123, 254, 1);
          }
          .avatarEjecutive {
            display: flex;
            align-items: center;
            &__avatar {
              width: 35px;
              height: 35px;
              margin-right: 5px;
              background-color: rgba(64, 123, 254, 1);
            }
          }
          .info {
            font-weight: 500;
            color: #495057;
            font-size: 12px;
            &__subTitle {
              color: grey;
              margin-right: 5px;
            }
          }
          .infoTitle {
            font-weight: 500;
            color: #0c203b;
          }
          .infoMessage {
            color: #0d47a1;
            font-weight: 600;
          }
          .divider {
            /* margin-top: 15px; */
            /* margin-bottom: 15px; */
            border-bottom: 1.5px solid rgb(237 237 237);
          }
          .titleBill {
            width: fit-content;
            display: flex;
            align-items: center;
            margin: 10px 0px;
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
        justify-content: flex-end;
        .button {
          &__btAll {
            font-size: 12px;
            border: 1px solid rgba(64, 123, 254, 1);
            background-color: rgba(64, 123, 254, 1);
            color: #fff;
            text-transform: capitalize;
            &:hover {
              color: rgba(64, 123, 254, 1);
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
            border: 1px solid #ec1313;
            background-color: #ec1313;
            color: #fff;
            margin-right: 10px;
            &:hover {
              color: #ec1313;
              background-color: #fff;
            }
          }
          .aproved {
            border: 1px solid #36a200;
            background-color: #36a200;
            color: #fff;
            &:hover {
              color: #36a200;
              background-color: #fff;
            }
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
