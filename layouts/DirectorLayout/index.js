import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import NavBarDashboard from "../../components/NavBarDashboard";
import { dialogSelector } from "../../redux/slices/dialogSlice";

import SideBar from "../../components/SideBar";
import RecentActivityDirector from "../../components/UI/organism/RecentActivityDirector";
import { device } from "../../styles/global.styles";

export default function DirectorLayout({ children }) {
  const { openMenuSide, openRecentActivities } = useSelector(dialogSelector);

  return (
    <Layout sideBar={openMenuSide} activites={openRecentActivities}>
      <SideBar />
      <NavBarDashboard />
      <div className="max-contentlayoutdirector">{children}</div>
      <div className="max-contentlayoutdirectoractivities">
        <RecentActivityDirector />
      </div>
    </Layout>
  );
}

const getSizeMain = props => {
  switch (true) {
    case props.sideBar === true && props.activites == true:
      return `
       width:calc(100% - 570px);
        `;
    case props.sideBar === false && props.activites == true:
      return `
      width:calc(100% - 370px);
        `;
    case props.sideBar === true && props.activites == false:
      return `
      width:calc(100% - 360px);
        `;
    case props.sideBar === false && props.activites == false:
      return `
        width:calc(100% - 160px);
        `;
  }
};

const getSizeRecent = props => {
  switch (true) {
    case props.sideBar === true && props.activites == true:
      return `
       width:300px;
        `;
    case props.sideBar === false && props.activites == true:
      return `
      width:300px;
        `;
    case props.sideBar === true && props.activites == false:
      return `
      width:88px;
        `;
    case props.sideBar === false && props.activites == false:
      return `
      width:88px;
      `;
  }
};

const Layout = styled.div`
  display: flex;
  height: 100vh;
  transition: all 2s ease;
  .max-contentlayoutdirector {
    width: 100%;
    width: calc(100% - 370px);
    height: calc(100vh - 60px);
    margin: 60px 0;
    overflow-y: auto;
    transition: all 0.1s ease-in;
    width: 100%;

    .main {
      width: 100%;
    }
    @media ${device.md} {
      ${getSizeMain}
    }
  }

  .max-contentlayoutdirectoractivities {
    max-height: 100vh;
    display: none;
    @media ${device.md} {
      display: block;
      ${getSizeRecent}
    }
  }
`;
