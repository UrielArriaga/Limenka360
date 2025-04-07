import styled from "styled-components";
import { device } from "../../../../styles/global.styles";

export const DialogModify = styled.div`
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background-color: #103c82;
    color: #fff;
    font-size: 20px;
    font-weight: 500;
    margin-bottom: -20px;
    position: sticky;
    top: 0;
    &__loader {
      color: #fff;
    }
  }
  .dialogContainer {
    &__item {
      margin-top: 20px;
      &__header {
        display: flex;
        align-items: center;
        &__icon {
          color: grey;
          margin-right: 4px;
          font-size: 15px;
        }
        &__title {
          font-size: 14px;
          color: grey;
        }
        &__titleAlert {
          font-size: 14px;
          color: red;
          font-weight: 500;
        }
      }
      &__content {
        font-weight: 500;
        color: black;
        font-size: 15px;
      }
      &__contentAccept {
        font-weight: 500;

        font-size: 15px;
        margin-top: 9px;
      }
      &__select {
        font-weight: 500;
        color: black;
        font-size: 15px;
        margin-top: 2px;
      }
      &__select__value-container {
        height: 15px;
      }

      &__textArea {
        width: 100%;
        resize: none;
        outline: none;
        border-radius: 5px;
        margin-top: 5px;
        padding: 5px;
        height: 100px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
    }
    &__buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
      .disabled {
        background-color: grey;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__cancel {
        color: #fff;
        text-transform: capitalize;
        border: 2px solid #103c82;
        color: #103c82;
        border-radius: 2px solid;
        font-size: 14px;
        border-radius: 10px;
        background: white;
        margin-right: 11px;
        cursor: pointer;
        padding: 8px;
      }
      &__acept {
        text-transform: capitalize;
        border: 2px solid;
        font-size: 14px;
        border-radius: 10px;
        color: #fff;
        background-color: #103c82;
        padding: 8px;

        &:hover {
          text-transform: capitalize;
          border: 2px solid #103c82;
          color: #103c82;
          font-size: 14px;
          border-radius: 10px;
          background: white;
          cursor: pointer;
          padding: 8px;
        }
      }

      .disabled {
        background-color: grey;
        padding: 8px;
        &:hover {
          background-color: grey;
          color: #fff;
          cursor: none;
        }
      }
      &__loader {
      }
    }
    .restore {
      margin-top: 35px;
    }
  }

  .containerBody {
    padding: 0px 20px 20px 20px;
    margin-top: 20px;
    .link {
      cursor: pointer;
      :hover {
        color: blue;
      }
    }
    .row {
      display: flex;
      align-items: center;
      margin-top: 9px;

      svg {
        color: grey;
        margin-right: 4px;
        font-size: 15px;
      }
      p {
        font-size: 14px;
        color: grey;
      }
    }

    .content {
      font-weight: 500;
      color: black;
      font-size: 15px;
    }

    .buttons {
      margin-top: 30px;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 17px;
    }
  }

  select {
    font-weight: 500;
    color: black;
    font-size: 15px;
    margin-top: 2px;
  }
  .input {
    background-clip: padding-box;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    color: #495057;
    display: block;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.47rem 0.75rem;
    width: 100%;
    height: 40px;
    border: 2px solid #f3f3f3;
    color: #000;
  }
`;
export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: red;
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;
  margin-left: 5px;
  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
