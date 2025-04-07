import React, { useEffect, useState, useCallback } from "react";
import { AdminStyle } from "./style";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AccountCircleOutlined,
  Assignment,
  Receipt,
  Slideshow,
  ExitToAppOutlined,
  Menu,
  MenuOpen,
  Dashboard,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { paths, pathsLogo } from "./utils";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import { URL_SPACE } from "../../services/api";

// Component for each menu item
const MenuItem = ({ icon: Icon, title, path, isActive, onClick, color }) => (
  <div className={`option ${isActive ? "active" : ""}`} onClick={onClick}>
    <Icon
      className="icon"

      // style={{ color: color }}
    />
    <p
      // style={{ color: color }}
      className="title"
    >
      {title}
    </p>
  </div>
);

const Sidebar = ({ isOpen, toggleMenu, pathname }) => {
  const router = useRouter();
  const menuItems = [
    { icon: Assignment, title: "Pedidos", path: paths.orders, color: "#009688" },
    { icon: Assignment, title: "Pedidos Aprobados", path: paths.ordersApproved, color: "#00c853" },
    { icon: Assignment, title: "Pedidos Rechazados", path: paths.ordersRejected, color: "#00c853" },
    { icon: Assignment, title: "Pedidos En Edicion", path: paths.edition, color: "#00c853" },
    { icon: Assignment, title: "Pedidos Cancelados", path: paths.canceled, color: "#00c853" },
    // { icon: Dashboard, title: "Dashboard", path: paths.orders, color: "#3F51B5" },
    // { icon: Receipt, title: "Ventas", path: paths.sales },
    // { icon: Slideshow, title: "Demos", path: paths.demo },
  ];

  const menuToolsItems = [
    // { icon: Receipt, title: "Reportes", path: paths.reports, color: "##8c9bb1" },
    // { icon: Receipt, title: "Mis Administradores", path: paths.reports, color: "##8c9bb1" },
    // { icon: AccountCircleOutlined, title: "Mi cuenta", path: paths.myAccount, color: "##8c9bb1" },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        <picture>
          <img src={isOpen ? pathsLogo.large : pathsLogo.small} alt="logo" />
        </picture>
        <IconButton onClick={toggleMenu} className="bt_menu">
          {isOpen ? <MenuOpen /> : <Menu />}
        </IconButton>
      </div>
      <p className="title_logo">Administración</p>
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

      <div className="divider" />

      <div className="options">
        {menuToolsItems.map(({ icon, title, path, color = "#8c9bb1" }) => (
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

const Navbar = ({ group, userPhoto, isFetching, name, dispatch }) => (
  <div className="navbar">
    <p className="title_group">{group}</p>
    <div className="account">
      <Avatar src={userPhoto ? URL_SPACE + userPhoto : ""} className="account__avatar" />
      <div className="fullname">{isFetching ? <p>......</p> : <p>{name}</p>}</div>
      <div className="dropdown">
        <div className="dropdownmenu">
          <Link href={"/director/micuenta"}>
            <div className="dropdownmenu__item">
              <AccountCircleOutlined className="dropdownmenu__icon" />
              <p>Mi cuenta</p>
            </div>
          </Link>
          <div className="dropdownmenu__item" onClick={() => dispatch(clearState())}>
            <ExitToAppOutlined className="dropdownmenu__icon" />
            <p>Cerrar sesión</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function AdminManagerLayout({ children }) {
  const dispatch = useDispatch();
  const { group, userPhoto, isFetching, name } = useSelector(userSelector);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [validateStorage, setValidateStorage] = useState(false);
  const router = useRouter();
  const { pathname } = router;

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
        <div className="children">{children}</div>
      </div>
    </AdminStyle>
  );
}
