import { Dialog } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { Close, Warning } from "@material-ui/icons";
import Select from "react-select";
import { handleGlobalAlert } from "../../../../utils";
import { backgroundColor, darkTextColor, highlightTextColor, primaryColor, warningColor } from "../../../../styles/colorsForDirector";

export default function DialogDeleteAllFromExecutiveAndMoveItsData({
  open,
  handleClose,
  dataUsersAcces,
  idUserDelete,
  setOpenDeleteUser,
  idNewUser,
  setIdNewUser,
}) {
  const dispatch = useDispatch();

  const close = () => {
    handleClose();
    setIdNewUser();
  };

  const preDelete = () => {
    if (!idNewUser) {
      return handleGlobalAlert("warning", "Selecciona un ejecutivo", "basic", dispatch);
    } else {
      console.log("Abrir el segundo modal", idNewUser);
      handleClose();
      setOpenDeleteUser(true);
    }
  };

  return (
    <Dialog open={open} onClose={close}>
      <DialogStyle>
        <div className="dialogDeleteUser__title">
          <p> Eliminar ejecutivo y mover sus datos a otro ejecutivo</p>
          <Close className="close" onClick={() => close()} />
        </div>
        <div className="dialogDeleteUser__container">
          <p className="highlight">Mover datos al ejecutivo</p>
          <Select
            className="capitalize selectEjecutive"
            placeholder="Selecciona un ejecutivo"
            options={dataUsersAcces.filter(
              user => user.id != idUserDelete.id && user.roleId === "62d94hH7xnfeqrfYLLDSKAtR"
            )}
            getOptionLabel={options => `${options.fullname} (${options.group.name})`}
            getOptionValue={options => options.id}
            onChange={e => setIdNewUser({ id: e.id, fullname: e.fullname, group: e.group.name })}
          />
          <Warning className="warning" />
          <p className="highlight">Borrará al ejecutivo</p>
          <p className="capitalize name">
            {idUserDelete?.fullname} ({idUserDelete?.group?.name})
          </p>
        </div>
        <div className="dialogDeleteUser__buttons">
          <button className="cancel" onClick={() => close()}>
            Cancelar
          </button>
          <button className="confirm" onClick={() => preDelete()}>
            Continuar
          </button>
        </div>
      </DialogStyle>
    </Dialog>
  );
}

export const DialogStyle = styled.div`
  width: 550px;
  height: 450px;
  padding: 5px;

  button {
    width: 100%;
    height: 35px;
    margin: 2px;
    border: 0px solid;
    font-size: 12px;
    border-radius: 8px;
    padding: 8px 20px;
    cursor: pointer;
  }

  select {
    height: 30px;
    width: 100%;
    background-color: ${backgroundColor};
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 10px;
    background-color: ${backgroundColor};
    box-shadow: rgb(100 100 111 / 20%) 0px 7px 29px 0px;
    text-transform: capitalize;
    margin-top: 10px;
  }

  .warning {
    font-size: 120px;
    color: ${warningColor};
    margin-top: 5px;
    margin-bottom: 10px;
  }

  .selectEjecutive {
    margin-top: 10px;
    margin-bottom: 30px;
  }

  .cancel {
    :hover {
      border: 1px solid ${darkTextColor};
      background-color: ${backgroundColor};
      color: ${darkTextColor};
    }
  }

  .confirm {
    background-color: ${primaryColor};
    color: ${backgroundColor};
    :hover {
      border: 1px solid ${primaryColor};
      background-color: ${backgroundColor};
      color: ${primaryColor};
    }
  }

  .close {
    color: gray;
    cursor: pointer;
    :hover {
      color: ${darkTextColor};
    }
  }

  .highlight {
    color: ${darkTextColor};
    font-weight: 500;
    font-size: 17px;
  }

  .name {
    color: ${highlightTextColor};
    font-weight: 400;
    font-size: 15px;
    margin-top: 5px;
    margin-bottom: 17px;
  }

  .capitalize {
    text-transform: capitalize;
  }

  .dialogDeleteUser {
    &__title {
      display: grid;
      grid-template-columns: auto 16px;
      align-items: center;
      height: 40px;
      width: 100%;
      font-weight: 700;
      font-size: 18px;
      padding-left: 10px;
      padding-right: 10px;
      margin-bottom: 10px;
    }
    &__container {
      width: 100%;
      padding: 10px;
      text-align: center;
    }
    &__buttons {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
    }
  }
`;
