import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import DragAndDrop from "../../components/UI/organism/DragAndDrop";
import { read, utils } from "xlsx";

import { fillExecutives } from "../../redux/slices/ejecutivosSlice";
import DialogInfo from "../../layouts/DialogInfo";
import ListExecutives from "../../components/ListExecutives";
import NavBarDashboard from "../../components/NavBarDashboard";
import RouteHistory from "../../components/RouteHistory";

import { ContainerSuggestions } from "../../styles/global.styles";

import UsersOnline from "../../components/UsersOnline";
import { ImportacionesStyled } from "../../styles/Herramientas/importaciones.styles";
import { GetApp } from "@material-ui/icons";

import {
  fillExecutivesToImport,
  setHeadsImports,
  setProspectsImports,
  useImportsSlice,
} from "../../redux/slices/importsSlice";
import CustomTableProspect from "../../components/UI/organism/CustomTableProspect";
import { Box, Button } from "@material-ui/core";
import { userSelector } from "../../redux/slices/userSlice";
import SideBar from "../../components/SideBar";
import MainLayout from "../../components/MainLayout";

export default function Importaciones() {
  const dispatch = useDispatch();
  const { id_user, userData, company, groupId, roleId } = useSelector(userSelector);
  const { heads, prospects } = useSelector(useImportsSlice);
  let DEFAULT_ROUTE = "IMPORTACIONES";
  const [data, setData] = useState(undefined);
  const [columns, setColumns] = useState([]);
  const [rowSelected, setRowSelected] = useState([]);
  const [openPrev, setOpenPrev] = useState(false);

  useEffect(() => {
    // if (prospects.length <= 0) return;
    // window.onbeforeunload = function () {
    //   return "Are you sure you want to leave?";
    // };
  }, [prospects]);

  useEffect(() => {
    let query = {
      groupId: "groupId",
      roleId: "62d94hH7xnfeqrfYLLDSKAtR",
    };
    // dispatch(fillExecutivesToImport());
  });

  // TODO 1 Obtener Los datos de excel

  const handleFile = file => {
    // TODO 2 Obtener Los datos de excel

    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = e => {
      const parseResult = e.target.result;
      const WorkBinary = read(parseResult, { type: "binary", cellDates: true });
      const wsname = WorkBinary.SheetNames[0];
      const ws = WorkBinary.Sheets[wsname];
      const data = utils.sheet_to_json(ws, { header: 1 });
      // TODO 3 CrearObjectos en base a los headers del excel
      let headers = [];
      let totalHeaders = [];
      let Options = {
        value: "Opciones",
        disabled: false,
        type: "check",
      };

      headers.push(Options);

      let normalizeHeaders = data[0].map((item, index) => normalizeHeader(item));

      totalHeaders = [...headers, ...normalizeHeaders];

      let ejecutive = {
        value: "Ejecutivo",
        disabled: false,
        type: "select",
      };

      let group = {
        value: "Buscador de grupos",
        disabled: false,
        type: "select",
      };

      totalHeaders.push(group);
      totalHeaders.push(ejecutive);
      dispatch(setHeadsImports(totalHeaders));
      setData(data);
      handleResponseData(data);
    };

    if (rABS) reader.readAsBinaryString(file);
    else reader.readAsArrayBuffer(file);
  };

  let normalizeHeader = item => ({
    value: item,
    disabled: false,
  });

  const handleResponseData = array => {
    let finalValues = [];
    array.shift();

    // * DELETE HEADERS ROW
    let arrayWithouHeaders = array;

    // * NORMALIZE DATA ROWS
    let columnsCount = 0;
    arrayWithouHeaders.forEach((pathers, index) => {
      let json = {};
      let modifiedPathers = pathers;

      if (index === 0) {
        columnsCount = pathers.length;
      }

      // TODO Add options
      json["A"] = {
        value: false,
        disable: true,
        type: "check",
        errorSintaxis: false,
        deleteRow: false,
        key: undefined,
        width: 100,
      };

      // TODO Add body
      modifiedPathers.forEach((child, index2) => {
        json[alphabet[index2].toLocaleLowerCase()] = {
          value: child.toString(),
          disable: true,
          type: "string",
          errorSintaxis: false,
          existInDB: false,
          deleteRow: false,
          key: undefined,
          width: 100,
        };
      });

      // TODO Add Group
      json["w"] = {
        value: undefined,
        disable: true,
        type: "groupselect",
        errorSintaxis: false,
        existInDB: false,
        deleteRow: false,
        key: undefined,
        width: 100,
      };

      // TODO Add Ejecutive
      json["z"] = {
        value: undefined,
        disable: true,
        type: "id",
        errorSintaxis: false,
        existInDB: false,
        deleteRow: false,
        key: undefined,
        width: 100,
      };

      if (pathers.length === columnsCount) {
        finalValues.push(json);
      }
    });
    dispatch(setProspectsImports(finalValues));
  };

  const handleChange = e => {
    const files = e.target.files;
    if (files && files[0] && files[0].type !== "image") handleFile(files[0]);
  };

  return (
    <MainLayout>
      <ImportacionesStyled>
        <div className="main_container">
          <div className="content_import">
            <div className="content_import__row">
              <DialogInfo title={DEFAULT_ROUTE} route={DEFAULT_ROUTE} />
              <DragAndDrop handleFile={handleFile} styleClass="content_import__row__dragsection">
                <GetApp />
                {prospects.length >= 1 ? (
                  <p>Total de registros {prospects.length} </p>
                ) : (
                  <p>Arrastre y suelte los archivos</p>
                )}
                <input type="file" accept={SheetJSFT} onChange={handleChange} />
              </DragAndDrop>
            </div>
            <Box display={"flex"} justifyContent="space-between">
              <CustomTableProspect setOpen={setOpenPrev} open={openPrev} heads={heads} />
            </Box>
            <div className="content_import__actions">
              <Button
                onClick={() => setOpenPrev(true)}
                color="primary"
                disabled={prospects.length <= 0 ? true : false}
                variant="contained"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>

        <UsersOnline />
      </ImportacionesStyled>
    </MainLayout>
  );
}

const SheetJSFT = [
  ".xlsx",
  ".xlsb",
  ".xlsm",
  ".xls",
  ".xml",
  ".csv",
  ".txt",
  ".ods",
  ".fods",
  ".uos",
  ".sylk",
  ".dif",
  ".dbf",
  ".prn",
  ".qpw",
  ".123",
  ".wb*",
  ".wq*",
  ".html",
  ".htm",
];

const alphabet = [
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

("lchristiansen@gmail.com");
