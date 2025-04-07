import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { useState } from "react";
import { useEffect } from "react";
import {
  Button,
  Checkbox,
  Chip,
  CircularProgress,
  Dialog,
  Divider,
  Fade,
  FormControlLabel,
  LinearProgress,
  Menu,
  Popover,
  Tooltip,
} from "@material-ui/core";
import {
  AccountCircle,
  AddAlert,
  ArrowDownward,
  ArrowRight,
  ArrowUpward,
  AttachMoney,
  CalendarToday,
  CalendarTodayOutlined,
  Check,
  Clear,
  CloseOutlined,
  Comment,
  Delete,
  DragHandle,
  Edit,
  FiberManualRecord,
  HowToReg,
  MoreVert,
  NavigateNext,
  NewReleases,
  NotInterested,
  OpenInNew,
  Person,
  PersonAdd,
  PersonPin,
  Phone,
  RecentActors,
  Restore,
  Settings,
  SettingsOutlined,
  Star,
  StarBorder,
  TableChartOutlined,
  ViewStream,
  Visibility,
  VisibilityOff,
  WhatsApp,
} from "@material-ui/icons";

const TableHeadComponent = ({
  item,
  id,
  position,
  setCheckedUsers,
  checkedUsers,
  handleClickOpenGeneralActions,
  openGeneralActions,
  generalActions,
  handleCloseGeneralActions,
}) => {
  if (item.position === 1) {
    return (
      <TableHeadIdColumn>
        {setCheckedUsers && (
          <TableHeadSelectColumn {...colors}>
            {true && (
              <>
                <div className="content">
                  <div
                    aria-controls="fade-menu"
                    aria-haspopup="true"
                    className={`content__icon ${checkedUsers.length === 0 && "disable"}`}
                    onClick={handleClickOpenGeneralActions}
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
                              item.action(item);
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
                  </div>
                </StyledMenu>
              </>
            )}
          </TableHeadSelectColumn>
        )}
        {item.headText}
      </TableHeadIdColumn>
    );
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
  isRejected,
  isImportant,
  position,
  handleClickOpenWhatsApp,
  checkedUsers,
  setCheckedUsers,
  handleChangeUsersCheck,
  isFeching,
  handleClickName,
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
  const getDiferrenceDates = date => {
    if (!date) return "Sin seguimiento";

    return dayjs(date).fromNow();
  };
  let anchorOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  let transformOrigin = {
    vertical: "top",
    horizontal: "left",
  };

  const applyStatusStyle = status => {
    console.log("status", status);
    if (status === "50%") {
      console.log("igual a 30 %");
      return <p style={{ background: "#febc11" }}>{status}</p>;
    } else if (status < "50%") {
      return <p style={{ background: "red" }}>{status}</p>;
    } else if (status > "50%") {
      return <p style={{ background: "green" }}>{status}</p>;
    } else {
      return <p>{status}</p>;
    }
  };

  const NormalColor = status => {
    switch (status) {
      case "Aprobado":
        return "A";
      case "Rechazado":
        return "R";
      case "Pendiente de aprobación":
        return "P";
      default:
        return "N";
    }
  };

  switch (headName) {
    case "id":
      return null;
    case "instructor":
      return (
        <TableDataId
          isPar={isPar}
          isNew={isNew}
          isRejected={!isRejected}
          isImportant={!isImportant}
          className="column_id"
        >
          <div className="content ">
            <div className="content__flex">
              <div className="title_name">
                <Tooltip title="Abrir Vista Previa">
                  <p
                    onClick={() => {
                      handleClickName(itemData, true);
                    }}
                    className="name"
                  >
                    {itemData["instructor"]}
                  </p>
                </Tooltip>
              </div>
              <div className="icon-bg">
                <Tooltip title="Abrir demo">
                  <OpenInNew
                    className="openprospect"
                    onClick={() => {
                      handleClickName(itemData, false);
                      //  console.log(itemData, false)
                    }}
                  />
                </Tooltip>
              </div>
            </div>

            <div className="content__more">
              <div className="txt-labelssa">
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
                        <p className="title">Etiquetas de {itemData?.itemBD.name} </p>
                        <Tooltip title="Cerrar">
                          <CloseOutlined className="icon" onClick={handleCloseView} />
                        </Tooltip>
                      </div>
                      <Divider />
                      <div className="popover__item">
                        <div className="title">
                          {itemData?.itemBD?.prospectslabels?.map((item, index) => {
                            if (item.system !== true) {
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
                Fecha Creación: <span>{itemData?.["fecha de creacion"]} </span>
              </p>
            </div>
          </div>
        </TableDataId>
      );

    case "concepto":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content concept">
            <p className={"normal"}>{item}</p>
          </div>
        </TableData>
      );
    case "télefono":
      return (
        <TableData>
          <div className="content phone" onClick={handleClick}>
            <WhatsApp fontSize="small" className="icon_phone" />
            <p className={"normal"}>{item}</p>
          </div>
          <div className="optionalPhone">
            {itemData?.itemBD?.optionalphone !== "" && <Phone fontSize="small" className="icon_phone" />}
            <p className="normal">{itemData?.itemBD?.optionalphone}</p>
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
                  <Settings className="icon" />
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
      );

    case "estado":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">
            <p className={"normal"}>{item}</p>
          </div>
        </TableData>
      );
    case "estado*":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">
            <p className={`normalstatus ${NormalColor(itemData?.itemBD?.orderstatus?.["name"])}`}>
              {itemData?.itemBD?.orderstatus ? itemData?.itemBD?.orderstatus?.["name"] : "N/A"}
            </p>
          </div>
        </TableData>
      );

    case "fase":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content phase" style={{ background: item?.color }}>
            <p className="phase-title">{item?.name}</p>
          </div>
        </TableData>
      );
    case "certeza":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content certeza">
            {item.replace(/[^0-9\.]+/g, "") == 50 && (
              <div className="equal">
                <DragHandle className="icons" />
                <p className="certeza-title">{item}</p>
              </div>
            )}
            {item.replace(/[^0-9\.]+/g, "") < 50 && (
              <div className="min">
                <ArrowDownward className="icons" />
                <p className="certeza-title">{item}</p>
              </div>
            )}
            {item.replace(/[^0-9\.]+/g, "") > 50 && (
              <div className="max">
                <ArrowUpward className="icons" />
                <p className="certeza-title">{item}-</p>
              </div>
            )}
          </div>
        </TableData>
      );
    case "opciones":
      return (
        <TableData isPar={isPar} isNew={isNew}>
          Opciones
        </TableData>
      );

    default:
      return (
        <TableData isPar={isPar} isNew={isNew}>
          <div className="content">
            {(item === "" || item === null || item === undefined) && <p className={"notasigned"}>N/A</p>}
            {item !== "" && <p className={"normal"}>{item}</p>}
          </div>
        </TableData>
      );
  }
};

const TableComponent = props => {
  const { heads, id, secondaryColor, primaryColor, data, discartedTable, isFeching,DemoUptate,Declined } = props;
  const {
    handleClickName,
    handleClickAddTracking,
    handleClickAddPending,
    handleClickConverToSale,
    handleClickQuoteAgain,
    handleClickRestore,
    handleClickDiscardOportunities,
    handleClickOpenWhatsApp,
    handleClickRejectOportunity,
    handleClickImportantOportunity,
    handleCliclImportantRestore,
    handleCliclRejectedRestore,
    handleClickEditToOportunity,
    handleClickReasignedOportunity,
    handleCreateDemo,
    checkedUsers,
    setCheckedUsers,
    generalActions,
    handleClickpottential,
    handleClickDeletepottential,
  } = props;
  const [openSettings, setOpenSettings] = useState(false);
  const [headsTable, setHeadsTable] = useState(normalizeHeads || []);
  const [openActionsRow, setOpenActionsRow] = useState(null);
  const [isLoadDataTable, setLoadDataTable] = useState(true);
  const anchorActions = Boolean(openActionsRow);
  const { roleId } = useSelector(userSelector);

  let colors = { secondaryColor, primaryColor };
  const [rowSelected, setRowSelected] = useState(undefined);

  const [openGeneralActions, setOpenGeneralActions] = useState(false);

  useEffect(() => {
    saveAndRetrivelocalStorage();
  }, []);

  const handleCloseGeneralActions = () => setOpenGeneralActions(false);

  const saveAndRetrivelocalStorage = () => {
    try {
      setLoadDataTable(true);

      let savedHeads = localStorage.getItem("tableDemo");
      localStorage.setItem("tableDemo", JSON.stringify(normalizeHeads));
      if (savedHeads === null || savedHeads === undefined) {
        setHeadsTable(normalizeHeads);
        localStorage.setItem("tableDemo", JSON.stringify(normalizeHeads));
      } else {
        let lengthArray = JSON.parse(savedHeads);

        if (lengthArray.length === heads.length) {
          setHeadsTable(JSON.parse(savedHeads));
          localStorage.setItem("tableDemo", savedHeads);
        } else {
          setHeadsTable(normalizeHeads);

          localStorage.setItem("tableDemo", JSON.stringify(normalizeHeads));
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

  const handleChangeUsersCheck = user => {
    if (!checkedUsers.find(currentChecked => currentChecked.id === user.id)) {
      setCheckedUsers(checkedUsers => [...checkedUsers, user]);
    } else {
      setCheckedUsers(checkedUsers => checkedUsers.filter(currentChecked => currentChecked.id !== user.id)); // Delete from array
    }
  };

  const handleClickOpenGeneralActions = event => {
    if (checkedUsers.length === 0) return;
    setOpenGeneralActions(event.currentTarget);
  };
  return (
    <TableComponentStyled>
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
                    setCheckedUsers={setCheckedUsers}
                    checkedUsers={checkedUsers}
                    handleClickOpenGeneralActions={handleClickOpenGeneralActions}
                    openGeneralActions={openGeneralActions}
                    generalActions={generalActions}
                    handleCloseGeneralActions={handleCloseGeneralActions}
                  />
                );
              }
            })}
            <TableHeadSettingsColumn {...colors}>
              <SettingsOutlined onClick={() => handleClickSettings()} />
            </TableHeadSettingsColumn>
          </TableRowHead>
        </TableHead>

        <TableBody>
          {data?.map((itemRow, indexRow) => {
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
                        isRejected={!itemRow.rejected}
                        isImportant={!itemRow.isimportant}
                        checkedUsers={checkedUsers}
                        setCheckedUsers={setCheckedUsers}
                        handleChangeUsersCheck={handleChangeUsersCheck}
                      />
                    );
                  }
                })}

                <TableDataSettingsColumn
                  itemRow={itemRow}
                  isPar={indexRow % 2 == 0}
                  {...colors}
                  isRejected={indexRow == 1}
                  isImportant={indexRow == 1}
                >
                  {roleId === "administracion" ? (
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
                                console.log("selecionado",rowSelected);
                                DemoUptate(rowSelected)
                                // handleAceptDemo();
                                // handleCreateDemo(rowSelected);
                                // handleCloseActionsRow();
                              }}
                            >
                              <Check />
                              <p>Aprobar</p>
                            </div>
                            <div
                              className="options__option"
                              onClick={() => {
                                Declined(rowSelected);
                                // handleCreateDemo(rowSelected);
                                // handleCloseActionsRow();
                              }}
                            >
                              <NotInterested />
                              <p>Rechazar</p>
                            </div>
                            <div
                              className="options__option"
                              onClick={() => {
                                console.log("entra a editar");
                                
                                // handleCreateDemo(rowSelected);
                                // handleCloseActionsRow();
                              }}
                            >
                              <Edit />
                              <p>Editar</p>
                            </div>
                          </div>
                        </StyledMenu>
                      )}
                    </div>
                  ) : (
                    <></>
                  )}
                </TableDataSettingsColumn>
              </TableRowBody>
            );
          })}
        </TableBody>
      </Table>

      {isFeching && (
        <TableEmptyFake>
          <div className="message_ctr">
            <img src="/load.png" />
            <LinearProgress color="primary" />
          </div>
        </TableEmptyFake>
      )}

      {data?.length <= 0 && (
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
  display: flex;
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
    ${props =>
    props.isRejected === true &&
    css`
      background-color: #ffefef;
    `}
    ${props =>
    props.isimportant === true &&
    css`
      background-color: green;
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

      .title_name {
        display: flex;
        align-items: center;
        .icon_client {
          font-size: 18px;
          margin-right: 2px;
          color: #00c853;
          margin-bottom: -2px;
        }
      }
    }

    &__more {
      .txt-lastracking {
        font-size: 12px;
        color: #616161;
      }
      span {
        font-size: 12px;
      }
      .txt-labels {
        font-size: 12px;
        color: #616161;
        font-weight: bold;
      }
      .txt-labelssa {
        .index {
          display: contents;
        }
        .MuiChip-root.chip {
          height: 18px;
          background: #d8dbe6;
          padding: 2px;
          margin-right: 2px;
        }
        .chipView {
          height: 18px;
          background: #d8dbe6;
          padding: 2px;
          text-decoration: underline;
          &:hover {
            border: 1px solid #407aff54;
            cursor: pointer;
          }
        }
        .MuiChip-label {
          overflow: hidden;
          white-space: nowrap;
          padding-left: 9px;
          padding-right: 0px;
          text-overflow: ellipsis;
          color: #0d47a1;
          font-weight: 600;
          font-size: 11px;
        }
        .MuiChip-root .MuiChip-avatar {
          margin-left: 1px;
          margin-right: -6px;
        }
        .fire {
          font-size: 11px;
          padding: -5px;
          height: 10px;
          background: white;
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }
      }
      .txt-pottential {
        .index {
          display: contents;
        }
        .MuiChip-root.chip {
          height: 18px;
          background: #d8dbe6;
          padding: 2px;
          margin-right: 2px;
        }
        .chipView {
          height: 18px;
          background: #d8dbe6;
          padding: 2px;
          text-decoration: underline;
          &:hover {
            border: 1px solid #407aff54;
            cursor: pointer;
          }
        }
        .MuiChip-label {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          color: #0d47a1;
          font-weight: 600;
          font-size: 11px;
        }
        .MuiChip-root .MuiChip-avatar {
          margin-left: 1px;
          margin-right: -6px;
        }
        .fire {
          font-size: 11px;
          padding: -5px;
          height: 10px;
          background: white;
          border-radius: 50%;
          width: 10px;
          height: 10px;
        }
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
      display: flex;
      align-items: flex-start;
      .badge {
        font-size: 8px;
        font-weight: bold;
        letter-spacing: 0.03em;
        top: -5px;
        background: #f50000c7;
        padding: 1px 5px;
        color: white;
        border-radius: 15px 15px 15px 0px;
        margin-bottom: 10px;
        margin-right: 6px;
      }
      .badgeImportant {
        font-size: 8px;
        font-weight: bold;
        letter-spacing: 0.03em;
        top: -5px;
        background: green;
        padding: 1px 5px;
        color: white;
        border-radius: 15px 15px 15px 0px;
        margin-bottom: 10px;
        margin-right: 6px;
      }
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

    /* p {
      font-weight: bold;
      font-size: 14px;
    } */
    .reject {
      color: #c92626;
      font-weight: bold;
      font-size: 14px;
    }
    .important {
      color: green;
      font-weight: bold;
      font-size: 14px;
    }
    .normal {
      font-weight: bold;
      font-size: 14px;
    }
    .normalstatus {
      color: white;
      font-weight: bold;
      font-size: 14px;
    }
    .P {
      background-color: #febc11;
      padding: 3px;
      border-radius: 3px;
    }
    .R {
      background-color: #c92626;
      padding: 3px;
      border-radius: 3px;
    }
    .A {
      background-color: #4caf50;
      padding: 3px;
      border-radius: 3px;
    }
    .N {
      background-color: #cdcdcd;
      padding: 3px;
      border-radius: 3px;
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
  .certeza {
    text-transform: uppercase;
    border-radius: 4px;
    color: #fff;
    padding: 4px 4px;

    .certeza-title {
      padding: 4px 4px;
      font-size: 14px;
      border-radius: 4px;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
      font-weight: normal;
      font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
    }
    .min {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: red;
      border-radius: 6px;
      .icons {
        width: 18px;
        height: 20px;
        font-weight: bold;
      }
    }
    .max {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: green;
      border-radius: 6px;
      .icons {
        width: 18px;
        height: 20px;
        font-weight: bold;
      }
    }
    .equal {
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: #febc11;
      border-radius: 6px;
      .icons {
        width: 18px;
        height: 20px;
        font-weight: bold;
      }
    }
  }

  .phone {
    cursor: pointer;
  }
  .optionalPhone {
    display: flex;
    align-items: center;
    margin-top: 4px;
    .icon_phone {
      color: #4caf50;
      width: 20px;
      height: 15px;
    }
    .normal {
      font-weight: bold;
      font-size: 14px;
    }
  }

  .notasigned {
    color: #424242;
    font-weight: bold;
    font-size: 14px;
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
const StyledPopOverView = styled.div`
  .popover {
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 500;
        padding: 5px 5px 10px 10px;
      }

      .icon {
        margin-top: -4px;
        font-size: 19px;
        color: #103c82;
        margin-right: 9px;
        &:hover {
          cursor: pointer;
        }
      }
    }

    &__item {
      display: flex;
      align-items: center;
      padding: 3px;

      .label {
        display: flex;
        width: 231px;
      }
      .icon {
        color: #103c82;
        font-size: 22px;
        margin-right: -5px;
      }

      .title {
        font-weight: 500;
        font-size: 13px;
        height: 105px;
        overflow: auto;
        ::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        ::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
        }
        ::-webkit-scrollbar-thumb {
          -webkit-box-shadow: inset 0 0 20px #585858;
        }
      }

      .icon-arrow {
        font-size: 25px;
        transition: 0.3s;
        margin-left: 5px;
        color: grey;
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
import { TableHeadSelectColumn, TableSelectColumn } from "../UI/organism/TableLimenka/styles";
import { green } from "@material-ui/core/colors";
import { userSelector } from "../../redux/slices/userSlice";

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
              {value.showColumn && (
                <Visibility
                  className="icon show"
                  onClick={() => {
                    hideColumn(value, index);
                  }}
                />
              )}
              {!value.showColumn && (
                <VisibilityOff
                  className="icon noshow"
                  onClick={() => {
                    hideColumn(value, index);
                  }}
                />
              )}
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
    localStorage.setItem("tableDemo", JSON.stringify(data));
  };

  const hideColumn = (item, index) => {
    let newHeadsTable = [...headsTable];
    newHeadsTable[index].showColumn = !newHeadsTable[index].showColumn;
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
    localStorage.setItem("tableDemo", JSON.stringify(normalizeHeads));
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
