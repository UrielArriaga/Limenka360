import styled, { keyframes } from "styled-components";

export const PreviewOutPutStyled = styled.div`
  width: 100%;

  .list {
    height: calc(-197px + 100vh);
    width: 100%;
    overflow: hidden auto;
  }

  .list::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  .list::-webkit-scrollbar-track {
    background: #e0e0e0; /* Color de fondo del track del scrollbar */
    border-radius: 0px;
  }

  .list::-webkit-scrollbar-thumb {
    background-color: #a0a0a0; /* Color del scrollbar */
    border-radius: 0px;
    border: 0px solid #e0e0e0; /* Espacio entre el scrollbar y el track */
  }

  .title {
    text-transform: capitalize;
    color: #034d6f;
    font-weight: 500;
    margin-bottom: 4px;
  }

  .mi-div {
    background-color: #fff;
    border-bottom: 1px solid #ebeaf2;
    padding: 10px;
    padding-left: 20px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    font-size: 13px;
  }

  .mi-div-select {
    background-color: #f1f1fa;
    border-bottom: 1px solid #ebeaf2;
    padding: 10px;
    padding-left: 20px;
    transition: background-color 0.3s ease;
    cursor: pointer;
    font-size: 13px;
  }

  .mi-div:hover {
    background-color: #f0f0f0; /* Color de fondo al hacer hover */
  }

  .grid-container {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
  }

  .grid-container p {
    color: #757575;

    line-height: 1.5;
    /* otros estilos que necesites */
  }

  .headerpreview {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    .concept {
      font-weight: bold;
    }

    .headerpreview__listactions {
      display: flex;
      align-items: center;

      &--item {
        display: flex;
        align-items: center;
        padding: 0 10px;
        cursor: pointer;
        color: #616161;

        .button {
          background-color: #f9f9fb;
          color: #616161;
          border: 1px solid #ccc;
          border-radius: 5px;
        }
      }
    }
  }

  .actions {
    display: flex;

    height: 50px;
    background-color: #f9f9fb;

    &__item {
      display: flex;
      align-items: center;
      padding: 0 10px;
      cursor: pointer;
      color: #616161;
    }
  }
`;

export const bounce = keyframes`
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
`;

export const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 40px;

  border: 1px solid #ccc;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  margin: 0 5px;
  background-color: #333;
  border-radius: 50%;
  display: inline-block;
  animation: ${bounce} 1.4s infinite ease-in-out both;

  &:nth-child(1) {
    animation-delay: -0.32s;
  }
  &:nth-child(2) {
    animation-delay: -0.16s;
  }
`;
