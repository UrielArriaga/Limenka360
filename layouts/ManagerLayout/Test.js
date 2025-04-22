import React from "react";
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

export const TestLayout = ({ children }) => {
  return (
    <NavbarWrapper>
      <Navbar
        as={motion.nav}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="left">
          <img
            src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
            alt="logo"
            className="logo"
          />
        </div>
        <div className="center">
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
        <div className="right">
          <div className="user">
            <AccountCircle className="icon" />
            <div className="info">
              <p>Nombre Apellido</p>
              <p className="role">Gerente</p>
            </div>
          </div>
        </div>
      </Navbar>

      <MainContent>{children}</MainContent>
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Navbar = styled.div`
  height: 70px;
  background: #1f232a;
  color: white;
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);

  .logo {
    height: 40px;
  }

  .center {
    display: flex;
    gap: 30px;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 8px;
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

  .right {
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

const MainContent = styled.main`
  flex: 1;
  background-color: #f5f6fa;
  padding: 30px;
  overflow-y: auto;
`;
