import styled from "styled-components";
import { customWidth } from "../global.styles";
export const AdministracionStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .container {
    width: calc(100% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;
    padding: 10px;
  }
`;
