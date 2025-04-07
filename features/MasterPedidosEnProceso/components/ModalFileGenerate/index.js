import React, { useEffect, useState } from "react";
import { ModalFileGenerateStyled } from "./styles";
import { Button, Checkbox, Divider } from "@material-ui/core";
import makeTemplateAlmacen from "../../../../templates/makeTemplateAlmacen";
import ChisonMexicoGarantia from "../../../../components/TemplatesAlmacen/GarantiaChisoTemplate";
import { api } from "../../../../services/api";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import MeisonGarantia from "../../../../components/TemplatesAlmacen/MeisonNewTemplate";
import MexreiGarantia from "../../../../components/TemplatesAlmacen/MexreiNewTemplate";
import EquipamientoHospitalarioGarantia from "../../../../components/TemplatesAlmacen/EquipamientoHospitalarioTemplate";
import ProMedGarantia from "../../../../components/TemplatesAlmacen/Garantia2022ProTemplate";
import SolucionesHospitalariasGarantia from "../../../../components/TemplatesAlmacen/GarantiaAYMOJUL5002Template";
import HelsemedicalGarantia from "../../../../components/TemplatesAlmacen/HelsemedicalWarrantyTemplate";
import LifeMedicaGarantia from "../../../../components/TemplatesAlmacen/LifeMedicWheelchairWarrantyTemplate";
import useAlertToast from "../../../../hooks/useAlertToast";
import { colorLog } from "../../../../utils";
import { OrdersServices } from "../../services";
import MedicalBuyGarantia from "../../../../components/TemplatesAlmacen/MedicalBuyGarantia";

const renderPreview = (template, data) => {
  switch (template) {
    //
    case "meison medical abigail": //krispy kreme
      return <MeisonGarantia data={data} />;
    case "meison medical ismael": //krispy kreme
      return <MeisonGarantia data={data} />;
    case "meison ultrasonidos": //krispy kreme
      return <MeisonGarantia data={data} />;
    case "chison mexico": //ChisonMexicoGarantia
      return <ChisonMexicoGarantia data={data} />;
    case "mexrei": //MexreiGarantia
      return <MexreiGarantia data={data} />;
    case "equipamiento hospitalario": //EquipamientoHospitalarioGarantia
      return <EquipamientoHospitalarioGarantia data={data} />;
    case "promed": //ProMedGarantia
      return <ProMedGarantia data={data} />;
    case "soluciones hospitalarias": //SolucionesHospitalariasGarantia
      return <SolucionesHospitalariasGarantia data={data} />;
    case "helse medical": //HelsemedicalGarantia
      return <HelsemedicalGarantia data={data} />;
      case "lifemedic": //LifeMedicaGarantia
      return <LifeMedicaGarantia data={data} />;
      case "medical buy": //LifeMedicaGarantia
      return <MedicalBuyGarantia data={data} />;
    default:
      return <MedicalBuyGarantia data={data} />;
  }
};

export default function ModalFileGenerate({
  open = true,
  onClose = () => {},
  articleToGenerateFile,
  orderSelectedData,
  newDate,
  groupNameOrder,
  updateStateProducts,
}) {
  const { userData } = useSelector(userSelector);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const ordersServices = new OrdersServices();
  const [name, setName] = useState();

  useEffect(() => {
    setName(`Garantia-${newDate?.serialnumber}-${newDate?.product?.code}.pdf`);
  }, [newDate]);

  const generateTemplate = () => {
    let html = makeTemplateAlmacen(groupNameOrder, newDate);
    let formData = new FormData();
    formData.append("data", html);
    formData.append("name", `Garantia ${newDate.folio}.pdf`);
    formData.append("company", "test");
    formData.append("group", "test");
    formData.append("ejecutive", "test");
    return formData;
  };


  const handleOnClickGenerateWarranty = async () => {
    try {
      let formData = generateTemplate();
      let resp = await ordersServices.generatePdf(formData);
      console.log(resp);
      
      await ordersServices.updateArticleWarranty(articleToGenerateFile.id, resp.data.url);
      updateStateProducts(articleToGenerateFile.id, {
        guaranteeorder: resp.data.url,
      });

      saveInDocuments(resp);
      showAlertSucces("Garantia generada y almacenada en archivos de producto");
    } catch (error) {
      console.log(error);
      showAlertError("Error al generar garantia-");
    }
  };



  const handleOnChangeNameWarranty = e => {
    setName(e.target.value);
  };

  const saveInDocuments = async responseData => {
    await api.post("documents", {
      url: responseData.data.url,
      fileextension: "application/pdf",
      orderId: orderSelectedData?.orderId,
      warehouseproductId: articleToGenerateFile.id,
      uploadbyId: userData.id,
      filestypeId: "aAxqY77DbamWtWQ8Am9xbYde",
      size: responseData?.data?.size,
      name: name,
    });
  };

  return (
    <ModalFileGenerateStyled
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <div className="containermodal">
        <div className="headermodal">
          <h2>Generar Archivo</h2>
        </div>
        <div className="bodymodal">
          <div className="previw">{renderPreview(groupNameOrder, newDate)}</div>
        </div>
        <div className="input_name">
          <b className="text_input">Nombre del Archivo: </b>
          <input
            type="text"
            value={name}
            onChange={e => handleOnChangeNameWarranty(e)}
            className="inputWarranty"
            placeholder="Nombre del Archivo "
          />
        </div>
        <Divider></Divider>
        <div className="actions">
          <div className="actions-left">
            <Button onClick={() => onClose()} className="button-left-cancel">
              Cancelar
            </Button>
            <Button className="button-left-Generate">Generar</Button>
          </div>
          <div className="actions-right">
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleOnClickGenerateWarranty()}
              className="button-generate"
            >
              Generar y guardar en archivos de producto
            </Button>
          </div>
        </div>
      </div>
    </ModalFileGenerateStyled>
  );
}
