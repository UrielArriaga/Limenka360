import React from "react";
import { TableHeadColumn, TableHeadIdColumn } from "./styles";

export default function TableHeadComponent({ item, id, position }) {
  if (position === 0) {
    return <TableHeadIdColumn>{item}</TableHeadIdColumn>;
  } else if (item.showColumn) {
    return (
      <TableHeadColumn>
        <div>{item}</div>
      </TableHeadColumn>
    );
  } else
    return (
      <TableHeadColumn>
        <div>{item}</div>
      </TableHeadColumn>
    );
}
