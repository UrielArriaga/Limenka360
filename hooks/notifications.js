import { api } from "../services/api";

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

export default pushNotification;
