import styled from "styled-components";
import { colors } from "../global.styles";
import { Switch, withStyles } from "@material-ui/core";

export const DemoStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: calc(100vh - 60px);
  background-size: cover;
  * {
    margin: 0;
  }
  .content_demo {
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
