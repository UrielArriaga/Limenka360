import { Radio } from "@material-ui/core";
import React from "react";

export default function Main({ handleOnChangeOptionCheck, optionChecked }) {
  return (
    <div className="body">
      <p className="title">Selecciona como quieres distribuir el envio</p>

      <div className="options">
        <div className="option">
          <Radio
            checked={optionChecked === 1}
            onChange={e => {
              if (e.target.checked) {
                handleOnChangeOptionCheck(1);
              }
            }}
          />
          <p className="optiontitle">Distribuir envio en todos los productos</p>
        </div>

        <div className="option">
          <Radio
            checked={optionChecked === 2}
            onChange={e => {
              if (e.target.checked) {
                handleOnChangeOptionCheck(2);
              }
            }}
          />
          <p className="optiontitle">Distribuir envio en todos los productos y agregar envio en 0</p>
        </div>

        <div className="option">
          <Radio
            checked={optionChecked === 3}
            onChange={e => {
              if (e.target.checked) {
                handleOnChangeOptionCheck(3);
              }
              console.log(e.target.checked);
            }}
          />
          <p className="optiontitle">Agregar envio</p>
        </div>
      </div>
    </div>
  );
}
