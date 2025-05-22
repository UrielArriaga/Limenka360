import { useState, useEffect } from "react";
import { ApiServiceExOr } from "../service";
import usePagination from "../../../hooks/usePagination";

export default function useSalesProducts(orderSelected) {
  const request = new ApiServiceExOr();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const oportunityId = orderSelected?.oportunityId;
  const { page, limit, handlePage } = usePagination({
    defaultLimit: 4,
    defaultPage: 1,
  });

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let query = { oportunityId };
      const response = await request.getSalesProducts(limit, page, query);
      setProducts(response.data.results);
      setCount(response.data.count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (oportunityId) {
      fetchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [oportunityId, page]);

  return {
    products,
    loading,
    error,
    count,
    paginationData: {
      handlePage,
      page,
      limit,
    },
  };
}
