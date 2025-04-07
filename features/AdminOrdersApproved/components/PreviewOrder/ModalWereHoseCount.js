import { Button, Dialog } from "@material-ui/core";
import React, { useState } from "react";
import styled from "styled-components";

export default function ModalWereHoseCount({
  productOportunitySelected,
  open,
  handletoogle,
  productSelected,
  wereHouseSelected,
  actionsPedido,
}) {
  const { handleOnClickSave } = actionsPedido;

  const [quantityExit, setQuantityExit] = useState(1);
  return (
    <Dialog
      open={open}
      keepMounted
      onClose={handletoogle}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <Modal>
        <div className="header">
          <p>Selecciona la cantidad {productOportunitySelected?.product?.code}</p>
          <p>Cantidad solicitada {productOportunitySelected?.quantity}</p>
        </div>

        <div className="body">
          <p>{wereHouseSelected?.warehouseName}</p>

          <div className="inputContainer">
            <p className="label">Piezas</p>
            <input type="number" value={quantityExit} onChange={e => setQuantityExit(e.target.value)} />
          </div>
        </div>

        <div className="actions">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              handleOnClickSave(productOportunitySelected, wereHouseSelected, quantityExit);
            }}
          >
            Guardar
          </Button>
        </div>
      </Modal>
    </Dialog>
  );
}

const Modal = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 500px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #e0e0e0;

    p {
      font-size: 18px;
      font-weight: 600;
    }
  }
  .body {
    padding: 10px;
  }
  .actions {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
  }
`;
