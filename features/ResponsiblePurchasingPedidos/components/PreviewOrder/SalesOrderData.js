import dayjs from "dayjs";
import React from "react";
import { getColorStatusOrder } from "../../../../utils/DirLog";

export default function SalesOrderData({ orderSelectedData }) {
  return (
    <div>
      <h4>Orden de Venta</h4>
      <p>
        Folio de Orden: <span>{orderSelectedData?.folio}</span>
      </p>
      <p>
        Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
      </p>
      <div className="logisticStatus">
        <p>Estatus Logistica:</p>
        <div
          style={{
            display: "inline-block",
            background: getColorStatusOrder(orderSelectedData?.exitstatus).bgColor,
            borderRadius: 15,
            padding: "2px 8px",
          }}
        >
          <p style={{ fontSize: 12, color: getColorStatusOrder(orderSelectedData?.exitstatus).color }}>
            {orderSelectedData?.exitstatus}
          </p>
        </div>
      </div>
    </div>
  );
}
