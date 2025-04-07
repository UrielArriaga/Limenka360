import React, { useState } from "react";
import ReportTableWhitSelectFilter from "../../organism/ReportTableWhitSelectFilter";

export default function ByPhases({ ejecutiveID }) {
  const [selectPhase, setSelectPhase] = useState("");
  return (
    <ReportTableWhitSelectFilter
      reportType={"phases"}
      where={{ ejecutiveId: ejecutiveID, phaseId: selectPhase }}
      filterValue={selectPhase}
      setFilterValue={setSelectPhase}
      ejecutiveID={ejecutiveID}
    />
  );
}
