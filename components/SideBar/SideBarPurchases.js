import {
  AcUnit,
  Assignment,
  Category,
  DashboardOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LibraryBooks,
  Menu,
  Settings,
  ShoppingBasket,
} from "@material-ui/icons";
import { Collapse, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../styles/global.styles";
import {
  dashboardSelectos,
  getCountCategories,
  getCountOrders,
  getCountOrdersAllStatus,
  getCountProviders,
  getCountShippings,
} from "../../redux/slices/dashboardSlice";
import { SiderBarStyled } from "./styles";
import { commonSelector, getProductsCommon } from "../../redux/slices/commonSlice";

export default function SideBarPurchases({ open, setOpen }) {
  const showDialog = useSelector(state => state.dialog.imports);
  const [showCatalogs, setShowCatalogs] = useState(false);
  const [showTools, setShowTools] = useState(false);
  const [openThis, setOpenThis] = useState(open);
  const router = useRouter();
  const dispatch = useDispatch();
  const { products } = useSelector(commonSelector);
  const { totalOrdersAllStatus, totalCategories, totalProviders, totalProducts, totalShipping } =
    useSelector(dashboardSelectos);
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
    let paramsProducts = {
      count: 1,
      all: 1,
      include: "category,brand,provider",
      join: "category,bra,pro",
      where: {},
    };
    dispatch(getCountOrdersAllStatus());
    dispatch(getCountCategories());
    dispatch(getCountProviders());
    dispatch(getProductsCommon({ params: paramsProducts }));
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
          <Link href={"/compras/pedidos"}>
            <div className={returClsActive(["/compras/pedidos"])}>
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

          <Link href={"/catalogos/productos"}>
            <div className={returClsActive(["/catalogos/productos"])}>
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
                  <p>{products?.count}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/catalogos/proveedores"}>
            <div className={returClsActive(["/catalogos/proveedores"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg providers">
                  <LibraryBooks />
                </div>
              </div>
              <div className="ctr_side__items__item__text providers">
                <p>Proveedores</p>
              </div>
              <div className="ctr_side__items__item__count bg-providers">
                <div>
                  <p>{totalProviders}</p>
                </div>
              </div>
            </div>
          </Link>
          <Link href={"/catalogos/categorias"}>
            <div className={returClsActive(["/catalogos/categorias"])}>
              <div className="ctr_side__items__item__icon">
                <div className="ctr_side__items__item__icon__bg categories">
                  <Category />
                </div>
              </div>
              <div className="ctr_side__items__item__text categories">
                <p>Categorías</p>
              </div>
              <div className="ctr_side__items__item__count bg-categories">
                <div>
                  <p>{totalCategories}</p>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </SiderBarStyled>
  );
}
