import {
  AcUnit,
  Assignment,
  BusinessOutlined,
  DashboardOutlined,
  Menu,
  PersonOutline,
  StarBorder,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../styles/global.styles";
import { dashboardSelectos, getCountOrders, getCountProspect } from "../../redux/slices/dashboardSlice";
import { SiderBarStyled } from "./styles";
import { Tooltip } from "@material-ui/core";
import { abbreviationNumber } from "../../utils";

export default function SideBarLogistic({ open, setOpen }) {
  const showDialog = useSelector(state => state.dialog.imports);
  const { totalProspects, totalOportunities, totalSells, totalClients, totalPayments } = useSelector(dashboardSelectos);
  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();
  const dispatch = useDispatch();
  const { totalOrders } = useSelector(dashboardSelectos);
  const returClsActive = routes => {
    if (routes.includes(router.pathname)) return "ctr_side__items__item--active";
    return "ctr_side__items__item";
  };

  const validateActiveLink = route => {
    if (router.pathname === route) {
      return true;
    }
  };

  useEffect(() => {
    dispatch(getCountOrders());
  }, []);

  return (
    <SiderBarStyled isOpen={openThis} onMouseEnter={() => setOpenThis(!open)} onMouseLeave={() => setOpenThis(false)}>
      <div className="ctr_side">
        <div className="ctr_side__logo">
          <div className="ctr_side__logo__name">
            <AcUnit />
            <p>ADDANA</p>
          </div>

          <div className="ctr_side__logo__hamburger">
            <Menu />
          </div>
        </div>
        <div className="ctr_side__items">
          <Link href={"/administracionventas/prospectos"}>
            <div className={returClsActive("/administracionventas/prospectos")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg prospects">
                  <PersonOutline />
                </div>
              </div>
              <div className="ctr_side__items__item__text prospects">
                <Link href={{ pathname: "/administracionventas/prospectos" }}>
                  <p>Prospectos</p>
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

          <Link href={"/administracionventas/oportunidades"}>
            <div className={returClsActive("/administracionventas/oportunidades")}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg oportunities">
                  <StarBorder />
                </div>
              </div>
              <div className="ctr_side__items__item__text oportunities">
                <Link href={{ pathname: "/administracionventas/oportunidades" }}>
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

          <Link href={"/administracionventas/clientes"}>
            <div className={returClsActive("/administracionventas/clientes")}>
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
        </div>

        <div className="divider">
          <div className="line"></div>
        </div>
      </div>
    </SiderBarStyled>
  );
}
