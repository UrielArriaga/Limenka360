import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const OrderStyle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  * {
    margin: 0;
  }

  .content_orders {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 15px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
    }
    &__body {
      .title_orders {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        .title {
          font-size: 24px;
          font-weight: 500;
        }
        .count_orders {
          display: flex;
          align-items: center;
          .count {
            font-size: 14px;
            font-weight: 500;
            margin-right: 5px;
          }
          .title_count {
            font-size: 14px;
            font-weight: 500;
            margin-right: 10px;
          }
          .icon_reload {
            cursor: pointer;
            font-size: 18px;
            margin-bottom: -3px;
            color: ${colors.primaryColorDark};
          }
        }
      }
      .container_cards {
        margin-bottom: 20px;
      }
      .box_search {
        margin-bottom: 10px;
        border: 1px solid #d4d4d4;
        padding: 2px;
        border-radius: 5px;
        font-size: 15px;
        svg {
          color: grey;
          margin: 0px 10px;
        }
      }
      .order_filters {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        .section_order {
          display: flex;
          align-items: center;
          margin-right: 5px;
          .title_orderBy {
            font-size: 14px;
            margin-right: 5px;
          }
          .order_data {
            font-size: 12px;
            height: 25px;
            border-radius: 8px;
            outline: none;
          }
        }
      }
    }
    &__footer {
    }
  }
`;
