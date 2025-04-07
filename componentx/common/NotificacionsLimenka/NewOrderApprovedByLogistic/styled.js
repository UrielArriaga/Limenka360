import styled from "styled-components";

export const NewOrderApprovedByLogisticStyled = styled.div`
  .newcomments-container {
    position: absolute;
    top: 50px;
    right: 42px;
    z-index: 1000;
    max-height: calc(100vh - 100px);
    overflow-y: scroll;
    overflow-x: hidden;
    /* background-color: red; */

    &__deleteall {
      display: flex;
      justify-content: center;
      margin-top: 10px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -100%);
      width: 200px;
      height: 100px;
      text-align: center;
      line-height: 100px;
      /* background-color: blue; */
    }
  }

  .newcomments-list-page {
    background-color: red;
    position: absolute;
    padding: 10px;
    top: 0;
    left: 0;
    z-index: 1000;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .newcomments-list-container {
    position: absolute;
    top: 50px;
    right: 42px;
    z-index: 1000;

    overflow-y: scroll;
    overflow-x: hidden;
  }
  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 0px solid #f1f1f1;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  * {
    scrollbar-width: thin;
    scrollbar-color: #888 #f1f1f1;
  }
`;
