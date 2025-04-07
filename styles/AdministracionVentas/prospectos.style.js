import styled from "styled-components";
import { customWidth } from "../global.styles";
export const ProspectosAdmiStyles = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    width: calc(100% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;
  }
  .container_prospects {
    width: calc(100% - 30px);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    min-height: calc(100% - 50%);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__head {
      .title {
        font-size: 22px;
        font-weight: 500;
      }
      .containerData {
        display: flex;
        align-items: center;
        margin-top: 2px;
        .iconPeople {
          font-size: 18px;
          margin-right: 3px;
          color: #3f51b5;
        }
        .iconReload {
          font-size: 25px;
          transition: 0.3s;
          &:hover {
            color: #3f51b5;
            cursor: pointer;
            rotate: -120deg;
          }
        }
        .title {
          margin-right: 10px;
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
`;
