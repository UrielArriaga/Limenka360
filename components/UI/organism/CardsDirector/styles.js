import styled from "styled-components";
import { colors, device } from "../../../../styles/global.styles";
export const Container = styled.div`
  display: flex;
`;

export const CardsLayout = styled.div`
  display: inline-grid;
  gap: 10px;
  min-height: 120px;
  width: 100%;
  @media ${device.sm} {
    display: flex;
  }
  .card {
    padding: 10px;
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    @media ${device.md} {
      width: 33%;
    }
    &__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      /* font-weight: bold; */
      .namecard {
        color: #878aa6;
        font-size: 20px;
      }

      .percentage {
        cursor: default;
        &:hover {
          .tooltip {
            position: fixed;
            display: block;
          }
        }
        .tooltip {
          display: flex;
          flex-direction: column;
          transition: 0.2s;
          display: none;
          background-color: #fff;
          border: 1px solid ${colors.bgDirector};
          padding: 5px;
          color: ${colors.bgDirector};
          font-size: 12px;
          border-radius: 0px 8px 8px 8px;
          .total {
            display: flex;
            flex-direction: row;
            font-weight: 500;
          }
          .totalDiference {
            display: flex;
            flex-direction: row;
            font-weight: 500;
            .negative {
              color: red;
              font-weight: 500;
            }
            .positive {
              color: #87c52e;
              font-weight: 500;
            }
          }
        }
      }

      .negativePercentage {
        color: red;
      }
      .positivePercentage {
        color: #6ada7d;
      }
    }

    &__centercontent {
      margin-bottom: 20px;
      .total {
        font-weight: bold;
        color: #495057;
        font-size: 22px;
      }
    }
    &__icon {
      display: flex;
      justify-content: space-between;

      .showall {
        p {
          color: #878a99;
        }
        cursor: pointer;
      }
    }
  }

  .card .card_title {
    display: flex;
    color: #878aa6;
    font-size: 20px;

    /* font-weight: bold; */
  }

  .card .card_total {
    font-weight: bold;
  }

  .card .icon {
    margin-right: 10px;
  }
`;
