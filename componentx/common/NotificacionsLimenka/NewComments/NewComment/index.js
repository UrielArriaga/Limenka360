import { IconButton } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import dayjs from "dayjs";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { roles } from "../../../../../BD/databd";
import { userSelector } from "../../../../../redux/slices/userSlice";
import { NewCommentStyled } from "./styles";

export default function NewComment({
  notification,
  viewAllComments,
  setViewAllComments,
  notificationSelected,
  handleOnClickViewComments,
  handleDeleteNotification,
}) {
  const router = useRouter();
  const { roleId } = useSelector(userSelector);

  const containerVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
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
    <NewCommentStyled>
      <AnimatePresence mode="wait">
        {!viewAllComments && (
          <motion.div
            key={notification.id}
            className="msg-container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="msg-container__title">
              <p>
                {notification.title}-<span style={{ fontWeight: "bold" }}>{notification.folio}</span>
              </p>

              <IconButton
                className="msg-container__title-close"
                onClick={() => handleDeleteNotification(notification.id)}
              >
                <Close />
              </IconButton>
            </div>
            <div className="msg-container__content">
              <p className="message">
                <span
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {notification?.createdBy?.fullname}
                </span>{" "}
                ha comentado: {notification.message}
              </p>

              <p className="createdat">{dayjs(notification.createdAt).format("DD/MM/YYYY HH:mm")}</p>
            </div>

            <div className="msg-container__actions">
              <button className="btn btn-primary" onClick={() => handleOnClickViewComments(notification)}>
                Ver comentarios de pedido
              </button>
              <button className="btn btn-secondary" onClick={() => openNotification()}>
                Ver pedido
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </NewCommentStyled>
  );
}
