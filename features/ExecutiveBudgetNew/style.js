import styled from "styled-components";

export const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  * {
    margin: 0;
  }

  // padding: 10px;

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .body {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }

  .col2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* 2 columnas del mismo tamaño */
    gap: 10px; /* Espacio entre los elementos */
  }
`;
