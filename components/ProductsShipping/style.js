import { Paper, Popover } from "@material-ui/core";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";

export const ProductsStyle = styled.div`
  width: 100%;

  .title_Products {
    font-size: 13px;
    font-weight: bold;
    color: #4f4f4f;
    .icon_title {
      margin-left: 5px;
      font-size: 19px;
      transition: 0.2s;
      margin-bottom: -2px;
      &:hover {
        cursor: pointer;
        color: ${colors.primaryColorDark};
      }
    }
  }
  .ctr_gridProduct {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 100%;
    overflow-x: auto;
    padding: 0px 1px;

    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #0c203b;
    }
    .phase {
      display: flex;
      align-items: center;
      svg {
        color: green;
        font-size: 17px;
      }
    }
  }
  .container_products {
    width: 100%;
    height: 23vh;
    grid-gap: 15px;
    padding: 10px;
    grid-template-columns: repeat(auto-fill, minmax(20vh, 1fr));
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px grey;
    }
    .default {
      height: 90px;
      font-size: 40px;
    }
  }
  .pagination {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .title_count {
      font-size: 14px;
      color: grey;
      .count {
        font-weight: 500;
        color: black;
      }
    }
    .navigation_buttons {
      display: flex;
      align-items: center;
      svg {
        font-size: 20px;
        color: blue;
      }

      .pagesCount {
        margin-top: -2px;
        margin-right: 15px;
        font-size: 13.5px;
        font-weight: 500;
        color: grey;
      }
      .btBack {
        width: 30px;
        height: 30px;
        margin-right: 5px;
      }
      .btNext {
        width: 30px;
        height: 30px;
        margin-left: 5px;
      }
    }
  }
`;
