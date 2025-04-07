import React, { useMemo, useState } from "react";
import ExecutiveProspects from "../../../features/ExecutiveProspects";
import MainLayout from "../../../components/MainLayout";
import ExecutivesLayout from "../../../layouts/ExecutivesLayout";
import ExecutivesLayoutV2 from "../../../layouts/ExecutivesLayoutv2";
import styled from "styled-components";
import useProspectsList from "../../../features/ExecutiveProspects/hooks/useProspectsList";
import ExecutiveProspectsV2 from "../../../features/ExecutiveProspectsV2";
export default function Prospects() {
  const { phasesData, moveProspect, handleTest } = useProspectsList();

  return (
    <ExecutivesLayoutV2>
      <ExecutiveProspectsV2 />
    </ExecutivesLayoutV2>
  );
}
