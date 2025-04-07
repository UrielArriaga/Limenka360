import styled from "styled-components";
import { Popover, Drawer } from "@material-ui/core";
export const FilesStyled = styled.div`
  .container {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .container_name {
        display: flex;
        align-items: center;
        .iconfolder {
          width: 30px;
          height: 30px;
          padding: 5px;
          margin-right: 5px;
          background: #dce1f6;
          color: #0c203b;
          border-radius: 50%;
        }
        .iconreload {
          font-size: 19px;
          color: #103c82;
          transition: 0.3s;
          cursor: pointer;
          /* &:hover {
            rotate: 180deg;
          } */
        }
        .title {
          font-size: 18px;
          font-weight: 500;
          margin-right: 10px;
        }
      }
      .chips_filter {
        .chip_filter {
          margin-right: 5px;
        }
      }
      .container_filter {
        display: flex;
        align-items: center;
        .icon {
          margin-top: -2px;
          margin-right: -7px;
          font-size: 17px;
        }
        .button_filter {
          text-transform: capitalize;
          color: grey;
          font-size: 12px;
        }
      }
    }
    &__body {
      margin: 20px 0px;
      width: 100%;
      height: 300px;
      overflow-y: scroll;
      overflow-x: hidden;
      ::-webkit-scrollbar {
        width: 5px;
      }
      ::-webkit-scrollbar-track {
        background: #fff;
      }
      ::-webkit-scrollbar-thumb {
        background: #888;
        &:hover {
          background-color: #405189;
        }
      }

      .ctr_table {
        border-spacing: 0;
        margin: auto;
        width: 100%;
        &__head {
          position: sticky;
          top: 0;
          z-index: 50;
          &__tr {
            background-color: #dce1f6;
            padding: 5px 10px;
            height: 40px;
            .checkbox {
              position: sticky;
              left: 0;
              display: flex;
              flex-direction: row;
              align-items: center;
              padding: 3px 5px;
              background-color: #405189;
              color: #fff;
              height: inherit;
              .MuiFormControlLabel-root {
                margin-right: 5px;
              }
              @media (max-width: 600px) {
                min-width: 100px;
                position: relative;
              }
            }
            .title {
              text-transform: capitalize;
              padding: 0 10px;
              .ctr_title {
                display: flex;
                align-items: center;
                width: max-content;
                /* min-width: 150px; */
              }
            }
          }
        }
        &__body {
          .row {
            background: #fff;
            font-weight: bold;
            color: #2c2c2c;
            transition: all 0.3s ease;
            min-height: 50px;
            .fixed {
              position: sticky;
              left: 0;
              background: #fff;
              transition: all 0.3s ease;
              @media (max-width: 600px) {
                position: relative;
              }
            }
            .data {
              font-size: 14px;
              padding: 0 10px;
              .ctr_td {
                display: flex;
                align-items: center;
                min-height: 42px;
                .showmore {
                  cursor: pointer;
                  color: blue;
                }

                .iconfolder {
                  cursor: pointer;
                  width: 25px;
                  height: 25px;
                  padding: 5px;
                  background: #103c82;
                  color: #fff;
                  border-radius: 50%;
                }
                .iconType {
                  width: 25px;
                  height: 25px;
                  padding: 5px;
                  background: #103c82;
                  color: #fff;
                  border-radius: 50%;
                }
                .menuButton {
                  width: 10px;
                  height: 10px;
                  border-radius: 8px 8px 8px 8px;
                }
              }
              .file {
                &:hover {
                  text-decoration: underline;
                  cursor: pointer;
                }
              }
              .capitalize {
                text-transform: capitalize;
              }
              .select {
                cursor: pointer;
              }
            }
            &:hover {
              background: #d8dbe6;
              opacity: 0.8;
              color: #000;
              .fixed {
                background: #d8dbe6;
              }
            }
          }
          tr:nth-child(even) {
            background: #fff;
          }
          tr:nth-child(odd) {
            background: #f3f3f3;
          }
          .body_empty {
            background-color: #fff;
            width: 100%;
            padding: 40px;
            height: 250px;
            .message_ctr {
              height: 100%;
              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
              p {
                text-align: center;
                color: #8a8a8a;
              }
            }
          }
        }
      }
      .table_pagination {
        background-color: #fff;
        position: sticky;
        bottom: 0;
        z-index: 50;
        display: flex;
        align-items: center;
        flex-direction: row-reverse;
        .pagination {
          margin-top: 10px;
        }
      }
    }
    &__footer {
      .addfile {
        color: #fff;
        background-color: #3f51b5;
        text-transform: capitalize;
        padding: 6px 16px;
      }
    }
  }
`;

export const DrawerFilters = styled(Drawer)`
  background-color: none;
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorRight.MuiPaper-elevation16 {
    width: 30%;
    padding: 20px;
    border-top-left-radius: 20px;
    border-left: 5px solid #405189;
    @media (max-width: 600px) {
      width: calc(100% - 70px);
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
  .MuiBackdrop-root {
    backdrop-filter: blur(10px);
  }
  .container {
    &__head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: bold;
      }
      .button_close {
        width: 12px;
        height: 12px;
        &:hover {
          background-color: #fff;
          .icon {
            color: red;
          }
        }
        .icon {
          font-size: 21px;
        }
      }
    }
    &__body {
      margin: 30px 0px;
      .filter_options {
        .title_option {
          font-size: 14px;
          font-weight: 500;
        }
        .select_filter {
          font-size: 14px;
        }
        .input_search {
          border: 1px solid hsl(0, 0%, 80%);
          border-radius: 4px;
          height: 38px;
          width: 100%;
          outline: none;
          padding: 5px;
          font-size: 15px;
        }
      }
    }
    &__footer {
      .buttons {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        .apply_button {
          background: #405189;
          color: #fff;
          text-transform: capitalize;
        }
        .cancel_button {
          background: #0c203b;
          margin-right: 10px;
          color: #fff;
          text-transform: capitalize;
        }
      }
    }
  }
`;

export const MenuFile = styled(Popover)`
  .container {
    display: flex;
    flex-direction: column;
    .option {
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      border-radius: 0px;
      color: #3f51b5;
      font-size: 13px;
      &:hover {
        background-color: #3f51b5;
        color: #fff;
      }
    }
  }
`;
