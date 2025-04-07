import styled from "styled-components";

export const DashStyled = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
  height: calc(-60px + 100vh);
  width: 100%;
  overflow: hidden auto;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dates {
      display: flex;
      gap: 0.5rem;
      align-items: center;
    }
  }

  .table {
    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    width: 100%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);

    h3 {
      margin-bottom: 20px;
    }
  }
  .MuiFormControl-root.MuiTextField-root.inputdate.inputdate_lte.MuiFormControl-marginNormal {
    margin: 5px;
    height: 30px;
    padding-left: 10px;
    border-radius: 2px;
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width: 168px;
  }
  .tableDataGeneral {
    .title {
      margin-bottom: 20px;
    }

    background-color: #fff;
    border-radius: 4px;
    padding: 20px;
    width: 100%;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    margin-top: 21px;
    .container {
      overflow: auto;
      height: 385px;
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #585858;
      }
    }
  }
`;
