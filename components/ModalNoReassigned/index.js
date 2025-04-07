import { DialogActions, DialogContent, Button } from "@material-ui/core";
import { Warning } from "@material-ui/icons";
import React from "react";
import { DialogContainer } from "./styles";

export default function ModalNoReassigned(props) {
  const { open, handleCloseNoAdd, usersNoAdded } = props;

  return (
    <DialogContainer
      open={open}
      onClose={handleCloseNoAdd}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div id="alert-dialog-title">
        <div id="title">
          <Warning className="icon" /> Usuarios no asignados
        </div>
        <p>(Los siguientes usuarios ya estaban asignados al ejecutivo seleccionado)</p>
      </div>

      <DialogContent id="containerBody">
        {usersNoAdded?.map(user => {
          return (
            <div className="user" key={user?.id}>
              <b>Prospecto:</b> {user?.name} | {user?.email}
            </div>
          );
        })}
      </DialogContent>

      <DialogActions className="buttons">
        <Button className={`acept`} onClick={handleCloseNoAdd} color="primary" autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
