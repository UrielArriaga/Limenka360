import styled from "styled-components";

export const StylesContainer = styled.div`
  .dataOportunity {
    margin-bottom: 20px;
    .header {
      display: flex;
      align-items: center;
      .titleHead {
        font-size: 18px;
        letter-spacing: 0.04em;
        font-weight: 600;
        color: rgb(86, 86, 86);
      }
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        background: rgb(220, 225, 246);
        color: rgb(16, 60, 130);
        border-radius: 50%;
        margin-left: 5px;
      }
    }

    .title {
      font-size: 14px;
      color: grey;
    }
    .data {
      font-weight: 500;
    }

    .capitalize {
      text-transform: capitalize;
    }
  }
`;
