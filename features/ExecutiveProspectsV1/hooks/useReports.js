import React, { useEffect, useState } from "react";
import ProspectsService from "../service";

export default function useReports() {
  const service = new ProspectsService();
  const [viewType, setViewType] = useState("line");

  const [reportType, setReportType] = useState("prospectsentities");

  const [flagToRefetch, setFlagToRefetch] = useState(false);

  const [dataChart, setDataChart] = useState({
    title: "",
    labels: [],
    datasets: [],
  });

  const viewFetchers = {
    prospectsentities: async () => {
      try {
        const response = await service.getReportByEntities({});

        let normalizeData = {};
        normalizeData.title = "Prospectos por entidad";
        normalizeData.labels = response.data?.results.map((item) => item.name);
        normalizeData.datasets = [
          {
            label: "Prospectos",
            data: response.data?.results.map((item) => item.total),
            backgroundColor: "rgba(75, 192, 192, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ];
        setDataChart(normalizeData);
      } catch (error) {
        console.error("Error fetching prospectsentities:", error);
      }
    },
    pendingsversus: async () => {
      try {
        const response = await service.getPendingsVersuss({});

        let normalizeData = {};
        normalizeData.title = "Pendientes completados";
        normalizeData.labels = ["completados", "incompletos"];
        normalizeData.datasets = [
          {
            label: "Pendientes completados",
            data: [response?.data?.completed, response?.data?.incomplete],
            backgroundColor: "rgba(16, 260, 20, 0.4)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ];
        setDataChart(normalizeData);
      } catch (error) {
        console.error("Error fetching prospectsentities:", error);
      }
    },
  };

  useEffect(() => {
    const fetchData = viewFetchers[reportType];
    if (fetchData) fetchData();
  }, [reportType, flagToRefetch]);

  return { dataChart, viewType, setViewType, reportType, setReportType };
}
