import React, { useContext, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { SocketContext } from "../../../../context/socketContext";
import modalStyles from "./modalStyles";

const ProductQuantityModal = ({ open, onClose, handleSaveStatusPooToOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const { socket } = useContext(SocketContext);

  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };

  const handleSubmit = () => {
    if (socket && socket.connected) {
      socket?.emit("newnotification", {
        message: "Se solicitan " + quantity + " productos",
        notificationtype: "compras_missingstock",
      });
      handleSaveStatusPooToOrder();
    } else {
      console.log("Socket no está mandando");
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <Box sx={modalStyles.modalBox}>
        <Typography id="modal-title" variant="h6" component="h2">
          Solicitar productos
        </Typography>
        <Typography id="modal-description" sx={modalStyles.modalTitle}>
          Cantidad:
        </Typography>
        <input
          id="quantity"
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
          style={modalStyles.inputField}
        />
        <Box sx={modalStyles.buttonContainer}>
          <Button style={modalStyles.cancelButton} variant="contained" onClick={onClose}>
            Cancelar
          </Button>
          <Button style={modalStyles.submitButton} variant="contained" onClick={handleSubmit}>
            Enviar solicitud
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductQuantityModal;
