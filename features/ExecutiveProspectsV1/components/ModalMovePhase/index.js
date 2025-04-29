import { Box, Modal } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import styled from "styled-components";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";

export default function ModalMovePhase({
  open,
  toggleModal,
  prospectData = {
    fullname: "Nombre del prospecto",
  },
}) {
  const [showFormPending, setShowFormPending] = useState(false);
  const { getCatalogBy } = useGlobalCommons();
  const common = useSelector(commonSelector);

  return (
    <Modal open={open} onClose={toggleModal} closeAfterTransition>
      <ModalBox>
        <div className="title">
          <h3>Mover de fase</h3>
        </div>

        <div className="inputs">
          <div className="input-field">
            <label>Accion de segumiento</label>
            <Select
              onMenuOpen={() => getCatalogBy("actions")}
              placeholder="Selecciona una opción"
              options={common.actions?.results}
              getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id}
              // menuPosition="fixed"
            />
          </div>
          <div className="input-field">
            <label>Descripción de seguimiento</label>
            <textarea rows={4} placeholder="Descripción del seguimiento" />
          </div>
        </div>

        <div className="input-check">
          <label>
            <input
              className="checkbox"
              type="checkbox"
              checked={showFormPending}
              onChange={(e) => setShowFormPending(e.target.checked)}
            />
            Agregar pendiente
          </label>
        </div>
        {showFormPending && (
          <div className="addpending">
            <div className="input-field">
              <label>Agregar un nuevo pendiente</label>
              <textarea rows={4} placeholder="Descripción del seguimiento" />
            </div>
          </div>
        )}

        <div className="actions">
          <button
            className="cancel"
            onClick={() => {
              toggleModal();
            }}
          >
            Cancelar
          </button>
          <button
            className="save"
            onClick={() => {
              toggleModal();
            }}
          >
            Guardar
          </button>
        </div>

        {/* <div className="content">
          <p className="title">Mover {prospectData?.fullname} a </p>

          <div className="inputContainer">
            <label htmlFor="">Seguimiento</label>
            <textarea type="text" />
          </div>
        </div>

        <div className="actions">
          <Button onClick={toggleModal}>Cancelar</Button>
          <Button variant="contained" color="primary">
            Guardar
          </Button>
        </div> */}
      </ModalBox>
    </Modal>
  );
}

const ModalBox = styled(Box)`
  /* background: white;
  padding: 24px;
  max-width: 500px;
  margin: 10% auto;
  
  */
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  background-color: #fff;
  border-radius: 12px;
  padding: 16px;
  width: 700px;
  /* height: 300px; */
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  h3 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #2a2f3a;
  }

  .inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 12px;
        color: #757575;
      }

      input,
      textarea {
        border-radius: 8px;
        padding: 8px;
        border: 1px solid #eee;
        font-size: 14px;
        color: #2a2f3a;

        &:focus {
          outline: none;
          border-color: #39b8df;
        }
      }
    }
  }

  .checkbox {
    width: 16px;
  }

  .input-check {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
    font-size: 14px;
    color: #2a2f3a;
    font-weight: 600;
  }

  .addpending {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-top: 16px;
    padding: 8px 0;
    border-top: 1px solid #eee;

    .input-field {
      display: flex;
      flex-direction: column;
      gap: 4px;

      label {
        font-size: 12px;
        color: #757575;
      }

      input,
      textarea {
        border-radius: 8px;
        padding: 8px;
        border: 1px solid #eee;
        font-size: 14px;
        color: #2a2f3a;

        &:focus {
          outline: none;
          border-color: #39b8df;
        }
      }
    }
  }

  .actions {
    display: flex;
    /* justify-content: space-between; */
    justify-content: flex-end;
    gap: 8px;

    button {
      padding: 8px 16px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #fff;
      border: none;
      cursor: pointer;
      transition: all 0.2s ease;

      &.cancel {
        background-color: #f44336;
        &:hover {
          background-color: #d32f2f;
        }
      }

      &.save {
        background-color: #39b8df;
        &:hover {
          background-color: #0288d1;
        }
      }
    }
  }
`;
