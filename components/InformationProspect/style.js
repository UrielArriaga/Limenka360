import styled from "styled-components";
import { Grid, Divider } from "@material-ui/core";
import { colors } from "../../styles/global.styles";
export const InfoStyled = styled.div`
  overflow-x: hidden;
  .info_prospect {
    width: 100%;
    margin-bottom: 0px;
    .info_prospect_title {
      font-weight: 500;
      font-size: 17px;
      display: flex;
      align-items: center;
      .icon {
        color: #405189;
        margin-right: 5px;
        cursor: pointer;
      }
    }

    .title {
      color: grey;
      font-size: 13px;
    }
    .data {
      font-weight: 500;
      font-size: 15px;
    }
    .important {
      color: ${colors.bgDirector};
    }
    .capitalize {
      text-transform: capitalize;
    }
    .labels_container {
      margin-top: 4px;
      display: flex;
    }
    .discarted_reason {
      width: 100%;
      color: red;
      text-transform: capitalize;
      font-weight: 500;
      padding: 5px;
      border: 1px solid red;
      border-radius: 8px;
      font-size: 13px;
      margin-top: 5px;
      text-align: center;
    }
  }
  .seemore {
    width: fit-content;
    color: ${colors.bgDirector};
    border-bottom: 1px solid transparent;
    transition: 0.2s;
    &:hover {
      border-bottom: 1px solid ${colors.bgDirector};
      cursor: pointer;
    }
  }
`;
export const LabelContainer = styled.p`
  margin-right: 5px;
  border-radius: 5px;
  padding: 2px;
  font-size: 13px;
  border: 2px solid ${({ color }) => color};
  text-transform: capitalize;
  color: grey;
`;
export const LindeDivider = styled.hr`
  width: 100%;
  border-top: 1px solid rgb(48, 63, 159);
  border-bottom: none;
  border-left: none;
  border-right: none;
  margin: 5px;
`;
