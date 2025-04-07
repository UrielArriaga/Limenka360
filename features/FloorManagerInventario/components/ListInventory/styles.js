import styled from "styled-components";
import { colors } from "../../../../styles/global.styles";

export const ListOrdersStyled = styled.div`
  border-top: 1px solid #ccc;
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;

  .listitems {
    flex: 1;
    overflow-y: auto;
    max-height: calc(100vh - 200px);
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #616161;
    }
  }

  .pagination {
    background-color: #fff;
    padding: 10px;
    border-top: 1px solid #ccc;
    z-index: 10;
    position: sticky;
    bottom: 0;
  }

  .card {
    min-height: 50px;
    border-bottom: 1px solid #ebeaf2;
    padding: 10px;
    display: flex;
    align-items: flex-start;
    cursor: pointer;

    &:hover {
      background-color: #f1f1fa;
    }
    &__isselectable {
      margin-right: 10px;
    }

    &__column {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      width: 100%;
      font-size: 13px;

      &--name {
        text-transform: capitalize;
        color: #034d6f;
        font-weight: 500;
        margin-bottom: 4px;
      }

      &--folio {
        display: flex;
        p {
          margin-right: 10px;
        }
      }
    }
    &__status {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 11px;
      width: 30%;
      padding: 4px;
      border-radius: 18px;
      p {
        font-weight: bold;
        color: #000;
        margin: 0;
        font-size: 9px;
      }
    }
  }

  .card-selected {
    background-color: #f1f1fa;
  }
`;
