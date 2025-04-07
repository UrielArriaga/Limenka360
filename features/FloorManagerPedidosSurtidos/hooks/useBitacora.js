import React, { useState } from "react";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { templateBitacora } from "../../../templates/templatesHtml";
import { api } from "../../../services/api";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useBitacora({ productsData, orderSelectedData }) {
  const { showAlertSucces, showAlertError } = useAlertToast();
  const { userData } = useSelector(userSelector);
  const [open, setOpen] = useState(false);
  const NormalizeBitacora = (product, orderSelectedData) => {
    return {
      namealmacen: userData?.name,
      brand: product?.product?.brand?.name,
      name: product?.product?.name,
      ubi: "",
      serial: product?.serialnumber,
      folio: orderSelectedData?.folio,
      date: dayjs(orderSelectedData?.createdAt).format("DD/MM/YYYY"),
      code: product?.product.code,
    };
  };

  let ProductsNormalizeBitacota = productsData?.results.map(item => NormalizeBitacora(item, orderSelectedData));

  const previewOpen = () => {
    setOpen(true);
  };

  const generatePDF = async () => {
    let response = templateBitacora(ProductsNormalizeBitacota);

    try {
      let form = new FormData();
      form.append("name", "Bitacora");
      form.append("data", response);
      form.append("company", "documents bitacora");
      form.append("group", "yT3L1A9xZr8V3hgUOSJSqOqX");
      form.append("ejecutive", "YNQHRt32OCbt0shXa0yOa51t");
      form.append("orientation", "landscape");
      let dataresults = await api.post("convert/pdf", form);
      let { url } = dataresults.data;

      saveInDocuments(dataresults);

      handleDownloadFile(dataresults.data);
    } catch (error) {
      console.log(error, "ERROR TEMPLATE");
    }
  };

  const saveInDocuments = async dataresults => {
    try {
      showAlertSucces(`Bitacora guardada y generada correctamente`);
      Cloused();
    } catch (error) {
      console.log(error);
    }
  };
  const handleDownloadFile = async item => {
    try {
      let typeFile = item?.url.split(".").pop();
      let typeFileName = item?.url.split("/").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: item?.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${typeFileName}`);
    } catch (error) {
      console.log(error);
    }
  };

  const Cloused = () => {
    setOpen(false);
  };
  return {
    open,
    setOpen,
    Cloused,
    previewOpen,
    ProductsNormalizeBitacota,
    generatePDF,
  };
}
