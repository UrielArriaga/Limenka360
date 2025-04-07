import { TableCell, withStyles } from "@material-ui/core";
import React from "react";

export default function StyledTableCell({ value }) {
  return <StyledCell>{value}</StyledCell>;
}

const StyledCell = withStyles((theme) => ({
  head: {
    // backgroundColor: colors.primaryColor,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
