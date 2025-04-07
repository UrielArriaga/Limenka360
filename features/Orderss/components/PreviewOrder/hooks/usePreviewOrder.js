import { useState } from "react";
import { api } from "../../../../../services/api";

export default function usePreviewOrder() {
  const [openActions, setOpenActions] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [tab, setTab] = useState(1);

  const handleTabs = value => setTab(value);
  const handleCloseActions = () => {
    setTypeAction("");
    setOpenActions(false);
  };

  const handleOpenAction = type => {
    setTypeAction(type);
    setOpenActions(true);
  };

  const handleDownload = async order => {
    try {
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: order?.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/pdf;charset=utf-8`,
      });
      saveAs(pdfBlob, `${order.folio}`);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    tab,
    handleTabs,
    actionsOrder: {
      openActions,
      typeAction,
      handleCloseActions,
    },
    handleOpenAction,
    handleDownload,
  };
}
