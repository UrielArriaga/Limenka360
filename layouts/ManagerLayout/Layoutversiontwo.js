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
  Menu,
  ChevronLeft,
  ChevronRight,
  Add,
  CalendarViewDayOutlined,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import ChatBotWidget from "../../componentx/LimiBot";
import LimenkaCalendar from "../../componentx/LimenkaCalendar";
import { useDispatch } from "react-redux";

const Layoutversiontwo = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { userData } = useSelector(userSelector);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showGoalsSubmenu, setShowGoalsSubmenu] = useState(false);
  const goalsRef = useRef(null);

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

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleGoalsSubmenu = () => {
    setShowGoalsSubmenu(!showGoalsSubmenu);
  };

  return (
    <NavbarWrapper>
      {/* Minimal Top Nav */}
      <TopNav>
        <div className="left">
          <button className="menu-btn" onClick={toggleSidebar}>
            <Menu />
          </button>
          <span className="page-title">Dashboard</span>
        </div>
        <div className="right">
          <div className="user-info">
            <AccountCircle className="user-icon" />
            <span>{userData?.fullname}</span>
          </div>
        </div>

        <p
          onClick={() => {
            dispatch(clearState());
          }}
          style={{
            color: "#b0bec5",
            cursor: "pointer",
            padding: "6px 12px",
            borderRadius: "6px",
            transition: "0.3s ease",
            textAlign: "center",
          }}
        >
          Cerrar sesion
        </p>
      </TopNav>

      {/* Collapsable Sidebar */}
      <Sidebar collapsed={isSidebarCollapsed}>
        <div className="sidebar-header">
          {!isSidebarCollapsed && (
            <img
              src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png"
              alt="logo"
              className="logo"
            />
          )}
          <button className="collapse-btn" onClick={toggleSidebar}>
            {isSidebarCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        <NavMenu>
          <NavItem
            onClick={() => router.push("/ejecutivo")}
            tooltip="Inicio"
            collapsed={isSidebarCollapsed}
          >
            <Dashboard />
            {!isSidebarCollapsed && <span>Inicio</span>}
          </NavItem>

          <NavItem
            onClick={() =>
              router.push(`/ejecutivo/dashboards/${router.query.version}`)
            }
            tooltip="Dashboard"
            collapsed={isSidebarCollapsed}
          >
            <Dashboard />
            {!isSidebarCollapsed && <span>Dashboard</span>}
          </NavItem>

          <NavItem
            onClick={() =>
              router.push(`/ejecutivo/calendario/${router.query.version}`)
            }
            tooltip="Calendario"
            collapsed={isSidebarCollapsed}
          >
            <CalendarViewDayOutlined />
            {!isSidebarCollapsed && <span>Calendario</span>}
          </NavItem>

          <NavItem
            onClick={() =>
              router.push(`/ejecutivo/prospectos/${router.query.version}`)
            }
            tooltip="Prospectos"
            collapsed={isSidebarCollapsed}
          >
            <People />
            {!isSidebarCollapsed && <span>Prospectos</span>}
          </NavItem>

          <NavItem
            onClick={() =>
              router.push(`/ejecutivo/oportunidades/${router.query.version}`)
            }
            tooltip="Oportunidades"
            collapsed={isSidebarCollapsed}
          >
            <Assignment />
            {!isSidebarCollapsed && <span>Oportunidades</span>}
          </NavItem>

          <NavItem tooltip="Pedidos" collapsed={isSidebarCollapsed}>
            <ShoppingCart />
            {!isSidebarCollapsed && <span>Pedidos</span>}
          </NavItem>

          <NavItem tooltip="Herramientas" collapsed={isSidebarCollapsed}>
            <Settings />
            {!isSidebarCollapsed && <span>Herramientas</span>}
          </NavItem>

          <NavItem
            ref={goalsRef}
            tooltip="Metas"
            collapsed={isSidebarCollapsed}
            onClick={toggleGoalsSubmenu}
            className="goals-item"
          >
            <Flag />
            {!isSidebarCollapsed && (
              <>
                <span>Metas</span>
                {showGoalsSubmenu ? <Add /> : <Add />}
              </>
            )}
          </NavItem>
        </NavMenu>

        {showGoalsSubmenu && !isSidebarCollapsed && (
          <GoalsSubmenu>
            <div className="submenu-item">Vista 1</div>
            <div className="submenu-item">Vista 2</div>
            <div className="submenu-item">Vista 3</div>
            <div className="submenu-item">Vista 4</div>
            <div className="submenu-item all-goals">Ver todas</div>
          </GoalsSubmenu>
        )}
      </Sidebar>

      <MainContent sidebarCollapsed={isSidebarCollapsed}>
        {children}
      </MainContent>

      <ChatBotWidget />
      <LimenkaCalendar />
    </NavbarWrapper>
  );
};

export default Layoutversiontwo;

// Styled Components
const NavbarWrapper = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "sidebar topnav"
    "sidebar main";
`;

const TopNav = styled.div`
  grid-area: topnav;
  height: 60px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 10;

  .left {
    display: flex;
    align-items: center;
    gap: 15px;

    .menu-btn {
      background: none;
      border: none;
      color: #555;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    .page-title {
      font-size: 1.1rem;
      font-weight: 500;
      color: #333;
    }
  }

  .right {
    .user-info {
      display: flex;
      align-items: center;
      gap: 10px;

      .user-icon {
        color: #39b8df;
        font-size: 30px;
      }

      span {
        font-size: 0.9rem;
        color: #555;
      }
    }
  }
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  width: ${({ collapsed }) => (collapsed ? "70px" : "250px")};
  background: #1f232a;
  color: white;
  transition: width 0.3s ease;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 20;

  .sidebar-header {
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 15px;
    border-bottom: 1px solid #2c3038;

    .logo {
      height: 30px;
      transition: opacity 0.3s ease;
      opacity: ${({ collapsed }) => (collapsed ? "0" : "1")};
    }

    .collapse-btn {
      background: none;
      border: none;
      color: #b0bec5;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      border-radius: 4px;

      &:hover {
        background: #2c3038;
      }
    }
  }
`;

const NavMenu = styled.div`
  padding: 15px 0;
  flex-grow: 1;
  overflow-y: auto;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  color: #b0bec5;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #2c3038;
    color: #39b8df;
  }

  svg {
    font-size: 22px;
    flex-shrink: 0;
  }

  span {
    font-size: 0.9rem;
    opacity: ${({ collapsed }) => (collapsed ? "0" : "1")};
    transition: opacity 0.2s ease;
  }

  &::after {
    content: "${({ tooltip, collapsed }) => (collapsed ? tooltip : "")}";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    background: #1f232a;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;
    font-size: 0.8rem;
    white-space: nowrap;
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    z-index: 100;
  }

  &:hover::after {
    opacity: ${({ collapsed }) => (collapsed ? "1" : "0")};
  }

  &.goals-item {
    position: relative;
  }
`;

const GoalsSubmenu = styled.div`
  position: absolute;
  left: 100%;
  top: 0;
  background: #2c3038;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  width: 180px;
  z-index: 1000;
  overflow: hidden;

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
  grid-area: main;
  background-color: #f8f9fa;
  padding: 20px;
  overflow-y: auto;
  /* margin-left: ${({ sidebarCollapsed }) =>
    sidebarCollapsed ? "70px" : "250px"};
  transition: margin-left 0.3s ease; */
`;
