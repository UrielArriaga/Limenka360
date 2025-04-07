import styled from "styled-components";
import { Card, Drawer } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";
export const TabulatorStyle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .quotes_content {
      width: calc(100% - 40px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      &__header {
        margin-bottom: 30px;
        .title {
          font-size: 20px;
          font-weight: 500;
        }
      }
      &__body {
        .info_tabulator {
          margin-bottom: 30px;
          .item {
            .title {
              font-size: 13px;
              font-weight: 500;
              color: grey;
            }
            .data {
              width: 100%;
              outline: none;
              border: 1px solid #c0c0c0;
              border-radius: 5px;
              height: 30px;
              padding: 5px;
              font-size: 15px;
            }
          }
        }
        .quotes_info {
          margin-bottom: 30px;
          .quotes_container {
            display: flex;
            justify-content: space-evenly;
          }
        }
        .plan_quotes {
          margin-bottom: 30px;
          .title {
            font-size: 13px;
            font-weight: 500;
            color: grey;
          }
          .data {
            display: flex;
            align-items: center;
            font-size: 15px;
            min-height: 38px;
            outline: none;
          }
          .calendar {
          }
        }
        .calendar_payments {
          margin-bottom: 20px;
          .calendar_title {
            font-size: 18px;
            font-weight: 500;
          }
          .calendar_table {
            margin-top: 10px;
            width: 100%;
            border-collapse: collapse;
            &__head {
              background-color: rgb(64, 122, 255, 0.2);
              .tr_head {
                .th_head {
                  text-align: left;
                }
              }
            }
            &__body {
              tr:nth-child(even) {
                background: rgb(58, 173, 230, 0.2);
              }
              tr:nth-child(odd) {
                background: #fff;
              }
              .tr_body {
                .td_body {
                }
              }
            }
          }
          .totals {
            display: flex;
            flex-direction: column;
            justify-content: right;
            text-align: right;
            .total_value {
              font-size: 14px;
              .value {
                font-size: 16px;
                font-weight: 500;
                margin-left: 5px;
              }
            }
            /* border: 1px solid; */
          }
        }
        .buttons {
          display: flex;
          flex-direction: row-reverse;
          .bt_visualize {
            text-transform: capitalize;
            background-color: #405189;
            color: #fff;
          }
        }
      }
      &__footer {
      }
    }
  }
`;
export const Quote = styled(Card)`
  /* width: 250px; */
  &:hover {
    transition: all 0.2s;
    transform: translateY(-10px);
    cursor: pointer;
  }
  .content_quote {
    border: 5px solid transparent;
    border-radius: 8px;
    &__head {
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      margin-bottom: -40px;
      .check {
        margin-top: -8px;
        margin-right: -5px;
      }
    }
    &__body {
      padding: 10px;
      .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 500;
        font-size: 13px;
        color: grey;
        margin-bottom: 10px;
        .data {
          font-size: 15px;
          color: #000;
        }
      }
    }
  }
  .selected {
    border-left: 5px solid ${colors.primaryColorDark};
  }
`;

export const PreviewTabulator = styled(Drawer)`
  .container_preview {
  }
`;
