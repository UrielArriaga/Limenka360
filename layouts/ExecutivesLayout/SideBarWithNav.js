import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Dashboard,
  People,
  Assignment,
  ShoppingCart,
  Settings,
  AccountCircle,
} from "@material-ui/icons";

export const SideBarWithNav = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <LayoutWrapper>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen}>
        <div className="sidebar-content">
          <div className="logo">
            <img
              src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
              alt="logo"
            />
          </div>
          <div className="nav-links">
            <div className="nav-item">
              <Dashboard />
              <span>Dashboard</span>
            </div>
            <div className="nav-item">
              <People />
              <span>Prospectos</span>
            </div>
            <div className="nav-item">
              <Assignment />
              <span>Oportunidades</span>
            </div>
            <div className="nav-item">
              <ShoppingCart />
              <span>Pedidos</span>
            </div>
            <div className="nav-item">
              <Settings />
              <span>Herramientas</span>
            </div>
          </div>
        </div>
      </Sidebar>

      {/* Main Content */}
      <MainContentWrapper>
        <NavbarWrapper
          as={motion.nav}
          initial={{ y: -80 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
          <div className="right">
            <div className="user">
              <AccountCircle className="icon" />
              <div className="info">
                <p>Nombre Apellido</p>
                <p className="role">Gerente</p>
              </div>
            </div>
          </div>
        </NavbarWrapper>

        <MainContent>{children}</MainContent>
      </MainContentWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Sidebar = styled.div`
  width: ${({ isOpen }) => (isOpen ? "250px" : "0px")};
  height: 100vh;
  background-color: #222528;
  color: white;
  padding: 20px;
  transition: width 0.3s ease;
  overflow-x: hidden;

  .sidebar-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;

    .logo {
      img {
        width: 180px;
        margin-bottom: 40px;
      }
    }

    .nav-links {
      display: flex;
      flex-direction: column;
      gap: 20px;

      .nav-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #b0bec5;
        cursor: pointer;
        padding: 6px 12px;
        border-radius: 6px;
        transition: 0.3s ease;

        &:hover {
          background-color: #2c3038;
          color: #39b8df;
        }

        svg {
          font-size: 20px;
        }

        span {
          font-size: 14px;
        }
      }
    }
  }
`;

const NavbarWrapper = styled.div`
  height: 70px;
  background: #1f232a;
  color: white;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

  .left {
    .sidebar-toggle {
      font-size: 30px;
      background: none;
      color: white;
      border: none;
      cursor: pointer;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .user {
      display: flex;
      align-items: center;
      gap: 10px;

      .icon {
        font-size: 34px;
        color: #39b8df;
      }

      .info {
        display: flex;
        flex-direction: column;

        p {
          margin: 0;
          font-size: 13px;
          color: #e0e0e0;
        }

        .role {
          font-size: 11px;
          color: #9aa5b1;
        }
      }
    }
  }
`;

const MainContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  /* padding: 30px; */
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #f5f6fa;
  padding: 30px;
  overflow-y: auto;
`;
