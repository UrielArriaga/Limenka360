import { useState, useEffect } from "react";
import ProspectsApi from "../services";
import useAlertToast from "../../../hooks/useAlertToast";

export default function useForecast(oportunity) {
  const request = new ProspectsApi();
  const [reasons, setReasons] = useState([]);
  const [loadingReasons, setLoadingReasons] = useState(true);
  const [errorReasons, setErrorReasons] = useState(null);
  const oportunityId = oportunity?.id;
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [isForecastModalOpen, setIsForecastModalOpen] = useState(false);

  useEffect(() => {
    const fetchReasons = async () => {
      setLoadingReasons(true);
      setErrorReasons(null);
      try {
        const response = await request.getForecastReason();
        if (response?.data?.results) {
          let data = response?.data?.results;
          const formattedReasons = data.map((reason) => ({
            value: reason.id,
            label: reason.name,
          }));
          setReasons(formattedReasons);
        } else {
          setErrorReasons("Error al obtener las razones");
        }
      } catch (error) {
        console.error("Error fetchReasons:", error);
        setErrorReasons("Error al obtener las razones");
      } finally {
        setLoadingReasons(false);
      }
    };

    fetchReasons();
  }, []);

  const handleOpenForecastModal = () => setIsForecastModalOpen(true);
  const handleCloseForecastModal = () => setIsForecastModalOpen(false);

  const updateForecast = async (
    concept,
    forecastReasonId,
    isForecast = true
  ) => {
    const body = {
      concept: concept,
      additional: {
        isforecast: isForecast,
        forecastreasonId: forecastReasonId,
      },
    };

    try {
      const response = await request.updateOportunitiesForecast(
        oportunityId,
        body
      );
      if (response.status === 201) {
        showAlertSucces("Cambiado a forecast exitosamente");
      }
      handleCloseForecastModal();
      return response;
    } catch (error) {
      console.error("Error al actualizar forecast:", error);
      showAlertError("Error al cambiar forecast");
      handleCloseForecastModal();
      throw error;
    }
  };

  return {
    reasons,
    loadingReasons,
    errorReasons,
    updateForecast,
    isForecastModalOpen,
    handleOpenForecastModal,
    handleCloseForecastModal,
  };
}
