import { Box, Button, CircularProgress, Grid } from "@material-ui/core";
import React from "react";
import { DataOrderPdfStyled } from "./styled";
import { useState } from "react";
import { CloudDownload } from "@material-ui/icons";
import dayjs from "dayjs";
import { formatNumber, handleGlobalAlert, toUpperCaseChart } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import { makeTemplateOrder } from "../../templates/makeTemplate";
import { saveAs } from "file-saver";
import { URL_SPACE, api } from "../../services/api";

export default function DataOrderPdf(props) {
  const { infoOrders, productsCotization } = props;
  const dispatch = useDispatch();
  const { userData, id_user, roleId } = useSelector(userSelector);
  const [isCreatingPDF, setIsCreatingPDF] = useState(false);
  const generateAgainPdf = async () => {
    try {
      setIsCreatingPDF(true);
      let today = dayjs().format("DD-MM-YYYY");
      let companys = {
        id: company,
      };

      let ejecutive = {};
      if (roleId === "ejecutivo") {
        ejecutive.name = `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`;
        ejecutive.lastname = toUpperCaseChart(userData?.lastname);
        ejecutive.phone = userData?.phone;
      } else {
        ejecutive.name = infoOrders?.oportunity?.soldby?.name;
        ejecutive.lastname = infoOrders?.oportunity?.soldby?.lastname;
        ejecutive.phone = infoOrders?.oportunity?.soldby?.phone;
      }
      let data = {};
      data.concept = infoOrders?.folio;
      data.groupLogo = userData?.grouplogo == "" ? undefined : userData?.grouplogo;
      data.dateOrder = today;
      if (infoOrders.observations !== "") {
        data.observations = infoOrders.observations;
      } else {
        data.observations = "";
      }
      data.companyId = userData.companyId;
      data.companys = companys;
      data.ejecutive = ejecutive;
      let adressPdf = {
        receive: infoOrders.receive,
        entity: infoOrders?.address?.entity?.name,
        city: infoOrders?.address?.city?.name,
        postal: infoOrders?.address?.postal?.postal_code,
        street: infoOrders?.address?.street,
        int_number: infoOrders?.address?.int_number,
        ext_number: infoOrders?.address?.ext_number,
        settlement: infoOrders?.address?.settlement,
        phone: infoOrders?.phone,
        references: infoOrders?.address?.references,
      };
      data.adressPdf = adressPdf;
      data.paymentaccount = infoOrders?.paymentaccount?.name;
      if (infoOrders?.billing == true) {
        let adressBilling = {
          billingbusiness: infoOrders?.bill?.businessname,
          rfc: infoOrders?.bill?.rfc,
          phone: infoOrders?.bill?.phone,
          street: infoOrders?.bill?.address?.street,
          int_number: infoOrders?.bill?.address?.int_number,
          ext_number: infoOrders?.bill?.address?.ext_number,
          settlement: infoOrders?.bill?.address?.settlement,
          postal: infoOrders?.bill?.address?.postal?.postal_code,
          entity: infoOrders?.bill?.address?.entity?.name,
          city: infoOrders?.bill?.address?.city?.name,
        };
        data.adressBilling = adressBilling;
        data.cfdi = infoOrders?.bill?.cfdi?.name;
        data.methodPayment = infoOrders?.bill?.paymentmethod?.name;
        data.wayPayment = infoOrders?.bill?.paymentway?.name;
        data.taxregime = infoOrders?.bill?.taxregime?.name;
      } else {
        let adressBilling = {
          billingbusiness: "",
          rfc: "",
          phone: "",
          street: "",
          int_number: "",
          ext_number: "",
          settlement: "",
          postal: "",
          entity: "",
          city: "",
        };
        data.adressBilling = adressBilling;
        data.cfdi = "";
        data.methodPayment = "";
        data.wayPayment = "";
        data.taxregime = "";
      }
      data.products = productsCotization;
      data.iva = formatNumber(infoOrders?.oportunity?.totaliva);
      data.discount = formatNumber(infoOrders?.oportunity?.discount);
      data.total = formatNumber(infoOrders?.oportunity?.amount);
      data.subtotal = formatNumber(infoOrders?.oportunity?.subtotal);
      let user = id_user;
      let group = userData.groupId;
      let response = makeTemplateOrder(data);
      let company = userData.companyId;
      const form = new FormData();
      form.append("name", infoOrders.folio);
      form.append("data", response);
      form.append("company", company);
      form.append("group", group);
      form.append("ejecutive", user);
      let responsePDFURL = await api.post("convert/pdf", form);
      let dataUrl = {};
      dataUrl.url = responsePDFURL.data.url;
      let orderUrl = api.put(`orders/${infoOrders?.id}`, dataUrl);
      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: URL_SPACE + responsePDFURL.data.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      saveAs(pdfBlob, `${infoOrders.folio}.pdf`);
      setIsCreatingPDF(false);
    } catch (error) {
      setIsCreatingPDF(false);
      handleGlobalAlert("error", "Ocurrio un error al generar PDF", "basic", dispatch, 6000);
      console.log(error);
    }
  };
  return (
    <DataOrderPdfStyled>
      {isCreatingPDF ? (
        <div className="loaders">
          <CircularProgress className="loader" style={{ height: 20, width: 20 }} />
          Generando Pdf
        </div>
      ) : (
        <Button
          className="down"
          onClick={() => generateAgainPdf()}
          variant="contained"
          color="primary"
          startIcon={<CloudDownload />}
          disabled={isCreatingPDF}
        >
          {"Generar Pdf"}
        </Button>
      )}
    </DataOrderPdfStyled>
  );
}
