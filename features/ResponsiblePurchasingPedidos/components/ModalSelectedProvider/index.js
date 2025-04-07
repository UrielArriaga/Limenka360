import { Button, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { DialogContainer } from "../PreviewOrder/styles";

export default function ModalSelectedProvider({
  openWarningModal,
  handleCloseWarningModal,
  selectedProvider = "",
  setSelectedProvider,
  getAvailableProviders,
  handleAccept,
}) {
  return (
    <DialogContainer open={openWarningModal} onClose={handleCloseWarningModal}>
      <DialogTitle className="title">Advertencia</DialogTitle>
      <DialogContent className="containerBody">
        <p className="description">
          Los productos a seleccionar pertenecen a diferentes proveedores. Por favor, elige productos de un solo
          proveedor para continuar selecciona un proveedor en especifico.
        </p>
        <select
          value={selectedProvider}
          onChange={e => setSelectedProvider(e.target.value)}
          style={{ width: "100%", marginTop: 8 }}
        >
          <option value="">Selecciona un proveedor</option>
          {getAvailableProviders().map(provider => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
      </DialogContent>
      <DialogActions className="buttons">
        <Button className="cancel" onClick={handleCloseWarningModal}>
          Cancelar
        </Button>
        <Button className="accept" onClick={handleAccept}>
          Aceptar
        </Button>
      </DialogActions>
    </DialogContainer>
  );
}
