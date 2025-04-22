import React, { useEffect, useState } from "react";
import FunnelDataServices from "../services/FunnelDataServices";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";

const initialData = {
  isFetching: true,
  total: 0,
};

export default function useFunnelData() {
  const { id_user } = useSelector(userSelector);

  const [funnelData, setFunnelData] = useState({
    prospects: { ...initialData },
    opportunities: { ...initialData },
    customers: { ...initialData },
  });

  const funnelDataService = new FunnelDataServices();

  funnelDataService.setStartDate(dayjs().startOf("month").format());
  funnelDataService.setFinishDate(dayjs().endOf("month").format());
  funnelDataService.setUserId(id_user);

  const fetchFunnelData = async type => {
    try {
      setFunnelData(prevState => ({
        ...prevState,
        [type]: { ...prevState[type], isFetching: true },
      }));

      let response;
      switch (type) {
        case "prospects":
          response = await funnelDataService.getProspectsTotal();
          break;
        case "opportunities":
          response = await funnelDataService.getOportunitiesTotal();
          break;
        case "customers":
          response = await funnelDataService.getCustomersTotal();
          break;
        default:
          return;
      }

      setFunnelData(prevState => ({
        ...prevState,
        [type]: {
          isFetching: false,
          total: response.data.count,
        },
      }));
    } catch (error) {
      console.error(`Error fetching ${type}:`, error);

      setFunnelData(prevState => ({
        ...prevState,
        [type]: {
          isFetching: false,
          total: 0,
        },
      }));
    }
  };

  useEffect(() => {
    fetchFunnelData("prospects");
    fetchFunnelData("opportunities");
    fetchFunnelData("customers");
  }, [id_user]);

  return funnelData;
}
