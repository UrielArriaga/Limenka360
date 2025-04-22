import styled from "styled-components";

export const MetricsAmountsStyled = styled.div`
  box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px;
  width: 100%;
  padding: 10px;

  h4 {
    margin-bottom: 30px;
  }
  .list {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;

    .list-item {
      width: 100%;
      margin-bottom: 10px;
      /* padding: 10px; */
      border-radius: 5px;
      margin-bottom: 30px;
      display: flex;

      align-items: center;

      .title {
        font-size: 18px;
        margin-right: 50px;
      }

      .total {
        color: #757575;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }
`;

export const GaugeChartStyled = styled.div`
  position: relative;
  /* width: 400px; */
  width: 100%;
  /* height: 230px; */

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
