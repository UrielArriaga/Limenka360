import styled from "styled-components";
import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TableCell } from "@material-ui/core";

export default function RenderContentRow(props) {
  let { cell } = props;
  return <div>RenderContentRow</div>;
}

const StyledTableCell = withStyles((theme) => ({
  head: {
    // backgroundColor: colors.primaryColor,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
