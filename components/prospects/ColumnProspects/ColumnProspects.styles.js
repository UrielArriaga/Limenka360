import styled from "styled-components";

export const ColumnProspectsStyled = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background: #fff;
  margin-right: 20px;
  height: 600px;
  border-radius: 8px;
  flex-basis: 18%;
  flex-shrink: 0;

  .title {
    padding: 10px;
    display: flex;
    align-items: center;

    h1 {
      font-size: 17px;
      text-transform: capitalize;
      border-radius: 10px;
      margin-right: 10px;
    }

    svg {
      font-size: 12px;
    }

    .counter {
      color: green;
      display: flex;
      align-items: center;
      font-size: 20px;
    }
  }

  .containerscroll {
    padding-right: 10px;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px #bdbdbd;
    }
  }
`;
