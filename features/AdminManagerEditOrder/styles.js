import styled from "styled-components";
import { colors, zIndexHeader } from "../../styles/global.styles";

export const AdminManagerEditOrderStyled = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .header {
    position: sticky;
    top: 0;
    background-color: #ffffff;
    z-index: ${zIndexHeader};
    display: flex;
    align-items: center;
    padding: 20px 10px;
    &__title {
      font-size: 20px;
      font-weight: bold;
      margin-right: 20px;

      span {
        color: #616161;
      }
    }

    &__filters {
      display: flex;
      align-items: center;

      .inputContainer {
        width: 500px;
        position: relative;
        margin-right: 10px;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
        }

        &__select {
          /* width: 100%; */
          /* padding: 10px; */
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          top: 0;
          width: 130px;
          top: 5px;
          /* height: 100%; */
          height: 24px;
          right: 10px;
          /* margin-right: 20px; */
          /* padding-left: 30px; */
          position: absolute;
        }

        &__input {
          width: 100%;
          padding: 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
          height: 34px;
          margin-right: 20px;
          padding-left: 30px;
        }

        &__clean {
          position: absolute;
          font-size: 16px;
          top: 6px;
          right: 5px;
          color: #ccc;
          padding: 0;
          margin: 0;
          color: #059be5;
        }
      }

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        padding: 8px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }

      .refetchdata {
        .icon {
          padding: 0;
          margin: 0;
          padding: 6px;
        }
        display: flex;
        align-items: center;
        border-radius: 9px;
        padding-right: 20px;
        background-color: rgba(83, 109, 254, 0.2);

        p {
          font-size: 12px;
          font-weight: bold;
        }
      }
    }
  }

  .main {
    flex: 1;
    overflow-y: auto;
    display: flex;
  }

  .containertable {
    height: calc(100vh - 180px);
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
  }

  /* width: 100%;
  display: flex;
  overflow: hidden;

  height: 100vh;
  * {
    margin: 0;
  }

  .content_orders {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 15px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
    }
    &__body {
      .title_orders {
        display: flex;
        flex-direction: column;
        margin-bottom: 40px;
        .title {
          font-size: 24px;
          font-weight: 500;
        }
        .count_orders {
          display: flex;
          align-items: center;
          .count {
            font-size: 14px;
            font-weight: 500;
            margin-right: 5px;
          }
          .title_count {
            font-size: 14px;
            font-weight: 500;
            margin-right: 10px;
          }
          .icon_reload {
            cursor: pointer;
            font-size: 18px;
            margin-bottom: -3px;
            color: ${colors.primaryColorDark};
          }
        }
      }
      .container_cards {
        margin-bottom: 20px;
      }
      .box_search {
        margin-bottom: 10px;
        border: 1px solid #d4d4d4;
        padding: 2px;
        border-radius: 5px;
        font-size: 15px;
        svg {
          color: grey;
          margin: 0px 10px;
        }
      }
      .order_filters {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        .section_order {
          display: flex;
          align-items: center;
          margin-right: 5px;
          .title_orderBy {
            font-size: 14px;
            margin-right: 5px;
          }
          .order_data {
            font-size: 12px;
            height: 25px;
            border-radius: 8px;
            outline: none;
          }
        }
      }
    }
    &__footer {
    }
  } */
`;
