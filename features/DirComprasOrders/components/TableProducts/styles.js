import styled from "styled-components";

export const TableStyled = styled.div`
  .products {
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

      tbody {
        tr {
          border-bottom: 2px solid #e0e0e0;
          td {
            padding: 4px 0px 0px 9px;
            text-align: left;
            color: #616161;
            font-weight: bold;
            height: 60px;
          }
        }
      }

      .load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        &__img {
          width: 150px;
          animation: slide 3s infinite;

          img {
            width: 100%;
            object-fit: contain;
          }
        }
      }
    }

    .icnButton {
      background-color: #405189;
      padding: 2px;

      .icon {
        color: #fff;
      }
    }
  }
  .totalAmount {
    display: flex;
    justify-content: end;
    margin-top: 15px;
    p {
      font-weight: bold;
    }
  }
`;
