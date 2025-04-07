import { saveAs } from "file-saver";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { api } from "../../../services/api";
import { templateReviewbyArticle } from "../../../templates/templatesHtml";
import { useState } from "react";

export default function useGeneratePDF() {
  
  const { company, id_user, group,name } = useSelector(userSelector);
 
   const handleOnClickReview = item => {
    setProductSelected(item);
  };

  const generatePDF = async (data, productSelect) => {
    if (!productSelect) {
      console.error("No se encontró la información de productSelect");
      return;
    }
  
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const serialId = productSelect?.serialnumber;
  
    const indicatorValue = data.indicator;  
    
    const formattedData = {
      model: productSelect?.code, 
      numberSerial: productSelect?.serialnumber,
      name: productSelect?.data.product.name,
      indicator: indicatorValue,  
      details: {
        rule:  productSelect?.data?.statusrepair,
        description:  productSelect?.data?.repairobservations,
      },
      accessories: {
        rule: productSelect?.data?.accessories,
        description:  productSelect?.data?.accessoriesobservations,
      },
      detailsStatic: {
        rule: productSelect?.data?.aestheticdetails,
        description: productSelect?.data?.aestheticobservations,
      },  
      cleaning: {
        rule: productSelect?.data?.clean,
        description: productSelect?.data?.cleanobservations,
      },
      personcharge: name,
      daterevision: formattedDate,
    };
  
    const htmlContent = templateReviewbyArticle(formattedData);
    

    const uniqueId = new Date().getTime();
    const nameFile = `revision-update-${serialId}-${uniqueId}`;
  
    let form = new FormData();
    form.append("data", htmlContent);
    form.append("name", nameFile);
    form.append("company", company);
    form.append("group", group);
    form.append("ejecutive", id_user);
  
    try {
      const responsePDFURL = await api.post("convert/pdf", form);
      let responsePDFSAVE = await api.post(
        "convert/pdfbuffer",
        { pdfurl: responsePDFURL.data.url },
        { responseType: "blob" }
      );
      const pdfBlob = new Blob([responsePDFSAVE.data], {
        type: "application/pdf;charset=utf-8",
      });
      saveAs(pdfBlob, `${nameFile}.pdf`);
  
  
      const bodyfile = {
        url: responsePDFURL.data.url,
        name: nameFile,
        fileextension: "application/pdf",
        warehouseproductId: productSelect.id,
        filestypeId: "wErcfRHaKXUihI5sl7dOdV9h",
      };
  
      await api.post(`documents`, bodyfile);
  
      let warehouseproduct = {
        reviewed: true,
        statusrepair:  productSelect?.data?.statusrepair,
        aestheticdetails: productSelect?.data?.aestheticdetails,
        clean:  productSelect?.data?.clean,
        accesories: productSelect?.data?.accessories,
        repairobservations:  productSelect?.data?.repairobservations,
        accessoriesobservations:  productSelect?.data?.accessoriesobservations,
        aestheticobservations: productSelect?.data?.aestheticobservations,
        cleanobservations: productSelect?.data?.cleanobservations,
        inchargebyId: id_user,
        registrationdate: data.updatedAt,
        reviewformatURL: responsePDFURL.data.url,
        indicator: indicatorValue, 
      };
  
      await api.put(`warehouseproducts/${productSelect.id}`, warehouseproduct);
  
    } catch (error) {
      console.error("Error al generar el PDF", error);
    }
  };
  

  return { generatePDF,handleOnClickReview };
}
