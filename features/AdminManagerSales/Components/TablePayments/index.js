import React from "react";
import { formatDate, formatNumber } from "../../../../utils";

export default function TablePayments({ payments = [] }) {
  return (
    <div className="table">
      <div className="tableheader">
        <div className="tablehead">
          <p>fecha</p>
        </div>
        <div className="tablehead ">
          <p>concepto</p>
        </div>

        <div className="tablehead tablecellproductname">
          <p>monto</p>
        </div>
        <div className="tablehead center">
          <p>comision</p>
        </div>
        <div className="tablehead center">
          <p>Referencia</p>
        </div>
        <div className="tablehead center">
          <p>Estado Pago</p>
        </div>
      </div>

      <div className="tablebody">
        {payments.map((item, index) => (
          <div className="tablerow" key={index}>
            <div className="tablecell">
              <p>{formatDate(item?.date)}</p>
            </div>
            <div className="tablecell">
              <p>{item?.oportunity?.concept}</p>
            </div>

            <div className="tablecell tablecellproductname">
              <p>{formatNumber(item?.payment)}</p>
            </div>
            <div className="tablecell center">
              <p>{item?.comission}</p>
            </div>
            <div className="tablecell center">{item?.observations ? <p>{item.observations}</p> : <span>N/A</span>}</div>
            <div className="tablecell center">
              {item.ispaid === true ? <p className="paidOut"> Pagado</p> : <p className="paidPending"> Pendiente</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
