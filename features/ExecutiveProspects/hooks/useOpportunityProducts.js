import { useState, useEffect } from "react";
import ProspectsApi from "../services";
import usePagination from "../../../hooks/usePagination";

export default function useOpportunityProducts(oportunityId) {
  const request = new ProspectsApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState(0);
  const { page, limit, handlePage } = usePagination({ defaultLimit: 5, defaultPage: 1 });

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = { oportunityId };
        const response = await request.getOpportunityProducts(limit, page, query);
        setProducts(response.data.results);
        setCount(response.data.count)
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

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
