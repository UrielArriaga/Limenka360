import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const ExecutiveGoalsProgressStyled = styled.div`
  width: 90%;
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
    rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  padding: 10px;
  max-height: calc(100vh - 200px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px ${colors.primaryColor};
  }
  .goals-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;

export const GaugeChartStyled = styled.div`
  position: relative;
  /* width: 400px; */
  width: 100%;
  /* height: 230px; */

  /* box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px; */

  padding: 10px;
  h4 {
    margin-bottom: 30px;
  }

  .progress {
    width: 100%;
    height: 10px;
    position: absolute;
    top: 160px;
  }

  .progress-bar {
    width: 50%;
    height: 10px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    span {
      font-size: 12px;
      color: #000;
    }
  }
`;
