import React, { useEffect, useState } from "react";
import ApiRequestEjecutive from "../service/service";

function useWarehouseproducts(order) {
  const request = new ApiRequestEjecutive();
  const [serialProducts, setSerialProducts] = useState({
    isFetching: false,
    total: 0,
    data: [],
  });

  useEffect(() => {
    getDataSerialsProducts();
  }, [order]);

  const getDataSerialsProducts = async () => {
    try {
      setSerialProducts(prevState => ({ ...prevState, isFetching: true }));
      let query = {
        warehouseorder: { orderId: order },
      };
      let response = await request.getWareHouseProducts(query);
      if (response.status == 200 || response.status == 201) {
        setSerialProducts({ isFetching: false, data: response?.data?.results, total: response?.data?.count });
      }
    } catch (error) {
      console.log(error);
      setSerialProducts(prevState => ({ ...prevState, isFetching: false }));
    }
  };

  return {
    serialProducts
  };
}

export default useWarehouseproducts;
