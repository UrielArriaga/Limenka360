import React from "react";
import { getColorStatusOrder } from "../../utils";
import dayjs from "dayjs";

export default function OrderInfo({ orderSelectedData }) {
  return (
    <>
      <p>
        Folio de Orden: <span>{orderSelectedData?.folio}</span>
      </p>
      <p>
        Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
      </p>
      <p>
        Ejecutivo: <span>{orderSelectedData?.createdbyid?.fullname}</span>
      </p>
      <p>
        Cuenta de pago: <span>{orderSelectedData?.createdbyid?.fullname}</span>
      </p>

      <p>
        Aprobador por: <span>{orderSelectedData?.approvedby?.fullname}</span>
      </p>
    </>
  );
}
