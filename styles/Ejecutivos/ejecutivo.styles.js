import styled from "styled-components";
import { colors } from "../global.styles";

export const ExecutiveStyled = styled.div`
  background-color: #f3f3f9;
  /* height: 100vh; */
  .header {
    /* background-color: ${colors.primaryColorDark}; */
    display: flex;
    background-color: #fff;
    justify-content: space-between;
    padding: 20px;
    height: 60px;
    font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  }

  .header .executivename {
    /* color: #fff; */
    font-weight: bold;
  }

  .header svg {
    /* color: #fff; */
    font-size: 30px;
  }

  .content {
    padding: 20px;
  }

  .cards {
    display: flex;
    gap: 20px;
  }

  .cards .card {
  }

  .filters {
    select {
      height: 46px;
      width: 309px;
      padding-left: 15px;
      border-width: 0px;
      outline: none;
      border-radius: 5px;
      background-color: #fff;
      border: 1px solid #bdbdbd;
    }
  }

  .date_bar {
    display: flex;
    justify-content: space-between;
  }
  .current_date {
    display: flex;
    align-items: center;
  }

  .date {
    font-weight: bold;
  }
  .dates {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 5px;
  }

  .btn {
    margin: 0 5px;
    border: 1px solid ${colors.primaryColorDark};
  }

  .date_selected {
    background-color: ${colors.primaryColorDark};
    color: #fff;
  }
`;
