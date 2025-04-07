import React from "react";
import { NotificationItemStyled } from "./styles";
import { Avatar } from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import dayjs from "dayjs";
import NotificationsContent from "./NotificationsContent";

export default function NotificationItem({ onClick, notification = { metadata: {} } }) {
  const formatDate = date => dayjs(date).fromNow();
  return (
    <NotificationItemStyled
      avatarBackground={getColorFromLetter(notification.metadata?.fullname[0] || "")}
      onClick={onClick}
    >
      <div className="avatar-container">
        <Avatar className="avatar" sizes="10" alt={notification.name}>
          {notification.metadata?.fullname[0]}
        </Avatar>
      </div>

      <NotificationsContent notification={notification} />

      <div className="indicator-container">
        {notification.viewed ? null : <FiberManualRecord className="indicator" />}
      </div>
    </NotificationItemStyled>
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
