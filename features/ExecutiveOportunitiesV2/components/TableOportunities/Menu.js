import { IconButton, Menu, MenuProps, Tooltip } from "@material-ui/core";
import styled from "styled-components";

import React from "react";

import { FiberManualRecord, MoreVert } from "@material-ui/icons";

export default function MenuActions({ keys, rowItem, options, pm, typeActions = "default" }) {
  const [anchorActions, setAnchorActions] = React.useState(null);
  const openActionsRow = Boolean(anchorActions);

  switch (typeActions) {
    case "button":
      return (
        <div key={keys}>
          {options.map((action, index) => (
            <button key={index} onClick={() => action.action(row)}>
              {action.icon && action.icon}
              {action.name}
            </button>
          ))}
        </div>
      );
    case "icon":
      return (
        <td className="tableData" key={keys}>
          <div
            className=" tableDataActions"
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {options.map((action, index) => (
              <Tooltip key={index} title={action.name} style={{ marginRight: 5 }}>
                <IconButton
                  size="small"
                  onClick={e => {
                    e.stopPropagation();
                    action.action(rowItem);
                  }}
                >
                  {action.icon ? action.icon : <FiberManualRecord />}
                </IconButton>
              </Tooltip>
            ))}
          </div>
        </td>
      );
    default:
      return (
        <td className="tableData" key={keys}>
          <div className=" tableDataActions">
            <div
              aria-controls="fade-menu"
              aria-haspopup="true"
              className="content__icon"
              onClick={e => {
                e.stopPropagation();
                setAnchorActions(e.currentTarget);
              }}
            >
              <MoreVert />
            </div>
          </div>

          <StyledMenu
            // primaryColor={pm}
            id="fade-menu"
            anchorEl={anchorActions}
            keepMounted
            open={Boolean(anchorActions)}
            onClose={e => {
              e.stopPropagation();
              setAnchorActions(null);
            }}
          >
            {options?.map((option, index) => {
              return (
                <div
                  key={index}
                  className={`options__option ${option.disable ? "disable" : ""}`}
                  onClick={e => {
                    e.stopPropagation();
                    if (!option.disable) {
                      option.action && option.action(rowItem);
                      setAnchorActions(null);
                    }
                  }}
                >
                  <p>
                    {option.icon}
                    {option.name}
                  </p>
                </div>
              );
            })}
          </StyledMenu>
        </td>
      );
      break;
  }
  return (
    <td className="tableData">
      <div className=" tableDataActions">
        <div
          aria-controls="fade-menu"
          aria-haspopup="true"
          className="content__icon"
          onClick={e => {
            e.stopPropagation();
            setAnchorActions(e.currentTarget);
          }}
        >
          <MoreVert />
        </div>
      </div>

      <StyledMenu
        primaryColor={pm}
        id="fade-menu"
        anchorEl={anchorActions}
        keepMounted
        open={Boolean(anchorActions)}
        onClose={e => {
          setAnchorActions(null);
          e.stopPropagation();
        }}
      >
        {options?.map((option, index) => {
          return (
            <div
              key={index}
              className={`options__option ${option.disable ? "disable" : ""}`}
              onClick={() => {
                if (!option.disable) {
                  option.action(rowItem);
                  setAnchorActions(null);
                }
              }}
            >
              <p>
                {option.icon}
                {option.name}
              </p>
            </div>
          );
        })}
      </StyledMenu>
    </td>
  );
}

const renderActions = (type, row, actions) => {
  switch (type) {
    case "button":
      return (
        <div>
          {actions.map((action, index) => (
            <button key={index} onClick={() => action.action(row)}>
              {action.icon && action.icon}
              {action.name}
            </button>
          ))}
        </div>
      );
    case "icon":
      return (
        <div>
          {actions.map((action, index) => (
            <Tooltip title={action.name} key={action}>
              <IconButton key={index} size="small" onClick={() => action.action(row)}>
                {action.icon && action.icon}
              </IconButton>
            </Tooltip>
          ))}
        </div>
      );
    default:
      return actions.map((action, index) => (
        <button key={index} onClick={() => action.action(row)}>
          {action.icon && action.icon}
          {action.name}
        </button>
      ));
  }
};

export const StyledMenu = styled(Menu)`
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
        align-items: center;
        color: #000;
        text-transform: capitalize;
        font-weight: 500;
        font-size: 16px;
      }

      svg {
        color: ${props => props?.primaryColor};
        margin-right: 5px;
        font-size: 15px;
      }
      &:hover {
        transition: all 0.3s ease;
        background-color: ${props => props?.colors?.thridColor};
        cursor: pointer;
      }
    }
    .disable {
      &:hover {
        background: none;
        cursor: not-allowed;
      }
    }
  }
`;
