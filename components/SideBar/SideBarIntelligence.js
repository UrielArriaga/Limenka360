import {
  AcUnit,
  Assessment,
  Assignment,
  Business,
  BusinessOutlined,
  Cloud,
  Dashboard,
  DashboardOutlined,
  GroupOutlined,
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
import { Collapse, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { dashboardSelectos, getCountProspect } from "../../redux/slices/dashboardSlice";
import { SiderBarStyled } from "./styles";
import { groupsSelector } from "../../redux/slices/groups";
import { userSelector } from "../../redux/slices/userSlice";
import { commonSelector, getGroupsCommon } from "../../redux/slices/commonSlice";
export default function SideBarIntelligence({ open, setOpen }) {
  const dispatch = useDispatch();
  const { totalProspects } = useSelector(dashboardSelectos);
  const { groups } = useSelector(commonSelector);
  const [showTools, setShowTools] = useState(false);
  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();

  const returClsActive = routes => {
    if (routes.includes(router.pathname)) return "ctr_side__items__item--active";
    return "ctr_side__items__item";
  };

  const validateActiveLink = route => {
    if (router.pathname === route) {
      return true;
    }
  };

  return (
    <SiderBarStyled isOpen={openThis} onMouseEnter={() => setOpenThis(!open)} onMouseLeave={() => setOpenThis(false)}>
      <div className="ctr_side">
        <div className="ctr_side__logo">
          <div className="ctr_side__logo__name">
            <picture>
              <img src="/LOGOLIMENKA360_COLOR-02.PNG" alt="logo"></img>
            </picture>
          </div>

          <div className="ctr_side__logo__hamburger">
            <Menu />
          </div>
        </div>
        <div className="ctr_side__items">
          <Link href={"/inteligenciacomercial/prospectos"}>
            <div className={returClsActive(["/inteligenciacomercial", "/inteligenciacomercial/prospectos"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg clients">
                  <PersonOutline />
                </div>
              </div>
              <div className="ctr_side__items__item__text clients">
                <p>Prospectos</p>
              </div>
              <div className="ctr_side__items__item__count bg-clients">
                <div>
                  <p>{totalProspects}</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href={"/inteligenciacomercial/grupos"}>
            <div className={returClsActive("/inteligenciacomercial/grupos")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg oportunities">
                  <GroupOutlined />
                </div>
              </div>
              <div className="ctr_side__items__item__text oportunities">
                <Link href={{ pathname: "/inteligenciacomercial/grupos" }}>
                  <p>Grupos</p>
                </Link>
              </div>

              <div className="ctr_side__items__item__count bg-oportunities">
                <div>
                  <p>{groups?.count}</p>
                </div>
              </div>
            </div>
          </Link>

          <Link href={"/inteligenciacomercial/reportes"}>
            <div className={returClsActive("/inteligenciacomercial/reportes")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg reports">
                  <Assignment />
                </div>
              </div>
              <div className="ctr_side__items__item__text reports">
                <Link href={{ pathname: "/inteligenciacomercial/reportes" }}>
                  <p>Reportes</p>
                </Link>
              </div>
              <div className="ctr_side__items__item__count bg-oportunities">
                <div>
                  <p></p>
                </div>
              </div>
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
            <Link href={{ pathname: "/herramientas/importacion" }}>
              <div className="subOption">
                <LibraryBooks className="subIcon tools" />
                <p className="subTitle tools">Importación</p>
              </div>
            </Link>
          </Collapse>
        </div>
      </div>
    </SiderBarStyled>
  );
}
