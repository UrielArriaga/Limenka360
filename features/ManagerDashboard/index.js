import React from "react";
import useFunnelData from "./hooks/useFunnelData";
import FunnelChartWithTextAndLine from "../../pages/prueba";
import WelcomeDatePicker from "./components/WelcomeDatePicker";
import CalendarPendings from "./components/CalendarPendings";
import SummaryCards from "./components/SummaryCards";
import ExecutiveGoalsProgress from "./components/ExecutiveGoalsProgress";
import useGoalsData from "./hooks/useGoalsData";
import { Grid } from "@material-ui/core";
import { ExecutivesDashboardStyled } from "./styles/ExecutivesDashboard.styles";
import MetricsAmounts from "./components/MetricsAmounts";
import LastPendings from "./components/LastPendings";
import usePendingsData from "./hooks/usePendingsData";
import BestOportunities from "./components/BestOportunities";
import NewProspects from "./components/NewProspects";
import useCalendarData from "./hooks/useCalendarData";
import useProspectsData from "./hooks/useProspectsData";
import useOportunitiesData from "./hooks/useOportunitiesData";
import NewCalendarPendings from "../CalendarPendings/CalendarPendings";
import TableExecutives from "./components/TableExecutives";
import SuggestionsCloseout from "./components/SuggestionsCloseout";

export default function ManagerDashboard() {
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
        <Grid item md={4} className="grid-item grid-item-funnel">
          <TableExecutives />

          <SuggestionsCloseout />
        </Grid>
        <Grid item md={4} className="grid-item grid-item-funnel">
          <MetricsAmounts />
          <SummaryCards />
        </Grid>
        <Grid item md={4} className="grid-item grid-item-list">
          <LastPendings pendingsData={pendingsData} />

          <BestOportunities />

          <NewProspects />
        </Grid>
      </Grid>
      {/* <Grid item md={12}>
        <NewCalendarPendings />
      </Grid> */}
      {/* <CalendarPendings calendarData={calendarData} /> */}
      {/* <SummaryCards />
      <CalendarPendings /> */}
    </ExecutivesDashboardStyled>
  );
}
