import styled from "styled-components";

export const ProductsStyle = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    .input_datas {
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
      -webkit-transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      min-height: 38px;
      /* Remove spin buttons in WebKit browsers (Chrome, Safari) */
      -webkit-appearance: none;

      /* Remove spin buttons in Firefox */
      -moz-appearance: textfield;
    }
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
        td {
          padding: 4px 0px 0px 9px;
          text-align: left;
          color: #616161;
          font-weight: bold;

          input[type="number"] {
            width: 100%;
            box-sizing: border-box;
            padding: 5px;
            margin: 0; /* Ensure margin is set to 0 to avoid layout issues */
          }
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

  .buttonss {
    display: flex;
    align-items: center;
    justify-content: end;
    margin-top: 42px;
    margin-bottom: 15px;

    .add {
      color: rgb(64, 122, 255);
      border: 1px solid rgb(64, 122, 255);
      text-transform: capitalize;
      font-size: 12px;
    }
  }
`;
