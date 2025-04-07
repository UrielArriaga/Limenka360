import { useState } from "react";
import { myTemplates } from "../constants";

const useTemplateDrawer = (updateTemplates, order) => {
  const [open, setOpen] = useState(false);
  const [serialNumber, setSerialNumber] = useState("");
  const [preview, setPreview] = useState();
  const [zoomCount, setZoomCount] = useState(100);
  const [emailUpdate, setEmailUpdate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState();

  //Datos para el preview y data para el PDF
  const templateData = {
    folio: order?.folio,
    teamName: selectedProduct?.product.name,
    // brand: "PRAZISE",
    // date: "23-05-2024",
    // clientName: "LILIAN",
    numberSerie: serialNumber,
    // model: "PRZ",
    // feactureNumber: "1321654687",
  };

  const handleOpenDrawer = (serialNumber, product) => {
    setSerialNumber(serialNumber);
    setSelectedProduct(product);
    setOpen(true);
  };

  const handleCloseDrawer = () => {
    setSerialNumber("");
    setOpen(false);
  };

  const handleTemplateDrawer = item => {
    setPreview(item.index);
    updateTemplates({
      serialNumber: serialNumber,
      templateName: item.name,
      templateIndex: item.index,
      templateData: templateData,
    });
  };

  return {
    open,
    handleOpenDrawer,
    handleCloseDrawer,
    preview,
    setPreview,
    zoomCount,
    setZoomCount,
    emailUpdate,
    setEmailUpdate,
    handleTemplateDrawer,
    RenderSelectTemplate: myTemplates.find(t => t.index === preview)?.component || null,
    templateData,
  };
};

export default useTemplateDrawer;
