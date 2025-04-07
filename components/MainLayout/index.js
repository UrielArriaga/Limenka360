import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import { Avatar, Badge, Collapse, IconButton, Tooltip } from "@material-ui/core";
import { useRouter } from "next/router";
import {
  Close,
  ExpandLess,
  ExpandMore,
  FiberManualRecord,
  MenuOpen,
  NotificationsOutlined,
  Menu,
  AssignmentLateOutlined,
  ShoppingBasketOutlined,
  Receipt,
  EventOutlined,
  Settings,
  ExitToApp,
  AccountCircleOutlined,
  People,
  LocalOfferOutlined,
  ListAlt,
} from "@material-ui/icons";
import { LayoutStyled, MenuAccount, MenuMobile, MenuNavbar, OptionButton, OptionMenu, SearchBox } from "./style";
import EjecutiveNotifications from "../EjecutiveNotifications";
import Pendientes from "../EjecutivePendings";
import { clearState, userSelector } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { abbreviationNumber, validateURL } from "../../utils";
import { notificationsSelector } from "../../redux/slices/notificationSlice";
import { ordersSelector } from "../../redux/slices/orders";
import { toogleDrawer } from "../../redux/slices/ejecutivosSlice";
import DrawerProducts from "../DrawerProducts";
import DrawerAutorization from "../DrawerAutorization";
import DrawerOrdersVerifiedLogistic from "../DrawerOrdersVerifiedLogistic";
import SearchProspects from "../SearchProspects";
import SearchProspectsManager from "../SearchProspectManager";
import { CommonFiltersContext } from "../../context/commonFiltersContext";
import DrawerOrdersNotificationsAdmin from "../DrawerOrdersNotificationsAdmin";

export default function MainLayout({ children }) {
  const { sideBar } = useContext(CommonFiltersContext);
  const { isOnline, userData, roleId } = useSelector(userSelector);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [isOpenMenuMovile, setIsOpenMenuMovile] = useState(false);
  const [isOpenMenuNavBar, setIsOpenMenuNavbar] = useState(false);
  const [isOpenMenuAccount, setIsOpenMenuAccount] = useState(false);
  const [isOpenSearchBox, setIsOpenSearchBox] = useState(false);
  const [validateStorage, setValidateStorage] = useState(false);
  const { group, name } = useSelector(userSelector);
  const handleClose = () => setIsOpenMenuMovile(false);
  const handleCloseSearchBox = () => setIsOpenSearchBox(false);
  const handleCloseMenuNavBar = () => setIsOpenMenuNavbar(false);
  const handleCloseMenuAccount = () => setIsOpenMenuAccount(false);
  const optionsDrawer = sideBar?.optionsSideBar;
  // useEffect(() => {
  //   let options = sideBar?.optionsSideBar.filter(item => item.role === roleId);
  // }, [roleId]);

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
    let options = sideBar?.optionsSideBar.filter(item => item?.role === roleId);
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
          <Link key={index} href={item.link}>
            <Tooltip title={isOpenMenu ? "" : item?.name} arrow={true}>
              <IconButton className={`option_menu ${returClsActive(item?.link, item?.style)}`}>
                {item?.icon}
                <p className="option_title">{item?.name}</p>
                {item?.count !== null && (
                  <Tooltip title={"" + item.count} placement="right-start" arrow={true}>
                    <p className={`option_count ${returClsActive(item?.link, item?.style)}__count`}>
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
  const renderOptionsMovile = () => {
    let options = optionsDrawer?.filter(item => item.role === roleId);
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
          <Link key={index} href={item.link}>
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
  const searchOptionsNav = () => {
    let searchOptions = optionsNavbar.filter(item => item.role === roleId);
    let newOptions = searchOptions[0]?.navOptions;
    return newOptions?.map(item => <>{item.content}</>);
  };
  const showSearchProspectBox = () => {
    switch (roleId) {
      case "ejecutivo":
        return <SearchProspects />;

      case "gerente":
        return <SearchProspectsManager />;
      default:
        break;
    }
  };
  const showSearchProspectButton = () => {
    switch (roleId) {
      case "ejecutivo":
        return (
          <picture className="button_search" onClick={() => setIsOpenSearchBox(!isOpenSearchBox)}>
            <img src="" alt="search" />
          </picture>
        );
      case "gerente":
        return (
          <picture className="button_search" onClick={() => setIsOpenSearchBox(!isOpenSearchBox)}>
            <img src="" alt="search" />
          </picture>
        );
      default:
        break;
    }
  };
  // const handleImageError = event => {
  //   event.target.onerror = null;
  //   event.target.src = "/load.png";
  // };

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
        <div className="left__body">{renderOptions()}</div>
        <div className="left__footer"></div>
      </div>
      <div className="right">
        <div className="navbar">
          <div className="left_nav">
            <IconButton className="button_movile" onClick={() => handleOpenMenu(!isOpenMenuMovile, "menu_mobile")}>
              {isOpenMenu ? <MenuOpen /> : <Menu />}
            </IconButton>
            <p className="title_group">{group}</p>
            <div className="search_box_component">{showSearchProspectBox()}</div>
            <div className="search_box">{showSearchProspectButton()}</div>
          </div>
          <div className="right_optionMenu">
            <IconButton onClick={() => setIsOpenMenuNavbar(true)}>
              <Settings />
            </IconButton>
          </div>
          <div className="right_nav">
            <div className="options_nav">{searchOptionsNav()}</div>
            <div className="divider_vertical" />
            <div className="account">
              <Avatar className="avatar" src={validateURL(userData?.photo)} alt="photo" />
              <p className="title_name" onMouseEnter={() => setIsOpenMenuAccount(true)}>
                {name}
                <span className={`${isOnline ? "online" : "offline"}`}>
                  <FiberManualRecord className={`${isOnline ? "icon_online" : "icon_offline"}`} />{" "}
                  {isOnline ? "En Linea" : "Desconectado"}
                </span>
              </p>
            </div>
          </div>
        </div>
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
      <SearchBox open={isOpenSearchBox} onClose={handleCloseSearchBox} anchor="top">
        <div className="search_content">
          <div className="input">{showSearchProspectBox()}</div>
          <IconButton className="bt_close" onClick={handleCloseSearchBox}>
            <Close />
          </IconButton>
        </div>
      </SearchBox>
      <MenuNavbar open={isOpenMenuNavBar} onClose={handleCloseMenuNavBar} anchor="right">
        <div className="menu_nav">
          <div className="menu_nav__header"></div>
          <div className="menu_nav__body">
            <OptionButton onClick={() => router.push({ pathname: "/micuenta" })}>
              <AccountCircleOutlined fontSize="small" />
              <p className="title">Mi Cuenta</p>
            </OptionButton>
            {searchOptionsNav()}
            <OptionButton onClick={() => dispatch(clearState())}>
              <ExitToApp className="exit" fontSize="small" />
              <p className="title exit">Cerrar Sesión</p>
            </OptionButton>
          </div>
          <div className="menu_nav__footer"></div>
        </div>
      </MenuNavbar>
      <MenuAccount open={isOpenMenuAccount} onClose={handleCloseMenuAccount} anchor="right">
        <div className="body_menu" onMouseLeave={handleCloseMenuAccount}>
          <div className="body_menu__body">
            <OptionMenu onClick={() => router.push({ pathname: "/micuenta" })}>
              <AccountCircleOutlined fontSize="small" />
              <p className="title">Mi Cuenta</p>
            </OptionMenu>
            <OptionMenu onClick={() => dispatch(clearState())}>
              <ExitToApp className="exit" fontSize="small" />
              <p className="title exit">Cerrar Sesión</p>
            </OptionMenu>
          </div>
        </div>
      </MenuAccount>
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
// Funciones navbar ejecutivo
function ExecutiveNoti() {
  const [open, setOpen] = useState(false);
  const { totalNotifications } = useSelector(notificationsSelector);
  return (
    <>
      <OptionButton onClick={() => setOpen(true)}>
        <Badge overlap="rectangular" badgeContent={totalNotifications} color="error">
          <NotificationsOutlined fontSize="small" />
          <p className="title">Notificaciones</p>
        </Badge>
      </OptionButton>
      <EjecutiveNotifications open={open} setOpen={setOpen} />
    </>
  );
}
function ExecutiveSlopes() {
  const [open, setOpen] = useState(false);
  const [totalSlope, setTotalSlope] = useState(0);
  return (
    <>
      <OptionButton onClick={() => setOpen(true)}>
        <Badge overlap="rectangular" badgeContent={totalSlope} color="error">
          <AssignmentLateOutlined fontSize="small" />
          <p className="title">Pendientes</p>
        </Badge>
        <p className="count">{totalSlope}</p>
      </OptionButton>
      <Pendientes
        drawerShowPending={open}
        setDrawerShowPending={setOpen}
        totalPendings={totalSlope}
        setTotalPendings={setTotalSlope}
      />
    </>
  );
}
function ExecutiveActivities() {
  const router = useRouter();
  return (
    <OptionButton onClick={() => router.push({ pathname: "/actividades" })}>
      <Receipt fontSize="small" />
      <p className="title">Actividades</p>
    </OptionButton>
  );
}
function ExecutiveCalendar() {
  return (
    <OptionButton>
      <EventOutlined fontSize="small" />
      <p className="title">Calendario</p>
    </OptionButton>
  );
}
//

// Funciones navbar gerente
function ManagerExecutives() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  return (
    <>
      <OptionButton onClick={() => dispatch(toogleDrawer())}>
        <Badge overlap="rectangular" color="error">
          <People fontSize="small" />
          <p className="title">Ejecutivos</p>
        </Badge>
      </OptionButton>
    </>
  );
}
function ManagerNotifications() {
  return (
    <OptionButton>
      <Badge overlap="rectangular" color="error">
        <NotificationsOutlined fontSize="small" />
        <p className="title">Notificaciones</p>
      </Badge>
    </OptionButton>
  );
}
function ManagerSlopes() {
  const [open, setOpen] = useState(false);
  const [totalSlope, setTotalSlope] = useState(0);
  return (
    <>
      <OptionButton onClick={() => setOpen(true)}>
        <Badge overlap="rectangular" badgeContent={totalSlope} color="error">
          <AssignmentLateOutlined fontSize="small" />
          <p className="title">Pendientes</p>
        </Badge>
        <p className="count">{totalSlope}</p>
      </OptionButton>
      <Pendientes
        drawerShowPending={open}
        setDrawerShowPending={setOpen}
        totalPendings={totalSlope}
        setTotalPendings={setTotalSlope}
      />
    </>
  );
}
function ManagerDiscounts() {
  const [open, setOpen] = useState(false);
  const [totalDiscounts, setTotalDiscounts] = useState(0);
  return (
    <>
      <OptionButton onClick={() => setOpen(true)}>
        <Badge overlap="rectangular" badgeContent={totalDiscounts} color="error">
          <LocalOfferOutlined fontSize="small" />
          <p className="title">Descuentos (Autorizar)</p>
        </Badge>
        <p className="count">{totalDiscounts}</p>
      </OptionButton>
      <DrawerAutorization
        drawerShowDiscount={open}
        setDrawerShowDiscount={setOpen}
        totalDiscounts={totalDiscounts}
        setTotalDiscounts={setTotalDiscounts}
      />
    </>
  );
}
function ManagerCalendar() {
  return (
    <OptionButton>
      <EventOutlined fontSize="small" />
      <p className="title">Calendario</p>
    </OptionButton>
  );
}
function ManagerActivities() {
  const router = useRouter();
  return (
    <OptionButton onClick={() => router.push({ pathname: "/actividades" })}>
      <Receipt fontSize="small" />
      <p className="title">Actividades</p>
    </OptionButton>
  );
}
//

// Funciones navbar logística
function LogisticOrders() {
  const { totalOrders } = useSelector(ordersSelector);
  const [drawerShowOrdersVerified, setDrawerShowOrdersVerified] = useState(false);

  return (
    <>
      <OptionButton onClick={() => setDrawerShowOrdersVerified(true)}>
        <Badge overlap="rectangular" badgeContent={totalOrders} color="error">
          <ListAlt fontSize="small" />
          <p className="title">Pedidos</p>
        </Badge>
      </OptionButton>

      <DrawerOrdersVerifiedLogistic
        drawerShowOrders={drawerShowOrdersVerified}
        setDrawerShowOrders={setDrawerShowOrdersVerified}
      />
    </>
  );
}
//

// Funciones navbar administracion
function LogisticOrdersAdm() {
  const { totalOrders } = useSelector(ordersSelector);
  const [drawerShowOrdersVerified, setDrawerShowOrdersVerified] = useState(false);

  return (
    <>
      <OptionButton onClick={() => setDrawerShowOrdersVerified(true)}>
        <Badge overlap="rectangular" badgeContent={totalOrders} color="error">
          <ListAlt fontSize="small" />
          <p className="title">Pedidos</p>
        </Badge>
      </OptionButton>
      <DrawerOrdersNotificationsAdmin
        drawerShowOrders={drawerShowOrdersVerified}
        setDrawerShowOrders={setDrawerShowOrdersVerified}
      />
    </>
  );
}
//

//Funciones Publicas

function AllProducts() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <OptionButton onClick={() => setOpen(true)}>
        <ShoppingBasketOutlined fontSize="small" />
        <p className="title">Productos</p>
      </OptionButton>
      <DrawerProducts width={"60%"} show={open} closeDrawer={() => setOpen(!open)} />
    </>
  );
}
//

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
      {
        identifier: "calendar",
        label: "Calendario",
        content: <ExecutiveCalendar />,
      },
      {
        identifier: "activities",
        label: "Actividades",
        content: <ExecutiveActivities />,
      },
      {
        identifier: "products",
        label: "Productos",
        content: <AllProducts />,
      },
    ],
  },
  {
    id: 2,
    role: "gerente",
    navOptions: [
      {
        identifier: "executives",
        label: "Ejecutivos",
        content: <ManagerExecutives />,
      },
      {
        identifier: "notifications",
        label: "Notificaciones",
        content: <ManagerNotifications />,
      },
      {
        identifier: "slopes",
        label: "Pendientes",
        content: <ManagerSlopes />,
      },
      {
        identifier: "discounts",
        label: "Descuentos",
        content: <ManagerDiscounts />,
      },
      {
        identifier: "products",
        label: "Productos",
        content: <AllProducts />,
      },
      {
        identifier: "calendar",
        label: "Calendario",
        content: <ManagerCalendar />,
      },
      {
        identifier: "activities",
        label: "Actividades",
        content: <ManagerActivities />,
      },
    ],
  },
  {
    id: 3,
    role: "logistica",
    navOptions: [
      {
        identifier: "products",
        label: "Productos",
        content: <AllProducts />,
      },
      {
        identifier: "orders",
        label: "Pedidos",
        content: <LogisticOrders />,
      },
    
    ],
  },
  {
    id: 4,
    role: "inteligencia_comercial",
    navOptions: [],
  },
  {
    id: 6,
    role: "compras",
    navOptions: [
      {
        identifier: "products",
        label: "Productos",
        content: <AllProducts />,
      },
    ],
  },
  {
    id: 7,
    role: "administracion",
    navOptions: [
      {
        identifier: "orders",
        label: "Pedidos",
        content: <LogisticOrdersAdm />,
      },
    ],
  },
];
