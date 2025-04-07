import { Box, Button, IconButton } from "@material-ui/core";
import { Refresh } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";

export default function PeriodRange({ handleOnChangeDate, periodDate, setRefetchData, refetchData }) {
  const [dateUpdated, setDateUpdated] = useState(dayjs());

  const refetchAllData = () => {
    let newDay = dayjs();
    setDateUpdated(newDay);
    setRefetchData(!refetchData);
  };

  // useEffect(() => {
  //   setInterval(() => {
  //     setRefetchData(!refetchData);
  //   }, 600000);
  // }, []);

  return (
    <>
      <Box display={"flex"} alignItems="center" p={0}>
        <p style={{ fontSize: 12 }}>Ultima actualizacion {dateUpdated.format("h:mm A	")}</p>
      </Box>
      <IconButton onClick={() => refetchAllData()}>
        <Refresh />
      </IconButton>
      <Button
        onClick={() => handleOnChangeDate("today")}
        className={`btn ${periodDate === "today" ? "date_selected" : ""}`}
      >
        Hoy
      </Button>
      <Button
        onClick={() => handleOnChangeDate("week")}
        className={`btn ${periodDate === "week" ? "date_selected" : ""}`}
      >
        Semanal
      </Button>
      <Button
        onClick={() => handleOnChangeDate("month")}
        className={`btn ${periodDate === "month" ? "date_selected" : ""}`}
      >
        Mensual
      </Button>

      <Button
        onClick={() => handleOnChangeDate("alltime")}
        className={`btn ${periodDate === "alltime" ? "date_selected" : ""}`}
      >
        Todos los tiempos
      </Button>
    </>
  );
}
