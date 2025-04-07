import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Dashboard,
  People,
  Assignment,
  ShoppingCart,
  Settings,
  Menu,
  ChevronLeft,
} from "@material-ui/icons";

export const SidebarLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <SidebarWrapper>
      <motion.aside
        className={`sidebar ${isOpen ? "open" : "closed"}`}
        initial={{ width: 260 }}
        animate={{ width: isOpen ? 260 : 70 }}
        transition={{ duration: 0.3 }}
      >
        <div className="top">
          <div className="logo">
            {isOpen ? (
              <img
                src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
                alt="logo"
              />
            ) : (
              <img
                src="https://limenka.sfo3.digitaloceanspaces.com/common/logowhite.png"
                alt="logo-mini"
                className="mini"
              />
            )}
          </div>
          <div className="toggle-btn" onClick={toggleSidebar}>
            {isOpen ? <ChevronLeft /> : <Menu />}
          </div>
        </div>

        <nav className="menu">
          <div className="menu-item">
            <Dashboard />
            {isOpen && <span>Dashboard</span>}
          </div>
          <div className="menu-item">
            <People />
            {isOpen && <span>Prospectos</span>}
          </div>
          <div className="menu-item">
            <Assignment />
            {isOpen && <span>Oportunidades</span>}
          </div>
          <div className="menu-item">
            <ShoppingCart />
            {isOpen && <span>Pedidos</span>}
          </div>
          <div className="menu-item">
            <Settings />
            {isOpen && <span>Herramientas</span>}
          </div>
        </nav>
      </motion.aside>

      <main className="content">{children}</main>
    </SidebarWrapper>
  );
};

const SidebarWrapper = styled.div`
  display: flex;
  height: 100vh;

  .sidebar {
    background: #1f232a;
    color: white;
    padding: 20px 10px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo img {
      height: 40px;
    }

    .logo .mini {
      width: 40px;
      height: 40px;
    }

    .toggle-btn {
      cursor: pointer;
      color: white;
    }

    .menu {
      display: flex;
      flex-direction: column;
      gap: 15px;
      margin-top: 20px;

      .menu-item {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #b0bec5;
        cursor: pointer;
        padding: 8px;
        border-radius: 8px;
        transition: all 0.3s ease;

        &:hover {
          background: #2c3038;
          color: #39b8df;
        }

        svg {
          font-size: 20px;
        }

        span {
          white-space: nowrap;
        }
      }
    }
  }

  .content {
    flex: 1;
    padding: 30px;
    background-color: #f5f6fa;
    overflow-y: auto;
  }
`;
