import styled from "styled-components";
import { device } from "../../../../styles/global.styles";
import { Button } from "@material-ui/core";

export const FormContainer = styled.div`
  width: 100%;
  /* display: flex; */
  background-size: cover;
  /* height: 3450px; */

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

  .item-payment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .item-payment__title {
      font-size: 14px;
      color: #000;
    }
    .item-payment__value {
      font-size: 14px;
      color: #000;
    }
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

export const AddressContainer = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  box-shadow: 0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14),
    0px 1px 5px 0px rgba(0, 0, 0, 0.12);
  border-radius: 5px;
  width: 24%;
  max-height: 166px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 4px;
    height: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px;
  }
  .directionIndex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .titleDirectionCount {
      display: flex;
      align-items: center;
      color: rgb(97, 97, 97);
      font-weight: 500;
      font-size: 14px;
      word-wrap: break-word;
      .fire {
        font-size: 12px;
        color: rgb(63, 81, 181);
        font-size: 16px;
      }
    }
  }
  .data {
    color: rgb(97, 97, 97);
    font-weight: 500;
    font-size: 14px;
    word-wrap: break-word;
    strong {
      font-weight: 300;
      font-size: 14px;
      color: #000;
    }
  }
`;

export const StyledButton = styled(Button)`
  margin-top: 10px;
`;
