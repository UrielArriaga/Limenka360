import { BubbleChart } from "@material-ui/icons";
import React from "react";

export default function Headerinstructions() {
  return (
    <div className="headerinstructions">
      <BubbleChart className="icon" />
      <p className="guide">
        ¿CÓMO CONTINUAR?
        <span className="guidedescription">
          Si el pedido cuenta con productos que no se encuentran en stock, puedes agregarlos a una orden de compra, de
          lo contrario puedes enviar el pedido a completados en las acciones, recuerda que dependiendo tu rol podras
          crear una orden de compra nacional o internacional
        </span>
      </p>
    </div>
  );
}
