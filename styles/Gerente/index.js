import styled from "styled-components";
import { colors, customWidth, device } from "../global.styles";
import { Grid } from "@material-ui/core";

export const GerenteLayout = styled.div`
  width: 100%;
  overflow: auto;
  height: calc(100vh - 60px);
  background-size: cover;
  background-color: #f1f3f7;
  padding-top: 100px;
  padding: 20px;

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow: hidden auto;
  }

  .datesection {
    @media ${device.md} {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }

    margin-bottom: 30px;

    .inputdate {
      margin: 5px;
      height: 30px;
      padding-left: 10px;
      border-radius: 2px;
      background-color: #ffff;
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .btn_addgoal {
      margin-left: 10px;
      background-color: ${colors.primaryColor};
      color: #fff;
    }
  }

  .cardssection {
    margin-bottom: 30px;

    @media ${device.md} {
      display: flex;
      justify-content: space-between;
    }
  }

  .calendarsection {
    background-color: #fff;
    border-radius: 8px;
  }

  .summarysection {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 320px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    @media ${device.md} {
      width: 95%;
      margin-bottom: 0px;
    }
    h3 {
      color: #495057;
      margin-bottom: 10px;
    }
    .total {
      h3 {
        color: #495057;
      }
    }
    .rowsummary {
      display: flex;
      align-items: center;

      .title_table {
        color: #5e81b4;
        margin-bottom: 10px;
      }

      .value_table {
        color: #495057;
        font-weight: bold;
        font-size: 25px;
      }

      .leftsummary {
        padding: 10px;
        border-right: 1px solid #dfe4ed;
        border-bottom: 1px solid #dfe4ed;
        width: 50%;
      }

      .leftsummarybotoom {
        padding: 10px;
        border-right: 1px solid #dfe4ed;

        width: 50%;
      }

      .rightsummary {
        width: 40%;
        padding: 10px;
        /* border-left: 1px solid gray; */
        border-bottom: 1px solid #dfe4ed;
      }
    }
  }

  .summarysectionpercentajes {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 320px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media ${device.md} {
      width: 95%;
      margin-bottom: 0px;
    }

    h3 {
      color: #495057;
      margin-bottom: 10px;
    }
    .total {
      h3 {
        color: #495057;
      }
    }

    .rowsummary {
      display: flex;
      align-items: center;

      .title_table {
        color: #5e81b4;
        margin-bottom: 10px;
      }

      .value_table {
        color: #495057;
        font-weight: bold;
        font-size: 25px;
      }

      .gte {
        color: #00e676;
      }

      .lte {
        color: #ff1744;
      }

      .leftsummary {
        padding: 10px;
        border-right: 1px solid #dfe4ed;
        border-bottom: 1px solid #dfe4ed;
        width: 50%;
      }

      .leftsummarybotoom {
        padding: 10px;
        border-right: 1px solid #dfe4ed;

        width: 50%;
      }

      .rightsummary {
        width: 40%;
        padding: 10px;
        /* border-left: 1px solid gray; */
        border-bottom: 1px solid #dfe4ed;
      }
    }
  }

  .chartsection {
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 320px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 40px;

    .content {
      position: relative;

      .overlay_emptydata {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 210px;
        width: 100%;
        top: 0;
        position: absolute;
        opacity: 0.8;
        z-index: 1000;

        .message {
          padding: 10px;
          background-color: rgba(0, 0, 0, 0.4);
          width: 40%;
          color: #fff;
          font-size: 15px;
          font-weight: bold;
          display: flex;
          align-items: center;
          flex-direction: column;
          justify-content: center;
          p {
            margin-bottom: 10px;
          }
          button {
            background-color: ${colors.primaryColor};
          }
        }
      }
    }
    h3 {
      color: #495057;
      margin-bottom: 20px;
    }

    &:hover {
      .row {
        .actionschart {
          opacity: 1;
        }
      }
    }

    .row {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .actionschart {
        display: flex;
        align-items: center;
        opacity: 0;
        /* opacity: 1; */
        /* visibility: hidden; */
        /* border: 2px solid red; */

        .arrows_pagination {
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .executivessection {
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 380px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    @media ${device.md} {
      width: 97%;
      margin-bottom: 40px;
    }
    .rowx {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;
      /* background-color: red; */
    }

    .actionssection {
      display: flex;
      /* background-color: green; */

      .arrows_pagination {
        display: flex;
        align-items: center;
      }
    }
  }

  .pendingssections {
    height: 320px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    background-color: #fff;
    border-radius: 8px;
    padding: 10px;
    height: 320px;
    margin-top: 40px;
    width: 95%;
  }

  .infoexecutive {
    height: 100%;
    /* display: flex; */
    justify-content: space-between;

    .leftinfo {
      margin-right: 30px;
      padding-top: 20px;

      .row_icon {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      .minicard {
        margin-bottom: 10px;
        &__icon_text {
          border-radius: 50%;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 10px;
          color: #fff;
          /* font-weight: bold; */
        }

        &__icon_P {
          background-color: #44cbe4;
        }

        &__icon_PA {
          background-color: red;
        }

        &__icon_PP {
          background-color: green;
        }

        &__icon_MC {
          background-color: green;
        }
        &__icon_MV {
          background-color: green;
        }

        &__title {
          margin-right: 10px;
          color: #495a7f;
          font-weight: bold;
        }

        &__value {
        }
      }
    }

    .chart {
      width: 50%;
    }
  }
`;

export const Container = styled.div``;

export const CardsContainer = styled(Grid)`
  padding: 10px;
  display: flex;
  /* background-color: red; */
  height: 150px;
  /* display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  padding: 10px 10px 0 10px; */
`;

export const Divider = styled.div`
  width: ${props => (props.w ? `${props.w}px` : "0px")};

  height: ${props => (props.h ? `${props.h}px` : "0px")};

  background-color: ${props => (props.bg ? `${props.bg}` : "transparent")};
`;
