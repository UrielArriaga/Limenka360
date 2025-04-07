import { useState, useEffect } from "react";
import { api } from "../../../services/api";

export default function useSelectedAddress(dataProvider, selectedAddress, setSelectedAddress, dataOrder) {
  const [directions, setDirections] = useState([]);
  const idProvider = dataProvider?.id;

  useEffect(() => {
    if (idProvider) {
      getRequestData();
    }
  }, [idProvider]);

  useEffect(() => {
    const foundAddress = directions.find(d => d.id === dataOrder?.provideraddressId);
    setSelectedAddress(foundAddress || null);
  }, [dataOrder, directions]);

  const getRequestData = async () => {
    try {
      let params = {
        where: { providerId: `${idProvider}` },
        include: "city,entity,postal",
        join: "c,w,p",
      };
      let response = await api.get(`provideraddresses`, { params });
      setDirections(response?.data?.results);
      console.log("responsessss", response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelect = id => {
    setSelectedAddress(prev => {
      if (prev && prev.id === id) {
        return null;
      }

      return directions?.find(d => d.id === id) || null;
    });
  };

  return { selectedAddress, handleSelect, directions };
}
