import styled from "styled-components";
import { Drawer, Dialog, TextField } from "@material-ui/core";
import { device } from "../global.styles";

export const MetasLayoutStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;

  background: ${({ withbackground }) =>
    withbackground ? `url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png")` : `#f1f1f1`};

  height: 100vh;

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .main_content {
    margin: auto;
    border-radius: 8px;
    margin-top: 10px;
    width: 95%;
    height: calc(100vh - 85px);
    background-color: white;

    &__top {
      padding: 30px 20px;
      display: flex;
      justify-content: space-between;
      .title_count {
        display: flex;
        flex-direction: column;
        .title_goals {
          display: flex;
          align-items: center;
          font-weight: bold;
          font-size: 27px;
          margin-bottom: 8px;
          svg {
            font-size: 22px;
            margin-bottom: -5px;
            margin-left: 5px;
          }
        }
        .subtitle_goals {
          display: flex;
          align-items: center;
          font-size: 14px;
          font-weight: 500;
          svg {
            font-size: 18px;
          }
          .reload {
            margin-left: 7px;
            font-size: 19px;
            margin-bottom: -1px;
            color: #103c82;
            &:hover {
              cursor: pointer;
            }
          }
        }
      }

      .actions {
        button {
          border-radius: 10px;
          display: flex;
          align-items: center;
          padding: 10px;
          height: 40px;
          background-color: #103c82;
          color: #fff;
          &:hover {
            cursor: pointer;
          }
        }
      }
    }

    &__table {
      padding: 0px 20px;
      margin-bottom: 20px;

      .container_dates {
        display: flex;
        margin-bottom: 20px;
        .filters_container {
          width: 100%;
          display: flex;
          margin-right: 10px;
        }
        .bt_delete {
          font-size: 11px;
          height: 34px;
          text-transform: capitalize;
          /* white-space: nowrap; */
        }
      }
    }

    &__pagination {
      display: flex;
      justify-content: flex-end;
    }
  }

  .emptyselectfilter {
    margin: 0px 20px 20px 20px;
    text-transform: capitalize;
    position: sticky;
    position: relative;
    z-index: 51;
    p {
      margin-bottom: 10px;
    }
    &__title {
      display: grid;
      grid-template-columns: auto auto;
      &__total {
        text-align: right;
      }
    }
  }
`;
export const FitersGoals = styled(Drawer)`
  .container_filters {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .title_filters {
        font-size: 15px;
        font-weight: bold;
      }
      .button_close {
        width: 35px;
        height: 35px;

        svg {
          color: red;
        }
      }
    }
    .filters_options {
      .title {
        font-weight: 500;
        font-size: 14px;
      }
      .select {
        font-size: 14px;
      }
    }
  }
`;

export const FiltersStyle = styled.div`
  width: 100%;
  .content_filtersGoals {
    width: 100%;
    display: flex;
    flex-direction: column;
    .buttons {
      display: flex;
      flex-direction: row-reverse;
      .bt_filters {
        padding: 5px;
        width: 80px;
        height: 35px;
        text-transform: capitalize;
        font-size: 12px;
        border-radius: 5px;
        color: #fff;
        background: #3f51b5;
        svg {
          font-size: 18px;
        }
      }
    }
    .filters_chips {
      .chip_filter {
        margin: 5px;
      }
    }
  }
`;

export const FiltersDrawerGoals = styled(Drawer)`
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: 60%;
      border-top-left-radius: 0px;
      border-left: none;
      background-color: none;
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
  .container_filters {
    &__head {
      margin-bottom: 25px;
    }
    &__body {
      .filters {
        .item_filter {
          .title_filter {
            font-size: 13px;
            margin-bottom: 5px;
          }
          .range_dates {
            display: flex;
            .date_content {
              margin: 5px;
              width: 45%;
              .title_date {
                font-size: 14px;
                margin-bottom: -5px;
              }
              .date {
                width: 100%;
                margin: 5px;
                outline: none;
                height: 30px;
                border-radius: 5px;
                border: none;
                font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
                  "Open Sans", "Helvetica Neue", sans-serif;
              }
            }
          }
          .alert_range {
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px;
            border-radius: 5px;
            font-weight: 500;
            background-color: rgb(255, 0, 0, 0.2);
            color: rgb(255, 0, 0);
            .icon_alert {
              font-size: 14px;
              margin-right: 5px;
            }
            .title_alert {
              font-size: 13px;
            }
          }
          .select_options {
            margin-bottom: 5px;
            font-size: 13px;
          }
        }
      }
    }
    &__footer {
      .buttons {
        position: fixed;
        bottom: 10px;
        right: 10px;
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: 25%;
        .bt_cancel {
          background: #0c203b;
          margin-right: 10px;
          color: #fff;
          text-transform: capitalize;
        }
        .bt_apply {
          background: #405189;
          color: #fff;
          text-transform: capitalize;
        }
      }
    }
  }
`;

export const MassDeleteStyle = styled(Dialog)`
  display: ${({ openconfirm }) => (openconfirm ? "none" : "visible")};

  .container_delete {
    &__head {
      width: 100%;
      padding: 5px;
      background: #3f51b5;
      .title_head {
        color: #fff;
        padding: 5px;
      }
    }
    &__body {
      padding: 15px;
      .form {
        margin: 10px;
        .title_form {
          font-size: 15px;
          margin-bottom: 20px;
          font-weight: 500;
        }
        .type_period {
          margin-bottom: 10px;
          .title_type {
            font-size: 13px;
            margin-bottom: 2px;
          }
          .select_period {
            font-size: 12px;
            outline: none;
          }
        }
        .dates {
          display: flex;
          flex-direction: row;
          margin-bottom: 20px;
          .item_date {
            margin: 5px;
            .title_date {
              font-size: 13px;
            }
            .input_date {
              outline: none;
              border-radius: 5px;
              padding: 4px;
              font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
                "Open Sans", "Helvetica Neue", sans-serif;
              border: 1px solid #d3d3d3;
            }
          }
        }
        .buttons {
          width: 100%;
          display: flex;
          flex-direction: row-reverse;
          .bt_delete {
            text-transform: capitalize;
            background-color: red;
            color: #fff;
            font-size: 12px;
          }
          .bt_cancel {
            text-transform: capitalize;
            background-color: #3f51b5;
            color: #fff;
            font-size: 12px;
            margin-right: 5px;
          }
        }
      }
    }
    &__footer {
    }
  }
`;

export const ConfirmDelete = styled(Dialog)`
  .container_confirm {
    padding: 10px;
    display: flex;
    align-items: center;
    .content_title {
      .title {
        display: flex;
        margin-bottom: 15px;
        .icon_alert {
          font-size: 25px;
          margin-right: 5px;
          color: #3f51b5;
        }
        .strong {
          margin: 0px 5px;
        }
      }
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        .bt_back {
          text-transform: capitalize;
          background-color: red;
          color: #fff;
          font-size: 13px;
          margin-right: 5px;
        }
        .bt_accept {
          text-transform: capitalize;
          background-color: #3f51b5;
          color: #fff;
          font-size: 13px;
        }
      }
    }
  }
`;
