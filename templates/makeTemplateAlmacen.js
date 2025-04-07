import React from "react";
import {
  templateEquipamientoHospitalarioGarantia,
  templateMexreiGarantia,
  templateMeisonGarantia,
  templateGarantiaChiso,
  templateProMedGarantia,
  templateSolucionesHospitalariasGarantia,
  templateLifeMedicaGarantia,
  templateHelsemedicalGarantia,
  templateNationalRosster,
  templateNewOrder,
  templateMedicalBuyGarantia,
} from "./templatesHtml";
import { renderTemplateCarta } from "./makeTemplateBiomedica";
import dayjs from "dayjs";

const normalizeDataOrders = item => {
  return {
    nameproduct: item?.product?.name || "Sin nombre",
    serialnumber: item?.serialnumber || "Sin numero de serie",
    namebrand: item?.product?.brand?.name || "Sin marca",
    brand: item?.product?.brand,
    folio: item?.folio || "Sin folio",
    nss: item?.serialnumber || "Sin nss",
    model: item?.product?.code || "Sin modelo",
    date: dayjs(item?.createdAt).format("DD/MM/YYYY") || "Sin fecha",
    dateremission: item?.dateemission || "Sin Fecha de Emision",
    billing: item?.billing || "Sin facturación",
    address: item?.address || "Sin dirección",
    clientname: item?.receive || "Sin cliente",
    status: item?.statuswho || "Sin estatus",
    quantity: item?.oportunity?.quantity || "0",
    invoicenumberornote: item.numberfacture || "Sin facturación",
    nametec: item?.tecname || "Sin técnico",
    rfc: item?.rfc || "Sin rfc",
    neighborhood: item?.neighborhood || "Sin colonia",
    delegation: item?.delegation || "Sin delegación",
    locality: item?.locality || "Sin localidad",
    cp: item?.cp || "Sin código postal",
    entity: item?.entity || "Sin Entidad",
    phone: item?.phone || "Sin Numero",
    address: item?.address || "Sin Información",
    oportunity: item?.oportunity,
  };
};

const normalizeCart = item => {
  return {
    date: dayjs().format("DD/MM"),
    trainingday: "08/11/2024",
    nametraning: "Marco Marin lopez",
    equipement: "medicalby",
    sphere: "---",
    localitation: "Ciudad de méxico, alcaldia Coyoacan.",
    starttime: "13:00hrs",
    endtime: "13:45hrs",
  };
};

function makeTemplateAlmacen(template, objetData) {
  let data = {};

  if (template === "satisfaction") {
    data = normalizeCart(objetData);
  } else {
    data = normalizeDataOrders(objetData);
  }
  let finallyTemplate = "";
  switch (template) {
    case "satisfaction":
      finallyTemplate = renderTemplateCarta(data);
      break;
    case "EquipamientoHospitalarioGarantia": //EquipamientoHospitalarioGarantia
      finallyTemplate = templateEquipamientoHospitalarioGarantia(data);
      break;
      case "MexreiGarantia": //MexreiGarantia
      finallyTemplate = templateMexreiGarantia(data);
      break;
    case "rayos x": //MexreiGarantia
      finallyTemplate = templateMexreiGarantia(data);
      break;
      case "ultrasonidos carlos": //MexreiGarantia
      finallyTemplate = templateGarantiaChiso(data);
      break;
    case "meison medical ismael": // krispy kreme
      finallyTemplate = templateMeisonGarantia(data);
      break;
      case "meison medical abigail": 
      finallyTemplate = templateMeisonGarantia(data);
      break;
    case "ChisonMexicoGarantia": // ChisonMexicoGarantia
      finallyTemplate = templateGarantiaChiso(data);
      break;
      case "ChisonMexicoGarantia": // ChisonMexicoGarantia
      finallyTemplate = templateGarantiaChiso(data);
      break;
    case "ProMedGarantia": //ProMedGarantia
      finallyTemplate = templateProMedGarantia(data);
      break;
    case "SolucionesHospitalariasGarantia": //SolucionesHospitalariasGarantia
      finallyTemplate = templateSolucionesHospitalariasGarantia(data);
      break;
    case "LifeMedicaGarantia": //LifeMedicaGarantia
      finallyTemplate = templateLifeMedicaGarantia(data);
      break;
    case "HelsemedicalGarantia": //HelsemedicalGarantia
      finallyTemplate = templateHelsemedicalGarantia(data);
      break;
    case "medicalbuy pablo": //medicalbuy
      finallyTemplate = templateMedicalBuyGarantia(data);
      break;
    case "medicalbuy gabriel": //medicalbuy
      finallyTemplate = templateMedicalBuyGarantia(data);
      break;
    case "medicalbuy puebla": //medicalbuy Puebla
      finallyTemplate = templateMedicalBuyGarantia(data);
      break;
    case "medicalbuy bajio": //medicalbuy Bajio
      finallyTemplate = templateMedicalBuyGarantia(data);
      break;
    case "medicalbuy monterrey": //medicalbuy Bajio
      finallyTemplate = templateMedicalBuyGarantia(data);
      break;
    default:
      finallyTemplate = templateMedicalBuyGarantia(data);
      break;
  }
  return finallyTemplate;
}

export default makeTemplateAlmacen;

export const makeTemplateOrder = (template, data) => {
  let finallyTemplate = "";
  switch (template) {
    case 1:
      finallyTemplate = templateNewOrder(data);
      break;
    case 2:
      finallyTemplate = templateNationalRosster(data);
      break;
    default:
      break;
  }
  return finallyTemplate;
};
