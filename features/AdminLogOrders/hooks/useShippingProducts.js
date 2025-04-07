import React, { useEffect, useState } from "react";
import { ShippingsOrdersServices } from "../services";
import usePagination from "../../../hooks/usePagination";

function useShippingProducts(id) {
  const [productOrder, setProductOrder] = useState({
    isFeching: false,
    data: [],
  });
  const { page, limit } = usePagination({ defaultLimit: 20, defaultPage: 1 });
  const orders = new ShippingsOrdersServices();
  useEffect(() => {
    getProductsOfOrden();
  }, []);

  const getProductsOfOrden = async () => {
    try {
      setProductOrder({ ...productOrder, isFeching: true });
      let query = {
        purchaseorderId: id,
      };
      let response = await orders.getSupplies(limit, page, query);
      let { results } = response?.data;
      let normalize = results?.map(item => orders.normalizeDataProduct(item));
      setProductOrder({ data: normalize, isFeching: false });
    } catch (error) {
      setProductOrder({ ...productOrder, isFeching: false });
      console.log("Error: ", error);
    }
  };
  return {
    productOrder,
  };
}

export default useShippingProducts;
