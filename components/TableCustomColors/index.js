import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ArrowDropDown,
  ArrowDropUp,
  AttachMoney,
  CallOutlined,
  CloseOutlined,
  Delete,
  MoreVert,
  RadioButtonChecked,
  RadioButtonUnchecked,
  SettingsOutlined,
  Smartphone,
  VisibilityOutlined,
  Event,
  Person,
} from "@material-ui/icons";
import { Button, Checkbox, Dialog, Fade, FormControlLabel, Menu, CircularProgress, Avatar } from "@material-ui/core";
import { LinearProgress } from "@material-ui/core";
import { validateURL } from "../../utils";
const TableCustomColors = ({
  heads,
  data,
  loadingTableData,
  identificador,
  deleteItem,
  actionsPerItem,
  actionsItemsSelect,
  custom,
  selectmultiple,
  primaryColor,
  secondaryColor,
  order,
  keyStorage,
  actionOrder,
  actionPerColum,
  hiddenActionPerItem,
  firstTotal,
  totals = { Leads: 0, cotizado: 0, ventas: 0 },
}) => {
  const [loadTable, setloadTable] = useState(true);
  const [headCell, setheadCell] = useState([]);
  const [orderBy, setorderBy] = useState("");
  const [headersActives, setheadersActives] = useState([]);
  const [openSettings, setopenSettings] = useState(false);
  const [itemsSelect, setitemsSelect] = useState([]);
  const [showOptionsItem, setShowOptionsItem] = useState(null);
  const [elementSelect, setelementSelect] = useState({});
  const openActionItem = Boolean(showOptionsItem);
  const handleCloseSettings = () => setopenSettings(!openSettings);
  const handleClickActionItem = (event, element) => {
    setShowOptionsItem(event.currentTarget);
    setelementSelect(element);
  };
  const handleCloseActionItem = () => {
    setShowOptionsItem(null);
    setelementSelect({});
  };
  const [showOptionsSelect, setShowOptionsSelect] = useState(null);
  const openActionsSelect = Boolean(showOptionsSelect);
  const actionsItemsSelectShow = event => setShowOptionsSelect(event.currentTarget);
  const handleCloseActionSelects = () => setShowOptionsSelect(null);

  // * Recibe para generar la data de la tabla
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      normalizeHeads();
    }
    return () => {
      mounted = false;
    };
  }, [heads]);

  // * Estilo classeName par e inpar de cada fila de la tabla
  const checkrow = number => {
    if (number % 2 == 0) {
      return true;
    } else {
      return false;
    }
  };

  // * creacion de la data para las cabeceras y envio a localStorage
  const normalizeHeads = async () => {
    let headersCustom = [];
    setloadTable(true);
    if (data?.length > 0) {
      let rowHead = Object.keys(data[0]);
      for (let i = 0; i < heads.length; i++) {
        const element = heads[i];
        let obj = {
          text: element,
          show: element == "id" ? false : true,
          position: i + 1,
          identifier: rowHead[i],
        };
        headersCustom.push(obj);
      }
      switch (custom) {
        case true:
          let headsStorage = localStorage.getItem(keyStorage);
          let storage = headsStorage ? JSON.parse(headsStorage).length : 0;
          let headersLocal = headersCustom.length;
          if (headsStorage && storage == headersLocal) {
            setheadCell(JSON.parse(headsStorage));
            setloadTable(false);
          } else {
            localStorage.setItem(keyStorage, JSON.stringify(headersCustom));
            setheadCell(headersCustom);
            setloadTable(false);
          }
          return;
        case false:
          setheadCell(headersCustom);
          setloadTable(false);
          return;

        default:
          break;
      }
    }
    setloadTable(false);
  };

  // * Cambio de estado para mostrar las cabeceras
  const activeHead = head => {
    let HeaderActive = [];
    for (let i = 0; i < headersActives.length; i++) {
      const element = headersActives[i];
      if (i == head) {
        if (element.show) {
          element.show = false;
        } else {
          element.show = true;
        }
      }
      HeaderActive.push(element);
    }
    setheadersActives(HeaderActive);
  };

  const handleHiddenHeads = () => {
    localStorage.setItem(keyStorage, JSON.stringify(headersActives));
    setheadCell(headersActives);
    setopenSettings(!openSettings);
  };

  const restoreValuesTable = () => {
    let headersCustom = [];
    let rowHead = Object.keys(data[0]);
    for (let i = 0; i < heads.length; i++) {
      const element = heads[i];
      let obj = {
        text: element,
        show: element == "id" ? false : true,
        position: i + 1,
        identifier: rowHead[i],
      };
      headersCustom.push(obj);
    }
    setheadCell(headersCustom);
    localStorage.setItem(keyStorage, JSON.stringify(headersCustom));
    setopenSettings(!openSettings);
  };

  // * Order de la tabla
  const handleChangeOrder = order => {
    let orderText = "";
    if (orderBy == order) {
      orderText = "-" + order;
      setorderBy("-" + order);
    } else {
      orderText = order;
      setorderBy(order);
    }
    actionOrder(orderText);
  };

  // * seleccion por item
  const checkedItem = (checked, item) => {
    if (checked) {
      setitemsSelect([...itemsSelect, item]);
    } else {
      let newItemsSelects = itemsSelect.filter((i, index) => i.id !== item.id);
      setitemsSelect(newItemsSelects);
    }
  };

  // * seleccion de todos los items
  const checkedItemAll = checked => {
    if (checked) {
      setitemsSelect(data);
    } else {
      setitemsSelect([]);
    }
  };

  // * validador de seleccion
  const validateCheck = item => {
    let validate = itemsSelect.filter(i => i.id == item.id);
    if (validate.length > 0) {
      return true;
    } else {
      return false;
    }
  };

  if (loadTable) {
    return (
      <div>
        <CircularProgress size={10} style={{ marginRight: 5 }} color="primary" />
        <p style={{ fontSize: 14, fontWeight: "500" }}>Pintando tabla...</p>
      </div>
    );
  }

  const showOption = index => {
    return hiddenActionPerItem ? !1 : firstTotal ? 0 !== index : !0;
  };

  const getTd = (ix, element) => {
    // if (ix === 0) {
    //   return <div className={`ctr_td fixedTotal`}>{element}</div>;
    // } else if (ix === 1) {
    //   return <div className={`ctr_td `}>{element}</div>;
    // } else if (ix === 2) {
    //   return <div className={`ctr_td`}>{element}</div>;
    // } else if (ix === 3) {
    //   return <div className={`ctr_td`}>{element}</div>;
    // }
    return <div className={`ctr_td`}>{element}</div>;
  };

  const getColor = (total, currentValue) => {
    let res = ((currentValue / total) * 100).toFixed(2);
    if (res < 25) return "low";
    if (res >= 25 && res < 50) return "mid";
    if (res >= 50 && res < 75) return "high";
    return "default";
  };

  return (
    <StyledTableCustom primaryColor={primaryColor} secondaryColor={secondaryColor}>
      <div className={itemsSelect.length > 0 ? "ctr_items_select" : "ctr_items_select hiddenSelect"}>
        <div className="ctr_items_select__total">
          <p className="total_number">{itemsSelect.length}</p>
          <span className="span">Seleccionados</span>
        </div>
        <div className="ctr_items_select__actions">
          <div
            className="delete"
            onClick={() => {
              deleteItem(itemsSelect);
              setitemsSelect([]);
            }}
          >
            <Delete />
          </div>
          {selectmultiple && (
            <div>
              <div className="options" aria-controls="fade-menu" aria-haspopup="true" onClick={actionsItemsSelectShow}>
                <MoreVert />
              </div>
              <StyledMenu
                id="fade-menu"
                anchorEl={showOptionsSelect}
                keepMounted
                open={openActionsSelect}
                onClose={handleCloseActionSelects}
                TransitionComponent={Fade}
              >
                <div className="ctr_options">
                  {actionsItemsSelect.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="ctr_options__item"
                        onClick={() => {
                          item.action();
                          handleCloseActionSelects();
                        }}
                      >
                        {item?.icon}
                        <p>{item?.title}</p>
                      </div>
                    );
                  })}
                </div>
              </StyledMenu>
            </div>
          )}
        </div>
      </div>

      {loadingTableData ? (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      ) : data?.length > 0 ? (
        <div className={itemsSelect.length > 0 ? "translate table" : "table"}>
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {headCell.map((item, index) => {
                  if (item.identifier == identificador) {
                    return (
                      <th className="title checkbox" key={index}>
                        {selectmultiple &&
                          (itemsSelect.length > 0 && itemsSelect.length < data.length ? (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={data.length !== itemsSelect.length ? true : false}
                                  indeterminate
                                  size="small"
                                  onChange={e => setitemsSelect([])}
                                />
                              }
                            />
                          ) : (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={data.length == itemsSelect.length ? true : false}
                                  size="small"
                                  onChange={e => checkedItemAll(e.target.checked)}
                                />
                              }
                            />
                          ))}

                        <div className="ctr_title" onClick={() => order && handleChangeOrder(item.text)}>
                          <p>{item.text}</p>
                          {order ? (
                            orderBy == "-" + item.text ? (
                              <ArrowDropUp />
                            ) : (
                              <ArrowDropDown className={orderBy == item.text ? "active" : "order"} />
                            )
                          ) : null}
                        </div>
                      </th>
                    );
                  }
                })}
                {headCell.map((item, index) => {
                  if (item.show && item.identifier !== identificador) {
                    return (
                      <th className={item.identifier == identificador ? "title checkbox" : "title"} key={index}>
                        {item.identifier == identificador && selectmultiple && (
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={data.length == itemsSelect.length ? true : false}
                                size="small"
                                onChange={e => checkedItemAll(e.target.checked)}
                              />
                            }
                          />
                        )}
                        <div className="ctr_title" onClick={() => order && handleChangeOrder(item.text)}>
                          <p>{item.text}</p>
                          {order ? (
                            orderBy == "-" + item.text ? (
                              <ArrowDropUp />
                            ) : (
                              <ArrowDropDown className={orderBy == item.text ? "active" : "order"} />
                            )
                          ) : null}
                        </div>
                      </th>
                    );
                  }
                })}
                {!hiddenActionPerItem && (
                  <th className="title configuration">
                    {custom ? (
                      <SettingsOutlined
                        onClick={() => {
                          let headersStorage = localStorage.getItem(keyStorage);
                          setheadersActives(JSON.parse(headersStorage));
                          setopenSettings(!openSettings);
                        }}
                      />
                    ) : null}
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="ctr_table__body">
              {data.map((item, index) => {
                let cell = Object.values(item);
                let keyCell = Object.keys(item);
                return (
                  <tr key={index} className={checkrow(index) ? "row" : "inpar row"}>
                    {headCell.map((i, ix) => {
                      if (i.identifier == identificador) {
                        return (
                          <td className="data fixed" key={ix}>
                            <p className="ctr_td">
                              {selectmultiple && (
                                <FormControlLabel
                                  control={
                                    <Checkbox
                                      checked={validateCheck(item)}
                                      size="small"
                                      onChange={e => checkedItem(e.target.checked, item)}
                                    />
                                  }
                                />
                              )}
                              <span
                                className="span"
                                onClick={() => actionPerColum?.active && actionPerColum?.action(item)}
                              >
                                {cell[ix]}
                              </span>
                            </p>
                          </td>
                        );
                      }
                    })}
                    {headCell.map((i, ix) => {
                      if (i.show && i.identifier !== identificador) {
                        return (
                          <td className="data" key={ix}>
                            {/* {console.log(cell[ix])} */}
                            {/* {getTd(ix, cell[ix])} */}

                            <div className={`ctr_td`}>{item[i.identifier]}</div>
                          </td>
                        );
                      }
                    })}
                    <td className="data options-td">
                      <div>
                        <div
                          className="options" //here could be handle styles
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          onClick={e => handleClickActionItem(e, item)}
                        >
                          <MoreVert />
                        </div>
                        {showOption(index) && (
                          <StyledMenu
                            elevation={1}
                            id="simple-menu"
                            anchorEl={showOptionsItem}
                            keepMounted
                            open={openActionItem}
                            onClose={handleCloseActionItem}
                            TransitionComponent={Fade}
                          >
                            <div className="ctr_options">
                              {actionsPerItem.map((action, index) => {
                                return (
                                  <div
                                    key={index}
                                    className="ctr_options__item"
                                    onClick={() => {
                                      action.action(elementSelect);
                                      handleCloseActionItem();
                                    }}
                                  >
                                    {action.icon}
                                    <p>{action.title}</p>
                                  </div>
                                );
                              })}
                            </div>
                          </StyledMenu>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table empty">
          <table className="ctr_table">
            <thead className="ctr_table__head">
              <tr className="ctr_table__head__tr">
                {heads.map((item, index) => (
                  <th className="title " key={index}>
                    <div className="ctr_title">
                      <p>{item}</p>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
          </table>
          <div className="body_empty">
            <div className="message_ctr">
              <img src="/empty_table.svg" />
              <p>Aun no hay datos</p>
            </div>
          </div>
        </div>
      )}

      <StyledDialog onClose={handleCloseSettings} aria-labelledby="simple-dialog-title" open={openSettings}>
        <div className="ctr_dialog">
          <div className="ctr_dialog__close" onClick={() => handleCloseSettings()}>
            <CloseOutlined />
          </div>
          <p className="ctr_dialog__title">Cabeceras visibles de la tabla</p>

          <div className="ctr_dialog__list_headers">
            {headersActives.map((item, index) => {
              if (item.text !== "id") {
                return (
                  <div
                    key={index}
                    className={
                      checkrow(index)
                        ? "ctr_dialog__list_headers__ctr_head"
                        : "ctr_dialog__list_headers__ctr_head inpar"
                    }
                    onClick={() => item.identifier !== identificador && activeHead(index)}
                  >
                    <div className="head">
                      <p>{item.text}</p>
                    </div>

                    {item.identifier == identificador ? (
                      <VisibilityOutlined className="iconDefault" />
                    ) : item.show ? (
                      <RadioButtonChecked className="iconActive" />
                    ) : (
                      <RadioButtonUnchecked className="iconInactive" />
                    )}
                  </div>
                );
              }
            })}
          </div>
          <div className="ctr_dialog__buttons_ctr">
            <Button onClick={() => restoreValuesTable()}>Restablecer Valores</Button>
            <Button variant="contained" color="primary" onClick={() => handleHiddenHeads()}>
              Aplicar cambios
            </Button>
          </div>
        </div>
      </StyledDialog>
    </StyledTableCustom>
  );
};

export default TableCustomColors;

const StyledTableCustom = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .table {
    width: 100%;
    min-height: 465px;
    max-height: 70vh;
    overflow-x: auto;
    /* transition: all 0.3s ease; */
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
  }
  .empty {
    box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2px;

    ::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 2px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 8px #585858;
    }
  }
  .translate {
    transition: all 0.3s ease;
    padding-top: 60px;
  }
  .ctr_table {
    border-spacing: 0;
    margin: auto;
    width: inherit;

    &__head {
      position: sticky;
      top: 0;
      z-index: 50;
      &__tr {
        background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#DCE1F6")};

        padding: 5px 10px;
        height: 40px;
        .checkbox {
          position: sticky;
          left: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 3px 5px;
          background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#405189")};
          color: #fff;
          min-width: 250px;
          height: inherit;
          .MuiFormControlLabel-root {
            margin-right: 5px;
          }

          @media (max-width: 600px) {
            min-width: 100px;
            position: relative;
          }
        }
        .title {
          text-transform: capitalize;
          padding: 0 10px;
          .ctr_title {
            display: flex;
            align-items: center;
            width: max-content;
            min-width: 200px;
            cursor: pointer;
            .order {
              opacity: 0;
              transition: all 0.3s ease;
            }
            .active {
              opacity: 1;
            }
            &:hover {
              .order {
                opacity: 1;
              }
            }
          }
        }
        .configuration {
          position: sticky;
          right: 0;
          background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#DCE1F6")};
          svg {
            cursor: pointer;
          }
        }
      }
    }
    &__body {
      .row {
        background: #fff;
        font-weight: bold;
        color: #2c2c2c;
        transition: all 0.3s ease;
        min-height: 50px;

        .fixed {
          position: sticky;
          left: 0;
          background: #fff;
          transition: all 0.3s ease;
          @media (max-width: 600px) {
            position: relative;
          }
        }
        .data {
          font-size: 14px;
          padding: 0 10px;

          .ctr_td {
            display: flex;
            align-items: center;
            min-height: 42px;
            /* background-color: green; */
            .span {
              width: 100%;
              cursor: pointer;
            }
            .icon_mail {
              color: green;
              width: 20px;
              height: 15px;
            }

            .inputColor {
              background-color: transparent;
              border-color: transparent;
              width: 30px;
              height: 30px;
            }
            .avatar {
              position: static;
            }
            .icon_phone {
              color: #f50;
              width: 20px;
              height: 15px;
            }
            .icon_date {
              color: #88c82d;
              width: 20px;
              height: 15px;
            }
            .icon_person {
              color: #44cbe4;
              width: 20px;
              height: 15px;
            }
            .icon_telefono {
              color: #1deafe;
              width: 20px;
              height: 15px;
            }

            .MuiFormControlLabel-root {
              margin-right: 5px;
            }
          }
          .low {
            background-color: #c0392b;
            color: #fff;
          }
          .mid {
            background-color: #f39c12;
          }
          .high {
            background-color: #feea3a;
          }
          .default {
            background-color: #2ecc71;
          }
        }
        .options-td {
          position: sticky;
          right: 0;
          background: #fff;
          transition: all 0.3s ease;
          .options {
            display: flex;
            align-items: center;
            justify-content: center;
            background: #405189;
            opacity: 0.6;
            border-radius: 4px;
            transition: all 0.3s ease;
            &:hover {
              cursor: pointer;
              opacity: 1;
            }
            svg {
              color: #fff;
            }
          }
        }
        &:hover {
          background: #d8dbe6;
          opacity: 0.8;
          color: #000;
          .fixed {
            background: #d8dbe6;
          }
          .options-td {
            background: #d8dbe6;
            .options {
              background: #2c3d72;
              opacity: 1;
            }
          }
        }
      }
      .inpar {
        background: #f3f3f3;
        .fixed {
          background: #f3f3f3;
        }
        .options-td {
          background: #f3f3f3;
        }
      }
    }
  }
  .body_empty {
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
        margin-top: 50px;
      }
      p {
        text-align: center;
        color: #8a8a8a;
      }
    }
  }

  .ctr_load {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    /* width: 100%;
    margin-top: 10%; */
    /* height: 400px; */
    margin: 166px 0px;
    &__img {
      width: 150px;
      animation: slide_img 3s infinite;
      img {
        width: 100%;
        object-fit: contain;
      }
    }
    &__load {
      display: flex;
      flex-direction: column;
      justify-content: center;
      line-height: 30px;
      width: 200px;
      p {
        text-align: center;
        font-weight: bold;
      }
    }
    @keyframes slide_img {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(10px);
      }
      100% {
        transform: translateY(0px);
      }
    }
  }

  .ctr_items_select {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fae0e9;
    padding: 10px 25px;
    position: absolute;
    width: inherit;
    min-height: 40px;
    z-index: 100;
    &__total {
      display: flex;
      align-items: center;
      .total_number {
        font-size: 20px;
        font-weight: bold;
        color: #f7367b;
        margin-right: 10px;
      }
      .span {
        font-weight: bold;
        color: #f7367b;
      }
    }
    &__actions {
      display: flex;
      align-items: center;
      .delete {
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        justify-content: center;
        border-radius: 50%;
        svg {
          transition: all 0.3s ease;
          color: #73676b;
        }
        &:hover {
          cursor: pointer;
          background: #fa7fab;
          width: 40px;
          height: 40px;
          justify-content: center;
          border-radius: 50%;
          svg {
            color: #fff;
          }
        }
      }
      .options {
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        width: 40px;
        height: 40px;
        justify-content: center;
        border-radius: 50%;
        svg {
          transition: all 0.3s ease;
          color: #73676b;
        }
        &:hover {
          cursor: pointer;
          background: #fa7fab;
          width: 40px;
          height: 40px;
          justify-content: center;
          border-radius: 50%;
          svg {
            color: #fff;
          }
        }
      }
    }
  }
  .hiddenSelect {
    display: none;
  }
`;

const StyledDialog = styled(Dialog)`
  backdrop-filter: blur(5px);
  p {
    margin: 0;
    padding: 0;
  }
  .MuiPaper-root.MuiDialog-paper.MuiDialog-paperScrollPaper.MuiDialog-paperWidthSm.MuiPaper-elevation24.MuiPaper-rounded {
    width: 100%;
    max-width: 600px;
    overflow: show;
  }
  .ctr_dialog {
    position: relative;
    &__title {
      width: 100%;
      background: #405189;
      padding: 10px;
      font-size: 20px;
      font-weight: bold;
      color: #fff;
    }
    &__order_ctr {
      display: flex;
      align-items: center;
      padding: 10px;
      position: relative;
      &__select_ctr {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        span {
          margin-bottom: 5px;
        }
        select {
          height: 32px;
          border: none;
          text-transform: capitalize;
          border-bottom: 2px solid #405189;
          border-radius: 4px;
          border-bottom-left-radius: 0;
          border-bottom-right-radius: 0;
          padding: 0 10px;
          &:focus {
            outline: none;
          }
        }
      }
      .clean_order {
        position: absolute;
        bottom: 0;
        right: 10px;
        text-transform: capitalize;
      }
    }
    &__orderBy {
      display: flex;
      flex-direction: column;
    }
    &__close {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      right: 10px;
      top: 10px;
      color: #fff;
      background: #f34b46;
      opacity: 0.8;
      border-radius: 4px;
      transition: all 0.3s ease;
      &:hover {
        opacity: 1;
        cursor: pointer;
      }
    }

    .span {
      padding: 10px;
      margin-bottom: 10px;
    }
    &__list_headers {
      height: 250px;
      overflow-y: scroll;
      ::-webkit-scrollbar {
        width: 6px;
        height: 6px;
      }
      ::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 70%);
      }
      ::-webkit-scrollbar-thumb {
        -webkit-box-shadow: inset 0 0 20px #585858;
      }
      &__ctr_head {
        display: flex;
        flex-direction: row;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        padding: 10px 20px;
        &:hover {
          cursor: pointer;
          background: #fae0e9;
        }
        .head {
          display: flex;
          align-items: center;
          text-transform: capitalize;
          .position {
            margin-right: 5px;
            font-size: 12px;
          }
        }
        .iconDefault {
          display: flex;
          color: #2e7d32;
          font-size: 18px;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
        }
        .iconActive {
          display: flex;
          font-size: 18px;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          color: #388dd9;
        }
        .iconInactive {
          display: flex;
          font-size: 18px;
          width: 20px;
          height: 20px;
          align-items: center;
          justify-content: center;
          color: #8a8a8a;
        }
      }
      .inpar {
        background: #f3f3f3;
        &:hover {
          cursor: pointer;
        }
      }
    }
    &__buttons_ctr {
      display: flex;
      align-items: center;
      justify-content: end;
      width: 100%;
      padding: 10px;
    }
  }
`;

const StyledMenu = styled(Menu)`
  p {
    margin: 0;
    padding: 0;
  }

  .ctr_options {
    display: flex;
    flex-direction: column;
    &__item {
      padding: 10px;
      margin-bottom: 5px;
      display: flex;
      align-items: center;
      p {
        display: flex;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
      }
      &:hover {
        transition: all 0.3s ease;
        background: #fae0e9;
        cursor: pointer;
      }
      .icon_item {
        color: #f97faa;
        margin-right: 5px;
      }
    }
  }
`;
