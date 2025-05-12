import { useState, useEffect } from "react";
import ProspectsApi from "../services";

export default function useQuotePDF(id) {
  const request = new ProspectsApi();
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setLoading(true);
      setError(null);
      try {
        let query = { id };
        const response = await request.getOpportunity(query);
        setOpportunities(response.data.results);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchOpportunities();
    } else {
      //opportunities([]);
      setLoading(false);
    }
  }, [id]);

  return { opportunities, loading, error };
}
