import styled from "styled-components";
export const ExecutivesDashboardStyled = styled.div`
  padding: 10px;
  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin: 0 auto;
    padding-top: 20px;
    height: 100%;
  }

  .grid-item-list {
    /* align-items: flex-start; */

    display: flex;
    flex-direction: column;
    align-items: flex-end;
    gap: 40px;
  }
  .grid-item-funnel {
    align-items: flex-start;
    justify-content: flex-start;
    display: flex;
    flex-direction: column;
    gap: 40px;
  }

  .grid-item-goals {
  }
`;
