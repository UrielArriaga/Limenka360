import styled from "styled-components";

export const ExecutivesStyled = styled.div`
  /* * {
    margin: 0;
    padding: 0;
  } */

  /* background-image: url("https://b24-0qdmjw.bitrix24.mx/bitrix/templates/bitrix24/themes/light/mysterious-vega/mysterious-vega.jpg"); */

  display: flex;
  height: 100vh;

  .main {
    width: calc(100% - 250px);
  }

  .sidebar {
    width: 250px;
    background-color: rgba(64, 122, 255, 0.9);
    /* border: 1px solid #ccc; */
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    .logo {
      display: flex;
      justify-content: center;
      padding: 20px;
      img {
        width: 170px;
      }
    }
  }
`;
