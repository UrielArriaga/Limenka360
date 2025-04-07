import React, { useState } from "react";
import styled from "styled-components";

import { Avatar, Badge, Button, Collapse, MenuItem, SwipeableDrawer } from "@material-ui/core";
import {
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  EventOutlined,
  ExitToAppOutlined,
  NotificationsOutlined,
  RadioButtonChecked,
  RadioButtonCheckedOutlined,
  TodayOutlined,
  Menu,
  ShoppingBasketOutlined,
  People,
  AssignmentLateOutlined,
  ListAlt,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { companySelector } from "../../redux/slices/companySlice";
import { ordersSelector } from "../../redux/slices/orders";
import { toogleDrawer, useExecutives } from "../../redux/slices/ejecutivosSlice";
import { toUpperCaseChart } from "../../utils";
import Pendientes from "../EjecutivePendings";
import { NavBarStyled, CustomDreawer } from "./styles";
import Link from "next/link";
import DrawerProducts from "../DrawerProducts";
import DrawerOrders from "../DrawerOrders";

const NavBarDashboardPurchases = ({ sideBar }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { group, name, isFetching, isSuccess, isLogged_User, isError, errorMessage, email, roleId, isOnline } =
    useSelector(userSelector);
  const { totalOrders } = useSelector(ordersSelector);
  const { company, isFetching: isLoadingCompany } = useSelector(companySelector);
  const [drawerShowPending, setDrawerShowPending] = useState(false);
  const [draweShowProducts, setDrawerShowProducts] = useState(false);
  const [drawerShowOrders, setDrawerShowOrders] = useState(false);
  const [totalPendings, setTotalPendings] = useState(0);
  const [activeAccount, setActiveAccount] = useState("offline");
  const [menuMobile, setMenuMobile] = useState(false);
  const [openCollapse, setopenCollapse] = useState(false);
  const toggleDrawer = open => event => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMenuMobile(open);
  };

  return (
    <>
      <NavBarStyled sideBar={sideBar}>
        <div className="ctr_nav">
          <div className="ctr_nav__column1">
            <div className="ctr_nav__column1__logo_company">
              <div>
                {isLoadingCompany ? null : (
                  <p style={{ fontWeight: "bold", fontSize: 20, color: "#424242" }}>{toUpperCaseChart(group)}</p>
                )}
              </div>
            </div>
          </div>
          <div className="ctr_nav__column2">
            <div className="ctr_nav__column2__ctr_icons">
              {/* <div className="ctr_nav__column2__ctr_icons__icon" onClick={() => setDrawerShowOrders(true)}>
                <Badge overlap="rectangular" badgeContent={totalOrders} color="error">
                  <ListAlt fontSize="small" />
                </Badge>
              </div> */}

              <div className="ctr_nav__column2__ctr_icons__icon" onClick={() => setDrawerShowProducts(true)}>
                <ShoppingBasketOutlined fontSize="small" />
              </div>
            </div>
            <div className="ctr_nav__column2__account">
              <Avatar className="ctr_nav__column2__account__avatar" />
              <div>
                {isFetching && <p>......</p>}

                <p style={{ marginLeft: 14 }}>{toUpperCaseChart(name)}</p>
                {activeuser(isOnline)}
              </div>

              <div className="ctr_menu">
                <div className="menu">
                  <Link href={"/compras/pedidos"}>
                    <div className="item">
                      <DashboardOutlined className="icon" />
                      <p>Dashboard</p>
                    </div>
                  </Link>
                  <Link href={"/micuenta"}>
                    <div className="item">
                      <AccountCircleOutlined className="icon" />
                      <p>Mi cuenta</p>
                    </div>
                  </Link>
                  <Link href={"/calendario"}>
                    <div className="item">
                      <TodayOutlined className="icon" />
                      <p>Calendario</p>
                    </div>
                  </Link>
                  <div className="item" onClick={() => dispatch(clearState())}>
                    <ExitToAppOutlined className="icon" />
                    <p>Cerrar sesión</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="ctr_nav__column2_mobile">
            <div className="ctr_nav__column2_mobile__menu_action" onClick={toggleDrawer(true)}>
              <Menu className="icon" />
            </div>
            <CustomDreawer anchor="left" open={menuMobile} onClose={toggleDrawer(false)} onOpen={toggleDrawer(true)}>
              <div className="ctr">
                <div className="ctr__account">
                  <div className="ctr__account__ctr_photo">
                    <Avatar className="photo" />
                  </div>
                  <p className="name">Oswaldo Piñón</p>
                  {activeuser(activeAccount)}
                  <div className="ctr__account__icons">
                    <div className="icon">
                      <NotificationsOutlined fontSize="small" />
                    </div>
                    <div className="icon" onClick={() => setDrawerShowPending(true)}>
                      <Badge overlap="rectangular" badgeContent={totalPendings} color="error">
                        <AssignmentLateOutlined fontSize="small" />
                      </Badge>
                    </div>
                    <div className="icon_calendar">
                      <EventOutlined fontSize="small" />
                    </div>
                  </div>
                </div>
                <div className="divider" />
                <div className="ctr__menu">
                  <div className="ctr__menu__item">
                    <DashboardOutlined className="icon" />
                    <p>Dashboard</p>
                  </div>
                  <div className="ctr__menu__item">
                    <AccountCircleOutlined className="icon" />
                    <p>Mi cuenta</p>
                  </div>
                  <div className="ctr__menu__item">
                    <TodayOutlined className="icon" />
                    <p>Calendario</p>
                  </div>
                  <div className="ctr__menu__item">
                    <NotificationsOutlined className="icon" />
                    <p>Notificaciones</p>
                  </div>
                  <div className="ctr__menu__item" onClick={() => setopenCollapse(!openCollapse)}>
                    <RadioButtonChecked className={activeAccount == "online" ? "icon iconOn" : "icon iconOff"} />
                    <p>Estado de la cuenta</p>
                  </div>
                  <Collapse in={openCollapse} timeout="auto" unmountOnExit>
                    <div className="ctr_status">
                      <div
                        className={activeAccount == "online" ? "item active" : "item"}
                        onClick={() => {
                          setopenCollapse(!openCollapse);
                          setActiveAccount("online");
                        }}
                      >
                        <RadioButtonChecked className="icon_online" fontSize="small" />
                        <p>En linea</p>
                      </div>
                      <div
                        className={activeAccount == "offline" ? "item active" : "item"}
                        onClick={() => {
                          setopenCollapse(!openCollapse);
                          setActiveAccount("offline");
                        }}
                      >
                        <RadioButtonChecked className="icon_offline" fontSize="small" />
                        <p>Fuera de linea</p>
                      </div>
                    </div>
                  </Collapse>
                  <div className="ctr__menu__item">
                    <ConfirmationNumberOutlined className="icon" />
                    <p>Tickets de soporte</p>
                  </div>
                  <div className="ctr__menu__item">
                    <ExitToAppOutlined className="icon" />
                    <p>Cerrar sesión</p>
                  </div>
                </div>
              </div>
            </CustomDreawer>
          </div>
        </div>
        <DrawerProducts
          width={"60%"}
          show={draweShowProducts}
          closeDrawer={() => setDrawerShowProducts(!draweShowProducts)}
        />
        <Pendientes
          drawerShowPending={drawerShowPending}
          setDrawerShowPending={setDrawerShowPending}
          totalPendings={totalPendings}
          setTotalPendings={setTotalPendings}
        />
        <DrawerOrders drawerShowOrders={drawerShowOrders} setDrawerShowOrders={setDrawerShowOrders} />
      </NavBarStyled>
    </>
  );
};

function activeuser(status) {
  switch (status) {
    case true:
      return (
        <p className="active">
          <span>
            <RadioButtonCheckedOutlined fontSize="small" className="online" />
          </span>
          En linea
        </p>
      );
    case false:
      return (
        <p className="active">
          <span>
            <RadioButtonCheckedOutlined fontSize="small" className="offline" />
          </span>
          Fuera de linea
        </p>
      );

    default:
      break;
  }
}
export default NavBarDashboardPurchases;
