import styled from "styled-components";

export const LayoutReport = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .filters {
    background: #efefef;
    width: 100%;
    padding: 20px;
    margin-bottom: 50px;
    &__selects {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
      gap: 2px;
      .select {
        width: 100%;
      }
    }
    &__dates {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
      gap: 5px;
      .input_date {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 1.5px;
        min-height: 35px;
        width: 100%;
        background-color: hsl(0, 0%, 100%);
        border-color: hsl(0, 0%, 80%);
        border-radius: 4px;
        border-style: solid;
      }
    }
    &__options_show {
      .title {
      }
      .options {
        width: fit-content;
      }
    }
  }
  .section_reports {
    background: #efefef;
    width: 100%;
    display: flex;
    padding: 30px;

    .table {
      display: flex;
      justify-content: center;
      overflow-x: auto;
    }
    .graphics {
      background-color: #fff;
    }
  }
`;
