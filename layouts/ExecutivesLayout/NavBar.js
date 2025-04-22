import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  Dashboard,
  People,
  Assignment,
  ShoppingCart,
  Settings,
  AccountCircle,
  Flag,
  KeyboardArrowDown,
  KeyboardArrowUp,
  CalendarToday,
} from "@material-ui/icons";

import { useRouter } from "next/router";
import GoalsSection from "./NavBarGoals";
import NavBarGoal from "./NavBarGoal";
import { device } from "../../styles/global.styles";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import ChatBotWidget from "../../componentx/LimiBot";
import LimenkaCalendar from "../../componentx/LimenkaCalendar";

export const NavbarLayout = ({ children }) => {
  const router = useRouter();
  const { userData } = useSelector(userSelector);
  const [showGoal, setShowGoal] = useState(false);
  const [showGoalsSubmenu, setShowGoalsSubmenu] = useState(false);
  const { pathname } = router;
  const { version = "v1" } = router.query;
  const goalsRef = useRef(null);

  // Estado para la meta seleccionada
  const [selectedGoal, setSelectedGoal] = useState(null);

  // Cerrar el submenú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (goalsRef.current && !goalsRef.current.contains(event.target)) {
        setShowGoalsSubmenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goals = [
    {
      id: 1,
      title: "VISTA 1",
      version: 1,
    },
    {
      id: 2,
      title: "VISTA 2",
      version: 2,
    },
    {
      id: 3,
      title: "VISTA 3",
      version: 3,
    },
    {
      id: 3,
      title: "VISTA 4",
      version: 4,
    },
  ];

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
    setShowGoal(true);
    setShowGoalsSubmenu(false);
  };

  const toggleGoalsSubmenu = () => {
    setShowGoalsSubmenu(!showGoalsSubmenu);
  };

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
          <div
            className="nav-item"
            onClick={() =>
              router.push({
                pathname: `/ejecutivo`,
                query: { version },
              })
            }
          >
            <Dashboard />
            <span>Inicio</span>
          </div>

          <div
            className="nav-item"
            onClick={() =>
              router.push({
                pathname: `/ejecutivo/dashboards/${version}`,
                query: { version },
              })
            }
          >
            <Dashboard />
            <span>Dashboard</span>
          </div>

          <div
            className="nav-item"
            onClick={() =>
              router.push({
                pathname: `/ejecutivo/calendario`,
                query: { version },
              })
            }
          >
            <CalendarToday />
            <span>Calendario</span>
          </div>

          <div
            className="nav-item"
            onClick={() =>
              router.push({
                pathname: `/ejecutivo/prospectos/${version}`,
                query: { version },
              })
            }
          >
            <People />
            <span>Prospectos</span>
          </div>
          <div
            className="nav-item"
            onClick={() =>
              router.push({
                pathname: `/ejecutivo/oportunidades/${version}`,
                query: { version },
              })
            }
          >
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

          <div className="nav-item goals-item" ref={goalsRef}>
            <div className="goals-main" onClick={toggleGoalsSubmenu}>
              <Flag />
              <span>Mis metas</span>
              {showGoalsSubmenu ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </div>

            {showGoalsSubmenu && (
              <GoalsSubmenu>
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="submenu-item"
                    onClick={() => handleGoalSelect(goal)}
                  >
                    {goal.title}
                  </div>
                ))}
                <div
                  className="submenu-item all-goals"
                  onClick={() => {
                    setSelectedGoal(null);
                    setShowGoal(true);
                    setShowGoalsSubmenu(false);
                  }}
                >
                  Ver todas las metas
                </div>
              </GoalsSubmenu>
            )}
          </div>
        </div>
        <div className="right">
          <div className="user">
            <AccountCircle className="icon" />
            <div className="info">
              <p>{userData?.fullname}</p>
              <p className="role">
                {userData?.roleId}-{userData?.groupName}
              </p>
            </div>
          </div>
        </div>
      </Navbar>

      {showGoal && (
        <NavBarGoal
          setShowGoal={setShowGoal}
          goalSelected={selectedGoal}
          goals={selectedGoal ? [selectedGoal] : goals}
        />
      )}

      <MainContent>{children}</MainContent>

      <ChatBotWidget />

      <LimenkaCalendar />
    </NavbarWrapper>
  );
};

const NavbarWrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
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
  position: relative;
  z-index: 100;

  .logo {
    height: 40px;
  }

  .center {
    display: flex;
    gap: 10px;

    @media ${device.lg} {
      gap: 30px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 2px;
      color: #b0bec5;
      cursor: pointer;
      padding: 6px 12px;
      border-radius: 6px;
      transition: 0.3s ease;
      position: relative;

      @media ${device.lg} {
        gap: 10px;
      }

      &:hover {
        background-color: #2c3038;
        color: #39b8df;
      }

      svg {
        font-size: 20px;
      }

      span {
        font-size: 12px;

        @media ${device.lg} {
          font-size: 14px;
        }
      }

      &.goals-item {
        flex-direction: column;
        align-items: stretch;

        .goals-main {
          display: flex;
          align-items: center;
          gap: 2px;

          @media ${device.lg} {
            gap: 10px;
          }
        }
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

const GoalsSubmenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background: #2c3038;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 200px;
  z-index: 1000;
  overflow: hidden;
  margin-top: 5px;

  .submenu-item {
    padding: 10px 15px;
    color: #b0bec5;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.2s ease;

    &:hover {
      background: #3a3f48;
      color: #39b8df;
    }

    &.all-goals {
      border-top: 1px solid #3a3f48;
      background: rgba(57, 184, 223, 0.1);
      color: #39b8df;
      font-weight: 500;
    }
  }
`;

const MainContent = styled.main`
  flex: 1;
  background-color: #f5f6fa;
  padding: 30px;
  overflow-y: auto;
`;
