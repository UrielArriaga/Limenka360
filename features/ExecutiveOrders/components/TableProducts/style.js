import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const TableProductsStyles = styled.div`
  .table_product {
    .content_table {
      height: auto;
      max-height: 400px;
      overflow: auto;
      .table {
        width: 100%;
        tr:nth-child(even) {
          background: #ddd;
        }
        tr:nth-child(odd) {
          background: #fff;
        }
        .thead {
          font-weight: bold;
          position: sticky;
          .tr_head {
            .th {
              text-align: left;
              background-color: #dbe4f3;
              padding: 5px;
              font-size: 14px;
            }
            .principal {
              background-color: #405189;
              color: white;
            }
            .center {
              text-align: center;
            }
          }
        }

        .tbody {
          .tr_body {
            .td {
              padding: 4px;
              font-size: 14px;
              font-weight: 500;
            }
            .center {
              text-align: center;
            }
            .left {
              text-align: left;
            }
            .icon_package {
              font-size: 16px;
              margin-bottom: -3px;
              margin-right: 5px;
              color: ${colors.primaryColorDark};
              cursor: pointer;
            }
            .icon_actions {
              font-size: 18px;
              color: ${colors.primaryColorDark};
              cursor: pointer;
              margin: 0px 5px;
            }
            .package_products {
              display: flex;
              flex-direction: column;
              font-weight: 400;
              font-size: 12px;
              margin-left: 20px;

              .count_spare {
                color: ${colors.primaryColorDark};
                font-weight: bold;
              }
              .icon_delete {
                color: red;
                font-size: 14px;
                margin-bottom: -3px;
                cursor: pointer;
              }
            }
            .code {
              margin-left: 0px;
            }
          }
        }
      }
    }
  }
  .buttons {
    .bt_add {
      background-color: ${colors.primaryColorDark};
      text-transform: capitalize;
      font-size: 12px;
      color: #fff;
    }
  }
`;
