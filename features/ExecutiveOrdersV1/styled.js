import styled from "styled-components";

export const ExecutiveProspectsStyled = styled.div`
  /* background-image: url("https://b24-5laalz.bitrix24.mx/bitrix/templates/bitrix24/themes/light/foggy-horizon/foggy-horizon.jpg"); */
`;
export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2px;
  margin-bottom: 5px;
  margin-top: -10px;

  h1 {
    font-size: 1.4rem;
    color: #333;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
  }

  .refresh-button {
    color: #5D5D5D;
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: rotate(30deg);
      color: #007bff;
    }
  }

  .MuiBadge-badge {
    background-color: #ff5722;
  }
`;
