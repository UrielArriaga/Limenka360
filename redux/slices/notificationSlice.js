import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import RequestCommon from "../../services/request_Common";

export const getNotificationsByQuery = createAsyncThunk("slopes/getNotificationsQuery", async (payload, thunkAPI) => {
  if (!payload.params) {
    return thunkAPI.rejectWithValue("No params value");
  }
  const { params } = payload;
  try {
    let response = await api.get(`notifications`, { params });
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const getSlopesToday = createAsyncThunk("slopes/getSlopesByToday", async (payload, thunkAPI) => {
  if (!payload.params) {
    return thunkAPI.rejectWithValue("No params value");
  }

  const { params } = payload;

  try {
    let response = await api.get(`pendings`, { params });
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState: {
    slopeSelected: {},
    slopesresults: [],
    notifications: [],
    total: 0,
    isFetching: false,
    isError: false,
    isSuccess: false,
    reloadFething: false,
    messageError: "",
    slopesTodayResults: [],
    countSlopesToday: 0,
    isSuccesSlopesToday: false,
    isFetchingSlopesToday: false,
    isErrorSlopesToday: false,
    reloadFethingToday: false,
    messageErrorToday: "",
  },
  reducers: {
    refetchSlopes: (state, action) => {
      state.reloadFething = !state.reloadFething;
    },

    refetchSlopesToday: (state, action) => {
      state.reloadFethingToday = !state.reloadFethingToday;
    },

    setSlopeSelected: (state, action) => {
      state.slopeSelected = action.payload;
    },

    cleanSlopeSelected: (state, action) => {
      state.slopeSelected = {};
    },
  },
  extraReducers: {
    // * ORIGINS
    [getNotificationsByQuery.fulfilled]: (state, { payload }) => {
      state.notifications = payload?.results;
      state.total = payload?.count;
      state.isSuccess = true;
      state.isFetching = false;
      state.isError = false;
      state.messageError = "";
    },

    [getNotificationsByQuery.pending]: (state, { payload }) => {
      state.isFetching = true;
    },

    [getNotificationsByQuery.rejected]: (state, { payload }) => {
      state.isSuccess = false;
      state.isFetching = false;
      state.isError = true;
      state.messageError = payload;
    },

    // * TODO
    [getSlopesToday.fulfilled]: (state, { payload }) => {
      state.slopesTodayResults = payload?.results;
      state.countSlopesToday = payload?.count;
      state.isSuccesSlopesToday = true;
      state.isFetchingSlopesToday = false;
      state.isErrorSlopesToday = false;
      (state.reloadFethingToday = false), (state.messageErrorToday = "");
    },

    [getSlopesToday.pending]: (state, { payload }) => {
      state.isFetchingSlopesToday = true;
    },

    [getSlopesToday.rejected]: (state, { payload }) => {
      state.isSuccesSlopesToday = false;
      state.isFetchingSlopesToday = false;
      state.isFetchingSlopesToday = true;
      state.messageErrorToday = payload;
    },
  },
});

export default notificationsSlice.reducer;

export const { refetchSlopes, setSlopeSelected, cleanSlopeSelected, refetchSlopesToday } = notificationsSlice.actions;

export const notificationsSelector = state => state.notifications;
