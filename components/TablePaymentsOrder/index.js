import { useDispatch } from "react-redux";
import { ACTIONIDPRODUCTIONMODE, api } from "../../services/api";
import { formatDate, formatNumber, handleAlert, handleGlobalAlert } from "../../utils";
import styles from "./TablePaymentsOrder.module.css";
import { useState } from "react";
import { CircularProgress } from "@material-ui/core";

const TablePaymentsOrder = ({ data, prospectId, updatePayments }) => {
  const dispatch = useDispatch();

  // Nuevo estado para rastrear el ID del pago que está en proceso
  const [loadingId, setLoadingId] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // Estado para prevenir múltiples ejecuciones

  const pay = async (p) => {
    // Verificar si ya hay una operación en proceso
    if (isProcessing) return;

    const { id, oportunity, ...paymentFormat } = p;
    const oportunityId = p.oportunityId;

    const payments = {
      payments: [
        {
          ...paymentFormat,
          paymentId: id,
          ispaid: true,
        },
      ],
    };

    try {
      setIsProcessing(true); // Marcar que se está procesando
      setLoadingId(id); // Establecer el ID del pago que está cargando
      const checkPay = await api.put("salespayments", payments);

      const query = {
        params: {
          include: "oportunity,oportunity.prospect",
          count: "1",
          limit: "20",
          skip: "1",
          where: `{"ispaid": true, "oportunity": {"prospect": { "id": "${prospectId}"}}}`,
        },
      };

      const [countPaidPayments, oportuntiesResponse] = await Promise.all([
        api.get("salespayments", query),
        api.get(`oportunities/${oportunityId}?&include=phase`),
      ]);

      if (!oportuntiesResponse.data.ispaid && checkPay) {
        handleGlobalAlert("success", "Se marcó como pagado!", "basic", dispatch, 6000);
      }

      if (oportuntiesResponse.data.ispaid) {
        handleGlobalAlert("success", "Tus pagos de la venta se han concluido", "basic", dispatch, 6000);
      }

      const trackings = {
        reason: `Pago ${countPaidPayments.data.count} de ${oportunity.payments}`,
        observations: `El pago ${countPaidPayments.data.count} de ${oportunity.payments} fue realizado`,
        actionId: ACTIONIDPRODUCTIONMODE,
        prospectId,
        phaseId: oportunity.phaseId,
        oportunityId: p.oportunityId,
        status: 4,
      };

      await api.post("trackings", trackings);

      setLoadingId(null); // Resetear el estado después de la carga
      updatePayments();
    } catch (error) {
      handleGlobalAlert("error", "Error al marcar el pago!", "basic", dispatch, 6000);
    } finally {
      setIsProcessing(false); // Resetear el estado de procesamiento
    }
  };

  return (
    <table className={styles.table}>
      <thead className={styles.thead}>
        <tr>
          <th className={styles.th}>Pago</th>
          <th className={styles.th}>Comisión</th>
          <th className={styles.th}>Fecha</th>
          <th className={styles.th}>Pagado En</th>
          <th className={styles.th}>Observaciones</th>
          <th className={styles.th}>Está Pagado</th>
          <th className={styles.th}>IVA</th>
          <th className={styles.th}>Anticipo</th>
          <th className={styles.th}>Acciones</th>
        </tr>
      </thead>
      <tbody className={styles.tbody}>
        {data?.map((item) => (
          <tr className={styles.tr} key={item.id}>
            <td className={styles.td}>{formatNumber(item.payment)}</td>
            <td className={styles.td}>{formatNumber(item.comission)}</td>
            <td className={styles.td}>{formatDate(item.date)}</td>
            <td className={styles.td}>{item.paidAt ? new Date(item.paidAt).toLocaleString() : "-"}</td>
            <td className={styles.td}>{item.observations}</td>
            <td className={styles.td}>{item.ispaid ? "Si" : "No"}</td>
            <td className={styles.td}>{item.paymentiva}</td>
            <td className={styles.td}>{item.downpayment ? "Yes" : "No"}</td>
            <td className={styles.td}>
              {item.ispaid ? (
                <button type="button" className={styles.disabled}>
                  Pagado
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.button}
                  onClick={() => pay(item)}
                  disabled={loadingId === item.id}
                >
                  {loadingId === item.id ? <CircularProgress size={10} color="#fff" /> : "Marcar como pagado"}
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TablePaymentsOrder;
