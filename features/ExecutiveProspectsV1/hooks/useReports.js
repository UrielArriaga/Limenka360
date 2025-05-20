import React, { useEffect, useState } from "react";
import ProspectsService from "../service";

const generateColors = (length) => {
  const colors = [];
  const borderColors = [];

  for (let i = 0; i < length; i++) {
    const hue = (i * 360) / length; // Rango de 0 a 360° en HSL
    colors.push(`hsla(${hue}, 70%, 75%, 0.5)`); // Fondo
    borderColors.push(`hsla(${hue}, 70%, 50%, 1)`); // Borde
  }

  return { colors, borderColors };
};

export default function useReports() {
  const service = new ProspectsService();
  const [viewType, setViewType] = useState("line");

  const [reportType, setReportType] = useState(null);

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
        const { colors, borderColors } = generateColors(
          response?.data?.results.length
        );
        let normalizeData = {};
        normalizeData.title = "Prospectos por entidad";
        normalizeData.labels = response.data?.results.map((item) => item.name);
        normalizeData.datasets = [
          {
            label: "Prospectos",
            data: response.data?.results.map((item) => item.total),
            backgroundColor: colors,
            borderColor: borderColors,
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
        const { colors, borderColors } = generateColors(
          response?.data?.results.length
        );
        let normalizeData = {};
        normalizeData.title = "Pendientes completados";
        normalizeData.labels = ["completados", "incompletos"];
        normalizeData.datasets = [
          {
            label: "Pendientes completados",
            data: [response?.data?.completed, response?.data?.incomplete],
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 2,
          },
        ];
        setDataChart(normalizeData);
      } catch (error) {
        console.error("Error fetching prospectsentities:", error);
      }
    },

    prospectsclienttype: async () => {
      try {
        const response = await service.getReportByClientType({});
        const { colors, borderColors } = generateColors(
          response?.data?.results.length
        );

        let normalizeData = {};
        normalizeData.title = "Prospectos por tipo de cliente";
        normalizeData.labels = response.data?.results.map((item) => item.name);
        normalizeData.datasets = [
          {
            label: "Prospectos",
            data: response.data?.results.map((item) => item.total),
            backgroundColor: colors,
            borderColor: borderColors,
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
