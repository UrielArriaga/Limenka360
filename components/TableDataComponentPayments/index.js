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
  Check,
  CloseOutlined,
  Delete,
  Edit,
  MoreVert,
  NavigateNext,
  NewReleases,
  OpenInNew,
  Restore,
  Settings,
  SettingsOutlined,
  TableChartOutlined,
  Visibility,
  VisibilityOff,
  WhatsApp,
} from "@material-ui/icons";

// export default function Prueba() {
//   const {
//     userData,
//     isFetching,
//     id_user,
//     isSuccess,
//     groupId,
//     isError,
//     errorMessage,
//     isLogged_User,
//     roleId,
//     company,
//   } = useSelector(userSelector);
//   const dispatch = useDispatch();

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     setData(normalizeTableProspect(dummyProspect));
//   }, []);

//   const heads = [
//     "id",
//     "nombre",
//     "correo",
//     "movil",
//     "teléfono",
//     "categoria de interés",
//     "código de producto",
//     "género",
//     "puesto",
//     "empresa",
//     "comentarios",
//     "codigo postal",
//     "estado",
//     "ciudad",
//     "colonia",
//     "calle",
//     "ejecutivo",
//     "tipo de cliente",
//     "fase",
//     "origen",
//     "Etiquetas",
//     "título",
//     "especialidad",
//     "web",
//     "facebook",
//     "google maps",
//     "fecha de creación",
//     "ultima actualización",
//   ];

//   const handleClickEditProspect = (item) => {
//     alert(JSON.stringify(item));
//   };

//   const handleClickAddTracking = (item) => {
//     alert(JSON.stringify(item));
//   };

//   const handleClickAddPending = (item) => {
//     alert(JSON.stringify(item));
//   };

//   const handleClickConverToOportunity = (item) => {
//     alert(JSON.stringify(item));
//   };

//   const handleClickDiscardProspect = (item) => {
//     alert(JSON.stringify(item));
//   };
//   // const handleClick
//   return (
//     <div>
//       <TableComponent
//         data={data}
//         id="nombre"
//         heads={heads}
//         secondaryColor="#dce1f6"
//         primaryColor="#405189"
//         handleClickAddTracking={handleClickAddTracking}
//         handleClickEditProspect={handleClickEditProspect}
//         handleClickAddPending={handleClickAddPending}
//         handleClickConverToOportunity={handleClickConverToOportunity}
//         handleClickDiscardProspect={handleClickDiscardProspect}
//       />
//     </div>
//   );
// }

const TableHeadComponent = ({ item, id, position }) => {
  if (item.position === 1) {
    return <TableHeadIdColumn>{item.headText}</TableHeadIdColumn>;
  } else if (item.showColumn) {
    return (
      <TableHeadColumn>
        <div>{item.headText}</div>
      </TableHeadColumn>
    );
  } else return null;
};

const TableDataComponent = ({
  itemData,
  item,
  headName,
  id,
  isPar,
  isNew,
  position,
  handleClickName,
  handleClickOpenWhatsApp,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const idOpen = open ? "simple-popover" : undefined;

  const getDiferrenceDates = date => dayjs(date).fromNow();
  let anchorOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  let transformOrigin = {
    vertical: "top",
    horizontal: "left",
  };
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
              <p className="txt-lastracking" onClick={() => console.log(itemData)}>
                Concepto <span>{itemData?.concepto} </span>
              </p>
            </div>

            <div className="content__more">
              <p className="txt-lastracking">
                Ultimo seguimiento <span>{getDiferrenceDates(itemData?.lastTrackingDate)} </span>
              </p>
            </div>
          </div>
        </TableDataId>
      );

    case "fase oportunidad":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content phase" style={{ background: item?.color ? item?.color : "blue" }}>
            <p className="phase-title">{item?.name ? item?.name : "Sin fase"}</p>
          </div>
        </TableData>
      );
    case "fase prospecto":
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

const TableComponent = props => {
  const { heads, id, secondaryColor, primaryColor, data, discartedTable } = props;
  const {
    handleClickName,
    handleClickPaymentComplete,
    handleClickCheckPayment,
    handleClickEditPayment,
    handleClickOpenWhatsApp,
  } = props;
  const [openSettings, setOpenSettings] = useState(false);
  const [headsTable, setHeadsTable] = useState(normalizeHeads || []);
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const [isLoadDataTable, setLoadDataTable] = useState(true);
  const anchorActions = Boolean(openActionsRow);
  let colors = { secondaryColor, primaryColor };
  const [rowSelected, setRowSelected] = useState(undefined);

  useEffect(() => {
    saveAndRetrivelocalStorage();
  }, []);

  const saveAndRetrivelocalStorage = () => {
    try {
      setLoadDataTable(true);

      let savedHeads = localStorage.getItem("tablePayments");
      if (savedHeads === null || savedHeads === undefined) {
        setHeadsTable(normalizeHeads);
        localStorage.setItem("tablePayments", JSON.stringify(normalizeHeads));
      } else {
        let lengthArray = JSON.parse(savedHeads);
        if (lengthArray.length === heads.length) {
          setHeadsTable(JSON.parse(savedHeads));
        } else {
          setHeadsTable(normalizeHeads);
          localStorage.setItem("tablePayments", JSON.stringify(normalizeHeads));
        }
      }

      setLoadDataTable(false);
    } catch (error) {
      console.log(error);
    }
  };

  let normalizeHeads = heads.map((item, index) => ({
    headText: item,
    showColumn: true,
    showColumn: item === "id" ? false : true,
    position: index,
    headTextData: item,
  }));

  // * Handles Events
  const handleClickSettings = () => {
    setOpenSettings(!openSettings);
  };

  const handleClickOpenActions = (event, itemRow) => {
    setRowSelected(itemRow);
    setOpenActionsRow(event.currentTarget);
    console.log(itemRow);
  };

  const handleCloseActionsRow = () => setOpenActionsRow(null);

  if (isLoadDataTable) {
    return (
      <div>
        <p style={{ fontSize: 14, fontWeight: "500" }}>Pintando tabla...</p>
      </div>
    );
  }
  return (
    <TableComponentStyled>
      <Table>
        <TableHead>
          <TableRowHead {...colors}>
            {headsTable.map((item, index) => {
              if (item.showColumn) {
                return <TableHeadComponent key={index} item={item} id={id} {...colors} position={index} />;
              }
            })}
            <TableHeadSettingsColumn {...colors}>
              <SettingsOutlined onClick={() => handleClickSettings()} />
            </TableHeadSettingsColumn>
          </TableRowHead>
        </TableHead>

        <TableBody>
          {data.map((itemRow, indexRow) => {
            return (
              <TableRowBody key={itemRow.id} isPar={indexRow % 2 == 0}>
                {heads.map((row, index) => {
                  if (headsTable[index].showColumn) {
                    return (
                      <TableDataComponent
                        handleClickName={handleClickName}
                        handleClickOpenWhatsApp={handleClickOpenWhatsApp}
                        position={index}
                        isPar={indexRow % 2 == 0}
                        key={row}
                        itemData={itemRow}
                        item={itemRow[headsTable[index].headTextData]}
                        headText={headsTable[index].headText}
                        headName={headsTable[index].headTextData}
                        id={id}
                        // isNew={!itemRow.viewed}
                      />
                    );
                  }
                })}
                <TableDataSettingsColumn itemRow={itemRow} isPar={indexRow % 2 == 0} {...colors} isNew={indexRow == 1}>
                  <div>
                    <div className="content">
                      <div
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        className="content__icon"
                        onClick={e => handleClickOpenActions(e, itemRow)}
                      >
                        <MoreVert />
                      </div>
                    </div>

                    {discartedTable && (
                      <StyledMenu
                        id="fade-menu"
                        anchorEl={openActionsRow}
                        keepMounted
                        open={anchorActions}
                        onClose={handleCloseActionsRow}
                      >
                        <div className="options">
                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickRestore(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <Restore />
                            <p>Restablecer</p>
                          </div>
                        </div>
                      </StyledMenu>
                    )}

                    {!discartedTable && (
                      <StyledMenu
                        id="fade-menu"
                        anchorEl={openActionsRow}
                        keepMounted
                        open={anchorActions}
                        onClose={handleCloseActionsRow}
                      >
                        <div className="options">
                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickPaymentComplete(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <AttachMoney />
                            <p>Ver pago completo</p>
                          </div>

                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickEditPayment(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <Edit />
                            <p>Editar Pago</p>
                          </div>

                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickCheckPayment(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <Check />
                            <p>Marcar como Pagado</p>
                          </div>
                        </div>
                      </StyledMenu>
                    )}
                  </div>
                </TableDataSettingsColumn>
              </TableRowBody>
            );
          })}
        </TableBody>
      </Table>

      {data.length <= 0 && (
        <TableEmptyFake>
          <div className="message_ctr">
            <img src="/empty_table.svg" />
            <p>Aun no hay datos</p>
          </div>
        </TableEmptyFake>
      )}

      <ModalSettings
        open={openSettings}
        setOpen={setOpenSettings}
        headsTable={headsTable}
        setHeadsTable={setHeadsTable}
        id={id}
        heads={heads}
      />
    </TableComponentStyled>
  );
};

export default TableComponent;

const TableComponentStyled = styled.div`
  width: 100%;
  max-height: 57vh;
  overflow-x: auto;
  transition: all 0.3s ease;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  ::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #585858;
  }
`;

const Table = styled.table`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableRowHead = styled.tr`
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  padding: 5px 10px;
  height: 40px;
`;

const TableHeadIdColumn = styled.th`
  position: sticky;
  left: 0;
  padding-left: 10px;

  top: 0;
  background: #405189;
  color: #fff;
  min-width: 150px;
  text-transform: capitalize;
  transition: all 0.3s ease;
  text-align: left;
  @media (max-width: 600px) {
    position: relative;
  }
`;

const TableHeadColumn = styled.th`
  min-width: 200px;
  text-align: left;
  padding-left: 10px;
  text-transform: capitalize;
`;

const TableHeadSettingsColumn = styled.th`
  min-width: 50px;
  position: sticky;
  right: 0;
  background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
  width: max-content;
  svg {
    cursor: pointer;
  }
`;
const TableHead = styled.thead`
  position: sticky;
  top: 0;
  z-index: 50;
`;

const TableEmptyFake = styled.div`
  position: relative;
  width: 100%;
  padding: 40px;
  height: 250px;

  .message_ctr {
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    p {
      text-align: center;
      color: #8a8a8a;
    }
  }
`;

const TableBody = styled.tbody`
  border-spacing: 0;
  margin: auto;
  width: inherit;
`;

const TableRowBody = styled.tr`
  ${props =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}

  ${props =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}

    ${props =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
    &:hover {
    background-color: #d8dbe6;

    .column_id {
      background-color: #d8dbe6;
    }
  }

  .asdas {
    ${props =>
      props.isPar === true &&
      css`
        background-color: #f5f5f5;
      `}

    ${props =>
      props.isPar === false &&
      css`
        background-color: #fff;
      `}

    ${props =>
      props.isNew === true &&
      css`
        background-color: #e5efff;
      `}
    &:hover {
      background-color: #d8dbe6;
    }
  }
`;

const TableDataId = styled.td`
  min-width: 250px;
  position: sticky;
  left: 0;
  /* cursor: pointer; */
  padding: 5px 10px;

  ${props =>
    props.isPar === true &&
    css`
      background-color: #f5f5f5;
    `}
  ${props =>
    props.isPar === false &&
    css`
      background-color: #fff;
    `}
    ${props =>
    props.isNew === true &&
    css`
      background-color: #e5efff;
    `}
    &:hover {
    background-color: #d8dbe6;
  }
  .content {
    padding: 5px 10px;

    &__flex {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__more {
      .txt-lastracking {
        font-size: 12px;
        color: #616161;
      }
      span {
        font-size: 12px;
      }
    }
    .name {
      color: #0d47a1;
      font-weight: bold;
      font-size: 14px;
      &:hover {
        cursor: pointer;
        text-decoration: underline;
      }
    }

    .icon-bg {
      .openprospect {
        width: 15px;
        height: 15px;

        &:hover {
          cursor: pointer;

          color: #0d47a1;
        }
      }
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;

const TableDataSettingsColumn = styled.td`
  position: sticky;
  right: 0;
  transition: all 0.3s ease;
  min-height: 42px;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    &__icon {
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      position: relative;
      background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#f8bbd0")};
      cursor: pointer;
      color: #fff;
    }
  }
  @media (max-width: 600px) {
    position: relative;
  }
`;

const TableData = styled.td`
  min-width: 150px;
  padding: 0px 10px;
  z-index: -1;
  width: inherit;

  .content {
    display: flex;
    align-items: center;
    svg {
      margin-right: 4px;
    }

    .icon_phone {
      color: #4caf50;
      width: 20px;
      height: 15px;
    }

    p {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .phase {
    text-transform: uppercase;
    border-radius: 4px;
    color: #fff;
    padding: 4px 4px;

    .phase-title {
      font-size: 12px;
      font-weight: normal;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
  }

  .phone {
    cursor: pointer;
  }

  .notasigned {
    color: #424242;
  }
`;

const StyledPopOver = styled.div`
  .popover {
    &__header {
      display: flex;
      align-items: center;

      .title {
        font-weight: 500;
        padding: 5px 5px 10px 10px;
      }

      .icon {
        margin-top: -4px;
        font-size: 15px;
        color: #103c82;
      }
    }

    &__item {
      display: flex;
      align-items: center;
      padding: 10px;
      transition: 0.3s;

      .icon {
        color: green;
        font-size: 17px;
        margin-right: 5px;
      }

      .title {
        font-weight: 500;
        font-size: 13px;
      }

      .icon-arrow {
        font-size: 25px;
        transition: 0.3s;
        margin-left: 5px;
        color: grey;
      }
      &:hover {
        cursor: pointer;
        background-color: rgb(220, 225, 246, 0.4);
        .icon-arrow {
          font-size: 25px;
          color: #103c82;
          transform: translateX(4px);
        }
      }
    }
  }
`;

// TODO  SETTINGS

const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%), 0px 3px 5px 2px rgb(0 0 0 / 5%);
  }

  .options {
    display: flex;
    flex-direction: column;

    &__option {
      padding: 5px 10px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
      }

      svg {
        color: #f97faa;
        margin-right: 5px;
      }
      &:hover {
        transition: all 0.3s ease;
        background: #fae0e9;
        cursor: pointer;
      }
    }
  }
`;

// TODO MODAL CONFIGURATION

import { SortableContainer, SortableElement } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { colors } from "../../styles/global.styles";
import { formatDate, toUpperCaseChart } from "../../utils";
import dayjs from "dayjs";

const SortableItem = SortableElement(({ value, position }) => (
  <ContentItem index={position}>
    <div className="content">
      <p>{value}</p>
    </div>
  </ContentItem>
));

const ContentItem = styled.div`
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  z-index: 100000000000000 !important;
  .content {
  }
  .actions {
    /* width: 10%; */
  }

  &:hover {
    cursor: move;
    caret-color: ${colors.primaryColor};
  }
`;

const SortableItemStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: ${({ index }) => (index % 2 == 0 ? "#f3f3f3" : "#ffff")};
  padding-right: 10px;
  .actions {
    .show {
      color: green;
    }
    .noshow {
      color: red;
    }
    &:hover {
      cursor: pointer;
    }
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;

const List = styled.ul``;

const SortableList = SortableContainer(({ items, id, hideColumn }) => {
  return (
    <List>
      {items.map((value, index) => {
        if (value.headText === "id") return null;
        if (value.headText === "nombre") return null;

        return (
          <SortableItemStyled key={value.headText} index={index}>
            <SortableItem
              disabled={value.headText === "id" || value.headText === "nombre"}
              key={`item-${value.headText}`}
              index={index}
              value={value.headText}
              position={index}
            />
            <div className="actions">
              {value.showColumn && <Visibility className="icon show" onClick={() => hideColumn(value, index)} />}
              {!value.showColumn && <VisibilityOff className="icon noshow" onClick={() => hideColumn(value, index)} />}
            </div>
          </SortableItemStyled>
        );
      })}
    </List>
  );
});

const ModalSettings = ({ open, setOpen, headsTable, setHeadsTable, id, heads }) => {
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
    localStorage.setItem("tableprospects", JSON.stringify(data));
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

    localStorage.setItem("tableprospects", JSON.stringify(normalizeHeads));
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

const normalizeTableProspect = prospects => {
  let newProspect = [];
  for (let i = 0; i < prospects.length; i++) {
    const element = prospects[i];
    let normalize = {};
    normalize["id"] = element?.id;
    normalize.nombre = element?.name.slice(0, 1);
    normalize["nombre"] = `${toUpperCaseChart(element?.name)} ${
      element.lastname && toUpperCaseChart(element.lastname)
    } `;
    normalize["correo"] = element?.email;
    normalize["movil"] = element?.phone;
    normalize["teléfono"] = element?.optionalphone;
    normalize["categoria de interés"] = toUpperCaseChart(element?.category?.name);
    normalize["código de producto"] = element?.product.slice(0, 40);
    normalize["género"] = element?.gender;
    normalize["puesto"] = element?.job;
    normalize["empresa"] = element?.clientcompany?.company;
    normalize["comentarios"] = element?.observations.slice(0, 40);
    normalize["codigo postal"] = element?.postal?.postal_code;
    normalize["estado"] = element?.entity;
    normalize["ciudad"] = element?.city?.name;
    normalize["colonia"] = element?.postal?.settlement;
    normalize["calle"] = element?.street;
    normalize["ejecutivo"] = element?.ejecutive?.name;
    normalize["tipo de cliente"] = element?.clienttype?.name;
    normalize["fase"] = element?.phase;
    normalize["origen"] = element?.origin?.name;
    normalize["Etiquetas"] = element?.prospectslabels.map(item => toUpperCaseChart(item.label.label)).join();
    normalize["título"] = element?.title;
    normalize["especialidad"] = element?.specialty?.name;
    normalize["web"] = element?.url.slice(0, 40) + "...";
    normalize["facebook"] = element?.facebook.slice(0, 40) + "...";
    normalize["google maps"] = element?.location.slice(0, 40) + "...";
    normalize["fecha de creación"] = formatDate(element?.createdAt);
    normalize["ultima actualización"] = formatDate(element?.updatedAt);
    normalize.viewed = element?.viewed;
    newProspect.push(normalize);
  }
  return newProspect;
};
const dummyProspect = [
  {
    id: "34yEYs6aBMH9dR3CBtIxEGec",
    name: "hildingr maceanruig zzzz",
    lastname: "",
    email: "marshall76@yahoo.com",
    gender: "",
    title: "",
    url: "",
    product: "XMNAS-ASDAS",
    phone: "5571552000",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "prospecto nuevo",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-14T15:09:29.230Z",
    updatedAt: "2022-10-18T16:42:23.813Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: null,
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62d7VI6HG2YzHhal17FPlF4x",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: null,
    postalId: null,
    cityId: "620d1d7b8c2ccb5059639ffb",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639ffb",
      name: "Naucalpan de Juárez",
      longitude: "-99.32694807",
      latitude: "19.46421626",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62d7VI6HG2YzHhal17FPlF4x",
      name: "Facebook",
      createdAt: "2022-08-17T18:08:26.587Z",
      updatedAt: "2022-08-17T18:08:26.587Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: null,
    prospectslabels: [
      {
        id: "IWlNuZvWTVWQHNqMx9aHUz2K",
        createdAt: "2022-10-18T16:42:23.920Z",
        updatedAt: "2022-10-18T16:42:23.920Z",
        prospectId: "34yEYs6aBMH9dR3CBtIxEGec",
        labelId: "62dB1JdmJalH6zNWJ0tYhmj1",
        label: {
          id: "62dB1JdmJalH6zNWJ0tYhmj1",
          label: "clinica",
          color: "#00b3ff",
          createdAt: "2022-08-10T16:18:13.473Z",
          updatedAt: "2022-08-12T19:12:35.288Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "9rn64VnRHcLNC9Av6bznYVSD",
    name: "hildingr maceanruig",
    lastname: "",
    email: "marshall76@yahoo.com",
    gender: "",
    title: "",
    url: "",
    product: "",
    phone: "5571552000",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "prospecto nuevo",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: false,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-14T14:25:06.242Z",
    updatedAt: "2022-10-18T16:42:59.377Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: null,
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62dais1ngSRPdvrss5nxAkMw",
    phaseId: "62dfqF2IIAB3T4SiVuZZSxPs",
    reasonId: null,
    specialtyId: null,
    postalId: null,
    cityId: null,
    entityId: "61d4691477616e74ffda760c",
    category: null,
    city: null,
    entity: {
      id: "61d4691477616e74ffda760c",
      name: "Hidalgo",
      longitude: "-98.82853803",
      latitude: "20.4147457",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dfqF2IIAB3T4SiVuZZSxPs",
      name: "contactado",
      objetive: "convertir a oportunidad",
      color: "#ff0000",
      order: 0,
      createdAt: "2022-08-10T20:58:03.568Z",
      updatedAt: "2022-08-16T17:49:38.235Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62dais1ngSRPdvrss5nxAkMw",
      name: "Instagram",
      createdAt: "2022-08-16T20:52:49.255Z",
      updatedAt: "2022-08-16T20:52:49.255Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: null,
    prospectslabels: [
      {
        id: "rDqPGNppKjixG1rZSxFni10S",
        createdAt: "2022-10-18T16:42:59.461Z",
        updatedAt: "2022-10-18T16:42:59.461Z",
        prospectId: "9rn64VnRHcLNC9Av6bznYVSD",
        labelId: "62d2GieQAso5t5HahTN9xDEb",
        label: {
          id: "62d2GieQAso5t5HahTN9xDEb",
          label: "hospital",
          color: "#b11b1b",
          createdAt: "2022-08-10T16:18:57.087Z",
          updatedAt: "2022-08-12T19:12:38.821Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "C8c9kPjuknAMkeYP4oaqOZ53",
    name: "x",
    lastname: "x",
    email: "xxx@gmail.com",
    gender: "Hombre",
    title: "",
    url: "",
    product: "",
    phone: "5525688573",
    optionalphone: "5512345678",
    street: "",
    isoportunity: false,
    job: "",
    observations: "",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-12T18:26:12.396Z",
    updatedAt: "2022-10-18T16:41:58.217Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62diKx74exCIXrrLbgnIgZBq",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: null,
    postalId: "623c9f0344ef1a0eb089183b",
    cityId: "620d1d7b8c2ccb5059639fd1",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639fd1",
      name: "Cuautitlán Izcalli",
      longitude: "-99.253298",
      latitude: "19.67126492",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62diKx74exCIXrrLbgnIgZBq",
      name: "Propio",
      createdAt: "2022-08-16T20:52:30.681Z",
      updatedAt: "2022-08-16T21:58:13.942Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: {
      id: "623c9f0344ef1a0eb089183b",
      postal_code: "54760",
      settlement: "Bosques de Morelos",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      cityId: "620d1d7b8c2ccb5059639fd1",
    },
    prospectslabels: [
      {
        id: "cMe5n5VPs3Ui8AlEiqBo9OU4",
        createdAt: "2022-10-18T16:41:58.306Z",
        updatedAt: "2022-10-18T16:41:58.306Z",
        prospectId: "C8c9kPjuknAMkeYP4oaqOZ53",
        labelId: "62d4zFq4ZWDZjgCSUICNz8Cg",
        label: {
          id: "62d4zFq4ZWDZjgCSUICNz8Cg",
          label: "correo",
          color: "#90c7df",
          createdAt: "2022-08-10T16:16:17.113Z",
          updatedAt: "2022-08-12T19:12:31.457Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "dA4SqQM835rI7iimRgKxHmvP",
    name: "prospectonuevo",
    lastname: "prospectonuevo",
    email: "prospectonuevo@gmail.com",
    gender: "Hombre",
    title: "",
    url: "",
    product: "",
    phone: "5525688573",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-18T18:59:52.311Z",
    updatedAt: "2022-10-18T19:44:56.235Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    categoryId: null,
    channelId: null,
    clientTypeId: "62dpoy9W75tUZXqPkA7l2C1O",
    originId: "62diKx74exCIXrrLbgnIgZBq",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: "62dJRRcrGReJJ2pyX8STNwCp",
    postalId: "623c9f0344ef1a0eb089183b",
    cityId: "620d1d7b8c2ccb5059639fd1",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639fd1",
      name: "Cuautitlán Izcalli",
      longitude: "-99.253298",
      latitude: "19.67126492",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62diKx74exCIXrrLbgnIgZBq",
      name: "Propio",
      createdAt: "2022-08-16T20:52:30.681Z",
      updatedAt: "2022-08-16T21:58:13.942Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dpoy9W75tUZXqPkA7l2C1O",
      name: "Clinica",
      createdAt: "2022-08-10T16:24:34.283Z",
      updatedAt: "2022-08-10T16:24:34.283Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: {
      id: "62dJRRcrGReJJ2pyX8STNwCp",
      name: "Anestesiología",
      createdAt: "2022-08-23T13:36:53.499Z",
      updatedAt: "2022-08-23T13:36:53.499Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    postal: {
      id: "623c9f0344ef1a0eb089183b",
      postal_code: "54760",
      settlement: "Bosques de Morelos",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      cityId: "620d1d7b8c2ccb5059639fd1",
    },
    prospectslabels: [
      {
        id: "eUbrBsGIyT6jWu5Ir3l7HWIg",
        createdAt: "2022-10-18T19:44:56.421Z",
        updatedAt: "2022-10-18T19:44:56.421Z",
        prospectId: "dA4SqQM835rI7iimRgKxHmvP",
        labelId: "62dB1JdmJalH6zNWJ0tYhmj1",
        label: {
          id: "62dB1JdmJalH6zNWJ0tYhmj1",
          label: "clinica",
          color: "#00b3ff",
          createdAt: "2022-08-10T16:18:13.473Z",
          updatedAt: "2022-08-12T19:12:35.288Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "gsja7fSgFTZZBZDgL2n05lt8",
    name: "hildingr maceanruigaaaa",
    lastname: "",
    email: "marshall76@yahoo.com",
    gender: "",
    title: "",
    url: "",
    product: "",
    phone: "5571552000",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "prospecto nuevo",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-14T15:10:23.735Z",
    updatedAt: "2022-10-18T16:42:08.346Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: null,
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62d7VI6HG2YzHhal17FPlF4x",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: null,
    postalId: null,
    cityId: "620d1ee68c2ccb505963a415",
    entityId: "61d4691477616e74ffda760c",
    category: null,
    city: {
      id: "620d1ee68c2ccb505963a415",
      name: "Mixquiahuala de Juárez",
      longitude: "-99.18326297",
      latitude: "20.22158958",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "61d4691477616e74ffda760c",
    },
    entity: {
      id: "61d4691477616e74ffda760c",
      name: "Hidalgo",
      longitude: "-98.82853803",
      latitude: "20.4147457",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62d7VI6HG2YzHhal17FPlF4x",
      name: "Facebook",
      createdAt: "2022-08-17T18:08:26.587Z",
      updatedAt: "2022-08-17T18:08:26.587Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: null,
    prospectslabels: [
      {
        id: "clzHknknnPjYaU4UsBPlz01D",
        createdAt: "2022-10-18T16:42:08.427Z",
        updatedAt: "2022-10-18T16:42:08.427Z",
        prospectId: "gsja7fSgFTZZBZDgL2n05lt8",
        labelId: "TO9hs4AWt9PEk3d2tCAxtmO8",
        label: {
          id: "TO9hs4AWt9PEk3d2tCAxtmO8",
          label: "Medical Buy",
          color: "",
          createdAt: "2022-10-15T18:01:08.134Z",
          updatedAt: "2022-10-15T18:01:08.134Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "KNZKaMs7Jlh9ms9BOTT1rkVa",
    name: "hildingr maceanruig",
    lastname: "",
    email: "marshall76@yahoo.com",
    gender: "",
    title: "",
    url: "",
    product: "",
    phone: "5571552000",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "prospecto nuevo",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: false,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-14T14:27:11.544Z",
    updatedAt: "2022-10-18T19:44:45.868Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: null,
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62d7VI6HG2YzHhal17FPlF4x",
    phaseId: "62dWYmOspYWtIaerHr94LNGq",
    reasonId: null,
    specialtyId: null,
    postalId: "623c9e3344ef1a0eb0890af7",
    cityId: "620d1d7b8c2ccb5059639ffb",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639ffb",
      name: "Naucalpan de Juárez",
      longitude: "-99.32694807",
      latitude: "19.46421626",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dWYmOspYWtIaerHr94LNGq",
      name: "cliente nuevo",
      objetive: "vender ++",
      color: "#2d9f81",
      order: 0,
      createdAt: "2022-08-08T18:42:15.430Z",
      updatedAt: "2022-08-16T17:44:51.640Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62d7VI6HG2YzHhal17FPlF4x",
      name: "Facebook",
      createdAt: "2022-08-17T18:08:26.587Z",
      updatedAt: "2022-08-17T18:08:26.587Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: {
      id: "623c9e3344ef1a0eb0890af7",
      postal_code: "53216",
      settlement: "Santiago Tepatlaxco",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      cityId: "620d1d7b8c2ccb5059639ffb",
    },
    prospectslabels: [
      {
        id: "qcFGiUSATBN4dVvDd8qxWSUQ",
        createdAt: "2022-10-18T19:44:45.951Z",
        updatedAt: "2022-10-18T19:44:45.951Z",
        prospectId: "KNZKaMs7Jlh9ms9BOTT1rkVa",
        labelId: "62dB1JdmJalH6zNWJ0tYhmj1",
        label: {
          id: "62dB1JdmJalH6zNWJ0tYhmj1",
          label: "clinica",
          color: "#00b3ff",
          createdAt: "2022-08-10T16:18:13.473Z",
          updatedAt: "2022-08-12T19:12:35.288Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "ReZ2Cof3ScU8fX4HNwHdG3AE",
    name: "x",
    lastname: "x",
    email: "x@gmail.com",
    gender: "",
    title: "",
    url: "",
    product: "",
    phone: "5525568857",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "",
    isclient: false,
    status: 1,
    remail: 2,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-12T17:28:22.983Z",
    updatedAt: "2022-10-18T16:41:47.609Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62diKx74exCIXrrLbgnIgZBq",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: null,
    postalId: "623c9f0344ef1a0eb089183b",
    cityId: "620d1d7b8c2ccb5059639fd1",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639fd1",
      name: "Cuautitlán Izcalli",
      longitude: "-99.253298",
      latitude: "19.67126492",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62diKx74exCIXrrLbgnIgZBq",
      name: "Propio",
      createdAt: "2022-08-16T20:52:30.681Z",
      updatedAt: "2022-08-16T21:58:13.942Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: {
      id: "623c9f0344ef1a0eb089183b",
      postal_code: "54760",
      settlement: "Bosques de Morelos",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      cityId: "620d1d7b8c2ccb5059639fd1",
    },
    prospectslabels: [
      {
        id: "5qvIWa4yqlkW9NRVK5XcINXa",
        createdAt: "2022-10-18T16:41:47.695Z",
        updatedAt: "2022-10-18T16:41:47.695Z",
        prospectId: "ReZ2Cof3ScU8fX4HNwHdG3AE",
        labelId: "62dB1JdmJalH6zNWJ0tYhmj1",
        label: {
          id: "62dB1JdmJalH6zNWJ0tYhmj1",
          label: "clinica",
          color: "#00b3ff",
          createdAt: "2022-08-10T16:18:13.473Z",
          updatedAt: "2022-08-12T19:12:35.288Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
      {
        id: "8XeUM4TS7y0wPTYLxIwuC4JM",
        createdAt: "2022-10-18T16:41:47.784Z",
        updatedAt: "2022-10-18T16:41:47.784Z",
        prospectId: "ReZ2Cof3ScU8fX4HNwHdG3AE",
        labelId: "62d4zFq4ZWDZjgCSUICNz8Cg",
        label: {
          id: "62d4zFq4ZWDZjgCSUICNz8Cg",
          label: "correo",
          color: "#90c7df",
          createdAt: "2022-08-10T16:16:17.113Z",
          updatedAt: "2022-08-12T19:12:31.457Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "Wc7romoLMfV9affdgPOSgHML",
    name: "juanchito",
    lastname: "y",
    email: "y@gmail.com",
    gender: "Hombre",
    title: "",
    url: "",
    product: "",
    phone: "5525632514",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-13T13:54:37.140Z",
    updatedAt: "2022-10-18T19:44:35.800Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    categoryId: null,
    channelId: null,
    clientTypeId: "62dnDzzFtSqC0oV6lKlbvMzW",
    originId: "62diKx74exCIXrrLbgnIgZBq",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: null,
    postalId: "623c9f0344ef1a0eb089183b",
    cityId: "620d1d7b8c2ccb5059639fd1",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639fd1",
      name: "Cuautitlán Izcalli",
      longitude: "-99.253298",
      latitude: "19.67126492",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62diKx74exCIXrrLbgnIgZBq",
      name: "Propio",
      createdAt: "2022-08-16T20:52:30.681Z",
      updatedAt: "2022-08-16T21:58:13.942Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dnDzzFtSqC0oV6lKlbvMzW",
      name: "Doctor",
      createdAt: "2022-08-10T16:21:53.779Z",
      updatedAt: "2022-08-10T16:21:53.779Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: {
      id: "623c9f0344ef1a0eb089183b",
      postal_code: "54760",
      settlement: "Bosques de Morelos",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      cityId: "620d1d7b8c2ccb5059639fd1",
    },
    prospectslabels: [
      {
        id: "lKnziCHaszPGL1w66snSEu30",
        createdAt: "2022-10-18T19:44:35.888Z",
        updatedAt: "2022-10-18T19:44:35.888Z",
        prospectId: "Wc7romoLMfV9affdgPOSgHML",
        labelId: "62dB1JdmJalH6zNWJ0tYhmj1",
        label: {
          id: "62dB1JdmJalH6zNWJ0tYhmj1",
          label: "clinica",
          color: "#00b3ff",
          createdAt: "2022-08-10T16:18:13.473Z",
          updatedAt: "2022-08-12T19:12:35.288Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
  {
    id: "wWb8x8gcEETs0P3E4BhPwbmt",
    name: "xxxx",
    lastname: "xxxx",
    email: "xxxxx@gmail.com",
    gender: "Hombre",
    title: "",
    url: "",
    product: "",
    phone: "5525688573",
    optionalphone: "",
    street: "",
    isoportunity: false,
    job: "",
    observations: "",
    isclient: false,
    status: 1,
    remail: 1,
    viewed: true,
    discarted: false,
    discartedreason: "",
    facebook: "",
    location: "",
    applydiscount: false,
    color: "",
    clientat: null,
    sharedto: [],
    createdAt: "2022-10-18T18:16:19.799Z",
    updatedAt: "2022-10-18T18:17:19.362Z",
    deletedAt: null,
    clientCompanyId: null,
    ejecutiveId: "62dIYoY5ADPjThnHctAWIG1Y",
    discartedbyId: null,
    createdbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    reasignedbyId: "62dIYoY5ADPjThnHctAWIG1Y",
    categoryId: null,
    channelId: null,
    clientTypeId: "62dpoy9W75tUZXqPkA7l2C1O",
    originId: "62diKx74exCIXrrLbgnIgZBq",
    phaseId: "62dAw9Xu3c6RraXx2xXMKetH",
    reasonId: null,
    specialtyId: null,
    postalId: "623c9f0344ef1a0eb089183b",
    cityId: "620d1d7b8c2ccb5059639fd1",
    entityId: "620fdc1ec8c1ad62b6687c6a",
    category: null,
    city: {
      id: "620d1d7b8c2ccb5059639fd1",
      name: "Cuautitlán Izcalli",
      longitude: "-99.253298",
      latitude: "19.67126492",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      entityId: "620fdc1ec8c1ad62b6687c6a",
    },
    entity: {
      id: "620fdc1ec8c1ad62b6687c6a",
      name: "Estado de México",
      longitude: "-99.41811915",
      latitude: "19.39978114",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
    },
    phase: {
      id: "62dAw9Xu3c6RraXx2xXMKetH",
      name: "prospecto nuevo",
      objetive: "covertir a oportunidad",
      color: "#4c669a",
      order: 0,
      createdAt: "2022-08-10T20:56:15.233Z",
      updatedAt: "2022-08-15T20:14:17.010Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    ejecutive: {
      id: "62dIYoY5ADPjThnHctAWIG1Y",
      name: "ejecutivo uriel",
      lastname: "arriaga",
      email: "urielarriaga.1998@executive.com",
      phone: "5525668573",
      optionalphone: "",
      password: "$2a$10$JMhhCZP4blqWAhwTiFnJkeF7VctaAO8aUxHk3fDsD/cMPU/.sZZtm",
      isonline: false,
      photo: "",
      isactive: true,
      username: "UAZE",
      oportcount: 49,
      isverified: true,
      title: "ing.",
      createdAt: "2022-09-01T15:25:39.424Z",
      updatedAt: "2022-10-24T16:32:49.755Z",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
      groupId: "62djqtmbXxhqx70ksMpspJ22",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clientcompany: null,
    origin: {
      id: "62diKx74exCIXrrLbgnIgZBq",
      name: "Propio",
      createdAt: "2022-08-16T20:52:30.681Z",
      updatedAt: "2022-08-16T21:58:13.942Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    clienttype: {
      id: "62dpoy9W75tUZXqPkA7l2C1O",
      name: "Clinica",
      createdAt: "2022-08-10T16:24:34.283Z",
      updatedAt: "2022-08-10T16:24:34.283Z",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    },
    specialty: null,
    postal: {
      id: "623c9f0344ef1a0eb089183b",
      postal_code: "54760",
      settlement: "Bosques de Morelos",
      createdAt: "2022-07-26T13:28:55.097Z",
      updatedAt: "2022-07-26T13:28:55.097Z",
      cityId: "620d1d7b8c2ccb5059639fd1",
    },
    prospectslabels: [
      {
        id: "dhRxYCAfdtbPuxTBZi34HAlF",
        createdAt: "2022-10-18T18:16:35.961Z",
        updatedAt: "2022-10-18T18:16:35.961Z",
        prospectId: "wWb8x8gcEETs0P3E4BhPwbmt",
        labelId: "62dxQiBwh6ptja4Az0UtSvdf",
        label: {
          id: "62dxQiBwh6ptja4Az0UtSvdf",
          label: "efectivo",
          color: "#0a610c",
          createdAt: "2022-08-08T16:31:41.128Z",
          updatedAt: "2022-08-12T19:12:27.993Z",
          companyId: "62dz3qnimTqzfPfKpt7JtOtE",
        },
      },
    ],
  },
];
