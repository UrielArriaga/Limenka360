import React, { useState } from "react";
import ReportTableWhitSelectFilter from "../../organism/ReportTableWhitSelectFilter";

export default function ByEntities({ ejecutiveID }) {
  const [selectEntities, setSelectEntities] = useState("");
  return (
      <ReportTableWhitSelectFilter
        reportType={"entities"}
        where={{ ejecutiveId: ejecutiveID, entityId: selectEntities }}
        filterValue={selectEntities}
        setFilterValue={setSelectEntities}
      />
  );
}
