import styled from "styled-components";
import { zIndexHeader } from "../../styles/global.styles";

export const DirLogNewEntryStyles = styled.div`
  .header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px 10px;
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        color: #616161;
      }
    }
    &__btnActions {
      /* width: 17%; */
      display: flex;
      justify-content: space-between;
      .btnSelect {
        text-transform: capitalize;
        background-color: #039be5;
        color: white;
      }
    }
  }

  .actions {
    padding: 10px;
    display: flex;
    justify-content: flex-end;

    .btnSelect {
      text-transform: capitalize;
      background-color: #034d6f;
      color: white;
    }
  }
  .contentPreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    /* max-height: calc(100vh - 268px); */
    height: 80vh;
    overflow: auto;
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

    .containerTable {
      margin-bottom: 20px;
      box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;

      max-height: 100vh;
      /* margin-top: 29px; */
      &__products {
        .tablebody {
          .odd-row {
            background-color: #e3e3e3;
          }
          .even-row {
            /* background-color: #f0f0f0; */
          }
        }
        .table {
          width: 100%;
          border-collapse: collapse;
          font-size: 11px;
        }

        .tableheader {
          display: flex;
          background-color: #405189;
          color: white;
          border-top-left-radius: 9px;
          border-top-right-radius: 9px;
          padding: 10px;
          font-weight: bold;
          position: sticky;

          .tablehead {
            flex: 1;

            text-align: left;
            font-weight: bold;
          }

          .tableheadproductname {
            flex: 3;
          }
        }

        .tablerow {
          display: flex;
          border-bottom: 1px solid #e0e0e0;
          padding: 20px;
          font-weight: bold;
          min-height: 40px;
          color: #616161;
          cursor: pointer;
          &:hover {
            background-color: #f0f1f1;
          }
          .tablecell {
            flex: 1;

            text-align: left;
            color: #616161;
            font-weight: bold;
          }
          .code {
            color: #000;
            .input_data {
              color: #616161;
              margin: 0px 0px;
              font-size: 12px;
              padding: 2px;
              border: 1px solid #d4d4d4;
              outline: none;
              width: 90%;
              font-weight: bold;
              height: 36px;
              border-radius: 5px;
              padding-left: 10px;
            }
            .input_observations {
              background-clip: padding-box;
              background-color: #fff;
              border: 1px solid #ced4da;
              border-radius: 0.25rem;
              color: #495057;
              display: block;
              font-size: 0.8125rem;
              font-weight: 400;
              /* line-height: 1.5; */
              min-height: 36px;
              padding-left: 10px;
              padding-top: 1px;
              /* padding: 0.47rem 0.75rem; */
              width: 100%;
              /* min-height: 38px; */
              outline: none;
              /* resize: none; */
              margin-left: 10px;
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
                "Helvetica Neue", sans-serif;
            }
          }

          .actions {
            .disabled {
              background-color: #e0e0e0;
              color: #616161;
            }
            button {
              margin-right: 10px;

              background-color: #405189;
              color: #fff;
              border: 1px solid #ccc;
              border-radius: 5px;
              padding: 5px 10px;
            }
          }

          .tableheadproductrow {
            flex: 3;
          }
        }

        .tablelist {
          padding-left: 10px;

          .tablelititem {
            font-size: 11px;
            display: flex;
            align-items: flex-start;
            padding: 20px 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #000;
            font-weight: bold;
            .description {
              display: flex;
              margin-right: 10px;
            }
            .contentMenu {
              box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 5px 0px;
              border-radius: 5px;
              background-color: #f0f1f1;
              margin-left: 7px;
            }
            .icon {
              font-size: 11px;
              margin-right: 10px;
            }
            .serialnumber {
              text-transform: uppercase;
              color: #00738e;
              margin-right: 10px;
              font-weight: bold;
            }
            .name {
              margin-right: 10px;
              &:hover {
                color: red;
                cursor: pointer;
                .delete {
                  visibility: visible;
                }
              }
            }

            textarea {
              width: 50%;
              padding: 5px;
              height: 50px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: vertical;
            }

            .delete {
              color: red;
              visibility: hidden;
            }
            .btndelete {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .iconBtnDelete {
              background-color: red;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }

            .icondelete {
              font-size: 15px;
            }
          }
        }

        .tablelistsaved {
          padding-left: 10px;
          .tablelititem {
            font-size: 11px;
            display: flex;
            align-items: flex-start;
            padding: 20px 10px;
            border-bottom: 1px solid #e0e0e0;
            color: #000;
            font-weight: bold;

            .description {
              display: flex;
              margin-right: 10px;
            }
            .icon {
              font-size: 11px;
              margin-right: 10px;
            }
            .serialnumber {
              text-transform: uppercase;
              color: #00738e;
              margin-right: 10px;
              font-weight: bold;
            }
            .name {
              margin-right: 10px;
              &:hover {
                color: red;
                cursor: pointer;
                .delete {
                  visibility: visible;
                }
              }
            }

            textarea {
              width: 300px;
              padding: 5px;
              height: 50px;
              border: 1px solid #ccc;
              border-radius: 5px;
              resize: none;
            }

            .delete {
              color: red;
              visibility: hidden;
            }
            .btndelete {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .iconBtnDelete {
              background-color: red;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }

            .iconAdd {
              background-color: #039be5;
              padding: 5px;
              color: #fff;
              margin-left: 10px;
            }
            .icondelete {
              font-size: 15px;
            }
          }
        }

        .selected {
          background-color: #f1f1fa;
        }

        .stocksavailables {
          background-color: #f1f1fa;
          padding: 10px;
          font-size: 12px;
          h4 {
            margin-bottom: 10px;
            font-size: 14px;
          }

          .content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
          }

          .itemwerehouse {
            padding: 10px;
            background-color: rgba(0, 230, 118, 0.3);
            border-radius: 8px;
          }

          .unit {
            color: #616161;
            font-weight: bold;
            margin-top: 10px;
          }
        }
      }
    }
  }
  .content_neworder {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: auto;
    margin-bottom: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
      .title_header {
        font-size: 20px;
        margin-right: 20px;
        font-weight: 500;
      }
      .bt_back {
        margin-right: 10px;
        height: 30px;
        width: 30px;
        color: grey;
        background-color: #d4d4d4;
      }
    }
    &__body {
      .subtitles {
        display: flex;
        align-items: center;
        margin-bottom: 1%;
        .icon {
          width: 30px;
          height: 30px;
          padding: 5px;
          background: rgb(220, 225, 246);
          color: rgb(16, 60, 130);
          border-radius: 50%;
          margin-right: 6px;
        }
        .titleDirection {
          font-weight: 600;
          color: #565661;
        }
      }
      .form {
        .item {
          .title {
            font-size: 14px;
            color: rgb(86 86 86);
            font-weight: 550;
            margin-bottom: 1%;
            .iconroom {
              color: rgb(16, 60, 130);
              padding: 5px;
              background: rgb(220, 225, 246);
              width: 30px;
              height: 30px;
              border-radius: 50%;
            }
          }
          .input_data {
            background-clip: padding-box;
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            color: #495057;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 0.47rem 0.75rem;
            -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
            width: 100%;
            height: 35px;
            max-height: 35px;
            &:focus {
              outline: none;
              border: none;
              transition: all 0.3s ease;

              border-bottom: 1.5px solid #0d0d0d;
            }
          }
          .select_data {
            font-size: 14px;
            width: 100%;
          }
          .input_observations {
            background-clip: padding-box;
            background-color: #fff;
            border: 1px solid #ced4da;
            border-radius: 0.25rem;
            color: #495057;
            display: block;
            font-size: 0.8125rem;
            font-weight: 400;
            line-height: 1.5;
            padding: 0.47rem 0.75rem;
            width: 100%;
            min-height: 38px;
            outline: none;
            resize: none;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
              "Helvetica Neue", sans-serif;
          }
        }
        .products {
          .input_products {
            color: transparent;
            border: none;
            outline: none;
            width: 0px;
            height: 0px;
          }
          .message {
            height: 10px;
            display: flex;
            align-items: center;
            color: red;
            font-weight: 500;
            font-size: 14px;
            margin-bottom: 10px;
            svg {
              margin-right: 5px;
              font-size: 18px;
            }
          }
        }
        .buttons {
          display: flex;
          flex-direction: row-reverse;
          margin-top: 2%;
          .bt_save {
            margin-right: 0.5%;
            font-size: 12px;
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            background: #193364;
          }
          .bt_template {
            margin-right: 0.5%;
            font-size: 12px;
            text-transform: capitalize;
            font-weight: 500;
            color: #fff;
            background: #193364;
          }
        }
      }
    }
  }
`;

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: 36,
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
    padding: 3,
  }),
};
