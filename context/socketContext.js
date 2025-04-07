import { createContext, useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSocket } from "../hooks/useSocket";
import { changeStatus, userSelector } from "../redux/slices/userSlice";
import { api, URL, URLSOCKET } from "../services/api";
import { addPopupNotification, fetchNotifications } from "../redux/slices/notificationcenterSlice";

export const SocketContext = createContext();

export const SocketProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
  const { socket, online, connectSocket, disconnectSocket } = useSocket(URLSOCKET);

  useEffect(() => {
    // socket?.on("new_notification", data => {
    //   console.log(data);
    // });

    const handleNewNotification = data => {
      console.log(data);
      dispatch(addPopupNotification(data)); // Si deseas procesarlo con el dispatch
    };

    if (socket) {
      socket.on("new_notification", handleNewNotification);
    }

    return () => {
      socket?.off("connect");
      socket?.off("disconnect");
      socket?.off("new_notification", handleNewNotification);
    };
  }, [socket]);

  const { isLogged_User } = useSelector(userSelector);
  useEffect(() => {
    if (isLogged_User) {
      // dispatch(
      //   fetchNotifications({
      //     params: {
      //       limit: 10,
      //       order: "-createdAt",
      //       where: {
      //         toId: id_user,
      //       },
      //     },
      //   })
      // );
      connectSocket();
    }
  }, [isLogged_User, isLogged_User]);

  useEffect(() => {
    if (!isLogged_User) {
      disconnectSocket();
    }
  }, [isLogged_User, isLogged_User]);

  useEffect(() => {
    if (online) {
      dispatch(changeStatus(true));
    } else {
      dispatch(changeStatus(false));
    }
  }, [online]);

  return <SocketContext.Provider value={{ socket, online }}>{children}</SocketContext.Provider>;
};
