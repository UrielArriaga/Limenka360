import styled from "styled-components";

export const StylesDirectCompras = styled.div`
  height: 90vh;

  .content_calendar {
    display: flex;
    width: 100%;

    /* border: 1px solid red; */
    height: 590px;
    .calendar {
      padding: 10px;
      /* background-color: rebeccapurple; */
      width: 50%;
      min-height: 570px;
      background-color: #fff;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    }
  }
  .head_content {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px;
  }
  .content_filters {
    align-items: center;
    display: flex;
    .title_filter {
      font-weight: 700;
      margin-right: 5px;
    }
    .select-options {
      width: 300px;
    }
  }
`;
