import React from "react";
import { api } from "../services/api";

export default function useNotifications() {
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
    pushNotification,
  };
}
