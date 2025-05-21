import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import {
  Alarm,
  AssignmentTurnedIn,
  CalendarToday,
  Call,
  Email,
  Event,
  Place,
  WhatsApp,
} from "@material-ui/icons";
import dayjs from "dayjs";
import { IconButton, Tooltip } from "@material-ui/core";

import { useSelector } from "react-redux";

import { api } from "../../../../services/api";
import { colors } from "../../../../styles/global.styles";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { userSelector } from "../../../../redux/slices/userSlice";

const pendingstypesIcon = {
  Tarea: <AssignmentTurnedIn />,
  Llamada: <Call />,
  Recordatorio: <Alarm />,
  Cita: <Event />,
  Visita: <Place />,
};

const priorityList = [
  {
    name: "P1",
    color: "#f44336",
    value: 3,
    label: "Alta",
  },
  {
    name: "P2",
    color: "#ff9800",
    label: "Media",
    value: 2,
  },
  {
    name: "P3",
    color: "#4caf50",
    label: "Baja",
    value: 1,
  },
];

const useAddPending = () => {
  const { getCatalogBy } = useGlobalCommons();
  const { pendingstypes } = useSelector(commonSelector);
  const { id_user } = useSelector(userSelector);
  const [isFocused, setIsFocused] = useState(false);
  const [actionSelected, setActionSelected] = useState(null);
  const [dateSelected, setDateSelected] = useState(dayjs().format(""));

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: null,
    type: null,
    status: 0,
  });

  useEffect(() => {
    getCatalogBy(" ");
  }, []);

  const handleOnClickDate = (inputDateRef) => {
    inputDateRef?.current?.showPicker();
  };

  const handleDataForm = (name, value) => {
    console.log(name, value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickSave = async (prospectData) => {
    console.log(prospectData);

    let bodyPost = {
      prospectId: prospectData?.id,
      status: formData.status,
      createdbyId: id_user,
      priority: formData.status,
      subject: formData.title,
      place: "",
      pendingstypeId: formData.type,
      zone: "GMT-06:00",
      description: formData.description,
      remember: true,
      remember_by: "correo",
      notify: true,
      notify_by: "correo",
      date_from: formData.date,
      ejecutiveId: id_user,
    };

    try {
      let resp = await api.post("/pendings", bodyPost);
      console.log(resp);
    } catch (error) {
      console.log(error);
    }

    console.log("Save");

    console.log(formData);
  };

  return {
    isFocused,
    setIsFocused,
    actionSelected,
    setActionSelected,
    dateSelected,
    setDateSelected,
    pendingstypes,
    // inputDateRef,
    handleOnClickDate,
    handleDataForm,
    handleClickSave,
    formData,
  };
};

export default function AddPending({ prospectSelected }) {
  const {
    isFocused,
    setIsFocused,
    actionSelected,
    setActionSelected,
    dateSelected,
    pendingstypes,
    setDateSelected,
    handleOnClickDate,
    handleDataForm,
    handleClickSave,
    formData,
  } = useAddPending();

  const inputDateRef = useRef(null);
  // const handleOnClickDate = () => {
  //   console.log("here");
  //   console.log(inputDateRef.current);
  //   inputDateRef.current.showPicker();
  // };

  // const [isFocused, setIsFocused] = useState(false);
  // const [actionSelected, setActionSelected] = useState(null);
  const colorDays = () => {
    if (dayjs(formData.date).fromNow()) {
      return "#d50000";
    }
    return "#6a737f";
  };
  return (
    <AddTrackingStyled isFocused={isFocused}>
      <p className="titleSection">Agregar Pendiente</p>

      <div className="areaTracking">
        <input
          value={formData.title}
          onChange={(e) => handleDataForm("title", e.target.value)}
          onFocus={() => setIsFocused(true)}
          type="text"
          className="txtInput"
          placeholder="Titulo"
        />
        <textarea
          className="txtArea"
          placeholder="Descripcion (Opcional)"
          name=""
          id=""
          cols="30"
          rows="10"
          value={formData.description}
          onChange={(e) => handleDataForm("description", e.target.value)}
        ></textarea>

        <div className="options">
          <div className="mg">
            <div className="dateselected">
              <CalendarToday className="icon_option" />
              <div
                className="chip_date"
                onClick={() => handleOnClickDate(inputDateRef)}
              >
                <p className="txtDate">
                  {formData.date
                    ? dayjs(formData.date).format("DD/MM/YYYY HH:mm")
                    : dayjs().format("DD/MM/YYYY HH:mm")}
                </p>

                <div className="days">
                  <p>
                    {formData.date
                      ? dayjs(formData.date).fromNow(false)
                      : dayjs().fromNow(false)}
                  </p>
                </div>
              </div>
              <input
                ref={inputDateRef}
                type="datetime-local"
                value={formData.date}
                style={{ width: 0, visibility: "hidden" }}
                onChange={(e) => {
                  handleDataForm("date", e.target.value);
                }}
              />
            </div>

            {/* <div className="row dates">
              <div className="row">
                <CalendarToday className="icon_option" />
                <div className="chip_date" onClick={() => handleOnClickDate(inputDateRef)}>
                  <p className="txtDate">
                    {formData.date
                      ? dayjs(formData.date).format("DD/MM/YYYY HH:mm")
                      : dayjs().format("DD/MM/YYYY HH:mm")}
                  </p>
                  <p className="days">{formData.date ? dayjs(formData.date).fromNow(false) : dayjs().fromNow(false)}</p>
                </div>
              </div>

              <input
                ref={inputDateRef}
                type="datetime-local"
                value={formData.date}
                style={{ visibility: "hidden" }}
                onChange={e => {
                  handleDataForm("date", e.target.value);
                }}
              />
            </div> */}

            <div className="row priorities">
              {priorityList.map((priority, index) => (
                <div
                  className={`itempriority  ${
                    priority.value === formData?.status &&
                    "itempriorityhighligth"
                  }`}
                  onClick={() => handleDataForm("status", priority.value)}
                >
                  <Tooltip title={`Prioridad ${priority.label}`}>
                    <p style={{ color: priority.color }}>{priority.name}</p>
                  </Tooltip>
                </div>
              ))}
            </div>
          </div>

          <div className="rowaaction ">
            {pendingstypes.results.map((type, index) => (
              <IconButton
                className={`icon_click ${
                  type.id === formData?.type && "highligth"
                }`}
                onClick={() => handleDataForm("type", type.id)}
              >
                <Tooltip title={type.name}>
                  {pendingstypesIcon[type.name] || <AssignmentTurnedIn />}
                </Tooltip>
              </IconButton>
            ))}
            {/* {actionsPendings.map((action, index) => (
              <IconButton
                className={`icon_click ${action.action === actionSelected && "highligth"}`}
                onClick={() => setActionSelected(action.action)}
              >
                <Tooltip title={action.action}>{action.icon}</Tooltip>
              </IconButton>
            ))} */}
          </div>
        </div>
      </div>
      <div className="actions">
        <button className="btn-cancel" onClick={() => setIsFocused(false)}>
          Cancelar
        </button>
        <button onClick={() => handleClickSave(prospectSelected)}>
          Guardar
        </button>
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

    .txtInput {
      width: 100%;
      border: none;
      outline: none;
      /* height: 50px; */
      /* height: 20px; */
      resize: none;
      font-size: 0.9rem;
      margin-bottom: 10px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      padding-bottom: 5px;
      border-bottom: 1px solid transparent;

      &:focus {
        border: none;
        outline: none;
        border-bottom: 1px solid #eeeeee;
        background-color: #f1f4f6;
      }
    }
    textarea {
      ${(props) => (props.isFocused ? "display: block" : "display: none;")}

      width: 100%;
      border: none;
      outline: none;
      height: 50px;
      /* height: 20px; */
      resize: none;
      font-size: 0.9rem;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      border-bottom: 1px solid transparent;

      &:focus {
        border: none;
        outline: none;
        border-bottom: 1px solid #eeeeee;
        background-color: #f1f4f6;
      }
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
      /* border: 1px solid red; */
      width: 100%;
      margin-bottom: 10px;
      /* border: 1px solid red; */
      display: flex;
      justify-content: space-between;

      .dateselected {
        display: flex;
        align-items: center;
        /* border: 1px solid blue; */
        width: 50%;
      }

      /* background-color: green; */
    }

    .dates {
      width: 100%;
      /* border: 1px solid blue; */
    }

    .itempriority {
      padding: 10px 10px;
      cursor: pointer;
      &:hover {
        background-color: #f1f4f6;
        border-radius: 50%;
      }
    }

    .itempriorityhighligth {
      background-color: #f1f4f6;
      border-radius: 50%;
    }

    .icon_option {
      color: #6a737f;
      font-size: 1.5rem;
    }

    .txtDate {
      font-size: 0.8rem;
      text-transform: capitalize;
      margin-right: 10px;
      /* margin-right: 10px; */
    }
    .highligth {
      background-color: #b0bec5;
    }

    .chip_date {
      background-color: #f1f4f6;
      color: #6a737f;
      /* padding: 2px 10px;  */
      border-radius: 5px;
      /* margin-left: 10px; */
      padding: 5px 10px;
      display: flex;
      /* justify-content: space-between; */
      /* width: 100%; */
      &:hover {
        background-color: #b0bec5;
        cursor: pointer;
      }

      p {
        margin: 0;
      }
    }

    .days {
      font-size: 0.8rem;
      margin-left: 5px;
      color: #e57373;
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

    .btn-cancel {
      background-color: transparent;
      color: #000;

      &:hover {
        background-color: ${colors.primaryColorHover};
      }
    }
  }
`;
