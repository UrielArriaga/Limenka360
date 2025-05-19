import React, { useState } from "react";
import styled from "styled-components";

import {
  AssignmentTurnedIn,
  CalendarToday,
  Call,
  Email,
  WhatsApp,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { IconButton, Tooltip } from "@material-ui/core";
import { colors } from "../../../../styles/global.styles";
import ReactSelect from "react-select";

const actionsTrackins = [
  {
    icon: <WhatsApp />,
    action: "WhatsApp",
  },
  {
    icon: <Email />,
    action: "WhatsApp",
  },
  {
    icon: <Call />,
    action: "WhatsApp",
  },
  {
    icon: <AssignmentTurnedIn />,
    action: "WhatsApp",
  },
];

export default function SendWhatsapp({ onCancel }) {
  const [isFocused, setIsFocused] = useState(false);
  const [actionSelected, setActionSelected] = useState(null);

  return (
    <AddTrackingStyled isFocused={isFocused}>
      <p className="titleSection">Enviar Mensaje por whatsapp</p>

      <p className="label">Plantilla</p>
      <ReactSelect placeholder="Seleccionar Plantilla" />
      <p className="labl">Mensaje</p>
      <div className="areaTracking">
        <textarea></textarea>
      </div>
      <div className="actions">
        <button onClick={() => onCancel()}>Cancelar</button>
        <button>Enviar por Whatsapp Web</button>
        <button>Enviar por Whatsapp Desktop</button>
      </div>

      {/* <div className="areaTracking">
        <textarea
          className="txtArea"
          placeholder="Escriba la descripcion de la actividad"
          name=""
          id=""
          cols="30"
          rows="10"
          onFocus={() => setIsFocused(true)}
          //   onBlur={() => setIsFocused(false)}
        ></textarea>

        <ReactSelect />

        <div className="options">
          <div className="rowaaction ">
            {actionsTrackins.map((action, index) => (
              <IconButton
                className={`icon_click ${action.action === actionSelected && "highligth"}`}
                onClick={() => setActionSelected(action.action)}
              >
                <Tooltip title="WhatsApp">{action.icon}</Tooltip>
              </IconButton>
            ))}
          </div>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => setIsFocused(false)}>Cancelar</button>
        <button>Guardar</button>
      </div> */}
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
    margin-top: 10px;
    width: 100%;
    /* border: 1px solid ${colors.primaryColor}; */
    border-radius: 5px;
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
    /* ${(props) => (props.isFocused ? "display: flex;" : "display: none;")} */

    display: flex;
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
