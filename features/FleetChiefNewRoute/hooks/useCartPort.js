import React, { useContext, useState } from "react";
import { DepAttendantServices } from "../services";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { SocketContext } from "../../../context/socketContext";
import dayjs, { Dayjs } from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { templateCartaPorte, templateNoteRemission, templateSalidaGeneral } from "../../../templates/templatesHtml";
import { api } from "../../../services/api";
import { useRouter } from "next/router";

export default function useCartPort(ordersToAdd, dataOrder, finalData, isPackage) {
  const router = useRouter();
  const [name, setName] = useState(`Carta porte.pdf`);
  const steps = isPackage ? ["Salida"] : ["Carta Porte", "Nota de Remisión", "Salida"];
  const [activeStep, setActiveStep] = useState(0);
  const [nameNoteRemission, setNameNoteRemission] = useState(`Nota de remisión.pdf`);
  const [nameSalida, setNameSalida] = useState("Salida.pdf");
  const { showAlertSucces, showAlertError } = useAlertToast();
  const ordersServices = new DepAttendantServices();
  const { userData } = useSelector(userSelector);
  let newProducts = ordersToAdd?.map(order => order?.products).flat();
  const [newD, setNewD] = useState(newProducts);
  const { socket, online } = useContext(SocketContext);
  const Sphere = LogoSelect(userData?.groupName);
  const handleOnChangeNameCartPort = e => {
    setName(e.target.value);
  };

  const handleOnChangeNameNoteRemision = e => {
    setNameNoteRemission(e.target.value);
  };

  const handleOnChangeSalida = e => {
    setNameSalida(e.target.value);
  };

  const totalsum = productRute => {
    const totales = productRute?.map(item => {
      return parseFloat(item?.import.replace(/[$,]/g, ""));
    });
    let sumaTotal = totales?.reduce((acc, curr) => acc + curr, 0);
    return sumaTotal;
  };

  const NormalizeData = (driverSelect, dataOrder, productRute, ordersToAdd) => {
    let data = {
      id: "1",
      EjecutiveName: `${userData?.name} ${userData?.lastname}` || "Sin nombre",
      Folio: dataOrder?.data?.folio || "Sin Folio",
      serialnumber: "0098W",
      sphere: Sphere,
      createdAt: dayjs().format("DD/MM/YYYY "),
      phone: dataOrder?.data?.phone || "Sin numero ",
      metodpay: "Efectivo",
      phone: dataOrder?.data?.phone,
      sub: totalsum(newProducts),
      descuento: "0",
      total: totalsum(newProducts),
      client: {
        tax: "N/A",
        name: dataOrder?.data?.receive,
        rfc: "N/A",
        street: `${ordersToAdd[0]?.order?.address?.city?.name || ""} ${
          ordersToAdd[0]?.order?.address?.entity?.name || "sin direccion"
        }`,
      },
      transport: {
        nametrasport: driverSelect?.driver?.label,
        paisorigen: "Cdmx",
        totaldistance: driverSelect?.trasportunit?.mileage,
        tipetrasport: `${driverSelect?.trasportunit?.brand},${driverSelect?.trasportunit?.model}`,
        Numpermision: driverSelect?.trasportunit?.engine_number,
        placa: driverSelect?.trasportunit?.tuition,
        agetransport: dayjs(driverSelect?.trasportunit?.createdAt).format("YYYY"),
        poliza: driverSelect?.trasportunit?.insurance_policy,
        age: dayjs(driverSelect?.trasportunit?.createdAt).format("YYYY"),
      },
      products: newProducts,
    };

    return data;
  };

  const generateTemplate = data => {
    let response = templateCartaPorte(data);
    let formData = new FormData();
    formData.append("data", response);
    formData.append("name", `Carta Porte.pdf`);
    formData.append("company", "test");
    formData.append("group", "test");
    formData.append("ejecutive", "test");
    return formData;
  };

  const generatCartPort = async data => {
    try {
      let confirm = window.confirm(
        "¿Al generar la carta porte no podras modificarla, estas seguro de generarla al igual de la ruta?"
      );
      if (!confirm) {
        return;
      }
      let formData = generateTemplate(data);
      let resp = await ordersServices.generatePdf(formData);
      console.log("carta porte", resp.data.url);

      await ordersServices.postRoute({
        assigned_date: dayjs().format(),
        km_output: finalData?.bodyForm?.km_output,
        km_arrival: finalData?.bodyForm?.km_arrival,
        comment: "",
        transportunitId: finalData?.bodyForm?.transportunitId,
        driverId: finalData?.bodyForm?.driverId,
        inventorytoaddroute: finalData?.inventorytoaddroute,
        url: resp.data.url,
        warehouseId: userData?.warehouse?.id,
        alias: finalData?.bodyForm?.alias,
      });

      console.log("warehouseId", userData);

      saveInDocuments(resp, name);
      showAlertSucces("Carta Porte generada correctamente");
      generatePDF(data);
      generateSalida(data);
    } catch (error) {
      console.log(error);
      showAlertError("Error al generar garantia");
    }
  };

  const generatePDF = async data => {
    let confirm = window.confirm(
      "¿Al generar la nota de remision no podras modificarla, estas seguro de generarla al igual de la ruta?"
    );
    if (!confirm) {
      return;
    }
    let response = templateNoteRemission(data);
    try {
      let form = new FormData();
      form.append("data", response);
      form.append("name", "Nota de Remision.pdf");
      form.append("company", "test");
      form.append("group", "test");
      form.append("ejecutive", "test");
      let dataresults = await api.post("convert/pdf", form);
      let { url } = dataresults.data;
      console.log("nota de mision ", url);

      saveInDocuments(dataresults, nameNoteRemission);
      showAlertSucces("Nota de remisión generada correctamente");
      socket?.emit("newnotification", {
        orderId: dataOrder?.data?.id,
        message: "Pedido en ruta",
        notificationtype: "en ruta ",
      });

      await ordersServices.updateOrderStatus(dataOrder?.data?.id, "en ruta");

      router.push("/jefedeflotilla/rutas");
    } catch (error) {
      console.log(error);
      showAlertError("Error al generar Nota de Remisión");
    }
  };

  const generateSalida = async data => {
    if (!window.confirm("¿Al generar la Salida General no podrás modificarla, ¿estás seguro de generarla?")) return;

    try {
      const formData = new FormData();
      formData.append("data", templateSalidaGeneral(data));
      formData.append("name", "Salida.pdf");
      formData.append("company", "test");
      formData.append("group", "test");
      formData.append("ejecutive", "test");

      const pdfData = await api.post("convert/pdf", formData);
      console.log("saldia general ", pdfData.url);

      saveInDocuments(pdfData, nameSalida);
      showAlertSucces("Salida General generada correctamente");
    } catch (error) {
      console.error("Error al generar PDF Salida:", error);
    }
  };

  const saveInDocuments = async (responseData, type) => {
    await api.post("documents", {
      url: responseData?.data?.url,
      fileextension: "application/pdf",
      orderId: dataOrder?.data?.id,
      uploadbyId: userData.id,
      filestypeId: "aAxqY77DbamWtWQ8Am9xbYde",
      size: responseData?.data?.size,
      name: type,
    });
  };

  const handleNext = () => {
    if (activeStep === 2) {
      //   console.log("se estan ocupadas todos o steep");
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleEditProduct = (value, identifier, position) => {
    let copyordersToAdd = [...newProducts];
    copyordersToAdd[position][identifier] = value;
    setNewD(copyordersToAdd);
  };
  return {
    name,
    nameNoteRemission,
    nameSalida,
    steps,
    activeStep,
    newProducts,
    newD,
    handleNext,
    handleOnChangeNameCartPort,
    handleOnChangeNameNoteRemision,
    handleBack,
    generatCartPort,
    handleEditProduct,
    handleOnChangeSalida,
    NormalizeData,
    generateSalida,
  };
}
