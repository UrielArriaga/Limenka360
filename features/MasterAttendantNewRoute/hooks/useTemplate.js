import { useEffect, useState } from "react";

const useTemplate = () => {
  const [selectedTemplates, setSelectedTemplates] = useState([]);

  useEffect(() => {
    console.log("Datos para el PDF", selectedTemplates);
  }, [selectedTemplates]);

  const readTemplate = sn => {
    const template = selectedTemplates.filter(template => template.serialNumber === sn);
    return template[0]?.templateName;
  };

  const updateTemplates = newTemplate => {
    setSelectedTemplates((prevTemplates = []) => {
      // Encuentra el índice del objeto con el mismo serialNumber
      const index = prevTemplates.findIndex(template => template.serialNumber === newTemplate.serialNumber);

      // Si el objeto existe, actualízalo; si no, agrégalo
      if (index !== -1) {
        return prevTemplates.map((template, i) => (i === index ? newTemplate : template));
      } else {
        return [...prevTemplates, newTemplate];
      }
    });
  };

  return {
    readTemplate,
    updateTemplates,
  };
};

export default useTemplate;
