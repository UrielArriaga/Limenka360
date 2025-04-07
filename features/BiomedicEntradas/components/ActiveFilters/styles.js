import styled from "styled-components";

export const ContainerActiveFiltersRecolecion = styled.div`
  display: flex;
  padding: 0px 10px;
  margin-bottom: 20px;
  z-index: 1000000000000 !important;

  .reactSelect {
    width: 200px;
    margin-right: 10px;
  }

  .textfiltersactive {
    font-size: 12px;
    margin-right: 10px;
    color: #034d6f;
    font-weight: bold;
  }

  .chipselected {
    background-color: #039be5;
    color: #fff;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    display: flex;
    align-items: center;

    .chipselected__text {
      margin-right: 5px;
      font-size: 12px;
    }

    .chipselected__icon {
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
  }
`;