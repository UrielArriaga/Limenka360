import styled from "styled-components";

export const DataViewDemoStyled = styled.div`
    
    border-radius: 10px;
    border: 3px dotted #405189;
    padding: 10px;

    .ctr_prospect {
    width: calc(100% - 40px);
    margin: auto;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
    &__info {
      margin-block: 20px;
      width: 100%;
      &__ctr_title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        background-color: red;
        &__title {
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          p {
            font-size: 10px;
            letter-spacing: 0.04em;
            font-weight: 600;
          }
        }
      }
    }
    &__div{
      padding: 10px;
      &__border{
        border: 1px solid #dadada;
        border-radius: 6px;
        padding: 6px;
      }
    }
  }
`;
