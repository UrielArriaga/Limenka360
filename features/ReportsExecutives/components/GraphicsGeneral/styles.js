import styled, { css } from "styled-components";

export const TableEmptyFake = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 250px;

  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
  h3 {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
