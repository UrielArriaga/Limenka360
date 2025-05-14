import React, { useState } from "react";

export default function useProspectData() {
  const [oportunityData, setOportunityData] = useState(null);

  const handleOnClickOportunity = (oportunity) => {
    setOportunityData(oportunity);
  };
  return {
    handleOnClickOportunity,
  };
}
