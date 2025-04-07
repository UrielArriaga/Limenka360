import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getNotifications = createAsyncThunk("common/getNotificationsComments", async (payload, thunkAPI) => {
  const { params = {} } = payload;
  try {
    let notifications = await api.get(`notifications`, { params });
    let data = notifications.data;
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const commentNotificationsSlice = createSlice({
  name: "commentsnotifications",
  initialState: {
    notifications: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
      messageError: "",
      isSuccess: false,
      show: false,
    },
  },
  reducers: {
    addCommentNotification: (state, action) => {
      const dataNotifications = action.payload;
      state.notifications.results = [...state.notifications.results, dataNotifications];
    },
    removeCommentNotifiaction: (state, action) => {
      const dataNotifications = action.payload;
      state.notifications.results = state.notifications.results.filter(item => item.id != dataNotifications.id);
    },
    // UpdateNotification: (state, action) => {
    //   const dataNotifications = action.payload;
    //   state.notifications.results = [
    //     ...state.notifications.results.filter(item => item.id != dataNotifications.id),
    //     dataNotifications,
    //   ];
    // },
    // hideNotification: state => {
    //   state.notifications.show = false;
    // },
    // AddMultipleNotifications: (state, action) => {
    //   const data = action.payload;
    //   state.notifications.results = [...state.notifications.results, ...data.datax];
    // },
  },
});

export default commentNotificationsSlice.reducer;

export const { addCommentNotification, removeCommentNotifiaction } = commentNotificationsSlice.actions;

export const commentsNotificationsSelector = state => state.commentsnotifications;
