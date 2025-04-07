import { Avatar, IconButton, Tooltip } from "@material-ui/core";
import { CallMade, Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import { SocketContext } from "../../../../../context/socketContext";
import useAlertToast from "../../../../../hooks/useAlertToast";
import { userSelector } from "../../../../../redux/slices/userSlice";
import { api } from "../../../../../services/api";
import { getColorByLetter } from "../../../../../utils";
import { ListNotificationsStyled } from "./styled";

export default function ListNotifications({
  notificationSelected,
  listComments,
  viewAllComments,
  setViewAllComments,
  containerVariants,
  handleDeleteNotification,
}) {
  const { socket } = useContext(SocketContext);
  const { id_user, roleId } = useSelector(userSelector);
  const router = useRouter();

  const { showAlertSucces, showAlertError } = useAlertToast();

  const [valueComment, setValueComment] = useState("");
  const [isPosting, setIsPosting] = useState(false);

  const handleOnSaveComment = async () => {
    try {
      setIsPosting(true);
      let bodyData = {
        createById: id_user,
        reason: "Comentario",
        observations: valueComment.trim(),
        orderId: notificationSelected.orderId,
        status: 5,
      };
      await api.post("/trackings/type", bodyData);
      setValueComment("");
      setIsPosting(false);
      socket?.emit(`newcommentorder`, {
        idOrder: notificationSelected.orderId,
        message: valueComment.trim(),
      });

      handleDeleteNotification(notificationSelected.id);
      setViewAllComments(false);

      showAlertSucces("Comentario publicado correctamente");
    } catch (error) {
      console.log(error);
      setIsPosting(false);
      showAlertError("Error al guardar el comentario");
    }
  };
  const openNotification = () => {
    if (roleId === roles.DIRECTOR_DE_LOGISTICA) {
      router.push(`/directorlogistica?folio=${notification.folio}`);
      handleDeleteNotification(notification.id);
    } else if (roleId === roles.ADMINISTRACION) {
      router.push(`/administracion/pedidos?folio=${notification.folio}`);
      handleDeleteNotification(notification.id);
    } else if (roleId === roles.ADMINISTRACIONGERENTE) {
      router.push(`/administraciongerente/pedidos?folio=${notification.folio}`);
      handleDeleteNotification(notification.id);
    } else if (roleId === roles.COMPRAS) {
      router.push(`/comprasv2?folio=${notification.folio}`);
      handleDeleteNotification(notification.id);
    }
  };

  return (
    <ListNotificationsStyled>
      {notificationSelected && viewAllComments && (
        <motion.div
          key="view-all-comments"
          className="notification"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="notification__header">
            <div className="row">
              <p>Comentarios del pedido {notificationSelected?.folio}</p>
              <Tooltip title="Ir al pedido" placement="bottom">
                <IconButton className="notification__header-goto" onClick={openNotification}>
                  <CallMade />
                </IconButton>
              </Tooltip>
            </div>

            <IconButton
              className="notification__header-closebutton"
              onClick={() => {
                handleDeleteNotification(notificationSelected.id);
                setViewAllComments(false);
              }}
            >
              <Close />
            </IconButton>
          </div>

          <div className="notification__body">
            <div className="notification__response">
              <p className="notification__response-title">
                <span>Agregar Comentario</span>
              </p>
              <textarea
                value={valueComment}
                onChange={e => setValueComment(e.target.value)}
                placeholder="Escribe un comentario"
                type="text"
                className="notification__response-input"
              />
              <div className="notification__response-action">
                <button disabled={isPosting} onClick={handleOnSaveComment}>
                  Publicar
                </button>
              </div>
            </div>

            {listComments.map((notification, index) => (
              <div key={index} className="notification__item">
                <div className="notification__item-header">
                  <Avatar
                    style={{
                      background: getColorByLetter(notification.ejecutive?.fullname?.charAt(0) || "A"),
                    }}
                    className="notification__avatar"
                  >
                    {notification.ejecutive?.fullname?.charAt(0) || "A"}
                  </Avatar>
                  <div className="column">
                    <div className="row">
                      <p className="notification__date">{dayjs().format("dddd, MMMM D, YYYY h:mm A")}</p>
                    </div>
                    <p className="notification__author">
                      <span>{notification.ejecutive?.fullname}</span>
                    </p>
                  </div>
                </div>
                <div className="notification__content">
                  <p className="notification__message">
                    <span>{notification.observations}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* <button
            className="notification__button notification__button--secondary"
            onClick={() => setViewAllComments(false)}
          >
            Regresar
          </button> */}
        </motion.div>
      )}
    </ListNotificationsStyled>
  );
}
