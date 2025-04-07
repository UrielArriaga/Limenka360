import { useState } from "react";
import { api } from "../../../services/api";

const useUpdatePayment = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const updatePayment = async payment => {
    try {
      setIsLoading(true);
      setError(null);

      const body = {
        payments: [
          {
            id: payment.id,
            payment: payment.payment,
          },
        ],
      };

      const response = await api.put(`paymentspurchaseorder/`, body);
      setIsLoading(false);
      setData(response.data);
      return response;
    } catch (err) {
      setIsLoading(false);
      setError("Error al actualizar el pago");
      console.error("Error al actualizar el pago:", err);
    }
  };

  return {
    updatePayment,
    isLoading,
    error,
    data,
  };
};

export default useUpdatePayment;
