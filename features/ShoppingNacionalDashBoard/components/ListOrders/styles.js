import styled from "styled-components";

export const ListOrdersStyled = styled.div`
  border-top: 1px solid #ccc;
  background: white;
  .titleTable{
    h3{
      padding: 10px 10px;
      background-color:#f0f1f1;
      font-weight: 600;
      font-size: 20px;
      display: flex;
      justify-content: space-between;
      .CountOrdersIcon{
        color:rgba(48, 79, 254, 0.7); 
      }
    }
  }

  .listitems {
    height: calc(-197px + 80vh);
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
        .pendigsType{
          margin-right: 10px;
          background-color: #097a09;
          padding: 5px;
          border-radius: 12px;
          font-size: 11px;
          color: white;
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
        font-size: 11px;
      }
    }
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
