import styled from "styled-components";
import { colors } from "./../../../../styles/global.styles";
const getColor = props => {
  if (props.isDragAccept) {
    return "#2196f3";
  }
  if (props.isDragReject) {
    return "#ff1744";
  }

  return "#9e9e9e";
};

export const FilesFormStyled = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  .header {
    display: flex;
    align-items: center;
    overflow: hidden;
    .icon_primary {
      width: 30px;
      height: 30px;
      padding: 5px;
      background: #dce1f6;
      color: #103c82;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      font-weight: 600;
      color: rgb(86 86 86);
    }
    .title {
      font-size: 18px;
      font-weight: 600;
      color: rgb(86 86 86);
    }
  }
  .table_container {
    padding: 10px;
  }
  .buttons_products {
    display: flex;
    flex-direction: row-reverse;
    .bt_add {
      background-color: #103c82;
      color: #fff;
      text-transform: capitalize;
      font-size: 12px;
    }
  }

  .sectionfooter {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    button {
      /* background-color: #405189;
      color: #fff;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 5px 10px; */
    }
  }
  .row {
    display: flex;
    align-items: center;
  }
  .buttons {
    margin-top: 5%;
    display: flex;
    flex-direction: row-reverse;
    .bt_next {
      text-transform: capitalize;
      background: #103c82;
      color: #fff;
      font-size: 13px;
      margin-left: 5px;
    }
    .bt_back {
      text-transform: capitalize;
    }
  }
`;

export const TableProd = styled.div`
  .table_product {
    margin-bottom: 10px;
    .content_table {
      height: auto;
      max-height: 180px;
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
          top: 0;
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
              margin-left: 20px;
              font-weight: 400;
              font-size: 12px;
              .count_spare {
                color: ${colors.primaryColorDark};
                font-weight: bold;
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
`;

export const InfoAdd = styled.div`
  .title {
    text-transform: capitalize;
  }
  .text {
    font-size: 13px;
    display: flex;
    align-items: center;
    width: max-content;
  }
`;
export const BillingInf = styled.div`
  .title {
    text-transform: capitalize;
  }
  .text {
    font-size: 13px;
    display: flex;
    align-items: center;
    width: max-content;
  }
`;
