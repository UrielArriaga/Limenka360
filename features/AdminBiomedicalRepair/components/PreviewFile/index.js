import React from "react";
import { PreviewStyled } from "./styles";
import { renderPreview,getFileExtension} from "../../utils";
import { URL_SPACE } from "../../../../services/api";
export default function PreviewFile({open,close, trakingSelect}){

    const extension = getFileExtension(trakingSelect.url);
    const urlfile = URL_SPACE + trakingSelect.url;

return(
    <PreviewStyled open={open} onClose={close} anchor="right">
   <div className="">{renderPreview(extension, urlfile)}</div>
    </PreviewStyled>
)
}

