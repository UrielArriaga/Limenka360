import { Box, CircularProgress, Grid, Paper, Popover, Tooltip } from "@material-ui/core";
import { Delete, FileCopy, Folder, Functions, MoreVert, PictureAsPdf, TextFields } from "@material-ui/icons";
import React, { useState } from "react";
import DrawerPreviewFile from "../organism/DrawerPreviewFile";

export default function FilesOrders({ files, setFiles, isLoaderFiles }) {
  const [showDrawer, setshowDrawer] = useState(false);
  const [file, setFile] = useState({});

  const handleDeleteFile = id => {
    let newFiles = files.filter((item, index) => item.id != id);
    setFiles(newFiles);
  };

  const handleClickFile = item => {
    setFile(item);
    setshowDrawer(true);
  };

  const returnStyleTypeFile = type => {
    switch (type) {
      case "pdf":
        return <PictureAsPdf />;
      case "docx":
        return <TextFields />;
      case "xlsx":
        return <Functions />;
      case "jpeg":
        return <Image />;
      case "jpg":
        return <Image />;
      case "png":
        return <Image />;
      default:
        return <FileCopy />;
    }
  };
  return (
    <AddFilesLayout>
      <div className="container_files">
        {files.length >= 1 ? (
          files.map((item, index) => {
            return (
              <CardFile key={index} elevation={2}>
                <div className="header">
                  <Tooltip title="Eliminar Archivo">
                    <Delete className="options" onClick={() => handleDeleteFile(item.id)} />
                  </Tooltip>
                </div>
                <div className="body">
                  {returnStyleTypeFile(item.documentType)}
                  <Tooltip title={"" + item.name} arrow={true}>
                    <p className="title_name">{item.name}</p>
                  </Tooltip>
                  <Tooltip title={"" + item?.filestype?.name} arrow={true}>
                    <p className="title_fileType">{item.filestype?.name}</p>
                  </Tooltip>
                </div>
                <div className="footer"></div>
              </CardFile>
            );
          })
        ) : (
          <Grid item xs={12} md={12} sm={12}>
            <div className="message_ctr">
              <p>No hay Archivos</p>
            </div>
          </Grid>
        )}
      </div>
      <DrawerPreviewFile
        width={"60%"}
        show={showDrawer}
        closeDrawer={() => setshowDrawer(!showDrawer)}
        file={file}
        setFile={setFile}
      />
    </AddFilesLayout>
  );
}

import styled from "styled-components";
import { colors, device } from "../../../styles/global.styles";

const AddFilesLayout = styled.div`
  margin-top: 20px;
  .container_files {
    width: 100%;
    height: 15vh;
    grid-gap: 15px;
    padding: 10px;
    grid-template-columns: repeat(auto-fill, minmax(14vh, 1fr));
    overflow-x: hidden;
    overflow-y: auto;
    display: grid;
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgb(166 164 164 / 20%);
    }
    ::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 20px grey;
    }
    .default {
      height: 90px;
      font-size: 40px;
    }
    .uploadFile {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      border: 1px solid rgb(63, 81, 181, 0.2);
      height: 90px;
      svg {
        font-size: 25px;
        margin: 10px;
      }
      .file {
        width: 30%;
      }
      .content_file {
        width: 100%;
        .title_file {
          text-align: center;
          font-size: 12px;
          width: 17vh;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          height: fit-content;
        }
        .buttons {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
          .upload {
            color: blue;
            border: 1px solid blue;
            text-transform: capitalize;
            font-size: 12px;
            height: 18px;
          }
          .cancel {
            color: red;
            border: 1px solid red;
            text-transform: capitalize;
            font-size: 12px;
            height: 18px;
          }
        }
      }
      .select_type {
        font-size: 12px;
        padding: 0px;
      }
    }
  }

  .message_ctr {
    margin-bottom: 2px;
    font-size: 14px;
    margin-top: 5px;
    margin-bottom: 10px;
    font-weight: 600;
    -webkit-letter-spacing: 1px;
    -moz-letter-spacing: 1px;
    -ms-letter-spacing: 1px;
    letter-spacing: 1px;
    color: rgb(86 86 86);
  }

  .icon {
    font-size: 40px;
    color: ${colors.primaryColor};
  }

  .text {
    font-size: 10px;
    font-weight: bold;
    color: #405189;
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
export const CardFile = styled(Paper)`
  height: 90px;
  display: flex;
  flex-direction: column;
  padding: 2px;
  .header {
    display: flex;
    align-items: center;
    justify-content: right;
    .options {
      border-radius: 8px;
      transition: 0.2s;
      font-size: 16px;
      &:hover {
        color: #fff;
        background-color: #3f51b5;
        cursor: pointer;
      }
    }
  }
  .body {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 25px;
    }
    .title_name {
      width: 17vh;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
      font-size: 12px;
      font-weight: bold;
      color: #405189;
    }
    .title_fileType {
      font-size: 12px;
      font-weight: 500;
      color: ${colors.primaryColorDark};
      width: 15vh;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      text-align: center;
    }
  }
  .footer {
  }
`;
export const CardDefault = styled.div`
  .label {
    display: flex;
    height: 90px;
    padding: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: 0.2s;
    border: thick dotted rgb(63, 81, 181, 0.2);
    &:hover {
      background-color: rgb(63, 81, 181, 0.2);
      cursor: pointer;
      border: thick dotted transparent;
      padding: 1;
    }
    .input {
      width: 0.1px;
      height: 0.1px;
      opacity: 0;
      overflow: hidden;
      position: absolute;
      z-index: -1;
    }
  }
  .default_icon {
    font-size: 4vh;
    color: rgb(63, 81, 181, 0.5);
  }
`;

export const MenuFile = styled(Popover)`
  .container {
    display: flex;
    flex-direction: column;
    .option {
      text-transform: capitalize;
      display: flex;
      justify-content: space-between;
      border-radius: 0px;
      color: #3f51b5;
      font-size: 13px;
      &:hover {
        background-color: #3f51b5;
        color: #fff;
      }
    }
  }
`;
