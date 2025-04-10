import React, { useState } from "react";

export default function useOportunityData() {
  const [oportunityData, setOportunityData] = useState(null);

  const handleOnClickOportunity = (oportunity) => {
    setOportunityData(oportunity);
  };
  return {
    handleOnClickOportunity,
  };
}
