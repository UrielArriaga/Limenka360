import styled from "styled-components";

export const InformationProductStyled = styled.div`

.contentpreview {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    background-color: #ffffff;
    border-radius: 9px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    max-height: calc(100vh - 268px);
    overflow: auto;
   
    &__products {
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;

        thead {
          position: sticky;
          top: 0;
          z-index: 1;
          background-color: #405189;

          tr {
            th {
              color: white;
              padding: 10px;
              text-align: left;
              font-weight: bold;
            }
          }
        }

      

      }
    }
  }
  
  padding: 30px 10px;

  .information {
    &__title {
      margin-bottom: 18px;
      display: flex;
      align-items: center;
      p {
        font-size: 1.5rem;
        color: #000;
        margin-bottom: 10px;
      }
      .icon {
        width: 30px;
        height: 30px;
        padding: 5px;
        margin-right: 5px;
        background: rgb(220, 225, 246);
        color: rgb(12, 32, 59);
        border-radius: 50%;
      }
    }
    &__body {
      margin-left: 31px;
      .label {
        display: flex;
        align-items: baseline;
        line-height: 25px;
        .name {
          font-weight: bold;
          color: rgb(79, 79, 79);
          margin-bottom: 20px;
          margin-right: 7px;
          width: 200px;
        }
        .na {
          color: #9e9e9e;
        }
      }
    }
  }

`;

