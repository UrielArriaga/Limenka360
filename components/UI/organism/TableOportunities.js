import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  ArrowDropDown,
  ArrowDropUp,
  CallOutlined,
  CloseOutlined,
  Delete,
  MailOutline,
  MoreVert,
  RadioButtonChecked,
  RadioButtonUnchecked,
  SettingsOutlined,
  Smartphone,
  VisibilityOutlined,
} from "@material-ui/icons";
import { Button, Checkbox, Dialog, Fade, FormControlLabel, Menu, CircularProgress } from "@material-ui/core";
import MultipleSelect from "../molecules/MultipleSelect";
import { isEmptyArray } from "../../../utils";
import TableEmpty from "../molecules/TableEmpty";
import TableHeadsOportunities from "../molecules/TableHeadsOportunities";
import { formatDate } from "../../../utils";
const TableProspects = ({
  heads,
  data,
  identificador,
  selectmultiple,
  deleteItem,
  actionsPerItem,
  actionsItemsSelect,
  custom,
  primaryColor,
  secondaryColor,
  order,
  keyStorage,
  actionOrder,
  actionPerColum,
}) => {
  const [isLoadingTable, setIsLoadingTable] = useState(true);
  const [headsCell, setHeadsCell] = useState([]);
  const [orderBy, setorderBy] = useState("");
  const [headersActives, setheadersActives] = useState([]);
  const [openSettings, setopenSettings] = useState(false);
  const [itemsSelect, setitemsSelect] = useState([]);
  const [showOptionsItem, setShowOptionsItem] = useState(null);
  const [elementSelect, setelementSelect] = useState({});
  const openActionItem = Boolean(showOptionsItem);
  const [showOptionsSelect, setShowOptionsSelect] = useState(null);
  const openActionsSelect = Boolean(showOptionsSelect);

  //Handle Events
  const actionsItemsSelectShow = (event) => setShowOptionsSelect(event.currentTarget);
  const handleCloseActionSelects = () => setShowOptionsSelect(null);
  const handleCloseSettings = () => setopenSettings(!openSettings);

  const handleClickActionItem = (event, element) => {
    setShowOptionsItem(event.currentTarget);
    setelementSelect(element);
  };

  const handleCloseActionItem = () => {
    setShowOptionsItem(null);
    setelementSelect({});
  };

  useEffect(() => {
    normalizeHeads();
  }, [heads]);

  const backgroundInParRow = (number) => (number % 2 == 0 ? true : false);

  const normalizeHead = (head, index, identifier) => ({
    text: head,
    show: manualHide(head),
    position: index + 1,
    identifier,
  });

  const manualHide = (head) => {
    if (head === "id") return false;
    if (head === "prospectId") return false;
    return true;
  };

  const normalizeHeads = () => {
    setIsLoadingTable(true);

    if (data.length <= 0) return setIsLoadingTable(false);

    let rowHead = Object.keys(data[0]);
    let headersCustom = heads.map((head, index) => normalizeHead(head, index, rowHead[index]));
    saveInLocalStorage(headersCustom);
    setIsLoadingTable(false);
  };

  const saveInLocalStorage = (headersCustom) => {
    if (!custom) {
      setHeadsCell(headersCustom);
      setIsLoadingTable(false);
      return;
    }

    let headsSaveInStorage = localStorage.getItem(keyStorage);
    let storage = headsSaveInStorage ? JSON.parse(headsSaveInStorage).length : 0;
    let headersLocal = headersCustom.length;
    if (headsSaveInStorage && storage == headersLocal) {
      setHeadsCell(JSON.parse(headsSaveInStorage));
      setIsLoadingTable(false);
    } else {
      localStorage.setItem(keyStorage, JSON.stringify(headersCustom));
      setHeadsCell(headersCustom);
      setIsLoadingTable(false);
    }
  };

  // * Cambio de estado para mostrar las cabeceras
  const activeHead = (head) => {
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
    setHeadsCell(headersActives);
    setopenSettings(!openSettings);
  };

  const restoreValuesTable = () => {
    let headersCustom = [];
    let rowHead = Object.keys(data[0]);
    for (let i = 0; i < heads.length; i++) {
      const element = heads[i];
      let obj = {
        text: element,
        show: element == "id" ? false : true || element == "prospectId" ? false : true,
        position: i + 1,
        identifier: rowHead[i],
      };
      headersCustom.push(obj);
    }
    setHeadsCell(headersCustom);
    localStorage.setItem(keyStorage, JSON.stringify(headersCustom));
    setopenSettings(!openSettings);
  };

  // * Order de la tabla
  const handleChangeOrder = (order) => {
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
  const checkedItemAll = (checked) => {
    if (checked) {
      setitemsSelect(data);
    } else {
      setitemsSelect([]);
    }
  };

  // * validador de seleccion
  const validateCheck = (item) => {
    let validate = itemsSelect.filter((i) => i.id == item.id);
    if (validate.length > 0) {
      return true;
    } else {
      return false;
    }
  };
  if (isLoadingTable) {
    return (
      <div>
        <CircularProgress size={10} style={{ marginRight: 5 }} color="primary" />
        <p style={{ fontSize: 14, fontWeight: "500" }}>Pintando tabla...</p>
      </div>
    );
  }

  return (
    <StyledTableCustom primaryColor={primaryColor} secondaryColor={secondaryColor}>
      {selectmultiple && (
        <MultipleSelect
          itemsSelect={itemsSelect}
          setitemsSelect={setitemsSelect}
          deleteItem={deleteItem}
          actionsItemsSelect={actionsItemsSelect}
          showOptionsSelect={showOptionsItem}
          openActionsSelect={openActionsSelect}
          actionsItemsSelectShow={actionsItemsSelectShow}
          handleCloseActionSelects={handleCloseActionSelects}
        />
      )}

      {isEmptyArray(data) && <TableEmpty heads={heads} />}

      {!isEmptyArray(data) && (
        <div className={itemsSelect.length > 0 ? "translate table" : "table"}>
          <table className="ctr_table">
            <TableHeadsOportunities
              data={data}
              keyStorage={keyStorage}
              headsCell={headsCell}
              custom={custom}
              itemsSelect={itemsSelect}
              order={order}
              handleChangeOrder={handleChangeOrder}
              orderBy={orderBy}
              setheadersActives={setheadersActives}
              setopenSettings={setopenSettings}
              openSettings={openSettings}
              identificador={identificador}
              selectmultiple={selectmultiple}
            />
            <tbody className="ctr_table__body">
              {data.map((item, index) => {
                let cell = Object.values(item);
                let keyCell = Object.keys(item);
                return (
                  <tr key={index} className={!item.viewed ? (backgroundInParRow(index) ? "row" : "row inpar") : `new_row ${backgroundInParRow(index) ? "row" : "row inpar"}`}>
                    {headsCell.map((i, ix) => {
                      if (i.identifier == identificador) {
                        return (
                          <td className="data fixed" key={ix}>
                            <p className="ctr_td">
                              {selectmultiple && <FormControlLabel control={<Checkbox checked={validateCheck(item)} size="small" onChange={(e) => checkedItem(e.target.checked, item)} />} />}
                              <span className="span" onClick={() => actionPerColum?.active && actionPerColum?.action(item)}>
                                {cell[ix]}
                                {/* {!item.viewed && <span className="badge">Nuevo</span>} */}
                              </span>
                            </p>
                          </td>
                        );
                      }
                    })}
                    {headsCell.map((i, ix) => {
                      if (i.show && i.identifier !== identificador) {
                        return (
                          <td className="data" key={ix}>
                            {typeof cell[ix] !== "object" && (
                              <p className="ctr_td">
                                {keyCell[ix]?.includes("correo") || (keyCell[ix]?.includes("email") && <MailOutline fontSize="small" className="icon_mail" />)}
                                {keyCell[ix]?.includes("phone") || (keyCell[ix]?.includes("movil") && <Smartphone fontSize="small" className="icon_phone" />)}
                                {keyCell[ix]?.includes("telefono") && cell[ix] !== "" && <CallOutlined fontSize="small" className="icon_telefono" />}
                                {!cell[ix] ? <span>N/A</span> : cell[ix]}
                              </p>
                            )}
                          </td>
                        );
                      }
                    })}
                    <td className="data options-td">
                      <div>
                        <div className="options" aria-controls="fade-menu" aria-haspopup="true" onClick={(e) => handleClickActionItem(e, item)}>
                          <MoreVert />
                        </div>
                        <StyledMenu id="fade-menu" anchorEl={showOptionsItem} keepMounted open={openActionItem} onClose={handleCloseActionItem} TransitionComponent={Fade}>
                          <div className="ctr_options">
                            {actionsPerItem.map((action, ia) => {
                              return (
                                <div
                                  key={ia}
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
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                    className={backgroundInParRow(index) ? "ctr_dialog__list_headers__ctr_head" : "ctr_dialog__list_headers__ctr_head inpar"}
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

export default TableProspects;

const StyledTableCustom = styled.div`
  width: 100%;
  position: relative;
  background-color: #fff;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  .table {
    width: 100%;
    max-height: 70vh;
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
        background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};

        padding: 5px 10px;
        height: 40px;
        .checkbox {
          position: sticky;
          left: 0;
          display: flex;
          flex-direction: row;
          align-items: center;
          padding: 3px 5px;
          background-color: ${({ primaryColor }) => (primaryColor ? primaryColor : "#d81b60")};
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
            min-width: 150px;
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
          background-color: ${({ secondaryColor }) => (secondaryColor ? secondaryColor : "#f8bbd0")};
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
            .span {
              width: 100%;
              vertical-align: center;
              /* background: #000; */
              cursor: pointer;
              position: relative;
              .badge {
                position: absolute;
                font-size: 8px;
                font-weight: bold;
                letter-spacing: 0.03em;
                top: -5px;
                background: #d3e3fd;
                padding: 1px 5px;
                border-radius: 15px;
              }
            }
            .icon_mail {
              color: green;
              width: 20px;
              height: 15px;
            }
            .icon_phone {
              color: #f50;
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
          .capitalize {
            text-transform: capitalize;
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
        background: #f9f9f9;
        .fixed {
          background: #f9f9f9;
        }
        .options-td {
          background: #f9f9f9;
        }
      }
      .new_row {
        background: #e5efff;

        position: relative;
        .fixed {
          background: #e5efff;
          &::before {
            top: 4px;
            left: 0px;
            width: 5px;
            bottom: 4px;
            content: "";
            position: absolute;
            background: #d3e3fd;
          }
          /* &::after {
            top: 4px;
            right: 0px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            content: "";
            position: absolute;
            background: #103c82;
          } */
        }
        .options-td {
          background: #e5efff;
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
      }
      p {
        text-align: center;
        color: #8a8a8a;
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
          background: #fae0e9;
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
  .MuiPaper-elevation8 {
    box-shadow: 0px 5px 5px -3px rgb(0 0 0 / 9%), 0px 8px 10px 1px rgb(0 0 0 / 1%), 0px 3px 5px 2px rgb(0 0 0 / 5%);
  }

  .ctr_options {
    display: flex;
    flex-direction: column;
    &__item {
      padding: 10px;
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
