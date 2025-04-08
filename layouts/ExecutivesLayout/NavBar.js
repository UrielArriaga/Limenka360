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
import GoalsSection from "./NavBarGoals";

export const NavbarLayout = ({ children }) => {
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
      {/* <GoalsSection
        goals={[
          {
            id: 1,
            title: "Ventas Mensuales",
            current: 15000,
            target: 25000,
            chartData: [
              { name: "Sem 1", value: 5000 },
              { name: "Sem 2", value: 8000 },
              { name: "Sem 3", value: 12000 },
              { name: "Sem 4", value: 15000 },
            ],
          },
          {
            id: 2,
            title: "Nuevos Clientes",
            current: 15,
            target: 20,
            chartData: [
              { name: "Sem 1", value: 3 },
              { name: "Sem 2", value: 7 },
              { name: "Sem 3", value: 12 },
              { name: "Sem 4", value: 15 },
            ],
          },
          {
            id: 3,
            title: "Llamadas Realizadas",
            current: 100,
            target: 150,
            chartData: [
              { name: "Dia 1", value: 20 },
              { name: "Dia 3", value: 40 },
              { name: "Dia 5", value: 70 },
              { name: "Dia 7", value: 100 },
            ],
          },
        ]}
      /> */}

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
