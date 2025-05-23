import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import RequestCommon from "../../services/request_Common";
export const COLOR_EVENTS = [
  {
    bgColor: "#ffe3e3",
    color: "#c92a2a",
    resourceId: "62dlUPgKjOpCoDH6wU0sG9rp",
  },
  {
    bgColor: "#f8f0fc",
    color: "#862e9c",
    resourceId: "62dN6LUisuI0rTZm1p5l5Lcp",
  },
  {
    bgColor: "#e7f5ff",
    color: "#1864ab",
    resourceId: "62dp9dPnCtgdfTodXAUuzr1N",
  },
  {
    bgColor: "#fff4e6",
    color: "#d9480f",
    resourceId: "62dQiGAWr0P53bbpmnYtXmd5",
  },
  {
    bgColor: "#f4fce3",
    color: "#5c940d",
    resourceId: "62dUf2tKTw0k9q0WrC5uvf8m",
  },
];

const formatEvent = (event) => {
  const {
    id,
    isdone,
    subject,
    description,
    date_from: dateFrom,
    date_to: dateTo,
    pendingstypeId,
  } = event;

  return {
    ...event,
    resourceId: pendingstypeId,
    id,
    title: description,
    start: new Date(dateFrom),
    end: dateTo ? new Date(dateTo) : new Date(dateFrom),
    color: COLOR_EVENTS.find((color) => color.resourceId === pendingstypeId),
    isdone,
  };
};

const formatEvents = (events) => {
  return events.map((event) => {
    const {
      id,
      isdone,
      subject,
      description,
      date_from: dateFrom,
      date_to: dateTo,
      pendingstypeId,
    } = event;

    return {
      ...event,
      resourceId: pendingstypeId,
      id,
      title: description,
      start: new Date(dateFrom),
      end: dateTo ? new Date(dateTo) : new Date(dateFrom),
      color: COLOR_EVENTS.find((color) => color.resourceId === pendingstypeId),
      isdone,
    };
  });
};

export const getSlopesByQuery = createAsyncThunk(
  "slopes/getSlopesByQuery",
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

export const getSlopesByQuery2 = createAsyncThunk(
  "slopes/getSlopesByQuery",
  async (payload, thunkAPI) => {
    if (!payload.params) {
      return thunkAPI.rejectWithValue("No params value");
    }

    const { params } = payload;

    try {
      let response = await api.get(`pendingsshopping`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getSlopesToday = createAsyncThunk(
  "slopes/getSlopesByToday",
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

export const slopesSlice = createSlice({
  name: "slopes",
  initialState: {
    slopeSelected: {},

    slopesresults: [],
    totalSlopes: 0,
    isFetchingSlopes: false,
    isErrorSlopes: false,
    isSuccesSlopes: false,
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

    removePendingToday: (state, action) => {
      const id = action.payload;
      const index = state.slopesTodayResults.findIndex(
        (item) => item.id === id
      );
      if (index !== -1) {
        state.slopesTodayResults.splice(index, 1);
        state.countSlopesToday = state.slopesTodayResults.length;
      }
    },

    addPendingToday: (state, action) => {
      const newPending = action.payload;
      state.slopesTodayResults.push(formatEvent(newPending));
      state.countSlopesToday = state.slopesTodayResults.length;
    },
  },
  extraReducers: {
    // * ORIGINS
    [getSlopesByQuery.fulfilled]: (state, { payload }) => {
      state.slopesresults = payload?.results;
      state.totalSlopes = payload?.count;
      state.isSuccesSlopes = true;
      state.isFetchingSlopes = false;
      state.isErrorSlopes = false;
      state.messageError = "";
    },

    [getSlopesByQuery.pending]: (state, { payload }) => {
      state.isFetchingSlopes = true;
    },

    [getSlopesByQuery.rejected]: (state, { payload }) => {
      state.isSuccesSlopes = false;
      state.isFetchingSlopes = false;
      state.isErrorSlopes = true;
      state.messageError = payload;
    },
    // * TODO

    [getSlopesToday.fulfilled]: (state, { payload }) => {
      state.slopesTodayResults = formatEvents(payload?.results);
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

export const {
  refetchSlopes,
  setSlopeSelected,
  cleanSlopeSelected,
  refetchSlopesToday,
  removePendingToday,
  addPendingToday,
} = slopesSlice.actions;

export const slopesSelector = (state) => state.slopes;

export const pendingsSelector = (state) => state.slopes;
