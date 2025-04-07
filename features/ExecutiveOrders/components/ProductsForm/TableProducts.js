import React from "react";
import { formatNumber } from "../../../../utils";
import { Delete, Edit } from "@material-ui/icons";

export default function TableProducts({ products }) {
  return (
    <div className="tablecontainer">
      <div className="table">
        <div className="tableheader">
          <div className="tablehead">
            <p>Código</p>
          </div>

          <div className="tablehead">
            <p>Nombre del Producto </p>
          </div>

          <div className="tablehead">
            <p>Cantidad</p>
          </div>

          <div className="tablehead">
            <p>Precio Unitario</p>
          </div>

          <div className="tablehead">
            <p>Iva</p>
          </div>

          <div className="tablehead">
            <p>Envio</p>
          </div>
          <div className="tablehead">
            <p>Total</p>
          </div>

          <div className="tablehead actionsth">
            <p>Acciones</p>
          </div>
        </div>

        <div className="tablebody">
          {products.map((prdGeneral, index) => {
            return (
              <div className="tablerow">
                <div className="tabledata">
                  <p>{prdGeneral?.product?.code}</p>
                </div>

                <div className="tabledata">
                  <p>{prdGeneral?.product?.name}</p>
                </div>

                <div className="tabledata">
                  <p>{prdGeneral?.quantity}</p>
                </div>

                <div className="tabledata">
                  <p>{formatNumber(prdGeneral?.newprice)}</p>
                </div>

                <div className="tabledata">
                  <p>{formatNumber(prdGeneral?.iva)}</p>
                </div>

                <div className="tabledata">
                  <p>{formatNumber(prdGeneral?.totalShipping || 0)}</p>
                </div>

                <div className="tabledata">
                  {prdGeneral?.totalShipping > 0 && (
                    <div className="fulltotal">
                      <p>{formatNumber(prdGeneral?.total)}</p>
                      <p>+</p>
                      <p>{formatNumber(prdGeneral?.totalShipping)}</p>
                      <p>=</p>
                      <p>{formatNumber(prdGeneral?.totalwithshipping)}</p>
                    </div>
                  )}

                  {(prdGeneral?.totalShipping === 0 || !prdGeneral?.totalShipping) && (
                    <p>{formatNumber(prdGeneral?.total)}</p>
                  )}
                </div>

                <div className="tabledata">
                  <div className="row">
                    <Edit />
                    <Delete />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
