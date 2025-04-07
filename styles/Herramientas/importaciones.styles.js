import styled from "styled-components";
import { device } from "../global.styles";

export const ImportacionesStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }

  .side {
    width: 28%;
    outline: 1px solid red;
    @media ${device.md} {
      width: 25%;
      outline: 1px solid green;
    }
    @media ${device.lg} {
      width: 35%;
      outline: 1px solid purple;
    }

    @media ${device.xl} {
      width: 20%;
      outline: 1px solid orange;
    }

    @media ${device.xll} {
      width: 20%;
      outline: 1px solid blue;
    }
  }

  .main_container {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .content_import {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      &__table {
        padding: 20px;
      }
      // TODO  DRAG SECTION

      &__row {
        display: flex;
        padding: 10px;
        width: 100%;
        &__dragsection {
          border: 3px dashed #616161;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          margin: 20px;
          width: 100%;
          border-radius: 2px;

          svg {
            font-size: 90px;
          }
        }

        &__dragsectionactive {
          border: 3px dashed #2962ff;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 300px;
          margin: 20px;
          width: 100%;
          border-radius: 2px;

          background-color: rgba(41, 98, 255, 0.4);
          svg {
            font-size: 90px;
          }
        }
      }

      &__actions {
        display: flex;
        justify-content: flex-end;
      }
    }
  }
`;

export const Divider = styled.div`
  height: ${({ h }) => (h ? `${h}px` : "10px")};
`;
