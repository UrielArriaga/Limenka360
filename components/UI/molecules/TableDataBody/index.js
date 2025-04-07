import { Divider, Popover, Tooltip } from "@material-ui/core";
import { NavigateNext, OpenInNew, Settings, WhatsApp } from "@material-ui/icons";
import { useState } from "react";
// import { StyledPopOver } from "../../../TableDataComponent/styles";
import { TableData, TableDataId } from "./styles";

const TableDataBody = ({
  itemData,
  item,
  headName,
  id,
  isPar,
  isNew,
  position,
  handleClickName,
  handleClickOpenWhatsApp,
  isCustomBody,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const idOpen = open ? "simple-popover" : undefined;

  const getDiferrenceDates = (date) => dayjs(date).fromNow();
  let anchorOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  let transformOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  if (isCustomBody) {
    return (
      <TableData>
        <p>asdsa</p>
      </TableData>
    );
  }
  switch (headName) {
    case "id":
      return null;
    case "nombre":
      return (
        <TableDataId isPar={isPar} isNew={isNew} className="column_id">
          <div className="content ">
            <div className="content__flex">
              <Tooltip title="Abrir Vista Previa">
                <p onClick={() => handleClickName(itemData, true)} className="name">
                  {item}
                </p>
              </Tooltip>

              <div className="icon-bg">
                <Tooltip title="Abrir Prospecto">
                  <OpenInNew className="openprospect" onClick={() => handleClickName(itemData, false)} />
                </Tooltip>
              </div>
            </div>

            <div className="content__more">
              <p className="txt-lastracking">
                Ultimo seguimiento <span>{getDiferrenceDates(itemData?.lastTrackingDate)} </span>
              </p>
            </div>
          </div>
        </TableDataId>
      );
    case "movil":
      return (
        <TableData>
          <div className="content phone" onClick={handleClick}>
            <WhatsApp fontSize="small" className="icon_phone" />
            <p>{item}</p>
          </div>
          <Popover
            id={idOpen}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={anchorOrigin}
            transformOrigin={transformOrigin}
          >
            <Popover>
              <div className="popover">
                <div className="popover__header">
                  <p className="title">Acciones</p>
                  <Settings className="icon" />
                </div>
                <Divider />
                <div onClick={() => handleClickOpenWhatsApp(itemData)} className="popover__item">
                  <WhatsApp className="icon" />
                  <p className="title">Enviar WhatsApp</p>
                  <NavigateNext className="icon-arrow" />
                </div>
              </div>
            </Popover>
          </Popover>
        </TableData>
      );

    case "estado":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">
            <p>{item.name}</p>
          </div>
        </TableData>
      );

    case "fase":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content phase" style={{ background: item?.color ? item?.color : "blue" }}>
            <p className="phase-title">{item?.name ? item?.name : "Sin fase"}</p>
          </div>
        </TableData>
      );

    default:
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">
            {(item === "" || item === null || item === undefined) && <p className="notasigned">N/A</p>}
            {item !== "" && <p>{item}</p>}
          </div>
        </TableData>
      );
  }
};

export default TableDataBody;
