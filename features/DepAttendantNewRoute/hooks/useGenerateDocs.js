import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { templateCartaPorte, templateNoteRemission, templateSalidaGeneral } from "../../../templates/templatesHtml";
import GenerateDocs from "../services/geneartedocs";

export default function useGenerateDocs(ordersToAdd, dataOrder, finalData, isPackage, driverSelect) {
  const router = useRouter();
  const service = new GenerateDocs();
  const { userData } = useSelector(userSelector);
  const [isLoading, setIsLoading] = useState(false);
  let initialNames = {
    cartport: `Carta porte.pdf`,
    noteRemission: `Nota de remisión.pdf`,
    salida: "Salida.pdf",
  };

  const [namesDocuments, setNamesDocuments] = useState(initialNames);

  const products = useMemo(() => {
    return ordersToAdd?.map(order => order?.products).flat();
  }, [ordersToAdd]);

  const handleOnChangeName = (name, value) => {
    setNamesDocuments(prev => ({ ...prev, [name]: value }));
  };

  const generateTemplate = (template, data) => {
    console.log(data);
    switch (template) {
      case "cartport":
        return templateCartaPorte(data);
      case "noteRemission":
        return templateNoteRemission(data);
      case "salida":
        return templateSalidaGeneral(data);
      default:
        return null;
    }
  };

  const generateDocsAndSave = async () => {
    console.log("here");
    try {
      setIsLoading(true);
      const formDataSalida = new FormData();
      const data = service.normalizeData(driverSelect, dataOrder, null, products);

      console.log(data);
      const templateSalida = generateTemplate("salida", data);

      const templateNoteRemission = generateTemplate("noteRemission", data);

      navigator.clipboard
        .writeText(templateNoteRemission)
        .then(() => {
          console.log("Texto copiado al portapapeles");
        })
        .catch(err => {
          console.error("Error al copiar al portapapeles: ", err);
        });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return {
    namesDocuments,
    handleOnChangeName,
    generateDocsAndSave,
    products,
  };
}
