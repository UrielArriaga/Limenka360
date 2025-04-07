import React, { useState } from "react";
import styled from "styled-components";
import { colors, device } from "../../styles/global.styles";
import { AddShoppingCart, Assessment, Dashboard, FiberSmartRecordTwoTone, Input, PersonOutline, Settings, AccountBalance, LocalAtm } from "@material-ui/icons";
import { useRouter } from "next/router";
import NavBarLogistica from "../../components/NavBarLogistica";

export const rolesCommonLaoyut = {
  administrador_de_almacen: "administrador_de_almacen",
  encargadoentradas: "encargadoentradas",
  encargadosalidas: "encargadosalidas",
  jefedeflotilla: "jefedeflotilla",
  jefedepiso: "jefedepiso",
  areabiomedica: "areabiomedica",
  director_de_logistica: "director_de_logistica",
  administrador_logistica: "administrador_logistica",
  gerente_biomedico: "gerente_biomedico",
  administrador_biomedico: "administrador_biomedico",
};

export default function CommonLogLayout({ children, role }) {
  const [openRecentActivities, setOpenRecentActivities] = useState(false);
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <Layout isOpenActivies={openRecentActivities} isOpenSideBar={openSideBar}>
      <SiderBarDirLog role={role} />
      <div className="max-contentlayoutdirector">
        <NavBarLogistica role={role} />
        {children}
      </div>
    </Layout>
  );
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
          <div className={`bg ${title === "Salidas" ? "rotate" : ""}`}>{icon}</div>
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
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/administracionalmacen" },
      { title: "Pedidos Completos", icon: <AddShoppingCart />, route: "/administracionalmacen/pedidoscompletos" },
      { title: "Ordenes de Compra", icon: <Input />, route: "/administracionalmacen/ordenesdecompra" },
      { title: "Rutas", icon: <Input />, route: "/administracionalmacen/rutas" },
      { title: "Recolecciones", icon: <Input />, route: "/administracionalmacen/recolecciones" },
      { title: "Inventario", icon: <Assessment />, route: "/administracionalmacen/inventario" },
      { title: "Inventario Individual", icon: <Assessment />, route: "/administracionalmacen/inventarioindividual" },
      { title: "Traspasos", icon: <Input />, route: "/administracionalmacen/traspasos" },
      { title: "Devoluciones", icon: <Input />, route: "/administracionalmacen/devoluciones" },
      { title: "Entradas", icon: <Input />, route: "/administracionalmacen/entradas" },
      { title: "Salidas", icon: <Input />, route: "/administracionalmacen/salidas" },
    ],
    encargadoentradas: [
      // { title: "Inicio", icon: <Dashboard />, route: "/encargadoentradas" },
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/encargadoentradas/pedidos" },
      { title: "Pedidos Completos", icon: <Input />, route: "/encargadoentradas/pedidoscompletos" },
      { title: "Recolecciones", icon: <Input />, route: "/encargadoentradas/recolecciones" },
      { title: "Entradas", icon: <Input />, route: "/encargadoentradas/entradas" },
      { title: "Traspasos", icon: <Input />, route: "/encargadoentradas/traspasos" },
      { title: "Inventario", icon: <Assessment />, route: "/encargadoentradas/inventario" },
      { title: "Inventario Individual", icon: <Assessment />, route: "/encargadoentradas/inventarioindividual" },
      { title: "Devoluciones", icon: <Assessment />, route: "/encargadoentradas/devoluciones" },
    ],
    encargadosalidas: [
      // { title: "Inicio", icon: <Dashboard />, route: "/encargadosalidas" },
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/encargadosalidas/pedidos" },
      { title: "Pedidos Completados", icon: <AddShoppingCart />, route: "/encargadosalidas/pedidoscompletados" },
      { title: "Salidas", icon: <Input />, route: "/encargadosalidas/salidas" },
      { title: "Rutas", icon: <Assessment />, route: "/encargadosalidas/rutas" },
      { title: "Ordenes de compra", icon: <Input />, route: "/encargadosalidas/ordenes" },
      { title: "Recolecciones", icon: <Input />, route: "/encargadosalidas/recolecciones" },
      { title: "Traspasos", icon: <Input />, route: "/encargadosalidas/traspasos" },
      // { title: "Inventario", icon: <Assessment />, route: "/encargadosalidas/inventario" },
      // { title: "Inventario Individual", icon: <Assessment />, route: "/encargadosalidas/inventarioindividual" },
    ],
    jefedeflotilla: [
      { title: "Salidas", icon: <Input />, route: "/jefedeflotilla/salidas" },
      { title: "Rutas", icon: <Assessment />, route: "/jefedeflotilla/rutas" },
      { title: "Recolecciones", icon: <Input />, route: "/jefedeflotilla/recolecciones" },
      // { title: "Revisados", icon: <Input />, route: "/jefedeflotilla/revisados" },
    ],
    jefedepiso: [
      // { title: "Inicio", icon: <Dashboard />, route: "/jefedepiso" },
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/jefedepiso/pedidos" },
      { title: "Pedidos Completos", icon: <AddShoppingCart />, route: "/jefedepiso/pedidoscompletos" },
      { title: "Inventario", icon: <Assessment />, route: "/jefedepiso/inventario" },
      { title: "Entradas", icon: <Input />, route: "/jefedepiso/entradas" },
      { title: "Salidas", icon: <Input />, route: "/jefedepiso/salidas" },
    ],
    areabiomedica: [
      //{ title: "Dashboard", icon: <Dashboard />, route: "/biomedica" },
      //{ title: "Gerente", icon: <Dashboard />, route: "/biomedica/gerente" },
      //{ title: "Capacitaciones", icon: <AccountBalance />, route: "/biomedica/capacitaciones" },
      //{ title: "Instalaciones", icon: <AccountBalance />, route: "/biomedica/instalaciones" },
      { title: "Productos", icon: <FiberSmartRecordTwoTone />, route: "/biomedica/productos" },
      { title: "Entradas", icon: <Input />, route: "/biomedica/entradas" },
      { title: "Inventario", icon: <Assessment />, route: "/biomedica/inventario" },
      { title: "Reparacion", icon: <Settings />, route: "/biomedica/reparaciones" },
      { title: "Garantías", icon: <LocalAtm />, route: "/biomedica/garantias" },
    ],
    administrador_logistica: [
      { title: "Pedidos Nuevos", icon: <AddShoppingCart />, route: "/administracionlogistica/pedidosnuevos" },
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/administracionlogistica/pedidos" },
      { title: "Inventario", icon: <Assessment />, route: "/administracionlogistica/inventario" },
      { title: "Inventario Individual", icon: <Assessment />, route: "/administracionlogistica/inventarioindividual" },
    ],
    director_de_logistica: [
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/directorlogistica" },
      { title: "Pedidos Completos", icon: <AddShoppingCart />, route: "/directorlogistica/pedidoscompletos" },
      { title: "Pedidos Cancelados", icon: <AddShoppingCart />, route: "/directorlogistica/pedidoscancelados" },
      { title: "Ordenes de compra", icon: <Input />, route: "/directorlogistica/ordenes" },
      { title: "Recolecciones", icon: <Input />, route: "/directorlogistica/recolecciones" },
      { title: "Inventario General", icon: <Assessment />, route: "/directorlogistica/inventario" },
      { title: "Inventario por Articulo", icon: <Assessment />, route: "/directorlogistica/inventarioindividual" },
      { title: "Inventario Biomedica", icon: <Assessment />, route: "/directorlogistica/inventariobiomedica" },
      { title: "Entradas", icon: <Assessment />, route: "/directorlogistica/entradas" },
      { title: "Salidas", icon: <Assessment />, route: "/directorlogistica/salidas" },
      { title: "Almacenes", icon: <Assessment />, route: "/directorlogistica/almacenes" },
      { title: "Rutas", icon: <Assessment />, route: "/directorlogistica/rutas" },
      { title: "Devoluciones", icon: <Assessment />, route: "/directorlogistica/devoluciones" },
      { title: "Traspasos", icon: <Assessment />, route: "/directorlogistica/traspasos" },
      { title: "Demos", icon: <Input />, route: "/directorlogistica/demos" },
      { title: "Catalogos", icon: <Input />, route: "/directorlogistica/catalogos" },
      { title: "Choferes", icon: <Input />, route: "/directorlogistica/catalogos/drivers" },
      { title: "Unidades", icon: <Assessment />, route: "/directorlogistica/catalogos/units" },
    ],
    administrador_logistica: [
      { title: "Pedidos", icon: <AddShoppingCart />, route: "/administracionlogistica" },
      { title: "Pedidos Completos", icon: <AddShoppingCart />, route: "/administracionlogistica/pedidoscompletos" },
      { title: "Pedidos Cancelados", icon: <AddShoppingCart />, route: "/administracionlogistica/pedidoscancelados" },
      { title: "Ordenes de compra", icon: <Input />, route: "/administracionlogistica/ordenes" },
      { title: "Recolecciones", icon: <Input />, route: "/administracionlogistica/recolecciones" },
      { title: "Inventario General", icon: <Assessment />, route: "/administracionlogistica/inventario" },
      { title: "Inventario por Articulo", icon: <Assessment />, route: "/administracionlogistica/inventarioindividual"},
      { title: "Entradas", icon: <Assessment />, route: "/administracionlogistica/entradas" },
      { title: "Salidas", icon: <Assessment />, route: "/administracionlogistica/salidas" },
      { title: "Almacenes", icon: <Assessment />, route: "/administracionlogistica/almacenes" },
      { title: "Rutas", icon: <Assessment />, route: "/administracionlogistica/rutas" },
      { title: "Traspasos", icon: <Assessment />, route: "/administracionlogistica/traspasos" },
    ],
    master_almacen: [
      { title: "Pedidos Nuevos", icon: <AddShoppingCart />, route: "/almacenesforaneos" },
      { title: "Pedidos en proceso", icon: <AddShoppingCart />, route: "/almacenesforaneos/pedidosenproceso" },
      { title: "Pedidos Completos", icon: <AddShoppingCart />, route: "/almacenesforaneos/pedidoscompletados" },
      { title: "Salidas", icon: <Assessment />, route: "/almacenesforaneos/salidas" },
      { title: "Rutas", icon: <Assessment />, route: "/almacenesforaneos/rutas" },
      { title: "Entradas", icon: <Assessment />, route: "/almacenesforaneos/entradas" },
      { title: "Traspasos", icon: <Assessment />, route: "/almacenesforaneos/traspasos" },
      { title: "Devoluciones", icon: <Assessment />, route: "/almacenesforaneos/devoluciones" },
      { title: "Inventario por Articulo", icon: <Assessment />, route: "/almacenesforaneos/inventarioindividual" },
    ],
    gerente_biomedico:[
      { title: "Dashboard", icon: <Dashboard />, route: "/gerentebiomedica" },
      { title: "Capacitaciones", icon: <AccountBalance />, route: "/gerentebiomedica/capacitaciones" },
      { title: "Instalaciones", icon: <AccountBalance />, route: "/gerentebiomedica/instalaciones" },
      { title: "Productos", icon: <FiberSmartRecordTwoTone />, route: "/gerentebiomedica/productos" },
      { title: "Entradas", icon: <Input />, route: "/gerentebiomedica/entradas" },
      { title: "Inventario", icon: <Assessment />, route: "/gerentebiomedica/inventario" },
      { title: "Reparacion", icon: <Settings />, route: "/gerentebiomedica/reparaciones" },
      { title: "Garantías", icon: <LocalAtm />, route: "/gerentebiomedica/garantias" },

    ],
    administrador_biomedico:[
      { title: "Dashboard", icon: <Dashboard />, route: "/administradorbiomedica" },
      { title: "Capacitaciones", icon: <AccountBalance />, route: "/administradorbiomedica/capacitaciones" },
      { title: "Instalaciones", icon: <AccountBalance />, route: "/administradorbiomedica/instalaciones" },
      { title: "Productos", icon: <FiberSmartRecordTwoTone />, route: "/administradorbiomedica/productos" },
      { title: "Entradas", icon: <Input />, route: "/administradorbiomedica/entradas" },
      { title: "Inventario", icon: <Assessment />, route: "/administradorbiomedica/inventario" },
      { title: "Reparacion", icon: <Settings />, route: "/administradorbiomedica/reparaciones" },
      { title: "Garantías", icon: <LocalAtm />, route: "/administradorbiomedica/garantias" },

    ],
  };

  return (
    <SiderBarDirLogStyled isOpen={true}>
      <div className="logo">
        <img src="/logowhite.png" alt="LOGO LIMENKA" />
        <p style={{ fontSize: "14px" }}>{role}</p>
      </div>

      <div className="items">
        {items[role]?.map((item, index) => {
          return <ItemMenu key={index} title={item.title} icon={item.icon} route={item.route} />;
        })}
      </div>
    </SiderBarDirLogStyled>
  );
}

const SiderBarDirLogStyled = styled.div`
  width: 200px;
  background-color: #034d6f;

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
      background-color: ${colors.primaryColorDark};
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
      .rotate {
        display: inline-block;
        transform: rotate(180deg);
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
    background-color: ${colors.primaryColorDark};
  }
`;
