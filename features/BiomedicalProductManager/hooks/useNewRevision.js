import { useState } from "react";
import useAlertToast from "../../../hooks/useAlertToast";
import useModal from "../../../hooks/useModal";
import { BiomedicServices } from "../services";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { api, URL_SPACE } from "../../../services/api";
import { templateReviewbyArticle } from "../../../templates/templatesHtml";
import { saveAs } from "file-saver";
export default function useNewRevision() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();
  const { open: openFormat, toggleModal: handleToggleFormat } = useModal();
  const [productSelected, setProductSelected] = useState({});
  const { groupId, company, id_user, group } = useSelector(userSelector);
  const { showAlertSucces, showAlertError } = useAlertToast();

  const handleOnClickReview = item => {
    handleToggleFormat();
    setProductSelected(item);
  };

  const handleCancel = () => {
    reset();
    handleToggleFormat();
  };

  const onSubmit = async data => {
    const formattedData = {
      model: data.model,
      numberSerial: data.serialNumber,
      name: data.description,
      indicator:data.indicator?.value,
      details: {
        rule: data.functioning.selected === "true",
        description: data.functioning.observations,
      },
      accessories: {
        rule: data.accessories.selected === "true",
        description: data.accessories.observations,
      },
      detailsStatic: {
        rule: data.aestheticDetails.selected === "true",
        description: data.aestheticDetails.observations,
      },
      cleaning: {
        rule: data.cleaning.selected === "true",
        description: data.cleaning.observations,
      },
      personcharge: data.responsiblePerson,
      daterevision: data.revisionDate,
    };
    const serialId = data.serialNumber;
    const htmlContent = templateReviewbyArticle(formattedData);

    let form = new FormData();
    form.append("data", htmlContent);
    form.append("name", `revision-${serialId}`);
    form.append("company", company);
    form.append("group", group);
    form.append("ejecutive", id_user);

    try {
      const responsePDFURL = await api.post("convert/pdf", form);
      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: responsePDFURL.data.url,
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });

      saveAs(pdfBlob, `revision-${serialId}`);
      showAlertSucces("Archivo guardado correctamente");
      handleCancel();
      const nameFile = `revision-${serialId}`;
      let bodyfile = {
        url: responsePDFURL.data.url,
        name: nameFile,
        fileextension: "application/pdf",
        warehouseproductId: productSelected.id,
        filestypeId:"wErcfRHaKXUihI5sl7dOdV9h",
      }
      let response = await api.post(`documents`, bodyfile);
      let warehouseproduct = {};
      warehouseproduct.reviewed = true;
      warehouseproduct.statusrepair = data.functioning.selected === "true" ? false : true;
      warehouseproduct.aestheticdetails = data.aestheticDetails.selected;
      warehouseproduct.clean = data.cleaning.selected;
      warehouseproduct.accesories = data.accessories.selected;
      warehouseproduct.repairobservations = data.functioning.observations;
      warehouseproduct.accessoriesobservations = data.accessories.observations;
      warehouseproduct.aestheticobservations = data.aestheticDetails.observations;
      warehouseproduct.cleanobservations = data.cleaning.observations;
      warehouseproduct.inchargebyId = id_user;
      warehouseproduct.registrationdate = data.revisionDate;
      warehouseproduct.reviewformatURL = responsePDFURL.data.url;
      warehouseproduct.indicator = data.indicator?.value;
      let res = await api.put(`warehouseproducts/${productSelected.id}`,warehouseproduct);
    } catch (error) {
      console.error("Error al descargar el PDF", error);
    }
  };
  const items = [
    { label: "Funcionamiento", name: "functioning" },
    { label: "Accesorios", name: "accessories" },
    { label: "Detalles Estéticos", name: "aestheticDetails" },
    { label: "Limpieza", name: "cleaning" },
  ];
  return {
    openFormat,
    handleToggleFormat,
    register,
    control,
    handleSubmit,
    errors,
    handleOnClickReview,
    reset,
    handleCancel,
    onSubmit,
    items,
  };
}
