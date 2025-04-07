import { Button } from "@material-ui/core";
import { ArrowForwardIos, Assignment, Home } from "@material-ui/icons";
import React from "react";

export default function NavBarRoutes() {
  return (
    <div className="navbarroutes">
      <div className="routes">
        <div className="itemroute">
          <Assignment className="itemrouteIcon" />
          <p>Pedidos</p>
        </div>

        <div className="separation">
          <ArrowForwardIos className="itemrouteIconArrow" />
        </div>

        <div className="itemroute">
          <Assignment className="itemrouteIcon" />
          <p>Pedido</p>
        </div>
      </div>

      <div className="actions">
        <Button>Descargar Pdf</Button>
      </div>
    </div>
  );
}
