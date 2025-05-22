import { useState, useEffect } from "react";
import { ApiServiceExOr } from "../service";
import usePagination from "../../../hooks/usePagination";

export default function useWarehouseProducts(orderSelected) {
  const request = new ApiServiceExOr();
  const [wareproducts, setWareProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const orderId = orderSelected?.id;
  const { page, limit, handlePage } = usePagination({
    defaultLimit: 4,
    defaultPage: 1,
  });

  const fetchWareProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = { warehouseorder: { orderId: orderId } };
      //let query = { orderId: orderId };
      const response = await request.getWarehouseProducts(limit, page, query);
      setWareProducts(response.data.results);
      setCount(response.data.count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchWareProducts();
    } else {
      setWareProducts([]);
      setLoading(false);
    }
  }, [orderId, page]);

  return {
    wareproducts,
    loading,
    error,
    count,
    fetchWareProducts,
    paginationData: {
      handlePage,
      page,
      limit,
    },
  };
}
