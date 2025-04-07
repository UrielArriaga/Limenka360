import { IconButton } from "@material-ui/core";
import { KeyboardArrowRight } from "@material-ui/icons";
import React from "react";
import { colors } from "../../../styles/global.styles";

const CustomRightArrow = ({ onClick, ...rest }) => {
  return (
    <IconButton
      onClick={() => onClick()}
      size="small"
      style={{
        position: "absolute",
        right: 10,
        bottom: 5,
        backgroundColor: colors.primaryColor,
        width: 25,
        height: 25,
        // opacity: 0.7,
      }}
    >
      <KeyboardArrowRight style={{ color: "#ffff" }} />
    </IconButton>
  );
};

export default CustomRightArrow;
