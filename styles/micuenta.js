import styled from "styled-components";

export const Contenedor = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  object-fit: cover;
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 30px;
  }

  .title__button {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border-width: 0px;
    background-color: #0d47a1;
    color: white;
    transition: 0.3s;
    :hover {
      background-color: #0c203b;
      cursor: pointer;
    }
  }

  .title__text {
    margin-top: -3px;
    margin-left: 10px;
    font-size: 30px;
    font-weight: 500;
  }

  .box {
    display: flex;
    flex-direction: column;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;
    height: calc(100vh - 60px);
    .contenido {
      width: calc(100% - 35px);
      margin: auto;
      margin-top: 25px;
      margin-bottom: 20px;
      height: fit-content;
      padding: 30px 30px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    }
  }

  .box--blue {
    display: flex;
    width: 100%;
    justify-content: center;
    margin-bottom: 30px;
    .button {
      width: 100%;
      margin: 10px 0px;
    }
    .item {
      width: 100%;
    }
  }

  .view {
    padding: 20px;
  }

  .btn {
    height: 24px;
    margin-right: 3px;
    padding: 5px;
    background-color: white;
    border-width: 0px;
    border-radius: 4px 4px 0px 0px;
  }

  .contenedorForm {
    margin-top: 5px;
  }

  @keyframes dispel {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

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

  .formButtons {
    display: flex;
    justify-content: right;
    margin-top: 50px;
    margin-bottom: 15px;

    button {
      margin: 5px;
    }
  }

  .formButtons__root {
    display: flex;
    align-items: center;
  }

  .formButtons__wrapper {
    position: relative;
  }

  .formButtons__button {
    height: 30px;
  }

  .formButtons__progress {
    color: blue;
    position: absolute;
    top: 20%;
    left: 45%;
  }

  .permisos {
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;

    margin-top: 35px;
    margin-bottom: 35px;
    p {
      margin-bottom: 5px;
    }
  }

  .permisos__permiso {
    margin: 10px;
    margin-top: 30px;
  }

  .permisos__select {
    width: 100%;
    height: 35px;
    border: 0.1px solid rgb(180 180 180);
    border-radius: 3px;
    color: #000;
    font-size: 0.8125rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 0.47rem 0.75rem;
  }
`;
