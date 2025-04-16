import React, { useEffect, useState } from "react";
import CalendarServices from "../services/CalendarServices";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import dayjs from "dayjs";

export default function useCalendarData() {
  const { id_user } = useSelector(userSelector);

  const calendarService = new CalendarServices();

  const [calendarData, setCalendarData] = useState({ isFetching: false, events: [], count: 0 });

  calendarService.setStartDate(dayjs().startOf("month").format());
  calendarService.setFinishDate(dayjs().endOf("month").format());
  calendarService.setUserId(id_user);

  useEffect(() => {
    fetchCalendarData();
  }, []);

  async function fetchCalendarData() {
    try {
      setCalendarData(prevState => ({
        ...prevState,
        isFetching: true,
      }));
      const response = await calendarService.getInitalPendings();
      setCalendarData({
        isFetching: false,
        events: calendarService.normalizeEvents(response.data?.results || []),
        count: response.data?.count,
      });
    } catch (error) {
      console.error("Error fetching calendar data:", error);

      setCalendarData(prevState => ({
        ...prevState,
        isFetching: false,
      }));
    }
  }

  return calendarData;
}
