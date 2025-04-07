import React from "react";
import { useDispatch, useSelector } from "react-redux";

import styled, { css } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Checkbox, Dialog, Divider, Fade, FormControlLabel, Menu, Popover, Tooltip } from "@material-ui/core";

import {
  AddAlert,
  AttachMoney,
  CalendarToday,
  CalendarTodayOutlined,
  CloseOutlined,
  Delete,
  Edit,
  MoreVert,
  NavigateNext,
  NewReleases,
  OpenInNew,
  Settings,
  SettingsOutlined,
  TableChartOutlined,
  Visibility,
  VisibilityOff,
  WhatsApp,
} from "@material-ui/icons";
import { api } from "../../../../services/api";
import SortableList from "./SortableList";

import { arrayMoveImmutable } from "array-move";

const ConfigurationTableLimenka = ({ open, setOpen, headsTable, setHeadsTable, id, heads }) => {
  const [cleanHeadsTable, setCleanHeadsTable] = useState(headsTable || cleanHeadsTable);
  const handleCloseSettings = () => setOpen(!open);
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    retriveLocalStorageFlag();
  }, []);

  const retriveLocalStorageFlag = () => {
    let showTutorial = localStorage.getItem("show_t_drag");

    if (showTutorial === null || showTutorial === undefined) {
      setShowTutorial(true);
      localStorage.setItem("show_t_drag", JSON.stringify(true));
    } else {
      setShowTutorial(JSON.parse(showTutorial));
    }
  };

  const saveTutorialFlag = () => {
    localStorage.setItem("show_t_drag", JSON.stringify(false));
    setShowTutorial(false);
  };

  const onSortEnd = ({ oldIndex, newIndex }) => {
    let newHeadsTable = [...headsTable];
    newHeadsTable[oldIndex].position = newIndex;
    newHeadsTable[newIndex].position = oldIndex;
    newHeadsTable = arrayMoveImmutable(newHeadsTable, oldIndex, newIndex);
    setHeadsTable(newHeadsTable);
    saveUpdatesTable(newHeadsTable);
  };

  const saveUpdatesTable = data => {
    localStorage.setItem(id, JSON.stringify(data));
  };

  const hideColumn = (item, index) => {
    let newHeadsTable = [...headsTable];
    newHeadsTable[item.position].showColumn = !newHeadsTable[item.position].showColumn;
    setHeadsTable(newHeadsTable);
    saveUpdatesTable(newHeadsTable);
  };

  const restoreHeadsColum = () => {
    let normalizeHeads = heads.map((item, index) => ({
      headText: item,
      showColumn: true,
      showColumn: item === "id" ? false : true,
      position: index,
      headTextData: item,
    }));

    setHeadsTable(normalizeHeads);

    localStorage.setItem(id, JSON.stringify(normalizeHeads));
  };

  return (
    <DialogCustom onClose={handleCloseSettings} aria-labelledby="simple-dialog-title" open={open}>
      {showTutorial ? (
        <div className="tutorial">
          <div className="title">
            <NewReleases />
            <h3>Nuevas Actualizaciones</h3>
          </div>

          <div className="description">
            <p>
              Ahora, puedes cambiar el orden de las columnas, solo manten presionda la columna que te interese mover
            </p>
          </div>

          <div className="image">
            <img src="/tutorials/draganddrop.gif" alt="" />
          </div>

          <div className="actions">
            <Button variant="contained" color="primary" onClick={() => saveTutorialFlag()}>
              Entiendo
            </Button>
          </div>
        </div>
      ) : (
        <div className="dialog">
          <div className="dialog__close">
            <p className="dialog__title">Cabeceras visibles de la tabla</p>
            <CloseOutlined onClick={() => handleCloseSettings()} />
          </div>

          <div className="dialog-list">
            <SortableList hideColumn={hideColumn} items={headsTable} onSortEnd={onSortEnd} id={id} />
          </div>

          <div className="actions">
            <Button onClick={() => restoreHeadsColum()}>Restablecer Valores</Button>
          </div>
        </div>
      )}
    </DialogCustom>
  );
};

export default ConfigurationTableLimenka;

const DialogCustom = styled(Dialog)`
  backdrop-filter: blur(5px);
  position: relative;
  overflow: hidden;
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    width: 100%;
    max-width: 600px;
    overflow: show;
    overflow: hidden;
  }

  .dialog {
    position: relative;

    &__close {
      display: flex;
      align-items: center;
      background: #405189;
      color: #fff;
    }
    &__title {
      width: 100%;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
  }

  .dialog-list {
    height: 250px;
    overflow-y: scroll;
    position: relative;
  }

  // ! TO DELETE AFTER 1 WEEK
  .tutorial {
    padding: 10px 10px;
    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      h3 {
        text-align: center;
      }

      svg {
        color: green;
      }
    }
    .description {
      margin-bottom: 10px;
    }

    .image {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .actions {
      display: flex;
      justify-content: flex-end;
    }
  }
`;
