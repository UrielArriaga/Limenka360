/* eslint-disable @next/next/no-img-element */
import { Avatar, Paper, Popper, MenuItem, MenuList, ClickAwayListener, ListItem, ListItemAvatar, ListItemText, Badge, List, Dialog, Collapse } from "@material-ui/core";
import {
  AssignmentOutlined,
  CloseOutlined,
  ExitToAppOutlined,
  FolderOpenOutlined,
  Add,
  ArrowForward,
  People,
  NotificationsNone,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Close,
  AccessTime,
  ListOutlined,
  ExpandLess,
  ExpandMore,
  Business,
  PersonAdd,
  Person,
} from "@material-ui/icons";
import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

import { colors, device, wrapper } from "../../styles/global.styles";
const NavBarDashboard = () => {
  const [menu, setMenu] = useState(false);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openNotificationsMovil, setOpenNotificationsMovil] = useState(false);
  const router = useRouter();
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
    setOpenNotifications(false);
  };

  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
      setOpenNotifications(false);
    }
  }
  const [openMenuOptions, setOpenMenuOptios] = React.useState(false);

  const handleClick = () => {
    setOpenMenuOptios(!openMenuOptions);
  };

  return (
    <NavBarDashboardStyled>
      <div className="Container">
        <div className="wrapper">
          <div className="logo">
            <img className="logoemp" src="lgo.png" width="80" height="80" />
          </div>
          <div className="itemsdesktop">
            <div className="item">
              <div className="itemList">
                <div className="item">
                  <Add></Add> <ExpandMore className="expandIcon" style={{ color: "#388dd9" }} />
                </div>

                <div className="subItemList">
                  <div className="items">
                    <PersonAdd />
                    <p onClick={() => router.push("/prospectNew")}>Prospectos</p>
                  </div>
                  <div className="items">
                    <Person />
                    <p onClick={() => router.push("/ClienteNew")}>Cliente</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="item">{/* <a href="/prospects">Prospectos</a> */}</div>
            <div className="item">{/* <a href="/oportunidades">Oportunidades</a> */}</div>
            <div className="item">{/* <a >Clientes</a> */}</div>
          </div>
        </div>
        <div className="cuenta">
          <div className="icons" onClick={() => setOpenNotifications(!openNotifications)}>
            <Badge overlap="rectangular" badgeContent={4} color="primary">
              <NotificationsNone />
            </Badge>
          </div>
          <Popper className="popper" open={openNotifications} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            <div className="Header">
              <p>Notificaciones</p>
              <Close onClick={() => setOpenNotifications(false)} />
            </div>
            <div className="submenuaccount">
              <div className="notification_container">
                {notificationsbd?.map((item, index) => {
                  return (
                    <div key={index} className="notification">
                      <Avatar className="AvatarIcon" />
                      <div className="information">
                        <div className="delete_notification">
                          <p className="company">{item.message}</p>
                          <Close />
                        </div>
                        <p className="message">
                          <strong>Cliente: </strong>
                          {item.Cliente}{" "}
                        </p>
                        <p className="message">
                          <strong>Concepto: </strong>
                          {item.Concepto}{" "}
                        </p>
                        <div className="Created">
                          <AccessTime />
                          <p className="date">{item.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="more_notications" onClick={() => showMoreNotifications()}>
                <ArrowForward />
                <p className="more_text">Ver más notificaciones</p>
              </div>
            </div>
          </Popper>

          <div className="goprofile" ref={anchorRef} aria-controls={open ? "menu-list-grow" : undefined} aria-haspopup="true" onClick={handleToggle}>
            <Avatar style={{ width: 30, height: 30, backgroundColor: "#f44336" }}>MR</Avatar>
            <div className="logout">
              <p>Monserrat</p>
              {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </div>
          </div>
          <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList autoFocusItem={open} onKeyDown={handleListKeyDown}>
                  <MenuItem onClick={handleClose}>
                    <List>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar />
                        </ListItemAvatar>
                        <ListItemText primary="Medical Buy" secondary="Monserrat Rovirosa" />
                      </ListItem>
                    </List>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>Mi cuenta</MenuItem>
                  <MenuItem onClick={handleClose}>Cerrar Sesion</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Popper>
        </div>
        <div className="movil">
          <div className="movil_logo">
            <div className="icons" onClick={() => setOpenNotificationsMovil(true)}>
              <Badge overlap="rectangular" badgeContent={4} color="primary">
                <NotificationsNone />
              </Badge>
            </div>
            {menu ? <CloseOutlined className="iconClose" onClick={() => setMenu(false)} /> : <ListOutlined className="iconList" onClick={() => setMenu(true)} />}
          </div>

          <div className={`${menu ? "movil_menuMobil view" : "movil_menuMobil"}`}>
            {" "}
            <div className="logo">
              <img className="logoemp" src="lgo.png" width="60" height="60" />
              <div className="DatesUser">
                <p className="company">Meison Medical</p>
              </div>
            </div>
            <div className="add" onClick={handleClick}>
              <div className="add_create">
                <Add />
                <p>Crear</p>
                {openMenuOptions ? <ExpandLess /> : <ExpandMore />}
              </div>
            </div>
            <Collapse in={openMenuOptions} timeout="auto" unmountOnExit>
              <div className="buttonOptions">
                <div className="buttonOptions_button">
                  <People />
                  <p onClick={() => router.push("/prospectNew")}>Prospecto</p>
                </div>
              </div>
              <div className="buttonOptions">
                <div className="buttonOptions_button">
                  <PersonAdd />
                  <p onClick={() => router.push("/ClienteNew")}>Cliente</p>
                </div>
              </div>
              <div className="buttonOptions">
                <div className="buttonOptions_button">
                  <Business />
                  <p>Empresa</p>
                </div>
              </div>
            </Collapse>
            <div className="buttonMenu">
              <People />
              <p>Prospectos</p>
            </div>
            <div className="buttonMenu">
              <AssignmentOutlined />
              <p>Oportunidades</p>
            </div>
            <div className="buttonMenu">
              <FolderOpenOutlined />
              <p> Clientes</p>
            </div>
            <div className="buttonMenu">
              <Person />
              <p>Mi cuenta</p>
            </div>
            <div className="buttonMenu">
              <ExitToAppOutlined />
              <p>Iniciar Sesión</p>
            </div>
          </div>
        </div>
      </div>
      <Dialog fullScreen open={openNotificationsMovil}>
        <NotificationsContainerMovil>
          <div className="notification_container">
            <div className="head">
              <p>Notificaciones</p>
              <Close onClick={() => setOpenNotificationsMovil(false)} />
            </div>
            {notificationsbd?.map((item, index) => {
              return (
                <div key={index} className="notification">
                  <Avatar className="AvatarIcon" />

                  <div className="information">
                    <div className="delete_notification">
                      <p className="company">{item.message}</p>
                      <Close />
                    </div>
                    <p className="message">
                      <strong>Cliente: </strong>
                      {item.Cliente}{" "}
                    </p>
                    <p className="message">
                      <strong>Concepto: </strong>
                      {item.Concepto}{" "}
                    </p>
                    <div className="Created">
                      <AccessTime />
                      <p className="date">{item.createdAt}</p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div className="more_notications" onClick={() => showMoreNotifications()}>
              <ArrowForward />
              <p className="more_text">No hay más Notificaciones</p>
            </div>
          </div>
        </NotificationsContainerMovil>
      </Dialog>
    </NavBarDashboardStyled>
  );
};

export default NavBarDashboard;
const NotificationsContainerMovil = styled.div`
  .notification_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    .head {
      display: flex;
      align-items: center;
      background: #3d78e3;
      color: white;
      font-weight: bold;
      margin-bottom: 0;
      padding: 0px 13px 0px 13px;
      justify-content: space-between;
      width: 100%;
    }
    .notification {
      display: flex;
      align-items: center;
      position: relative;
      padding: 10px 4%;
      border-bottom: 1px solid #eee;
      position: relative;
      .AvatarIcon {
        width: 40px;
        height: 40px;
        object-fit: contain;
        background-color: #f3f3f3;
        margin-right: 5px;
        svg {
          margin: 0;
          color: ${colors.primaryColor};
        }
      }
      .information {
        display: flex;
        flex-direction: column;
        width: 100%;
        .company {
          font-size: 12px;
          font-weight: bold;
          letter-spacing: 0.03em;
          margin: 0px;
          color: #495057;
          strong {
            font-weight: 700;
            color: #3f51b5ad;
          }
        }
        .message {
          font-size: 13px;
          width: 92%;
          color: #74788d !important;
          margin: 1px;
          strong {
            color: #3f51b5ad;
            font-weight: 700;
          }
        }
        .Created {
          display: flex;
          align-items: center;
          .date {
            margin: 1px;
            font-size: 0.8125rem;
            letter-spacing: 0.03em;
            color: #74788d !important;
          }
          svg {
            color: #878a99 !important;
            font-size: 14px;
          }
        }
      }
      .delete_notification {
        display: flex;
        justify-content: space-between;
        svg {
          font-size: 14px;
          color: #8a8a8a;
          cursor: pointer;
          &:hover {
            color: #f50;
          }
        }
      }
    }
    .more_notications {
      display: flex;
      justify-content: center;
      align-items: center;
      .more_text {
        font-size: 14px;
        color: #556ee6;
      }
      svg {
        font-size: 16px;
        background: #556ee6;
        color: white;
        margin-right: 7px;
        border-radius: 15px;
      }
    }
  }
`;
const NavBarDashboardStyled = styled.div`
  .eXsSPw * {
    margin: none;
    padding: none;
  }
  background: #fafafa;
  padding: 15px 30px 5px 30px;
  box-shadow: 0 2px 4px rgb(15 34 58 / 18%);
  .Container {
    display: flex;
    justify-content: space-between;
    height: 50px;
    .wrapper {
      display: flex;
      .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          object-fit: contain;
        }
      }
      .itemsdesktop {
        display: none;
        flex-direction: column;

        @media ${device.sm} {
          display: flex;
          flex-direction: row;
          align-items: center;
          margin-left: 42px;
        }

        .itemList {
          display: flex;
          position: relative;
          cursor: pointer;
          &:hover {
            .subItemList {
              display: flex;
              flex-direction: column;
            }
          }
          svg {
            color: ${({ scrollBiggger }) => (scrollBiggger > 60 ? `${colors.primaryColor}` : " #74788d")};
            /* margin-left: 10px; */
          }

          .subItemList {
            display: none;
            background-color: white;
            border-radius: 8px;
            box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
            position: absolute;
            top: 24px;
            width: 230px;
            right: -149px;
            padding: 5px;
            .items {
              display: flex;
              align-items: center;
              margin: 5px;
              transition: all 0.6s ease;
              p {
                font-weight: bold;
                font-family: system-ui;
                font-size: 14px;
                transition: all 0.6s ease;
                border-bottom: ${({ scrollBiggger }) => (scrollBiggger > 60 ? "1px solid #525f98" : "1px solid #525f98")};
                color: ${({ scrollBiggger }) => (scrollBiggger > 60 ? "#000" : "#525f98")};
              }
              svg {
                color: ${({ scrollBiggger }) => (scrollBiggger > 60 ? `${colors.primaryColor}` : "#525f98")};
                margin: 0;
                margin-right: 5px;
              }
              &:hover p {
                border-bottom: ${({ scrollBiggger }) => (scrollBiggger > 60 ? `1px solid ${colors.primaryColor}` : `1px solid #fff`)};
              }
            }
          }
        }
        .item {
          margin-right: 10px;
          display: flex;
          transition: all 0.6s ease;
          font-size: 14px;
          font-weight: 600;
          font-family: system-ui;
        }
      }
    }
  }
  .cuenta {
    display: none;
    align-items: center;
    justify-content: flex-end;
    span.MuiBadge-badge.MuiBadge-anchorOriginTopRightRectangle.MuiBadge-colorPrimary {
      height: 20px;
      /* color: red; */
      background-color: #3f51b5;
    }
    span.MuiTouchRipple-root {
      height: 30px;
      margin: 0 10px;
      border-right: none;
    }
    span.MuiTypography-root.MuiListItemText-primary.MuiTypography-body1.MuiTypography-displayBlock {
      border: none;
    }
    .popper {
      width: 320px;
      .Header {
        background: #3d78e3;
        color: white;
        font-weight: bold;
        margin-bottom: 0;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        display: flex;
        padding: 0px 13px 0px 13px;
        justify-content: space-between;
        align-items: center;
        p {
          font-size: 16px;
          font-weight: 600;
          margin: 10px 0px 10px 0px;
        }
        svg {
          font-size: 17px;
          cursor: pointer;
        }
      }
      .submenuaccount {
        background-color: #fff;
        border-radius: 8px;
        top: 30px;
        right: 0;
        padding: 0px 10px 12px;
        box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
        max-height: 50vh;
        overflow-y: scroll;
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 10%);
          border-radius: 10px;
        }
        ::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 20px #eaeaea;
        }
        .notification_container {
          display: flex;
          flex-direction: column;
          width: 100%;
          .notification {
            display: flex;
            align-items: center;
            position: relative;
            padding: 10px 0%;
            border-bottom: 1px solid #eee;
            position: relative;
            .AvatarIcon {
              width: 50px;
              height: 50px;
              object-fit: contain;
              background-color: #f3f3f3;
              margin-right: 5px;
              svg {
                margin: 0;
                color: ${colors.primaryColor};
              }
            }
            .information {
              display: flex;
              flex-direction: column;
              width: 100%;
              .company {
                font-size: 12px;
                font-weight: bold;
                letter-spacing: 0.03em;
                margin: 0px;
                color: #495057;
                strong {
                  font-weight: 700;
                  color: #3f51b5ad;
                }
              }
              .message {
                font-size: 13px;
                width: 92%;
                color: #74788d !important;
                margin: 1px;
                strong {
                  color: #3f51b5ad;
                  font-weight: 700;
                }
              }
              .Created {
                display: flex;
                align-items: center;

                .date {
                  margin: 1px;
                  font-size: 0.8125rem;
                  letter-spacing: 0.03em;
                  color: #74788d !important;
                }
                svg {
                  color: #878a99 !important;
                  font-size: 14px;
                }
              }
            }
            .delete_notification {
              display: flex;
              justify-content: space-between;
              svg {
                font-size: 14px;
                color: #8a8a8a;
                cursor: pointer;
                &:hover {
                  color: #f50;
                }
              }
            }
          }
        }
        .more_notications {
          display: flex;
          justify-content: center;
          align-items: center;
          .more_text {
            font-size: 14px;
            color: #556ee6;
          }
          svg {
            font-size: 16px;
            background: #556ee6;
            color: white;
            margin-right: 7px;
            border-radius: 15px;
          }
        }
      }
    }
  }
  .lgo {
    @media ${device.sm} {
      display: flex;
    }
  }
  .icons {
    display: flex;
    color: #495057;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    padding: 2px;

    svg {
      font-size: 27px;
      margin-right: 6px;
    }
  }
  .logo_img {
    display: none;
    @media ${device.sm} {
      display: flex;
    }
  }
  .goprofile {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
    p {
      text-align: center;
      font-size: 12px;
      font-weight: 700;
    }
    svg {
    }
  }
  .logout {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
      object-fit: cover;
      border-radius: 50%;
    }
    p {
      text-align: center;
      font-size: 12px;
      font-weight: 700;
    }
    svg {
      color: #3d78e3;
    }
  }
  /* estilos menu mobil */
  .movil {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .logoNotifications {
      display: flex;
    }
    &_logo {
      display: flex;
      align-items: center;
      img {
        width: 120px;
        object-fit: cover;
      }
    }
    &_menuMobil {
      background: #ffff;

      width: 250px;
      position: absolute;
      height: 100vh;
      overflow-x: hidden;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 0px;
      }
      top: 0;
      left: 0;
      padding: 25px;
      z-index: 999;
      border-right: 1px solid #f3f3f3;
      transition: all 500ms ease;
      transform: translate(-100%, 0%);
      box-shadow: 0 2px 4px rgb(15 34 58 / 12%);
      .logo {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 18px;
        img {
          width: 70px;
          height: 70px;
          object-fit: cover;
        }
        .company {
          margin-top: 5px;
          margin-bottom: 5px;
          text-align: center;
          font-size: 15px;
          font-weight: bold;
          letter-spacing: 0.04em;
          font-weight: 700;
        }
        .name {
          margin-top: 5px;
          margin-bottom: 5px;
          text-align: center;
          font-size: 14px;

          letter-spacing: 0.04em;
        }
      }
    }
    .iconList {
      margin-left: 12px;
    }
    .iconClose {
      margin-left: 12px;
    }
    .view {
      transform: translate(0%, 0%);
    }
    .add {
      display: flex;
      border-radius: 8px;
      color: #fff;
      align-items: center;
      justify-content: center;
      background: #f17171;
      height: 30px;

      &_create {
        display: flex;
        align-items: center;
        font-size: 14px;
      }
    }
    .itemsdesktop {
      flex-direction: row;
      align-items: center;
      margin-left: 28px;
    }
    .item {
      margin-right: 10px;
      display: flex;
      transition: all 0.6s ease;
      font-size: 14px;
      font-weight: 600;
      font-family: system-ui;
    }
  }
  .menu {
    font-size: 13px;
    font-family: system-ui;
    font-weight: bold;

    letter-spacing: 0.03em;
  }
  .buttonOptions {
    display: flex;
    align-items: center;

    transition: all 600ms ease;
    border-radius: 8px;
    border: 1px;
    color: #545a6d;
    width: 100%;
    padding: 5px;
    &_button {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 5px;
      transition: all 600ms ease;
      border-radius: 8px;
      border: 1px;
      color: #545a6d;
      justify-content: flex-start;
      padding: 0px 0px 0px 29px;
      svg {
        margin-right: 5px;
      }
      p {
        margin: 0;
      }
    }
    &_select {
      display: flex;
      align-items: center;
      padding: 5px;
      transition: all 600ms ease;
      border-radius: 8px;
      justify-content: flex-start;
      cursor: pointer;
      background: rgb(139 145 220 / 5%);

      width: 100%;
      svg {
        margin-right: 5px;
      }
    }
  }
  .buttonMenu {
    display: flex;
    align-items: center;
    transition: all 600ms ease;
    border-radius: 8px;
    border: 1px;
    color: #545a6d;
    width: 100%;
    padding: 2px 6px;
    align-items: center;
    width: 100%;
    height: 47px;
    margin: 5px 0px 12px 0px;
    cursor: pointer;
    &:hover {
      background: #3d78e312;
      color: #3d78e3;
      font-weight: 600;
    }
    svg {
      margin-right: 5px;
    }
    &_select {
      display: flex;
      align-items: center;
      padding: 5px;
      transition: all 600ms ease;
      border-radius: 8px;
      justify-content: flex-start;
      cursor: pointer;
      background: rgb(139 145 220 / 5%);
      width: 100%;
      svg {
        margin-right: 5px;
      }
    }
  }
  .iconsmobil {
    margin-top: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #545a6d;
    margin-bottom: 15px;
  }

  @media ${device.sm} {
    span {
      height: 30px;
      margin: 0 10px;
      border-right: 1px solid #b7b9e5;
    }
    .cuenta {
      display: flex;
    }

    .movil {
      display: none;
    }
  }
`;

const notificationsbd = [
  {
    _id: "62def899d6798504a4d1f3f7",
    message: " ¡Felicidades! UF ha creado una venta",
    Concepto: "Finiquico Toco",

    Cliente: "Erik Vazquez",
    createdAt: "2022-07-25",
    updatedAt: "2022-07-25",
  },

  {
    _id: "62ceda8840da7bae2bc5d255",
    message: " ¡Felicidades! MN ha creado una venta  ",
    Cliente: "Coorporativo ",
    Concepto: "Finiquico Toco",
    createdAt: "2022-07-13",
    updatedAt: "2022-07-13",
  },

  {
    _id: "62cecb2e40da7bae2bc5cfc3",
    message: "  ¡Felicidades! UF ha creado una venta",
    Cliente: "Monserrat ",
    Concepto: "Finiquico Toco",
    createdAt: "2022-07-13",
    updatedAt: "2022-07-13",
  },
];
