import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SocketContext } from "../../../../context/socketContext";
import {
  addCommentNotification,
  commentsNotificationsSelector,
  removeCommentNotifiaction,
} from "../../../../redux/slices/commentNotificationSlice";
import { api } from "../../../../services/api";
import { generateTemporalId } from "../../../../utils";
import ListNotifications from "./ListNotifications";
import NewComment from "./NewComment";
import { NewCommentsStyled } from "./styles";

const dddd = [
  {
    id: "xxx",
    type: "compras_missingstock",
    title: "Nuevo comentario en pedido",
    message: "Hola, me gustaría saber si el producto es de buena calidad",
    user: "María",
    orderId: "ayZa4XaLuZLiljXSjz3PpkiB",
    folio: "UDIAMNOV2411",
  },
  {
    id: "xxxxxx",
    type: "compras_missingstock",
    title: "Nuevo comentario en pedido",
    message: "Hola, me gustaría saber si el producto es de buena calidad",
    user: "María",
    orderId: "ayZa4XaLuZLiljXSjz3PpkiB",
    folio: "UDIAMNOV2411",
  },
  {
    id: "xxxx",
    type: "compras_missingstock",
    title: "Nuevo comentario en pedido",
    message: "Hola, me gustaría saber si el producto es de buena calidad",
    user: "María",
    orderId: "ayZa4XaLuZLiljXSjz3PpkiB",
    folio: "UDIAMNOV2411",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};

export default function NewComments() {
  const { socket, online } = useContext(SocketContext);
  const [listNotifications, setlistNotifications] = useState([]);
  const [notificationSelected, setNotificationSelected] = useState(null);
  const [viewAllComments, setViewAllComments] = useState(false);

  const { notifications } = useSelector(commentsNotificationsSelector);

  const dispatch = useDispatch();

  console.log(notifications);

  useEffect(() => {
    socket?.on("newcommentreceived", data => {
      const audioClip = {
        sound: "https://limenka.sfo3.digitaloceanspaces.com/sounds/newcomment.wav",
        label: "notification",
      };

      const sound = new Howl({
        src: audioClip.sound,
        html5: true,
      });
      sound.play();
      dispatch(addCommentNotification(data));
    });

    return () => {
      socket?.off("newcommentreceived");
    };
  }, [socket]);

  const handleOnClickViewComments = notification => {
    getCommentsByOrderId(notification.orderId);
    setNotificationSelected(notification);
    setViewAllComments(true);
  };

  const handlePutNewNotification = () => {
    // ADD To start of the array
    const newNotification = {
      order: {
        id: "PwirmHhXKojshSRDH3utdwCP",
      },
      orderId: "PwirmHhXKojshSRDH3utdwCP",
      folio: "LUISLNOV243",
      message: "Nuevo comentario en pedido en pedido XXXX",
      title: "Nuevo comentario de pedido",
      type: "newcommentorder",
      createdAt: "2024-12-03 12:51:34",
      createdBy: {
        id: "RHraMOYQfACPNq8T1Bcqq6dA",
        role: "administracion",
        email: "monserrat.admin@gmail.com",
        fullname: "monserrat  admin",
      },
    };

    const audioClip = {
      sound: "https://limenka.sfo3.digitaloceanspaces.com/sounds/newcomment.wav",
      label: "notification",
    };

    const sound = new Howl({
      src: audioClip.sound,
      html5: true,
    });
    sound.play();

    setlistNotifications([newNotification, ...listNotifications]);
  };

  const handleDeleteAllNotifications = () => {
    setlistNotifications([]);
  };

  const handleDeleteNotification = id => {
    dispatch(removeCommentNotifiaction({ id }));
  };

  // useEffect(() => {
  //   if (notificationSelected) {
  //     console.log(notificationSelected);
  //     getCommentsByOrderId(notificationSelected.orderId);
  //   }
  // }, [notificationSelected]);

  const [listComments, setListcomments] = useState([]);

  const getCommentsByOrderId = async orderId => {
    try {
      let params = {
        include: "ejecutive",
        join: "ddd",
        order: "-createdAt",
        where: {
          orderId: orderId,
          or: [{ type: 2 }, { type: 3 }],
        },
      };
      let resComments = await api.get("/trackings/coments", { params });

      setListcomments(resComments.data?.results || []);

      console.log(resComments);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <NewCommentsStyled>
      <div className="newcomments-container">
        {notifications?.results?.map((notification, index) => {
          return (
            <NewComment
              key={notification.id}
              notification={notification}
              viewAllComments={viewAllComments}
              setViewAllComments={setViewAllComments}
              handleOnClickViewComments={handleOnClickViewComments}
              handleDeleteNotification={handleDeleteNotification}
            />
          );
        })}

        {/* {listNotifications.length > 0 && (
          <div className="newcomments-container__deleteall">
            <IconButton onClick={handleDeleteAllNotifications}>
              <Close />
            </IconButton>
          </div>
        )} */}
      </div>

      {notificationSelected && viewAllComments && (
        <div className="newcomments-list-page">
          <div className="newcomments-list-container">
            <ListNotifications
              listComments={listComments}
              viewAllComments={viewAllComments}
              setViewAllComments={setViewAllComments}
              notificationSelected={notificationSelected}
              handleDeleteNotification={handleDeleteNotification}
            />
          </div>
        </div>
      )}
    </NewCommentsStyled>
  );
}
