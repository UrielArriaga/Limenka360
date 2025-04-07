import React, { useEffect, useState } from "react";
import { ActionsAdminServices } from "../services/api";
import { api } from "../../../services/api";
import { saveAs } from "file-saver";
export default function useSaleId(orderSelected) {
  const ordersService = new ActionsAdminServices();
  const [orderSelectedData, setOrderSelectedData] = useState(null);

  const [isFetchingOrder, setIsFetchingOrder] = useState(false);
  const [dataPayments, setDataPayments] = useState([]);
  const [tabIndex, setTabIndex] = useState(0);
  const [openpreview, setOpenpreview] = useState(false);
  const [loadingPdf, setLoadingpdf] = useState(false);

  useEffect(() => {
    if (orderSelected) {
      getDataOrder();
      getDataPayments();
    }
  }, [orderSelected]);

  let getDataOrder = async () => {
    try {
      setIsFetchingOrder(true);
      const response = await ordersService.saleId(orderSelected.id);
      setOrderSelectedData({
        ...response.data,
      });
      setIsFetchingOrder(false);
    } catch (error) {
      setIsFetchingOrder(false);
    }
  };

  const getDataPayments = async () => {
    try {
      let query = {};
      query.oportunityId = orderSelected?.itemBd?.id;
      let paymentse = await api.get(
        `salespayments?where=${JSON.stringify(query)}&include=oportunity,oportunity.prospect&count=1`
      );
      setDataPayments(paymentse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTabChange = event => {
    setTabIndex(event);
  };

  const handleOpenPreview = () => {
    setOpenpreview(!openpreview);
  };
  const handleDownloadFile = async item => {
    setLoadingpdf(true);
    try {
      let typeFile = item?.quoteurl?.split(".").pop();
      let typeFileName = item?.quoteurl.split("/").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: item?.quoteurl,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${typeFileName}`);
      setLoadingpdf(false);
    } catch (error) {
      setLoadingpdf(false);
      console.log(error);
    }
  };
  return {
    orderSelectedData,
    isFetchingOrder,
    dataPayments,
    tabIndex,

    handleOpenPreview,
    handleTabChange,
    setOpenpreview,
    openpreview,
    handleDownloadFile,
    loadingPdf,
  };
}
