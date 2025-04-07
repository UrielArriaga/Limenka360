import styled from "styled-components";

export const ListOrdersStyled = styled.div`
  border-top: 1px solid #ccc;
  background: white;
  .listitems {
    height: calc(-197px + 100vh);
    width: 100%;
    overflow: hidden auto;
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
  .statusBuy{
      font-size:11px;
      color: white;
      background-color: #039be5;
      border-radius: 18px;
      padding: 4px;
    }
  .cardLoader {
    min-height: 68px;
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
        margin-bottom: 10px;
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
  .pagination {
    background-color: #fff;
    padding: 10px;
    border-top: 1px solid #ccc;
    z-index: 10;
    position: sticky;
    bottom: 0;
  }
`;
