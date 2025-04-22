import React, { useEffect, useState } from "react";
import PendingsService from "../services/PendingsService";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

export default function usePendingsData() {
  const { id_user } = useSelector(userSelector);

  const [pendingsData, setPendingsData] = useState({
    pendings: [],
    isFetching: false,
  });

  const pendingService = new PendingsService();

  pendingService.setStartDate(dayjs().startOf("month").format());
  pendingService.setFinishDate(dayjs().endOf("month").format());
  pendingService.setUserId(id_user);

  useEffect(() => {
    fetchPendingsData();
  }, []);

  const fetchPendingsData = async () => {
    try {
      setPendingsData({ ...pendingsData, isFetching: true });
      let data = await pendingService.getPendings();
      setPendingsData({
        pendings: data?.data?.results,
        isFetching: false,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return pendingsData;
}
