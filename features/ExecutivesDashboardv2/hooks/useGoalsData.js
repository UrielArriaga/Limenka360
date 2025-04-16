import React, { useEffect, useState } from "react";
import ExecutiveGoalsProgressServices from "../services/ExecutiveGoalsProgressServices";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import dayjs from "dayjs";

export default function useGoalsData() {
  const { id_user } = useSelector(userSelector);
  const goalsServices = new ExecutiveGoalsProgressServices();

  goalsServices.setStartDate(dayjs().startOf("month").format());
  goalsServices.setFinishDate(dayjs().endOf("month").format());
  goalsServices.setUserId(id_user);

  const [goalsData, setGoalsData] = useState({
    isFetching: false,
    results: [],
  });

  useEffect(() => {
    fetchGoalsData();
  }, []);

  const fetchGoalsData = async () => {
    try {
      setGoalsData({ ...goalsData, isFetching: true });
      let data = await goalsServices.getGoals();
      console.log(data);
      setGoalsData({
        isFetching: false,
        results: data?.data?.results,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return goalsData;
}
