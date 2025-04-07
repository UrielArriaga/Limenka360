import { useState, useEffect } from "react";
import { api } from "../services/api";

// Hook personalizado para obtener datos con opción para controlar el formato de respuesta
const useFetchData = (url, processResponse = response => response.data, params = {}, normalizeData = data => data) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [count, setCount] = useState();

  useEffect(() => {
    fetchData();
  }, [url, JSON.stringify(params)]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get(url, { params });
      console.log("preres", url, response);
      const result = normalizeData(processResponse(response));
      console.log("Result", url, result);
      setData(result);
      setCount(response.data?.count);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData, count };
};

// Función para normalizar la data para un react select
export const normalizeDataSelect = data => {
  return data.map(item => ({
    value: item.id,
    label: item.name,
  }));
};

// Función para procesar respuestas con array
export const processResponseArray = response => response.data.results;

export default useFetchData;
