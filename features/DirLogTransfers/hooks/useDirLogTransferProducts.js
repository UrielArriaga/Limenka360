import React from "react";
import { useEffect, useState } from "react";
import { OrdersServices } from "../services";

function useDirLogTransferProducts(selectedTransfer) {
  const [productsTransfer, setProductsTransfer] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const ordersServices = new OrdersServices();
  useEffect(() => {
    let getDataSelectedInventory = async () => {
      try {
        setIsFetching(true);
        let query = {
          inventorytransferId: selectedTransfer?.id,
        };
        const response = await ordersServices.getProductsOfTransfers(query);
        setProductsTransfer(response?.data?.results);
        setIsFetching(false);
      } catch (error) {
        console.log(error);
        setIsFetching(false);
      }
    };

    if (selectedTransfer) {
      getDataSelectedInventory();
    }
  }, [selectedTransfer]);

  return {
    productsTransfer,
    isFetching
  };
}

export default useDirLogTransferProducts;
