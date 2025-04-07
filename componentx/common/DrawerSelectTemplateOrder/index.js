import { Box, Button, Grid, IconButton } from "@material-ui/core";
import { ZoomIn, ZoomOut } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import CVJobsTemplate from "../../../components/Templates/CVJobsTemplate";
import { LayoutDrawer } from "./styles";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import NewOrderTemplate from "../../../components/TemplatesAlmacen/NewOrderTemplate";
import PlantillaNacionalTemplate from "../../../components/TemplatesAlmacen/PlantillaNacionalTemplate";

export default function DrawerSelectTemplate({
  open,
  setMailupdate,
  emailUpdate,
  closeDrawer,
  data,
  totalIVA,
  templateSelected,
}) {
  const { groupId, company } = useSelector(userSelector);
  const [showOne, setShowOne] = useState(false);
  const [zoomCount, setZoomCount] = useState(100);
  const [templates, setTemplates] = useState([
    {
      img: "/templateOrderHomukea.jpg",
      name: "Plantilla Homukea",
      index: 1,
    },
  ]);

  useEffect(() => {
    if (company === "yGDxrTdf9six3E29yxVWc8MF" || company === "UFN6npxl4BkkbVACy66EcEuU") {
      setShowOne(true);
      setTemplates([
        {
          img: "/cvjobstemplate.png",
          name: "Cvjobs",
          index: 8,
        },
      ]);
    }
  }, [company]);

  useEffect(() => {
    console.log("Datos para previsuzar el template: ", data);
    console.log("Me dice si es de CVJobs:", showOne);
  }, [showOne]);

  const handleChange = event => {
    setMailupdate(event.target.value);
  };

  const RenderSelectTemplate = () => {
    switch (templateSelected.id) {
      case false:
        return <NewOrderTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case true: 
        return <PlantillaNacionalTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA}/>;
      default:
        break;
    }
  };

  return (
    <LayoutDrawer anchor="right" open={open} onClose={closeDrawer}>
      <div className="drawertop">
        <p className="drawertop__title">Vista previa de la orden de compra {templateSelected?.name}</p>
      </div>
      <Grid container className="drawer">
        <Grid item md={1}></Grid>
        <Grid item xs={6} sm={4} md={12} className="preview">
          <div className="update_email">
            
          </div>
          <div className="preview_container">
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setZoomCount(prev => prev + 10)}>
                <ZoomIn />
              </IconButton>
              <p>{zoomCount}%</p>
              <IconButton onClick={() => setZoomCount(prev => prev - 10)}>
                <ZoomOut />
              </IconButton>
            </Box>

            {showOne ? (
              <CVJobsTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />
            ) : (
              <RenderSelectTemplate />
            )}
          </div>
        </Grid>
        <Grid item md={1}></Grid>
      </Grid>
    </LayoutDrawer>
  );
}
