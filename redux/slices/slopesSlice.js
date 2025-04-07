import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import RequestCommon from "../../services/request_Common";

export const getSlopesByQuery = createAsyncThunk("slopes/getSlopesByQuery", async (payload, thunkAPI) => {
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

export const getSlopesByQuery2 = createAsyncThunk("slopes/getSlopesByQuery", async (payload, thunkAPI) => {
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

export const { refetchSlopes, setSlopeSelected, cleanSlopeSelected, refetchSlopesToday } = slopesSlice.actions;

export const slopesSelector = state => state.slopes;
