import styled from "styled-components";

export const ReportExecutivesLayout = styled.div`
  background-image: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  width: 100%;
  display: flex;
  height: 100vh;
  background-size: cover;
  overflow-y: hidden;
  overflow-x: hidden;
  * {
    margin: 0;
  }
  .main {
    &__container {
      padding: 25px;
    }
  }
`;

export const ReportExecutive = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background-image: linear-gradient(to right top, #0c203b, #193f64, #216290, #2287bd, #12afeb);
  height: 100vh;
  * {
    margin: 0;
  }

  h2 {
    color: #000;
    margin-top: 5px;
    margin-bottom: 10px;
    text-transform: capitalize;
  }
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .ctr_Reports {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }
`;

 export const BoxWhite = styled.div`
  width: calc(100% - 40px);
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  min-height: calc(100% - 100px);
  padding: 25px 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
`;


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

