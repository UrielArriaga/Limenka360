import React, { useContext, useEffect, useState } from "react";
import { DepAttendantServices } from "../services";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { SocketContext } from "../../../context/socketContext";
import dayjs, { Dayjs } from "dayjs";
import useAlertToast from "../../../hooks/useAlertToast";
import { templateCartaPorte, templateNoteRemission, templateSalidaGeneralForaneos } from "../../../templates/templatesHtml";
import { api } from "../../../services/api";
import { useRouter } from "next/router";
import LogoSelect from "../../../components/Group";
import { saveAs } from "file-saver";

export default function useCartPort(ordersToAdd, dataOrder, finalData, isPackage) {
  const router = useRouter();
  const [name, setName] = useState(`Carta porte.pdf`);
  const steps = isPackage ? ["Salida"] : ["Carta Porte", "Nota de Remisión", "Salida"];
  const [activeStep, setActiveStep] = useState(0);
  const [nameNoteRemission, setNameNoteRemission] = useState(`Nota de remisión.pdf`);
  const [nameSalida, setNameSalida] = useState("SalidaForaneos.pdf");
  const { showAlertSucces, showAlertError, showAlertStart, showAlertFinish } = useAlertToast();
  const ordersServices = new DepAttendantServices();
  const { userData } = useSelector(userSelector);
  let newProducts = ordersToAdd?.map(order => order?.products).flat();
  const [newD, setNewD] = useState(newProducts);
  const [folioSerial, setFolioSerial] = useState("");
  const { socket, online } = useContext(SocketContext);
  const Sphere = LogoSelect(userData?.groupName);

  const [isLoading, setIsLoading] = useState(false);
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
      sphere: Sphere,
      groupName: dataOrder?.data?.createdbyid?.group?.name,
      EjecutiveName: `${dataOrder?.data?.createdbyid?.fullname}` || "Sin nombre",
      Folio: dataOrder?.data?.folio || "Sin Folio",
      folioSerial: folioSerial,
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
  useEffect(() => {
    generarFolio();
  }, []);
  const generarFolio = () => {
    const fecha = new Date();
    const año = fecha.getFullYear().toString().slice(-2); // Últimos 2 dígitos del año
    const mes = String(fecha.getMonth() + 1).padStart(2, "0"); // Mes con dos dígitos
    const dia = String(fecha.getDate()).padStart(2, "0"); // Día con dos dígitos

    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let hash = "";
    for (let i = 0; i < 4; i++) {
      hash += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    setFolioSerial(`${año}${mes}${dia}-${hash}`);
  };

  const fetchBlob = async url => {
    return await api.post(
      "convert/pdfbuffer",
      {
        pdfurl: url,
      },
      {
        responseType: "blob",
      }
    );
  };

  async function createDeliveryRoutex(data) {
    const steps = [
      { view: "Carta Porte", save: true, documentName: name },
      { view: "Nota de Remisión", save: false, documentName: nameNoteRemission },
      { view: "Salida General", save: false, documentName: nameSalida },
    ];

    try {
      for (const step of steps) {
        const { view, save, documentName } = step;

        showAlertStart(`Generando ${view}`);

        const responsePdf = await ordersServices.generatePdf(generateTemplateFormData(documentName, data));
        showAlertFinish(`${view} generada correctamente`);

        if (save) {
          showAlertStart(`Guardando ${view} en documentos`);
          saveInDocuments(responsePdf, documentName);
          showAlertFinish(`${view} guardada correctamente`);
        }
      }
    } catch (error) {
      console.error("Error durante la generación de documentos:", error);
      showAlertFinish("Ocurrió un error al procesar los documentos. Por favor, inténtalo nuevamente.");
    }
  }

  const createDeliveryRoute = async (data, onlyExit) => {
    try {
      setIsLoading(true);

      if (onlyExit) {
        const stepExit = [{ label: "Salida General", name: nameSalida, template: "Salida" }];

        for (const step of stepExit) {
          const { label, name, template } = step;

          showAlertStart(`Generando ${label}`);
          const responsePdf = await ordersServices.generatePdf(generateTemplateFormData(template, data));
          showAlertFinish(`${label} generada correctamente`);

          showAlertStart(`Guardando ${label} en documentos`);
          // await saveInDocuments(responsePdf, name);
          const responseBlob = await fetchBlob(responsePdf?.data?.url);
          saveAs(responseBlob.data, name);
          showAlertFinish(`${label} guardada correctamente`);

          let respPost = await ordersServices.postRoute({
            assigned_date: dayjs().format(),
            km_output: finalData?.bodyForm?.km_output,
            km_arrival: finalData?.bodyForm?.km_arrival,
            comment: "",
            transportunitId: finalData?.bodyForm?.transportunitId,
            driverId: finalData?.bodyForm?.driverId,
            inventorytoaddroute: finalData?.inventorytoaddroute,
            url: responsePdf.data.url,
            urlcart: responsePdf.data.url,
            urlnote: responsePdf.data.url,
            warehouseId: userData?.warehouse?.id,
            alias: finalData?.bodyForm?.alias,
          });

          socket?.emit("newnotification", {
            orderId: dataOrder?.data?.id,
            message: "Pedido en ruta",
            notificationtype: "en ruta ",
          });

          await ordersServices.updateOrderStatus(dataOrder?.data?.id, "en ruta");

          router.push("/almacenesforaneos/rutas");

          showAlertSucces("Ruta generada correctamente");

          return;
        }
      }

      const steps = [
        { label: "Carta Porte", name: name, template: "Carta Porte" },
        { label: "Nota de Remisión", name: nameNoteRemission, template: "Nota de Remisión" },
        { label: "Salida General", name: nameSalida, template: "Salida" },
      ];

      let responsePdfExit, responsePdfNoteRemission, responsePdfCartaPorte;
      for (const step of steps) {
        const { label, name, template } = step;

        showAlertStart(`Generando ${label}`);
        const responsePdf = await ordersServices.generatePdf(generateTemplateFormData(template, data));

        if (label === "Salida General") {
          responsePdfExit = responsePdf;
        }

        if (label === "Nota de Remisión") {
          responsePdfNoteRemission = responsePdf;
        }

        if (label === "Carta Porte") {
          responsePdfCartaPorte = responsePdf;
        }

        showAlertFinish(`${label} generada correctamente`);

        showAlertStart(`Guardando ${label} en documentos`);
        // await saveInDocuments(responsePdf, name);
        const responseBlob = await fetchBlob(responsePdf?.data?.url);
        saveAs(responseBlob.data, name);
        showAlertFinish(`${label} guardada correctamente`);
      }

      let respPost = await ordersServices.postRoute({
        assigned_date: dayjs().format(),
        km_output: finalData?.bodyForm?.km_output,
        km_arrival: finalData?.bodyForm?.km_arrival,
        comment: "",
        transportunitId: finalData?.bodyForm?.transportunitId,
        driverId: finalData?.bodyForm?.driverId,
        inventorytoaddroute: finalData?.inventorytoaddroute,
        url: responsePdfExit.data.url,
        urlcart: responsePdfCartaPorte.data.url,
        urlnote: responsePdfNoteRemission.data.url,
        warehouseId: userData?.warehouse?.id,
        alias: finalData?.bodyForm?.alias,
      });

      socket?.emit("newnotification", {
        orderId: dataOrder?.data?.id,
        message: "Pedido en ruta",
        notificationtype: "en ruta ",
      });

      await ordersServices.updateOrderStatus(dataOrder?.data?.id, "en ruta");
      router.push("/almacenesforaneos/rutas");

      showAlertSucces("Ruta generada correctamente");
      setIsLoading(false);
    } catch (error) {
      console.error("Error al generar la ruta de entrega:", error);
      showAlertFinish("Ocurrió un error al procesar los documentos. Por favor, inténtalo nuevamente.");
      setIsLoading(false);
    }
  };

  const createDeliveryRoutea = async data => {
    try {
      setIsLoading(true);

      // * Carta Porte-----
      showAlertStart("Generando Carta Porte");
      let responsePdfCartaPorte = await ordersServices.generatePdf(generateTemplateFormData("Carta Porte", data));
      showAlertFinish("Carta Porte generada correctamente");

      showAlertStart("Guardando Carta Porte en documentos");

      await saveInDocuments(responsePdfCartaPorte, name);

      let responsePDFSAVE = await fetchBlob(responsePdfCartaPorte?.data?.url);

      saveAs(responsePDFSAVE.data, `${name}`);

      showAlertFinish("Carta Porte guardada correctamente");

      // * FIN Carta Porte-----

      // * Nota de Remisión-----------
      showAlertStart("Generando Nota de Remisión");

      let responsePdfNoteRemission = await ordersServices.generatePdf(
        generateTemplateFormData("Nota de Remisión", data)
      );

      await saveInDocuments(responsePdfNoteRemission, name);

      let responsePDFNote = await fetchBlob(responsePdfNoteRemission?.data?.url);

      saveAs(responsePDFNote.data, `${nameNoteRemission}`);

      showAlertFinish("Nota de Remisión generada correctamente");

      // * Nota de Remisión------------

      // * Salida General------------------------------

      showAlertStart("Generando Salida General");

      let responsePdfSalida = await ordersServices.generatePdf(generateTemplateFormData("Salida", data));

      await saveInDocuments(responsePdfSalida, name);

      let responsePDFSalida = await fetchBlob(responsePdfSalida?.data?.url);

      saveAs(responsePDFSalida.data, `${nameSalida}`);

      showAlertFinish("Salida General generada correctamente");

      // * Salida General------------------------------

      setIsLoading(false);
      console.log(responsePdfCartaPorte?.data);
      console.log(responsePdfNoteRemission?.data);
      console.log(responsePdfSalida?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const generateTemplateFormData = (view, data) => {
    let response = "";
    let formData = new FormData();

    switch (view) {
      case "Carta Porte":
        response = templateCartaPorte(data);
        formData.append("data", response);
        formData.append("name", `Carta Porte.pdf`);
        formData.append("company", "test");
        formData.append("group", "test");
        formData.append("ejecutive", "test");
        formData.append("filestypesId", "wErcfRHaKXUihI5sl7dOdV9h");
        
        break;

      case "Nota de Remisión":
        response = templateNoteRemission(data);
        formData.append("data", response);
        formData.append("name", `Nota de Remision.pdf`);
        formData.append("company", "test");
        formData.append("group", "test");
        formData.append("ejecutive", "test");
        formData.append("filestypesId", "NoTqY77DbamdsWQ8Am9xbgtf");
        break;

      case "Salida":
        response = templateSalidaGeneralForaneos(data);
        formData.append("data", response);
        formData.append("name", `SalidaForaneos.pdf`);
        formData.append("company", "test");
        formData.append("group", "test");
        formData.append("ejecutive", "test");
        formData.append("filestypesId", "wErcfRHaKXUihI5sl7dOdV9h");
        break;
    }

    return formData;
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

      let respPost = await ordersServices.postRoute({
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

      saveInDocuments(resp, name);
      showAlertSucces("Carta Porte generada correctamente");
      generatePDFNoteRision(data);
      generateSalida(data);
    } catch (error) {
      console.log(error);
      showAlertError("Error al generar los documentos");
    }
  };

  const generatePDFNoteRision = async data => {
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

      router.push("/almacenesforaneos/rutas");
    } catch (error) {
      console.log(error);
      showAlertError("Error al generar Nota de Remisión");
    }
  };

  const generateSalida = async data => {
    if (!window.confirm("¿Al generar la Salida General no podrás modificarla, ¿estás seguro de generarla?")) return;

    try {
      const formData = new FormData();
      formData.append("data", templateSalidaGeneralForaneos(data));
      formData.append("name", "Salida.pdf");
      formData.append("company", "test");
      formData.append("group", "test");
      formData.append("ejecutive", "test");

      const dataresults = await api.post("convert/pdf", formData);
      let { url } = dataresults.data;
      console.log("Salida", url);
      saveInDocuments(dataresults, nameSalida);
      showAlertSucces("Salida General generada correctamente");
    } catch (error) {
      console.error("Error al generar PDF Salida:", error);
    }
  };

  const handleNext = () => {
    if (activeStep === 2) {
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
    // generatCartPort,
    handleEditProduct,
    handleOnChangeSalida,
    NormalizeData,
    // generateSalida,
    createDeliveryRoute,
    isLoading,
    generarFolio,
    folioSerial,
  };
}
