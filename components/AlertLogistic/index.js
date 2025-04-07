import React from "react";
import { AlertStyle } from "./style";
import { AirportShuttle, CheckCircle, Warning } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import useAlertLogistic from "./useAlertLogistic";
import { useSelector } from "react-redux";
import {
  globalNotificationsSelector,
  hideGlobalNotification,
  showGlobalNotification,
} from "../../redux/slices/globalNotificationsSlice";
import { useDispatch } from "react-redux";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import NotificationsMissingStock from "./NotificationsMissingStock";
import NotificationsDefault from "./NotificationsDefault";

export default function AlertLogistic({ close }) {
  const { data, initialState } = useSelector(globalNotificationsSelector);

  const AlertGlobals = data => {
    switch (data.type) {
      case "compras_missingstock":
        return <NotificationsMissingStock data={data} />;

      default:
        return <NotificationsDefault data={data} />;
    }
  };

  return <AlertStyle>{AlertGlobals(data)}</AlertStyle>;
}
