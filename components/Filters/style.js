import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export const FilterStyled = styled.div`
  .filtercomponent {
    .container_dates {
      display: flex;
      align-items: center;
      .content_date {
        display: flex;
        flex-direction: column;
        .title {
          font-weight: 500;
        }
        .date {
          display: flex;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
            "Helvetica Neue", sans-serif;
          border: none;
          margin: 1px;
          border: 1px solid #bdbdbd;
          border-radius: 5px;
          padding: 2px;
          svg {
            color: #776ceb;
          }
        }
      }
      .button_close {
        margin-top: 22px;
        .icon {
          font-size: 20px;
          color: ${colors.bgDirector};
        }
      }
    }
    .container_filters {
      height: 38px;
      display: flex;
      /* align-items: center; */
      align-items: flex-start;
      .btShowFilters {
        background-color: ${colors.bgDirector};
        color: #fff;
        height: 30px;
        border-radius: 7px;
        margin-right: 5px;
        .icon {
          font-size: 18px;
        }
        .title_button {
          font-size: 12px;
        }
      }
      .select_filters {
        width: 0px;
        overflow: hidden;
        display: flex;
        flex-direction: row;
        transition: 0.2s;
        font-size: 12px;
        .select_style {
          width: 100%;
        }
        .margin_right {
          margin-right: 5px;
        }
      }
      .selected {
        width: 400px;
        overflow: visible;
      }
      .select_options {
        width: 410px;
      }
    }
  }
  @media (max-width: 600px) {
    margin: 10px 0;
    /* height: 80px; */

    .container_filters {
      height: 40px;
      height: 100px;
      overflow-y: visible;
      display: flex;
    }

    .select_filters {
      width: 0px;
      font-size: 12px;
      overflow: visible;

      .select_style {
        width: 180px;
      }
      .margin_right {
        margin-right: 5px;
      }
    }
    .selected {
      width: 260px !important;
    }
    .select_options {
      width: 260px;
    }
  }
  @media (max-width: 600px) {
    .selected {
      width: 200px !important;
    }
    .select_options {
      width: 200px;
    }
  }
`;
