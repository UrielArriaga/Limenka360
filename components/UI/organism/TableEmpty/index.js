import { Box, Dialog } from "@material-ui/core";
import { Delete, Group, MoreVert, Person, Restore, SettingsOutlined } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import dayjs from "dayjs";
import React, { useState } from "react";
import { api } from "../../../../services/api";
import { DialogAlert } from "../../../../styles/Herramientas/metas.styles";
import { formatNumber, handleAlert, validNullData } from "../../../../utils";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import ProgressGoal from "../../molecules/ProgressGoal";
import TableDataBody from "../../molecules/TableDataBody";
import TableHeadComponent from "../../molecules/TableHeadComponent";
import {
  CenterNoResults,
  Table,
  TableComponentStyled,
  TableHead,
  TableHeadSettingsColumn,
  TableRowHead,
} from "./styles";

export default function TableEmpty(props) {
  const { heads, id, secondaryColor, primaryColor, rows, message } = props;
  let colors = { secondaryColor, primaryColor };
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [forDeleteGoal, setForDeleteGoal] = useState({});

  return (
    <TableComponentStyled>
      <Table>
        <TableHead>
          <TableRowHead {...colors}>
            {heads.map((item, index) => {
              return <TableHeadComponent key={index} item={item} id={id} {...colors} position={index} />;
            })}
            <TableHeadSettingsColumn {...colors}>
              {/* <SettingsOutlined onClick={() => handleClickSettings()} /> */}
            </TableHeadSettingsColumn>
          </TableRowHead>
        </TableHead>

        {/* <TableBody> */}
        {/* </TableBody> */}
      </Table>
      <CenterNoResults>
        <img src="/empty_table.svg" className="contenido__empty__image" />
        <p className="contenido__empty__title">{message ? message : "Sin resultados"}</p>
      </CenterNoResults>
    </TableComponentStyled>
  );
}
