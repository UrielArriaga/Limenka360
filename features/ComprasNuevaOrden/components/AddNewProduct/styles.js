import { Drawer } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const AddProductStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(80% - 250px);
    border-top-left-radius: 10px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }
  }
  .content_products {
    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;
      margin-bottom: 10px;
      .title_header {
        display: flex;
        align-items: center;
        font-weight: bold;
        font-size: 20px;
        color: ${colors.primaryColorDark};
        .bt_reload {
          transition: 0.2s;
          margin-left: 10px;
          font-size: 21px;
          margin-bottom: -4px;
          cursor: pointer;
          &:hover {
            transform: rotate(180deg);
          }
        }
      }
      .bt_close {
        width: 40px;
        height: 40px;
        border-radius: 8px;
        color: red;
      }
    }
    &__body {
      padding: 20px;

      .search_box {
        padding: 3px;
        font-size: 14px;
        border-radius: 5px;
        border: 1px solid #d4d4d4;
        margin-bottom: 30px;
        .search_icon {
          font-size: 22px;
          margin-right: 5px;
          color: grey;
        }
        .bt_filters {
          text-transform: capitalize;
          color: ${colors.primaryColorDark};
          font: 13px;
          svg {
            font-size: 17px;
          }
        }
      }
      .filters {
        width: 100%;
        display: flex;
        margin-bottom: 30px;
        .select_filter {
          z-index: 2;
          margin-right: 10px;
        }
      }
      .chips {
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        .chip {
          margin: 2px;
        }
      }
      .count_products {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 5px;
        .icon_count {
          font-size: 18px;
          color: ${colors.primaryColorDark};
        }
        .count {
          margin: 0px 3px;
          font-weight: bold;
        }
      }
      .table_products {
        overflow: auto;
        height: auto;
        max-height: 55vh;
        .table {
          width: 100%;
          border: none;
          border-collapse: collapse;
          .head {
            .tr_head {
              position: sticky;
              z-index: 1;
              top: 0;
              color: #fff;
              background-color: ${colors.primaryColorDark};
              .th {
                padding: 10px;
                text-align: left;
              }
            }
          }
          .body {
            tr:nth-child(even) {
              background: #f3f3f3;
            }
            .tr_body {
              transition: 0.2s;
              cursor: pointer;
              &:hover {
                background: #00c853;
              }
              .td {
                font-size: 14px;
                padding: 10px 8px;
                font-weight: 500;
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
              }
              .product_name {
                width: 60%;
              }
            }
          }
          .empty_products {
            padding: 10px;
            text-align: center;
            font-size: 15px;
          }
          .load_products {
            font-weight: 500;
            padding: 20px;
            text-align: center;
            font-size: 15px;
          }
        }
        margin-bottom: 20px;
      }
      .pagination {
        display: flex;
        flex-direction: row-reverse;
      }
    }
    &__footer {
    }
  }
`;

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 30,
    minHeight: 30,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),

  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
};
