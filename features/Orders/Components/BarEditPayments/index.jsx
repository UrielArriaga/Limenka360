import { Grid } from "@material-ui/core";
import styles from "./BarEditPayments.module.css";
import RenderSelectOptions from "../RenderSelectOptions";
import { selectPeriodicityComission } from "../../utils";

const BarEditPayments = ({ paymentData, handleChange, paymentPeriods, commissionPeriod }) => {
  const isSinglePayment = paymentData?.periodicity === "pago único";

  return (
    <div className={styles.container}>
      <Grid container spacing={1}>
        <Grid item xs={1}>
          <p>Pagos</p>
          <input
            className={styles.input}
            name="paymentamount"
            value={isSinglePayment ? 1 : paymentData?.paymentamount}
            onChange={e => !isSinglePayment && handleChange(e)}
            type="number"
            min="1"
          />
        </Grid>
        <Grid item xs={2}>
          <p>Periocidad de pago</p>
          <select name="periodicity" onChange={handleChange} value={paymentData?.periodicity}>
            <RenderSelectOptions options={paymentPeriods} defaultText="Selecciona un periodo" />
          </select>
        </Grid>
        <Grid item xs={2}>
          <p>Comisión</p>
          <select
            name="periodicitycomission"
            onChange={e => !isSinglePayment && handleChange(e)}
            value={selectPeriodicityComission(
              paymentData?.periodicity,
              paymentData?.periodicitycomission,
              commissionPeriod
            )}
          >
            <RenderSelectOptions
              options={[
                { id: "Primer Pago", name: "Primer Pago" },
                ...(isSinglePayment
                  ? []
                  : [
                      { id: "Segundo Pago", name: "Segundo Pago" },
                      { id: "Prorrateadas", name: "Prorrateadas" },
                    ]),
              ]}
              defaultText="Selecciona un periodo"
            />
          </select>
        </Grid>
        <Grid item xs={2}>
          <p>Fecha de inicio</p>
          <input className={styles.input} value={paymentData?.date} name="date" onChange={handleChange} type="date" />
        </Grid>
      </Grid>
    </div>
  );
};

export default BarEditPayments;
