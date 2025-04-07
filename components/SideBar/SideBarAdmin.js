import {
  AccountCircle,
  Assignment,
  AssignmentInd,
  AttachMoney,
  Business,
  BusinessOutlined,
  Category,
  Close,
  ContactPhone,
  DashboardOutlined,
  Description,
  ExitToApp,
  FileCopy,
  Group,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Label,
  LibraryBooks,
  LocalGroceryStore,
  LocalHospital,
  Menu,
  MenuOpen,
  MonetizationOn,
  People,
  PersonOutline,
  Star,
  StarBorder,
  TrendingUp,
  WhatsApp,
} from "@material-ui/icons";
import { Box, Collapse, Tooltip, useMediaQuery } from "@material-ui/core";
import React, { useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelectos, getPayments } from "../../redux/slices/dashboardSlice";
import { SiderBarDirectorStyled } from "./styles";
import { dialogSelector, handleToggleMenu } from "../../redux/slices/dialogSlice";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function SideBarAdmin({ open, setOpen }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const { openMenuSide, openRecentActivities } = useSelector(dialogSelector);
  const [isOpenMenu, setIsOpenMenu] = useState(true);
  const [showSubmenu, setShowSubmenu] = useState("");

  const {
    totalProspects,
    totalOportunities,
    totalSales,
    totalClients,
    totalPayments,
    totalGroups,
    totalEjecutives,
    totalFormats,
  } = useSelector(dashboardSelectos);

  useEffect(() => {
    getLocalStorage();
  }, []);

  const getLocalStorage = () => {
    let menu = localStorage.getItem("openMenuSide");
    if (menu) setIsOpenMenu(JSON.parse(menu));
  };

  // Methods to improve, its really ez...
  const handleClickShowTools = () => {
    if (showSubmenu === "showtools") {
      setShowSubmenu("");
    } else {
      setShowSubmenu("showtools");
    }
  };
  const handleClickShowCatalogs = () => {
    if (showSubmenu === "showcatalogs") {
      setShowSubmenu("");
    } else {
      setShowSubmenu("showcatalogs");
    }
  };

  const ItemMenu = ({ title, count, icon, redirectTo, handleClick, isOpen }) => {
    const isSmall = useMediaQuery("(max-width:700px)");

    if (!redirectTo) {
      return (
        <div className="item" onClick={handleClick}>
          <div className="item__icon">
            <div className="bg">{icon}</div>
          </div>

          <div className="item__text">
            <a>{title}</a>
          </div>

          <div className="item__count">
            {count && (
              <div className="">
                <p>{count}</p>
              </div>
            )}
          </div>
        </div>
      );
    } else {
      return (
        <div
          className="item"
          onClick={() => {
            router.push({ pathname: `/${redirectTo}` });

            if (isSmall) {
              localStorage.setItem("openMenuSide", JSON.stringify(!openMenuSide));
              dispatch(handleToggleMenu(!openMenuSide));
            }
          }}
        >
          <div className="item__icon">
            <Tooltip title={isOpen ? "" : title} placement="right-start" className="toltip">
              <div className="bg">{icon}</div>
            </Tooltip>
          </div>
          <div className="item__text">
            <a>{title}</a>
          </div>
          <div className="item__count">
            {count && (
              <div className="">
                <p>{count}</p>
              </div>
            )}
          </div>
        </div>
      );
    }
  };

  const SubItemMenu = ({ title, count, icon, redirectTo, isOpen }) => {
    return (
      <Link href={`/${redirectTo}`}>
        <div className="item subitem">
          <div className="item__icon">
            <Tooltip title={isOpen ? "" : title} placement="right-start">
              <div className="bg">{icon}</div>
            </Tooltip>
          </div>
          <div className="item__text">
            <a>{title}</a>
          </div>
          <div className="item__count">
            {count && (
              <div className="">
                <p>{count}</p>
              </div>
            )}
          </div>
        </div>
      </Link>
    );
  };

  const intToString = (num = 0) => {
    num = num.toString().replace(/[^0-9.]/g, "");
    if (num < 1000) {
      return num;
    }
    let si = [
      { v: 1e3, s: "K" },
      { v: 1e6, s: "M" },
      { v: 1e9, s: "B" },
      { v: 1e12, s: "T" },
      { v: 1e15, s: "P" },
      { v: 1e18, s: "E" },
    ];
    let index;
    for (index = si.length - 1; index > 0; index--) {
      if (num >= si[index].v) {
        break;
      }
    }
    return (num / si[index].v).toFixed(2).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") + si[index].s;
  };

  return (
    <SiderBarDirectorStyled isOpen={openMenuSide} sideBar={openMenuSide} activites={openRecentActivities}>
      <div className="actions">
        {!openMenuSide ? (
          <Menu
            onClick={() => {
              localStorage.setItem("openMenuSide", JSON.stringify(true));
              dispatch(handleToggleMenu(true));
              setIsOpenMenu(true);
            }}
          />
        ) : (
          <MenuOpen
            onClick={() => {
              localStorage.setItem("openMenuSide", JSON.stringify(false));
              dispatch(handleToggleMenu(false));
              setIsOpenMenu(false);
            }}
          />
        )}
      </div>
      {!openMenuSide ? (
        <div className="logo">
          <img src="/logofigure.png" alt="LOGO LIMENKA" />
        </div>
      ) : (
        <div className="logo">
          <img src="/logowhite.png" alt="LOGO LIMENKA" />
        </div>
      )}

      <div className="items">
        <ItemMenu redirectTo={"director"} title="Dashboard" icon={<DashboardOutlined />} isOpen={isOpenMenu} />
        <ItemMenu
          count={intToString(totalProspects)}
          redirectTo={"director/prospectos"}
          title="Prospectos"
          icon={<PersonOutline />}
          isOpen={isOpenMenu}
        />

        <ItemMenu
          count={intToString(totalOportunities)}
          redirectTo={"director/oportunidades"}
          title="Oportunidades"
          icon={<StarBorder />}
          isOpen={isOpenMenu}
        />

        <ItemMenu
          count={intToString(totalSales)}
          redirectTo={"director/ventas"}
          title="Ventas"
          icon={<ContactPhone />}
          isOpen={isOpenMenu}
        />
        <ItemMenu
          count={intToString(totalClients)}
          redirectTo={"director/clientes"}
          title="Clientes"
          icon={<BusinessOutlined />}
          isOpen={isOpenMenu}
        />
        <ItemMenu
          count={intToString(totalPayments)}
          redirectTo={"director/pagos"}
          title="Pagos"
          icon={<MonetizationOn />}
          isOpen={isOpenMenu}
        />

        <ItemMenu
          count={intToString(totalGroups)}
          redirectTo={"director/grupos"}
          title="Grupos"
          icon={<Group />}
          isOpen={isOpenMenu}
        />

        <ItemMenu redirectTo={"director/reportes"} title="Reportes" icon={<TrendingUp />} isOpen={isOpenMenu} />

        <ItemMenu
          count={intToString(totalEjecutives)}
          redirectTo={"director/ejecutivos"}
          title="Ejecutivos"
          icon={<ContactPhone />}
          isOpen={isOpenMenu}
        />

        <ItemMenu
          title="Herramientas"
          icon={
            showSubmenu === "showtools" ? (
              <KeyboardArrowUp className="tools" />
            ) : (
              <KeyboardArrowDown className="tools" placement="right-start" />
            )
          }
          handleClick={handleClickShowTools}
          isOpen={isOpenMenu}
        />

        <Collapse in={showSubmenu === "showtools"} className="subMenu">
          <SubItemMenu redirectTo={"herramientas/metas"} title="Metas" icon={<Star />} isOpen={isOpenMenu} />
          <SubItemMenu
            redirectTo={"herramientas/plantillasObservaciones"}
            title="Plantillas"
            icon={<FileCopy />}
            isOpen={isOpenMenu}
          />
          <SubItemMenu
            redirectTo={"herramientas/formatos"}
            title="Formatos"
            icon={<Description />}
            count={intToString(totalFormats)}
            isOpen={isOpenMenu}
          />
        </Collapse>

        <ItemMenu
          title="Catalogos"
          icon={
            showSubmenu === "showcatalogs" ? (
              <KeyboardArrowUp className="tools" />
            ) : (
              <KeyboardArrowDown className="tools" placement="right-start" />
            )
          }
          handleClick={handleClickShowCatalogs}
        />

        <Collapse in={showSubmenu === "showcatalogs"} className="subMenu">
          <SubItemMenu redirectTo={"catalogos/canales"} title="Canales" icon={<LibraryBooks />} isOpen={isOpenMenu} />
          <SubItemMenu redirectTo={"catalogos/categorias"} title="Categorías" icon={<Category />} isOpen={isOpenMenu} />
          <SubItemMenu
            redirectTo={"catalogos/cuentasporcobrar"}
            title="Cuentas por cobrar"
            icon={<AttachMoney />}
            isOpen={isOpenMenu}
          />
          <SubItemMenu redirectTo={"catalogos/empresas"} title="Empresas" icon={<Business />} isOpen={isOpenMenu} />
          <SubItemMenu
            redirectTo={"catalogos/especialidades"}
            title="Especialidades"
            icon={<LocalHospital />}
            isOpen={isOpenMenu}
          />
          {/* <SubItemMenu redirectTo={"catalogos/etiquetas"} title="Etiquetas" icon={<Label />} isOpen={isOpenMenu} /> */}
          <SubItemMenu redirectTo={"catalogos/fases"} title="Fases" icon={<LibraryBooks />} isOpen={isOpenMenu} />
          <SubItemMenu redirectTo={"catalogos/grupos"} title="Grupos" icon={<Group />} isOpen={isOpenMenu} />
          <SubItemMenu
            redirectTo={"catalogos/motivosdecierre"}
            title="Motivos de Cierre"
            icon={<Assignment />}
            isOpen={isOpenMenu}
          />
          <SubItemMenu redirectTo={"catalogos/origenes"} title="Orígenes" icon={<LibraryBooks />} isOpen={isOpenMenu} />
          <SubItemMenu
            redirectTo={"catalogos/productos"}
            title="Productos"
            icon={<LocalGroceryStore />}
            isOpen={isOpenMenu}
          />
          <SubItemMenu
            redirectTo={"catalogos/proveedores"}
            title="Proveedores"
            icon={<LibraryBooks />}
            isOpen={isOpenMenu}
          />
          <SubItemMenu redirectTo={"catalogos/razones"} title="Razones" icon={<LibraryBooks />} isOpen={isOpenMenu} />
          <SubItemMenu
            redirectTo={"catalogos/tiposclientes"}
            title="Tipos de Clientes"
            icon={<AssignmentInd />}
            isOpen={isOpenMenu}
          />
          <SubItemMenu redirectTo={"catalogos/usuarios"} title="Usuarios" icon={<People />} isOpen={isOpenMenu} />
        </Collapse>
      </div>
      <Box height={50} />
    </SiderBarDirectorStyled>
  );
}
