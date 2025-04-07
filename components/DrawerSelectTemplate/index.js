import { Box, Button, Grid, IconButton } from "@material-ui/core";
import { ZoomIn, ZoomOut } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import BasicTemplate from "../Templates/BasicTemplate";
import EquimamientoTemplate from "../Templates/EquimamientoTemplate";
import MeisonTemplate from "../Templates/MeisonTemplate";
import MedicalbuyTemplate from "../Templates/MedicalbuyTemplate";
import PromedTemplate from "../Templates/PromedTemplate";
import ChisonTemplate from "../Templates/ChisonTemplate";
import HelseTemplate from "../Templates/HelseTemplate";
import CVJobsTemplate from "../Templates/CVJobsTemplate";
// import LifemedicTemplate from "../Templates/LifeMedicTemplate";
// import LifeMedicTemplate from "../Templates/LifeMedicTemplate";
import { LayoutDrawer } from "./styles";
import Life from "../Templates/Life";
import SolucionesHospitalarias from "../Templates/SolucionesHospitalarias";
import { useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { setHours } from "date-fns";
import Mexrei from "../Templates/MexreiTemplate";
import MbhHealthCare from "../Templates/MbhHealthCareTemplate";

export default function DrawerSelectTemplate({
  setTemplateSelected,
  open,
  setOpen,
  setMailupdate,
  emailUpdate,
  closeDrawer,
  data,
  totalIVA,
  templateSelected,
}) {
  const [templateSelect, setTemplateSelect] = useState({});
  const { groupId, company } = useSelector(userSelector);
  const [showOne, setShowOne] = useState(false);
  const [zoomCount, setZoomCount] = useState(100);
  const [templates, setTemplates] = useState([
    {
      img: "/equipam_template.png",
      name: "Plantilla basica",
      index: 1,
    },
    {
      img: "/Medicalbuytemplate.png",
      name: "Medicalbuy",
      index: 2,
    },
    {
      img: "/meisontemplate.png",
      name: "Meison Medical",
      index: 3,
    },
    {
      img: "/Promedtemplate.png",
      name: "Promed",
      index: 4,
    },
    {
      img: "/lifemedictemplate.png",
      name: "LIfemedi",
      index: 5,
    },
    {
      img: "/Helsemedicaltemplate.png",
      name: "Helse Medical",
      index: 6,
    },
    {
      img: "/chisontemplate.png",
      name: "Chison",
      index: 7,
    },
    {
      img: "/cvjobstemplate.png",
      name: "Cvjobs",
      index: 8,
    },
    {
      img: "/shtemplate.png",
      name: "Cvjobs",
      index: 9,
    },
    {
      img: "/mxreitemplate.png",
      name: "mexrei",
      index: 10,
    },
    {
      img: "/healthTemplate.jpg",
      name: "health",
      index: 11,
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
      setTemplateSelected(8);
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
    switch (templateSelected) {
      case 1:
        return <EquimamientoTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 2:
        return <MedicalbuyTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 3:
        return <MeisonTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 4:
        return <PromedTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 5:
        return <Life data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 6:
        return <HelseTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 7:
        return <ChisonTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 8:
        return <CVJobsTemplate data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 9:
        return <SolucionesHospitalarias data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 10:
        return <Mexrei data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      case 11:
        return <MbhHealthCare data={data} zoom={zoomCount} emailUpdate={emailUpdate} totalIVA={totalIVA} />;
      default:                                   
        break;
    }
  };

  return (
    <LayoutDrawer anchor="right" open={open} onClose={closeDrawer}>
      <div className="drawertop">
        <p className="drawertop__title">Vista previa de Cotizacion</p>
      </div>
      <Grid container className="drawer">
        <Grid item xs={6} sm={4} md={4} className="selection">
          <div className="drawer__tabs"></div>
          <div className="drawer-templates">
            <p>Plantillas disponibles</p>
            {templates.map((item, index) => (
              <Grid item xs={6} sm={4} md={4} key={index} className="template">
                <div
                  className={`card ${item.index === templateSelect.index && "card-selected"}`}
                  onClick={() => {
                    showOne ? setTemplateSelected(8) : setTemplateSelect(item);
                    showOne ? setTemplateSelected(8) : setTemplateSelected(index + 1);
                    console.log("selecciono", index, showOne, templateSelect);
                  }}
                >
                  <img width="160" src={item.img} alt="" />{" "}
                </div>
              </Grid>
            ))}
          </div>
        </Grid>
        <Grid item md={1}></Grid>

        <Grid item xs={6} sm={4} md={6} className="preview">
          <div className="update_email">
            <p className="text_mail">Cotizas por otra esfera cambia tu email: </p>
            <input placeholder="Escribe aqui el nuevo email" value={emailUpdate} name="email" onChange={handleChange} />
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
