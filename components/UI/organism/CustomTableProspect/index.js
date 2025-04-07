import {
  AddAlert,
  ArrowBackIos,
  ArrowForwardIos,
  Check,
  Close,
  CloudDownload,
  Delete,
  Edit,
  Error,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Person,
  RemoveRedEye,
  SettingsOutlined,
  Warning,
} from "@material-ui/icons";
import { Alert as AlertMaterial } from "@material-ui/lab";

import {
  Backdrop,
  Badge,
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  IconButton,
  Modal,
  Tooltip,
} from "@material-ui/core";
import { Checkbox } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";
import Select from "react-select";
import { motion } from "framer-motion";

// import { api, PRODUCTIONMODE } from "../../../services/api";
import { api, PRODUCTIONMODE } from "../../../../services/api";

import {
  changeExecutive,
  changeGroupProspect,
  changePropertyValue,
  deleteValue,
  orderExecutives,
  saveProspectBackup,
  setHeadsImports,
  setProspectsImports,
  setProspectsToSave,
  toogleExecutives,
  useImportsSlice,
} from "../../../../redux/slices/importsSlice";
import { colorLog, handleAlert, isEmpty } from "../../../../utils";

import { origines, tipos, entities, channels, categories } from "../../../../BD/databd";

import { useExecutives } from "../../../../redux/slices/ejecutivosSlice";
import { userSelector } from "../../../../redux/slices/userSlice";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import NavBarDashboard from "../../../NavBarDashboard";
import RouteHistory from "../../../RouteHistory";
import TableCellHeader from "../../molecules/TableCellHeader";

import { colors } from "../../../../styles/global.styles";
// import TableExecutives from "./TableExecutives";
import LoaderCompleteScreen from "../../../LoaderCompleteScreen";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import AlertDialogSlide from "../ModalExcelUpdate";
import {
  Table,
  TableBody,
  TableComponentStyled,
  TableData,
  TableDataId,
  TableDataSettingsColumn,
  TableHead,
  TableHeadColumn,
  TableHeadColumnNames,
  TableHeadIdColumn,
  TableHeadIdColumnNames,
  TableHeadSettingsColumn,
  TableHeadSettingsColumnNames,
  TableRowBody,
  TableRowHead,
  TableRowHeadNames,
} from "./styles";
import { scrollToBottomAnimates } from "../../../../utils/scrollToBottom";
// import AlertDialogSlide from "./ModalExcelUpdate";
import { saveAs } from "file-saver";
import { DialogContainer } from "../../../ModalAddPendings/styles";
import { useForm } from "react-hook-form";
import { type } from "os";

import RequestCommon from "../../../../services/request_Common";
import { SocketContext } from "../../../../context/socketContext";
import { useContext } from "react";

export default function CustomTableProspect({ open, setOpen }) {
  const commonApi = new RequestCommon();
  const { socket, online } = useContext(SocketContext);

  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [confirmClose, setConfirmClose] = useState(false);
  const classes = useStyles();
  const { heads, prospects, showexecutives, prospectsToSave, prospectsToSaveBackup } = useSelector(useImportsSlice);
  const [suceessTable, setSuceessTable] = useState(false);
  const { id_user, userData, email } = useSelector(userSelector);
  const [isSelectProspect, setIsSelectProspect] = useState(false);
  const [selectProspects, setSelectProspects] = useState([]);
  const [groupsAvailable, setgroupsAvailable] = useState([]);
  const [groupSelected, setGroupSelected] = useState({});
  const [executives, setExecutives] = useState([]);
  const [rolesAvailables, setRolesAvailables] = useState([]);
  const [rolesSelected, setRolesSelected] = useState({});
  const [hideExecutives, setHideExecutives] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [countErrors, setCountErrors] = useState([]);
  const [wasUpload, setWasUpload] = useState(false);
  const [countExist, setCountExist] = useState([]);
  const [isValidating, setIsValidating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [categoriesAvailable, setCategoriesAvailable] = useState([]);
  const [flagRequest, setFlagRequest] = useState(false);
  const [origins, setOrigins] = useState([]);
  const [clientTypes, setClientTypes] = useState([]);
  const [channelsState, setChannelsState] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [rowData, setRowData] = useState(undefined);

  const [loadingExport, setLoadingExport] = useState(false);
  const [responseMessage, setResponseMessage] = useState(undefined);

  const [uploadedUsers, setUploadedUsers] = useState([]);

  const [openAddPendings, setOpenAddPendings] = useState(false);
  const [isLoadingCreate, setIsLoadingCreate] = useState(false);

  const [actions, setActions] = useState([]);

  const N = 6;

  const zones = [
    { gmt: "GMT-05:00", zones: ["Quintana Roo"] },
    { gmt: `GMT-0${N}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: false },
    { gmt: `GMT-0${N - 1}:00`, zones: ["México City ", "Monterrey ", "Guadalajara "], summer: true },
    { gmt: `GMT-0${N + 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: false },
    { gmt: `GMT-0${N + 1 - 1}:00`, zones: "Baja California Sur Sinaloa Sonora", summer: true },

    { gmt: `GMT-0${N + 2}:00`, zones: "Baja California", summer: false },
    { gmt: `GMT-0${N + 2 - 1}:00`, zones: "Baja California", summer: true },
  ];

  const [pendingsType, setPendingsType] = useState([]);

  const router = useRouter();
  const dispatch = useDispatch();
  const [todaySaved, setTodaySaved] = useState(new Date());

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  // * COMPONENT MOUNT
  useEffect(() => {
    requestGroups();
    requestExecutives();
    requestCategories();
    requestOrigins();
    requestChannels();
    setTodaySaved(new Date().toISOString().replace(/T/, " ").replace(/\..+/, ""));
    requestClientTypes();
    // requestRoles();
  }, [flagRequest]);

  const cleanForm = () => {
    setValue("subject", "");
    setType("");
    setValue("type", "");
    SetInfoQuote("");
    setPendingQuote(false);
    setValue("cotiza", "");
    setValue("venta", "");
    setValue("pendingSale", "");
    setValue("priority", "");
    setType("Recordatorio");
    setValue("place", "");
    setValue("zone", "");
    setValue("date_from", "");
    setValue("notify_by", "");
    setValue("date_to", "");
    setValue("remember", false);
    setValue("description", "");
    setRemember(false);
    setValue("remember_by", "");
    setNotify(false);
    setValue("notify", false);
  };

  // * REQUESTS

  const requestGroups = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      const responseGroups = await api.get("groups", { params });
      setgroupsAvailable(responseGroups.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const requestCategories = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      const responseGroups = await api.get("categories", { params });

      let categoriesLowerCase = responseGroups.data.results || [];
      setCategoriesAvailable(
        categoriesLowerCase.map((item, index) => ({
          ...item,
          name: item.name.toUpperCase(),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const requestOrigins = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      const responseGroups = await api.get("origins", { params });
      let categoriesLowerCase = responseGroups.data.results || [];
      setOrigins(
        categoriesLowerCase.map((item, index) => ({
          ...item,
          name: item.name.toUpperCase(),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const requestClientTypes = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      const responseGroups = await api.get("clienttypes", { params });
      let categoriesLowerCase = responseGroups.data.results || [];

      let normalize = categoriesLowerCase.map((item, index) => ({
        ...item,
        name: item.name.toUpperCase(),
      }));
      setClientTypes(normalize);
      console.log(normalize);
    } catch (error) {
      console.log(error);
    }
  };

  const requestChannels = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      const responseGroups = await api.get("channels", { params });
      let categoriesLowerCase = responseGroups.data.results || [];
      setChannelsState(
        categoriesLowerCase.map((item, index) => ({
          ...item,
          name: item.name.toUpperCase(),
        }))
      );
    } catch (error) {
      console.log(error);
    }
  };

  const requestExecutives = async () => {
    try {
      let params = {
        all: 1,
        order: "name",
      };
      let responseExecutives = await api.get("ejecutives", { params });
      setExecutives(responseExecutives.data?.results);
      console.log(responseExecutives);
    } catch (error) {
      console.log(error);
    }
  };

  // * FINISH REQUESTS

  // * HANDLERS
  const handleOnChangeSelect = (e, indexHeader, itemhead) => {
    if (e.value === "hidecolumn") {
      hideColumn(e, indexHeader, itemhead);
    }
    if (!prospects[0] || !prospects) return;

    let keysPropsect = Object.keys(prospects[0]);

    console.log(keysPropsect);

    if (keysPropsect.includes(e.value)) {
      // e.preventDefault();
      alert("ya esta incluida");
      return;
    }

    let prospectitos = prospects;
    let changedName = renameJSONProperty(prospectitos, indexHeader, e.value);
    dispatch(setProspectsImports(changedName));
  };

  const handleCheckProspect = (event, value) => {
    console.log(event.target.checked);
    console.log(value);
  };

  const handleGroupChange = (index, prospect, event) => {
    if (Object.keys(prospect).includes("email")) {
      dispatch(changeGroupProspect({ prospect, value: event.value }));
    } else {
    }
  };

  const handleExecutiveChange = (index, prospect, event) => {
    if (prospects.length >= 1) {
      console.log("sigo aqui");
      let properties = Object.keys(prospects[0]);

      if (!properties.includes("email")) {
        console.log(properties);
        handleAlert("error", "Ejecutivo no cambiado,Seleccione columna de correo", "basic", setAlert);
        return;
      }
      dispatch(changeExecutive({ prospect, value: event.value }));
    } else {
    }
  };

  const handleOnChangeVaue = (e, positionColumn, positionRow, property, childProperty) => {
    // dispatch(
    //   changePropertyValue({
    //     position: i,
    //     property: "entityId",
    //     childProperty: "errorSintaxis",
    //     value: e.target.value,
    //   })
    // );

    let headCells = Object.keys(prospects[positionColumn]);
    console.log(headCells[positionColumn]);

    let propertyName = headCells[positionColumn];
    console.log(positionColumn);
    console.log(property);

    console.log(childProperty[propertyName]);

    dispatch(
      changePropertyValue({
        position: positionRow,
        property: propertyName,
        childProperty: "value",
        value: e.target.value,
      })
    );
    console.log(e.target.value);
  };

  const handleClickEditRow = (positionColumn, positionRow, property, childProperty) => {
    let headCells = Object.keys(prospects[positionRow]);
    let propertyName = headCells[positionColumn];

    console.log(propertyName);

    let data = {
      propertyName,
      positionRow,
      childProperty: "value",
      value: property,
    };
    console.log(data);

    // return;

    setRowData(data);

    setOpenModal(true);

    setIsEditing(true);
  };

  // * UTILS
  const hideColumn = (e, indexa, itemparam) => {
    let mutationHeaders = heads.map((item, index) => {
      if (index === indexa) {
        return {
          value: item.value,
          disabled: true,
          type: item.type,
        };
      }
      return item;
    });
    dispatch(setHeadsImports(mutationHeaders));
  };

  const renameJSONProperty = (prospectitos, indexHeader, name) => {
    let final = prospectitos.map((item, index) => {
      let values = Object.keys(item);
      let finalitem = {};
      for (let i = 0; i < values.length; i++) {
        const element = values[i];
        if (i === indexHeader) {
          let currentItem = item[values[indexHeader]];
          finalitem[name] = normalizeProspect(currentItem.value, checkHideColum(name), currentItem.type, currentItem);
          delete finalitem[values[indexHeader]];
        } else {
          finalitem[element] = item[element];
        }
      }
      return finalitem;
    });
    return final;
  };

  const normalizeProspect = (value, disabled, type, currentItem) => ({
    value,
    disabled,
    type,
    ...currentItem,
  });

  const normalizeSelectExecutives = group => {
    if (group) {
      return executives
        .filter(i => i.groupId === group.value)
        .map((item, index) => ({ label: `${item.name} ${item.lastname}  ${item.email}`, value: item.id }));
    }
    return [];
  };

  const checkHideColum = name => (name === "hidecolumn" ? true : false);
  // function formatnewDate(str) {
  //   let date = new Date(str);
  //   return date.toISOString();
  // }
  // TODO: Falta poner alerts
  const handleAddPending = async formData => {
    try {
      console.log("Prospecto", uploadedUsers, "-");

      uploadedUsers.forEach(async (user, index) => {
        if (user.ids?.length === 1) {
          let newPending = {};

          newPending.prospectId = user.ids[0]?.id;

          newPending.status = "1";

          if (user.ids[0]?.isclient == true) {
            newPending.prospectId = user.ids[0]?.id;
            newPending.status = "3";
            newPending.oportunityId = "";
          }
          if (user.ids[0]?.isCloseOut == true) {
            newPending.prospectId = user.ids[0]?.id;
            newPending.oportunityId = user.ids[0]?.id;
            newPending.status = "4";
          }

          ///////////////////////////////////////////////
          newPending.createdbyId = id_user;
          newPending.priority = 2;
          newPending.subject = formData.subject;
          newPending.place = formData.place;
          newPending.pendingstypeId = "62dlUPgKjOpCoDH6wU0sG9rp";
          newPending.zone = formData.zone;
          newPending.description = formData.description;
          newPending.remember = true;
          newPending.remember_by = "correo";
          newPending.notify = true;
          newPending.notify_by = "correo";
          newPending.date_from = todaySaved;

          newPending.ejecutiveId = id_user;

          try {
            let addPending = await api.post(`pendings`, newPending);
            console.log("Addpending", addPending);
            if (addPending.status == 201) {
              console.log(newPending);
              // data.setAlert({ severity: null, show: false, message: null, type: null });
              // data.handleAlert("success", "Pendiente - Creado Correctamente!", "basic");
              setIsLoadingCreate(false);
              let trackingPending = {};

              trackingPending.prospectId = user.ids[0]?.id;
              trackingPending.status = "1";

              if (user.ids[0]?.isclient == true) {
                trackingPending.prospectId = user.ids[0]?.id;
                trackingPending.status = "3";
                trackingPending.oportunityId = "";
              }
              if (user.ids[0]?.isCloseOut == true) {
                trackingPending.prospectId = user.ids[0]?.id;
                trackingPending.oportunityId = user.ids[0]?.id;
                trackingPending.status = "4";
              }
              trackingPending.observations = `Nuevo pendiente asignado como: Alta`;

              let action = {
                companyId: "62dz3qnimTqzfPfKpt7JtOtE",
                createdAt: "2022-08-24T16:16:21.187Z",
                id: "62dEUlcqck7L1f8JvFtRSeoX",
                name: "Recordatorio",
                system: true,
                updatedAt: "2022-08-24T16:16:21.187Z",
              };
              trackingPending.actionId = action.id;
              trackingPending.reason = "Seguimiento automático";
              // trackingPending.phaseId = user.ids[0]?.phaseId;
              trackingPending.createdbyId = id_user;
              await api.post(`trackings`, trackingPending);

              setOpenAddPendings(false);
            }
          } catch (error) {
            console.log("!:C", error);
          }
        }
      });
    } catch (error) {
      // setAlert({ severity: null, show: false, message: null, type: null });
      setIsLoadingCreate(false);
      if (error.response?.config?.url.includes("pendings")) {
        // handleAlert("error", "Pendientes - Error al crear!", "basic");
      }
      console.log(error);
      if (error.response?.config?.url.includes("trackings")) {
        // handleAlert("error", "Seguimiento - Error al crear seguimiento automático!", "basic");
      }
    }
  };

  function removeAccents(str) {
    let lowerCase = str.toLowerCase();
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase();
  }

  // const restartValueInDb = (property,childProperty,value) => {
  //   dispatch(
  //     changePropertyValue({
  //       position: i,
  //       property:property,
  //       childProperty: "errorSintaxis",
  //       value: true,
  //     })
  //   );
  // }
  const handleClosePendings = () => {
    setOpenAddPendings(false);
  };

  const resetExistInBd = () => {
    let cleanProspects = prospects.map((item, index) => ({
      ...item,
      existInDB: false,
    }));

    console.log(cleanProspects);
  };

  const printResult = async () => {
    setCountExist([]);

    // if (prospectsToSaveBackup.length >= 1) {
    //   dispatch(setProspectsImports(prospectsToSaveBackup));
    // }

    let finalProspects = [];
    let errors = [];

    try {
      setIsValidating(true);
      setWasUpload(false);
      for (let i = 0; i < prospects.length; i++) {
        let properties = Object.keys(prospects[i]);

        let itemPropspect = {};
        for (let j = 0; j < properties.length; j++) {
          if (properties[j] === "hidecolumn" || properties[j].length <= 1) {
          } else if (properties[j] === "clientTypeId") {
            let clientValue = clientTypes.filter(
              item =>
                removeAccents(item.name.trim().toLocaleUpperCase()) ==
                removeAccents(prospects[i][properties[j]].value.trim().toLocaleUpperCase())
            );

            if (clientValue.length <= 0 || clientValue == null || clientValue === undefined) {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "clientTypeId",
                  childProperty: "errorSintaxis",
                  value: true,
                })
              );
              errors.push({ row: i + 1, column: "clientTypeId" });
            } else {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "clientTypeId",
                  childProperty: "errorSintaxis",
                  value: false,
                })
              );
            }

            itemPropspect[properties[j]] = clientValue[0]?.id;
          } else if (properties[j] === "phone") {
            itemPropspect[properties[j]] = prospects[i][properties[j]].value.toString();
          } else if (properties[j] === "createdAt") {
            itemPropspect[properties[j]] = dayjs(prospects[i][properties[j]].value).format();
          } else if (properties[j] === "entityId") {
            let entityValue = entities.filter(
              item =>
                removeAccents(item.name.trim().toLocaleUpperCase()) ==
                removeAccents(prospects[i][properties[j]].value.trim().toLocaleUpperCase())
            );
            if (entityValue.length <= 0 || entityValue == null || entityValue === undefined) {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "entityId",
                  childProperty: "errorSintaxis",
                  value: true,
                })
              );
              errors.push({ row: i + 1, column: "entityId" });
            } else {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "entityId",
                  childProperty: "errorSintaxis",
                  value: false,
                })
              );
            }
            itemPropspect[properties[j]] = entityValue[0]?.id;
          } else if (properties[j] === "originId") {
            let compareThis = prospects[i][properties[j]].value.toUpperCase().trim();
            let origenValue = origins.filter(item => item.name.toUpperCase().trim() == compareThis)[0]?.id;
            itemPropspect[properties[j]] = origenValue;
            if (origenValue === undefined || origenValue === null) {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "originId",
                  childProperty: "errorSintaxis",
                  value: true,
                })
              );
              errors.push({ row: i + 1, column: "originId" });
            } else {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "originId",
                  childProperty: "errorSintaxis",
                  value: false,
                })
              );
            }
          } else if (properties[j] === "categoryId") {
            let categoryValue = categoriesAvailable.filter(item =>
              removeAccents(item.name.toUpperCase().trim()).includes(
                prospects[i][properties[j]].value.toUpperCase().trim()
              )
            );
            itemPropspect[properties[j]] = categoryValue[0]?.id;
            if (categoryValue.length <= 0 || categoryValue == null || categoryValue === undefined) {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "categoryId",
                  childProperty: "errorSintaxis",
                  value: true,
                })
              );
              errors.push({ row: i + 1, column: "categoryId" });
            } else {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "categoryId",
                  childProperty: "errorSintaxis",
                  value: false,
                })
              );
            }
          } else if (properties[j] === "channelId") {
            let channelValue = channelsState.filter(
              item => item.name.toUpperCase().trim() == prospects[i][properties[j]].value.toUpperCase().trim()
            );
            itemPropspect[properties[j]] = channelValue[0]?.id;
            if (channelValue.length <= 0 || channelValue == null || channelValue === undefined) {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "channelId",
                  childProperty: "errorSintaxis",
                  value: true,
                })
              );
              errors.push({ row: i + 1, column: "channelId" });
            } else {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "channelId",
                  childProperty: "errorSintaxis",
                  value: false,
                })
              );
            }
          } else if (properties[j] === "ejecutiveId") {
            let ejecutiveValue = executives.filter(item =>
              removeAccents(item.email).includes(prospects[i][properties[j]].value.toUpperCase())
            );
            itemPropspect[properties[j]] = ejecutiveValue[0]?.id;
            itemPropspect["groupId"] = executives.filter(item =>
              removeAccents(item.email).includes(prospects[i][properties[j]].value.toUpperCase())
            )[0]?.groupId;

            if (ejecutiveValue.length <= 0 || ejecutiveValue == null || ejecutiveValue === undefined) {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "ejecutiveId",
                  childProperty: "errorSintaxis",
                  value: true,
                })
              );
              errors.push({ row: i + 1, column: "ejecutiveId" });
            } else {
              dispatch(
                changePropertyValue({
                  position: i,
                  property: "ejecutiveId",
                  childProperty: "errorSintaxis",
                  value: false,
                })
              );
            }
          } else {
            itemPropspect[properties[j]] = prospects[i][properties[j]].value?.trim();
          }
        }

        finalProspects.push(itemPropspect);
      }

      setIsValidating(false);

      setIsEditing(false);
    } catch (error) {
      console.log(error);
      setIsValidating(false);
    }

    console.log(errors);
    setCountErrors(errors);

    if (finalProspects.length > 0) {
      let properties = Object.keys(finalProspects[0]);
      if (!validatePropertiyExist(properties)) {
        return;
      }
      // if (!properties.includes("name,origin,email,phone,clientTypeId,entityId")) {
      //   handleAlert("warning", "Selecciona columna correo,estado,nombre,origen,ejecutivo,telefono", "basic", setAlert);
      //   return;
      // }
    }

    if (errors.length === 0) {
      handleAlert("success", "Propspectos listos para subir", "basic", setAlert);
    } else {
      handleAlert("error", "Verifica todas las filas y columnas", "basic", setAlert);
    }

    dispatch(setProspectsToSave(finalProspects));

    // dispatch(saveProspectBackup(finalProspects));
    return;
    try {
      for (let i = 0; i < finalProspects.length; i++) {
        const finalProspect = finalProspects[i];

        let response = await api.post("prospects", finalProspect);
        console.log(response);
      }
    } catch (error) {
      console.log(error.response);
      console.log("error");
    }
  };

  const validatePropertiyExist = properties => {
    let succes = false;
    if (!properties.includes("name")) {
      handleAlert("warning", "Selecciona columna nombre", "basic", setAlert);
      return succes;
    } else if (!properties.includes("email")) {
      handleAlert("warning", "Selecciona columna correo", "basic", setAlert);
      return succes;
    } else if (!properties.includes("phone")) {
      handleAlert("warning", "Selecciona columna Telefono", "basic", setAlert);
      return succes;
    } else if (!properties.includes("ejecutiveId")) {
      handleAlert("warning", "Selecciona columna Ejecutivo", "basic", setAlert);
      return succes;
    } else if (!properties.includes("clientTypeId")) {
      handleAlert("warning", "Selecciona columna Tipo de cliente", "basic", setAlert);
      return succes;
    } else if (!properties.includes("entityId")) {
      handleAlert("warning", "Selecciona columna Estado", "basic", setAlert);
      return succes;
    }
    // } else if (!properties.includes("originId")) {
    //   handleAlert("warning", "Selecciona columna Origen", "basic", setAlert);
    //   return succes;
    // }

    return true;
  };

  const saveProspects = () => {
    printResult();
  };

  const asignExecutive = () => {
    if (prospects.length > 0) {
      let properties = Object.keys(prospects[0]);
      if (!properties.includes("ejecutiveId")) {
        handleAlert("warning", "Selecciona columna Ejecutivo", "basic", setAlert);
        return;
      }
      dispatch(orderExecutives({ executives }));
    }

    return;
    if (prospects.length > 0) {
      let properties = Object.keys(prospects[0]);
      if (!properties.includes("ejecutiveId")) {
        handleAlert("warning", "Selecciona columna Ejecutivo", "basic", setAlert);
      }
    } else {
      dispatch(orderExecutives({ executives }));
    }
  };

  const changeValueResponse = (index, item) => {
    console.log(item);

    dispatch(
      changePropertyValue({
        position: index,
        property: item,
        childProperty: "existInDB",
        value: true,
      })
    );
  };

  const uploadProspects = async () => {
    dispatch(saveProspectBackup(prospects));

    console.log(prospectsToSave);
    setIsUploading(true);

    setWasUpload(true);
    let finalProspect = prospectsToSave.map((item, index) => ({
      ...item,
      createdbyId: id_user,
      phaseId: phaseId,
      customdate: Object.keys(item).includes("createdAt"),
      currentPosition: index,
    }));

    let data = {
      tracking: {
        reason: "Seguimiento automático",
        createdbyId: id_user,
        actionId: actionId,
        phaseId: phaseId,
        observations: `Prospecto nuevo creado por inteligencia comercial`,
        stauts: 1,
      },
      prospects: finalProspect,
    };

    try {
      let response = await api.post("prospects/assign", data);

      let countExistLocal = [];
      if (response.status === 201) {
        console.log(response?.data?.prospects);
        setUploadedUsers(response?.data?.prospects);
        for (let index = 0; index < response?.data?.prospects.length; index++) {
          const element = response?.data?.prospects[index];

          if (element.error) {
            let fields = element.fieldsError || [];
            for (let j = 0; j < fields.length; j++) {
              const field = fields[j];
              changeValueResponse(index, field);
            }
            countExistLocal.push({ row: element.currentPosition + 1, column: "" });
          }
        }
        setCountExist(countExistLocal);
      }
      console.log(response);

      setResponseMessage(response?.data?.message);
      sendNotifications(response?.data?.prospects);

      // alert(JSON.stringify(response?.data?.message));
    } catch (error) {
      console.log(error);
      console.log(error.response);
      // alert("Error al subir sus prospectod");
      handleAlert("error", "Error al subir prospectos, comunicalo a programacion", "basic", setAlert);

      console.log("error");
    }
    setIsUploading(false);
  };

  const uploadProspectsAll = async () => {
    console.log(prospectsToSave);
    try {
      let data = {};

      for (let i = 0; i < prospectsToSave.length; i++) {
        const finalProspect = prospectsToSave[i];

        let response = await api.post("prospects/assign", finalProspect);
        console.log(response);
      }
    } catch (error) {
      console.log(error.response);
      console.log("error");
    }
  };

  const applyAll = item => {
    let value = item.value;
    let mutateValues = prospects.map((item, index) => ({
      ...item,
      z: {
        ...item["z"],
        value: value,
      },
    }));
    dispatch(setProspectsImports(mutateValues));
  };

  const filterByIdExecutive = id => {
    console.log(executives);
    let executive = executives.filter((item, index) => item.id == id);

    console.log(executive);
    return `${executive.name}  ${executive.lastname}`;
  };

  const changeColorByError = positionRow => {
    let color = "transparent";
    let numError = 0;

    // 0 === default
    // 1 === wasUpload
    // 2 === error
    // ? "rgba(213, 0, 0,0.4)" : "#fff"

    if (wasUpload) {
      if (countExist.some((item, index) => item.row == positionRow)) {
        color = "rgba(41, 121, 255,1)";

        numError = 1;
      }
    } else {
      if (countErrors.some((item, index) => item.row == positionRow)) {
        color = "rgba(213, 0, 0,1)";
        numError = 2;
      }
      // return ;
    }

    // console.log(numError);

    return color;
  };

  // <Box onClick={() => scrollToBottomAnimates(`index-${item.row}`)} key={index} display="flex" alignItems="center" bgcolor="red" mr={2} mt={2}>
  //   <p style={{ color: "white" }}>Fila :{item.row}</p> <span>-</span>
  //   <p style={{ color: "white" }}>Columna : {item.column}</p>
  // </Box>
  const deleteProspects = index => {
    dispatch(
      deleteValue({
        index,
      })
    );
  };

  const sendNotifications = uploadedUsersParam => {
    let ejecutivesMessages = [];

    let SuccessEjecutives = [];

    for (let i = 0; i < uploadedUsersParam.length; i++) {
      const ejecutiveResponse = uploadedUsersParam[i];

      if (ejecutiveResponse.success) {
        SuccessEjecutives.push(ejecutiveResponse);
      }
    }

    const groupByCategory = SuccessEjecutives.reduce((prevValueEjecutive, nextValueEjecutive) => {
      const { ejecutiveId } = nextValueEjecutive;
      prevValueEjecutive[ejecutiveId] = prevValueEjecutive[ejecutiveId] ?? [];
      prevValueEjecutive[ejecutiveId].push(nextValueEjecutive);
      return prevValueEjecutive;
    }, {});

    let keysEmail = Object.keys(groupByCategory);

    for (let i = 0; i < keysEmail.length; i++) {
      const keyProperty = keysEmail[i];

      let message = {
        message: `Se te han asignado un total de ${groupByCategory[keyProperty].length} prospectos nuevos por inteligencia comercial`,
        id: keyProperty,
        from: id_user,
        fromEmail: email,
        date: dayjs().format(),
        title: "ASIGNACION DE PROSPECTOS",
      };

      if (groupByCategory[keyProperty].length > 0) {
        ejecutivesMessages.push(message);
      }
    }

    console.log(SuccessEjecutives);
    console.log(ejecutivesMessages);

    if (ejecutivesMessages.length > 0) {
      console.log("jere");
      socket?.emit("send_notify_individual", {
        ejecutives: ejecutivesMessages,
      });
    }
  };

  // * MAIN RETURN
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      // onClose={() => setOpen(false)}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <ContainerTable>
          {Alert?.show && (
            <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
          )}
          <NavBarDashboard />

          <div style={{ height: 60 }}></div>
          <AlertDialogSlide open={openModal} setOpen={setOpenModal} data={rowData} />
          <div className="headermodal">
            <div style={{ display: "flex", alignItems: "center" }}>
              <ArrowBackIos onClick={() => router.reload()} />
              <h1>Selecciona tu importacion</h1>
            </div>
            <p>
              Total de filas: <span>{prospects.length}</span>
            </p>
            <Box onClick={() => dispatch(toogleExecutives(!showexecutives))} display={"flex"} alignItems={"center"}>
              <RemoveRedEye />
              <p>
                Total de ejecutivos: <span>{executives.length}</span>
              </p>
            </Box>

            <Box onClick={() => dispatch(toogleExecutives(!showexecutives))} display={"flex"} alignItems={"center"}>
              <RemoveRedEye />
              <p>
                Prospectos por ejecutivo <span>{Math.ceil(prospects.length / executives.length)}</span>
              </p>
            </Box>
            <p onClick={() => console.log(heads)}>
              Total de cabeceras: <span>{heads.length}</span>
            </p>
          </div>

          {responseMessage && (
            <Box pl={1} pr={1} mb={2}>
              <AlertMaterial variant="filled" severity="success" onClose={() => setResponseMessage(undefined)}>
                {responseMessage}
              </AlertMaterial>
            </Box>
          )}

          <Box display="flex" alignItems="center" flexWrap="wrap" pl={2}>
            {countErrors.map((item, index) => {
              return (
                <Chip
                  style={{ backgroundColor: "red", color: "#ffff", marginRight: 4, marginBottom: 4 }}
                  key={index}
                  icon={<Warning style={{ color: "#fff" }} />}
                  label={`Fila ${item.row}`}
                />
              );
            })}

            {countExist.map((item, index) => {
              return (
                <Chip
                  style={{ backgroundColor: "#1976d2", color: "#ffff", marginRight: 4, marginBottom: 4 }}
                  key={index}
                  icon={<Warning style={{ color: "#fff" }} />}
                  label={`Fila ${item.row}`}
                />
              );
            })}
          </Box>
          {/* return (
                <Box key={index} display="flex" alignItems="center" bgcolor="#2979ff" mr={2} mt={2} p={1}>
                  <p style={{ color: "white" }}>Fila :{item.row}</p>
                </Box>
              ); */}
          <div className="content">
            <TableComponentStyled>
              <Table>
                <TableHead>
                  <TableRowHead {...colors}>
                    {heads.map((item, index) => {
                      if (index === 0) {
                        return (
                          <TableHeadIdColumn key={index}>
                            <p>NO.o </p>
                          </TableHeadIdColumn>
                        );
                      }
                      return (
                        <TableHeadColumn key={index}>
                          <TableCellHeader handle={handleOnChangeSelect} key={index} itemHead={item} indexa={index} />
                        </TableHeadColumn>
                      );
                    })}
                    <TableHeadSettingsColumn {...colors}>
                      <SettingsOutlined />
                    </TableHeadSettingsColumn>
                  </TableRowHead>

                  <TableRowHeadNames>
                    {heads.map((item, index) => {
                      if (index === 0) {
                        return <TableHeadIdColumnNames key={index}></TableHeadIdColumnNames>;
                      }
                      return (
                        <TableHeadColumnNames key={index}>
                          <p className="title">{item?.value}</p>
                        </TableHeadColumnNames>
                      );
                    })}
                    <TableHeadSettingsColumnNames {...colors}></TableHeadSettingsColumnNames>
                  </TableRowHeadNames>
                </TableHead>

                <TableBody>
                  {prospects.map((prospecto, gloabalIndex) => {
                    return (
                      <TableRowBody id={`index-${gloabalIndex + 1}`} key={gloabalIndex} isPar={gloabalIndex % 2 == 0}>
                        {Object.values(prospecto).map((cell, index) => {
                          if (cell.type === "check") {
                            return (
                              <TableDataId
                                key={index}
                                bgBadge={changeColorByError(gloabalIndex + 1)}
                                isPar={gloabalIndex % 2 == 0}
                              >
                                <Badge
                                  overlap="rectangular"
                                  invisible={false}
                                  overlap="circular"
                                  badgeContent=""
                                  variant="dot"
                                >
                                  <p>{gloabalIndex + 1}</p>
                                </Badge>
                              </TableDataId>
                            );
                          }

                          return (
                            <TableData
                              errorSintaxis={cell.errorSintaxis}
                              existInDB={cell.existInDB}
                              key={index}
                              isPar={gloabalIndex % 2 == 0}
                            >
                              <div className="tabledata">
                                <Tooltip title="Click para editar" placement="bottom-start">
                                  <p onClick={() => handleClickEditRow(index, gloabalIndex, cell, prospecto)}>
                                    {cell.value}
                                  </p>
                                </Tooltip>
                              </div>
                            </TableData>
                          );
                        })}
                        <TableDataSettingsColumn {...colors} isPar={gloabalIndex % 2 === 0}>
                          <div>
                            <div className="content">
                              <div
                                aria-controls="fade-menu"
                                aria-haspopup="true"
                                className="content__icon"
                                onClick={() => deleteProspects(gloabalIndex)}
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
              </Table>
            </TableComponentStyled>

            <Box display="flex" justifyContent="flex-end" alignItems="flex-end" style={{ flexWrap: "wrap" }}>
              <Button
                variant="contained"
                color="primary"
                className="btn"
                // startIcon={<CloudDownload />}
                disabled={uploadedUsers?.length < 1}
                onClick={() => {
                  setOpenAddPendings(true);
                  // handleClickAddPending(uploadedUsers?.data?.results);
                }}
              >
                Agregar pendientes
              </Button>
              <Button
                onClick={() => {
                  let ejecutivesMessages = [];

                  const groupByCategory = uploadedUsers.reduce((prevValueEjecutive, nextValueEjecutive) => {
                    const { ejecutiveId } = nextValueEjecutive;
                    prevValueEjecutive[ejecutiveId] = prevValueEjecutive[ejecutiveId] ?? [];
                    prevValueEjecutive[ejecutiveId].push(nextValueEjecutive);
                    return prevValueEjecutive;
                  }, {});

                  let keysEmail = Object.keys(groupByCategory);
                  for (let i = 0; i < keysEmail.length; i++) {
                    const keyProperty = keysEmail[i];
                    let message = {
                      message: `Se te han asignado un total de ${groupByCategory[keyProperty].length} prospectos nuevos por ${email}`,
                      id: keyProperty,
                      from: id_user,
                      fromEmail: email,
                      date: dayjs().format(),
                      title: "ASIGNACION DE PROSPESCTOS",
                    };

                    ejecutivesMessages.push(message);
                  }

                  socket?.emit("send_notify_individual", {
                    ejecutives: ejecutivesMessages,
                  });

                  console.log(ejecutivesMessages);

                  // const groupByCategory = uploadedUsers.groupBy(getNotificationsByQuery(product) => {
                  //   return product.email;
                  // });

                  // console.log(groupByCategory);
                  // asignExecutive()
                }}
              >
                Test Socket
              </Button>
              <Button
                disabled={isValidating}
                onClick={() => saveProspects()}
                color="primary"
                variant="contained"
                style={{ marginTop: 10, marginRight: 10 }}
              >
                {isValidating ? "Validando..." : "Validar "}
              </Button>
              <Button
                onClick={() => setFlagRequest(!flagRequest)}
                color="primary"
                variant="contained"
                style={{ marginTop: 10, marginRight: 10 }}
              >
                Traer Catalogos
              </Button>
              <Button
                onClick={() => uploadProspects()}
                color="primary"
                variant="contained"
                style={{ marginTop: 10, marginRight: 10 }}
                disabled={isEditing}
              >
                {isEditing ? "Es necesario Validar" : "Subir Prospectos"}
              </Button>
              {/* Boton de exportar a excel */}
              {loadingExport ? (
                <Button>Generando</Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  className="btn"
                  startIcon={<CloudDownload />}
                  disabled={uploadedUsers.length < 1} //Si hubo error en la subida no tiene caso activar el excel
                  style={{ marginTop: 10 }}
                  onClick={async () => {
                    // TODO: Código feo aquí, se debe manejar en un handle
                    try {
                      setLoadingExport(true);

                      let finalExcel = [];

                      // Construcción de los objetos del excel
                      uploadedUsers.forEach((item, index) => {
                        console.log(item);
                        let value = {};

                        value.NOMBRE = prospects[index]?.name?.value;
                        value.CORREO = prospects[index]?.email?.value;
                        value.TELEFONO = prospects[index]?.phone?.value;
                        value.PRODUCTO = prospects[index]?.product?.value;
                        value.CATEGORIA = prospects[index]?.categoryId?.value;
                        value.CANAL = prospects[index]?.channelId?.value;
                        value.ORIGEN = prospects[index]?.originId?.value;
                        value.ESTADO = prospects[index]?.entityId?.value;
                        value.EJECUTIVO = prospects[index]?.ejecutiveId?.value;
                        value.CAMPAÑA = prospects[index]?.campaign?.value;
                        let existingEmail = prospects[index].email.existInDB ? "Correo ya existe. " : "";
                        let existingPhone = prospects[index].phone.existInDB ? "Telefono ya existe." : "";

                        // Si no hay errores en correos, pone cadena personalizada
                        value.OBSERVACIONES =
                          existingEmail + existingPhone !== "" ? existingEmail + existingPhone : "Sin observaciones";

                        value.SUBIDOPOR = email; // Email de nosotros
                        // Compara entre los datos obtenidos al subir con los datos en la tabla
                        // Si los 3 datos, name, phone, email son iguales es nuestra respuesta
                        let userResponse = uploadedUsers.find(
                          auxUser =>
                            prospects[index]?.name?.value === auxUser.name &&
                            prospects[index]?.phone?.value === auxUser.phone &&
                            prospects[index]?.email?.value === auxUser.email
                        );
                        value.SUBIDO = userResponse?.success ? "Súbido con éxito" : "Falló en la subida";
                        finalExcel.push(value);
                      });

                      const data = await api.post(
                        "/convert/excel",
                        { data: finalExcel },
                        {
                          responseType: "blob",
                        }
                      );

                      const pdfBlob = new Blob([data.data], { type: "application/xlsx" });

                      saveAs(pdfBlob, "ejecutives.xlsx");
                    } catch (error) {
                      alert("Problema al general el documento");
                      console.log(error);
                    }
                    setLoadingExport(false);
                  }}
                >
                  Exportar
                </Button>
              )}
            </Box>
          </div>

          {isUploading && <LoaderCompleteScreen />}
          <Dialog
            open={openAddPendings}
            // open={true}
            keepMounted
            onClose={handleClosePendings}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogContainer>
              <div className="headerDialog">
                <p className="headerDialog__title">Agregar Pendiente</p>
                {isLoadingCreate && <CircularProgress className="headerDialog__loader" />}
              </div>
              <Grid spacing={1} container className="ctr_inputs">
                <Grid item xs={12} md={4}>
                  <label className="ctr_inputs__label">Tipo</label>
                  <select className="ctr_inputs__input" disabled>
                    <option value={type} hidden>
                      {type.name}
                    </option>
                  </select>
                </Grid>

                <Grid item xs={12} md={6}>
                  <label className="ctr_inputs__label">Asunto *</label>
                  <input
                    {...register("subject", { required: true })}
                    placeholder="Debes agregar un asunto."
                    id="subject"
                    name="subject"
                    className={errors?.subject?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                  />
                </Grid>
                <Grid item xs={12}>
                  <label className="ctr_inputs__label">Descripción</label>
                  <textarea
                    {...register("description", { required: false })}
                    placeholder="Puedes agregar una descripción."
                    id="description"
                    name="description"
                    minLength={"600"}
                    className={
                      errors?.description?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"
                    }
                  />
                </Grid>
                {/* TODO: Poner que sólo se pueda modificar la hora? */}
                <Grid item xs={12} md={6}>
                  <label className="ctr_inputs__label">Fecha Inicio </label>

                  <input
                    id="dateRequired"
                    disabled
                    type="datetime-local"
                    name="dateRequired"
                    value={todaySaved}
                    className={"ctr_inputs__input"}
                  />
                </Grid>

                <Grid item xs={12}>
                  <label className="ctr_inputs__label">Zona Horaria* </label>
                  <select
                    {...register("zone", { required: true })}
                    className={errors?.zone?.type === "required" ? "ctr_inputs__input error" : "ctr_inputs__input"}
                  >
                    <option value="" hidden>
                      Seleccione uno...
                    </option>
                    {zones?.map((item, index) => (
                      <option key={index} value={item.gmt}>
                        ({item.gmt}) {item.zones} {item?.summer ? "(Horario de verano)" : null}
                      </option>
                    ))}
                  </select>
                </Grid>
              </Grid>
              <Grid container className="ctr_buttons">
                <Button
                  disabled={isLoadingCreate}
                  variant="contained"
                  className={`btn_cancel ${isLoadingCreate && "disabled"}`}
                  onClick={() => handleClosePendings()}
                >
                  Cancelar
                </Button>
                <Button
                  disabled={isLoadingCreate}
                  variant="contained"
                  className={`btn_upload ${isLoadingCreate && "disabled"}`}
                  onClick={handleSubmit(handleAddPending)}
                >
                  Guardar
                </Button>
              </Grid>
            </DialogContainer>
          </Dialog>
        </ContainerTable>
      </Fade>

      {/* {isValidating && <LoaderCompleteScreen />} */}
    </Modal>
  );
}

const TableContainerStyled = styled(TableContainer)`
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 4px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 20px #ff3d00;
    box-shadow: inset 0 0 20px #ff3d00;
  }

  select {
    width: 100%;
    height: 40px;
    padding: 0 10px;
    font-weight: bold;
  }

  .head-select {
    width: 200px;
    outline: 0;
    border: 0;
    border-radius: 4px;
    /* background-color: ${colors.primaryColor}; */
    color: #000;
    padding: 10px;
    overflow: scroll;
  }
`;

const RowTableStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  .row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  input {
    padding: 5px 10px;
    border: 1px solid #757575;
    border-radius: 4px;
  }

  .iconedit {
    color: #9e9e9e;
  }
`;

const StyledTableCell = withStyles(theme => ({
  head: {
    // backgroundColor: colors.primaryColor,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const InputStyled = styled.input`
  /* height: 40px;
    border: 1px solid gray;
    border-radius: 8px;
    padding-left: 10px; */
`;

const StyledTableCellTWO = withStyles(theme => ({
  head: {
    // backgroundColor: colors.primaryColor,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:hover": {
      backgroundColor: "gray",
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  // table: {
  //   minWidth: 700,
  //   maxHeight: 100,
  //   height: 200,
  // },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0,0.5)",
  },
  paper: {
    // backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
});

const ContainerTable = styled.div`
  width: 100%;
  height: 100vh;
  overflow: scroll;
  background: #aa4b6b; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #3b8d99, #6b6b83, #aa4b6b); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #3b8d99,
    #6b6b83,
    #aa4b6b
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: #7474bf; /* fallback for old browsers */
  background: -webkit-linear-gradient(to top, #348ac7, #7474bf); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to top,
    #348ac7,
    #7474bf
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  /* background-image: url("https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2029&q=80"); */
  /* background-image: url("https://images.unsplash.com/photo-1486520299386-6d106b22014b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1469&q=80"); */
  background-color: #3aade6;
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='152' height='152' viewBox='0 0 152 152'%3E%3Cg fill-rule='evenodd'%3E%3Cg id='temple' fill='%23130032' fill-opacity='0.4'%3E%3Cpath d='M152 150v2H0v-2h28v-8H8v-20H0v-2h8V80h42v20h20v42H30v8h90v-8H80v-42h20V80h42v40h8V30h-8v40h-42V50H80V8h40V0h2v8h20v20h8V0h2v150zm-2 0v-28h-8v20h-20v8h28zM82 30v18h18V30H82zm20 18h20v20h18V30h-20V10H82v18h20v20zm0 2v18h18V50h-18zm20-22h18V10h-18v18zm-54 92v-18H50v18h18zm-20-18H28V82H10v38h20v20h38v-18H48v-20zm0-2V82H30v18h18zm-20 22H10v18h18v-18zm54 0v18h38v-20h20V82h-18v20h-20v20H82zm18-20H82v18h18v-18zm2-2h18V82h-18v18zm20 40v-18h18v18h-18zM30 0h-2v8H8v20H0v2h8v40h42V50h20V8H30V0zm20 48h18V30H50v18zm18-20H48v20H28v20H10V30h20V10h38v18zM30 50h18v18H30V50zm-2-40H10v18h18V10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"); */
  border-radius: 4px;

  h1 {
    font-size: 18px;
    margin-right: 20px;
  }

  .groupsselect {
    padding: 10px;
  }
  .content {
    padding: 10px;
  }
  .headermodal {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    justify-content: space-between;
    padding: 10px;
    flex-wrap: wrap;

    span {
      font-weight: bold;
    }
  }
`;

let actionId = true ? "62hHzqoSCj0452fT1sUAEzba" : "62hHzqoSCj0452fT1sUAEzba";

let phaseId = true ? "1EloCt487ESGH9R7wZSuYhhA" : "62dAw9Xu3c6RraXx2xXMKetH";
