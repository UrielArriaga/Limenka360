import React, { useEffect, useState, useCallback } from "react";
import { IconButton, ListItemIcon, Tooltip } from "@material-ui/core";
import { Assignment, Receipt, Menu, MenuOpen, Dashboard, ExitToApp } from "@material-ui/icons";
import { useRouter } from "next/router";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { AdminStyle, NavBarStyled } from "./style";
import { pathsAdminGerente, pathsLogo } from "../AdminManagerLayout/utils";

const MenuItem = ({ icon: Icon, title, path, isActive, onClick, color }) => (
  <div className={`option ${isActive ? "active" : ""}`} onClick={onClick}>
    <Icon className="icon" />
    <p className="title">{title}</p>
  </div>
);

const Sidebar = ({ isOpen, toggleMenu, pathname }) => {
  const router = useRouter();
  const menuItems = [
    { icon: Dashboard, title: "Dashboard", path: pathsAdminGerente.dashboard, color: "#3F51B5" },
    { icon: Receipt, title: "Ventas", path: pathsAdminGerente.sales },
    { icon: Assignment, title: "Pedidos", path: pathsAdminGerente.orders, color: "#009688" },
    { icon: Receipt, title: "Actividades", path: pathsAdminGerente.activities },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <picture>
          <img src={isOpen ? "/logowhite.png" : pathsLogo.small} alt="logo" />
        </picture>
        <IconButton onClick={toggleMenu} className="bt_menu">
          {isOpen ? <MenuOpen /> : <Menu />}
        </IconButton>
      </div>
      {isOpen ? <p className="title_logo"> Administración Gerente</p> : <p className="title_logo"></p>}

      <div className="options">
        {menuItems.map(({ icon, title, path, color = "#000" }) => (
          <MenuItem
            key={title}
            color={color}
            icon={icon}
            title={title}
            path={path}
            isActive={pathname === path}
            onClick={() => router.push(path)}
          />
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ role, handleCloseSession }) => (
  <NavBarStyled>
    <div className="content"></div>

    <div className="items">
      <div className="items__item">
        <Tooltip title="Cerrar sesión">
          <ListItemIcon onClick={handleCloseSession}>
            <ExitToApp fontSize="small" />
          </ListItemIcon>
        </Tooltip>
      </div>
    </div>
  </NavBarStyled>
);

export default function LayoutManagerAdmin({ children, role }) {
  const dispatch = useDispatch();
  const { group, userPhoto, isFetching, name } = useSelector(userSelector);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [validateStorage, setValidateStorage] = useState(false);
  const router = useRouter();
  const { pathname } = router;

  const handleCloseSession = () => {
    dispatch(clearState());
  };
  const toggleMenu = useCallback(() => {
    setIsOpenMenu(prev => !prev);
    localStorage.setItem("isOpenMenu_administracion", JSON.stringify(!isOpenMenu));
  }, [isOpenMenu]);

  const getLocalStorage = useCallback(() => {
    const storage = localStorage.getItem("isOpenMenu_administracion");
    setIsOpenMenu(storage ? JSON.parse(storage) : true);
    setValidateStorage(true);
  }, []);

  useEffect(() => {
    getLocalStorage();
  }, [getLocalStorage]);

  if (!validateStorage) return null;

  return (
    <AdminStyle isOpen={isOpenMenu}>
      <Sidebar isOpen={isOpenMenu} toggleMenu={toggleMenu} pathname={pathname} />

      <div className="content_right">
        <div className="children">
          <Navbar role={role} handleCloseSession={handleCloseSession} />
          {children}
        </div>
      </div>
    </AdminStyle>
  );
}
