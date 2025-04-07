import { CircularProgress, Dialog, Grid, IconButton } from "@material-ui/core";
import { ArrowDownward, ArrowDropDown, Close, Warning } from "@material-ui/icons";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { api } from "../../../../services/api";
import { handleGlobalAlert } from "../../../../utils";
import { backgroundColor, darkTextColor, highlightTextColor, primaryColor, warningColor } from "../../../../styles/colorsForDirector";

export default function DialogDeleteUser({
  openDeleteUser,
  handleDeleteUserClose,
  idNewUser,
  idUserDelete,
  setRefetchUsers,
  refetchUsers,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  // Borra al ejecutivo
  const DeleteAllAndMove = async () => {
    if (idUserDelete.id && idNewUser.id) {
      setIsLoading(true);
      await api.delete(`ejecutives/${idUserDelete.id}/${idNewUser.id}`);
      handleGlobalAlert("success", "Ejecutivo borrado correctamente", "basic", dispatch);
      setRefetchUsers(!refetchUsers);
      setIsLoading(false);
      handleDeleteUserClose();
    } else {
      handleGlobalAlert("warning", "Selecciona un ejecutivo", "basic", dispatch);
    }
  };

  return (
    <Dialog open={openDeleteUser} onClose={handleDeleteUserClose}>
      <DialogStyle>
        <div className="dialogDeleteUser__title">
          <p>La acción que esta apunto de realizar es irreversible</p>
          <Close className="close" onClick={() => handleDeleteUserClose()} />
        </div>
        <div className="dialogDeleteUser__container">
          <p className="highlight">Borrará al ejecutivo</p>
          <p className="capitalize name">
            {idUserDelete?.fullname} ({idUserDelete?.group?.name})
          </p>
          <ArrowDownward className="warning" />
          <p className="highlight">Moverá los datos al ejecutivo</p>
          <p className="capitalize name">
            {idNewUser?.fullname} ({idNewUser?.group})
          </p>
        </div>
        <div className="dialogDeleteUser__buttons">
          <button className="cancel" onClick={() => handleDeleteUserClose()}>
            Cancelar
          </button>
          {isLoading ? (
            <button>
              <CircularProgress size={20} color="secundary" />
            </button>
          ) : (
            <button className="confirm" onClick={() => DeleteAllAndMove()}>
              Confirmar
            </button>
          )}
        </div>
      </DialogStyle>
    </Dialog>
  );
}

export const DialogStyle = styled.div`
  height: 430px;
  padding: 10px;
  width: 600px;

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

  .highlight {
    color: ${darkTextColor};
    font-weight: 500;
    font-size: 17px;
  }

  .warning {
    font-size: 120px;
    color: ${warningColor};
    margin-top: 5px;
    margin-bottom: 10px;
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

  .close {
    color: gray;
    cursor: pointer;
    :hover {
      color: ${darkTextColor};
    }
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
