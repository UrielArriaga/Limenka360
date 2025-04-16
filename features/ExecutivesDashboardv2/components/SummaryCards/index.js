import React from "react";
import { SummaryCardsStyled } from "./styled";
import FunnelChartWithTextAndLine from "../Charts/FunnelChart";

export default function SummaryCards() {
  return (
    <SummaryCardsStyled>
      <FunnelChartWithTextAndLine />
    </SummaryCardsStyled>
  );
}
