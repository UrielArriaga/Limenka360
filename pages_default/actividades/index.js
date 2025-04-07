import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import NavBarDashboard from "../../components/NavBarDashboard";
import SideBar from "../../components/SideBar";
import ExecutivesActivities from "../../components/UI/templates/ActivitiesByExecutive";
import MainLayout from "../../components/MainLayout";

const Activities = () => {
  const [open, setOpen] = useState(false);

  return (
    <MainLayout>
      <Activitiestyled>
        <Head>
          <title>CRM JOBS - Actividades</title>
        </Head>
        {/* <SideBar open={open} setOpen={setOpen} />
        <NavBarDashboard sideBar={true} /> */}
        <Container className="main">
          <div className="ctr_activities">
            <ExecutivesActivities />
          </div>
        </Container>
      </Activitiestyled>
    </MainLayout>
  );
};

export default Activities;
const Activitiestyled = styled.div`
  * {
    margin: 0;
  }
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
`;

export const Container = styled.div`
  height: calc(100vh - 60px);
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;

  .ctr_activities {
    width: calc(100% - 40px);
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    min-height: calc(100% - 100px);
    padding: 25px 20px;
    background: #fff;
    border-radius: 10px;
    box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
  }
`;
