import styled from "styled-components";

export const DirectionsProviderStyled = styled.div`
  display: flex;
  h3 {
    font-size: 14px;
    color: rgb(86 86 86);
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 4px;
    font-weight: 550;
  }
  .addressProvider {
    margin: 0.5%;
    box-shadow: rgba(17, 17, 26, 0.05) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 0px 8px;
    padding: 7px;
    &:hover {
      cursor: pointer;
      box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    }
    P {
      font-size: 13px;
      color: rgb(86 86 86);
      font-weight: 550;
      padding: 2px;
    }

  }
  .addressProviderSelected {
    margin: 0.5%;
    border: 2px solid rgba(136, 165, 191, 0.48) ;
    padding: 7px;
    &:hover {
      cursor: pointer;
      box-shadow: rgba(136, 165, 191, 0.48) 6px 2px 16px 0px, rgba(255, 255, 255, 0.8) -6px -2px 16px 0px;
    }
    P {
      font-size: 13px;
      color: rgb(86 86 86);
      font-weight: 550;
      padding: 2px;
    }

  }
`;
