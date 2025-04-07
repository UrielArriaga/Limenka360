import styled from "styled-components";
import {  colors, device, zIndexHeader  } from "../../styles/global.styles";

export const DirLogRutasStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: calc(100vh - 50px);

 .header {
    position: sticky;
    top:0;
    @media ${device.sm}{
      display: flex;
    }
    align-items: center;
    padding: 20px 10px;
    z-index:${zIndexHeader};
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        color: #616161;
      }
    }

    &__filters {
      display: flex;
      align-items: center;

      .inputContainer {
        width: 300px;
        position: relative;
        margin-right: 10px;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
        }

        &__input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          height: 34px;
          margin-right: 20px;
          padding-left: 30px;
        }

        &__clean {
          position: absolute;
          font-size: 16px;
          top: 6px;
          right: 5px;
          color: #ccc;
          padding: 0;
          margin: 0;
          color: #059be5;
        }
      }
    }
    .button_Entries{
      width: 66%;
      text-align: end;
      justify-content: flex-end;
      display: flex;
    .button{
      text-transform: capitalize;
      background-color: #059be5;
      color: white;
      font-weight: 600;
      padding: 4px;
      border-radius: 4px;
    }
    }
  }
  .main {
    flex: 1;
    overflow-y: scroll;
    display: flex;
    flex-direction: column;
    @media ${device.sm} {
      overflow-y: hidden;
    }
    .table {
      flex: 1;
      overflow-y: auto;
      max-height: calc(100vh - 160px);
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #585858;
      }
    }
    .list-container {
      flex: 1; /* Ocupa todo el espacio vertical disponible */
      overflow-y: auto; /* Agrega barra de desplazamiento vertical según sea necesario */
    }

    .preview {
      background: #f9f9fb;
      border: 1px solid #ccc;
      overflow-y: auto; /* Agrega barra de desplazamiento vertical según sea necesario */
      padding: 20px; /* Ajusta el padding según necesidad */
    }
  }
`;
