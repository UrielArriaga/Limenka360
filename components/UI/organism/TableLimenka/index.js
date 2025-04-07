import {
  Box,
  Checkbox,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  LinearProgress,
  Popover,
  Tooltip,
} from "@material-ui/core";
import {
  ArrowRight,
  CloseOutlined,
  FiberManualRecord,
  MoreVert,
  NavigateNext,
  OpenInNew,
  Settings,
  SettingsOutlined,
  Visibility,
  WhatsApp,
} from "@material-ui/icons";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { toUpperCaseChart } from "../../../../utils";

import {
  StyledMenu,
  StyledPopOver,
  StyledPopOverView,
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableDataId,
  TableDataSelect,
  TableDataSettingsColumn,
  TableHead,
  TableHeadColumn,
  TableHeadIdColumn,
  TableHeadSelectColumn,
  TableHeadSettingsColumn,
  TableRowBody,
  TableRowHead,
  TableSelectColumn,
} from "./styles";
import useModal from "../../../../hooks/useModal";
import ConfigurationTableLimenka from "../ConfigurationTableLimenka";

/**
 * Own table works as generic table
 * @param {array} customColums list of modified columns
 *
 */

const propTypes = {
  customColums: PropTypes.array,
  actions: PropTypes.array,
  generalActions: PropTypes.array,
  data: PropTypes.array.isRequired,
  activeCheck: PropTypes.bool.isRequired,
  heads: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  secondaryColor: PropTypes.string.isRequired,
  primaryColor: PropTypes.string.isRequired,
  // showActions: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  handleClickOpenWhatsApp: PropTypes.func,
  checkedUsers: PropTypes.array,
  setCheckedUsers: PropTypes.func,
};

const defaultProps = {
  customColums: [],
  data: [],
  activeCheck: true,
  isFetching: true,
  // checkedUsers: [],
};

export default function TableLimenka(props) {
  const {
    customColums,
    actions,
    generalActions,
    data,
    heads,
    id,
    secondaryColor,
    primaryColor,
    showActions,
    showGeneralActions,
    isFetching,
    handleClickOpenWhatsApp,
    checkedUsers,
    setCheckedUsers,
    generalActionsExtra,
    showCompares,
    handleCloseCompare,
    messageEmptyData,
    showConfiguration = false,
    fromOportunity = false,
  } = props;
  const [headsTable, setHeadsTable] = useState(normalizeHeads || []);
  const [isLoadDataTable, setLoadDataTable] = useState(true);
  const [openActionsRow, setOpenActionsRow] = useState(false);
  const [openGeneralActions, setOpenGeneralActions] = useState(false);

  const [rowSelected, setRowSelected] = useState(undefined);
  // #endregion

  const [anchorElCompare, setAnchorElCompare] = useState(null);
  const anchorActions = Boolean(openActionsRow);
  const { toggleModal, open } = useModal();

  let colors = { secondaryColor, primaryColor };

  let normalizeHeads = heads.map((item, index) => ({
    headText: item,
    showColumn: true,
    showColumn: item === "id" ? false : true,
    position: index,
    headTextData: item,
  }));

  useEffect(() => {
    saveAndRetrivelocalStorage();
  }, [id]);

  const handleCloseActionsRow = () => setOpenActionsRow(false);
  const handleCloseGeneralActions = () => setOpenGeneralActions(false);

  const saveAndRetrivelocalStorage = () => {
    try {
      setLoadDataTable(true);
      let savedHeads = localStorage.getItem(id);
      if (savedHeads === null || savedHeads === undefined) {
        setHeadsTable(normalizeHeads);
        localStorage.setItem(id, JSON.stringify(normalizeHeads));
      } else {
        let lengthArray = JSON.parse(savedHeads);
        if (lengthArray.length === heads.length) {
          setHeadsTable(JSON.parse(savedHeads));
        } else {
          setHeadsTable(normalizeHeads);
          localStorage.setItem(id, JSON.stringify(normalizeHeads));
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoadDataTable(false);
  };

  // *StartMenuAction
  const handleClickOpenActions = (event, itemRow) => {
    setRowSelected(itemRow);
    setOpenActionsRow(event.currentTarget);
  };

  const handleClickOpenGeneralActions = event => {
    if (checkedUsers.length === 0) return;
    setOpenGeneralActions(event.currentTarget);
  };
  // *EndMenuActions

  const handleChangeUsersCheck = user => {
    if (!setCheckedUsers) return;
    if (!checkedUsers.find(currentChecked => currentChecked.id === user.id)) {
      setCheckedUsers(checkedUsers => [...checkedUsers, user]);
    } else {
      setCheckedUsers(checkedUsers => checkedUsers.filter(currentChecked => currentChecked.id !== user.id)); // Delete from array
    }
  };

  const handleCompare = event => {
    setAnchorElCompare(event.currentTarget);
    handleClickOpenGeneralActions(event);
  };

  if (isFetching || isLoadDataTable) {
    return (
      <TableComponentStyled showLoader={isFetching || isLoadDataTable}>
        <Table>
          <TableHead>
            <TableRowHead {...colors}>
              {headsTable.map((item, index) => {
                if (item.showColumn) {
                  return (
                    <TableHeadComponent
                      key={index}
                      item={item}
                      id={id}
                      {...colors}
                      position={index}
                      checkedUsers={checkedUsers}
                    />
                  );
                }
              })}

              <TableHeadSettingsColumn {...colors}></TableHeadSettingsColumn>
            </TableRowHead>
          </TableHead>
        </Table>
        <Box display="flex" justifyContent="center">
          <div id="ctr_load">
            <div id="ctr_load__img">
              <img src="/load.png" />
            </div>
            <div id="ctr_load__load">
              <p>Cargando</p>
              <LinearProgress color="primary" />
            </div>
          </div>
        </Box>
      </TableComponentStyled>
    );
  }

  return (
    <TableComponentStyled>
      <Table>
        <TableHead>
          <TableRowHead {...colors}>
            {setCheckedUsers && (
              <TableHeadSelectColumn {...colors}>
                {showGeneralActions && (
                  <>
                    <div className="content">
                      <div
                        aria-controls="fade-menu"
                        aria-haspopup="true"
                        className={`content__icon ${checkedUsers.length === 0 && "disable"}`}
                        onClick={e => handleCompare(e)}
                      >
                        <MoreVert />
                      </div>
                    </div>

                    <StyledMenu
                      id="fade-menu"
                      anchorEl={openGeneralActions}
                      keepMounted
                      open={Boolean(openGeneralActions)}
                      onClose={handleCloseGeneralActions}
                    >
                      <div className="options">
                        {generalActions &&
                          generalActions?.map((item, index) => {
                            return (
                              <div
                                key={index}
                                className={`options__option ${item?.isLoading && "disable"}`}
                                onClick={() => {
                                  if (item?.isLoading) {
                                    return;
                                  }
                                  item.action(rowSelected);
                                  handleCloseGeneralActions();
                                }}
                              >
                                {item?.isLoading ? (
                                  <CircularProgress size={24} className="formButtons__progress" />
                                ) : (
                                  item.icon
                                )}{" "}
                                <p>{item.title}</p>
                              </div>
                            );
                          })}
                        {generalActionsExtra && Boolean(showCompares) && (
                          <StyledMenu
                            id="fade-menu"
                            anchorEl={anchorElCompare}
                            keepMounted
                            open={Boolean(showCompares)}
                            onClose={handleCloseCompare}
                          >
                            {generalActionsExtra}
                          </StyledMenu>
                        )}
                      </div>
                    </StyledMenu>
                  </>
                )}
              </TableHeadSelectColumn>
            )}

            {headsTable.map((item, index) => {
              if (item.showColumn) {
                return (
                  <TableHeadComponent
                    key={index}
                    item={item}
                    id={id}
                    {...colors}
                    position={index}
                    setCheckedUsers={setCheckedUsers}
                  />
                );
              }
            })}
            <TableHeadSettingsColumn {...colors}>
              {showConfiguration && (
                <IconButton onClick={() => toggleModal()}>
                  <Settings />
                </IconButton>
              )}
            </TableHeadSettingsColumn>
          </TableRowHead>
        </TableHead>

        <TableBody>
          {data.map((itemRow, indexRow) => {
            return (
              <TableRowBody key={itemRow.id} isPar={indexRow % 2 == 0} isNew={!itemRow?.viewed}>
                {setCheckedUsers && (
                  <TableSelectColumn itemRow={itemRow} isPar={indexRow % 2 == 0} {...colors} isNew={indexRow == 1}>
                    {fromOportunity ? (
                      <Checkbox
                        checked={checkedUsers?.find(currentChecked => currentChecked.id === itemRow?.id) !== undefined}
                        onChange={() => handleChangeUsersCheck(itemRow)}
                      />
                    ) : (
                      <Checkbox
                        checked={
                          checkedUsers?.find(currentChecked => currentChecked.id === itemRow?.itemBD?.id) !== undefined
                        }
                        onChange={() => handleChangeUsersCheck(itemRow.itemBD)}
                      />
                    )}
                  </TableSelectColumn>
                )}
                {heads.map((row, index) => {
                  if (headsTable[index]?.showColumn) {
                    return (
                      <TableDataComponent
                        handleClickName={() => {}}
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
                        checkedUsers={() => {}}
                        handleChangeUsersCheck={() => {}}
                        canMultiAssign={true}
                        customColums={customColums}
                      />
                    );
                  }
                })}
                {TableDataSettingsColumn && (
                  <TableDataSettingsColumn
                    itemRow={itemRow}
                    isPar={indexRow % 2 == 0}
                    {...colors}
                    isNew={indexRow == 1}
                  >
                    {showActions && (
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

                        <StyledMenu
                          id="fade-menu"
                          anchorEl={openActionsRow}
                          keepMounted
                          open={Boolean(anchorActions)}
                          onClose={handleCloseActionsRow}
                        >
                          <div className="options">
                            {actions &&
                              actions?.map((item, index) => {
                                return (
                                  <div
                                    key={index}
                                    className={`options__option ${item?.isLoading && "disable"}`}
                                    onClick={() => {
                                      if (item?.isLoading) {
                                        return;
                                      }
                                      item.action(rowSelected);
                                      handleCloseActionsRow();
                                    }}
                                  >
                                    {item?.isLoading ? (
                                      <CircularProgress size={24} className="formButtons__progress" />
                                    ) : (
                                      item.icon
                                    )}
                                    <p>{item.title}</p>
                                  </div>
                                );
                              })}
                          </div>
                        </StyledMenu>
                      </div>
                    )}
                  </TableDataSettingsColumn>
                )}
              </TableRowBody>
            );
          })}
        </TableBody>
      </Table>
      {data.length <= 0 && (
        <Box display="flex" justifyContent="center" p={20}>
          {messageEmptyData ? messageEmptyData : <p>Sin resultados intente modificar palabras claves</p>}
        </Box>
      )}

      <ConfigurationTableLimenka
        open={open}
        setOpen={toggleModal}
        headsTable={headsTable}
        setHeadsTable={setHeadsTable}
        id={id}
        heads={heads}
      />
    </TableComponentStyled>
  );
}
TableLimenka.propTypes = propTypes;
TableLimenka.defaultProps = defaultProps;

const TableHeadComponent = ({ item, id, position, checkedUsers }) => {
  if (item.position === 1) {
    return <TableHeadIdColumn hasChecked={checkedUsers !== undefined}>{item.headText}</TableHeadIdColumn>;
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
  checkedUsers,
  handleChangeUsersCheck,
  selectDeselectAll,
  canMultiAssign = false,
  customColums,
}) => {
  // #region useState
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElView, setAnchorElView] = useState(null);
  // #endregion

  // #region handlers
  const handleClick = event => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleClickView = event => setAnchorElView(event.currentTarget);
  const handleCloseView = () => setAnchorElView(null);
  // #endregion

  const open = Boolean(anchorEl);
  const idOpen = open ? "simple-popover" : undefined;

  const openView = Boolean(anchorElView);
  const idOpenView = openView ? "simple-popover" : undefined;
  const getDiferrenceDates = date => dayjs(date).fromNow();

  const anchorOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  const transformOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  let renderColumn = {
    id: null,
    nombre: (
      <TableDataId isPar={isPar} isNew={isNew} className="column_id" hasChecked={checkedUsers !== undefined}>
        <div className="content">
          <div className="content__flex">
            <div className="content__more"></div>

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
            <div className="txt-labelssa">
              {itemData?.itemBD?.prospectslabels?.slice(0, 3).map((item, index) => {
                if (item.system !== true) {
                  return (
                    <div key={index} className="index">
                      <Tooltip key={index} title={toUpperCaseChart(item?.labelname)}>
                        <Chip
                          className="chip"
                          style={{
                            color: "#616161",
                          }}
                          avatar={<FiberManualRecord className="fire" style={{ fontSize: 10, color: item?.color }} />}
                          label={toUpperCaseChart(item?.labelname).slice(0, 20)}
                        />
                      </Tooltip>
                    </div>
                  );
                }
              })}
              {itemData?.itemBD?.prospectslabels?.length > 4 && (
                <>
                  <Tooltip title="Ver todas las etiquetas">
                    <Chip
                      className="chipView"
                      style={{
                        color: "#616161",
                      }}
                      avatar={<Visibility className="fire" />}
                      label="Ver Más"
                      onClick={handleClickView}
                    />
                  </Tooltip>
                </>
              )}

              <Popover
                id={idOpenView}
                open={openView}
                anchorEl={anchorElView}
                onClose={handleCloseView}
                anchorOrigin={anchorOrigin}
                transformOrigin={transformOrigin}
              >
                <StyledPopOverView>
                  <div className="popover">
                    <div className="popover__header">
                      <p className="title">Etiquetas de {itemData?.itemBD?.name} </p>
                      <Tooltip title="Cerrar">
                        <CloseOutlined className="icon" onClick={handleCloseView} />
                      </Tooltip>
                    </div>
                    <Divider />
                    <div className="popover__item">
                      <div className="title">
                        {itemData?.itemBD?.prospectslabels?.map((item, index) => {
                          if (item?.system !== true) {
                            return (
                              <div key={index} className="label">
                                <ArrowRight className="icon" />
                                <p>{toUpperCaseChart(item?.labelname)}</p>
                              </div>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                </StyledPopOverView>
              </Popover>
            </div>

            <p className="txt-lastracking">
              Ultimo seguimiento <span>{getDiferrenceDates(itemData?.lastTrackingDate)} </span>
            </p>

            <p className="txt-createdAt">
              Creado el <span>{dayjs(itemData?.createdAt).format("DD/MM/YYYY")} </span>
            </p>
          </div>
        </div>
      </TableDataId>
    ),
    movil: (
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
          <StyledPopOver>
            <div className="popover">
              <div className="popover__header">
                <p className="title">Acciones</p>
              </div>
              <Divider />
              <div onClick={() => handleClickOpenWhatsApp(itemData)} className="popover__item">
                <WhatsApp className="icon" />
                <p className="title">Enviar WhatsApp</p>
                <NavigateNext className="icon-arrow" />
              </div>
            </div>
          </StyledPopOver>
        </Popover>
      </TableData>
    ),
    estado: (
      <TableData isPar={isPar} isNew={isNew}>
        <div className="content">
          <p>{item?.name}</p>
        </div>
      </TableData>
    ),
    fase: (
      <TableData isPar={isPar} isNew={isNew}>
        <div className="content phase" style={{ background: item?.color ? item?.color : "blue" }}>
          <p className="phase-title">{item?.name ? item?.name : "Sin fase"}</p>
        </div>
      </TableData>
    ),
  };

  function getColumn(renderColumn, prop) {
    if (renderColumn[prop] !== undefined) return renderColumn[prop];
    else
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">
            {(item === "" || item === null || item === undefined) && <p className="notasigned">N/A</p>}
            {item !== "" && <p>{item}</p>}
          </div>
        </TableData>
      );
  }

  for (let i = 0; i < 1; i++) {
    const element = customColums[i];
    if (element?.columname === headName) {
      return element.component(item, itemData, isPar, isNew);
    }
  }
  return getColumn(renderColumn, headName);
  // if (customColums.some((item, index) => item.columname === headName)) {
  //   return customColums[]
  // }
};
