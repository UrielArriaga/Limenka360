import React from "react";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
export default function ManagerNavBar({ sideBar }) {
  return (
    <ManagarNavbar sideBar={sideBar}>
      <div className="search">
        <input type="text" placeholder="Buscador" />
      </div>

      <div className="items"></div>
    </ManagarNavbar>
  );
}

const ManagarNavbar = styled.div`
  position: fixed;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 60px;
  background: ${colors.secondaryColor};
  right: 0;
  top: 0;
  width: ${({ sideBar }) => (sideBar ? "calc(100% - 250px)" : "100%")};
  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px -1px, rgba(0, 0, 0, 0.09) 0px 2px 4px -1px;
`;
