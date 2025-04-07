import { useEffect, useState } from "react";
import { api } from "../services/api";

export const useFolios = () => {
  const [folios, setFolios] = useState([]);

  useEffect(() => {
    const load = async () => {
      let params = { keys: "folio,id" };
      let res = await api.get("orders", { params });
      setFolios(res.data.results);
    };
    load();
  }, []);

  return { folios };
};

export const useCFDI = () => {
  const [CFDI, setCFDI] = useState([]);

  useEffect(() => {
    const load = async () => {
      let params = { all: 1 };
      let res = await api.get("CFDI", { params });
      setCFDI(res.data.results);
    };
    load();
  }, []);

  return { CFDI };
};

export const usePaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);

  useEffect(() => {
    const load = async () => {
      let res = await api.get(`paymentmethods?limit=1000&order=name`);
      setPaymentMethods(res.data.results);
    };
    load();
  }, []);

  return { paymentMethods };
};

export const usePhones = () => {
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    const load = async () => {
      let params = { keys: "phone", all: 1 };
      let res = await api.get("ejecutives", { params });

      setPhones(res.data.results);
    };
    load();
  }, []);

  return { phones };
};

export const usePaymentWay = () => {
  const [paymentWay, setPaymentWay] = useState([]);

  useEffect(() => {
    const load = async () => {
      let res = await api.get(`paymentways?limit=1000&order=name`);
      setPaymentWay(res.data.results);
    };
    load();
  }, []);

  return { paymentWay };
};

export const useExecutives = () => {
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    const load = async () => {
      let origins = await api.get(`ejecutives?limit=100&order=name`);
      setExecutives(origins.data.results);
    };
    load();
  }, []);

  return { executives };
};

export const useRejectReasons = () => {
  const [rejectedReasons, setRejectedReasons] = useState([]);

  useEffect(() => {
    const load = async () => {
      let res = await api.get("orderrejected", { params: {} });
      setRejectedReasons(res.data.results);
    };
    load();
  }, []);

  return { rejectedReasons };
};
