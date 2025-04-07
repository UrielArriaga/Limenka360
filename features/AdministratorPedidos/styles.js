import styled from "styled-components";

export const AdministratorPedidosStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;

  .main {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    height: calc(100% - 100px);
    padding: 15px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }

  .header {
    margin-bottom: 20px;

    .totalcounters {
      display: flex;
      margin-top: 6px;
      p {
        font-size: 14px;
        span {
          font-weight: bold;
          color: #333;
          margin-right: 5px;
        }
      }
    }
  }
`;
