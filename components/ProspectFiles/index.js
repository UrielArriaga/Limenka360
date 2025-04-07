import React from "react";
import { ProspectFilesStyle } from "./style";
import { InsertDriveFile, MoreVertSharp } from "@material-ui/icons";
import { LinearProgress, Tooltip } from "@mui/material";
import { LoaderStyle } from "../PreviewProspect/style";
import LoaderPreview from "../LoaderPreviews";
import EmptyData from "../PreviewEmpty";

export default function ProspectFiles(props) {
  const { files, fetching } = props;
  if (fetching) return <LoaderPreview />;
  if (files.length <= 0) return <EmptyData />;
  return (
    <ProspectFilesStyle count={files.length}>
      <div className="files_container">
        {files.map((item, index) => (
          <div className="card_file" key={index}>
            <div>
              {/* <div className="card_file__options">
                <MoreVertSharp />
              </div> */}
              <div className="card_file__data">
                <InsertDriveFile className="icon" />
                <Tooltip title={`` + item?.name} arrow={true}>
                  <p className="name_file">{item?.name}</p>
                </Tooltip>
                <p className="name_type">{item?.filestype?.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProspectFilesStyle>
  );
}
