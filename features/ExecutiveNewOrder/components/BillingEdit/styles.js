import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const BillingEditStyled = styled.div`
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
