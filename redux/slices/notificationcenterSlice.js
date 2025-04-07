import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import RequestCommon from "../../services/request_Common";

export const fetchNotifications = createAsyncThunk(
  "notificationscenter/getNotificationsQuery",
  async (payload, thunkAPI) => {
    if (!payload.params) {
      return thunkAPI.rejectWithValue("No params value");
    }
    const { params = {} } = payload;
    try {
      let response = await api.get(`notifications`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchNotificationsScroll = createAsyncThunk(
  "notificationscenter/getNotificationsQueryScroll",
  async (payload, thunkAPI) => {
    if (!payload.params) {
      return thunkAPI.rejectWithValue("No params value");
    }
    const { params = {} } = payload;
    try {
      let response = await api.get(`notifications`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetUnReadNotifications = createAsyncThunk(
  "notificationscenter/marnReadNotificationsred",
  async (payload, thunkAPI) => {
    if (!payload) {
      return thunkAPI.rejectWithValue("No params value");
    }
    try {
      let response = await api.post(`notifications/markasread/${payload}`);

      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const markReadNotificationAndDecrement = createAsyncThunk(
  "notificationscenter/marnReadNotificationred",
  async (payload, thunkAPI) => {
    if (!payload) {
      return thunkAPI.rejectWithValue("No params value");
    }
    try {
      let { id, ejecutiveId } = payload;

      let response = await api.put(`notifications/markasreadanddecrement/${id}/${ejecutiveId}`);

      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const markReadNotification = createAsyncThunk(
  "notificationscenter/marnReadNotificationasread",
  async (payload, thunkAPI) => {
    console.log("dasdasdsa");
    if (!payload) {
      return thunkAPI.rejectWithValue("No params value");
    }
    try {
      let { id } = payload;

      let response = await api.put(`notifications/markasread/${id}`);

      let data = response.data;
      data.id = id;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchNotificationsUnRead = createAsyncThunk(
  "notificationscenter/getNotificationsunread",
  async (payload, thunkAPI) => {
    if (!payload.params) {
      return thunkAPI.rejectWithValue("No params value");
    }
    const { params = {} } = payload;
    try {
      let response = await api.get(`notifications/unread`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getNotificationsToday = createAsyncThunk(
  "notificationscenter/getSlopesByToday",
  async (payload, thunkAPI) => {
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
  }
);

let intervalRef = null;

export const notificationcenterSlice = createSlice({
  name: "notificationscenter",
  initialState: {
    isOpenNotificationCenter: false,
    notifications: [],
    notificationsPopups: [],
    countnotifications: 0,
    countunrednotifications: 0,
    isFetching: false,
    isFetchingMore: false,
    isPausedNews: false,
    limitNotifications: 10,
    pageNotifications: 1,
    position: { top: 60, left: "auto", right: 20 },
  },
  reducers: {
    toogleNotificacionCenter: (state, action) => {
      state.isOpenNotificationCenter = !state.isOpenNotificationCenter;
    },

    popNewNotifications: (state, action) => {
      state.notificationsPopups.pop();
    },
    addPopupNotification: (state, action) => {
      console.log(action.payload);
      state.notificationsPopups = [action.payload, ...state.notificationsPopups];
      if (state.notificationsPopups.length > 2) {
        state.notificationsPopups.pop();
      }

      state.notifications = [action.payload, ...state.notifications];

      state.countunrednotifications = state.countunrednotifications + 1;
    },

    deleteNewNotification: (state, action) => {
      state.notificationsPopups = state.notificationsPopups.filter(notif => notif.id !== action.payload);
    },
    setPauseNewNotifications: (state, action) => {
      state.isPaused = action.payload;
    },
    setNotificationPosition: (state, action) => {
      state.position = action.payload;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.notifications = action.payload?.results;
        state.countnotifications = action.payload?.count || 0;
      })
      .addCase(fetchNotifications.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.isFetching = false;
      })
      .addCase(fetchNotificationsScroll.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isFetchingMore = false;
        state.pageNotifications = state.pageNotifications + 1;
        console.log("object");
        state.notifications = [...state.notifications, ...action.payload?.results];
        // state.isFetchingMore = false;
        // state.countnotifications = action.payload?.count || 0;
      })
      .addCase(fetchNotificationsScroll.pending, (state, action) => {
        state.isFetchingMore = true;
      })
      .addCase(fetchNotificationsScroll.rejected, (state, action) => {
        state.isFetchingMore = false;
      })

      .addCase(fetchNotificationsUnRead.fulfilled, (state, action) => {
        let results = action?.payload?.results || [];
        console.log(results[0]?.unread_count);
        state.countunrednotifications = results[0]?.unread_count;

        // state.countunrednotifications = action.payload?.count;
      })
      .addCase(fetchNotificationsUnRead.pending, (state, action) => {})
      .addCase(fetchNotificationsUnRead.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(resetUnReadNotifications.fulfilled, (state, action) => {
        console.log(action.payload);

        state.countunrednotifications = 0;
      })
      .addCase(resetUnReadNotifications.pending, (state, action) => {})
      .addCase(resetUnReadNotifications.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(markReadNotificationAndDecrement.fulfilled, (state, action) => {
        console.log(action.payload);
        state.countunrednotifications = state.countunrednotifications - 1;

        state.notifications = state.notifications.map(item => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              viewed: true,
            };
          }
          return item;
        });
      })
      .addCase(markReadNotificationAndDecrement.pending, (state, action) => {})
      .addCase(markReadNotificationAndDecrement.rejected, (state, action) => {
        console.log(action.payload);
      })
      .addCase(markReadNotification.fulfilled, (state, action) => {
        console.log("here");

        console.log(action.payload);

        let id = action.payload.id;
        state.notifications = state.notifications.map(item => {
          if (item.id === id) {
            return {
              ...item,
              viewed: true,
            };
          }
          return item;
        });
      })
      .addCase(markReadNotification.pending, (state, action) => {})
      .addCase(markReadNotification.rejected, (state, action) => {
        console.log(action.payload);
      });
  },
});

export const startNotificationInterval = () => (dispatch, getState) => {
  if (intervalRef) clearInterval(intervalRef);

  intervalRef = setInterval(() => {
    const { isPausedNews } = getState().notificationscenter;
    if (!isPausedNews) {
      dispatch(popNewNotifications());
    }
  }, 9000);
};

export const stopNotificationInterval = () => () => {
  clearInterval(intervalRef);
};

export default notificationcenterSlice.reducer;

export const { toogleNotificacionCenter, addPopupNotification, popNewNotifications, setNotificationPosition } =
  notificationcenterSlice.actions;

export const notificationsCenterSelector = state => state.notificationscenter;
