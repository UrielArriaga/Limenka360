import styled from "styled-components";

export const ListNotificationsStyled = styled.div`
  .notification {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    background-color: #fff;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    height: 700px;
    overflow-y: auto;
    width: 430px;

    &__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      .row {
        display: flex;
        align-items: flex-start;
      }
      p {
        font-size: 14px;
        font-weight: bold;
        margin-bottom: 30px;
      }
      &-goto {
        margin: 0;
        padding: 0;
        margin-left: 5px;
      }
      &-closebutton {
        margin: 0;
        padding: 0;
      }
    }

    &__body {
      margin-bottom: 30px;
    }

    &__response {
      margin-bottom: 30px;

      &-title {
        font-size: 12px;
        margin-bottom: 10px;
      }

      &-action {
        display: flex;
        justify-content: flex-end;

        button {
          margin-top: 10px;
          padding: 5px 10px;
          border-radius: 4px;
          background-color: #039be5;
          color: #fff;
          font-size: 12px;
          cursor: pointer;
          border: none;
        }
      }

      &-input {
        width: 100%;
        padding: 10px;
        border: 1px solid #9e9e9e;
        border-radius: 8px;
        font-size: 12px;
      }
    }

    &__item {
      margin-bottom: 30px;
      width: 94%;
      &-header {
        display: flex;
        align-items: flex-start;
        margin-bottom: 10px;

        .notification__avatar {
          width: 30px;
          height: 30px;
          margin-right: 6px;
        }

        .notification__author {
          margin-right: 10px;
          font-size: 12px;
        }

        .notification__date {
          font-size: 11px;
        }
      }
    }

    &__content {
      .notification__message {
        border: 1px solid #e0e0e0;
        padding: 14px 10px;
        border-radius: 8px;
        font-size: 12px;
        span {
          font-weight: 500;
        }
      }
    }

    &__button {
      padding: 10px;
      border-radius: 4px;

      &--secondary {
        background-color: #e0e0e0;
        color: #333;
      }
    }
  }
`;
