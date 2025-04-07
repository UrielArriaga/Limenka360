import styled from "styled-components";
import { colors, zIndexHeader } from "../../styles/global.styles";
import { Switch, withStyles } from "@material-ui/core";

export const DemosStyled = styled.div`
  /* width: 100%;
  display: flex;
  overflow: hidden;
  /* background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png"); */
  /* height: calc(100vh - 60px);
  background-size: cover;
  background: #fff; */
  /* * {
    margin: 0;
  }  */
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
        width: 300px;
        position: relative;
        margin-right: 10px;
        &__icon {
          position: absolute;
          font-size: 16px;
          top: 8px;
          left: 10px;
          color: #ccc;
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

    /* background-color: #103c82; */
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
  .content_demo {
    width: calc(100% - 5px);
    min-height: calc(100vh - 60px);
    margin: auto;
    margin-top: 26px;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    /* border-radius: 10px; */
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__header {
      margin-bottom: 30px;
      .title_header {
        font-size: 27px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      .totals {
        display: flex;
        align-items: center;
        .icon_demo {
          font-size: 18px;
          margin-right: 2px;
          color: ${colors.primaryColorDark};
        }
        .count {
          margin-right: 5px;
          font-size: 14px;
          font-weight: 500;
        }
        .title {
          margin-right: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        .icon_reload {
          font-size: 18px;
          cursor: pointer;
          color: ${colors.primaryColorDark};
        }
      }
    }
    &__body {
      .chips_box {
        margin-bottom: 20px;
        display: flex;
        gap: 5px;
      }
      .orders {
        margin-bottom: 20px;
        display: flex;
        justify-content: end;
        align-items: center;
        gap: 10px;
        .contentOrder {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .order-select {
          padding: 4px;
          border: 1.6px solid #103c82;
          border-radius: 8px;
          outline: none;
        }
      }
      .table_demos {
        &__pagination {
          width: 100%;
          height: auto;
          display: flex;
          justify-content: right;
          align-items: center;
          margin-top: 25px;
        }
      }
      .ctr_filter {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        &__ctr_input {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          margin-bottom: 10px;
          .inputText {
            width: 100%;
            height: 40px;

            input {
              padding-left: 40px;
              padding-right: 40px;
            }
          }
          .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
            border-radius: 10px;
          }
          .search {
            width: 30px;
            height: 30px;
            padding: 5px;
            color: #8a8a8a;
            transition: all 0.4s ease;
            position: absolute;
            left: 10px;
          }
          .filters {
            width: 30px;
            height: 30px;
            padding: 5px;
            color: #8a8a8a;
            transition: all 0.4s ease;
            position: absolute;
            right: 10px;
            &:hover {
              padding: 3px;
              cursor: pointer;
            }
          }
        }
      }
    }
    &__footer {
    }
  }
`;


export const PurpleSwitch = withStyles({
    switchBase: {
      color: colors.primaryColor,
      "&$checked": {
        color: colors.primaryColor,
      },
      "&$checked + $track": {
        backgroundColor: colors.primaryColor,
      },
    },
    checked: {},
    track: {},
  })(Switch);