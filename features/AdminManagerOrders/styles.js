import styled from "styled-components";
import { colors, zIndexHeader } from "../../styles/global.styles";

export const AdminManagerOrdersStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    padding: 20px 10px;
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
        width: 500px;
        position: relative;
        margin-right: 10px;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
        }

        &__select {
          /* width: 100%; */
          /* padding: 10px; */
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          top: 0;
          width: 130px;
          top: 5px;
          /* height: 100%; */
          height: 24px;
          right: 10px;
          /* margin-right: 20px; */
          /* padding-left: 30px; */
          position: absolute;
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
          right: 13px;
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

  .containertable {
    height: ${({ isFilterActive }) => (isFilterActive ? "calc(100vh - 140px)" : "calc(100vh - 120px)")};
    overflow: auto;
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

  .btn-flotante {
    font-size: 12px; /* Cambiar el tamaño de la tipografia */
    text-transform: uppercase; /* Texto en mayusculas */
    font-weight: bold; /* Fuente en negrita o bold */
    color: #ffffff; /* Color del texto */
    border-radius: 5px; /* Borde del boton */
    letter-spacing: 1px; /* Espacio entre letras */
    background-color: #21263c; /* Color de fondo */
    padding: 13px 22px; /* Relleno del boton */
    position: fixed;
    bottom: 40px;
    right: 40px;
    transition: all 300ms ease 0ms;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    z-index: 99;
  }
  .btn-flotante:hover {
    background-color: #2c2fa5; /* Color de fondo al pasar el cursor */
    box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.3);
    transform: translateY(-7px);
  }
  @media only screen and (max-width: 600px) {
    .btn-flotante {
      font-size: 10px;
      padding: 12px 20px;
      bottom: 20px;
      right: 20px;
    }
  }

  /* width: 100%;
  display: flex;
  overflow: hidden;

  height: 100vh;
  * {
    margin: 0;
  }

  .content_orders {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 15px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
    }
    &__body {
      .title_orders {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        .title {
          font-size: 24px;
          font-weight: 500;
        }
        .count_orders {
          display: flex;
          align-items: center;
          .count {
            font-size: 14px;
            font-weight: 500;
            margin-right: 5px;
          }
          .title_count {
            font-size: 14px;
            font-weight: 500;
            margin-right: 10px;
          }
          .icon_reload {
            cursor: pointer;
            font-size: 18px;
            margin-bottom: -3px;
            color: ${colors.primaryColorDark};
          }
        }
      }
      .container_cards {
        margin-bottom: 20px;
      }
      .box_search {
        margin-bottom: 10px;
        border: 1px solid #d4d4d4;
        padding: 2px;
        border-radius: 5px;
        font-size: 15px;
        svg {
          color: grey;
          margin: 0px 10px;
        }
      }
      .order_filters {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        .section_order {
          display: flex;
          align-items: center;
          margin-right: 5px;
          .title_orderBy {
            font-size: 14px;
            margin-right: 5px;
          }
          .order_data {
            font-size: 12px;
            height: 25px;
            border-radius: 8px;
            outline: none;
          }
        }
      }
    }
    &__footer {
    }
  } */
`;
