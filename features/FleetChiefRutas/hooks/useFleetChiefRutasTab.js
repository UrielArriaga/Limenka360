import { useState } from "react";

export default function useFleetChiefRutasTab() {
  const [tabSeletect, setTabSeletect] = useState("infoProduct");
  const handleOnClickTab = tab => setTabSeletect(tab);

  return {
    tabSeletect,
    handleOnClickTab,
  };
}
