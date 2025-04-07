import React, { useEffect, useState } from "react";
import { OrdersAdminServices, OrdersServices } from "../services";

export default function useOrderId(dataDrawerPreviewOrder, openDrawerPreviewOrder) {
  const ordersService = new OrdersAdminServices();
  const [orderSelectedData, setOrderSelectedData] = useState(null);

  useEffect(() => {
    let getDataOrder = async () => {
      try {
        let params = {
          include:
            "address,address.entity,address.city,address.postal,oportunity,oportunity.prospect,oportunity.soldby,oportunity.typesale,orderstatus,createdbyid,paymentaccount,bill,bill.paymentway,bill.paymentmethod,bill.address,bill.cfdi,bill.taxregime",
        };
        let response = await ordersService.getOrderId(dataDrawerPreviewOrder?.id, params);
        setOrderSelectedData(response.data);
      } catch (error) {
        console.log("ocurrio un error en datos vista previa");
      }
    };

    if (openDrawerPreviewOrder) {
      getDataOrder();
    }
  }, [openDrawerPreviewOrder]);

  return {
    orderSelectedData,
  };
}
