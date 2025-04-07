import React, { useEffect, useState } from "react";
import { DepAttendantServices } from "../services";

function useDrivers() {
  const request = new DepAttendantServices();
  const [dataDrivers, setDataDrievrs] = useState({
    data:[],
    isFetching: false,
    isError: false,
    ErrorMessage: "",
  });
  useEffect(() => {
    getDrivers();
  }, []);

  const getDrivers = async () => {
    try {
      let query = {};
      setDataDrievrs({ ...dataDrivers, isFetching: true });
      let responseDrivers = (await request.getDrivers(query)).data;      
      let normalize = responseDrivers?.results?.map(request.normalizeDrivers);
      setDataDrievrs({...dataDrivers, isFetching:false, data:normalize });
    } catch (error) {
      console.log(error);
      setDataDrievrs({ ...dataDrivers, isFetching: false, isError:true, ErrorMessage:error });
    }
  };
  return {
    dataDrivers,
  };
}

export default useDrivers;
