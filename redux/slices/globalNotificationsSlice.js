import { createSlice } from "@reduxjs/toolkit";

export const globalNotificationsSlice = createSlice({
  name: "globalnotifications",
  initialState: {
    data: {
      title: "",
      message: "",
      type: "",
      show: false,
      createdAt: null,
      body:null,
    },
    typenotifications: "",
    showPopup: false,
    lastNotificationAt: null,
  },
  reducers: {
    setGlobalNotificationData: (state, action) => {
      state.data = action.payload;
    },
    showGlobalNotification: (state, action) => {
      const { title, message, type, show, createdAt, body  } = action.payload;
      state.data = { title, message, type, show, createdAt, body};
      state.showPopup = show;
      state.lastNotificationAt = createdAt;
    },
    hideGlobalNotification: (state) => {
      state.showPopup = false;
      state.data = {
        title: "",
        message: "",
        type: "",
        show: false,
        createdAt: null,
        body: null,
      };
    },
  },
});

export const { showGlobalNotification, hideGlobalNotification } = globalNotificationsSlice.actions;
export const globalNotificationsSelector = (state) => state.globalnotifications;

export default globalNotificationsSlice.reducer;
