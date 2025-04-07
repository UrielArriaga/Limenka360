import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import SiderBarDirLog from "../../components/SideBar/SiderBarDirLog";
import { device, zIndexNavbar } from "../../styles/global.styles";
import NavBarLogistica from "../../components/NavBarLogistica";

export default function DirLogLayout({ children }) {
  const [openRecentActivities, setOpenRecentActivities] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Layout isOpenActivies={openRecentActivities} isOpenSideBar={openSideBar}>
      <SiderBarDirLog />
      <div className="max-contentlayoutdirector">
          <NavBarLogistica />
        {children}
      </div>
      {/* <div className="max-contentlayoutdirectoractivities">
        <RecentActivities
          open={openRecentActivities}
          handleOpen={() => setOpenRecentActivities(!openRecentActivities)}
        />
      </div> */}

      {/* <Notifications /> */}
    </Layout>
  );
}

const getSizeMain = props => {
  switch (true) {
    case props.isOpenSideBar === true && props.isOpenActivies == true:
      return `
       width:calc(100% - 570px);
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == true:
      return `
      width:calc(100% - 370px);
        `;
    case props.isOpenSideBar === true && props.isOpenActivies == false:
      return `
      width:calc(100% - 360px);
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == false:
      return `
        width:calc(100% - 160px);
        `;
  }
};

const getSizeRecent = props => {
  switch (true) {
    case props.isOpenSideBar === true && props.isOpenActivies == true:
      return `
       width:300px;
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == true:
      return `
      width:300px;
        `;
    case props.isOpenSideBar === true && props.isOpenActivies == false:
      return `
      width:88px;
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == false:
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
    /* width: 100%; */
    width: calc(100% - 200px);
    height: calc(100vh);
    /* margin: 60px 0; */
    overflow-y: auto;

    transition: all 0.1s ease-in;
    /* width: 30%; */

    .main {
      width: 100%;
    }

    .navbar {
      z-index: ${zIndexNavbar};
      top: 0;
      position: sticky;
    }

    /* @media ${device.md} {
      ${getSizeMain}
    } */
  }

  .max-contentlayoutdirectoractivities {
    max-height: 100vh;
    display: none;
    background-color: red;
    overflow: auto;
    @media ${device.md} {
      display: block;
      ${getSizeRecent}
    }
  }
`;
