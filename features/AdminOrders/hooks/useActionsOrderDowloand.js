import { useEffect, useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../services/api";
import dayjs from "dayjs";
import { statuspoo } from "../../../constants";
import useModal from "../../../hooks/useModal";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import useGlobalCommons from "../../../hooks/useGlobalCommons";
import { saveAs } from "file-saver";
import { formatNumber, toUpperCaseChart } from "../../../utils";
import { makeTemplateOrder, makeTemplateOrderUpdate } from "../../../templates/makeTemplate";

export const useActionsOrderDowloand = (orderSelected, updatePropertyLocal, updateItemPropertyLocal, productData) => {
  const { showAlertError, showAlertSucces, showAlertStart, showAlertFinish } = useAlertToast();
  const { addTracking } = useGlobalCommons();
  const [anchorEl, setAnchorEl] = useState(null);

  const [orderFa, setOrderFa] = useState();

  const { open: openModalApproved, toggleModal: toggleModalApproved } = useModal();
  const { open: openModalReject, toggleModal: toggleModalReject } = useModal();
  const [reasonSelected, setReasonSelected] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const { id_user, roleId, userData, company } = useSelector(userSelector);

  const handleMenuOpen = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setOrderFa(orderSelected);
  }, [orderSelected]);

  const formatEjecutive = (roleId, userData, infoOrders) => {
    const isExecutive = roleId === "ejecutivo";
    return {
      name: isExecutive
        ? `${toUpperCaseChart(userData?.title)} ${toUpperCaseChart(userData?.name)}`
        : toUpperCaseChart(infoOrders?.createdbyid?.name),
      lastname: isExecutive
        ? toUpperCaseChart(userData?.lastname)
        : toUpperCaseChart(infoOrders?.createdbyid?.lastname),
      phone: isExecutive ? userData?.phone : infoOrders?.createdbyid.phone,
    };
  };

  const formatAdressPdf = infoOrders => ({
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
  });

  const formatAdressBilling = infoOrders => {
    if (infoOrders?.billing) {
      return {
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
    } else {
      return {
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
    }
  };

  const prepareData = (today, company, ejecutive, infoOrders, userData, productsCotization) => ({
    concept: infoOrders?.folio,
    groupLogo: userData?.grouplogo || undefined,
    dateOrder: today,
    observations: infoOrders?.observations || "",
    companyId: userData.companyId,
    companys: { id: company },
    ejecutive,
    adressPdf: formatAdressPdf(infoOrders),
    paymentaccount: infoOrders?.paymentaccount?.name,
    adressBilling: formatAdressBilling(infoOrders),
    cfdi: infoOrders?.billing ? infoOrders?.bill?.cfdi?.name : "",
    methodPayment: infoOrders?.billing ? infoOrders?.bill?.paymentmethod?.name : "",
    wayPayment: infoOrders?.billing ? infoOrders?.bill?.paymentway?.name : "",
    taxregime: infoOrders?.billing ? infoOrders?.bill?.taxregime?.name : "",
    products: productsCotization,
    iva: formatNumber(infoOrders?.oportunity?.totaliva),
    discount: formatNumber(infoOrders?.oportunity?.discount),
    total: formatNumber(infoOrders?.oportunity?.amount),
    subtotal: formatNumber(infoOrders?.oportunity?.subtotal),
  });

  const handleOnChangeReason = option => {
    console.log(option);
    setReasonSelected(option);
  };

  const handleOnClickApprove = async () => {
    try {
      let dataTracking = {
        prospectId: orderSelected?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderSelected?.oportunityId,
        orderId: orderSelected?.id,
        observations: `El Pedido ${orderSelected?.folio} fue Aprobado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
        reason: `Seguimiento Automatico`,
      };

      updatePropertyLocal("orderstatusId", "9eQCIBnRvc990VlJfgswanCh");
      updatePropertyLocal("orderstatus", {
        id: "9eQCIBnRvc990VlJfgswanCh",
        name: "Aprobado",
      });

      updateItemPropertyLocal(orderSelected.id, "orderstatus", "Aprobado");

      addTracking(dataTracking);

      toggleModalApproved();
      showAlertSucces("Se actualizó correctamente");
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrió un error");
    }
  };

  const handleOnClickReject = async () => {
    try {
      let data = {
        rejectedreason: "",
        orderrejectId: reasonSelected.id,
        rejectbyId: id_user,
      };

      let dataTracking = {
        prospectId: orderSelected?.oportunity?.prospectId,
        status: "5",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: orderFa?.oportunityId,
        orderId: orderSelected?.id,
        observations: `El Pedido ${orderSelected?.folio} fue Rechazado.`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
        reason: `Seguimiento Automatico`,
      };
      let responseApproved = await api.put(`orders/reject/${orderSelected.id}`, data);

      addTracking(dataTracking);

      updatePropertyLocal("orderstatusId", reasonSelected.id);
      updatePropertyLocal("orderstatus", reasonSelected.name);
      updateItemPropertyLocal(orderSelected.id, "orderstatus", "Rechazado");

      toggleModalReject();
      showAlertSucces("Se actualizó correctamente");
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrió un error");
    }
  };

  const dowloandFile = async (urlFile, nameToFile = "file") => {
    try {
      showAlertStart("Cargando pdf");
      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: urlFile,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      showAlertSucces("El archivo se descargara en unos segundos");
      saveAs(pdfBlob, `${nameToFile}.pdf`);
      showAlertFinish();
    } catch (error) {
      console.log(error);
      showAlertError("Ocurrió un error");
    }
  };

  const generateAndDowloandPDF = async () => {
    try {
      showAlertStart("Generando pdf, esto puede demorar unos segundos");
      const today = dayjs().format("DD-MM-YYYY");
      const ejecutive = formatEjecutive(roleId, userData, orderSelected);
      const data = prepareData(today, company, ejecutive, orderSelected, userData, productData.results);

      console.log(orderSelected);
      console.log(data);

      const formData = new FormData();
      formData.append("name", orderSelected.folio);
      formData.append("data", makeTemplateOrderUpdate(data));
      formData.append("company", userData.companyId);
      formData.append("group", userData.groupId);
      formData.append("ejecutive", id_user);

      const responsePDFURL = await api.post("convert/pdf", formData);

      const dataUrl = { url: responsePDFURL.data.url };
      showAlertFinish();
      window.open(dataUrl.url, "_blank");
    } catch (error) {
      showAlertFinish();

      console.log(error);
      showAlertError("Ocurrió un error");
    }
  };

  return {
    options: [
      {
        label: "Descargar pedido",
        value: "xx",
        action: () => dowloandFile(orderSelected?.url, orderSelected?.folio),
      },
      {
        label: "Descargar cotizacion",
        value: "xx",
        action: () => dowloandFile(orderSelected?.oportunity?.quoteurl, orderSelected?.oportunity?.concept),
      },
      {
        label: "Generar pdf pedido",
        value: "xx",
        action: () => generateAndDowloandPDF(),
      },
    ],
    anchorEl,
    handleMenuOpen,
    handleMenuClose,
    openModalApproved,
    toggleModalApproved,
    openModalReject,
    toggleModalReject,
    reasonSelected,
    handleOnChangeReason,
    handleOnClickReject,
    handleOnClickApprove,
    isSaving,
  };
};
