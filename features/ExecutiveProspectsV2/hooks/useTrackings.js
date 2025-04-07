import React from "react";
import ProspectsApi from "../services";

export default function useTrackings(prospectSelected) {
  const prospectsApi = new ProspectsApi();

  const [trackingData, setTrackingData] = useState({
    results: [],
    count: 0,
    isFetching: false,
    isError: false,
    messageError: "",
    isSuccess: false,
  });

  useEffect(() => {
    if (prospectSelected) {
      fetchTrackings(prospectSelected.id);
    }
  }, [prospectSelected]);

  async function fetchTrackings(prospectId) {
    try {
      setTrackingData(prev => ({ ...prev, isFetching: true }));
      let params = {
        where: JSON.stringify({
          prospectId: prospectId,
        }),
      };
      let data = await prospectsApi.getTrackings(params).data;

      setTrackingData(prev => ({
        ...prev,
        results: data.results || [],
        count: data.count || 0,
        isFetching: false,
      }));
    } catch (error) {
      setTrackingData(prev => ({
        ...prev,
        isFetching: false,
        isError: true,
        messageError: error.message,
      }));
    }
  }

  return {
    trackingData,
  };
}
