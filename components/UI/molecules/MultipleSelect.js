import { Fade, Menu } from "@material-ui/core";
import { Delete, MoreVert } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
export default function MultipleSelect(props) {
  const { openActionsSelect, actionsItemsSelectShow, itemsSelect, setitemsSelect, deleteItem, actionsItemsSelect, showOptionsSelect, handleCloseActionSelects } = props;
  return (
    <div className={itemsSelect.length > 0 ? "ctr_items_select" : "ctr_items_select hiddenSelect"}>
      <div className="ctr_items_select__total">
        <p className="total_number">{itemsSelect.length}</p>
        <span className="span">Seleccionados</span>
      </div>
      <div className="ctr_items_select__actions">
        {deleteItem.active && (
          <div
            className="delete"
            onClick={() => {
              deleteItem.action(itemsSelect);
              setitemsSelect([]);
            }}
          >
            <Delete />
          </div>
        )}
        <div>
          <div className="options" aria-controls="fade-menu" aria-haspopup="true" onClick={actionsItemsSelectShow}>
            <MoreVert />
          </div>
          <StyledMenu id="fade-menu" anchorEl={showOptionsSelect} keepMounted open={openActionsSelect} onClose={handleCloseActionSelects} TransitionComponent={Fade}>
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
      </div>
    </div>
  );
}

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
