import React, { useState } from "react";
import { ModalShippingStyled } from "./styles";
import { Button, Checkbox, IconButton, Radio } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import Main from "./Main";
import FormDistributeShipping from "./FormDistributeShipping";

export default function ModalShipping({
  open = true,
  onClose,
  optionChecked,
  totalShipping,
  productsData,
  handleOnChangeOptionCheck,
  handleOnChangeTotal,
}) {
  const [view, setView] = useState(0);

  const { products = [] } = productsData;

  const renderView = () => {
    switch (view) {
      case 0:
        return <Main handleOnChangeOptionCheck={handleOnChangeOptionCheck} optionChecked={optionChecked} />;
      case 1:
        return (
          <FormDistributeShipping
            handleOnChangeOptionCheck={handleOnChangeOptionCheck}
            optionChecked={optionChecked}
            products={products}
            handleOnChangeTotal={handleOnChangeTotal}
            totalShipping={totalShipping}
          />
        );
    }
  };
  return (
    <ModalShippingStyled
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="header">
        <p>Envio</p>
        <div>
          <IconButton>
            <Close />
          </IconButton>
        </div>
      </div>

      {renderView(optionChecked)}

      <div className="actions">
        <Button>Cancelar</Button>
        {view !== 0 && <Button onClick={() => setView(0)}>Atras</Button>}
        <Button onClick={() => setView(optionChecked)}>Continuar</Button>
      </div>
    </ModalShippingStyled>
  );
}
