import { Avatar, Badge, Collapse, Drawer, IconButton, Tooltip } from "@material-ui/core";
import {
  AccountBalanceWallet,
  Assessment,
  Assignment,
  AssignmentLate,
  Build,
  BusinessOutlined,
  Close,
  DashboardOutlined,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  Menu,
  MenuOpen,
  MonetizationOn,
  NotificationsOutlined,
  PersonOutline,
  Star,
  StarBorder,
  WhatsApp,
} from "@material-ui/icons";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { userSelector } from "../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchProspects from "../components/SearchProspects";
import { colors } from "../styles/global.styles";
import { dashboardSelectos } from "../redux/slices/dashboardSlice";
import { abbreviationNumber } from "../utils";
import EjecutiveNotifications from "../components/EjecutiveNotifications";
import { notificationsSelector } from "../redux/slices/notificationSlice";
import { slopesSelector } from "../redux/slices/slopesSlice";
import Pendientes from "../components/EjecutivePendings";

export default function Side() {
  return (
    <MainLayout>
      <PruebasLayout>
        <div>
          <p>contenido</p>
        </div>
      </PruebasLayout>
    </MainLayout>
  );
}

function MainLayout({ children }) {
  const { totalProspects, totalOportunities, totalSales, totalClients, totalPayments, totalOrdersEjecutive } =
    useSelector(dashboardSelectos);
  const { isOnline } = useSelector(userSelector);
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenMenuMovile, setIsOpenMenuMovile] = useState(false);
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const { roleId, group, name } = useSelector(userSelector);
  const [countersRole, setCountersRole] = useState([]);
  useEffect(() => {
    searchCount();
  }, [roleId]);

  const counts = [
    {
      role: "ejecutivo",
      datacount: [
        { identifier: "prospects", count: totalProspects },
        { identifier: "oportunities", count: totalOportunities },
        { identifier: "sales", count: totalSales },
        { identifier: "clients", count: totalClients },
        { identifier: "payments", count: totalPayments },
        { identifier: "orders", count: totalOrdersEjecutive },
      ],
    },
  ];
  const handleClose = () => setIsOpenMenuMovile(false);
  const handleCloseSearchBox = () => setIsOpenSearchBox(false);
  const returClsActive = (routes, style) => {
    let pathName = router.pathname;
    if (routes === pathName) return "active";
    return `${style}`;
  };
  const returClsActiveSubMenu = (style, options) => {
    let pathName = router.pathname;
    let searchPath = options.filter(item => item.link === pathName);
    if (searchPath.length > 0) return "active";
    return `${style}`;
  };
  const searchCount = () => {
    let countSearch = counts.filter(item => item.role === roleId);
    setCountersRole(countSearch[0].datacount);
  };
  const filterCounts = identifier => {
    let filterOption = countersRole.filter(item => item.identifier === identifier);
    if (filterOption.length > 0) return filterOption[0].count;
    return 0;
  };
  const searchOptions = role => {
    let options = optionsSidebar.filter(item => item.role === role);
    let optionsData = options[0];
    let firstOptions = options[0].mainOptions;
    let secondOptions = options[0].secondaryOptions;
    return (
      <>
        {firstOptions.map((item, index) => (
          <Link key={index} href={item.link}>
            <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
              <IconButton className={`option_menu ${returClsActive(item.link, item.style)}`}>
                {item.icon}
                <p className="option_title">{item.name}</p>
                {item.count !== null && (
                  <Tooltip title={"" + filterCounts(item.count)} placement="right-start" arrow={true}>
                    <p className={`option_count ${returClsActive(item.link, item.style)}__count`}>
                      {abbreviationNumber(filterCounts(item.identifier))}
                    </p>
                  </Tooltip>
                )}
              </IconButton>
            </Tooltip>
          </Link>
        ))}
        <div className="divider" />
        {optionsData.isSecondaryOptions &&
          secondOptions.map((item, index) => {
            if (item.subMenu)
              return (
                <OptionSubMenu
                  key={index}
                  option={item}
                  returClsActive={returClsActive}
                  returClsActiveSubMenu={returClsActiveSubMenu}
                  isOpenMenu={isOpenMenu}
                />
              );
            return (
              <Link key={index} href={item.link}>
                <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
                  <IconButton className={`option_menu ${returClsActive(item.link, item.style)}`}>
                    {item.icon}
                    <p className="option_title">{item.name}</p>
                  </IconButton>
                </Tooltip>
              </Link>
            );
          })}
      </>
    );
  };

  const searchOptionsMovile = role => {
    let options = optionsSidebar.filter(item => item.role === role);
    let optionsData = options[0];
    let firstOptions = options[0].mainOptions;
    let secondOptions = options[0].secondaryOptions;
    return (
      <>
        {firstOptions.map((item, index) => (
          <Link key={index} href={item.link}>
            <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
              <IconButton className={`option_menu ${returClsActive(item.link, item.style)}`}>
                {item.icon}
                <p className="option_title">{item.name}</p>
                {item.count !== null && (
                  <Tooltip title={"" + filterCounts(item.count)} placement="right-start" arrow={true}>
                    <p className={`option_count ${returClsActive(item.link, item.style)}__count`}>
                      {abbreviationNumber(filterCounts(item.identifier))}
                    </p>
                  </Tooltip>
                )}
              </IconButton>
            </Tooltip>
          </Link>
        ))}
        <div className="divider" />
        {optionsData.isSecondaryOptions &&
          secondOptions.map((item, index) => {
            if (item.subMenu)
              return (
                <OptionSubMenu
                  key={index}
                  option={item}
                  returClsActive={returClsActive}
                  returClsActiveSubMenu={returClsActiveSubMenu}
                  isOpenMenu={isOpenMenu}
                />
              );
            return (
              <Link key={index} href={item.link}>
                <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
                  <IconButton className={`option_menu ${returClsActive(item.link, item.style)}`}>
                    {item.icon}
                    <p className="option_title">{item.name}</p>
                  </IconButton>
                </Tooltip>
              </Link>
            );
          })}
      </>
    );
  };

  const searchOptionsNav = role => {
    let searchOptions = optionsNavbar.filter(item => item.role === role);
    let newOptions = searchOptions[0].navOptions;
    return newOptions.map(item => <>{item.content}</>);
  };

  return (
    <LayoutStyled isOpen={isOpenMenu}>
      <div className="left">
        <div className="left__header">
          <div className="logos">
            <div className="logo_open">
              <picture>
                <img src="/LOGOLIMENKA360_COLOR-02.PNG" alt="logo" />
              </picture>
            </div>
            <div className="logo_close">
              <picture>
                <img src="/logo_svg.png" alt="logo" />
              </picture>
            </div>
          </div>
          <IconButton className="button" onClick={() => setIsOpenMenu(!isOpenMenu)}>
            {isOpenMenu ? <MenuOpen /> : <Menu />}
          </IconButton>
        </div>
        <div className="left__body">{searchOptions(roleId)}</div>
        <div className="left__footer"></div>
      </div>
      <div className="right">
        <div className="navbar">
          <div className="left_nav">
            <IconButton className="button_movile" onClick={() => setIsOpenMenuMovile(!isOpenMenuMovile)}>
              {isOpenMenu ? <MenuOpen /> : <Menu />}
            </IconButton>
            <p className="title_group">{group}</p>
            <div className="search_box_component">
              <SearchProspects />
            </div>
            <div className="search_box">
              <picture className="button_search" onClick={() => setIsOpenSearchBox(!isOpenSearchBox)}>
                <img src="" alt="search" />
              </picture>
            </div>
          </div>
          <div className="right_nav">
            <div className="options_nav">{searchOptionsNav(roleId)}</div>
            <div className="divider_vertical" />
            <div className="account">
              <Avatar className="avatar" />
              <p className="title_name">
                {name}
                <span className={`${isOnline ? "online" : "offline"}`}>
                  <FiberManualRecord className={`${isOnline ? "icon_online" : "icon_offline"}`} />{" "}
                  {isOnline ? "En Linea" : "Desconectado"}
                </span>
              </p>
            </div>
          </div>
        </div>
        <div className="content_media">{children}</div>
      </div>
      <MenuMobile open={isOpenMenuMovile} onClose={handleClose}>
        <div className="menu">
          <div className="menu__header">
            <div className="logo">
              <picture>
                <img src="/LOGOLIMENKA360_COLOR-02.PNG" alt="logo" />
              </picture>
            </div>
            <IconButton className="button_close" onClick={handleClose}>
              <MenuOpen />
            </IconButton>
          </div>
          <div className="menu__body">{searchOptionsMovile(roleId)}</div>
          <div className="menu__footer"></div>
        </div>
      </MenuMobile>
      <SearchBox open={isOpenSearchBox} onClose={handleCloseSearchBox} anchor="top">
        <div className="search_content">
          <div className="input">
            <SearchProspects />
          </div>
          <IconButton className="bt_close" onClick={handleCloseSearchBox}>
            <Close />
          </IconButton>
        </div>
      </SearchBox>
    </LayoutStyled>
  );
}
function OptionSubMenu({ option, returClsActive, returClsActiveSubMenu, isOpenMenu }) {
  const [showOptions, setShowOptions] = useState(false);
  return (
    <>
      <Tooltip title={isOpenMenu ? "" : option.name} arrow={true}>
        <IconButton
          className={`option_menu ${returClsActiveSubMenu(option.style, option.subOptions)}`}
          onClick={() => setShowOptions(!showOptions)}
        >
          {option.icon}
          <p className="option_title">{option.name}</p>
          {!showOptions ? <ExpandMore className="expand_icon" /> : <ExpandLess className="expand_icon" />}
        </IconButton>
      </Tooltip>
      <div className="sub_options">
        <Collapse in={showOptions}>
          <ExpandMore className="more_options" />
          {option.subOptions.map((item, index) => (
            <Link key={index} href={item.link}>
              <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
                <IconButton className={`option_menu sub_optionMenu ${returClsActive(item.link, item.style)}`}>
                  {item.icon} <p className="option_title suboption_name">{item.name}</p>
                </IconButton>
              </Tooltip>
            </Link>
          ))}
        </Collapse>
      </div>
    </>
  );
}

function ExecutiveNoti() {
  const [open, setOpen] = useState(false);
  const { totalNotifications } = useSelector(notificationsSelector);
  return (
    <>
      <Badge overlap="rectangular" badgeContent={totalNotifications} color="error">
        <NotificationsOutlined fontSize="small" onClick={() => setOpen(true)} />
      </Badge>
      <EjecutiveNotifications open={open} setOpen={setOpen} />
    </>
  );
}

function ExecutiveSlopes() {
  const [open, setOpen] = useState(false);
  const [totalSlope, setTotalSlope] = useState(0);
  const { totalSlopes } = useSelector(slopesSelector);
  return (
    <>
      <Badge overlap="rectangular" badgeContent={totalSlopes} color="error">
        <NotificationsOutlined fontSize="small" onClick={() => setOpen(true)} />
      </Badge>
      <Pendientes
        drawerShowPending={open}
        setDrawerShowPending={setOpen}
        totalPendings={totalSlope}
        setTotalPendings={setTotalSlope}
      />
    </>
  );
}

const LayoutStyled = styled.div`
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
            height: 116px;
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
      .button {
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
    height: 100vh;
    overflow: hidden;
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
        width: 20%;
        display: flex;
        flex-direction: row;
        justify-content: right;
        align-items: center;
        overflow: hidden;
        height: 100%;
        border-top-left-radius: 48px;
        border-bottom-left-radius: 5px;
        background: ${colors.primaryColor};
        .account {
          width: fit-content;
          display: flex;
          align-items: center;
          position: relative;
          justify-content: center;
          padding: 10px;
          margin-right: 10px;
          cursor: pointer;
          .avatar {
            margin-right: 10px;
          }
          .title_name {
            display: flex;
            flex-direction: column;
            text-transform: capitalize;
            color: #fff;
            .online {
              display: flex;
              align-items: center;
              color: #fff;
              font-size: 14px;
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
      }
    }
    .content {
      width: 100%;
      height: 100%;
      border: 1px solid red;
    }
  }
`;

const PruebasLayout = styled.div``;

const MenuMobile = styled(Drawer)`
  @media (min-width: 601px) {
    display: none;
  }
  .MuiPaper-root.MuiDrawer-paper.MuiDrawer-paperAnchorLeft.MuiPaper-elevation16 {
    width: 70%;
    height: 100%;
    background-color: #407aff;
  }
  .menu {
    display: flex;
    flex-direction: column;
    width: 100%;
    &__header {
      justify-content: center;
      display: flex;
      align-items: center;
      .logo {
        img {
          width: 190px;
          height: 116px;
        }
      }
      .button_close {
        width: 30px;
        height: 30px;
        border-radius: 8px;
        color: #fff;
      }
    }
    &__body {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      .option_menu {
        display: flex;
        overflow: hidden;
        align-items: center;
        width: 100%;
        border-radius: 2px;
        height: 40px;
        justify-content: space-between;
        background-color: #fff;
        margin-bottom: 11px;
        transition: 0.2s;
        svg {
        }
        .option_title {
          text-align: left;
          font-size: 14px;
          font-weight: 600;
          width: 100%;
          padding: 0px 0px 0px 25px;
          margin-bottom: -3px;
        }
        .option_count {
          font-size: 15px;
          padding: 2px 7px;
          border-radius: 6px;
          color: #fff;
        }
        .expand_icon {
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
      .more_options {
        width: 100%;
        color: #fff;
      }
      .sub_options {
        width: 100%;
        display: flex;
        flex-direction: column;
        .sub_optionMenu {
          padding-left: auto;
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
`;
const SearchBox = styled(Drawer)`
  height: 100%;

  .MuiBackdrop-root {
    backdrop-filter: blur(0px);
    height: 100%;
  }
  .search_content {
    margin-top: 10px;
    padding: 5px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: transparent;
    position: fixed;
    .input {
      width: 100%;
      height: fit-content;
      border: 1px solid;
      border-radius: 8px;
      color: grey;
    }
    .bt_close {
      height: 35px;
      width: 35px;
      border-radius: 8px;
      background-color: #fff;
      svg {
        color: red;
      }
    }
  }
`;
const optionsSidebar = [
  {
    id: 1,
    role: "ejecutivo",
    isSecondaryOptions: true,
    mainOptions: [
      {
        identifier: "dashboard",
        name: "DashBoard",
        link: "/ejecutivo",
        style: "dashboard",
        icon: <DashboardOutlined />,
        count: null,
      },
      {
        identifier: "prospects",
        name: "Prospectos",
        link: "/prospectos",
        style: "prospects",
        icon: <PersonOutline />,
        count: 0,
      },
      {
        identifier: "oportunities",
        name: "Oportunidades",
        link: "/oportunidades",
        style: "oportunities",
        icon: <StarBorder />,
        count: 0,
      },
      {
        identifier: "clients",
        name: "Clientes",
        link: "/clientes",
        style: "clients",
        icon: <BusinessOutlined />,
        count: 0,
      },
      {
        identifier: "payments",
        name: "Cuentas Por Cobrar",
        link: "/pagos",
        style: "payments",
        icon: <MonetizationOn />,
        count: 0,
      },
      {
        identifier: "sales",
        name: "Ventas",
        link: "/ventas",
        style: "sales",
        icon: <AccountBalanceWallet />,
        count: 0,
      },
      {
        identifier: "orders",
        name: "Pedidos",
        link: "/pedidos",
        style: "orders",
        icon: <Assignment />,
        count: 0,
      },
    ],
    secondaryOptions: [
      {
        name: "Empresas",
        link: "/catalogos/empresas",
        style: "tools",
        icon: <BusinessOutlined />,
        subMenu: false,
      },
      {
        name: "Reportes",
        link: "/reportes",
        style: "tools",
        icon: <Assessment />,
        subMenu: false,
      },
      {
        name: "Herramientas",
        link: null,
        style: "tools",
        icon: <Build />,
        subMenu: true,
        subOptions: [
          {
            name: "Metas",
            link: "/herramientas/metas",
            style: "tools",
            icon: <Star />,
          },
          {
            name: "Plantillas WhatsApp",
            link: "/herramientas/plantillas",
            style: "tools",
            icon: <WhatsApp />,
          },
          {
            name: "Plantillas Observaciones",
            link: "/herramientas/plantillasObservaciones",
            style: "tools",
            icon: <AssignmentLate />,
          },
        ],
      },
    ],
  },
];
const optionsNavbar = [
  {
    id: 1,
    role: "ejecutivo",
    navOptions: [
      {
        identifier: "notifications",
        label: "Notificaciones",
        content: <ExecutiveNoti />,
      },
      {
        identifier: "slopes",
        label: "Pendientes",
        content: <ExecutiveSlopes />,
      },
    ],
  },
];
