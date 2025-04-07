import React from "react";
import { ExecutivesStyled } from "./styles";
import { AccountCircle, CalendarTodaySharp, Dashboard, StoreMallDirectory } from "@material-ui/icons";
import { Avatar, IconButton } from "@material-ui/core";

export default function ExecutivesLayoutTopNav({ children }) {
  return (
    <ExecutivesStyled>
      <div className="navbar">
        <div className="logo">
          <img src="https://limenka.sfo3.digitaloceanspaces.com/common/limenkalogolargewhite.png" alt="logo" />
        </div>

        <div className="navbar-wrapper">
          <div className="pages">
            <div className="pages__item">
              <Dashboard className="icon" />
              <p>Dashboard</p>
            </div>

            <div className="pages__item">
              <Dashboard className="icon" />
              <p>Prospectos</p>
            </div>

            <div className="pages__item">
              <Dashboard className="icon" />
              <p>Oportunidades</p>
            </div>

            <div className="pages__item submenu-container">
              <Dashboard className="icon" />
              <p>Clientes</p>
            </div>

            <div className="pages__item">
              <Dashboard className="icon" />
              <p>Cuentas</p>
            </div>

            <div className="pages__item">
              <Dashboard className="icon" />
              <p>Pedidos</p>
            </div>

            <div className="pages__item submenu-container">
              <Dashboard className="icon" />
              <p>Herramientas</p>
              <div className="submenu">
                <div className="submenu__item">Cuenta 1</div>
                <div className="submenu__item">Cuenta 2</div>
                <div className="submenu__item">Cuenta 3</div>
              </div>
            </div>
          </div>
        </div>

        <div className="account">
          <IconButton>
            <CalendarTodaySharp />
          </IconButton>

          <IconButton>
            <StoreMallDirectory />
          </IconButton>
          <Avatar className="account-avatar" />
          <div className="account-fullname">
            <p>Nombre Apellido</p>
            <p>Gerente de Ventas</p>
          </div>
        </div>
      </div>

      {/* <div className="goalsprogress">
      </div> */}

      <div className="main">{children}</div>
    </ExecutivesStyled>
  );
}
