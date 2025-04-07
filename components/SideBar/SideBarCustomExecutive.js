import {
  AcUnit,
  Assessment,
  Assignment,
  Business,
  BusinessOutlined,
  Cloud,
  Dashboard,
  DashboardOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LibraryBooks,
  Menu,
  MonetizationOn,
  Person,
  PersonOutline,
  Settings,
  Star,
  StarBorder,
} from "@material-ui/icons";
import { Button, Collapse, IconButton, Tooltip } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useSelector } from "react-redux";
import { colors } from "../../styles/global.styles";
import { SiderBarStyled } from "./styles";
import { dashboardSelectos } from "../../redux/slices/dashboardSlice";
import { dashboardViewExecutiveSelector } from "../../redux/slices/dashboardViewExecutiveSlice";
import { abbreviationNumber } from "../../utils";

export default function SideBarCustomExecutive({ open, setOpen }) {
  const showDialog = useSelector(state => state.dialog.imports);
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [showReport, setshowReport] = useState(false);

  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();
  const { totalProspects, totalOportunities, totalSells, totalClients, totalPayments, totalOrdersEjecutive } =
    useSelector(dashboardViewExecutiveSelector);

  const { userDataExecutive } = useSelector(dashboardViewExecutiveSelector);
  const returClsActive = routes => {
    if (routes.includes(router.pathname)) return "ctr_side__items__item--active";
    return "ctr_side__items__item";
  };

  return (
    <SiderBarStyled isOpen={openThis} onMouseEnter={() => setOpenThis(!open)} onMouseLeave={() => setOpenThis(false)}>
      <div className="ctr_side">
        <div className="ctr_side__logo">
          <div className="ctr_side__logo__name">
            <AcUnit />
            <p>LIMENKA 360</p>
          </div>

          <div className="ctr_side__logo__hamburger">
            <Menu />
          </div>
        </div>
        {userDataExecutive !== null && (
          <div style={{ paddingLeft: 10 }}>
            <p style={{ color: "#fff" }}>Ejecutivo: {userDataExecutive.fullname}</p>
          </div>
        )}
        <div className="ctr_side__items">
          <Link href={"/vistaejecutivo"}>
            <div className={returClsActive("/vistaejecutivo")}>
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
          <Link
            href={{
              pathname: "/vistaejecutivo/prospectos",
              query: {
                id: router.query.id,
                cve: "0111",
              },
            }}
          >
            <div className={returClsActive("/prospectos/[prospecto]")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg prospects">
                  <PersonOutline />
                </div>
              </div>
              <div className="ctr_side__items__item__text prospects">
                <Link
                  href={{
                    pathname: "/vistaejecutivo/prospectos",
                    query: {
                      id: router.query.id,
                      cve: "0111",
                    },
                  }}
                >
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
          <Link
            href={{
              pathname: "/vistaejecutivo/oportunidades",
              query: {
                id: router.query.id,
                cve: "0111",
              },
            }}
          >
            <div className={returClsActive("/oportunidades/[prospecto]")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg oportunities">
                  <StarBorder />
                </div>
              </div>
              <div className="ctr_side__items__item__text oportunities">
                <Link
                  href={{
                    pathname: "/vistaejecutivo/oportunidades",
                    query: {
                      id: router.query.id,
                      cve: "0111",
                    },
                  }}
                >
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

          <Link
            href={{
              pathname: "/vistaejecutivo/clientes",
              query: {
                id: router.query.id,
                cve: "0111",
              },
            }}
          >
            <div className={returClsActive("/clientes/[prospecto]")}>
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

          {/* <Link href={"/pagos"}>
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
          <Link href={"/pedidos"}>
            <div className={returClsActive(["/pedidos"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg orders">
                  <Assignment />
                </div>
              </div>
              <div className="ctr_side__items__item__text orders">
                <p>Pedidos</p>
              </div>
              <div className="ctr_side__items__item__count bg-orders">
                <div>
                  <Tooltip title={totalOrdersEjecutive} placement="right-start">
                    <p>{abbreviationNumber(totalOrdersEjecutive)}</p>
                  </Tooltip>
                </div>
              </div>
            </div>
          </Link> */}
        </div>
        <div className="divider">
          <div className="line"></div>
        </div>

        <div className="exit" style={{ padding: 20 }}>
          <Link href={"/gerente"}>
            <Button color="primary" variant="contained" style={{ color: "#fff" }}>
              Salir de dashboard
            </Button>
          </Link>
        </div>
        {/* <div className="ctr_side__items">
          <div className="ctr_side__items__item">
            <div className="ctr_side__items__item__icon">
              <div className="ctr_side__items__item__icon__bg tools">
                <BusinessOutlined />
              </div>
            </div>
            <Link href={{ pathname: "/catalogos/empresas" }}>
              <div className="ctr_side__items__item__text tools">
                <p>Empresas</p>
              </div>
            </Link>
          </div>
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
            <p style={{ color: "white" }}>
              {showTools ? <KeyboardArrowUp className="tools" /> : <KeyboardArrowDown className="tools" />}
            </p>
          </div>
          <Collapse in={showTools} className="subMenu">
            <Link href={{ pathname: "/herramientas/plantillas" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Plantillas Whats App</p>
              </div>
            </Link>

            <Link href={{ pathname: "/herramientas/plantillasObservaciones" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Plantillas Observaciones</p>
              </div>
            </Link>
          </Collapse>
        </div> */}
      </div>
    </SiderBarStyled>
  );
}
