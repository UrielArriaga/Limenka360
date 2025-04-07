import { Avatar, Box, Dialog } from "@material-ui/core";
import { Delete, Group, MoreVert, Person, Restore, SettingsOutlined } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setEjecutiveSelectedG } from "../../../../redux/slices/dashboardManager";
import { api, URL_SPACE } from "../../../../services/api";
import { DialogAlert } from "../../../../styles/Herramientas/metas.styles";
import { formatNumber, handleAlert, handleGlobalAlert, validNullData } from "../../../../utils";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import ProgressGoal from "../../molecules/ProgressGoal";
import TableDataBody from "../../molecules/TableDataBody";
import TableHeadComponent from "../../molecules/TableHeadComponent";
import TableEmpty from "../TableEmpty";
import TableLoader from "../TableLoader";
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
import { useEffect } from "react";

export default function DashboardTableCustomers(props) {
  const dispatch = useDispatch();
  const {
    heads,
    id,
    secondaryColor,
    primaryColor,
    data,
    clients,
    refetch,
    setRefetch,
    isLoading,
    type,
    specialitie,
    entities,
  } = props;
  let colors = { secondaryColor, primaryColor };
  const [openAlertDelete, setOpenAlertDelete] = useState(false);
  const [forDeleteGoal, setForDeleteGoal] = useState({});

  const handleClickOpenDialog = goal => {
    setOpenAlertDelete(true);
    setForDeleteGoal(goal);
  };

  const handleAlertClose = () => {
    setOpenAlertDelete(false);
  };

  const handleClickDialogDelete = async () => {
    try {
      await api.delete(`ejecutivesgoals/${forDeleteGoal.id}`);
      setRefetch(!refetch);
      setOpenAlertDelete(false);
    } catch (error) {
      handleErrorDelete();
    }
  };

  const handleErrorDelete = () => {
    handleGlobalAlert("error", "Ocurrio un problema - No tienes permiso para eliminar", "basic", dispatch);
    handleAlertClose();
  };

  if (isLoading) {
    return <TableLoader heads={heads} rows={5} {...colors} />;
  }

  // if (data.length <= 0) {
  //   return <TableEmpty heads={heads} rows={10} {...colors} message="No hay ejecutivos" />;
  // }

  const validPhoto = photo => (photo ? URL_SPACE + photo : "");

  const RenderContent = () => {
    switch (type) {
      case "byclientypes":
        return (
          <TableBody>
            {clients?.map((item, index) => {
              return (
                <TableRowBody key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="column-id flex">
                      <Avatar src={validPhoto(item.photo)} alt={item.name} className="img">
                        {item.name?.charAt(0)}
                        {item.lastname?.charAt(0)}
                      </Avatar>
                      <p className="name">
                        <p>
                          {item?.name} {item?.lastname}
                        </p>
                      </p>
                    </div>
                  </TableDataId>
                  <TableData>
                    <div>
                      <p>{item.clienttype?.name}</p>
                    </div>
                  </TableData>

                  <TableData>
                    <div>
                      <p>{item?.phone}</p>
                    </div>
                  </TableData>
                  <TableData>
                    <div>
                      <p className="email">
                        <p>{item?.email}</p>
                      </p>
                    </div>
                  </TableData>
                  <TableDataSettingsColumn {...colors} isPar={index % 2 == 0} className="settings">
                    <div></div>
                  </TableDataSettingsColumn>
                </TableRowBody>
              );
            })}
          </TableBody>
        );

      case "byespecialities":
        return (
          <TableBody>
            {specialitie?.map((item, index) => {
              return (
                <TableRowBody key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="column-id flex">
                      <Avatar alt={item.name} className="img">
                        {item.name?.charAt(0)}
                        {item.lastname?.charAt(0)}
                      </Avatar>
                      <p className="name">
                        <p>
                          {item?.name} {item?.lastname}
                        </p>
                      </p>
                    </div>
                  </TableDataId>

                  <TableData>
                    <div>
                      <p>{item.specialty?.name ? item.specialty?.name : "N/A"}</p>
                    </div>
                  </TableData>
                  <TableData>
                    <div>
                      <p>{item?.phone}</p>
                    </div>
                  </TableData>
                  <TableData>
                    <div>
                      <p className="email">
                        <p>{item?.email}</p>
                      </p>
                    </div>
                  </TableData>
                  <TableDataSettingsColumn {...colors} isPar={index % 2 == 0} className="settings">
                    <div></div>
                  </TableDataSettingsColumn>
                </TableRowBody>
              );
            })}
          </TableBody>
        );

      case "byEntitie":
        return (
          <TableBody>
            {entities?.map((item, index) => {
              return (
                <TableRowBody key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="column-id flex">
                      <Avatar alt={item.name} className="img">
                        {item.name?.charAt(0)}
                        {item.lastname?.charAt(0)}
                      </Avatar>
                      <p className="name">
                        <p>
                          {item?.name} {item?.lastname}
                        </p>
                      </p>
                    </div>
                  </TableDataId>

                  <TableData>
                    <div>
                      <p>{item.entity?.name}</p>
                    </div>
                  </TableData>
                  <TableData>
                    <div>
                      <p>{item?.phone}</p>
                    </div>
                  </TableData>
                  <TableData>
                    <div>
                      <p className="email">
                        <p>{item?.email}</p>
                      </p>
                    </div>
                  </TableData>
                  <TableDataSettingsColumn {...colors} isPar={index % 2 == 0} className="settings">
                    <div></div>
                  </TableDataSettingsColumn>
                </TableRowBody>
              );
            })}
          </TableBody>
        );

      case "bysales":
        return (
          <TableBody>
            {data?.map((item, index) => {
              const { prospect } = item;
              return (
                <TableRowBody key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="column-id flex">
                      <Avatar src={validPhoto(item.photo)} alt={item.name} className="img">
                        {prospect?.name?.charAt(0)}
                        {prospect?.lastname?.charAt(0)}
                      </Avatar>
                      <p className="name">
                        <p>
                          {prospect?.name} {prospect?.lastname}
                        </p>
                      </p>
                    </div>
                  </TableDataId>

                  <TableData>
                    <div>
                      <p className="email">
                        <p>{prospect?.email}</p>
                      </p>
                    </div>
                  </TableData>
                  <TableData>
                    <div>
                      <p>{formatNumber(prospect?.totalsales)}</p>
                    </div>
                  </TableData>
                  <TableDataSettingsColumn {...colors} isPar={index % 2 == 0}>
                    <div></div>
                  </TableDataSettingsColumn>
                </TableRowBody>
              );
            })}
          </TableBody>
        );

      case "bygoals":
        return (
          <TableBody>
            {data.map((item, index) => {
              return (
                <TableRowBody key={index} isPar={index % 2 == 0}>
                  <TableDataId isPar={index % 2 == 0}>
                    <div className="column-id flex">
                      {item?.ejecutive ? (
                        <div className="flex">
                          <Avatar alt={item.name} className="img">
                            {<item className="ejecutive"></item>}
                            {item.ejecutive?.name?.charAt(0)}
                            {item.ejecutive?.lastname?.charAt(0)}
                          </Avatar>
                          <p className="name">
                            {item.ejecutive?.name} {validNullData(item?.ejecutive?.lastname, "")}
                          </p>
                        </div>
                      ) : (
                        <div className="flex">
                          <Group className="group" />
                          <p className="name">{item.group?.name}</p>
                        </div>
                      )}
                      <p className="email">{item.ejecutive?.email}</p>
                      {/* <Avatar alt={item.name} className="img">
                        {item.name?.charAt(0)}
                        {item.lastname?.charAt(0)}
                      </Avatar>
                      <p className="name">
                        <p>
                          {item.name} {item?.lastname}
                        </p>
                      </p> */}
                    </div>
                  </TableDataId>

                  <TableData>
                    <div className="goaltotal">
                      <p>{formatNumber(item.progress?.toFixed(2))}</p>
                      <p className="divider"> de </p>
                      <p>{formatNumber(item?.finalgoal?.toFixed(2))}</p>
                    </div>
                  </TableData>

                  <TableData>
                    <div>
                      <ProgressGoal item={item} />
                    </div>
                  </TableData>

                  <TableDataSettingsColumn {...colors} isPar={index % 2 == 0}>
                    <div>
                      <div className="content">
                        <div
                          aria-controls="fade-menu"
                          aria-haspopup="true"
                          className="content__icon"
                          onClick={e => handleClickOpenDialog(item)}
                        >
                          <Delete />
                        </div>
                      </div>
                    </div>
                  </TableDataSettingsColumn>
                </TableRowBody>
              );
            })}
          </TableBody>
        );

      default:
        return null;
    }
  };

  return (
    <TableComponentStyled>
      <Table>
        <TableHead>
          <TableRowHead {...colors}>
            {heads?.map((item, index) => {
              return <TableHeadComponent key={index} item={item} id={id} {...colors} position={index} />;
            })}
            <TableHeadSettingsColumn {...colors}>
              {/* <SettingsOutlined onClick={() => handleClickSettings()} /> */}
            </TableHeadSettingsColumn>
          </TableRowHead>
        </TableHead>
        <RenderContent />
      </Table>

      <Dialog
        open={openAlertDelete}
        onClose={handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogAlert>
          <p className="title">¿Desea Eliminar la Meta Seleccionada?</p>
          <div className="buttons">
            <button className="buttons__cancel" onClick={() => setOpenAlertDelete(false)}>
              Cancelar
            </button>
            <button className="buttons__accept" onClick={() => handleClickDialogDelete()}>
              Aceptar
            </button>
          </div>
        </DialogAlert>
      </Dialog>
    </TableComponentStyled>
  );
}

// import { Close, Filter, FilterList } from "@material-ui/icons";
// import { motion } from "framer-motion";
// import React from "react";
// import { useEffect } from "react";
// import { useState } from "react";
// import styled from "styled-components";
// import { api } from "../../../../services/api";

// const TableEjecutives = () => {
//   const [showFilters, setShowFilters] = useState(false);
//   const [executives, setExecutives] = useState([]);

//   useEffect(() => {
//     requestExecutives();
//   }, []);

//   const requestExecutives = async () => {
//     try {
//       let params = {};
//       let res = await api.get("ejecutives", { params });
//       setExecutives(res.data.results);
//     } catch (error) {}
//   };

//   // * Handlers
//   const handleClickFilter = (value) => {
//     setShowFilters(value);
//   };
//   return (
//     <EjecutiveComponent>
//       <div className="container">
//         <div className="container__top">
//           <h3>Ejecutivos</h3>

//           <div className="filter">
//             <FiltersContainer
//               animate={{
//                 width: showFilters ? "auto" : 0,
//                 overflow: "hidden",
//                 // visibility: showFilters ? "visible" : "hidden",
//               }}
//             >
//               <select name="" id="">
//                 {optionsExecutives.map((item, index) => {
//                   return (
//                     <option key={index} value={item.value}>
//                       {item.name}
//                     </option>
//                   );
//                 })}
//               </select>
//               <select name="" id="">
//                 {optionsExecutives.map((item, index) => {
//                   return (
//                     <option key={index} value={item.value}>
//                       {item.name}
//                     </option>
//                   );
//                 })}
//               </select>
//             </FiltersContainer>
//             {showFilters ? <Close className="icon_filter" onClick={() => handleClickFilter(false)} /> : <FilterList className="icon_filter" onClick={() => handleClickFilter(true)} />}
//           </div>
//         </div>

//         <div>
//           {executives.map((item, idex) => {
//             return <di>{item.email}</di>;
//           })}
//         </div>
//       </div>
//     </EjecutiveComponent>
//   );
// };

// const EjecutiveComponent = styled.div`
//   background-color: #eeeeee;
//   padding: 10px 10px 10px 10px;
//   border-radius: 8px;

//   .container {
//     &__top {
//       display: flex;
//       justify-content: space-between;
//     }

//     &__top .filter {
//       display: flex;
//       align-items: center;
//       svg {
//         cursor: pointer;
//       }
//     }
//   }
// `;

// const FiltersContainer = styled(motion.div)`
//   display: flex;
//   select {
//     border: none;
//     height: 30px;
//     width: 200px;
//     background-color: #ffff;
//     border-radius: 2px;
//     padding-left: 10px;
//     margin-right: 4px;
//     margin-bottom: 8px;
//     /* border: 2px solid #cfd8dc; */
//     background-color: #ffff;
//     box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

//     &:focus {
//       outline: 1px solid green;
//     }
//   }

//   /* .icon_filter {
//     transition: all 1s ease-in-out;
//   } */
// `;

// export default TableEjecutives;

// const optionsExecutives = [
//   {
//     value: "bysales",
//     name: "Por monto de ventas",
//   },
//   {
//     value: "byclientypes

//     name: "Por Oportunidades",
//   },
//   {
//     value: "bygoals",
//     name: "Por Metas",
//   },
// ];
