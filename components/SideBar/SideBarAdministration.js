import { AcUnit, Assignment, DashboardOutlined, Menu } from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../styles/global.styles";
import { dashboardSelectos, getCountOrders } from "../../redux/slices/dashboardSlice";
import { SiderBarStyled } from "./styles";

export default function SideBarAdministration({ open, setOpen }) {
  const showDialog = useSelector(state => state.dialog.imports);
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
          <Link href={"/administracion"}>
            <div className={returClsActive("/administracion")}>
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

          <Link href={"/administracion/pedidos"}>
            <div className={returClsActive(["/administracion/pedidos"])}>
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
                  <p>{totalOrders}</p>
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
