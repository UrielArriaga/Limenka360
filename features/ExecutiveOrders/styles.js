import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
import { Controller } from "react-hook-form";

export const ExecutiveOrdersStyled = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: auto;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100%;
  background-position: bottom center;
  width: 100%;
  background: url("https://crm.salesup.com/img/color-azul.jpg");
  height: 100vh;

  .main {
    height: calc(100vh - 60px);
    width: 100%;
  }

  .header {
    padding: 10px;
    color: #fff;
  }

  .main_order {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.8);
    width: calc(100% - 30px);
    margin: auto;
    border-radius: 8px;
  }

  .main_datalles {
    padding: 10px 20px;
    background-color: rgba(255, 255, 255, 0.8);
    width: calc(100% - 30px);
    margin: auto;
    border-radius: 8px;
  }

  /* .main_orders {
    width: calc(100% - 30px);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    height: 60%;
    padding: 25px 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .sectiondada {
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .headercccc {
        background-color: orange;
        flex: 1;
      }

      .tabledcascacas {
        background-color: green;
        flex: 6;
        overflow: scroll;
      }

      .actiocacsacsns {
        background-color: blue;
        flex: 1;
      }
    }
  } */
  .main_orders {
    position: relative;
    width: calc(100% - 30px);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    height: 60%;
    padding: 10px;
    background-color: #fff;
    /* background-color: rgba(255, 255, 255, 0.8); */
    border-radius: 8px;
    box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);
    overflow: auto;
    overflow-x: hidden;
    display: flex;
    justify-content: space-between;
    .tabs {
      display: flex;
      flex-direction: column;
      height: 100%;
      margin-right: 20px;
      .tab_option {
        width: 200px;
        font-size: 13px;
        border-bottom: 1px solid #d4d4d4;
        text-transform: capitalize;
        height: 40px;
        display: flex;
        justify-content: left;
        svg {
          margin-top: -3px;
          font-size: 18px;
          color: grey;
        }
        .error {
          color: red;
        }
      }
      .active {
        color: #fff;
        background-color: ${colors.primaryColorDark};
        svg {
          color: #fff;
        }
      }
    }
    .data {
      width: 100%;
      height: 100%;
      overflow: auto;
      overflow-x: hidden;
      position: relative;
    }
  }
  .sectionsform {
    height: 100%;
    overflow: hidden;
  }

  .main_orders .actions {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-top: 50px;
    position: absolute;
    top: -40px;
    right: 0;
    .btn_generate {
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;

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

  .point {
    width: 0;
    height: 0;
    border-top: 13px solid transparent;
    border-bottom: 13px solid transparent;
    border-right: 13px solid rgba(241, 113, 113, 0.9);
    height: 27px;
    float: left;
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

export const SelectFormStyle = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: 35,
    minHeight: 30,
    fontSize: 13,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #dcdcdc" : "1px solid #dcdcdc",
    },
  }),

  valueContainer: base => ({
    ...base,
    marginTop: -4,
  }),
};

export const SectionStyle = styled.div`
  .sectionheader {
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
  .billing {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    .billing_header {
      display: flex;
      align-items: center;
    }
    .required_billing {
      display: flex;
      align-items: center;
      .title_bill {
        color: ${colors.primaryColorDark};
        font-size: 13px;
      }
      .switch {
        margin-bottom: -3px;
      }
    }
  }
  .container_form {
    .title_item {
      font-size: 13px;
      margin-bottom: 5px;
      color: grey;
    }
    .select_form {
      width: 100%;
      font-size: 13px;
    }
    .textarea_form {
      width: 100%;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      resize: none;
      outline: none;
      padding: 5px;
      font-size: 12px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
    }
    .input_form {
      width: 100%;
      height: 35px;
      font-size: 13px;
      outline: none;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      font-size: 12px;
      padding: 5px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
    }
  }
  .buttons {
    margin-top: 5%;
    display: flex;
    flex-direction: row-reverse;
    .bt_next {
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      margin-left: 5px;
    }
    .bt_back {
      text-transform: capitalize;
    }
  }
`;
