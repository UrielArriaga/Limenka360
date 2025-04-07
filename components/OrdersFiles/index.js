import { Box, Button, Grid } from "@material-ui/core";
import { Delete, Description, Folder } from "@material-ui/icons";
import React, { useState, useEffect, useRef } from "react";
import Select from "react-select";

export default function AddFilesOrders({ filesToSave, setFilesToSave }) {
  const inputRef = useRef(null);
  const [errorName, setErrorName] = useState(false);
  const [errorFile, setErrorFile] = useState(false);
  const [errorType, setErrorType] = useState(false);
  const [currentFile, setCurrentFile] = useState({ file: undefined, url: "", name: "", filestypeId: "" });
  const [typeFiles, setTypeFiles] = useState([]);
  const [typeFileSelected, setTypeFileSelected] = useState("");
  const [nameFile, setFameFile] = useState("");
  useEffect(() => {
    requestTypeFile();
  }, []);

  const requestTypeFile = async () => {
    try {
      let responseFiles = await api.get("filetypes");
      setTypeFiles(responseFiles.data.results);
      console.log(responseFiles);
    } catch (error) {}
  };

  const handleOnchangeFile = e => {
    if (e.target.files[0] === undefined) return;
    let typeFile = e.target.files[0].name.split(".").pop();
    let acceptFile = ["jpg", "png", "jpeg"];
    const url = URL.createObjectURL(e.target.files[0]);
    setCurrentFile({ ...currentFile, file: e.target.files[0] });

    setErrorFile(false);
  };

  const handleOnChangeName = e => {
    setFameFile(e.target.value);
    setCurrentFile({ ...currentFile, name: e.target.value });

    if (e.target.value.length >= 0) {
      setErrorName(false);
    }
  };

  const handleOnChangeTypeFile = e => {
    setCurrentFile({ ...currentFile, filestypeId: e.value });
    setTypeFileSelected(e.value);
    setErrorType(false);
  };

  const handleOnClickAddFile = () => {
    if (nameFile != "" && currentFile.file !== undefined && typeFileSelected !== "") {
      setErrorName(false);
      setErrorFile(false);
      setErrorType(false);
      let id = generateTemporalId(10);
      console.log(nameFile);

      let fileObject = currentFile;

      fileObject.id = id;
      setFilesToSave([...filesToSave, fileObject]);
      inputRef.current.value = null;
      setFameFile("");
      setCurrentFile({ ...currentFile, file: undefined, name: "" });
      return;
    }

    if (nameFile === "") {
      setErrorName(true);
    }

    if (currentFile.file === undefined) {
      setErrorFile(true);
    }

    if (typeFileSelected === "") {
      setErrorType(true);
    }
  };

  const handleDeleteFile = id => {
    let newFiles = filesToSave.filter((item, index) => item.id != id);

    setFilesToSave(newFiles);
  };

  return (
    <AddFilesLayout>
      <div className="files">
        {filesToSave.map((item, index) => {
          return (
            <Box key={index} className="box-file">
              <Folder className="icon" />
              <p className="text">{item.name.slice(0, 15)}</p>

              <Delete className="delete" onClick={() => handleDeleteFile(item.id)} />
            </Box>
          );
        })}
      </div>

      <Grid container>
        <Grid item xs={12} sm={6} md={4}>
          <div className="item">
            <div className="ContentTitleandAlert">
              <p>
                Nombre del archivo <strong>*</strong>
              </p>

              {errorName && (
                <>
                  <div className="point"></div>
                  <Error>Requerido</Error>
                </>
              )}
            </div>
            <input
              value={nameFile}
              placeholder="Nombre del archivo"
              className="input"
              onChange={e => handleOnChangeName(e)}
            />
          </div>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <div className="item">
            <div className="ContentTitleandAlert">
              <p>
                Archivo <strong>*</strong>
              </p>

              {errorFile && (
                <>
                  <div className="point"></div>
                  <Error>Requerido</Error>
                </>
              )}
            </div>
            <input ref={inputRef} type="file" className="input" onChange={e => handleOnchangeFile(e)} />
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className="item">
            <div className="ContentTitleandAlert">
              <p>
                Tipo de archivo <strong>*</strong>
              </p>

              {errorType && (
                <>
                  <div className="point"></div>
                  <Error>Requerido</Error>
                </>
              )}
            </div>
          </div>

          <Select
            className="select-options"
            placeholder="Selecciona un tipo de archivo"
            options={typeFiles.map((item, index) => ({ label: item.name, value: item.id }))}
            onChange={e => handleOnChangeTypeFile(e)}
            // isClearable={true}
            // onChange={e => (e === null ? handleSelectEntities("") : handleSelectEntities(e.id))}
            // value={EntitiesLocal.filter(item => item.id === entity)}
          />
        </Grid>
      </Grid>
      <Button
        variant="outlined"
        color="primary"
        className="btn_salir"
        onClick={() => handleOnClickAddFile()}
        // disabled={currentFile.file ? false : true}
      >
        Agregar
      </Button>
      {/*       
      <Description />
      <select name="" id="" onChange={e => handleOnChangeTypeFile(e)}>
        <option value="">Selecciona tipo de archivo</option>
        {typeFiles.map((item, index) => {
          return (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          );
        })}
      </select>
      <input ref={inputRef} type="file" onChange={e => handleOnchangeFile(e)} />
      <input value={nameFile} type="text" onChange={e => handleOnChangeName(e)} placeholder="Hola" />

      <button type="button" onClick={() => handleOnClickAddFile()}>
        add file
      </button>

      <button type="button" onClick={() => handleUploadFiles()}>
        Fake upload
      </button> */}
    </AddFilesLayout>
  );
}

import styled from "styled-components";
import { api } from "../../services/api";
import { colors, device } from "../../styles/global.styles";
import { generateTemporalId, toUpperCaseChart } from "../../utils";
const AddFilesLayout = styled.div`
  margin-top: 20px;

  .select-options {
    z-index: 10;
  }

  .files {
    display: flex;
  }

  .box-file {
    background-color: #f9f9f9;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
    position: relative;
    margin-right: 10px;
    width: 100px;
  }

  .icon {
    font-size: 40px;
    color: ${colors.primaryColor};
  }

  .text {
    font-size: 10px;
    font-weight: bold;
  }

  .delete {
    font-size: 15px;
    position: absolute;
    right: 2px;
    cursor: pointer;
    &:hover {
      color: red;
      transition: all 0.2s ease-in-out;
    }
  }
`;

// f> r>  u> r' u'  f'
export const Error = styled.div`
  display: flex;
  align-items: center;
  font-size: 15px;
  color: #fff;
  background-color: rgba(241, 113, 113, 0.9);
  border-top-right-radius: 0.2rem;
  border-bottom-right-radius: 0.2rem;

  @media ${device.sm} {
    width: 40%;
  }
  height: 27px;
  ::before {
    display: inline;
  }
  svg {
    font-size: 18px;
  }
`;
