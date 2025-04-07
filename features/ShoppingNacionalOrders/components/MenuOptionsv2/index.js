// import { IconButton, Menu, MenuItem } from "@material-ui/core";
// import { MoreVert } from "@material-ui/icons";
// import React from "react";

// export default function MenuOptions({ handleMenuOpen, anchorEl, handleMenuClose, options }) {
//   const handleItemClick = action => {
//     handleMenuClose();
//     if (action) {
//       action();
//     }
//   };

//   return (
//     <div>
//       <IconButton
//         onClick={handleMenuOpen}
//         style={{
//           padding: 0,
//           margin: 0,
//           color: "#000",
//         }}
//       >
//         <MoreVert />
//       </IconButton>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//         anchorOrigin={{
//           vertical: "bottom", // Desde la parte superior del botón
//           horizontal: "left", // Desde el lado izquierdo del botón
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right", // Hace que el menú se alinee desde su lado derecho, hacia el ancla en la izquierda
//         }}
//       >
//         {options?.map((item, index) => (
//           <MenuItem key={index} onClick={() => handleItemClick(item?.action)}>
//             {item.label}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }

import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import { IconButton } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
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

// const StyledMenuItem = withStyles(theme => ({
//   root: {
//     // padding: 0,
//     // "&:focus": {
//     //   backgroundColor: theme.palette.primary.main,
//     //   "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
//     //     color: theme.palette.common.white,
//     //   },
//     // },
//   },
// }))(MenuItem);

// const StyledMenu = styled(Menu)`
//   padding: 0;
//   padding-top: 0;
//   .MuiPaper-root {
//     /* border: 1px solid #d3d4d5; */
//     padding-top: 0;
//     padding: 0;
//     margin: 0;
//   }
// `;

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

export default function MenuOptions({ handleMenuOpen, anchorEl, handleMenuClose, options, disabled = false }) {
  // const [anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = event => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  return (
    <div>
      {/* <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="contained"
        color="primary"
        onClick={handleMenuOpen}
      >
        Open Menu
      </Button> */}

      <IconButton
        onClick={e => {
          if (!disabled) {
            handleMenuOpen(e);
          }
        }}
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
              item?.action(item);
              handleMenuClose();
            }}
          >
            <div style={{ width: 170 }}>
              <p>{item.label}</p>
            </div>
          </StyledMenuItem>
        ))}

        {/* <StyledMenuItem>
          <div style={{ width: 170 }}>
            <p>En fabricacion</p>
          </div>
        </StyledMenuItem>
        <StyledMenuItem>
          <div className="child" style={{ width: 170 }}>
            <p>En proceso de compra</p>
          </div>
        </StyledMenuItem>
        <StyledMenuItem>
          <div style={{ width: 170 }}>
            <p>Comprado</p>
          </div>
        </StyledMenuItem>

        <StyledMenuItem>
          <div style={{ width: 170 }}>
            <p>Entregado</p>
          </div>
        </StyledMenuItem>

        <StyledMenuItem>
          <div style={{ width: 170 }}>
            <p>Proveedor envia</p>
          </div>
        </StyledMenuItem> */}
      </StyledMenu>
    </div>
  );
}
