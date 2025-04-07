
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
      marginLeft: "-90px",
      marginTop: "22px",
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

export default function MenuOptions({ handleMenuOpen, anchorEl, handleMenuClose, options, disabled = false }) {
  return (
    <div>
      <Tooltip title="Acciones" placement="top">
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
      </Tooltip>

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
//       <IconButton onClick={handleMenuOpen}>
//         <MoreVert />
//       </IconButton>
//       <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//         {options?.map((item, index) => (
//           <MenuItem key={index} onClick={() => handleItemClick(item?.action)}>
//             {item.name}
//           </MenuItem>
//         ))}
//       </Menu>
//     </div>
//   );
// }
