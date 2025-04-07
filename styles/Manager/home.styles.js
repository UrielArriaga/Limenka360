import styled from "styled-components";
import { customWidth, device } from "../global.styles";

export const ManagerStyled = styled.div`
  /* background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png"); */
  height: 100vh;
  display: flex;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");

  .main_container {
    ${customWidth}
    &__table {
      padding: 20px;
    }
  }

  .content {
    padding: 10px 30px;

    h1 {
      font-size: 20px;
      color: white;
    }

    &__cards {
      display: flex;
      justify-content: space-between;
      margin-top: 10px;
    }

    .tablebyprospects {
      background-color: red;

      .row {
        display: flex;
      }
    }
    .table {
      background-color: #fff;
      width: 100%;
      &__TableUsers {
        max-height: 598px;
        background-color: #fff;
        border-radius: 0px 0px 8px 8px;
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
        .rowHead {
          position: sticky;
          top: 0px;
          z-index: 100;
          .cellHead {
            border: 1px solid;
            background-color: rgba(0, 120, 197, 0.7);
            color: black;
            font-weight: bold;
            border: none;
            padding: 1px 1px;
          }
          .hold {
            position: sticky;
            left: 0;
            background-color: rgba(0, 120, 197, 0.7);
            color: #fff;
          }
          .center {
            text-align: center;
          }
        }
        .rowBody {
          transition: 0.3s;
          &:nth-child(even) {
            background: #f3f3f3;
            .cellHold {
              background: #f3f3f3;
            }
          }

          &:hover {
            background-color: #d8dbe6;
            color: #000;
            cursor: pointer;
            .cellHold {
              background-color: #d8dbe6;
            }
            .buttonMenu {
              background-color: black;
            }
          }
          .cell {
            border: none;
            height: 20px;
            font-weight: bold;
            font-size: 14px;
            padding: 10px 3px;
            .menu {
              border: 5px solid;
            }
            .check {
              color: green;
            }
            .none {
              color: red;
            }
          }
          .center {
            text-align: center;
          }
          .cellHorizontal {
            display: flex;
            flex-direction: row;
            border: none;
            font-size: 14px;
            padding: 10px;
          }
          .cellHold {
            transition: 0.3s;
            position: sticky;
            left: 0px;
            z-index: 50;
            font-weight: bold;
            background-color: #fff;
            text-transform: capitalize;
            &:hover {
              cursor: pointer;
              text-decoration: underline;
            }
          }
          .centerCell {
            text-align: center;
          }
          .centerAvatar {
            display: flex;
            align-items: center;
            flex-direction: column;

            .avatar {
              width: 30px;
              height: 30px;
              font-size: 5px;
              font-weight: bold;
              background-color: #405189;
            }
          }
        }
      }

      &__pagination {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: right;
        align-items: center;
        margin-top: 25px;
        &__totalUsers {
          margin-right: 15px;
        }
        &__button {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          width: 30px;
          height: 30px;
          border: none;
          background-color: #f3f3f3;
          transition: all 0.2s ease;
          margin-right: 5px;
          margin-left: 10px;
          &:hover {
            cursor: pointer;
            background-color: #dce1f6;
          }
          &[disabled] {
            background-color: transparent;
            color: #e5e8e8;
            cursor: default;
          }
          &__left {
            font-size: 16px;
            color: #0c203b;
            margin-right: -5px;
            font-weight: bold;
            transition: 0.2s;
            &__disabled {
              margin-right: -5px;
              font-size: 13px;
              color: grey;
            }
          }
          &__right {
            font-size: 16px;
            color: #0c203b;
            font-weight: bold;
            transition: 0.2s;
            &__disabled {
              font-size: 13px;
              color: grey;
            }
          }
        }
      }
      &__empty {
        display: flex;
        padding: 20px;
        justify-content: center;
      }
      &__loader {
        padding: 20px;
      }
    }
  }
`;

export const Divider = styled.div`
  height: ${({ h }) => (h ? `${h}px` : "10px")};
`;
