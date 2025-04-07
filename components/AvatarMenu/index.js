import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useDispatch } from "react-redux";
import { clearState } from "../../redux/slices/userSlice";
import { useRouter } from "next/router";


const accountRoutes = {
  administrador_de_almacen: "/administracionalmacen/micuenta",
  encargadoentradas: "/encargadoentradas/micuenta",
  encargadosalidas: "/encargadosalidas/micuenta",
  jefedepiso: "/jefedepiso/micuenta",
  areabiomedica: "/biomedica/micuenta",
  administrador_logistica: "/administracionlogistica/micuenta",
  logistica: "/logistica/micuenta",
  director_de_logistica: "/directorlogistica/micuenta",
};

const AvatarMenu = ({ role }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleMouseEnter = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseSession = () => {
    dispatch(clearState());
    handleClose();
  };

  // const handleMyAccount = () => {
  //   router.push(`/administracionalmacen/micuenta`);

  //   handleClose();
  // };

  const handleMyAccount = () => {
    const normalizedRole = role?.toLowerCase().replace(/\s+/g, '_');
    const route = accountRoutes[normalizedRole] || "/default_route";
    router.push(route);
    handleClose();
  };
  



  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ display: "inline-block" }} // Asegura que el contenedor sea inline-block
    >
      <Avatar sizes="small">:D</Avatar>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        getContentAnchorEl={null} // Asegura que el anclaje sea correcto
        style={{ whiteSpace: "nowrap" }} // Evita el cambio a vertical
      >
        <MenuItem onClick={handleMyAccount}>
          <ListItemIcon>
            <AccountCircleIcon fontSize="small" />
          </ListItemIcon>
          Mi Cuenta
        </MenuItem>
        <MenuItem onClick={handleCloseSession}>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </div>
  );
};

export default AvatarMenu;
