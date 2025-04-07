import styled, { css } from "styled-components";

import { Grid, Drawer, Menu, withStyles, Switch } from "@material-ui/core";
import { device, colors } from "./global.styles";
export const PedidosStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  height: 100%;
  background-position: bottom center;
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://crm.salesup.com/img/color-azul.jpg");
  height: 100vh;

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .head {
      display: flex;
      align-items: center;
      margin-block-end: 1%;
      h1 {
        color: #fff;
      }

      &__title {
        display: flex;
        align-items: center;

        svg {
          font-size: 30px;
          color: #fff;
          border: 1px solid #fff;
          margin-left: 20px;
          border-radius: 50%;
        }
      }
    }

    .main_orders {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background-color: rgba(255, 255, 255, 0.85);
      border-radius: 8px;
      box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
      .primarySales {
        display: flex;
        align-items: center;
        margin: 15px 0px 15px 0px;
        .icon_primary {
          width: 30px;
          height: 30px;
          padding: 5px;

          background: #dce1f6;
          color: #103c82;
          border-radius: 50%;
        }
        p {
          font-size: 18px;
          letter-spacing: 0.04em;
          font-weight: 600;

          color: rgb(86 86 86);
        }
        .title {
          font-size: 18px;
          letter-spacing: 0.04em;
          font-weight: 600;
          color: rgb(86 86 86);
        }
      }
      .primary {
        display: flex;
        align-items: center;
        margin: 15px 0px 3px 0px;
        .icon_primary {
          width: 30px;
          height: 30px;
          padding: 5px;

          background: #dce1f6;
          color: #103c82;
          border-radius: 50%;
        }
        .title {
          font-size: 18px;
          letter-spacing: 0.04em;
          font-weight: 500;
          color: rgb(86 86 86);
        }
      }
      .formSales {
        background-color: rgba(255, 255, 255, 0.85);
        border-radius: 8px;
        box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
        margin: 15px 0px 15px 0px;
        .items {
          display: flex;
          align-content: center;
          flex-direction: column;
          font-size: 15px;
          width: auto;
          padding: 14px 14px 14px 10px;
          .label {
            margin-bottom: 2px;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 1px;
            color: rgb(86 86 86);
          }
          .paragraph {
            font-weight: 600;
          }
        }
        .show {
          padding: 0px 14px 14px 10px;
          cursor: pointer;
          color: #3f51b5;
        }
      }
      .form {
        .ContentTitleandAlert {
          display: flex;
        }
        .order {
          display: flex;
          align-items: center;
        }
        .item {
          display: flex;
          align-content: center;
          flex-direction: column;
          font-size: 15px;
          width: auto;
          padding: 5px 9px;

          .input {
            background-clip: padding-box;
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            color: #495057;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 0.47rem 0.75rem;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            min-height: 38px;
          }
          .inputDisabled {
            background-clip: padding-box;
            background-color: #f3f3f3;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            color: #495057;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 0.47rem 0.75rem;
            -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            min-height: 38px;
          }

          input[type="number"]::-webkit-inner-spin-button,
          input[type="number"]::-webkit-outer-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }

          input[type="number"] {
            -moz-appearance: textfield;
          }

          p {
            margin-bottom: 2px;
            font-size: 14px;
            margin-top: 5px;
            margin-bottom: 10px;
            font-weight: 600;
            letter-spacing: 1px;
            color: rgb(86 86 86);
          }
          strong {
            color: red;
          }
          .select-options-fixed {
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            z-index: 60;
          }
        }
        .primary {
          display: flex;
          align-items: center;
          .icon_primary {
            width: 30px;
            height: 30px;
            padding: 5px;

            background: #dce1f6;
            color: #103c82;
            border-radius: 50%;
          }
          p {
            font-size: 18px;
            letter-spacing: 0.04em;
            font-weight: 600;

            color: rgb(86 86 86);
          }
        }
        .shipping {
          display: flex;
          align-items: center;
          padding: 0px 9px;

          p {
            margin: 0;
            font-weight: 600;
            color: rgb(86 86 86);
          }
        }
        .addDirection {
          display: flex;
          align-items: end;
          justify-content: end;
          margin-top: 6px;
        }
        .containerCards {
          display: -webkit-box;
          overflow-x: auto;
          padding: 8px 0px 8px 0px;
          ::-webkit-scrollbar {
            width: 4px;
            height: 4px;
          }
          ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
          }
          ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 20px #585858;
          }
        }
        .divider {
          margin-top: 10px;
          margin-bottom: 10px;
          border-bottom: 1.5px solid #f3f3f3;
        }
        .actions {
          display: flex;
          justify-content: end;
          align-items: center;
          .btn_generate {
            padding: 10px 15px;
            text-transform: capitalize;
            background: #103c82;
            color: #fff;
            font-size: 13px;
            border-radius: 10px;
            margin-left: 5px;
          }
          .btn_salir {
            text-transform: capitalize;
            border: 2px solid #103c82;
            color: #103c82;
            border-radius: 2px solid;
            font-size: 13px;
            border-radius: 10px;
            background: white;
            margin: 2px;
            font-size: 13px;
            border-radius: 10px;
            margin-left: 5px;
            padding: 10px 15px;
          }
        }
        .ButtonShipping {
          padding: 0px 9px;
          .btn_direction {
            text-transform: capitalize;
            border: 2px solid #103c82;
            color: #103c82;
            border-radius: 2px solid;
            font-size: 13px;
            border-radius: 10px;
            background: white;
            /* margin: 2px; */
            margin-top: 9px;
            margin-bottom: 9px;
          }
        }
      }
    }
    .point {
      width: 0;
      height: 0;
      border-top: 13px solid transparent;
      border-bottom: 13px solid transparent;
      border-right: 13px solid rgba(241, 113, 113, 0.9);
      height: 27px;
      float: left;
    }
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
export const scroll = css`
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
export const MenuContainer = styled(Menu)`
  .icon_item {
    color: #f97faa;
    margin-right: 5px;
  }
`;

export const Error = styled.div`
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
export const PurpleSwitch = withStyles({
  switchBase: {
    "&$checked": {
      color: "#103c82",
    },
    "&$checked + $track": {
      backgroundColor: "#6b8ec5",
    },
  },
  checked: {},
  track: {},
})(Switch);
export const CardTemplate = styled.div`
  width: 100%;
  margin: 5px;
  padding: 7px;
  border: 1px solid #ecedf2;
  background: #fefefe;
  border-radius: 15px;
  box-shadow: 1px 2px 6px rgb(64 79 104 / 25%);
  @media ${device.sm} {
    width: 38%;
  }
  @media ${device.md} {
    width: 28%;
  }
  .contentTitle {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .title {
    font-size: 16px;
    color: #388dd9;
    font-weight: bold;
  }
  .item {
    font-size: 15px;
    color: #757575;
    margin-bottom: 2px;
    margin-left: 11px;
  }
  .items {
    display: flex;
    align-items: center;
    justify-content: center;
    .iconStatus {
      color: #3f51b5;
      font-size: 16px;
    }
    .date {
      font-size: 12px;
      font-weight: bold;
      color: #0c203b;
    }
  }

  .deleteicon {
    cursor: pointer;
    background: #efefef;
    margin: 4px;
    color: #009ada;
    border-radius: 10px;
    padding: 3px;
    :hover {
      color: red;
    }
  }
`;
