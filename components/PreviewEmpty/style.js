import styled from "styled-components";
export const EmptyStyle = styled.div`
  .empty {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    &__title {
      color: #abb2b9;
    }
    &__image {
      margin-top: 50px;
      margin-bottom: 15px;
      width: 120px;
      height: 120px;
    }
  }
`;
