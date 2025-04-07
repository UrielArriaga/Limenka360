import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const ProductsStyle = styled.div`
  .content_table {
    margin-bottom: 20px;

    .table {
      width: 100%;
      border: none;
      border-collapse: collapse;
      .head {
        .tr_head {
          color: #fff;
          background-color: ${colors.primaryColor};
          height: 40px;
          .th {
            text-align: left;
            padding-left:10px;
            padding-right:10px;
          }
        }
      }
      .body {
        .tr_body {
          .td {
            padding-left:10px;
            padding-right:10px;
            font-size: 14px;
            .input_data {
              margin: 5px 0px;
              font-size: 13px;
              padding: 5px;
              border: 1px solid #d4d4d4;
              outline: none;
              width: 90%;
            }
            .bt_delete {
              height: 30px;
              width: 30px;
              border-radius: 8px;
              color: red;
              margin: 0px;
              svg {
                font-size: 20px;
              }
            }
            .empty {
              border: 1px solid red;
            }
          }
        }
      }
      .empty_products {
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 15px;
        color:rgb(86 86 86);
        font-weight: 550;
      }
    }
  }
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    .add_product {
      font-size: 11px;
      border: 1px solid;
      text-transform: capitalize;
      color: ${colors.primaryColorDark};
      border: 1px solid ${colors.primaryColorDark};
    }
  }
`;
