import React from "react";

export default function TableEmpty({ heads }) {
  return (
    <>
      <div className="table empty">
        <table className="ctr_table">
          <thead className="ctr_table__head">
            <tr className="ctr_table__head__tr">
              {heads.map((item, index) => (
                <th className="title " key={index}>
                  <div className="ctr_title">
                    <p>{item}</p>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        </table>
      </div>
      <div className="body_empty">
        <div className="message_ctr">
          <img src="/empty_table.svg" />
          <p>Aun no hay datos</p>
        </div>
      </div>
    </>
  );
}
