import styled from "styled-components";

export const InformationProductStyled = styled.div`
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
  .table {
    margin-top: 20px;
    .title {
      font-size: 1.2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .products {
      overflow-x: auto;
    }

    table {
      width: 100%;
      border-collapse: collapse;
      box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      overflow: hidden;
    }

    thead {
      background-color:rgb(36, 69, 113);
      color: white;
    }

    th {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: center; /* Centra el texto de los encabezados */
    }

    td {
      padding: 12px;
      border-bottom: 1px solid #ddd;
      text-align: center;
    }

    tbody tr:hover {
      background-color: #f1f1f1;
    }

    .no-products {
      text-align: center;
      font-style: italic;
      color: #9e9e9e;
    }
  }
`;
