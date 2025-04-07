import React, { useCallback } from "react";
import { Stack, IconButton, Tooltip } from "@mui/material";
import { AssignmentTurnedIn, Notifications, Visibility } from "@material-ui/icons";

const IconMenu = ({ options }) => {
  const getIcon = useCallback(label => {
    switch (label) {
      case "Ver":
        return <Visibility />;
      case "Listo":
      case "Mayor":
      case "Asignar":
        return <AssignmentTurnedIn />;
      case "Notificar":
        return <Notifications />;
      default:
        return null;
    }
  }, []);

  return (
    <Stack direction="row" spacing={1}>
      {options.map((option, index) => (
        <Tooltip key={index} title={option.label}>
          <IconButton
            onClick={option.action}
            color="primary"
            aria-label={option.label}
            sx={{
              background: "linear-gradient(to right, #1565C0, #1A237E)",
              color: "#fff",
              width: 28,
              height: 28,
              borderRadius: "28%",
              "&:hover": {
                transform: "scale(1.1)",
              },
              "& .MuiSvgIcon-root": {
                fontSize: 18 /* Tamaño del icono */,
              },
            }}
          >
            {getIcon(option.label)}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default IconMenu;
