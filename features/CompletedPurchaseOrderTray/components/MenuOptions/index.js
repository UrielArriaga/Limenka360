import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import styled from "styled-components";
import useAlertToast from "../../../../hooks/useAlertToast";
const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
    padding: 3,
  },
})(props => (
  <Menu
    elevation={0}
    style={{
      marginLeft: "-170px",
      marginTop: "30px",
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

  p {
    font-size: 12px;
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
  orderSelected,
}) {
  const { showAlertWarning } = useAlertToast();
  return (
    <div>
      <IconButton
        onClick={e => (!disabled ? handleMenuOpen(e) : showAlertWarning("Agregue productos en la orden en EDITAR"))}
        style={{
          padding: 0,
          margin: 0,
          color: disabled ? "gray" : "#000",
        }}
      >
        <MoreVert />
      </IconButton>

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
              item?.action(item, orderSelected);
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
