import { useState } from "react";

export default function useDirLogRouteTab() {
  const [tabSeletect, setTabSeletect] = useState("infoProduct");
  const handleOnClickTab = tab =>  setTabSeletect(tab);

  return {
    tabSeletect,
    handleOnClickTab,
  };
}
