import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import { Avatar, Badge, IconButton } from "@material-ui/core";
import {
  AccountCircleOutlined,
  DashboardOutlined,
  ExitToAppOutlined,
  RadioButtonCheckedOutlined,
  TodayOutlined,
  Menu,
  ListAlt,
  MenuOpen,
} from "@material-ui/icons";
import { colors } from "../../styles/global.styles";
import { userSelector } from "../../redux/slices/userSlice";
import { ordersSelector } from "../../redux/slices/orders";
import { companySelector } from "../../redux/slices/companySlice";
import { toUpperCaseChart } from "../../utils";
import Link from "next/link";
import { CustomDreawer } from "../NavBarDashboard/styles";
import DrawerOrdersNotificationsAdmin from "../DrawerOrdersNotificationsAdmin";

export default function NavBarAdministration({ sideBar, children }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { group, name, isFetching, isOnline } = useSelector(userSelector);
  const { totalOrders } = useSelector(ordersSelector);
  const { company, isFetching: isLoadingCompany } = useSelector(companySelector);
  const [drawerShowOrders, setDrawerShowOrders] = useState(false);
  const [activeAccount, setActiveAccount] = useState("offline");
  const [menuMobile, setMenuMobile] = useState(false);
  const [openCollapse, setopenCollapse] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const toggleDrawer = open => event => {
    if (event && event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
      return;
    }
    setMenuMobile(open);
  };

  const activeuser = status => {
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
  };

  const handleOpenMenu = (isOpen, typeMenu) => {
    if (typeMenu === "menu") {
      setIsOpenMenu(isOpen);
      localStorage.setItem(typeMenu, JSON.stringify(isOpen));
    } else {
      setIsOpenMenuMovile(isOpen);
      localStorage.setItem(typeMenu, JSON.stringify(isOpen));
    }
  };

  return (
    <LayoutStyled isOpen={isOpenMenu}>
      <div className="left">
        <div className="left__header">
          <div className="logos">
            <div className="logo_open">
              <picture>
                <img src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogo.png" alt="logo" />
              </picture>
            </div>
            <div className="logo_close">
              <picture>
                <img src="/sidelog_small.png" alt="logo" />
              </picture>
            </div>
          </div>
          <IconButton className="button_menu" onClick={() => handleOpenMenu(!isOpenMenu, "menu")}>
            {isOpenMenu ? <MenuOpen /> : <Menu />}
          </IconButton>
        </div>
      </div>
      <div className="right">
        <div className="navbar">
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
                <CustomDreawer
                  anchor="left"
                  open={menuMobile}
                  onClose={toggleDrawer(false)}
                  onOpen={toggleDrawer(true)}
                >
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
            <DrawerOrdersNotificationsAdmin
              drawerShowOrders={drawerShowOrders}
              setDrawerShowOrders={setDrawerShowOrders}
            />
          </NavBarStyled>
        </div>
        <div className="boxA">
          <div className="boxB">{children}</div>
        </div>
      </div>
    </LayoutStyled>
  );
}

export const LayoutStyled = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
  @media (max-width: 600px) {
    .left {
      display: none;
    }
  }
  .left {
    width: ${({ isOpen }) => (isOpen ? "300px" : "48px")};
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
    transition: 0.2s;
    background-color: #407aff;
    ::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px ${colors.primaryColorDark};
    }
    &__header {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: ${({ isOpen }) => (isOpen ? "flex" : "column")};
      .logos {
        height: ${({ isOpen }) => (isOpen ? "auto" : "60px")};
        display: flex;
        align-items: center;
        .logo_open {
          display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
          img {
            width: 190px;
            padding: 20px;
            /* height: 116px; */
          }
        }
        .logo_close {
          display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
          img {
            width: 35px;
            height: 35px;
          }
        }
      }
      .button_menu {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        color: #fff;
        margin-bottom: ${({ isOpen }) => (isOpen ? "0px" : "30px")};
      }
    }
    &__body {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .option_menu {
        display: flex;
        overflow: hidden;
        align-items: center;
        width: ${({ isOpen }) => (isOpen ? "100%" : "35px")};
        border-radius: ${({ isOpen }) => (isOpen ? "2px" : "8px")};
        height: ${({ isOpen }) => (isOpen ? "45px" : "35px")};
        justify-content: ${({ isOpen }) => (isOpen ? "space-between" : "center")};
        background-color: #fff;
        margin-bottom: 11px;
        transition: 0.2s;
        svg {
        }
        .option_title {
          display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          padding: 0px 0px 0px 25px;
          margin-bottom: -3px;
        }
        .option_count {
          display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
          font-size: 15px;
          padding: 2px 7px;
          border-radius: 6px;
          color: #fff;
        }
        .expand_icon {
          display: ${({ isOpen }) => (isOpen ? "block" : "none")};
        }
      }
      .dashboard {
        color: #3462c0;
        &__count {
          background-color: #3462c0;
        }
      }
      .prospects {
        color: #44cbe4;
        &__count {
          background-color: #44cbe4;
        }
      }
      .oportunities {
        color: #88c82d;
        &__count {
          background-color: #88c82d;
        }
      }
      .groups {
        color: #900c3f;
        &__count {
          background-color: #900c3f;
        }
      }
      .sales {
        color: #1e8449;
        &__count {
          background-color: #1e8449;
        }
      }
      .clients {
        color: #6b34bc;
        &__count {
          background-color: #6b34bc;
        }
      }
      .payments {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .executives {
        color: red;
        &__count {
          background-color: red;
        }
      }
      .orders {
        color: #f77132;
        &__count {
          background-color: #f77132;
        }
      }
      .reports {
        color: #8c9bb1;
        &__count {
          background-color: #8c9bb1;
        }
      }
      .tools {
        color: #8c9bb1;
        &__count {
          background-color: #8c9bb1;
        }
      }
      .providers {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .products {
        color: #88c82d;
        &__count {
          background-color: #88c82d;
        }
      }
      .categories {
        color: #6b34bc;
        &__count {
          background-color: #6b34bc;
        }
      }
      .active {
        background-color: #3aade6;
        color: #fff;
        svg {
          color: #fff;
        }
      }
      .activities {
        color: #febc11;
        &__count {
          background-color: #febc11;
        }
      }
      .more_options {
        width: 100%;
        display: ${({ isOpen }) => (isOpen ? "none" : "flex")};
        color: #fff;
      }
      .sub_options {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: ${({ isOpen }) => (isOpen ? "auto" : "center")};

        .sub_optionMenu {
          width: ${({ isOpen }) => (isOpen ? "100%" : "35px")};
          padding-left: ${({ isOpen }) => (isOpen ? "30px" : "auto")};
          background-color: rgb(255 255 255 / 0.3);
          backdrop-filter: blur(10px);
          color: #fff;
          svg {
            font-size: 20px;
          }
        }
        .suboption_name {
          font-size: 13px;
          margin-left: -12px;
        }
      }
      .divider {
        margin-top: 10px;
        margin-bottom: 20px;
        width: 100%;
        border: 1px solid #bdbdbd;
      }
    }
    &__footer {
    }
  }
  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .boxA {
      width: 100%;
      height: calc(100vh - 60px);
      padding: 20px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .boxB {
      background-color: #fff;
      border-radius: 10px;
      padding: 20px;
    }

    .navbar {
      width: 100%;
      height: 60px;
      background-color: #efefef;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left_nav {
        width: 80%;
        height: 100%;
        display: flex;
        align-items: center;
        .button_movile {
          @media (min-width: 601px) {
            display: none;
          }
        }
        .title_group {
          display: flex;
          align-items: center;
          font-weight: bold;
          text-transform: capitalize;
          padding: 15px;
          font-size: 20px;
          height: 100%;
        }
        .search_box_component {
          width: 30%;
          @media (max-width: 837px) {
            display: none;
          }
        }
        .search_box {
          @media (min-width: 838px) {
            display: none;
          }
          .button_search {
            display: flex;
            align-items: center;
            border-radius: 8px;
            padding: 3px;
            background-color: #407aff;
            cursor: pointer;
            img {
              filter: brightness(10000%);
              height: 24px;
              width: 24px;
            }
          }
        }
      }
      .right_nav {
        @media (max-width: 837px) {
          display: none;
        }
        width: fit-content;
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        height: 100%;
        padding-left: 25px;
        border-top-left-radius: 48px;
        border-bottom-left-radius: 5px;
        background: ${colors.primaryColor};
        .account {
          margin-right: 20px;
          width: 100%;
          display: flex;
          align-items: center;
          position: relative;
          justify-content: center;
          padding: 10px;
          cursor: pointer;
          .avatar {
            margin-right: 10px;
          }
          .title_name {
            display: flex;
            flex-direction: column;
            text-transform: capitalize;
            color: #fff;
            margin-right: 10px;
            .online {
              display: flex;
              align-items: center;
              color: #fff;
              font-size: 14px;
              white-space: nowrap;
            }
            .offline {
              display: flex;
              align-items: center;
              font-size: 14px;
            }
            .icon_online {
              font-size: 14px;
              color: green;
              margin-right: 5px;
            }
            .icon_offline {
              font-size: 14px;
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
        .divider_vertical {
          width: 1px;
          height: 30px;
          border: 1px solid #fff;
        }
        .options_nav {
          width: fit-content;
          display: flex;
          flex-direction: row;
        }
      }
      .right_optionMenu {
        display: flex;
        align-items: center;
        @media (min-width: 838px) {
          display: none;
        }
      }
    }
    .content_child {
    }
  }
`;

const NavBarStyled = styled.div`
  p {
    margin: 0;
    padding: 0;
  }

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
