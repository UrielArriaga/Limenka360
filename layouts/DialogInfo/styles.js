import styled from "styled-components";

export const DialogInfoStyled = styled.div`
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  animation: fadeIn 0.7s both;
  width: 300px;
  margin-right: 10px;
  background-color: #fff;
  height: 500px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  border-radius: 8px;
  .header {
    padding: 10px 10px;
    display: flex;
    justify-content: space-between;

    svg {
      cursor: pointer;
    }
  }

  .body {
    padding: 10px;
  }
`;
