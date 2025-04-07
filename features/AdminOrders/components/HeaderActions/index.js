import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { clearState, userSelector } from "../../../../redux/slices/userSlice";
import { NotificationImportant } from "@material-ui/icons";
import {
  notificationsCenterSelector,
  resetUnReadNotifications,
  setNotificationPosition,
  toogleNotificacionCenter,
} from "../../../../redux/slices/notificationcenterSlice";
import { useSelector } from "react-redux";
import { Badge } from "@material-ui/core";
import styled from "styled-components";
export default function HeaderActions() {
  const dispatch = useDispatch();
  const { id_user } = useSelector(userSelector);
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
  } = useSelector(notificationsCenterSelector);

  const badgeRef = useRef(null);

  const handleToggleNotifications = () => {
    if (badgeRef.current) {
      const rect = badgeRef.current.getBoundingClientRect();

      dispatch(
        setNotificationPosition({
          top: rect.bottom + 10,
          left: rect.left + rect.width / 2 < window.innerWidth / 2 ? rect.left : "auto",
          right: rect.left + rect.width / 2 >= window.innerWidth / 2 ? window.innerWidth - rect.right + 30 : "auto",
        })
      );
    }

    dispatch(toogleNotificacionCenter());

    if (isOpenNotificationCenter === false) {
      dispatch(resetUnReadNotifications(id_user));
    }
  };

  return (
    <HeaderActionsStyled style={{ display: "flex", alignItems: "center", marginRight: 20 }}>
      <div ref={badgeRef} onClick={() => handleToggleNotifications()} className="notification">
        <Badge className="badge" badgeContent={countunrednotifications} color="primary" overlap="rectangular">
          <NotificationImportant />
        </Badge>
      </div>

      <div
        style={{
          marginLeft: 20,
        }}
        className="close"
        onClick={() => {
          dispatch(clearState());
        }}
      >
        <p
          style={{
            color: "#424242",
            fontweight: "bold",
          }}
        >
          Cerrar Sesion
        </p>
      </div>
    </HeaderActionsStyled>
  );
}

const HeaderActionsStyled = styled.div`
  .notification {
    cursor: pointer;
  }
  .badge {
    padding: 0;
    margin: 0;
    padding: 6px;
    background-color: aliceblue;
    border-radius: 50%;

    background-color: #059be5;
    color: white;
    &:hover {
      svg {
      }
    }
  }
`;
