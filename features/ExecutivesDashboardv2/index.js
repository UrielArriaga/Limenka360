import React from "react";
import useFunnelData from "./hooks/useFunnelData";
import WelcomeDatePicker from "./components/WelcomeDatePicker";

import SummaryCards from "./components/SummaryCards";
import ExecutiveGoalsProgress from "./components/ExecutiveGoalsProgress";
import useGoalsData from "./hooks/useGoalsData";
import { Grid } from "@material-ui/core";
import { ExecutivesDashboardStyled } from "./styles/ExecutivesDashboard.styles";
import MetricsAmounts from "./components/MetricsAmounts";
import LastPendings from "./components/LastPendings";
import usePendingsData from "./hooks/usePendingsData";

import NewProspects from "./components/NewProspects";
import useCalendarData from "./hooks/useCalendarData";
import useProspectsData from "./hooks/useProspectsData";
import useOportunitiesData from "./hooks/useOportunitiesData";
import OpportunitiesTable from "./components/OportunitiesClose";

export default function ExecutivesDashboardv2() {
  const funnelData = useFunnelData();
  const goalsData = useGoalsData();
  const pendingsData = usePendingsData();
  const calendarData = useCalendarData();
  const prospectsData = useProspectsData();
  const oportunitiesData = useOportunitiesData();

  console.log(funnelData);
  return (
    <ExecutivesDashboardStyled>
      <WelcomeDatePicker />

      <Grid container spacing={0}>
        <Grid item md={4} className="grid-item grid-item-list">
          <OpportunitiesTable />
          <LastPendings pendingsData={pendingsData} />

          <NewProspects />
        </Grid>
        <Grid item md={4} className="grid-item grid-item-funnel">
          <SummaryCards />
          <MetricsAmounts />
        </Grid>
        <Grid item md={4} className="grid-item grid-item-goals">
          <ExecutiveGoalsProgress data={goalsData} />
        </Grid>

        {/* <Grid item md={12}>
          <NewCalendarPendings />
        </Grid> */}
      </Grid>

      {/* <CalendarPendings calendarData={calendarData} /> */}
      {/* <SummaryCards />
      <CalendarPendings /> */}
    </ExecutivesDashboardStyled>
  );
}
