import React from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Checkbox, Chip, Divider, IconButton, Popover, Tooltip, makeStyles } from "@material-ui/core";
import {
  AddAlert,
  ArrowRight,
  AttachMoney,
  CloseOutlined,
  Delete,
  Edit,
  FiberManualRecord,
  Group,
  MoreVert,
  NavigateNext,
  NewReleases,
  OpenInNew,
  Person,
  Restore,
  Settings,
  SettingsOutlined,
  TableChartOutlined,
  Visibility,
  VisibilityOff,
  WhatsApp,
} from "@material-ui/icons";
import { SortableContainer } from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import { toUpperCaseChart } from "../../utils";
import dayjs from "dayjs";
import { userSelector } from "../../redux/slices/userSlice";
import {
  TableComponentStyled,
  Table,
  TableRowHead,
  TableHeadIdColumn,
  TableHeadColumn,
  TableHeadSettingsColumn,
  TableHead,
  TableEmptyFake,
  TableBody,
  TableRowBody,
  TableDataId,
  TableDataSettingsColumn,
  TableData,
  StyledPopOver,
  StyledMenu,
  SortableItem,
  SortableItemStyled,
  DialogCustom,
  StyledPopOverView,
} from "../../styles/TableDataComponent";
import { api } from "../../services/api";
import Select from "react-select";
import { commonSelector } from "../../redux/slices/commonSlice";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { EntitiesLocal } from "../../BD/databd";

const TableHeadComponent = ({ item }) =>
  item.position === 1 ? (
    <TableHeadIdColumn>{item.headText}</TableHeadIdColumn>
  ) : item.showColumn ? (
    <TableHeadColumn>
      <div>{item.headText}</div>
    </TableHeadColumn>
  ) : null;

const TableHeadSelectedComponent = ({ total, totalSelected, item, position, selectDeselectAll, checked }) => {
  if (position === 1) {
    return (
      <TableHeadIdColumn isSelected>
        <Checkbox checked={checked} onChange={selectDeselectAll} /> {checked ? "Deseleccionar" : "Seleccionar Todos"} (
        {totalSelected}/{total})
      </TableHeadIdColumn>
    );
  } else if (item.showColumn) {
    return (
      <TableHeadColumn>
        <div></div>
      </TableHeadColumn>
    );
  }
  return null;
};

const TableDataComponent = ({
  itemData,
  item,
  headName,
  isPar,
  isNew,
  handleClickName,
  handleClickOpenWhatsApp,
  checkedUsers,
  handleChangeUsersCheck,
  canMultiAssign = false,
  handleAlert = () => {},
  categories,
  especialities,
  channels,
  entities,
  clientTypes,
  setFlag,
  flag,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const idOpen = open ? "simple-popover" : undefined;
  const [anchorElView, setAnchorElView] = useState(null);
  const handleClickView = event => setAnchorElView(event.currentTarget);
  const handleCloseView = () => setAnchorElView(null);
  const openView = Boolean(anchorElView);
  const idOpenView = openView ? "simple-popover" : undefined;
  const getDiferrenceDates = date => dayjs(date).fromNow();
  const [inputValue, setInputValue] = useState(item || "");
  const [originalValue, setOriginalValue] = useState(item || "");
  const [isMouseOver, setIsMouseOver] = useState(false);

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
    case "FOLIO":
      return (
        <TableDataId isPar={isPar} className="column_id">
          <div className="content">
            <div className="content__flex">
              <div className="content__more"></div>

              {canMultiAssign && (
                <Checkbox
                  checked={checkedUsers?.find(currentChecked => currentChecked.id === itemData?.id) !== undefined}
                  onChange={() => handleChangeUsersCheck(itemData)}
                />
              )}
              <Tooltip title="Abrir Vista Previa">
                <p className="name">{item}</p>
              </Tooltip>
            </div>

            <div className="content__more">
              <p className="txt-lastracking">
                Actualizado <span>{getDiferrenceDates(itemData?.updatedAt)} </span>
              </p>

              <p className="txt-createdAt">
                Creado el <span>{dayjs(itemData?.createdAt).format("DD/MM/YYYY")} </span>
              </p>
            </div>
          </div>
        </TableDataId>
      );
    case "FECHA DE CREACION":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content phone">{item ? <p>{item}</p> : <p className="notasigned">N/A</p>}</div>
        </TableData>
      );
    case "EJECUTIVO":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content phase" style={{ background: item?.color ? item?.color : "blue" }}>
            <p className="phase-title">{item ? item : "N/A"}</p>
          </div>
        </TableData>
      );
    case "TIPO DE PRESUPUESTO":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">{item ? <p>{item}</p> : <p className="notasigned">N/A</p>}</div>
        </TableData>
      );
    case "ASIGNADO A":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">{item ? <p>{item}</p> : <p className="notasigned">N/A</p>}</div>
        </TableData>
      );
    default:
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">{item ? <p>{item}</p> : <p className="notasigned">N/A</p>}</div>
        </TableData>
      );
  }
};

const TableComponent = props => {
  const {
    heads,
    id,
    secondaryColor,
    primaryColor,
    data,
    discartedTable,
    setShowed,
    handleAlert,
    handleClickName,
    handleClickAddTracking,
    handleClickEditProspect,
    handleClickAddPending,
    handleClickConverToOportunity,
    handleClickDiscardProspect,
    handleClickReasingProspect,
    handleClickRestore,
    handleClickOpenWhatsApp,
    checkedUsers,
    handleChangeUsersCheck,
    handleClickReasingProspects,
    selectDeselectAll,
    canMultiAssign,
    setFlag,
    flag,
  } = props;
  const [openSettings, setOpenSettings] = useState(false);
  const [headsTable, setHeadsTable] = useState(normalizeHeads || []);
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const [isLoadDataTable, setLoadDataTable] = useState(true);
  const anchorActions = Boolean(openActionsRow);
  let colors = { secondaryColor, primaryColor };
  const [rowSelected, setRowSelected] = useState(undefined);
  const { id_user, roleId, groupId } = useSelector(userSelector);
  const { categories, clientTypes, channels, entities, specialties } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();
  useEffect(() => {
    saveAndRetrivelocalStorage();
    getCatalogBy("categories");
    getCatalogBy("clientTypes");
    getCatalogBy("channels");
    getCatalogBy("specialties");
  }, []);

  useEffect(() => {
    if (setShowed) setShowed(headsTable);
  }, [headsTable, openSettings]);

  const saveAndRetrivelocalStorage = () => {
    try {
      setLoadDataTable(true);

      let savedHeads = localStorage.getItem("tableprospects");
      if (savedHeads === null || savedHeads === undefined) {
        setHeadsTable(normalizeHeads);
        localStorage.setItem("tableprospects", JSON.stringify(normalizeHeads));
      } else {
        let lengthArray = JSON.parse(savedHeads);
        if (lengthArray.length === heads.length) {
          setHeadsTable(JSON.parse(savedHeads));
        } else {
          setHeadsTable(normalizeHeads);
          localStorage.setItem("tableprospects", JSON.stringify(normalizeHeads));
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
          {checkedUsers?.length > 0 && canMultiAssign ? (
            <TableRowHead {...colors}>
              {headsTable.map((item, index) => {
                if (item.showColumn) {
                  return (
                    <TableHeadSelectedComponent
                      checked={checkedUsers.length === data.length}
                      total={data.length}
                      totalSelected={checkedUsers.length}
                      key={index}
                      item={item}
                      id={id}
                      {...colors}
                      position={index}
                      selectDeselectAll={selectDeselectAll}
                    />
                  );
                }
              })}
              <TableHeadSettingsColumn {...colors}>
                <Button
                  size="small"
                  variant="contained"
                  color="secondary"
                  endIcon={<Group></Group>}
                  onClick={handleClickReasingProspects}
                >
                  Reasignar ({checkedUsers.length})
                </Button>
              </TableHeadSettingsColumn>
            </TableRowHead>
          ) : (
            <TableRowHead {...colors}>
              {headsTable.map((item, index) => {
                if (item.showColumn) {
                  return <TableHeadComponent key={index} item={item} id={id} {...colors} position={index} />;
                }
              })}
              {/* <TableHeadSettingsColumn {...colors}>
                <SettingsOutlined onClick={() => handleClickSettings()} />
              </TableHeadSettingsColumn> */}
            </TableRowHead>
          )}
        </TableHead>
        <TableBody>
          {data.map((itemRow, indexRow) => {
            return (
              <TableRowBody key={itemRow.id} isPar={indexRow % 2 == 0}>
                {heads.map((row, index) => {
                  if (headsTable[index]?.showColumn) {
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
                        isNew={!itemRow.viewed}
                        checkedUsers={checkedUsers}
                        handleChangeUsersCheck={handleChangeUsersCheck}
                        canMultiAssign={canMultiAssign}
                        handleAlert={handleAlert}
                        categories={categories.results}
                        especialities={specialties.results}
                        clientTypes={clientTypes.results}
                        channels={channels.results}
                        entities={entities.results}
                        setFlag={setFlag}
                        flag={flag}
                      />
                    );
                  }
                })}
                {/* <TableDataSettingsColumn itemRow={itemRow} isPar={indexRow % 2 == 0} {...colors} isNew={indexRow == 1}>
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
                              handleClickEditProspect(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <Edit />
                            <p>Editar</p>
                          </div>
                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickConverToOportunity(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <AttachMoney />
                            <p>Convertir a oportunidad</p>
                          </div>
                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickAddTracking(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <TableChartOutlined />
                            <p>Agregar Seguimiento</p>
                          </div>
                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickAddPending(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <AddAlert />
                            <p>Agregar Pendiente</p>
                          </div>
                          <div
                            className="options__option"
                            onClick={() => {
                              handleClickDiscardProspect(rowSelected);
                              handleCloseActionsRow();
                            }}
                          >
                            <Delete />
                            <p>Descartar</p>
                          </div>
                          {roleId !== "ejecutivo" && (
                            <div
                              className="options__option"
                              onClick={() => {
                                handleClickReasingProspect(rowSelected);
                                handleCloseActionsRow();
                              }}
                            >
                              <Person />
                              <p>Reasignar Prospecto</p>
                            </div>
                          )}
                        </div>
                      </StyledMenu>
                    )}
                  </div>
                </TableDataSettingsColumn> */}
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
        setFlag={setFlag}
        flag={flag}
      />
    </TableComponentStyled>
  );
};

const SortableList = SortableContainer(({ items, hideColumn }) => {
  return (
    <ul>
      {items.map((value, index) => {
        if (value.headText === "id" || value.headText === "nombre") {
          return null;
        }

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
              {value.showColumn ? (
                <Visibility className="icon show" onClick={() => hideColumn(value, index)} />
              ) : (
                <VisibilityOff className="icon noshow" onClick={() => hideColumn(value, index)} />
              )}
            </div>
          </SortableItemStyled>
        );
      })}
    </ul>
  );
});

const ModalSettings = ({ open, setOpen, headsTable, setHeadsTable, id, heads, setFlag, flag }) => {
  const [cleanHeadsTable, setCleanHeadsTable] = useState(headsTable || cleanHeadsTable);
  const handleCloseSettings = () => {
    setOpen(!open);
    setFlag(!flag);
  };
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    retriveLocalStorageFlag();
  }, []);

  const retriveLocalStorageFlag = () => {
    let showTutorial = localStorage.getItem("show_t_drag") ?? true;
    setShowTutorial(showTutorial);
    if (showTutorial) {
      localStorage.setItem("show_t_drag", JSON.stringify(true));
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
    const newHeadsTable = [...headsTable];
    newHeadsTable[index].showColumn = !newHeadsTable[index].showColumn;
    setHeadsTable(newHeadsTable);
    saveUpdatesTable(newHeadsTable);
  };

  const restoreHeadsColum = () => {
    const normalizeHeads = heads.map((item, index) => ({
      headText: item,
      showColumn: item !== "id",
      position: index,
      headTextData: item,
    }));

    setHeadsTable(normalizeHeads);
    localStorage.setItem("tableprospects", JSON.stringify(normalizeHeads));
  };

  return (
    <DialogCustom onClose={handleCloseSettings} aria-labelledby="simple-dialog-title" open={open}>
      {showTutorial == true ? (
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

export default TableComponent;
