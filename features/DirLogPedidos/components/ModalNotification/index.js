import { Modal, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { ModalStyled } from "./styles";
import { Clear } from "@material-ui/icons";
import { useEffect } from "react";
import { stringify } from "querystring";
import { Tooltip } from "@material-ui/core";
import { SocketContext } from "../../../../context/socketContext";
import useAlertToast from "../../../../hooks/useAlertToast";
import { typeSockets } from "../../../../constants";

export default function ModalNotification({
  open,
  onClose,
  selectedProducts,
  setActivedModalNotification,
  setSelectedProducts,
  orderSelectedData,
}) {
  const { socket, online } = useContext(SocketContext);
  const { showAlertSucces, showAlertError } = useAlertToast();
  const [newq, setNewQ] = useState([]);

  useEffect(() => {
    const NewProducts = selectedProducts
      .filter(item => item?.product?.stock <= 0 || item?.product?.stock <= item.quantity)
      .map(item => ({
        ...item,
        newquantity: Math.max(0, item?.quantity - item?.product?.stock),
      }));
    setNewQ(NewProducts);
  }, [selectedProducts]);

  const handleClose = () => {
    setActivedModalNotification(false);
    setSelectedProducts([]);
  };

  const handleQuantityChange = (index, value) => {
    const updatedProducts = newq?.map((item, i) => {
      if (i === index) {
        return { ...item, newquantity: Number(value) };
      }
      return item;
    });
    setNewQ(updatedProducts);
  };

  const NewNormalize = item => {
    console.log(item);
    return {
      import: item?.product?.import,
      code: item?.product?.code,
      quantity: item?.newquantity,
    };
  };

  const handleSubmit = () => {
    let NewNomalitations = newq?.map(item => NewNormalize(item));

    console.log(data);
    let data = {
      orderFolio: orderSelectedData.folio,
      productsrequest: NewNomalitations,
    };

    console.log(NewNomalitations);

    console.log(newq);
    // return;
    if (socket && socket.connected) {
      // socket.emit("newnotification", {
      //   message: data,
      //   notificationtype: "compras_missingstock",
      // });

      // socket.emit("newnotification", {
      //   message: "Stock insuficiente del siguinte folio",
      //   notificationtype: "compras_missingstock",
      //   body: data,
      //   type: "compras_missingstock",
      //   // orderFolio: "jsdjvsdv",
      //   // productsrequest: NewNomalitations,
      // });

      socket?.emit("newEvent", {
        type: typeSockets.request_stock_shopping.value,
        orderId: orderSelectedData.id,
        metadata: {
          folio: orderSelectedData.folio,
          orderId: orderSelectedData.id,
          productcodes: NewNomalitations,
        },
      });
      showAlertSucces("Solicitud enviada correctamente");
    } else {
      showAlertError("Error al enviar la solicitud");
      console.log("Socket no está mandando");
    }
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-title" aria-describedby="modal-description">
      <ModalStyled>
        <div className="title_modal">
          <h4 className="title">Productos Selecionados</h4>
          <Clear className="icon" onClick={() => handleClose()} />
        </div>
        <div className="content_table">
          <div className="table">
            <div className="tableheader">
              <div className="code">
                <p>Código</p>
              </div>
              <div className="name">
                <p>Producto</p>
              </div>
              <div className="quantity">
                <p>Cantidad Solitada</p>
              </div>
              <div className="stock">
                <p>Stock Total</p>
              </div>
              <div className="input">
                <p>Cantidad para Notificar</p>
              </div>
            </div>
            <div className="body_table">
              {newq?.map((item, index) => {
                return (
                  <div key={index} className={`list_table ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                    <p className="code">{item?.product?.code}</p>
                    <Tooltip title={`${item?.product?.name}`}>
                      <p className="name">{item?.product?.name}</p>
                    </Tooltip>
                    <p className="quantity">{item?.quantity}</p>
                    <p className="stock">{item?.product?.stock}</p>
                    <input
                      type="number"
                      className="input"
                      Value={Math.max(0, item?.quantity - item?.product?.stock)}
                      onChange={e => handleQuantityChange(index, e.target.value)}
                    />
                  </div>
                );
              })}
            </div>
            <div className="button_send">
              <Button className="button" onClick={() => handleSubmit(newq)}>
                Enviar Notificación
              </Button>
            </div>
          </div>
        </div>
      </ModalStyled>
    </Modal>
  );
}
