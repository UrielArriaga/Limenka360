import React from "react";
import { getColorStatusOrder } from "../../utils";
import dayjs from "dayjs";
import { Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";

export default function OrderInfo({ orderSelectedData, modalAccount }) {
  return (
    <div className="detailsInfo">
      <p>
        Folio de Orden: <span>{orderSelectedData?.folio}</span>
      </p>
      <p>
        Fecha del Pedido: <span>{dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY")}</span>
      </p>
      <p>
        Ejecutivo:{" "}
        <span>
          {orderSelectedData?.createdbyid?.fullname} - {orderSelectedData?.createdbyid?.email}
        </span>
      </p>
      {/* <p>
        Cuenta de pago: <span>{orderSelectedData?.createdbyid?.fullname}</span>
      </p> */}

      <p>
        Aprobador por: <span>{orderSelectedData?.approvedby?.fullname}</span>
      </p>
      <div className="accountpay">
        <Tooltip title="Editar">
          <p onClick={() => modalAccount()}>
            Cuenta de Pago: <span>{orderSelectedData?.paymentaccount?.name}</span>{" "}
            <span>
              <Edit className="iconEdit" />
            </span>
          </p>
        </Tooltip>
      </div>
    </div>
  );
}
