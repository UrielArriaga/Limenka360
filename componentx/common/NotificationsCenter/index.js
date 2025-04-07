import { AnimatePresence, motion } from "framer-motion";
import React, { useCallback, useEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addPopupNotification,
  fetchNotifications,
  fetchNotificationsScroll,
  fetchNotificationsUnRead,
  markReadNotification,
  notificationsCenterSelector,
  toogleNotificacionCenter,
} from "../../../redux/slices/notificationcenterSlice";
import { userSelector } from "../../../redux/slices/userSlice";
import NotificationItem from "./NotificationItem";
import { useRouter } from "next/router";
import { typeSockets } from "../../../constants";

import { messaging, onMessage } from "../../../firebase-config";
import { Update } from "@material-ui/icons";

export default function NotificationsCenter() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id_user, roleName } = useSelector(userSelector);
  const {
    isOpenNotificationCenter,
    notifications = [],
    notificationsNews,
    isPausedNews,
    countunrednotifications,
    isFetchingMore,
    countnotifications,
    limitNotifications,
    pageNotifications,
    position,
  } = useSelector(notificationsCenterSelector);

  useEffect(() => {
    if (!id_user) return;
    dispatch(
      fetchNotificationsUnRead({
        params: {
          where: {
            ejecutiveId: id_user,
          },
          limit: 10,
        },
      })
    );

    let params = {
      count: 1,
      order: "-createdAt",
      where: {
        toId: id_user,
      },
    };
    dispatch(fetchNotifications({ params }));
  }, [id_user]);

  useEffect(() => {
    onMessage(messaging, payload => {
      console.log("Mensaje recibido:", payload);

      let normalizePayload = {
        id: payload.messageId,
        title: payload.data.title,
        message: payload.data.body,
        type: payload.data?.type || "default",
        metadata: JSON.parse(payload.data?.metadata || "{}"),
        viewed: JSON.parse(payload.data?.viewed || "false"),
      };
      dispatch(addPopupNotification(normalizePayload));
      const audioClip = {
        sound: "https://notificationsounds.com/storage/sounds/file-sounds-1222-did-it.ogg",
        label: "notification",
      };

      const sound = new Howl({
        src: audioClip.sound,
        html5: true,
      });
      sound.play();
    });
  }, []);

  useEffect(() => {
    navigator.serviceWorker.addEventListener("message", event => {
      if (event.data?.type === "UPDATE_URL") {
        dispatch(
          fetchNotificationsUnRead({
            params: {
              where: {
                ejecutiveId: id_user,
              },
              limit: 10,
            },
          })
        );

        let params = {
          count: 1,
          order: "-createdAt",
          where: {
            toId: id_user,
          },
        };
        dispatch(fetchNotifications({ params }));

        // const newUrl = window.location.pathname + event.data.query;
        // window.history.pushState({}, "", newUrl);
      }
    });
  }, []);

  const notificationListRef = useRef(null);

  const handleScroll = useCallback(() => {
    const notificationList = document.getElementById("notification-list");

    if (notificationList) {
      const bottom = notificationList.scrollHeight - notificationList.scrollTop <= notificationList.clientHeight + 1; // Usamos un margen de tolerancia de 1 píxel

      console.log("Scroll event triggered");
      console.log("Is at the bottom?", bottom);

      if (bottom && !isFetchingMore) {
        console.log("Se llegó al final, cargando más datos...");
        // setIsLoading(true); // Indicar que estamos en proceso de carga
        // loadMoreNotifications();

        dispatch(
          fetchNotificationsScroll({
            params: {
              limit: limitNotifications,
              skip: pageNotifications + 1,
              where: {
                toId: id_user,
              },
              order: "-createdAt",
            },
          })
        );
      }
    }
  }, [isFetchingMore]);

  useEffect(() => {
    const notificationList = document.getElementById("notification-list");

    if (notificationList) {
      notificationList.addEventListener("scroll", handleScroll);
    }

    // Limpiar el event listener al desmontar el componente
    return () => {
      if (notificationList) {
        notificationList.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div>
      <AnimatePresence>
        {isOpenNotificationCenter && (
          <NotificationContainer
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 120 }}
            style={{ top: position.top, left: position.left, right: position.right }}
          >
            <Header>
              <div className="row">
                <img src="/sidelog_small.png" alt="" />
                Notificaciones
              </div>

              <div className="actions">
                <div
                  className="actions__item"
                  onClick={() => {
                    if (!id_user) return;
                    dispatch(
                      fetchNotificationsUnRead({
                        params: {
                          where: {
                            ejecutiveId: id_user,
                          },
                          limit: 10,
                        },
                      })
                    );

                    let params = {
                      count: 1,
                      order: "-createdAt",
                      where: {
                        toId: id_user,
                      },
                    };
                    dispatch(fetchNotifications({ params }));
                  }}
                >
                  <Update />
                  <p>Actualizar</p>
                </div>
              </div>
            </Header>

            <NotificationList id="notification-list" ref={notificationListRef}>
              {notifications.map(notification => {
                return (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onClick={() => {
                      let type = notification?.type || "default";
                      let folio = notification?.metadata?.folio || null;
                      let rolesallowed = notification?.metadata?.rolesallowed || [];
                      console.log(roleName);
                      console.log(rolesallowed);

                      if (type == typeSockets.request_stock_shopping.value) {
                        let pathname = typeSockets.request_stock_shopping.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type == typeSockets.new_comment_order.value) {
                        let pathname = typeSockets.new_comment_order.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.ready_to_collect.value) {
                        let pathname = typeSockets.ready_to_collect.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.new_order_approved.value) {
                        let pathname = typeSockets.new_order_approved.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.rejected_order.value) {
                        let pathname = typeSockets.rejected_order.redirects[roleName];

                        if (pathname === null) return;
                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.new_order_warehouse.value) {
                        let pathname = typeSockets.new_order_warehouse.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.new_warehouse_tosupply.value) {
                        let pathname = typeSockets.new_warehouse_tosupply.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }
                      if (type === typeSockets.new_warehouse_infloor.value) {
                        let pathname = typeSockets.new_warehouse_infloor.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.new_order_delivery.value) {
                        let pathname = typeSockets.new_order_delivery.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {},
                        });
                      }

                      if (type === typeSockets.new_inventorytransfer.value) {
                        let pathname = typeSockets.new_inventorytransfer.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.new_inventorytransfer_exit.value) {
                        let pathname = typeSockets.new_inventorytransfer_exit.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      if (type === typeSockets.new_inventorytransfer_entry.value) {
                        let pathname = typeSockets.new_inventorytransfer_entry.redirects[roleName];

                        router.push({
                          pathname: pathname,
                          query: {
                            folio: folio,
                          },
                        });
                      }

                      dispatch(markReadNotification({ id: notification.id }));
                      dispatch(toogleNotificacionCenter());
                      return;
                    }}
                  />
                );
              })}

              {notifications.length < countnotifications && (
                <div className="fetchMoreData">
                  <Button
                    onClick={() => {
                      if (countnotifications === notifications.length) return;
                      dispatch(
                        fetchNotificationsScroll({
                          params: {
                            limit: limitNotifications,
                            skip: pageNotifications + 1,
                            where: {
                              toId: id_user,
                            },
                            order: "-createdAt",
                          },
                        })
                      );
                    }}
                  >
                    Obtener mas
                  </Button>
                </div>
              )}
            </NotificationList>
          </NotificationContainer>
        )}
      </AnimatePresence>
    </div>
  );
}

function getColorFromLetter(letter) {
  letter = letter.toUpperCase();

  const colors = [
    "#FF5733",
    "#a10303",
    "#3357FF",
    "#F1C40F",
    "#9B59B6",
    "#1ABC9C",
    "#E74C3C",
    "#3498DB",
    "#2ECC71",
    "#F39C12",
    "#D35400",
    "#C0392B",
    "#7F8C8D",
    "#8E44AD",
    "#2980B9",
    "#27AE60",
    "#16A085",
    "#F39C12",
    "#D35400",
    "#BDC3C7",
    "#2C3E50",
    "#ECF0F1",
    "#95A5A6",
    "#34495E",
    "#9B59B6",
    "#E67E22",
    "#1F618D",
    "#D5DBDB",
    "#8E44AD",
    "#1ABC9C",
    "#C0392B",
    "#2ECC71",
  ];

  const index = letter.charCodeAt(0) - 65;

  if (index < 0 || index > 25) {
    return "#000000";
  }

  return colors[index % colors.length];
}

const ContainerPage = styled.div``;

const NotificationCenterStyled = styled(motion.div)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #1e293b;
  color: white;
  padding: 16px;
  text-align: center;
  border-radius: 12px 12px 0 0;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1000000;
`;

const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 60px;
  right: 20px;
  width: 450px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  z-index: 1000000;
`;

const Header = styled.div`
  padding: 20px 10px;
  font-weight: bold;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-bottom: 1px solid #ddd;

  .row .rowactions {
    display: flex;
    align-items: center;
  }
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }

  .actions {
    display: flex;
    align-items: center;

    .actions__item {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;

      p {
        font-size: 12px;
        font-weight: normal;
      }
    }

    p {
      font-size: 12px;
      font-weight: normal;
    }
  }
`;

const NotificationList = styled.div`
  height: 600px;
  overflow-y: auto;

  .fetchMoreData {
    display: flex;
    justify-content: center;
    /* padding: 10px; */
  }
`;

const NotificationItemxascsa = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid #ddd;

  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

const AvatarContainer = styled.div`
  flex: 1;
  font-size: 12px;

  .fullname {
    text-transform: capitalize;
  }
`;

const Content = styled.div`
  width: 90%;
  font-size: 12px;

  .fullname {
    /* text-transform: capitalize; */
    margin-bottom: 5px;
  }
`;

const Indicator = styled.div`
  flex: 1;
  font-size: 12px;

  .indicator {
    font-size: 13px;
    color: #1877f2;
  }
`;
{
  /* <button
onClick={() => {
  dispatch(toogleNotificacionCenter());
}}
>
open
</button>
<div
style={{
  background: "red",
}}
>
<p>{countunrednotifications}</p>
</div>
Notific
<button
onClick={() => {
  dispatch(popNewNotifications());
}}
>
pop
</button>
<button
onClick={() => {
  console.log(isPausedNews);
}}
>
print notificationes news
</button>
<button
onClick={() => {
  dispatch(
    fetchNotifications({
      params: {
        limit: 10,
        count: 1,
        where: {
          toId: id_user,
        },
        order: "-createdAt",
      },
    })
  );
}}
>
Refetch NOTIFIACION NORMAL LIST
</button>
<button
onClick={() => {
  dispatch(
    fetchNotificationsUnRead({
      params: {
        where: {
          ejecutiveId: id_user,
        },
        limit: 10,
      },
    })
  );
}}
>
Refetch UNREAD
</button>
<button
onClick={() => {
  dispatch(resetUnReadNotifications(id_user));
}}
>
mARK ALL READ
</button>
<button
onClick={() => {
  dispatch(stopNotificationInterval());
}}
>
Pause News
</button>
<button
onClick={() => {
  dispatch(startNotificationInterval());
}}
>
Start News
</button>
<button
onClick={() =>
  dispatch(
    addPopupNotification({
      id: Math.random().toString(36).substr(2, 9),
      title: "Nueva notificacion",
      message: "Hola",
      from: {
        fullname: "Jhon Doe",
      },
      time: "5 min",
    })
  )
}
>
add
</button> */
}
