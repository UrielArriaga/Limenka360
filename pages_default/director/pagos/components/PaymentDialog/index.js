import { DialogActions } from "@material-ui/core";
import { StyledDialog } from "../../../../../styles/Director/pagos";

export default function PaymentDialog({ openConfirmPayment, idToConfirmPayment, handleCloseConfirmPayment, confirmCheckPayment }) {
    return (
      <StyledDialog
        open={openConfirmPayment}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <p className="title">¿Confirmas que se ha realizado el pago?</p>
        <p className="content">
          Se confirmará el pago del prospecto <span className="may">{idToConfirmPayment?.nombre}</span> por la cantidad de{" "}
          {idToConfirmPayment?.monto}. El folio correspondiente es {idToConfirmPayment?.itemBD.oportunity.concept} y la
          fecha límite de pago es en {idToConfirmPayment && idToConfirmPayment["fecha limite"]}.
        </p>
        <DialogActions>
          <button className="button_cancelar" onClick={handleCloseConfirmPayment}>
            Cancelar
          </button>
          <button className="button_aceptar" onClick={confirmCheckPayment}>
            Aceptar
          </button>
        </DialogActions>
      </StyledDialog>
    );
  }