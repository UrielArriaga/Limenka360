import React, { useState, useEffect, useMemo } from "react";
import { ApiServiceExOr } from "../service";

export default function UseProspect(orderSelected) {
  const request = useMemo(() => new ApiServiceExOr(), []);
  const [prospectData, setProspectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const prospectId = orderSelected?.prospectId;

  const fetchProspect = async () => {
    setLoading(true);
    setError(null);
    try {
      if (prospectId) {
        const response = await request.getProspect(prospectId);
        setProspectData(response.data);
      } else {
        setProspectData(null);
      }
    } catch (error) {
      setError(error);
      setProspectData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (prospectId) {
      fetchProspect();
    } else {
      setProspectData(null);
      setLoading(false);
      setError(null);
    }
  }, [prospectId, request]);

  return {
    prospectData,
    loading,
    error,
  };
}
