import React from "react";
import { Dot, LoaderWrapper, PreviewRecolecionStyled } from "./styles";
import { Button, IconButton, Tab, Tabs, Tooltip } from "@material-ui/core";
import { AttachFile, Close, Edit } from "@material-ui/icons";
import InformationRutas from "../InformationRutas";
import PrintPdf from "../../../DepAttendantRoutes/components/PrintPdf";

export default function RutasDetails({ handleOnClickClosePreview, tabSeletect, handleOnClickTab, routeSelected }) {
  console.log(routeSelected, " route select");
  const pdfList = [
    {
      id: 1,
      name: "Ruta",
      url: routeSelected?.url,
    },
    {
      id: 2,
      name: "Carta Porte ",
      url: routeSelected?.urlcart,
    },
    {
      id: 3,
      name: "Nota Remisión",
      url: routeSelected?.urlnote,
    },
  ];
  return (
    <PreviewRecolecionStyled>
      <div className="headerpreview">
        <h4 className="concept">{routeSelected?.data?.driver?.name}</h4>
        <div className="headerpreview__listactions">
          <div className="headerpreview__listactions--item">
            <PrintPdf documents={pdfList} />
          </div>
          <Tooltip title="Cerrar Vista Previa">
            <IconButton onClick={handleOnClickClosePreview}>
              <Close />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="contentpreview">
        <div className="contentpreview__tabs">
          <div
            className={`contentpreview__tabs--tab ${tabSeletect === "infoProduct" && "active"}`}
            onClick={() => handleOnClickTab("infoProduct")}
          >
            <p>Informacion general</p>
          </div>
        </div>

        <div className="contentpreview__render">
          {tabSeletect === "infoProduct" && <InformationRutas routeSelected={routeSelected} />}
        </div>
      </div>
    </PreviewRecolecionStyled>
  );
}
