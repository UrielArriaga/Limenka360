import { useEffect, useState } from "react";
import { api } from "../services/api";

export default function useFetch({
  path = "",
  params = {},
  paramsfn = undefined,
  refetch = undefined,
  refetchPage = undefined,
  condition = true,
  limit = 0,
  page = 0,
  activeTime = false,
  timeRequest = 0,
  normalize = null,
}) {
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);
  const [messageError, setMessageError] = useState("");
  const [data, setResponse] = useState({
    results: [],
    count: 0,
  });

  const [count, setcount] = useState(0);
  const [normalizeData, setNormalizeData] = useState([]);
  const [refetchRequest, setRefetchRequest] = useState(false);

  const handleRefetchRequest = () => {
    setRefetchRequest(!refetchRequest);
  };
  useEffect(() => {
    // console.log("render from useFetch");
    if (condition && activeTime == false) {
      requestToApi();
    }
  }, [refetch, condition, limit, page, refetchPage, refetchRequest]);

  useEffect(() => {
    if (condition && activeTime == true) {
      requestToApi();

      const interval = setInterval(() => {
        // console.log("here");

        requestToApi();
      }, timeRequest);

      return () => clearInterval(interval);
    }
  }, [refetch, condition, limit, page, refetchPage, refetchRequest]);

  useEffect(() => {
    if (normalize) {
      // console.log(normalize);
      let datax = normalize(data.results);
      setNormalizeData(datax);
      // console.log(datax);
    }
  }, [data]);

  useEffect(() => {
    // console.log("heree en usefetch en useeffect");
  }, []);

  const requestToApi = async () => {
    try {
      setIsFetching(true);
      let response;
      if (paramsfn) {
        response = await api.get(path, { params: paramsfn() });
      } else {
        response = await api.get(path, { params });
      }

      // console.log(response);
      setResponse(response.data);

      if (response?.data?.count) {
        setcount(response?.data?.count);
      }
      setIsFetching(false);
    } catch (error) {
      // console.log(error);
      setIsFetching(false);
      setIsError(true);
      setMessageError(error?.response?.data);
    }
  };

  return { isFetching, isError, messageError, data, response: data, normalizeData, handleRefetchRequest, count };
}
