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

