import dayjs from "dayjs";
import Head from "next/head";
import React, { useState } from "react";

export default function VistaGeneral() {
  const [prospectSelected, setProspectSelected] = useState({
    id: null,
    idOportunity: null,
    isOportunity: false,
    isClient: false,
  });
  const [refetchData, setRefetchData] = useState(false);
  const [periodDate, setPëriodDate] = useState("month");
  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());

  const handleSelectedProspect = (statusProspect, lead) => {
    console.log(lead);

    try {
      if (statusProspect === 0) {
        setProspectSelected({
          id: lead.id,
          isOportunity: false,
          isClient: false,
        });
        toggleModal();
      }
      if (statusProspect === 1) {
        setProspectSelected({
          id: lead.prospect.id,
          idOportunity: lead.id,
          isOportunity: true,
          isClient: false,
        });
        toggleModal();
      }
      if (statusProspect == 2) {
        setProspectSelected({
          id: lead.id,
          idOportunity: null,
          isOportunity: false,
          isClient: true,
        });
        toggleModal();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <VistaGeneralStyled>
      <Head>
        <title>CRM JOBS - Prospectos</title>
      </Head>
      <SideBar />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="container">
          <ListLeadsDirector
            startDate={startDate}
            finishDate={finishDate}
            periodDate={periodDate}
            handleSelectedProspect={handleSelectedProspect}
            refetchData={refetchData}
          />
        </div>
      </div>
      <RecentActivityDirector />
    </VistaGeneralStyled>
  );
}

import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import SideBar from "../../../components/SideBar";
import ListLeadsDirector from "../../../components/UI/organism/ListLeadsDirector";
import RecentActivityDirector from "../../../components/UI/organism/RecentActivityDirector";

export const VistaGeneralStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  height: 100vh;
  background-color: #f1f1f1;
  * {
    margin: 0;
  }

  .main {
    width: calc(100% - 250px);
    height: calc(100vh - 60px);
    overflow-y: auto;
    margin-top: 60px;
    padding: 20px;
  }

  .main h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }
`;
