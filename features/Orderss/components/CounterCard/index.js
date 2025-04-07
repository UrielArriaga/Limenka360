import React from "react";
import { CardStyle } from "./style";
import { DataUsage } from "@material-ui/icons";
import NumberFormat from "react-number-format";
import { Skeleton } from "@material-ui/lab";

export default function Card({ icon = <DataUsage />, title = "", count = null, color = "#000" }) {
  return (
    <CardStyle stylecolor={color}>
      <div className="header">
        {icon}
        <p className="title">{title}</p>
      </div>
      {count !== null && count !== undefined ? (
        <NumberFormat className="count" displayType="text" value={count} thousandSeparator="," />
      ) : (
        <Skeleton variant="text" animation="wave" width={40} height={31} />
      )}
    </CardStyle>
  );
}
