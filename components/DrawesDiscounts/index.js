import { Box, Grid, IconButton } from "@material-ui/core";
import { ZoomIn, ZoomOut } from "@material-ui/icons";
import React, { useState } from "react";
import BasicTemplate from "../Templates/BasicTemplate";
import EquimamientoTemplate from "../Templates/EquimamientoTemplate";
import MeisonTemplate from "../Templates/MeisonTemplate";
import MedicalbuyTemplate from "../Templates/MedicalbuyTemplate";
import PromedTemplate from "../Templates/PromedTemplate";
import ChisonTemplate from "../Templates/ChisonTemplate";
import HelseTemplate from "../Templates/HelseTemplate";
// import LIfemedicTemplate from "../Templates/LIfeMedicTemplate";
import { LayoutDrawer } from "./styles";

export default function DrawerDiscounts({ setTemplateSelected, open, setOpen, closeDrawer, data }) {
  const [templateSelect, setTemplateSelect] = useState({});
  const [templateIndex, setTemplateIndex] = useState(0);

  const [zoomCount, setZoomCount] = useState(100);

  const RenderSelectTemplate = () => {
    switch (templateIndex) {
      case 1:
        return <EquimamientoTemplate data={data} zoom={zoomCount} />;
      case 2:
        return <MedicalbuyTemplate data={data} zoom={zoomCount} />;

      // case 3:
      //   return <MeisonTemplate data={data} zoom={zoomCount} />;

      // case 4:
      //   return <PromedTemplate data={data} zoom={zoomCount} />;

      // case 5:
      //   return <LifemedicTemplate data={data} zoom={zoomCount} />;

      // case 6:
      //   return <HelseTemplate data={data} zoom={zoomCount} />;

      // case 7:
      //   return <ChisonTemplate data={data} zoom={zoomCount} />;
      default:
        break;
    }
  };

  return (
    <LayoutDrawer anchor="right" open={open} onClose={closeDrawer}>
      <div className="drawertop">
        <p className="drawertop__title">Descuentos</p>
      </div>
      <Grid container className="drawer"></Grid>
    </LayoutDrawer>
  );
}
