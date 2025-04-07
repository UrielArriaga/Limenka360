import React, { useContext, useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";
import { SocketContext } from "../../../../context/socketContext";
import modalStyles from "./modalStyles";

import useAlertToast from "../../../../hooks/useAlertToast";
import { OrdersServices } from "../../services";
import { GLOBALSTATUSPOO, STATUSPOO } from "../../../../constants";
import { api } from "../../../../services/api";
import { userSelector } from "../../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ProductQuantityModal = ({ open, onClose, orderData, productToNotify, refetchPedido, statusPoo }) => {
  const status = statusPoo?.filter(item => item.name == "stock insuficiente")[0];
  const [quantity, setQuantity] = useState(1);
  const { id_user } = useSelector(userSelector);
  const { socket } = useContext(SocketContext);
  const { showAlertSucces, showAlertError } = useAlertToast();

  const orderService = new OrdersServices();

  const handleQuantityChange = event => {
    setQuantity(event.target.value);
  };


  const handleSubmit = async () => {
    try {
      if (socket && socket.connected) {
        let respUpdate = await orderService.updateOrderStatusPOO(orderData.id, status?.id);

        socket?.emit("newnotification", {
          message: "Se solicitan " + quantity + " productos",
          notificationtype: "compras_missingstock",
          type: "compras_missingstock",
          body: {
            orderFolio: orderData.folio,
            productsrequest: [
              {
                code: productToNotify?.product?.code,
                quantity: quantity,
              },
            ],
          },
        });
        onClose();
        showAlertSucces("Solicitud enviada correctamente");
        updateToApprovedOrder();
      } else {
        console.log("Socket no está mandando");
      }
    } catch (error) {
      console.log(error);
      showAlertError("Error al enviar la solicitud");
    }
  };

  const updateToApprovedOrder = async () => {
    try {
      let body = {
        approvedlogistics: true,
        approvedlogisticsbyId: id_user,
        approvedlogisticsdate: dayjs(new Date()).format(""),
      };
      let response = await api.put(`/additionalinformation/${orderData?.id}`, body);
      if (response.status == 201 || response.status == 200) {
        showAlertSucces("Aprobado, esta información la vera compras");
        refetchPedido();
      }

      onClose();

      socket?.emit("neworderapprovedbylogistic", {
        idOrder: orderData?.id,
        type: "neworderapprovedbylogistic",
        message: "A notificado por el pedido",
      });
    } catch (error) {
      console.log(error, "Error");
    }
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
