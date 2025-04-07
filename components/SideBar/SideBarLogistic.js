import {
  AcUnit,
  Assessment,
  Assignment,
  BusinessOutlined,
  DashboardOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LibraryBooks,
  Menu,
  PersonOutline,
  Settings,
  ShoppingBasket,
  StarBorder,
} from "@material-ui/icons";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  dashboardSelectos,
  getCountOrders,
  getCountOrdersAllStatus,
  getCountShippings,
  getCountActivities,
} from "../../redux/slices/dashboardSlice";
import { SiderBarStyled } from "./styles";
import { Collapse, Tooltip } from "@material-ui/core";
import { abbreviationNumber } from "../../utils";

export default function SideBarLogistic({ open, setOpen }) {
  const showDialog = useSelector(state => state.dialog.imports);
  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const dispatch = useDispatch();
  const { totalOrdersAllStatus, totalShipping } = useSelector(dashboardSelectos);
  const returClsActive = routes => {
    if (routes.includes(router.pathname)) return "ctr_side__items__item--active";
    return "ctr_side__items__item";
  };

  useEffect(() => {
    dispatch(getCountOrdersAllStatus());
    dispatch(getCountShippings());
  }, []);

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
          {/* <Link href={"/logistica"}>
            <div className={returClsActive("/logistica")}>
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
          </Link> */}

          <Link href={"/logistica/pedidos"}>
            <div className={returClsActive(["/logistica/pedidos"])}>
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
                  <p>{totalOrdersAllStatus}</p>
                </div>
              </div>
            </div>
          </Link>
          {/* <Link href={"/logistica/envios"}>
            <div className={returClsActive(["/logistica/envios"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg products">
                  <Assignment />
                </div>
              </div>
              <div className="ctr_side__items__item__text products">
                <p>Envios</p>
              </div>
              <div className="ctr_side__items__item__count bg-products">
                <div>
                  <p>{totalShipping}</p>
                </div>
              </div>
            </div>
          </Link> */}
          {/* <Link href={""}>
            <div className={returClsActive([""])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg products">
                  <ShoppingBasket />
                </div>
              </div>
              <div className="ctr_side__items__item__text products">
                <p>Productos</p>
              </div>
              <div className="ctr_side__items__item__count bg-products">
                <div>
                  <p>0</p>
                </div>
              </div>
            </div>
          </Link> */}
        </div>
      </div>
    </SiderBarStyled>
  );
}
