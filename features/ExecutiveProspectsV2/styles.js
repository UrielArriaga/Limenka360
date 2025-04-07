import styled from "styled-components";
import { zIndexHeader } from "../../styles/global.styles";

export const ExecutiveProspectsStyled = styled.div`
  /* background-image: url("https://b24-0qdmjw.bitrix24.mx/bitrix/templates/bitrix24/themes/light/mysterious-vega/mysterious-vega.jpg"); */
  display: flex;
  flex-direction: column;
  overflow: hidden;
  /* padding: 20px; */

  background-color: #ecf0f2;

  * {
    margin: 0;
    padding: 0;
  }
  .header {
    position: sticky;
    top: 0;
    /* background-color: #ffffff; */
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    padding: 20px 10px;
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;
      /* color: #fff; */
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

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        padding: 8px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }

  .main {
    flex: 1;
    overflow-y: auto;
    display: flex;
  }
`;

export const Container = styled.div`
  /* background-color: #eff1f3; */
  height: 100vh;
  padding: 20px;
  /* width: 700px; */

  .board {
    display: flex;
    overflow-x: auto;
    display: flex;
    overflow-x: auto; /* Permite el scroll horizontal */
    white-space: nowrap; /* Evit
    /* border: 1px solid red; */
    /* overflow: scroll; */
    /* border: 1px solid blue; */
  }

  .columnheader {
    padding: 8px;
    background-color: #f8f9fa;
    border-radius: 4px;
    margin-bottom: 8px;
    width: 98%;
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h2 {
      font-size: 16px;
      font-weight: bold;
      margin-bottom: 8px;
      text-transform: capitalize;
    }

    .row {
      display: flex;
      align-items: center;

      p {
        margin-right: 5px;
        color: #616161;
      }
    }
  }
  .column {
    margin-right: 10px;
    /* margin: 0 8px;
    padding: 16px;
    background-color: #f8f9fa;
    border-radius: 4px;
    width: 320px;
    height: 600px; */
    /* overflow-y: scroll; */
    position: relative;
  }

  .comumnIitems {
    margin: 0 8px;
    /* padding: 16px; */
    /* background-color: #f8f9fa; */
    border-radius: 4px;
    width: 320px;
    height: 600px;
    overflow-y: scroll;
    /* position: relative; */

    ::-webkit-scrollbar {
      width: 0px; /* Ancho de la barra de scroll */
    }

    /* Estilo para el track (fondo de la barra de scroll) */
    ::-webkit-scrollbar-track {
      background: #e1e1e1; /* Color de fondo del track */
      border-radius: 10px;
    }

    /* Estilo para el thumb (la parte que se arrastra del scroll) */
    ::-webkit-scrollbar-thumb {
      background-color: #888; /* Color del thumb */
      border-radius: 10px;
      border: 2px solid #e1e1e1; /* Espacio alrededor del thumb */
    }

    /* Estilo al hacer hover en el thumb */
    ::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* Cambia de color al pasar el ratón por encima */
    }

    /* Scrollbar estilo para Firefox */
    .comumnIitems {
      scrollbar-width: thin; /* Ancho del scrollbar */
      scrollbar-color: #888 #e1e1e1; /* thumb color | track color */
    }
  }
  .fethingdata {
    position: absolute; /* Se posiciona relativo al contenedor */
    background-color: rgba(83, 135, 255, 0.8);
    width: 100%;
    bottom: 0; /* Fijado al fondo del contenedor */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    .message {
      color: #fff;
      text-align: center;
      font-weight: bold;
    }
  }
  .item-list {
    /* min-height: 100px; */
  }

  .item {
    /* padding: 8px; */
    /* border: 1px solid #ddd; */
    /* margin-bottom: 8px;
    background-color: #ffffff;
    border-radius: 4px;
    text-align: center;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1); */
  }
`;
