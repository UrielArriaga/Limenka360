import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Avatar, Badge, Collapse, Hidden, IconButton, Tooltip } from "@material-ui/core";
import { useRouter } from "next/router";
import {
  Close,
  ExpandLess,
  ExpandMore,
  MenuOpen,
  Menu,
  DashboardOutlined,
  PersonOutline,
  StarBorder,
  BusinessOutlined,
  ExitToApp,
} from "@material-ui/icons";
import { LayoutStyled, MenuAccount, MenuMobile, MenuNavbar, OptionButton, OptionMenu, SearchBox } from "./style";
import { abbreviationNumber, validateURL } from "../../utils";
import { useSelector } from "react-redux";
import { dashboardViewExecutiveSelector } from "../../redux/slices/dashboardViewExecutiveSlice";
export default function MainLayout({ children }) {
  const { totalProspects, totalOportunities, totalSells, totalClients, totalPayments, totalOrdersEjecutive } =
    useSelector(dashboardViewExecutiveSelector);
  const router = useRouter();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenMenuMovile, setIsOpenMenuMovile] = useState(false);
  const [validateStorage, setValidateStorage] = useState(false);
  const handleClose = () => setIsOpenMenuMovile(false);
  const optionsDrawer = sideBar?.optionsSideBar;
  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    let menu = localStorage.getItem("menu");
    let menu_mobile = localStorage.getItem("menu_mobile");
    if (menu) setIsOpenMenu(JSON.parse(menu));
    if (menu_mobile) setIsOpenMenuMovile(JSON.parse(menu_mobile));
    setValidateStorage(true);
  };

  const returClsActive = (routes, style) => {
    let pathName = router.pathname;
    if (routes === pathName) return "active";
    return `${style}`;
  };
  const returClsActiveSubMenu = (style, options) => {
    let pathName = router.pathname;
    let searchPath = options?.filter(item => item.link === pathName);
    if (searchPath.length > 0) return "active";
    return `${style}`;
  };
  const renderOptions = () => {
    let options = sideBar?.optionsSideBar.filter(item => item.role === "ejecutivo");
    let optionsData = [];
    let firstOptions = [];
    let secondOptions = [];
    if (options?.length > 0) {
      optionsData = options[0];
      firstOptions = options[0]?.mainOptions;
      secondOptions = options[0]?.secondaryOptions;
    }
    return (
      <>
        {firstOptions?.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: item.link,
              query: {
                id: router.query.id,
                cve: "0111",
              },
            }}
          >
            <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
              <IconButton className={`option_menu ${returClsActive(item.link, item.style)}`}>
                {item.icon}
                <p className="option_title">{item.name}</p>
                {item.count !== null && (
                  <Tooltip title={"" + item.count} placement="right-start" arrow={true}>
                    <p className={`option_count ${returClsActive(item.link, item.style)}__count`}>
                      {abbreviationNumber(item.count)}
                    </p>
                  </Tooltip>
                )}
              </IconButton>
            </Tooltip>
          </Link>
        ))}
        <div className="divider" />
        {optionsData?.isSecondaryOptions &&
          secondOptions?.map((item, index) => {
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
              <Link
                key={index}
                href={{
                  pathname: item.link,
                  query: {
                    id: router.query.id,
                    cve: "0111",
                  },
                }}
              >
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
  const renderOptionsMovile = () => {
    let options = optionsDrawer?.filter(item => item.role === "ejecutivo");
    let optionsData = [];
    let firstOptions = [];
    let secondOptions = [];
    if (options?.length > 0) {
      optionsData = options[0];
      firstOptions = options[0]?.mainOptions;
      secondOptions = options[0]?.secondaryOptions;
    }
    return (
      <>
        {firstOptions?.map((item, index) => (
          <Link
            key={index}
            href={{
              pathname: item.link,
              query: {
                id: router.query.id,
                cve: "0111",
              },
            }}
          >
            <Tooltip title={isOpenMenu ? "" : item.name} arrow={true}>
              <IconButton className={`option_menu ${returClsActive(item.link, item.style)}`}>
                {item.icon}
                <p className="option_title">{item.name}</p>
                {item.count !== null && (
                  <Tooltip title={"" + item.count} placement="right-start" arrow={true}>
                    <p className={`option_count ${returClsActive(item.link, item.style)}__count`}>
                      {abbreviationNumber(item.count)}
                    </p>
                  </Tooltip>
                )}
              </IconButton>
            </Tooltip>
          </Link>
        ))}
        <div className="divider" />
        {optionsData?.isSecondaryOptions &&
          secondOptions?.map((item, index) => {
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
              <Link
                key={index}
                href={{
                  pathname: item.link,
                  query: {
                    id: router.query.id,
                    cve: "0111",
                  },
                }}
              >
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

  const handleOpenMenu = (isOpen, typeMenu) => {
    if (typeMenu === "menu") {
      setIsOpenMenu(isOpen);
      localStorage.setItem(typeMenu, JSON.stringify(isOpen));
    } else {
      setIsOpenMenuMovile(isOpen);
      localStorage.setItem(typeMenu, JSON.stringify(isOpen));
    }
  };

  if (!validateStorage) return;
  return (
    <LayoutStyled isOpen={isOpenMenu}>
      <div className="left">
        <div className="left__header">
          <div className="logos">
            <div className="logo_open">
              <picture>
                <img
                  src="https://res.cloudinary.com/dvmpejtlj/image/upload/v1694467886/sidelog_fmtchn.png"
                  alt="logo"
                />
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
        <div className="left__body">{renderOptions()}</div>
        <div className="left__footer"></div>
      </div>
      <div className="right">
        <Hidden smUp>
          <div className="navbar">
            <div className="left_nav">
              <IconButton className="button_movile" onClick={() => handleOpenMenu(!isOpenMenuMovile, "menu_mobile")}>
                {isOpenMenu ? <MenuOpen /> : <Menu />}
              </IconButton>
            </div>
          </div>
        </Hidden>
        <div className="content_child">{children}</div>
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
          <div className="menu__body">{renderOptionsMovile()}</div>
          <div className="menu__footer"></div>
        </div>
      </MenuMobile>
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
            <Link
              key={index}
              href={{
                pathname: item.link,
                query: {
                  id: router.query.id,
                  cve: "0111",
                },
              }}
            >
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

const sideBar = {
  optionsSideBar: [
    {
      id: 1,
      role: "ejecutivo",
      isSecondaryOptions: true,
      mainOptions: [
        {
          identifier: "dashboard",
          name: "DashBoard",
          link: "/gerente",
          style: "dashboard",
          icon: <DashboardOutlined />,
          count: null,
        },
        {
          identifier: "prospects",
          name: "Prospectos",
          link: "/vistaejecutivo/prospectos",
          style: "prospects",
          icon: <PersonOutline />,
          count: null,
        },
        {
          identifier: "oportunities",
          name: "Oportunidades",
          link: "/vistaejecutivo/oportunidades",
          style: "oportunities",
          icon: <StarBorder />,
          count: null,
        },
        {
          identifier: "clients",
          name: "Clientes",
          link: "/vistaejecutivo/clientes",
          style: "clients",
          icon: <BusinessOutlined />,
          count: null,
        },
      ],
      secondaryOptions: [
        {
          name: "Salir de Dashboard",
          link: "/gerente",
          style: "tools",
          icon: <ExitToApp />,
          subMenu: false,
        },
      ],
    },
  ],
};
