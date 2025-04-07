import { Avatar } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotificationsByQuery, notificationsSelector } from "../../redux/slices/notificationSlice";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { DrawerLayout } from "./styles";

export default function EjecutiveNotifications({ open, setOpen }) {
  const { notifications } = useSelector(notificationsSelector);
  const { id_user } = useSelector(userSelector);

  const [isLoadingObject, setIsLoadingObject] = useState({
    isLoading: false,
    id: "",
  });
  const dispatch = useDispatch();
  const updateStatus = async (id) => {
    try {
      setIsLoadingObject({ isLoading: true, id: id });
      let updatedValue = await api.put(`notifications/${id}`, {
        viewed: true,
      });

      setIsLoadingObject({ isLoading: false, id: "" });
      if (updatedValue.status === 200) {
        getNotificiations();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getNotificiations = () => {
    let query = {
      toId: id_user,
      viewed: false,
    };
    let params = {
      count: 1,
      order: "-createdAt",
      include: "from",
      where: JSON.stringify(query),
    };
    dispatch(getNotificationsByQuery({ params }));
  };

  return (
    <DrawerLayout open={open} anchor="right" onClose={() => setOpen(!open)}>
      <div className="appbar">
        <p>Notifications</p>
      </div>

      <div className="notifications">
        <div className="empty">{notifications?.length <= 0 && <p>Sin Notificaciones</p>}</div>
        {notifications.map((item, index) => {
          return (
            <div key={item.id} className="notification">
              <div className="row">
                <div className="dot">
                  <FiberManualRecord />
                </div>
                <div className="content">
                  <p className="title">{item?.title}</p>
                  <p className="message">{item.message}</p>
                  <p className="date">{dayjs(item.createdAt).format("D,MMMM , YYYY h:mm A")}</p>
                  <div className="flex-row">
                    {isLoadingObject.id === item.id && isLoadingObject.isLoading ? (
                      <>
                        <p>cargando...</p>
                      </>
                    ) : (
                      <p onClick={() => updateStatus(item.id, index)} className="btn_check">
                        Marcar como visto
                      </p>
                    )}
                  </div>
                </div>

                <div className="photo">
                  <Avatar className="avatar">{item?.from?.name.charAt(0).toUpperCase()}</Avatar>
                </div>
              </div>
              <div className="bar"></div>
            </div>
          );
        })}
      </div>
    </DrawerLayout>
  );
}
