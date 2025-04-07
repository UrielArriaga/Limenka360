import { Paper } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const ProductsStyle = styled.div`
  .products_container {
    width: 100%;
  }
`;

export const TableProducts = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  .head_table {
    .row_head {
      .item_head {
        font-size: 14px;
        padding: 3px;
        background-color: #dce1f6;
        font-weight: 500;
        color: #000;
      }
      .identifier {
        font-size: 14px;
        padding: 3px;
        background-color: #405189;
        font-weight: 500;
        color: #fff;
      }
    }
  }
  .body_table {
    tr:nth-child(even) {
      background: #ddd;
    }
    tr:nth-child(odd) {
      background: #fff;
    }
    .item_body {
      font-size: 13px;
      font-weight: 500;
      padding: 5px;
    }
    .center {
      text-align: center;
    }
    .name_product {
      width: 50%;
    }
    tr {
      transition: 0.2s;
      &:hover {
        background-color: #e5efff;
      }
    }
  }
`;
