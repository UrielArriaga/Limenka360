import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const EditOrderStyle = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .content_editOrder {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .header {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 30px;
        .bt_back {
          width: 33px;
          height: 33px;
          background-color: ${colors.primaryColorDark};
          margin-bottom: -3px;
          svg {
            color: #fff;
          }
        }
        .title_header {
          font-size: 23px;
          font-weight: 500;
          margin-left: 5px;
        }
      }
      .data_oportunity {
        margin-bottom: 20px;
        .title_op {
          font-size: 17px;
          font-weight: 500;
        }
        .title_data {
          font-size: 13px;
          color: grey;
          margin-bottom: 2px;
        }
        .data {
          font-weight: 500;
        }
        .observations {
          width: 100%;
          height: 50px;
          padding: 5px;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell,
            "Open Sans", "Helvetica Neue", sans-serif;
          resize: none;
          outline: none;
          border-radius: 5px;
          border: 1px solid #d4d4d4;
          font-weight: 500;
        }
      }
      .body {
        display: flex;
        align-items: center;
        height: 47vh;
        .tabs {
          width: fit-content;
          border: 1px solid #d4d4d4;
          display: flex;
          flex-direction: column;
          height: 100%;
          border-right: none;
          .tab_option {
            width: 200px;
            font-size: 13px;
            border-bottom: 1px solid #d4d4d4;
            text-transform: capitalize;
            height: 40px;
            display: flex;
            justify-content: left;
            svg {
              margin-top: -3px;
              font-size: 18px;
              color: grey;
            }
            .error {
              color: red;
            }
          }
          .active {
            color: #fff;
            background-color: ${colors.primaryColorDark};
            svg {
              color: #fff;
            }
          }
        }
        .content_render {
          width: 100%;
          height: 100%;
          border: 1px solid #d4d4d4;
          padding: 20px;
        }
      }
      .buttons {
        margin-top: 10px;
        display: flex;
        flex-direction: row-reverse;
        .bt_save {
          text-transform: capitalize;
          background-color: ${colors.primaryColorDark};
          color: #fff;
        }
      }
    }
  }
`;

export const SelectFormStyle = {
  control: (base, state) => ({
    ...base,
    width: "100%",
    height: 35,
    minHeight: 30,
    fontSize: 13,
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #dcdcdc" : "1px solid #dcdcdc",
    },
  }),

  valueContainer: base => ({
    ...base,
    marginTop: -4,
  }),
};
