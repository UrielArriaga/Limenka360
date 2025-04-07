import React, { useState } from "react";
import styled from "styled-components";

import { Avatar, Badge, Collapse } from "@material-ui/core";
import {
  AccountCircleOutlined,
  ConfirmationNumberOutlined,
  DashboardOutlined,
  ExitToAppOutlined,
  NotificationsOutlined,
  RadioButtonChecked,
  RadioButtonCheckedOutlined,
  TodayOutlined,
  Menu,
  ListAlt,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { companySelector } from "../../redux/slices/companySlice";
import { ordersSelector } from "../../redux/slices/orders";
import { toUpperCaseChart } from "../../utils";
import { CustomDreawer } from "./styles";
import Link from "next/link";
import { colors } from "../../styles/global.styles";
import DrawerOrdersNotificationsAdmin from "../DrawerOrdersNotificationsAdmin";

const NavBarDashboardAdministration = ({ sideBar }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { group, name, isFetching, isOnline } = useSelector(userSelector);
  const { totalOrders } = useSelector(ordersSelector);
  const { company, isFetching: isLoadingCompany } = useSelector(companySelector);
  const [drawerShowOrders, setDrawerShowOrders] = useState(false);
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
                <p style={{ fontWeight: "bold", fontSize: 20, color: "#424242" }}>Administracion</p>
              </div>
            </div>
          </div>
          <div className="ctr_nav__column2">
            <div className="ctr_nav__column2__ctr_icons">
              <div className="ctr_nav__column2__ctr_icons__icon" onClick={() => setDrawerShowOrders(true)}>
                <Badge overlap="rectangular" badgeContent={totalOrders} color="error">
                  <ListAlt fontSize="small" />
                </Badge>
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
                  <Link href={"/administracion/pedidos"}>
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
                  <p className="name">{toUpperCaseChart(name)}</p>
                  {activeuser(isOnline)}
                </div>
                <div className="divider" />
                <div className="ctr__menu">
                  <Link href={"/administracion/pedidos/"}>
                    <div className="ctr__menu__item">
                      <DashboardOutlined className="icon" />
                      <p>Dashboard</p>
                    </div>
                  </Link>
                  <Link href={"/micuenta"}>
                    <div className="ctr__menu__item">
                      <AccountCircleOutlined className="icon" />
                      <p>Mi cuenta</p>
                    </div>
                  </Link>
                  <Link href={"/calendario"}>
                    <div className="ctr__menu__item">
                      <TodayOutlined className="icon" />
                      <p>Calendario</p>
                    </div>
                  </Link>

                  <div className="ctr__menu__item" onClick={() => dispatch(clearState())}>
                    <ExitToAppOutlined className="icon" />
                    <p>Cerrar sesión</p>
                  </div>
                </div>
              </div>
            </CustomDreawer>
          </div>
        </div>
        <DrawerOrdersNotificationsAdmin drawerShowOrders={drawerShowOrders} setDrawerShowOrders={setDrawerShowOrders} />
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
export default NavBarDashboardAdministration;
const NavBarStyled = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  position: fixed;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 60px;
  background: ${colors.secondaryColor};
  right: 0;
  top: 0;
  /* 
  width: ${({ sideBar }) => (sideBar ? "calc(100% - 250px)" : "100%")}; */

  box-shadow: rgba(0, 0, 0, 0.15) 0px 4px 6px -1px, rgba(0, 0, 0, 0.09) 0px 2px 4px -1px;
  .ctr_nav {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &__column1 {
      display: flex;
      padding: 10px 20px;
      &__logo_company {
        display: flex;
        align-items: center;
        img {
          width: 100px;
          height: 60px;
          object-fit: contain;
        }
        p {
          margin-left: 5px;
          font-size: 12px;
        }

        /* display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 100px;
        height: 20px;
        margin-right: 10px;
        img {
          width: 200%;
          height: 200%;
          object-fit: contain;
        } */
      }
      &__options {
        display: flex;
        align-items: center;
        &__option {
          .button {
            text-transform: capitalize;
            transition: all 0.3s ease;
            &:hover {
              background: #536bcf;
              color: #fff;
            }
          }
          .item {
            background: #f3f3f3;
          }
        }
      }
    }
    &__column2 {
      display: flex;
      align-items: center;
      background: #0c203b;
      height: 100%;
      padding: 10px 20px;
      color: #fff;
      border-top-left-radius: 48px;
      border-bottom-left-radius: 5px;
      background: ${colors.primaryColor};
      &__ctr_box_radius {
        width: 20px;
      }
      &__ctr_icons {
        display: flex;
        align-items: center;
        padding-right: 15px;
        border-right: 1px solid #fff;
        &__icon {
          display: flex;
          align-items: center;
          padding: 5px;
          border-radius: 5px;
          margin-right: 10px;
          transition: all 0.3s ease;
          &:hover {
            cursor: pointer;
            background: rgba(255, 255, 255, 0.5);
          }
        }
      }
      &__account {
        min-width: 200px;
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 15px;
        cursor: pointer;
        &__avatar {
          margin-right: 10px;
        }
        .active {
          display: flex;
          align-items: center;
          .online {
            font-size: 12px;
            color: green;
            margin-right: 5px;
          }
          .offline {
            font-size: 12px;
            color: red;
            margin-right: 5px;
          }
        }
        .ctr_menu {
          position: fixed;
          top: 0px;
          padding-top: 0px;
          right: -100%;
          opacity: 0;
          transition: all 0.3s ease;
          z-index: 1000;
          .menu {
            padding: 10px 0;
            transition: all 0.3s ease;
            background: #fff;
            border-radius: 4px;
            color: #000;
            box-sizing: content-box;
            box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
            .item {
              display: flex;
              align-items: center;
              padding: 10px 10px;
              transition: all 0.3s ease;
              .icon {
                font-size: 20px;
                margin-right: 5px;
              }
              .iconOn {
                color: green;
              }
              .iconOff {
                color: red;
              }
              .arrow_icondown {
                color: #ccc;
                transform: rotate(180deg);
              }
              .arrow_iconup {
                color: #ccc;
                transform: rotateX("angle");
              }
              &:hover {
                background: #63567f;
                color: #fff;
              }
            }
            .ctr_status {
              padding: 5px 20px;
              .item {
                display: flex;
                align-items: center;
                padding: 5px 10px;
                margin-bottom: 5px;
                border-radius: 5px;

                .icon_online {
                  color: green;
                  margin-right: 5px;
                  font-size: 16px;
                }
                .icon_offline {
                  color: red;
                  margin-right: 5px;
                  font-size: 16px;
                }
              }
              .active {
                background: #dce1f6;
              }
            }
          }
        }
        &:hover {
          .ctr_menu {
            opacity: 1;
            margin-top: 0px;
            right: 10px;
            padding-top: 70px;
          }
        }
      }
      &__login {
        /* min-width: 200px; */
        position: relative;
        display: flex;
        align-items: center;
        padding-left: 15px;
        cursor: pointer;
      }
      @media (max-width: 600px) {
        display: none;
      }
    }
    &__column2_mobile {
      display: none;
      @media (max-width: 600px) {
        display: initial;
        align-items: center;
        padding: 10px 20px;

        &__menu_action {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 10px;
          background: #0c203b;
          border-radius: 10px;
          .icon {
            color: #fff;
            font-size: 16px;
          }
        }
      }
    }
  }
`;
