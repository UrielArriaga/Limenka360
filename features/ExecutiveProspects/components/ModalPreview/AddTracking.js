import React, { useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";
import { toast } from "react-toastify";
import { Catalogo } from "../../../../constants";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import dayjs from "dayjs";
import { IconButton, Tooltip } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";

export default function AddTracking({ prospectSelected }) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const { id_user } = useSelector(userSelector);
  const [loading, setLoading] = useState(false);
  const [observations, setDescription] = useState("");
  const allowedActions = ["Cita", "Llamada", "Email", "Whatsapp"];

  const handleSave = async () => {
    const trackingData = {
      prospectId: prospectSelected.id,
      status: "1",
      actionId: selectedAction.id,
      reason: "",
      observations: observations.trim(),
      phaseId: prospectSelected.phaseId || null,
      createdbyId: id_user,
      url: "",
    };

    setLoading(true);
    try {
      const res = await api.post("trackings", trackingData);
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Error al guardar seguimiento");
      }

      toast("Seguimiento guardado correctamente.");
      setDescription("");
      setSelectedAction(null);
      setIsFocused(false);
    } catch (error) {
      console.error(error);
      alert("Hubo un problema guardando el seguimiento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AddTrackingStyled isFocused={isFocused}>
      <p className="titleSection">Agregar Seguimiento</p>

      <div className="areaTracking">
        <textarea
          className="txtArea"
          placeholder="Escriba la descripción de la actividad"
          value={observations}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={() => setIsFocused(true)}
        ></textarea>
        <div className="options">
          <div className="rowaaction ">
            {Catalogo.filter((action) =>
              allowedActions.includes(action.name)
            ).map(
              (action) =>
                action.icon && (
                  <IconButton
                    key={action.id}
                    className={`icon_click ${
                      selectedAction?.id === action.id ? "highlight" : ""
                    }`}
                    onClick={() => setSelectedAction(action)}
                  >
                    <Tooltip title={action.name}>{action.icon}</Tooltip>
                  </IconButton>
                )
            )}
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => setIsFocused(false)}>Cancelar</button>
        <button onClick={handleSave}>Guardar</button>
      </div>
    </AddTrackingStyled>
  );
}

const AddTrackingStyled = styled.div`
  background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 10px;
  border-radius: 8px;

  .titleSection {
    font-size: 0.9rem;
    font-weight: 600;
    color: #282455;

    margin-bottom: 10px;
  }

  .areaTracking {
    width: 100%;
    /* border: 1px solid ${colors.primaryColor}; */
    border-radius: 8px;
    padding: 10px;
    font-size: 0.9rem;
    color: #282455;
    margin-bottom: 10px;
    /* height: 30px; */

    border: ${(props) =>
      props.isFocused
        ? `1px solid ${colors.primaryColor}`
        : `1px solid #9e9e9e`};
    /* ${(props) =>
      props.isFocused
        ? "border: 1px solid #3aade6;"
        : "border: 1px solid red"} */

    /* ${(props) =>
      props.isFocused
        ? "border: 1px solid #3aade6;"
        : `border: 1px solid #fafafa`} */

    textarea {
      width: 100%;
      border: none;
      outline: none;
      height: 50px;
      /* height: 20px; */
      resize: none;
      font-size: 0.9rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    textarea::placeholder {
      font-size: 0.9rem;
      /* color: #282455; */
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }

    .txtArea {
      width: 100%;
      border: none;
      outline: none;
    }
  }

  .options {
    justify-content: flex-start;
    align-items: flex-start;
    align-items: flex-start;

    flex-direction: column;
    margin-bottom: 10px;

    ${(props) => (props.isFocused ? "display: flex;" : "display: none;")}
    .row {
      display: flex;
      align-items: center;
    }
    .icon_click {
      padding: 0;
      margin-right: 13px;
    }

    .mg {
      margin-bottom: 10px;
    }

    .icon_option {
      color: #6a737f;
      font-size: 1.5rem;
    }

    .highligth {
      background-color: #b0bec5;
    }

    .chip_date {
      background-color: #f1f4f6;
      color: #6a737f;
      padding: 2px 10px;
      border-radius: 5px;
      margin-left: 10px;

      p {
        margin: 0;
      }
    }
  }

  .actions {
    ${(props) => (props.isFocused ? "display: flex;" : "display: none;")}

    justify-content: flex-end;

    button {
      background-color: ${colors.primaryColor};
      color: #fff;
      padding: 5px 10px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-left: 10px;

      &:hover {
        background-color: ${colors.primaryColorHover};
      }
    }
  }
`;
