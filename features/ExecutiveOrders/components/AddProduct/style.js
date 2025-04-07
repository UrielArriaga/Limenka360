import { Dialog, Drawer } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const AddProductStyle = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: calc(100% - 250px);
    border-top-left-radius: 10px;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
      border-top-left-radius: 0px;
      border-left: none;
    }
    padding: 20px;
  }
  .header {
    margin-bottom: 30px;
    display: flex;
    align-items: center;

    .title_head {
      font-weight: 500;
      font-size: 21px;
      margin-right: 5px;
    }
    .reload_bt {
      margin-bottom: -5px;
      svg {
        color: ${colors.primaryColorDark};
      }
    }
  }
  .search_box {
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    font-size: 15px;
    margin-bottom: 20px;
    .search_icon {
      font-size: 20px;
      margin: 0px 5px;
      color: grey;
    }
    .filters_bt {
      text-transform: capitalize;
      background-color: ${colors.primaryColorDark};
      color: #fff;
      svg {
        margin-left: 5px;
      }
    }
  }
  .filters {
    display: flex;
    margin-bottom: 20px;
    .select_filter {
      margin-right: 10px;
      font-size: 14px;
    }
  }
  .chips {
    margin-bottom: 10px;
    .chip {
      margin-right: 5px;
    }
  }

  .table_container {
    .table_content {
      max-height: 70vh;
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
          position: sticky;
          top: 0;
          .tr_head {
            .th {
              background-color: #e0e4f4;
              padding: 5px;
              font-size: 14px;
            }
            .active {
              background-color: #405189;
              color: #fff;
            }
          }
        }
        .tbody {
          .body_tr {
            &:hover {
              .td {
                background-color: rgba(51, 211, 117, 255);
                cursor: pointer;
              }
            }
            .td {
              transition: 0.2s;
              font-size: 14px;
              font-weight: 500;
              padding: 7px;
            }
          }
        }
      }
    }
    .pagination {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding: 20px 0px;
      .title_pagination {
        font-size: 15px;
        font-weight: 500;
      }
    }
    .body_empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      img {
        width: 20%;
      }
    }
    .ctr_load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50vh;
      &__img {
        width: 200px;
        animation: slide 3s infinite;
        img {
          width: 100%;
          object-fit: contain;
        }
      }
      &__load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        line-height: 30px;
        width: 200px;
        p {
          text-align: center;
          font-weight: bold;
        }
      }
      @keyframes slide {
        0% {
          transform: translateY(0px);
        }
        50% {
          transform: translateY(10px);
        }
        100% {
          transform: translateY(0px);
        }
      }
    }
  }
`;

export const AddStyle = styled(Dialog)`
  overflow: hidden;

  .header {
    padding: 10px 20px;
    border-bottom: 2px solid ${colors.primaryColorDark};
    margin-bottom: 10px;
    .title_header {
      font-weight: 500;
      font-size: 18px;
    }
  }
  .form_product {
    width: 100%;
    padding: 10px 20px;
    .title {
      font-size: 12px;
      color: grey;
    }
    .input_data {
      width: 100%;
      height: 35px;
      border-radius: 5px;
      border: 1px solid #d4d4d4;
      outline: none;
      padding: 2px;
      font-size: 14px;
    }
    .textarea_data {
      width: 100%;
      padding: 5px;
      outline: none;
      border-radius: 5px;
      border: 1px solid #d4d4d4;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
        "Open Sans", "Helvetica Neue", sans-serif;
      font-size: 14px;
    }
    .select_data {
      font-size: 14px;
    }
    .totals {
      display: flex;
      text-align: right;
      flex-direction: column;
    }
  }
  .buttons {
    display: flex;
    flex-direction: row-reverse;
    padding: 20px;
    .bt_add {
      text-transform: capitalize;
      background-color: ${colors.primaryColorDark};
      color: #fff;
    }
  }
`;

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 35,
    minHeight: 35,
    fontSize: 14,
    boxShadow: "none",
    "&:hover": {
      border: "1px solid #dcdcdc",
    },
  }),
};

export const RequiredMessageStyle = styled.span`
  color: red;
`;
