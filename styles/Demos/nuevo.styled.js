import styled from "styled-components";
import { colors } from "../global.styles";
import { Dialog, Drawer } from "@material-ui/core";

export const NewDemoStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: calc(100vh - 60px);
  background-size: cover;
  * {
    margin: 0;
  }
  .content_newDemo {
    height: 100%;
    overflow: auto;
    width: calc(100% - 30px);
    min-height: calc(100% - 50%);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
      margin-bottom: 25px;
      .title_header {
        font-size: 27px;
        margin-bottom: 10px;
        font-weight: bold;
      }
    }
    &__body {
      margin-bottom: 70px;
      .opportunity {
        .item {
          .title_opportunity {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 15px;
          }
          .title {
            color: grey;
            font-size: 13px;
          }
          .data {
            font-weight: 500;
          }
          .capitalize {
            text-transform: capitalize;
          }
        }
      }
      .demo {
        margin-top: 20px;
        margin-bottom: 20px;
        .item {
          .title_demo {
            font-size: 16px;
            font-weight: 500;
            margin-bottom: 10px;
          }
          .title {
            color: grey;
            font-size: 13px;
          }
          .data {
            font-weight: 500;
          }
          .capitalize {
            text-transform: capitalize;
          }
          .input_data {
            height: 32px;
            width: 100%;
            padding: 4px;
            font-size: 15px;
            border: 1px solid #d4d4d4;
            border-radius: 5px;
            outline: none;
          }
          .select_data {
            height: 32px;
            width: 100%;
            font-size: 14px;
            border: 1px solid #d4d4d4;
            border-radius: 5px;
          }
          .adress {
            height: 32px;
            font-size: 13px;
            padding: 5px;
          }
          .required {
            border: 1px solid rgb(255, 0, 0, 0.4);
          }
        }
      }
      .table_products {
        margin-bottom: 20px;
        .title_products {
          font-size: 16px;
          font-weight: 500;
          margin-bottom: 10px;
        }
      }
      .see_more {
        margin-top: ${({ seemore }) => (seemore === "true" ? "10px" : "-20px")};
        font-size: 14px;
        color: ${colors.primaryColorDark};
        font-weight: 500;
        cursor: pointer;
      }
    }
    &__footer {
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        margin-bottom: 10px;
        .br_create {
          font-weight: 500;
          color: #fff;
          text-transform: capitalize;
          background-color: ${colors.primaryColorDark};
        }
      }
    }
  }
`;

export const ProductStyle = styled.div`
  .content_table {
    margin-bottom: 20px;

    .table {
      width: 100%;
      border: none;
      border-collapse: collapse;
      .head {
        .tr_head {
          color: #fff;
          background-color: ${colors.primaryColorDark};
          height: 40px;
          .th {
            text-align: left;
          }
        }
      }
      .body {
        .tr_body {
          .td {
            .input_data {
              margin: 5px 0px;
              font-size: 14px;
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
          }
        }
      }
      .empty_products {
        padding: 10px;
        text-align: center;
        font-size: 15px;
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

export const FormNewProdStyle = styled(Dialog)`
  .content_product {
    &__header {
      padding: 10px;
      .title_header {
        font-size: 17px;
        color: ${colors.primaryColorDark};
        font-weight: 500;
      }
    }
    &__body {
      padding: 10px;
      margin-bottom: 10px;
      .form_product {
        .title {
          font-size: 13px;
          color: grey;
        }
        .input_data {
          width: 100%;
          font-size: 14px;
          border-radius: 5px;
          padding: 5px;
          border: 1px solid #d4d4d4;
          outline: none;
        }
        .description {
          resize: none;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
        }
      }
    }
    &__footer {
      padding: 10px;
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        .bt_add {
          height: 30px;
          width: 10px;
          color: #fff;
          margin-right: 5px;
          background-color: ${colors.primaryColorDark};
          text-transform: capitalize;
          font-size: 12px;
        }
        .bt_cancel {
          height: 30px;
          width: 10px;
          text-transform: capitalize;
          color: red;
          font-size: 12px;
        }
      }
    }
  }
`;

export const ErrorStyle = styled.span`
  color: red;
  font-size: 11px;
  font-weight: bold;
`;

export const ErrorAddress = styled.span`
  color: red;
  font-size: 11px;
  font-weight: bold;
`;

export const selectFilter = {
  control: base => ({
    ...base,
    minHeight: 34,
    fontSize: 14,
    border: "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 2,
  }),
};

export const customStyles = {
  control: base => ({
    ...base,
    marginTop: -5,
    marginLeft: -5,
    width: "100%",
    minHeight: 30,
    fontSize: 12,
    border: "none",
    boxShadow: "none",
    "&:hover": {
      border: "none",
    },
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 1,
  }),
};
export const LayoutDrawer = styled(Drawer)`

  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(100% - 850px);
    border-top-left-radius: 10px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }
  }
   .drawertop {
    padding: 20px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    align-items: center;

    &__title {
      font-size: 21px;
      font-weight: bold;
      letter-spacing: 0.03em;
      color: #103c82;
    }
  }
  
`;
