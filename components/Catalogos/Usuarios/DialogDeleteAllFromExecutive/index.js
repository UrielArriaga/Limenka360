import { Dialog } from "@material-ui/core";
import React from "react";
import styled from "styled-components";

export default function DialogDeleteAllFromExecutive({ openDialogDeleteAllFromExecutive, handleClose }) {
  return (
    <Dialog open={openDialogDeleteAllFromExecutive} onClose={handleClose}>
      <DialogStyle>
        <div className="dialogDeleteUSer__title">
          <p>Eliminar ejecutivo y todo lo relacionado</p>
        </div>
        <div className="dialogDeleteUSer__container">
          <p>La acción que está a punto de realizar es irreversible.</p>
        </div>
        <div className="dialogDeleteUSer__buttons">
          <button onClick={() => handleClose()}>Cancelar</button>
          <button>Confirmar</button>
        </div>
      </DialogStyle>
    </Dialog>
  );
}

export const DialogStyle = styled.div`
  max-width: 500px;
  /* height: 180px; */

  button {
    width: 100%;
    height: 35px;
    margin: 2px;
    border: 1px solid #405189;
    background-color: #405189;
    color: #fff;
    font-size: 12px;
    border-radius: 8px;
    padding: 8px 20px;
    cursor: pointer;
    :hover {
      background-color: #fff;
      color: #405189;
    }
  }

  .dialogDeleteUSer {
    &__title {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 40px;
      width: 100%;
      background: #776ceb;
      color: #fff;
      font-weight: 500;
    }
    &__container {
      width: 100%;
      padding: 10px;
    }
    &__buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px;
    }
  }
`;
