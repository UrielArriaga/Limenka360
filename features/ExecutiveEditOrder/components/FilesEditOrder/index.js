import React, { useEffect, useState } from "react";
import { FilesEditStyle } from "./style";
import { filesRequiredOrder } from "../../data";
import { salesTypes } from "../../../ExecutiveOrders/data";
import { PictureAsPdf } from "@material-ui/icons";

export default function FilesEdit(props) {
  const { hookActions, states, functions } = props;
  const { oportunity, dataFiles } = states;
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState({});

  useEffect(() => {
    handleGetFiles(oportunity.typesale);
  }, []);

  const handleGetFiles = sale => {
    let filesdata = salesTypes[sale?.name];
    for (let i = 0; i < filesdata.length; i++) {
      let file = dataFiles.find(item => item.filestypeId === filesdata[i].id);
      if (file) filesdata[i].data = file;
    }
    setFiles(filesdata || []);
  };

  const handleShotView = file => {
    if (file) {
      setPreview(file);
    } else {
      setPreview({});
    }
  };

  if (!files) return <></>;
  return (
    <FilesEditStyle>
      <div className="files">
        {files.map((item, index) => (
          <div className="file" onClick={() => handleShotView(item.data)} key={index}>
            <p className="title_file">{item.name}</p>
            {item.data ? (
              <div className="file_style">
                <PictureAsPdf className="pdf" /> <p className="title_dataFile">{item.data.name}</p>
              </div>
            ) : (
              <input type="file" />
            )}
          </div>
        ))}
      </div>
      <div className="preview">
        {preview.url ? (
          <iframe src={preview.url || ""} width="100%" height="100%" />
        ) : (
          <p className="title_preview">Selecciona un Archivo para Visualizarlo</p>
        )}
      </div>
    </FilesEditStyle>
  );
}
