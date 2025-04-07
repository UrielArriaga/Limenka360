import { useEffect, useState } from "react";
import DirLogRecolecionApi from "./services";

export default function DataFilter() {
  const [dataStatusPoo, setDataStatusPoo] = useState([]);
  const filtersRecolecion = [
    {
      label: "Estatus",
      value: "status",
      valuedb: "statuspooId",
      custom: true,
      customOptions: dataStatusPoo,
    },
    {
      label: "Fecha",
      value: "dates",
      valuedb: "createdAt",
      custom: true,
      customOptions: [
        {
          id: "day",
          name: "Hoy",
          toChip: "Hoy",
        },
        {
          id: "week",
          name: "Semanal",
          toChip: "Semanal",
        },
        {
          id: "month",
          name: "Mensual",
          toChip: "Mensual",
        },
        {
          id: "range",
          name: "Rango de Fechas",
          toChip: "Rango de Fechas",
        },
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = new DirLogRecolecionApi();
        let response = await request.getStatusPoo();
        let normalize = response?.data?.results.map(item => normalizeDataFilter(item));
        setDataStatusPoo(normalize);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); 

  const normalizeDataFilter = dataStatus => {
    return {
      id: dataStatus?.id,
      name: dataStatus?.name,
    };
  };

  return {
    filtersRecolecion
  }

}

