import { Box, Dialog, LinearProgress } from "@material-ui/core";
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
  StyledMenu,
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableDataId,
  TableDataSettingsColumn,
  TableHead,
  TableHeadSettingsColumn,
  TableRowBody,
  TableRowHead,
} from "./styles";

export default function TableLoader(props) {
  const { heads, id, secondaryColor, primaryColor, rows } = props;
  let colors = { secondaryColor, primaryColor };
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [forDeleteGoal, setForDeleteGoal] = useState({});

  return (
    <TableComponentStyled>
      <div className="ctr_load">
        <div className="ctr_load__img">
          <img src="/load.png" />
        </div>
        <div className="ctr_load__load">
          <p>Cargando</p>
          <LinearProgress color="primary" />
        </div>
      </div>
    </TableComponentStyled>
    // <TableComponentStyled>
    //   <Table>
    //     <TableHead>
    //       <TableRowHead {...colors}>
    //         {heads.map((item, index) => {
    //           return <TableHeadComponent key={index} item={item} id={id} {...colors} position={index} />;
    //         })}
    //         <TableHeadSettingsColumn {...colors}>
    //           {/* <SettingsOutlined onClick={() => handleClickSettings()} /> */}
    //         </TableHeadSettingsColumn>
    //       </TableRowHead>
    //     </TableHead>

    //     <TableBody>
    //       {Array.from(Array(rows).keys()).map((item, index) => {
    //         return (
    //           <TableRowBody key={index} isPar={index % 2 == 0}>
    //             <TableDataId>
    //               <div>
    //                 <Skeleton variant="text" />
    //               </div>
    //             </TableDataId>

    //             <TableData>
    //               <div className="goalType">
    //                 <Skeleton variant="text" />
    //               </div>
    //             </TableData>

    //             <TableData>
    //               <Skeleton variant="text" />
    //             </TableData>
    //             <TableDataSettingsColumn {...colors}>
    //               <div>
    //                 <div className="content">
    //                   <Skeleton variant="text" />
    //                 </div>
    //               </div>
    //             </TableDataSettingsColumn>
    //           </TableRowBody>
    //         );
    //       })}
    //     </TableBody>
    //   </Table>
    // </TableComponentStyled>
  );
}
