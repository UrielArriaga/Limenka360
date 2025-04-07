import { IconButton } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { colors } from "../../../styles/global.styles";
const CustomLeft = ({ onClick, ...rest }) => {
  return (
    <IconButton
      onClick={() => onClick()}
      size="small"
      style={{
        position: "absolute",
        right: 40,
        bottom: 5,
        backgroundColor: colors.primaryColor,
        width: 25,
        height: 25,
        // opacity: 0.7,
      }}
    >
      <KeyboardArrowLeft style={{ color: "#ffff" }} />
    </IconButton>
  );
};

export default CustomLeft;
