import { colors, customWidth, device } from "../global.styles";
import styled, { css } from "styled-components";
import { Grid, Drawer, Menu } from "@material-ui/core";

export const ProspectosStyled = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  overflow: hidden;
  background-size: cover;

  .btn_extraproduct {
    /* padding: 10px 15px; */
    height: 30px;
    text-transform: capitalize;
    border: 2px solid #103c82;
    color: #103c82;
    border-radius: 2px solid;
    font-size: 13px;
    border-radius: 10px;
    background: white;
    svg {
      width: 15px;
      height: 15px;
      border-radius: 50%;
      /* border: 1px solid #103c82; */
      padding: 2px;
      margin-right: 5px;
    }
    :hover {
      /* padding: 10px 15px; */
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      border-radius: 10px;
      /* margin-left: 5px; */
      svg {
        width: 15px;
        height: 15px;
        /* font-size: 25px; */
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 2px;
        margin-right: 5px;
      }
    }
  }

  .main {
    height: calc(100vh - 60px);

    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ctr_prospects {
    width: calc(100% - 30px);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    min-height: calc(100% - 50%);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    .head {
      &__title {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-bottom: 10px;
        svg {
          cursor: pointer;
          display: flex;
          align-items: center;
          font-size: 25px;
          border-radius: 50%;
          margin-left: 10px;
          background: #dce1f6;
          width: 30px;
          height: 30px;
          padding: 5px;
          transition: all 0.5s ease;
          &:hover {
            background: #0c203b;
            color: #fff;
          }
        }
      }
    }
    .divider {
      margin-top: 10px;
      margin-bottom: 10px;
      border-bottom: 2.5px solid #f3f3f3;
    }
    .tabs {
      button {
        cursor: pointer;
        border: none;
        outline: none;
        border-radius: 4px;
        width: 193px;
        height: 36px;
        background-color: #fff;
        border: 1px solid #e0e0e0;
        transition: all 0.4s ease-in-out;
        font-weight: bold;
        color: #5b759e;
        &:hover {
          border: 1px solid #103c82;
          font-weight: bold;
          color: #424242;
        }
      }

      .button_selected {
        background-color: rgb(48 63 159 / 9%);
        border-bottom: 2px solid #103c82;
        font-weight: bold;
        color: #103c82;
      }
    }

    .form {
      .item {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
        strong {
          color: red;
        }
      }
      .itemClient {
        margin-top: 14px;
      }
      .observationsContainer {
        display: flex;
        justify-content: space-between;
        width: 100%;
        &__left {
        }
        &__right {
          display: flex;
          align-items: center;
          &__button {
            background-color: #fff;
            color: #103c82;
            border: 1px solid #103c82;
            padding: 10px;
            border-radius: 8px;
            margin-left: 20px;
            margin-bottom: -30px;
          }
        }
      }
      .lockIcon {
        margin-left: 5px;
        margin-top: -5px;
        font-size: 20px;
        cursor: pointer;
      }
      .permit {
        color: #47d61d;
      }
      .denied {
        color: #d32f2f;
      }
      .alertRequest {
        display: flex;
        align-items: center;
        width: fit-content;
        border-radius: 8px;
        padding: 3px;

        &__title {
          font-size: 14px;
          color: #d32f2f;
          font-weight: 500;
        }
        &__icon {
          color: #d32f2f;
          font-size: 18px;
          margin-right: 8px;
        }
      }

      .input {
        margin-top: 10px;
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        color: #495057;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 10px 23px 9px 11px;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        &:focus {
          outline: none;

          box-shadow: 1px 1px 1px 1px rgb(120 90 248 / 25%);
        }
      }
      .textArea {
        margin-top: 10px;
        width: 100%;
        height: 80px;
        outline: none;
        padding: 10px 23px 9px 11px;
        background-color: #fff;
        border: 1px solid #ced4da;
        resize: none;
        font-size: 0.8125rem;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
          "Helvetica Neue", sans-serif;
      }
      .selectObservations {
        font-size: 0.8125rem;
        margin-top: 10px;
      }
      .disabled {
        background-color: #ecedee;
      }
      input[type="number"]::-webkit-inner-spin-button,
      input[type="number"]::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type="number"] {
        -moz-appearance: textfield;
      }
      .containerCommision {
        display: flex;
      }

      .input3 {
        padding: 10px 23px 9px 8px;
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        color: #495057;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        @media ${device.sm} {
          padding: 10px 23px 9px 38px;
        }
        &:focus {
          outline: none;

          box-shadow: 1px 1px 1px 1px rgb(120 90 248 / 25%);
        }
        input[type="number"]::-webkit-inner-spin-button,
        input[type="number"]::-webkit-outer-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        input[type="number"] {
          -moz-appearance: textfield;
        }
      }

      .inputcontainerAmount {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;
        margin-left: 3px;

        label {
          font-size: 14px;
          font-weight: bold;
        }
        .Amount {
          position: relative;
          display: flex;
          align-items: center;
          .inputAmount {
            padding: 10px 23px 9px 8px;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;

            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            background-color: rgba(16, 24, 40, 0.08);
            box-shadow: none;
            border-color: rgba(214, 219, 225, 0.5);
            @media ${device.sm} {
              padding: 10px 23px 9px 38px;
            }
            &:focus {
              outline: none;

              box-shadow: 1px 1px 1px 1px rgb(120 90 248 / 25%);
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }

            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
          .Etiqueta {
            display: none;
            @media ${device.sm} {
              display: flex;
              margin-bottom: 0px;
              margin-top: 0px;
              position: absolute;
              background: #eaebed;
              left: 1px;
              padding: 8px 11px 9px 11px;
              border-top-left-radius: 0.2rem;
              border-bottom-left-radius: 0.2rem;
            }
            .porcentain {
              color: #495057;
              font-size: 17px;
              font-weight: 500;
              margin-bottom: 0px;
              margin-top: 0px;
            }
          }
        }
      }
      .inputcontainer {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;
        margin-left: 3px;

        label {
          font-size: 14px;
          font-weight: bold;
        }
        .inputAmount {
          position: relative;
          display: flex;
          align-items: center;

          .Etiqueta {
            display: none;

            @media ${device.sm} {
              display: flex;
              margin-bottom: 0px;
              margin-top: 0px;
              position: absolute;
              background: #eff2f7;
              left: 1px;
              padding: 8px 11px 9px 11px;
              border-top-left-radius: 0.2rem;
              border-bottom-left-radius: 0.2rem;
            }
          }
          .button {
            display: none;

            @media ${device.sm} {
              display: flex;
              margin-bottom: 0px;
              margin-top: 0px;
              position: absolute;
              background: #eff2f7;
              right: 1px;
              padding: 8px 11px 9px 11px;
              border-top-left-radius: 0.2rem;
              border-bottom-left-radius: 0.2rem;

              &:hover {
                background-color: ${colors.primaryColor};
                color: #fff;
                cursor: pointer;
              }
            }
          }
          .input3 {
            padding: 10px 23px 9px 8px;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            @media ${device.sm} {
              padding: 10px 23px 9px 38px;
            }
            &:focus {
              border: 1px solid #046cbc63;
              outline: none;
              box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
          .porcentain {
            color: #495057;
            font-size: 17px;
            font-weight: 500;
            margin-bottom: 0px;
            margin-top: 0px;
          }
        }
      }

      .inputcontainerExtraCost {
        display: flex;
        flex-direction: column;
        width: 100%;
        margin-top: 10px;
        margin-left: 3px;

        label {
          font-size: 14px;
          font-weight: bold;
        }
        .inputAmount {
          position: relative;
          display: flex;
          align-items: center;

          .Etiqueta {
            display: none;

            @media ${device.sm} {
              display: flex;
              margin-bottom: 0px;
              margin-top: 0px;
              position: absolute;
              background: #eff2f7;
              left: 1px;
              padding: 8px 11px 9px 11px;
              border-top-left-radius: 0.2rem;
              border-bottom-left-radius: 0.2rem;
            }
          }
          .button {
            display: none;

            @media ${device.sm} {
              display: flex;
              margin-bottom: 0px;
              margin-top: 0px;
              position: absolute;
              background: #eff2f7;
              right: 1px;
              padding: 8px 11px 9px 11px;
              border-top-left-radius: 0.2rem;
              border-bottom-left-radius: 0.2rem;

              &:hover {
                background-color: ${colors.primaryColor};
                color: #fff;
                cursor: pointer;
              }
            }
          }
          .input3 {
            padding: 10px 23px 9px 70px;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            @media ${device.sm} {
              padding: 10px 23px 9px 70px;
            }
            &:focus {
              border: 1px solid #046cbc63;
              outline: none;
              box-shadow: 1px 1px 1px 1px rgb(0 0 0 / 10%);
            }
            input[type="number"]::-webkit-inner-spin-button,
            input[type="number"]::-webkit-outer-spin-button {
              -webkit-appearance: none;
              margin: 0;
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
          .porcentain {
            color: #495057;
            font-size: 17px;
            font-weight: 500;
            margin-bottom: 0px;
            margin-top: 0px;
          }
        }
      }
    }
    .preview {
      display: flex;
      justify-content: center;
    }
  }

  .actions-products {
    display: flex;
    justify-content: flex-end;
    margin: 20px 0px 10px 10px;
    button {
      /* padding: 10px 15px; */
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 13px;
      border-radius: 10px;
      background: white;
      margin: 2px;
    }
  }
  .ctr_buttons {
    display: flex;
    justify-content: end;
    .preview {
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 13px;
      border-radius: 10px;
      background: white;
      margin: 2px;
    }
    .btn_add {
      padding: 10px 15px;
      text-transform: capitalize;
      border: 2px solid #103c82;
      color: #103c82;
      border-radius: 2px solid;
      font-size: 13px;
      border-radius: 10px;
      background: white;
      svg {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #103c82;
        padding: 2px;
        margin-right: 5px;
      }
      :hover {
        padding: 10px 15px;
        text-transform: capitalize;
        background: #103c82;
        color: #fff;
        font-size: 13px;
        border-radius: 10px;
        margin-left: 5px;
        svg {
          width: 15px;
          height: 15px;
          /* font-size: 25px; */
          border-radius: 50%;
          border: 1px solid #fff;
          padding: 2px;
          margin-right: 5px;
        }
      }
    }

    .btn_generate {
      padding: 10px 15px;
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      border-radius: 10px;
      margin-left: 5px;

      svg {
        width: 15px;
        height: 15px;
        border-radius: 50%;
        border: 1px solid #fff;
        padding: 2px;
        margin-right: 5px;
      }
    }
  }
  .requiredAlert {
    color: red;
    position: relative;
  }
  .alert {
    position: fixed;
    top: 120px;
    width: 300px;
    right: 10px;
  }
`;

const scroll = css`
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
`;

export const TableProducts = styled.div`
  .totalcontainer {
    display: flex;
    justify-content: flex-end;
    /* background-color: red; */

    &__items {
      padding: 10px;
    }

    &__item {
      display: flex;

      .text {
        margin-right: 10px;
        width: 200px;
      }

      .bold {
        font-weight: bold;
      }
    }
  }
  overflow: auto;
  /* margin-top: 20px; */
  margin-bottom: 20px;
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 2.6px;
  border-radius: 9px;
  max-height: 70vh;

  table {
    width: 100%;
    border-spacing: 0;
    /* max-height: 70vh;
    overflow-x: auto; */
    transition: all 0.3s ease;
    ${scroll};
    /* box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px; */

    .ctr_table {
      border-spacing: 0;
      margin: auto;
      width: inherit;

      &__head {
        position: sticky;
        top: 0;
        z-index: 50;
        &__tr {
          background-color: #dce1f6;
          padding: 5px 10px;
          height: 40px;
          .fixed {
            /* position: sticky;
            left: 0;
            top: 0; */
            display: flex;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;
            background-color: #405189;
            color: #fff;
            min-width: 350px;
            height: inherit;
            .MuiFormControlLabel-root {
              margin-right: 5px;
            }
            @media (max-width: 600px) {
              min-width: 80px;
            }
          }
          .fix {
            position: sticky;
            left: 0;
            top: 0;
            background-color: #dce1f6;
          }
          .fixedlast {
            position: sticky;
            right: 0;
            top: 0;
            background: #dce1f6;
            flex-direction: row;
            align-items: center;
            padding: 3px 5px;

            min-width: 10px;
            height: inherit;
            width: 40px;
          }
          .title {
            text-transform: capitalize;
            padding: 0 10px;
            .ctr_title {
              display: flex;
              align-items: center;
              width: max-content;
              /* min-width: 150px; */
            }
          }
        }
      }
      &__body {
        .row {
          background: #fff;
          font-weight: bold;
          color: #2c2c2c;
          transition: all 0.3s ease;
          min-height: 50px;

          .fixed {
            position: sticky;
            left: 0;
            background: #fff;
            transition: all 0.3s ease;
          }

          .fixedlast {
            position: sticky;
            right: 0;
            background: #fff;
            transition: all 0.3s ease;
            svg {
              color: #103c82;
              &:hover {
                color: #a31c24;
              }
            }
          }
          .data {
            font-size: 14px;
            padding: 0 10px;
            cursor: pointer;
            .text {
              display: flex;
              align-items: center;
              svg {
                font-size: 14px;
                margin-right: 5px;
                color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
              }
            }
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;
            }
          }
          .dataDrag {
            font-size: 14px;
            padding: 0 10px;
            cursor: grab;
            .text {
              display: flex;
              align-items: center;
              svg {
                font-size: 14px;
                margin-right: 5px;
                color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#dce1f6")};
              }
            }
            .ctr_td {
              display: flex;
              align-items: center;
              min-height: 42px;
            }
          }
          .options-td {
            position: sticky;
            right: 0;
            background: #fff;
            transition: all 0.3s ease;
            .options {
              display: flex;
              align-items: center;
              justify-content: center;
              background: #405189;
              opacity: 0.6;
              border-radius: 4px;
              transition: all 0.3s ease;
              &:hover {
                cursor: pointer;
                opacity: 1;
              }
              svg {
                color: #fff;
              }
            }
          }
          &:hover {
            background: #d8dbe6;
            opacity: 0.8;
            color: #000;
            .fixed {
              background: #d8dbe6;
            }

            .fixedlast {
              background: #d8dbe6;
            }
            .options-td {
              background: #d8dbe6;
              .options {
                background: #2c3d72;
                opacity: 1;
              }
            }
          }
        }
        .inpar {
          background: #f3f3f3;
          .fixed {
            background: #f3f3f3;
          }
          .options-td {
            background: #f3f3f3;
          }
        }
      }
    }
  }
  .notFound {
    text-align: center;
    color: #8a8a8a;
    margin: 11px 0px 14px 0px;
  }
  .tfooter {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    &__ctr_button {
      margin-top: 10px;
      margin-bottom: 10px;
      .add_buton {
        text-transform: capitalize;
      }
    }
    &__ctr_pagination {
      display: flex;
      align-items: center;
      justify-content: space-around;
      &__pagination {
        display: flex;
        align-items: center;
        .before {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-right: 5px;
          margin-left: 10px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
        .next {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 30px;
          height: 30px;
          background: #f3f3f3;
          border-radius: 8px;
          margin-left: 5px;
          color: #0c203b;
          border: none;
          transition: all 0.2s ease;
          &:hover {
            cursor: pointer;
            background: #dce1f6;
          }
        }
      }
    }
  }
`;

export const InputsContainer = styled.div`
  margin-bottom: 20px;

  .inputLabel {
    display: flex;
    flex-direction: column;
    label {
      margin-bottom: 10px;
    }

    .keyword {
      outline: none;
      border: none;
      width: 40%;
      height: 40px;
      padding-left: 10px;
      border-radius: 4px;
      border: 1px solid #ced4da;
    }
  }
`;

export const FilterSection = styled.div`
  .form {
    height: 0px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 1s ease;
    * {
      visibility: hidden;
    }
  }
  .formactive {
    height: 100px;
    -webkit-transition: all 0.5s ease;
    -moz-transition: all 0.5s ease;
    -ms-transition: all 0.5s ease;
    -o-transition: all 0.5s ease;
    transition: all 1s ease;
  }
`;
export const ErrorFlag = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;

export const MenuContainer = styled(Menu)`
  .icon_item {
    color: #f97faa;
    margin-right: 5px;
  }
`;

export const MenuIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #405189;
  opacity: 0.6;
  border-radius: 4px;
  transition: all 0.3s ease;
  &:hover {
    cursor: pointer;
    opacity: 1;
  }
  svg {
    color: #fff;
  }
  .icon {
    color: #fff;
  }
`;

export const DrawerPermissions = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 400px;
    @media (max-width: 600px) {
      width: 100%;
    }
  }
  .contenedor {
    &__head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 5px;
      &__title {
        font-size: 22px;
      }
    }
    &__body {
    }
    &__footer {
    }
  }
`;
