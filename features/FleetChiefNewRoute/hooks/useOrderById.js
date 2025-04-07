import React, { useEffect, useState } from "react";
import { DepAttendantServices } from "../services";

function useOrderById(orderId) {
  const request = new DepAttendantServices();
  const [dataOrder, setDataOrder] = useState({
    data:{},
    isFetching: false,
    isError: false,
    ErrorMessage: "",
  });
  useEffect(() => {
    getOrderById();
  }, [orderId]);

  const getOrderById = async () => {
    try {
      let query = {};
      setDataOrder({ ...dataOrder, isFetching: true });
      let responseOrder = (await request.getOrderById(orderId,query)).data;
      setDataOrder({...dataOrder, isFetching:false, data:responseOrder });
    } catch (error) {
      console.log(error);
      setDataOrder({ ...dataOrder, isFetching: false, isError:true, ErrorMessage:error });
    }
  };
  return {
    dataOrder,
  };
}

export default useOrderById;
