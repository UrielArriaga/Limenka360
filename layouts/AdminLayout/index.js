import React, { useEffect, useState } from "react";
import { AdminStyle } from "./style";
import { Avatar, IconButton } from "@material-ui/core";
import {
  AccountCircleOutlined,
  Assignment,
  AssignmentTurnedIn,
  Business,
  DashboardOutlined,
  ExitToAppOutlined,
  Menu,
  MenuOpen,
  Receipt,
  Slideshow,
  TodayOutlined,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import { paths, pathsLogo } from "./utils";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import { URL_SPACE } from "../../services/api";
import { useDispatch } from "react-redux";

export default function AdminLayout({ children }) {
  const dispatch = useDispatch();
  const { group, userPhoto, isFetching, name } = useSelector(userSelector);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [validateStorage, setValidateStorage] = useState(false);
  const router = useRouter();
  const pathname = router.pathname;

  const handleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
    localStorage.setItem("isOpenMenu_administracion", JSON.stringify(!isOpenMenu));
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    let storage = localStorage.getItem("isOpenMenu_administracion");
    let isOpenMenu = "";
    if (storage) {
      isOpenMenu = JSON.parse(storage);
      setIsOpenMenu(isOpenMenu);
    } else {
      setIsOpenMenu(true);
    }
    setValidateStorage(true);
  };

  if (!validateStorage) return;

  return (
    <AdminStyle isOpen={isOpenMenu}>
      <div className="sidebar">
        <div className="sidebar">
          <div className="logo">
            <picture>
              <img src={isOpenMenu ? pathsLogo.large : pathsLogo.small} alt="logo" />
            </picture>
            <IconButton onClick={() => handleMenu()} className="bt_menu">
              {isOpenMenu ? <MenuOpen /> : <Menu />}
            </IconButton>
          </div>
          <p className="title_logo">Administración</p>
          <div className="options">
            <div
              className={`option ${pathname === paths.orders ? "active" : "order"}`}
              onClick={() => router.push(paths.orders)}
            >
              <Assignment className="icon" />
              <p className="title">Pedidos</p>
            </div>
            {/* <div
              className={`option ${pathname === paths.ordersComplete ? "active" : "order_complete"}`}
              onClick={() => router.push(paths.ordersComplete)}
            >
              <AssignmentTurnedIn className="icon" />
              <p className="title">Pedidos Completados</p>
            </div> */}
            <div
              className={`option ${pathname === paths.sales ? "active" : "sale"}`}
              onClick={() => router.push(paths.sales)}
            >
              <Receipt className="icon" />
              <p className="title">Ventas</p>
            </div>

            <div
              className={`option ${pathname === paths.demo ? "active" : "demo"}`}
              onClick={() => router.push(paths.demo)}
            >
              <Slideshow  className="icon" />
              <p className="title">Demos</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content_right">
        <div className="navbar">
          <p className="title_group">{group}</p>
          <div className="account">
            <Avatar src={userPhoto ? URL_SPACE + userPhoto : ""} className="account__avatar" />
            <div className="fullname">
              {isFetching && <p>......</p>}
              <p>{name}</p>
            </div>

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
        <div className="children">{children}</div>
      </div>
    </AdminStyle>
  );
}
