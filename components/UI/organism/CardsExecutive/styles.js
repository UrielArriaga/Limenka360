import styled from "styled-components";
import { device } from "../../../../styles/global.styles";

const CardsManagerLayout = styled.div`
  .row {
    display: flex;
    align-items: center;
  }
  .goal-container {
    width: 100%;
    height: 100%;
  }
  .cards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(21rem, 1fr));
    gap: 1rem;
  }

  .carousel-container {
    height: 280px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
`;

export { CardsManagerLayout };
