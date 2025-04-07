import styled from "styled-components";

export const LogisticLayout = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  /* background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png"); */
  height: 100vh;
  background-size: cover;

  main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .ctr_filter {
      display: flex;
      align-items: center;
      width: 100%;
      justify-content: space-between;
      padding: 0 1em;
      &__ctr_input {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        position: relative;
        margin-bottom: 10px;
        .inputText {
          width: 100%;
          height: 40px;
          input {
            padding-left: 40px;
            padding-right: 70px;
          }
        }
        .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
          border-radius: 10px;
        }
        .search {
          width: 30px;
          height: 30px;
          padding: 5px;
          color: #8a8a8a;
          transition: all 0.4s ease;
          position: absolute;
          left: 10px;
        }
      }
    }
    .container {
      &-buttons {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding: 0 1em;
      }
    }
  }
`;
