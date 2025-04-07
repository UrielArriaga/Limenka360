import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import {
  markReadNotificationAndDecrement,
  notificationsCenterSelector,
  popNewNotifications,
  startNotificationInterval,
  stopNotificationInterval,
} from "../../../redux/slices/notificationcenterSlice";
import { typeSockets } from "../../../constants";
import { useRouter } from "next/router";
import { userSelector } from "../../../redux/slices/userSlice";

export default function NotificationCenterPopup() {
  const dispatch = useDispatch();
  const { id_user, roleName } = useSelector(userSelector);

  const router = useRouter();
  const {
    isOpenNotificationCenter,
    notifications = [],
    notificationsPopups,
  } = useSelector(notificationsCenterSelector);

  useEffect(() => {
    dispatch(startNotificationInterval());
  }, []);

  return (
    <NotificationCenterPopuStyled
      onMouseEnter={() => dispatch(stopNotificationInterval())}
      onMouseLeave={() => dispatch(startNotificationInterval())}
    >
      <div className="notificationcenter-container">
        {/* {notificationsPopups?.length > 0 && (
          
        )} */}

        <AnimatePresence>
          {notificationsPopups.map((notification, index) => {
            return (
              <motion.div
                key={notification.id}
                className=""
                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                transition={{ duration: 0.3 }}
                onClick={() => {
                  dispatch(
                    markReadNotificationAndDecrement({
                      id: notification.id,
                      ejecutiveId: notification.toId,
                    })
                  );

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
                }}
              >
                <PopupRequestStock notification={notification} />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </NotificationCenterPopuStyled>
  );
}

const PopupRequestStock = ({ notification }) => {
  const { title, message, metada } = notification || {};

  return (
    <div className="notification-item">
      <div className="notification-header">
        <img src="/sidelog_small.png" alt="" />
        <h4 className="title">{title}xx</h4>
      </div>

      <div className="message">
        <p>{message}</p>
      </div>
    </div>
  );
};

const NotificationCenterPopuStyled = styled.div`
  .notificationcenter-container {
    position: absolute;
    bottom: 60px;
    right: 20px;
    z-index: 1000;
    max-height: 500px;
    /* width: 400px; */
    border-radius: 10px;
    /* background: #ffffff; */
    /* box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2); */
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .notification-header {
    font-size: 2rem;
    font-weight: bold;
    padding: 8px 10px;
    border-bottom: 1px solid #e0e0e0;
    background: #f5f5f5;
    display: flex;
    width: 100%;
    align-items: center;

    .title {
      font-size: 12px;
      font-weight: bold;
      color: #333;
    }

    img {
      width: 20px;
      height: 20px;
      margin-right: 10px;
    }
  }

  .notification-item {
    background-color: #f0f2f5;
    width: 400px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    /* display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    cursor: pointer;
    transition: background 0.2s ease;
    background-color: #fff;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 10px;
    width: 300px;
    background: #ffffff;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    margin-bottom: 20px; */
    &:hover {
      background: #f0f2f5;
    }

    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #ccc;
    }

    .content {
      flex: 1;

      .title {
        font-size: 0.95rem;
        font-weight: bold;
        color: #333;
      }

      .meta {
        font-size: 0.8rem;
        color: #888;
      }
    }

    .message {
      font-size: 0.9rem;
      color: #555;
      padding: 10px;
    }
  }

  .notification-footer {
    text-align: center;
    padding: 10px;
    font-size: 0.9rem;
    color: #1877f2;
    cursor: pointer;
    border-top: 1px solid #e0e0e0;
    background: #f5f5f5;

    &:hover {
      background: #e7e7e7;
    }
  }
`;
