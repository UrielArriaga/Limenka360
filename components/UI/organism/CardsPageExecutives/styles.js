import styled, { css } from "styled-components";
import { colors, device } from "../../../../styles/global.styles";

const Guide = css`
  border: 1px solid red;
`;
const CardsManagerLayout = styled.div`
  background-color: #fafafa;
  padding: 20px;

  .goal-container {
    width: 30%;
    height: 100%;
    /* background-color: red; */
  }

  .cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(22rem, 1fr));
    gap: 1rem;
  }

  .carousel-container {
    height: 250px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }

  .cardsbig {
    width: 20%;
    display: flex;
    flex-direction: column;
  }

  .cardbig {
    width: 100%;
    background-color: #ffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-bottom: 10px;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 5px;
    border-bottom: 5px solid #1e8449;
    .title {
    }

    .totalAmount {
      font-size: 20px;
      font-weight: bold;
    }
  }

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    /* border: 1px solid red; */
  }
`;

export { CardsManagerLayout };
