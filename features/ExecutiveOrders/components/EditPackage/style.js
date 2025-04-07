import { Dialog } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const EditStyle = styled(Dialog)`
  .header {
    padding: 10px;
    border-bottom: 2px solid ${colors.primaryColorDark};
    margin-bottom: 5px;
    .title_header {
      font-size: 16px;
      font-weight: 500;
    }
  }
  .content_package {
    padding: 20px;
    .title_package {
      margin-bottom: 10px;
      font-size: 15px;
      font-weight: 500;
    }
    .data_package {
      margin-bottom: 20px;
      .title_data {
        font-size: 12px;
        color: grey;
      }
      .data {
        font-size: 14px;
        font-weight: 500;
      }
    }
    .content_table {
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
              font-size: 12px;
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
              font-size: 13px;
              font-weight: 500;
              .input_value {
                border: 1px solid #d4d4d4;
                width: 60px;
                height: 20px;
                outline: none;
                border-radius: 5;
                padding: 2px;
              }
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
                &:hover {
                  cursor: pointer;
                }
              }
            }
            .code {
              margin-left: 0px;
            }
            .icon_delete {
              color: red;
              font-size: 16px;
              margin-bottom: -2px;
            }
          }
        }
      }
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      &__image {
        height: 100px;
        margin-bottom: 10px;
      }
      &__title {
        font-size: 14px;
        font-weight: 500;
      }
    }
  }
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    padding: 10px;
    .bt_save {
      text-transform: capitalize;
      font-size: 11px;
      background-color: #405189;
      color: #fff;
      height: 30px;
    }
  }
`;
