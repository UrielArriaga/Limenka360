import {
  Dashboard,
  PersonOutline,
  KeyboardArrowDown,
  KeyboardArrowUp,
  LocalShipping,
  ShoppingCart,
  RemoveShoppingCart,
  Check,
  AllInbox,
  AssignmentTurnedIn,
  Assessment,
  AddShoppingCart,
  PlaylistAddCheck,
  Ballot,
  Description,
  Input,
  ExitToApp,
  Store,
  SettingsInputHdmi,
} from "@material-ui/icons";
import React, { useState } from "react";
import styled from "styled-components";
import { colors } from "../../styles/global.styles";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";

export default function SiderBarDirLog() {
  const { userData } = useSelector(userSelector);

  const SubMenu = ({ title, route, subItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    return (
      <div>
        <div className={`item ${router.pathname === route && "item__highlight"} `} onClick={() => setIsOpen(!isOpen)}>
          <div className="item__icon">
            <div className="bg">{isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}</div>
          </div>
          <div className="item__text">
            <a>{title}</a>
          </div>
        </div>
        {isOpen && (
          <div className="subitems">
            {subItems.map((subItem, index) => (
              <div
                key={index}
                className={`subitem ${router.pathname === subItem.route && "subitem__highlight"}`}
                onClick={() => router.push(subItem.route)}
              >
                <div className="subitem__icon">{subItem.icon}</div>
                <div className="item__text">
                  <a>{subItem.title}</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
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
  const renderItemLogistics = () => {
    if (userData?.roleId == "administrador_logistica") {
      return (
        <div className="items">
          <ItemMenu title="Pedidos " icon={<AddShoppingCart />} route="/administracionlogistica" />
          <ItemMenu
            title="Pedidos Completos"
            icon={<AssignmentTurnedIn />}
            route="/administracionlogistica/pedidoscompletos"
          />
          <ItemMenu
            title="Pedidos Cancelados"
            icon={<RemoveShoppingCart />}
            route="/administracionlogistica/pedidoscancelados"
          />
          <ItemMenu title="Ordenes de Compra" icon={<AddShoppingCart />} route="/administracionlogistica/ordenes" />
          <ItemMenu title="Recolecciones" icon={<AllInbox />} route="/administracionlogistica/recolecciones" />
          <ItemMenu title="Inventario General" icon={<Assessment />} route="/administracionlogistica/inventario" />
          <ItemMenu
            title="Inventario por articulo"
            icon={<PlaylistAddCheck />}
            route="/administracionlogistica/inventarioindividual"
          />
          <ItemMenu title="Entradas" icon={<Input />} route="/administracionlogistica/entradas" />
          <ItemMenu title="Salidas" icon={<Input />} route="/administracionlogistica/salidas" />
          <ItemMenu title="Almacenes" icon={<Store />} route="/administracionlogistica/almacenes" />
          <ItemMenu title="Rutas" icon={<Store />} route="/administracionlogistica/rutas" />
          {/* <ItemMenu title="Reportes" /> */}
        </div>
      );
    } else {
      return (
        <div className="items">
          <ItemMenu title="Pedidos " icon={<AddShoppingCart />} route="/directorlogistica" />
          <ItemMenu
            title="Pedidos Completos"
            icon={<AssignmentTurnedIn />}
            route="/directorlogistica/pedidoscompletos"
          />
          <ItemMenu
            title="Pedidos Cancelados"
            icon={<RemoveShoppingCart />}
            route="/directorlogistica/pedidoscancelados"
          />
          <ItemMenu title="Ordenes de Compra" icon={<AddShoppingCart />} route="/directorlogistica/ordenes" />
          <ItemMenu title="Recolecciones" icon={<AllInbox />} route="/directorlogistica/recolecciones" />
          <ItemMenu title="Inventario General" icon={<Assessment />} route="/directorlogistica/inventario" />
          <ItemMenu
            title="Inventario por articulo"
            icon={<PlaylistAddCheck />}
            route="/directorlogistica/inventarioindividual"
          />

          <ItemMenu title="Inventario Biomedica" icon={<Ballot />} route="/directorlogistica/inventarioibiomedica" />

          <ItemMenu title="Entradas" icon={<Input />} route="/directorlogistica/entradas" />
          <ItemMenu title="Salidas" icon={<Input />} route="/directorlogistica/salidas" />
          <ItemMenu title="Almacenes" icon={<Store />} route="/directorlogistica/almacenes" />
          <ItemMenu title="Rutas" icon={<Store />} route="/directorlogistica/rutas" />
          <ItemMenu title="Devoluciones" icon={<Assessment />} route="/directorlogistica/devoluciones" />
          <ItemMenu title="Traspasos" icon={<Assessment />} route="/directorlogistica/traspasos" />
          {/* <ItemMenu title="Biomedica" icon={<SettingsInputHdmi />} route="/directorlogistica/biomedica" /> */}
         {/* <ItemMenu title="Demos" icon={<SettingsInputHdmi />} route="/directorlogistica/demos" />*/}

          <SubMenu
            title="Catalogos"
            subItems={[
              { title: "Choferes", icon: <PersonOutline />, route: "/directorlogistica/catalogos/drivers" },
              { title: "Unidades", icon: <LocalShipping />, route: "/directorlogistica/catalogos/units" },
            ]}
          />

          {/* <ItemMenu title="Reportes" /> */}
        </div>
      );
    }
  };

  return (
    <SiderBarDirLogStyled isOpen={true}>
      <div className="logo">
        <img src="/logowhite.png" alt="LOGO LIMENKA" />
        <p>{userData?.roleId == "administrador_logistica" ? "Admin Logistica" : "Logistica"} </p>
      </div>

      {renderItemLogistics()}
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
  .subitem {
    width: 100%;
    display: flex;
    padding: 2px 0px;
    -webkit-box-align: center;
    align-items: center;
    color: white;
    padding-left: 30px;
    .subitem__icon {
      margin-right: 8px;
    }
    :hover {
      cursor: pointer;
      background-color: #407aff;
    }
  }
`;
