import React from "react";
import styled from "styled-components";
import { formatNumber } from "../../../../utils";

export default function TableProducts({ productsData }) {
  const { products, isFetching, count, isError, isSuccess } = productsData;
  return (
    <TableProductsStyled>
      <div className="table">
        <div className="tableheader">
          <div className="tablehead">Codigo</div>
          <div className="tablehead">Cantidad</div>
          <div className="tablehead">Marca</div>
          <div className="tablehead tableheadproductname">Producto</div>
          <div className="tablehead">Precio</div>
          <div className="tablehead">Iva</div>
          <div className="tablehead">SubTotal</div>
          <div className="tablehead">Nota</div>
        </div>

        <div className="tablebody">
          {products.map((item, index) => (
            <div className="tablerow" key={index}>
              <div className="tablecell code">
                <p>{item?.product.code}</p>
              </div>
              <div className="tablecell center">
                <p>{item.quantity}</p>
              </div>
              <div className="tablecell">
                <p>{item?.product.brand?.name}</p>
              </div>
              <div className="tablecell tableheadproduct">
                <p>{item?.product?.name}</p>
              </div>
              <div className="tablecell">
                <p>{formatNumber(item?.newprice)}</p>
              </div>
              <div className="tablecell">
                <p>{formatNumber(item.iva)}</p>
              </div>
              <div className="tablecell">
                <p>{formatNumber(item.total)}</p>
              </div>
              <div className="tablecell">
                <p>{item.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TableProductsStyled>
  );
}

const TableProductsStyled = styled.div`
  margin-bottom: 30px;
  box-shadow: rgb(0 0 0 / 15%) 1.95px 1.95px 7.6px;
  max-height: 70vh;
  margin-top: 29px;
  .table {
    width: 100%;
    border-collapse: collapse;
    font-size: 12px;
  }

  .tableheader {
    display: flex;
    background-color: #405189;
    color: white;
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
    padding: 10px;
    font-weight: bold;
    position: sticky;
    gap: 10px;

    .tablehead {
      flex: 1;

      text-align: left;
      font-weight: bold;
    }

    .tableheadproductname {
      flex: 2;
    }
    .center {
      text-align: center;
    }
  }

  .tablerow {
    display: flex;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px;
    font-weight: bold;
    min-height: 40px;
    gap: 10px;

    color: #616161;
    cursor: pointer;

    .tablecell {
      flex: 1;

      text-align: left;
      color: #616161;
      font-weight: bold;
    }

    .totalToExit {
      flex: 1;

      color: #fff;
      font-weight: bold;
      background-color: #039be5;
      border-radius: 8px;
      padding: 4px;
      text-align: center;
    }
    .code {
      color: #000;
    }

    .actions {
      button {
        margin-right: 10px;
        background-color: #405189;
        color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        padding: 5px 10px;
      }
    }

    .tableheadproduct {
      flex: 2;

      .content {
        width: 80%;
      }
    }
    .center {
      text-align: center;
      font-size: 14px;
    }
  }
`;
