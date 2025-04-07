import { useEffect, useState } from "react";
import DeliveryRoutesApi from "../services";

export default function useShowOrders(deliveryrouteId) {
  const [inventoryexits, setInventoryexits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const DeliveryRouteService = new DeliveryRoutesApi();

  useEffect(() => {
    getOrder();
  }, [deliveryrouteId]);

  const getOrder = async () => {
    setIsLoading(true);
    const response = await DeliveryRouteService.getInventoryexits(deliveryrouteId);
    setInventoryexits(response.data.results);
    setIsLoading(false);
  };

  return { inventoryexits, isLoading };
}
