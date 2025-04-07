import styled from "styled-components";

export const MiCuentaStyled = styled.div`
  .input {
    color: #000;
    font-weight: 550;
    padding-top: 1px;
    margin-top: 5px;
  }

  .input--no-margin-right {
    padding-top: 1px;
    margin-top: 5px;
  }

  .input__text {
    height: 15px;
    margin-top: 9px;
    margin-bottom: 6px;
    margin-left: 6px;
  }

  .input__textError {
    color: red;
  }

  .input__input {
    width: 100%;
    height: 35px;
    border: 0.1px solid rgb(180 180 180);
    border-radius: 10px;
    color: #000;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.47rem 0.75rem;
    margin-top: 5px;
  }
  .input__color {
    height: 30px;
    padding: 2px;
    border: 0.1px solid rgb(180 180 180);
    margin-top: 5px;
    line-height: 1.5;
    border-radius: 5px;
    &:hover {
      cursor: pointer;
    }
  }
  .photo {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 30px;
    &__label {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;
      text-align: center;
      padding: 40px;
      margin-bottom: 10px;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      transition: 0.3s;
      &:hover {
        /* -webkit-filter: blur(2px); */
        cursor: pointer;
        &__photoFooter {
          z-index: 0;
        }
      }
    }
    .active {
      &:hover {
        -webkit-filter: blur(2px);
      }
    }
    &__buttonUploadImage {
      margin-bottom: 10px;
    }
    &__buttonDeleteImage {
    }
    &__photoFooter {
      position: fixed;
      color: red;
      color: black;
      font-size: 40px;
      text-align: center;
      margin-top: 100px;
      z-index: -1;
      transition: 0.2s;
      font-weight: bold;
    }
  }

  .photo__img {
    width: 150px;
    height: 150px;
    object-fit: contain;
  }

  .photo__icon {
    font-size: 90px;
  }

  .photo__input {
    display: none;
  }
`;
