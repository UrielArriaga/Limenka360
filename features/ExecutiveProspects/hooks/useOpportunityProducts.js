import { useState, useEffect } from "react";
import ProspectsApi from "../services";

export default function useOpportunityProducts(oportunityId) {
  const request = new ProspectsApi();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = { oportunityId };
        const response = await request.getOpportunityProducts(query);
        setProducts(response.data.results);
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
  }, [oportunityId]);

  return { products, loading, error };
}
