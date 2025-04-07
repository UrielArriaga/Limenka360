import React from "react";
import { formatNumber } from "../../../../utils";
import NumberFormat from "react-number-format";

export default function TableProducts({ products = [] }) {
  return (
    <div className="table">
      <div className="tableheader">
        <div className="tablehead">
          <p>Codigo</p>
        </div>
        <div className="tablehead ">
          <p>Cantidad</p>
        </div>

        <div className="tablehead tablecellproductname">
          <p>Producto</p>
        </div>
        <div className="tablehead center">
          <p>Monto</p>
        </div>
      </div>

      <div className="tablebody">
        {products.map((productoportunity, index) => (
          <div className="tablerow" key={index}>
            <div className="tablecell">
              <p>{productoportunity?.product?.code}</p>
            </div>
            <div className="tablecell">
              <p>{productoportunity?.quantity}</p>
            </div>

            <div className="tablecell tablecellproductname">
              <p>{productoportunity?.product?.name}</p>
            </div>
            <div className="tablecell center">
              <p>
                {productoportunity.newprice === 0
                  ? formatNumber(productoportunity.product?.callamount)
                  : formatNumber(productoportunity.newprice)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
