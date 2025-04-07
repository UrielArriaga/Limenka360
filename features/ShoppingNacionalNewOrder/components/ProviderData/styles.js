import styled from "styled-components";

export const ProviderDataStyled = styled.div`
  .title {
    font-size: 15px;
    color: rgb(86 86 86);
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    .icon {
      width: 30px;
      height: 30px;
      padding: 5px;
      background: rgb(220, 225, 246);
      color: rgb(16, 60, 130);
      border-radius: 50%;
      margin-right: 6px;
    }
  }
  .dataProvider {
    display: flex;
    justify-content: space-between;
    &__item {
      padding: 5px;
      font-size: 13px;
      color: rgb(86 86 86);
      font-weight: 550;
    }
  }
`;
