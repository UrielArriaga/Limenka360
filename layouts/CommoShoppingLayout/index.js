import React, { useState } from "react";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
import {
  Add,
  Assignment,
  BookRounded,
  Category,
  ChromeReaderMode,
  Dashboard,
  Description,
  FiberSmartRecord,
  LibraryBooks,
  LocalAtm,
  MonetizationOn,
  NotificationImportant,
  People,
  PersonOutline,
  ShoppingBasket,
} from "@material-ui/icons";
import { Avatar, Badge } from "@material-ui/core";
import Notifications from "./Notifications";
import RecentActivities from "./RecentActivities";
import { useRouter } from "next/router";
import NavBar from "./NavBar";

export default function CommoShoppingLayout({ children, role = "default" }) {
  const [openRecentActivities, setOpenRecentActivities] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Layout isOpenActivies={openRecentActivities} isOpenSideBar={openSideBar}>
      <SiderBarDirLog role={role} />
      <div className="max-contentlayoutdirector">
        <NavBar role={role}/>

        {/* <div>
          {[...Array(115).keys()].map((item, index) => {
            return <div>xxx</div>;
          })}
        </div> */}
        {children}
      </div>

      {/* <Notifications /> */}
    </Layout>
  );
}

{
  /* <Layout sideBar={openMenuSide} activites={openRecentActivities}>
<SideBar />
<NavBarDashboard />
<div className="max-contentlayoutdirector">{children}</div>
<div className="max-contentlayoutdirectoractivities">
  <RecentActivityDirector />
</div>
</Layout> */
}

const getSizeMain = props => {
  switch (true) {
    case props.isOpenSideBar === true && props.isOpenActivies == true:
      return `
       width:calc(100% - 570px);
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == true:
      return `
      width:calc(100% - 370px);
        `;
    case props.isOpenSideBar === true && props.isOpenActivies == false:
      return `
      width:calc(100% - 250px);
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == false:
      return `
        width:calc(100% - 160px);
        `;
  }
};

const getSizeRecent = props => {
  switch (true) {
    case props.isOpenSideBar === true && props.isOpenActivies == true:
      return `
       width:300px;
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == true:
      return `
      width:300px;
        `;
    case props.isOpenSideBar === true && props.isOpenActivies == false:
      return `
      width:88px;
        `;
    case props.isOpenSideBar === false && props.isOpenActivies == false:
      return `
      width:88px;
      `;
  }
};

const Layout = styled.div`
  display: flex;
  height: 100vh;
  transition: all 2s ease;

  .max-contentlayoutdirector {
    /* width: 100%; */
    width: calc(100% - 200px);
    height: calc(100vh);
    /* margin: 60px 0; */
    overflow-y: auto;

    transition: all 0.1s ease-in;
    /* width: 30%; */

    .main {
      width: 100%;
    }
    /* @media ${device.md} {
      ${getSizeMain}
    } */
  }

  .max-contentlayoutdirectoractivities {
    max-height: 100vh;
    display: none;
    background-color: red;
    @media ${device.md} {
      display: block;
      ${getSizeRecent}
    }
  }
`;

// import { Dashboard, PersonOutline } from "@material-ui/icons";
// import React from "react";
// import styled from "styled-components";
// import { colors } from "../../styles/global.styles";
// import { useRouter } from "next/router";
function SiderBarDirLog({ role }) {
  const ItemMenu = ({ title = "Titulo Item", count = 0, icon = <PersonOutline />, route = "/" }) => {
    const router = useRouter();
    return (
      <div
        className={`item ${router.pathname === route && "item__higlight"} `}
        onClick={() => {
          console.log(router.pathname, route);
          router.push(route);
        }}
      >
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
  };

  const items = {
    administrador_de_almacen: [
      { title: "Inicio", icon: <Dashboard />, route: "/administracionalmacen" },
      { title: "Pedidos", icon: <Dashboard />, route: "/administracionalmacen/pedidos" },
      { title: "Inventario", icon: <Dashboard />, route: "/administracionalmacen/inventario" },
      { title: "Entradas", icon: <Dashboard />, route: "/administracionalmacen/entradas" },
      { title: "Salidas", icon: <Dashboard />, route: "/administracionalmacen/salidas" },
    ],
    encargadoentradas: [
      { title: "Inicio", icon: <Dashboard />, route: "/encargadoentradas" },
      { title: "Pedidos", icon: <Dashboard />, route: "/encargadoentradas/pedidos" },
      { title: "Inventario", icon: <Dashboard />, route: "/encargadoentradas/inventario" },
      { title: "Entradas", icon: <Dashboard />, route: "/encargadoentradas/entradas" },
    ],
    encargadosalidas: [
      { title: "Inicio", icon: <Dashboard />, route: "/encargadosalidas" },
      { title: "Pedidos", icon: <Dashboard />, route: "/encargadosalidas/pedidos" },
      { title: "Inventario", icon: <Dashboard />, route: "/encargadosalidas/inventario" },
      { title: "Salidas", icon: <Dashboard />, route: "/encargadosalidas/salidas" },
    ],
    jefedepiso: [
      { title: "Inicio", icon: <Dashboard />, route: "/jefedepiso" },
      { title: "Pedidos", icon: <Dashboard />, route: "/jefedepiso/pedidos" },
      { title: "Inventario", icon: <Dashboard />, route: "/jefedepiso/inventario" },
      { title: "Entradas", icon: <Dashboard />, route: "/jefedepiso/entradas" },
      { title: "Salidas", icon: <Dashboard />, route: "/jefedepiso/salidas" },
    ],
    areabiomedica: [
      { title: "Inicio", icon: <Dashboard />, route: "/areabiomedica" },
      { title: "Pedidos", icon: <Dashboard />, route: "/areabiomedica/pedidos" },
      { title: "Inventario", icon: <Dashboard />, route: "/areabiomedica/inventario" },
      { title: "Entradas", icon: <Dashboard />, route: "/areabiomedica/entradas" },
      { title: "Salidas", icon: <Dashboard />, route: "/areabiomedica/salidas" },
      { title: "Reparacion", icon: <Dashboard />, route: "/areabiomedica/salidas" },
      { title: "Garantías", icon: <Dashboard />, route: "/areabiomedica/garantias" },
    ],
     default: [
      // { title: "Inicio", icon: <Dashboard />, route: "/" },
      { title: "Dashboard", icon: <Dashboard />, route: "/comprasinternacional/dashboard" },
      { title: "Pedidos", icon: <Dashboard />, route: "/comprasinternacional" },
      { title: "Ordenes de Compra", icon: <BookRounded />, route: "/comprasinternacional/ordenes" },
      { title: "Pedidos Completados", icon: <Description />, route: "/comprasinternacional/pedidoscompletos" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/comprasinternacional/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/comprasinternacional/productos" },
      { title: "Categorias", icon: <Category />, route: "/comprasinternacional/categorias" },
      { title: "Presupuestos", icon: <LocalAtm />, route: "/comprasinternacional/presupuestos" },
    ],
    compras: [
      // { title: "Inicio", icon: <Dashboard />, route: "/" },
      { title: "Dashboard", icon: <Dashboard />, route: "/comprasv2/dashboard" },
      { title: "Pedidos", icon: <Dashboard />, route: "/comprasv2" },
      { title: "Ordenes de Compra", icon: <BookRounded />, route: "/comprasv2/ordenes" },
      { title: "Pedidos Completados", icon: <Description />, route: "/comprasv2/pedidoscompletos" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/comprasv2/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/comprasv2/productos" },
      { title: "Categorias", icon: <Category />, route: "/comprasv2/categorias" },
      { title: "Presupuestos", icon: <LocalAtm />, route: "/comprasv2/presupuestos" },
    ],
    director_compras: [
      // { title: "Inicio", icon: <Dashboard />, route: "/" },
      { title: "Dashboard", icon: <Dashboard />, route: "/directorcompras" },
      { title: "Pedidos", icon: <FiberSmartRecord />, route: "/directorcompras/pedidos" },
      { title: "Ordenes de Compra", icon: <BookRounded />, route: "/directorcompras/ordenes" },
      { title: "Bandeja de Ordenes", icon: <BookRounded />, route: "/directorcompras/bandeja" },
      { title: "Pedidos Completados", icon: <Description />, route: "/directorcompras/pedidoscompletos" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/directorcompras/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/directorcompras/productos" },
      { title: "Productos por numero de Serie", icon: <ChromeReaderMode />, route: "/directorcompras/productosnumeroserie" },
      { title: "Categorias", icon: <Category />, route: "/directorcompras/categorias" },
      { title: "Garantias", icon: <Category />, route: "/directorcompras/garantias" },
      { title: "Cuentas Por Cobrar", icon: <MonetizationOn />, route: "/directorcompras/pagos" },
      // { title: "Presupuestos", icon: <LocalAtm />, route: "/directorcompras/presupuestos" },
    ],
    gerente_compras: [
      { title: "Inicio", icon: <Dashboard />, route: "/gerentecompras" },
      { title: "Pedidos", icon: <Description />, route: "/gerentecompras/pedidos" },
      { title: "Ordenes de Compra", icon: <BookRounded />, route: "/gerentecompras/ordenes" },
      { title: "Pedidos Completados", icon: <Description />, route: "/gerentecompras/pedidoscompletos" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/gerentecompras/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/gerentecompras/productos" },
      { title: "Categorias", icon: <Category />, route: "/gerentecompras/categorias" },
      { title: "Presupuestos", icon: <LocalAtm />, route: "/gerentecompras/presupuestos" },
      { title: "Garantias", icon: <LocalAtm />, route: "/gerentecompras/garantias" },
      //{ title: "Cuentas Por Cobrar", icon: <MonetizationOn />, route: "/gerentecompras/pagos" },
    ],
    coordinador_compras: [
      { title: "Dashboard", icon: <Dashboard />, route: "/coordinadorcompras/dashboard" },
      { title: "Pedidos", icon: <Dashboard />, route: "/coordinadorcompras" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/coordinadorcompras/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/coordinadorcompras/productos" },
      // { title: "Ordenes de Compra", icon: <BookRounded />, route: "/coordinadorcompras/ordenes" },
      // { title: "Presupuestos", icon: <LocalAtm />, route: "/coordinadorcompras/presupuestos" },
    ],
    gestor_compras: [
      { title: "Dashboard", icon: <Dashboard />, route: "/gestorcompras/dashboard" },
      // { title: "Pedidos", icon: <Dashboard />, route: "/gestorcompras" },
      // { title: "Ordenes de Compra", icon: <BookRounded />, route: "/gestorcompras/ordenes" },
      // { title: "Pedidos Completados", icon: <Description />, route: "/gestorcompras/pedidoscompletos" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/gestorcompras/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/gestorcompras/productos" },
      // { title: "Categorias", icon: <Category />, route: "/gestorcompras/categorias" },
      // { title: "Presupuestos", icon: <LocalAtm />, route: "/gestorcompras/presupuestos" },
    ],
    gestor_de_compras_int: [
      { title: "Dashboard", icon: <Dashboard />, route: "/gestorcomprasint" },
      { title: "Ordenes de Compra", icon: <BookRounded />, route: "/gestorcomprasint/ordenes" },
      { title: "Garantias", icon: <ShoppingBasket />, route: "/gestorcomprasint/garantias" },

    ],
    responsable_compras: [
      { title: "Dashboard", icon: <Dashboard />, route: "/responsablecompras/dashboard" },
      { title: "Pedidos", icon: <Dashboard />, route: "/responsablecompras" },
      { title: "Proveedores", icon: <LibraryBooks />, route: "/responsablecompras/proveedores" },
      { title: "Productos", icon: <ShoppingBasket />, route: "/responsablecompras/productos" },
      // { title: "Ordenes de Compra", icon: <BookRounded />, route: "/responsablecompras/ordenes" },
      // { title: "Presupuestos", icon: <LocalAtm />, route: "/responsablecompras/presupuestos" },
    ],
  };

  return (
    <SiderBarDirLogStyled isOpen={true} role={role}>
      <div className="logo">
        <img src="/logowhite.png" alt="LOGO LIMENKA" />
        <p style={{ fontSize: "13px" }}>{role == "default" ? "Compras Internacionales" : role}</p>
      </div>

      <div className="items">
        {/* <ItemMenu title="Inicio" icon={<Dashboard />} route="/directorlogistica" /> */}

        {items[role].map((item, index) => {
          return <ItemMenu key={index} title={item.title} icon={item.icon} route={item.route} />;
        })}
        {/* <ItemMenu title="Pedidos" route="/jefedepiso/pedidos" />
        <ItemMenu title="Inventario" route="/jefedepiso/inventario" />
        <ItemMenu title="Entradas" route="/jefedepiso/entradas" />
        <ItemMenu title="Salidas" route="/jefedepiso/salidas" /> */}

        {/* 
        <ItemMenu title="Entradas" route="/directorlogistica/entradas" />
        <ItemMenu title="Salidas" route="/directorlogistica/salidas" />
        <ItemMenu title="Reportes" />
        <ItemMenu title="Ordenes de compra" /> */}
      </div>
    </SiderBarDirLogStyled>
  );
}

const SiderBarDirLogStyled = styled.div`
  width: 200px;
background-color: ${({ role }) => ["default"].includes(role) ? "#800F2F" : "#193364"};
  /* background-color:red; */

  .logo {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    margin-bottom: ${({ isOpen }) => (isOpen ? "30px" : "30px")};
    padding: ${({ isOpen }) => (isOpen ? "20px 0" : "40px 0")};

    img {
      width: 60%;
      height: auto;
    }

    p {
      color: white;
      font-size: 18px;
      margin-top: 2px;
    }
  }

  .item {
    :hover {
      cursor: pointer;
      background-color: ${({ role }) => ["default"].includes(role) ? "#c9184a" : `${colors.primaryColorDark}`};
    }
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0;
    flex-direction: ${({ isOpen }) => (isOpen ? "flex" : "column")};

    align-items: center;

    &__icon {
      text-align: center;
      width: ${({ isOpen }) => (isOpen ? "20%" : "100%")};

      .bg {
        padding: 8px;
        /* margin-right: 20px; */
        color: #e0e0e0;
      }
    }

    &__text {
      font-size: 13px;
      width: 72%;
      /* font-weight: 600; */
      /* color: #44cbe4; */
      display: ${({ isOpen }) => (isOpen ? "block" : "none")};

      color: #f5f5f5;
    }

    &__count {
      width: 20%;
      margin-right: 10px;
      display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
      justify-content: right;
      visibility: hidden;
      div {
        background-color: rgba(64, 123, 254, 255);
        padding: 0px 7px 0px 7px;
        border-radius: 4px;
        p {
          text-align: center;
          color: rgb(255, 255, 255, 1);
          font-weight: bold;
        }
      }

      &--disable {
        width: 10%;
        margin-right: 10px;
        visibility: hidden;
        div {
          background-color: rgba(220, 225, 246, 0.2);
          padding: 2px;
          border-radius: 10px;
          p {
            text-align: center;
            color: rgb(220, 225, 246, 0.8);
          }
        }
      }
    }
  }

  .item__higlight {
    cursor: pointer;
  background-color: ${({ role }) => ["default"].includes(role) ? "#c9184a" : `${colors.primaryColorDark}`};
  }
`;
