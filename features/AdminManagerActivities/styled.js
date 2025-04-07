import styled from "styled-components";
import { zIndexHeader } from "../../styles/global.styles";

export const ActivitiesStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    justify-content: space-between;
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    padding: 20px 10px;
    .head {
      display: flex;
      align-items: center;
    }
    .close {
      cursor: pointer;
      color: #757575;
      font-weight: 600;
    }
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
          right: 17px;
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
    width: 100%;
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
    cursor: pointer;
  }
  @media only screen and (max-width: 600px) {
    .btn-flotante {
      font-size: 10px;
      padding: 12px 20px;
      bottom: 20px;
      right: 20px;
    }
  }
`;

export const DialogContainer = styled.div`
  P {
    margin: 0;
  }
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.6s ease;
  .headerDialog {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 20px;
    background: #0c203b;
    margin-bottom: 15px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
      letter-spacing: 0.05em;
    }
    &__loader {
      color: #fff;
    }
  }
  .title {
    font-size: 18px;
    color: gray;
    margin-top: 10px;
    margin-bottom: 30px;
  }
  .ctr_inputs {
    padding: 0 20px 20px 20px;
    &__label {
      font-size: 12px;
      font-weight: bold;
      color: #4f4f4f;
    }
    &__input {
      width: 100%;
      padding: 5px 0;
      border: none;
      border-bottom: 1.5px solid #ccc;
      transition: all 0.3s ease;
      font-size: 16px;
      min-height: 36px;
      resize: none;
      padding: 0px 5px;
      &:focus {
        outline: none;
        border: none;
        transition: all 0.3s ease;

        border-bottom: 1.5px solid #0d0d0d;
      }
    }
    .error {
      border-bottom: 1.5px solid #f50f;
    }
    &__span_error {
      height: 16px;
      font-weight: bold;
      letter-spacing: 0.05em;
      font-size: 10px;
      color: #f50;
      margin-top: 5px;
    }
  }
  .ctr_buttons {
    display: flex;
    padding: 0 20px;
    padding-bottom: 20px;
    justify-content: flex-end;
    .btn_cancel {
      margin-right: 10px;
      text-transform: capitalize;
      background: #0d0d0d;
      color: #fff;
    }
    .btn_upload {
      text-transform: capitalize;
      background: #0c203b;
      color: #fff;
    }
    .disabled {
      background: grey;
      color: #fff;
      &:hover {
        cursor: default;
      }
    }
  }
  .ctr_slope {
    padding: 20px;
    &__title {
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.03em;
      margin-bottom: 10px;
      span {
        color: #0c203b;
      }
    }
    &__item {
      width: 100%;
      .label {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 12px;
        letter-spacing: 0.02em;
        color: #626262;
        svg {
          display: flex;
          align-items: center;
          font-size: 14px;
          margin-right: 5px;
          color: #115293;
        }
      }
      .text {
        color: #000;
        font-weight: 600;
      }
      .span {
        color: #c7c7c7;
        font-size: 14px;
        font-weight: 500;
      }
    }
    &__ctr_buttons {
      display: flex;
      justify-content: flex-end;
      margin-top: 20px;
      .btn_close {
        text-transform: capitalize;
        background-color: #000;
        color: #fff;
        margin-right: 10px;
      }
      .btn_complete {
        text-transform: capitalize;
        background: #0c203b;
        color: #fff;
      }
    }
  }
`;
export const TrackingsStyled = styled.div`
  margin: 0;
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
          right: 150px;
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
  .buttonexport {
    background-color: #405189;
    color: white;
    border-radius: 5px;
    padding: 5px 10px;
    margin-left: 10px;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.4s ease;
    &:hover {
      background-color: #3a4d7d;
    }
  }

  .chip + .chip {
    margin-left: 0.5em;
  }
  .rowheader {
    display: flex;
    justify-content: space-between;
  }
  .ctr_filter {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: space-between;
    &__ctr_input {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      position: relative;
      margin-bottom: 10px;
      .inputText {
        width: 100%;
        height: 40px;
        input {
          padding-left: 40px;
          padding-right: 70px;
        }
      }
      .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
        border-radius: 10px;
      }
      .search {
        width: 30px;
        height: 30px;
        padding: 5px;
        color: #8a8a8a;
        transition: all 0.4s ease;
        position: absolute;
        left: 10px;
      }
      .ctr_filters {
        display: flex;
        align-items: center;
        position: absolute;
        right: 10px;
        color: #8a8a8a;
        cursor: pointer;
        .filters {
          width: 30px;
          height: 30px;
          padding: 5px;
          transition: all 0.4s ease;
        }
        .text {
          font-size: 12px;
        }
        &:hover .filters {
          padding: 3px;
        }
      }
    }
  }
  .container_trackins {
    padding: 5px;
    .filter {
      display: flex;
      justify-content: end;
      margin-bottom: 9px;

      &__range {
        display: flex;
      }
      &__date {
        margin-right: 5px;
        font-size: 11px;

        label {
          margin-right: 5px;
        }
      }
      &__period {
        padding: 4px;
        border: 1.6px solid #103c82;
        border-radius: 8px;
        outline: none;
      }
    }
    .filters {
      display: flex;
      margin: 0 10px 0 10px;
    }
    .filters_manager {
      display: flex;

      svg {
        color: rgb(138, 138, 138);
      }
      p {
        color: rgb(138, 138, 138);
      }
    }
  }
  .pagination_trakings {
    display: flex;
    justify-content: end;
    margin-top: 8px;

    &__total {
      font-weight: bold;
    }
  }
  .titletactities {
    margin-bottom: 15px;
  }
  .inputdate {
    height: 30px;
    width: 200px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 8px;
    margin-top: 0px;
    background-color: #ffff;
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
  }
  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    &__img {
      width: 300px;
      animation: slide 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }
`;
