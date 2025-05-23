import React from "react";
import styled from "styled-components";
import Head from "next/head";

import MainLayout from "../../../components/MainLayout";
import AdminActivities from "../../../components/UI/templates/ActivitiesByAdmin";

const Activities = () => {
  return (
    <MainLayout>
      <Activitiestyled>
        <Head>
          |<title>CRM JOBS - Actividades</title>
        </Head>
        <Container className="main">
          <div className="ctr_activities">
            <AdminActivities />
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
  .total {
    display: flex;
    align-items: center;
    font-weight: 500;
    margin-bottom: 1em;
    svg {
      font-size: 14px;
      margin-right: 5px;
      color: #103c82;
    }
    .reload {
      font-size: 18px;
      margin-left: 10px;
      cursor: pointer;
    }
  }
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
