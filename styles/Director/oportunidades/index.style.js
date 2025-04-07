import { colors, device } from "../../global.styles";
import styled from "styled-components";
export const OportunidadesStyled = styled.div`
  overflow: hidden;
  height: 100%;
  background-color: #f1f1f1;

  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
  }
  * {
    margin: 0;
  }

  .main {
    height: 100%;
    overflow-y: auto;
  }
  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  .container {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
    }
    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
  .chips_filters {
    display: flex;
    align-items: center;
    overflow-y: hidden;
    overflow-x: auto;
    margin-bottom: 6px;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.bgDirector};
    }
    .chip {
      margin-right: 5px;
    }
  }
  .table_pagination {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
    margin-top: 20px;
  }

  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .head .totalrows {
    display: flex;
    align-items: center;
    .count {
      font-size: 14px;
      font-weight: 600;
    }
    .loader {
      font-size: 18px;
      margin-left: 10px;
      cursor: pointer;
      color: rgb(16, 60, 130);
    }
  }

  .head .btnadd {
    text-transform: capitalize;
    color: #fff;
    background-color: #405189;
  }
  // ** Start Search
  .search {
    margin-bottom: 20px;
  }
  .inputicon {
    position: relative;

    .searchicon {
      position: absolute;
      top: 10px;
      left: 8px;
    }

    input {
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      padding-left: 40px;

      &:focus {
        outline: 1px solid ${colors.primaryColor};
      }
    }
  }
  // ** Finish Search

  // ** Start Filter Section

  .filters {
    align-items: end;
    @media ${device.sm} {
      display: flex;
      justify-content: right;
    }
  }

  .currentfilters {
    .chip {
      svg {
        color: ${colors.primaryColor};
      }
    }
  }
  // ** Finish Filter Section
`;
