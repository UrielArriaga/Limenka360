import { IconButton, Tooltip } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { MoreVert } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    padding: 3,
  },
})(props => (
  <Menu
    elevation={0}
    style={{
      marginLeft: "-0px",
      marginTop: "12px",
    }}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
));
const StyledMenuItem = styled(MenuItem)`
  .MuiListItem-root {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
    &:hover {
      background-color: red !important;
    }
  }

  &:hover {
    background-color: #039be5 !important;
    color: #fff; /* Cambia esto al color que prefieras */
  }
`;

export default function MenuOptions({
  handleMenuOpen,
  anchorEl,
  handleMenuClose,
  options,
  disabled = false,
  title = "Cambiar estatus",
  rightIcon = null,
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          // border: "1px solid #e0e0e0",
          padding: 10,
        }}
        onClick={e => {
          if (!disabled) {
            handleMenuOpen(e);
          }
        }}
      >
        <p
          style={{
            color: "##616161",

            fontSize: 13,
          }}
        >
          {title}
        </p>

        {rightIcon !== null && <div style={{}}>{rightIcon}</div>}
      </div>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {options?.map((item, index) => (
          <StyledMenuItem
            key={index}
            onClick={() => {
              item?.action(item);
              handleMenuClose();
            }}
          >
            <div style={{ width: 170 }}>
              <p>{item.label}</p>
            </div>
          </StyledMenuItem>
        ))}
      </StyledMenu>
    </div>
  );
}
