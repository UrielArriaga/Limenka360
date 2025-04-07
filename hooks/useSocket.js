import { useCallback } from "react";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import { userSelector } from "../redux/slices/userSlice";
import { api } from "../services/api";

export const useSocket = serverPath => {
  const { isFetching, isSuccess, isError, errorMessage, email, roleId, isLogged_User } = useSelector(userSelector);
  /* const socket = useMemo(() => io.connect(serverPath, { transports: ["websocket"] }),[serverPath]); */
  const [online, setOnline] = useState(false);
  const [socket, setSocket] = useState(null);

  const connectSocket = useCallback(() => {
    const token = localStorage.getItem("token");

    const socketTemp = io.connect(serverPath, {
      transports: ["websocket"],
      autoConnect: true,
      forceNew: true,
      query: {
        authorization: token,
      },
    });
    setSocket(socketTemp);
  }, [serverPath]);

  const disconnectSocket = useCallback(() => {
    socket?.disconnect();
  }, [socket]);

  useEffect(() => {
    setOnline(socket?.connected);
  }, [socket]);

  useEffect(() => {
    socket?.on("connect", () => setOnline(true));

    socket?.on("connected_announcement", data => {
      console.log(data);
      console.log("Conectado");
    });
    socket?.emit("join_group", "data");

    // return () => {
    //   socket?.off("connect");
    //   socket?.off("disconnect");
    // };
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnected_announcement", data => {
      console.log(data);
    });
  }, [socket]);

  useEffect(() => {
    socket?.on("disconnect", () => setOnline(false));
  }, [socket]);

  const pushNotification = async (type, data) => {
    try {
      await api.post("pushnotifications", {
        type,
        data,
      });
    } catch (error) {
      console.error("Error sending push notification", error);
    }
  };

  return {
    socket,
    online,
    connectSocket,
    disconnectSocket,
    pushNotification,
  };
};
