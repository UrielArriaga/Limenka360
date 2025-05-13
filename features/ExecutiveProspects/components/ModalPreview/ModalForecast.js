import React, { useState, useEffect } from "react";
import {
  Modal,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from "@material-ui/core";
import {
  ModalContainer,
  ActionButtons,
  LoadingContainer,
  ErrorText,
} from "./styles";

export default function ModalForecast({
  isOpen,
  onClose,
  updateForecast,
  reasons,
  loadingReasons,
  errorReasons,
}) {
  const [concepto, setConcepto] = useState("");
  const [razonSeleccionada, setRazonSeleccionada] = useState("");

  const handleChangeConcepto = (event) => {
    setConcepto(event.target.value);
  };

  const handleChangeRazon = (event) => {
    setRazonSeleccionada(event.target.value);
  };

  const handleAceptarLocal = async () => {
    try {
      await updateForecast(concepto, razonSeleccionada);
      onClose();
    } catch (error) {
      console.error("Error al actualizar el forecast:", error);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setConcepto("");
      setRazonSeleccionada("");
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContainer>
        <Typography variant="h6" gutterBottom>
          ¿Quieres cambiar a Forecast?
        </Typography>

        <FormControl
          fullWidth
          margin="normal"
          variant="outlined"
          disabled={loadingReasons}
        >
          <InputLabel id="razon-label">Razón</InputLabel>
          <Select
            labelId="razon-label"
            id="razon"
            value={razonSeleccionada}
            onChange={handleChangeRazon}
            label="Razón"
          >
            {reasons?.map((razon) => (
              <MenuItem key={razon.value} value={razon.value}>
                {razon.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {loadingReasons && (
          <LoadingContainer>
            <CircularProgress size={18} />
            <Typography variant="caption" style={{ marginLeft: 8 }}>
              Cargando razones...
            </Typography>
          </LoadingContainer>
        )}

        {errorReasons && (
          <ErrorText variant="caption">{errorReasons}</ErrorText>
        )}

        <TextField
          fullWidth
          margin="normal"
          label="Concepto"
          variant="outlined"
          value={concepto}
          onChange={handleChangeConcepto}
        />

        <ActionButtons>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAceptarLocal}
            disabled={loadingReasons}
          >
            Aceptar
          </Button>
        </ActionButtons>
      </ModalContainer>
    </Modal>
  );
}
