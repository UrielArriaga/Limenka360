import React, { useEffect, useState } from "react";
import { DepAttendantServices } from "../services";

function useTransportunits() {
  const request = new DepAttendantServices();
  const [dataTransportunits, setDataTransportunits] = useState({
    data:[],
    isFetching: false,
    isError: false,
    ErrorMessage: "",
  });
  useEffect(() => {
    getTransportunits();
  }, []);

  const getTransportunits = async () => {
    try {
      let query = {};
      setDataTransportunits({ ...dataTransportunits, isFetching: true });
      let responseUnits = (await request.getDataTransportunits(query)).data;
      setDataTransportunits({...dataTransportunits, isFetching:false, data:responseUnits?.results });
    } catch (error) {
      console.log(error);
      setDataTransportunits({ ...dataTransportunits, isFetching: false, isError:true, ErrorMessage:error });
    }
  };
  return {
    dataTransportunits,
  };
}

export default useTransportunits;
