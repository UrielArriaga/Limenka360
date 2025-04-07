import {
  AcUnit,
  AccountBalanceWallet,
  Assessment,
  Business,
  BusinessOutlined,
  Cloud,
  Dashboard,
  DashboardOutlined,
  Group,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LibraryBooks,
  Menu,
  MonetizationOn,
  Money,
  Person,
  PersonOutline,
  Settings,
  Star,
  StarBorder,
} from "@material-ui/icons";
import { Collapse, IconButton, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import React, { useState } from "react";
import styled from "styled-components";
import { dashboardSelectos } from "../../redux/slices/dashboardSlice";
import { dialogSelector, openMenu } from "../../redux/slices/dialogSlice";
import { colors } from "../../styles/global.styles";
import { SiderBarStyled } from "./styles";
import { abbreviationNumber } from "../../utils";

export default function SideBarManager({ open, setOpen }) {
  // const [open, setOpen] = useState(true);

  const dispatch = useDispatch();
  const { openMenuSide, imports: showDialog } = useSelector(dialogSelector);
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();

  const { totalProspects, totalOportunities, totalSales, totalClients, totalPayments } = useSelector(dashboardSelectos);

  const returClsActive = routes => {
    if (routes.includes(router.pathname)) return "ctr_side__items__item--active";
    return "ctr_side__items__item";
  };
  // const returClsActive = (route) => (router.pathname === route ? "ctr_side__items__item--active" : "ctr_side__items__item");

  return (
    <SiderBarStyled
      isOpen={openMenuSide}
      //  onMouseEnter={() => setOpenThis(!open)}
      //   onMouseLeave={() => setOpenThis(false)}
    >
      <div className="ctr_side">
        <div className="ctr_side__logo">
          <div className="ctr_side__logo__name">
            <picture>
              <img src="/LOGOLIMENKA360_COLOR-02.PNG" alt="logo"></img>
            </picture>
          </div>

          <div className="ctr_side__logo__hamburger">
            <Menu onClick={() => dispatch(openMenu(!openMenuSide))} />
          </div>
        </div>
        <div className="ctr_side__items">
          <Link href={"/gerente"}>
            <div className={returClsActive("/gerente")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg dashboard">
                  <DashboardOutlined />
                </div>
              </div>
              <div className="ctr_side__items__item__text dashboard">
                <p>Dashboard</p>
              </div>
              <div className="ctr_side__items__item__count--disable">
                <div>
                  <p></p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/prospectos"}>
            <div className={returClsActive("/prospectos/[prospecto]")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg prospects">
                  <PersonOutline />
                </div>
              </div>
              <div className="ctr_side__items__item__text prospects">
                <Link href={{ pathname: "/prospectos" }}>
                  <p>Propectos</p>
                </Link>
              </div>
              <div className="ctr_side__items__item__count bg-prospects">
                <div>
                  <Tooltip title={totalProspects} placement="right-start">
                    <p>{abbreviationNumber(totalProspects)}</p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link>

          <Link href={"/oportunidades"}>
            <div className={returClsActive("/oportunidades/[prospecto]")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg oportunities">
                  <StarBorder />
                </div>
              </div>
              <div className="ctr_side__items__item__text oportunities">
                <Link href={{ pathname: "/oportunidades" }}>
                  <p>Oportunidades</p>
                </Link>
              </div>

              <div className="ctr_side__items__item__count bg-oportunities">
                <div>
                  <Tooltip title={totalOportunities} placement="right-start">
                    <p>{abbreviationNumber(totalOportunities)}</p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link>
          {/* <Link href={"/ventas"}>
            <div className={returClsActive(["/ventas"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg sales">
                  <MonetizationOn />
                </div>
              </div>
              <div className="ctr_side__items__item__text sales">
                <p>Clientes</p>
              </div>
              <div className="ctr_side__items__item__count bg-sales">
                <div>
                  <p>{totalSells}</p>
                </div>
              </div>
            </div>
          </Link> */}

          <Link href={"/clientes"}>
            <div
              className={returClsActive("/clientes/[prospecto]")}
              // className={returClsActive(["/cliente", "/clientes"])}
            >
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg clients">
                  <BusinessOutlined />
                </div>
              </div>
              <div className="ctr_side__items__item__text clients">
                <p>Clientes</p>
              </div>
              <div className="ctr_side__items__item__count bg-clients">
                <div>
                  <Tooltip title={totalClients} placement="right-start">
                    <p>{abbreviationNumber(totalClients)}</p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link>

          <Link href={"/ventas"}>
            <div className={returClsActive(["/ventas"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg sales">
                  <AccountBalanceWallet />
                </div>
              </div>
              <div className="ctr_side__items__item__text sales">
                <p>Ventas</p>
              </div>
              <div className="ctr_side__items__item__count bg-sales">
                <div>
                  <Tooltip title={totalSales} placement="right-start">
                    <p>{abbreviationNumber(totalSales)}</p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link>

          <Link href={"/pagos"}>
            <div className={returClsActive(["/pagos"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg payments">
                  <MonetizationOn />
                </div>
              </div>
              <div className="ctr_side__items__item__text payments">
                <p>Cuentas Por Cobrar</p>
              </div>
              <div className="ctr_side__items__item__count bg-payments">
                <div>
                  <Tooltip title={totalPayments} placement="right-start">
                    <p>{abbreviationNumber(totalPayments)}</p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link>

          <Link href={"/ejecutivos"}>
            <div className={returClsActive(["/ejecutivos"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg executives">
                  <Group />
                </div>
              </div>
              <div className="ctr_side__items__item__text executives">
                <p>Mis Ejecutivos</p>
              </div>
              {/* <div className="ctr_side__items__item__count bg-executives">
                <div>
                  <p>{totalPayments}</p>
                </div>
              </div> */}
            </div>
          </Link>
        </div>

        <div className="divider">
          <div className="line"></div>
        </div>

        <div className="ctr_side__items">
          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg tools">
                <Assessment />
              </div>
            </div>
            <Link href={{ pathname: "/reportes" }}>
              <div className="ctr_side__items__item__text tools">
                <p>Reportes</p>
              </div>
            </Link>
          </div>
          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg tools">
                <LibraryBooks />
              </div>
            </div>
            <div
              className="ctr_side__items__item__text tools"
              onClick={() => {
                setShowCatalogs(!showCatalogs);
              }}
            >
              <p>Catalogos</p>
            </div>
            <p style={{ color: "white" }}>{showCatalogs ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</p>
          </div>
          <Collapse in={showCatalogs} className="subMenu">
            <Link href={{ pathname: "/catalogos/grupos" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Grupos</p>
              </div>
            </Link>
            <Link href={{ pathname: "/catalogos/empresas" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Empresas</p>
              </div>
            </Link>
            <Link href={{ pathname: "/catalogos/fases" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Fases</p>
              </div>
            </Link>
            <Link href={{ pathname: "/catalogos/etiquetas" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Etiquetas</p>
              </div>
            </Link>
          </Collapse>
          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg tools">
                <Settings />
              </div>
            </div>
            <div
              className="ctr_side__items__item__text tools"
              onClick={() => {
                setShowTools(!showTools);
              }}
            >
              <p>Herramientas</p>
            </div>
            <p style={{ color: "white" }}>{showTools ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</p>
          </div>
          <Collapse in={showTools} className="subMenu">
            <Link href={{ pathname: "/herramientas/metas" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Metas</p>
              </div>
            </Link>

            <Link href={{ pathname: "/herramientas/importacion" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Importación</p>
              </div>
            </Link>

            <Link href={{ pathname: "/herramientas/plantillas" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Plantillas</p>
              </div>
            </Link>
          </Collapse>
        </div>
      </div>
    </SiderBarStyled>
  );
}
