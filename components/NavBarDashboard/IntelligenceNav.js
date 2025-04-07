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
  ArrowDownwardOutlined,
  ArrowDropDown,
  People,
  AssignmentLateOutlined,
} from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { companySelector } from "../../redux/slices/companySlice";
import { toogleDrawer, useExecutives } from "../../redux/slices/ejecutivosSlice";
import { toUpperCaseChart } from "../../utils";
import Pendientes from "../EjecutivePendings";
import { NavBarStyled, CustomDreawer } from "./styles";
import Link from "next/link";
import DrawerProducts from "../DrawerProducts";

const NavBarDashboardIntelligence = ({ sideBar }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { group, name, isFetching, isSuccess, isLogged_User, isError, errorMessage, email, roleId, isOnline } = useSelector(userSelector);

  const { company, isFetching: isLoadingCompany } = useSelector(companySelector);
  const [drawerShowPending, setDrawerShowPending] = useState(false);
  const [draweShowProducts, setDrawerShowProducts] = useState(false);
  const [totalPendings, setTotalPendings] = useState(0);
  const [activeAccount, setActiveAccount] = useState("offline");
  const [menuMobile, setMenuMobile] = useState(false);
  const [openCollapse, setopenCollapse] = useState(false);
  const toggleDrawer = (open) => (event) => {
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
              <div>{isLoadingCompany ? null : <p style={{ fontWeight: "bold", fontSize: 20, color: "#424242" }}>{toUpperCaseChart(group)}</p>}</div>
            </div>
          </div>
          <div className="ctr_nav__column2">
            <div className="ctr_nav__column2__ctr_icons">
              <div
                className="ctr_nav__column2__ctr_icons__icon"
                onClick={() => {
                  dispatch(toogleDrawer());
                }}
              >
                <People fontSize="small" />
              </div>
              <div className="ctr_nav__column2__ctr_icons__icon">
                <NotificationsOutlined fontSize="small" />
              </div>
              <div className="ctr_nav__column2__ctr_icons__icon" onClick={() => setDrawerShowPending(true)}>
                <Badge overlap="rectangular" badgeContent={totalPendings} color="error">
                  <AssignmentLateOutlined fontSize="small" />
                </Badge>
              </div>
              <div className="ctr_nav__column2__ctr_icons__icon" onClick={() => setDrawerShowProducts(true)}>
                <ShoppingBasketOutlined fontSize="small" />
              </div>
              <div className="ctr_nav__column2__ctr_icons__icon">
                <EventOutlined fontSize="small" />
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
                  <Link href={"/inteligenciacomercial"}>
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
        <Pendientes drawerShowPending={drawerShowPending} setDrawerShowPending={setDrawerShowPending} totalPendings={totalPendings} setTotalPendings={setTotalPendings} />
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
export default NavBarDashboardIntelligence;

/* const NavBarStyled = styled.div`
  p {
    margin: 0;
    padding: 0;
  }
  position: fixed;
  z-index: 1000;
  display: flex;
  width: 100%;
  height: 60px;
  background: #dce1f6;
  right: 0;
  top: 0;

  width: ${({ sideBar }) => (sideBar ? "calc(100% - 250px)" : "100%")};

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
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
        } 
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
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
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
        /* min-width: 200px; 
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

const CustomDreawer = styled(SwipeableDrawer)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiPaper-elevation16 {
    width: 80%;
  }
  .ctr {
    width: 100%;
    padding: 20px;
    &__account {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      &__ctr_photo {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        margin-bottom: 10px;
        .photo {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      }
      .name {
        font-size: 16px;
        font-weight: bold;
        letter-spacing: 0.03em;
        margin-bottom: 5px;
      }
      .active {
        display: flex;
        align-items: center;
        font-weight: 500;
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
      &__icons {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 5px;
        margin-bottom: 5px;
        .icon {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
          margin-right: 15px;
          transition: all 0.3s ease;
          background: #0c203b;
          color: #fff;
        }
        .icon_calendar {
          display: flex;
          align-items: center;
          padding: 10px;
          border-radius: 5px;
          transition: all 0.3s ease;
          background: #0c203b;
          color: #fff;
        }
      }
    }
    .divider {
      margin: 5px 0;
      border-bottom: 1.5px solid #0c203b;
    }
    &__menu {
      margin: 10px 0;
      /* background: #f3f3f3; 
      &__item {
        display: flex;
        align-items: center;
        margin: 10px 0;
        padding: 10px 5px;
        border-radius: 5px;
        .icon {
          margin-right: 5px;
          font-size: 20px;
        }
        .iconOn {
          color: green;
        }
        .iconOff {
          color: red;
        }
      }
      .ctr_status {
        padding: 0 20px;
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
`;
 */