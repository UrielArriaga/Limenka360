import React, { useContext, useEffect, useState } from "react";
import { NewOrderApprovedByLogisticStyled } from "./styled";
import NewOrder from "./NewOrder";
import { SocketContext } from "../../../../context/socketContext";

export default function NewOrderApprovedByLogistic() {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
  };

  const { socket, online } = useContext(SocketContext);

  const [listNotifications, setListNotifications] = useState([]);

  const handleDeleteNotification = id => {
    setListNotifications(listNotifications.filter(notification => notification.id !== id));
  };

  useEffect(() => {
    try {
      socket?.on("neworderapprovedbylogisticreceived", data => {
        const audioClip = {
          sound: "https://limenka.sfo3.digitaloceanspaces.com/sounds/newcomment.wav",
          label: "notification",
        };
        const sound = new Howl({
          src: audioClip.sound,
          html5: true,
        });
        sound.play();
        setListNotifications([...listNotifications, data]);
      });
      return () => {
        socket?.off("neworderapprovedbylogisticreceived");
      };
    } catch (error) {
      console.log(error);
    }
  }, [socket]);

  return (
    <NewOrderApprovedByLogisticStyled>
      <div className="newcomments-container">
        {listNotifications.map((notification, index) => {
          return (
            <NewOrder key={index} notification={notification} handleDeleteNotification={handleDeleteNotification} />
          );
        })}
      </div>
    </NewOrderApprovedByLogisticStyled>
  );
}
