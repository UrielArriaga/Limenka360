import styled from "styled-components";

export const EntriesProductUnitStyled = styled.div`
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
  }

  .products {
    margin: 0px 31px 31px 31px;
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
            padding: 10px;
            text-align: left;
            color: white;
            font-weight: bold;
          }
        }
      }
      tbody {
        tr {
          td {
            padding: 10px;
            text-align: left;
            color: #616161;
            font-weight: bold;
          }
        }
      }
    }
  }
`;
