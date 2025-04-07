import styled from "styled-components";
import { Dialog, Drawer } from "@material-ui/core";
import { colors } from "../../styles/global.styles";
export const ProductSyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(100% - 250px);
    @media (max-width: 600px) {
      width: calc(100% - 10px);
      border-top-left-radius: 0px;
      border-left: none;
    }
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #585858;
    }
  }
  .container_products {
    padding: 10px;
    &__head {
      width: 100%;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title_container {
        display: flex;
        align-items: center;
        .title {
          font-size: 21px;
          color: ${colors.primaryColorDark};
          font-weight: 500;
        }
        .bt_refresh {
          height: 30px;
          width: 30px;
          border-radius: 8px;
          margin-left: 10px;
          svg {
            font-size: 20px;
          }
        }
      }
      .bt_close {
        width: 35px;
        height: 35px;
        color: ${colors.primaryColorDark};
        border: 1px solid ${colors.primaryColorDark};
        svg {
          font-size: 22px;
        }
      }
    }
    &__body {
      .searchFilters {
        margin-bottom: 20px;
        .search_box {
          display: flex;
          align-items: center;
          .input_search {
            border: 1px solid #dcdcdc;
            outline: none;
            border-radius: 5px;
            padding: 2px;
            font-size: 15px;
            margin-right: 5px;
            svg {
              color: #3f51b5;
              margin: 0px 10px;
              font-size: 18px;
            }
          }
          .bt_filter {
            border-radius: 5px;
            background-color: #3f51b5;
            color: #fff;
            text-transform: capitalize;
            font-size: 13px;
            svg {
              font-size: 18px;
              margin-left: 5px;
            }
          }
        }
      }
      .filters {
        margin-bottom: 20px;
        .select_filter {
          text-transform: capitalize;
          font-size: 14px;
        }
      }
      .chips {
        margin-bottom: 20px;
        .chip {
          margin: 5px;
        }
      }
      .products {
        .table_container {
          width: 100%;
          height: auto;
          max-height: 65vh;
          overflow: auto;
          margin-bottom: 20px;
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
          }
          ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 20px #585858;
          }
          .table {
            width: 100%;
            border-collapse: collapse;
            tr:nth-child(even) {
              background: #f3f3f3;
              td {
                background-color: #f3f3f3;
              }
            }
            tr:nth-child(odd) {
              background: #fff;
              td {
                background-color: #fff;
              }
            }
            td.title_empty {
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid green;
            }
            &__head {
              .th {
                text-align: left;
                padding: 13px;
                position: sticky;
                left: 0;
                top: 0;
                overflow: hidden;
                white-space: nowrap;
              }
              .primaryColor {
                background-color: #405189;
                color: #fff;
              }
              .secondColor {
                background-color: #dce1f6;
              }
            }
            &__body {
              .tr_body {
                &:hover {
                  td {
                    cursor: pointer;
                    transition: 0.2s;
                    background: rgb(0, 200, 83, 0.6);
                    color: #000;
                  }
                }
                .td {
                  padding: 10px;
                  font-size: 14px;
                  font-weight: 500;
                }
                .justify {
                  overflow: hidden;
                  white-space: nowrap;
                }
                .align_left {
                  text-align: left;
                }
              }
            }
          }
        }
        .pagination_container {
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          .pagination {
            display: flex;
            justify-content: center;
          }
          .products_count {
            font-weight: 500;
            margin-right: 20px;
          }
        }
      }
    }
    &__footer {
    }
  }
`;

export const PreviewProduct = styled(Dialog)`
  .preview_style {
    padding: 20px;
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .title {
        font-size: 16px;
      }
      .bt_close {
        width: 35px;
        height: 35px;
        border-radius: 8px;
      }
    }
    &__body {
      .product_data {
        .title {
          margin-bottom: 5px;
          font-size: 13px;
          font-weight: 500;
        }
        .input {
          width: 100%;
          padding: 10px;
          border-radius: 3px;
          border: 1px solid #ced4da;
          outline: none;
        }
        .text_area {
          width: 100%;
          height: 100px;
          resize: vertical;
          outline: none;
          padding: 8px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
          font-size: 14px;
        }
        .iva_container {
          display: flex;
          align-items: center;
          .title_iva {
            font-weight: 500;
          }
        }
        .totals_container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-weight: 500;
        }
        .buttons_container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          .bt_add {
            text-transform: capitalize;
            background-color: #0f3c81;
            color: #fff;
          }
          .disabled {
            background-color: grey;
          }
        }
      }
    }
  }
`;

export const LoaderStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  .loader_img {
    margin-top: 10%;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    img {
      width: 30%;
      height: 30%;
      animation: slide 3s infinite;
    }
  }
  .loader_title {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      font-weight: 500;
      font-size: 17px;
      padding: 5px;
    }
    .progressbar {
      width: 50%;
    }
  }
`;
