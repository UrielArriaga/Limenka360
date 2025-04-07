import styled from "styled-components";
export const ButtonStyle = styled.div`
  .hiddeButton {
    height: 8%;
    border: 1px solid #d0d0d0;
    display: flex;
    align-items: center;
    flex-direction: row-reverse;
    position: absolute;
    top: 50%;
    left: 1%;
    transform: translate(-50%, -50%);
    border-radius: 0 10rem 10rem 0;
    transition: 0.1s;
    cursor: pointer;
    &:hover {
      border-color: #3f51b5;
      svg {
        transform: translate(5px);
        color: #3f51b5;
        /* margin-left: 5px; */
      }
    }
    svg {
      transition: 0.2s;
      margin-right: 5px;
      font-size: 22px;
      color: #d0d0d0;
    }
  }
`;
