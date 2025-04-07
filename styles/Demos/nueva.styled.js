import styled from "styled-components";
export const NuevoStyled = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  overflow: hidden;
  height: 100vh;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  padding: 20px;
  .titlePage {
    color: #fff;
  }

  .form_container {
    margin: auto;
    padding: 25px 20px;
    margin-top: 26px;
    margin-bottom: 20px;
    min-height: calc(100% - 50%);
    background-color: rgba(255, 255, 255, 0.85);
    border-radius: 8px;
    box-shadow: 0px 6px 15px rgb(64 79 104 / 5%);

    .inputs_row {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
    }
    .input_container {
      width: 32%;
      margin-bottom: 20px;
      .label {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }

      .input_text {
        background-clip: padding-box;
        background-color: #fff;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
        color: #495057;
        display: block;
        font-size: 0.8125rem;
        font-weight: 400;
        line-height: 1.5;
        padding: 0.47rem 0.75rem;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
        width: 100%;
        min-height: 38px;
      }
    }
  }
`;
