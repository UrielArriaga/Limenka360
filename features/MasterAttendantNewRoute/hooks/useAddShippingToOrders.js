import { useState, useEffect } from "react";
import { api } from "../../../services/api";

export default function useAddShippingToOrders(orders) {
  const [shippingToOrders, setShippingToOrders] = useState([]);
  const [isPackage, setIsPackage] = useState(false);

  const getShippingType = async () => {
    try {
      const requests = orders.map(async order => {
        const params = { where: { orderId: order.orderId }, include: "shippingtype", join: "shi" };
        const shippingtype = await api.get(`/shippings`, { params });
        console.log("vv:", shippingtype.data.results[0].shippingtypeId);
        shippingtype.data.results[0].shippingtypeId == "5SUYPfb2O1YZALmNpZ1CEA52" && setIsPackage(true);
        return { ...order, shipping: shippingtype.data.results[0] };
      });

      const newOrders = await Promise.all(requests);
      setShippingToOrders(newOrders);
    } catch (error) {
      console.error("Error fetching shipping types:", error);
    }
  };

  useEffect(() => {
    if (orders?.length) {
      getShippingType();
    }
  }, [orders]);

  return { shippingToOrders, isPackage };
}
