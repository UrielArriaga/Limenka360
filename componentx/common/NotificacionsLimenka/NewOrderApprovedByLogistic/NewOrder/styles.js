import styled from "styled-components";

export const NewCommentStyled = styled.div`
  .msg-container {
    margin-bottom: 20px;
    background-color: #f7f7f7;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    border-left: 3px solid #193364;
    border-bottom: 3px solid #193364;
    border-right: 1px solid #eeeeee;
    border-top: 1px solid #eeeeee;
    background-color: #fff;
    padding: 10px;
    margin-bottom: 20px;
    width: 380px;

    &__title {
      margin-bottom: 10px;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      p {
        font-size: 14px;
      }

      span {
        font-weight: bold;
        color: #3aade6;
      }

      &-close {
        padding: 0;
        margin: 0;
        color: #3aade6;
      }
    }

    &__content {
      .message {
        font-size: 12px;
        span {
          font-weight: 500;
        }
      }
      .createdat {
        margin-top: 4px;
        font-size: 12px;
        color: #757575;
      }
    }

    &__actions {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
      button {
        padding: 5px 10px;
        border-radius: 0.5rem;
        font-size: 12px;
        font-weight: 500;
        cursor: pointer;
      }
      .btn-primary {
        background-color: #3aade6;
        color: #fff;
        border: none;
        font-size: 11px;
      }
      .btn-secondary {
        background-color: #f7f7f7;
        color: #3aade6;
        border: 1px solid #3aade6;
        font-size: 11px;
      }
    }
  }

  .msg-container-comments {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: red;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1rem;
    height: 700px;
    width: 430px;
    &__title {
      p {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
`;
