import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const ChipStyle = styled.div`
  .chips_filters {
    display: flex;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    margin-bottom: 4px;
    margin: 10px 0px;
    padding: 2px 0px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
    }
    .chip {
      margin-right: 5px;
    }
  }
`;
