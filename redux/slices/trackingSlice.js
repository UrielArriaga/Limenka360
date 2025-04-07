import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getCurrentTrackings = createAsyncThunk("tracking/getCurrentTrackings", async (payload, thunkAPI) => {
  const { params } = payload;

  try {
    let responseProspects = await api.get(`trackings`, { params });
    let data = responseProspects.data;
    return data;
  } catch (error) {
    console.log(JSON.stringify(error.response?.data));
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createNewTracking = createAsyncThunk("tracking/posttracking", async (payload, thunkAPI) => {
  try {
    const { data: body } = payload;
    let responseTracking = await api.post(`trackings`, body);
    let data = responseTracking.data;
    // console.log("data", data);
    return data;
  } catch (error) {
    console.log(JSON.stringify(error.response?.data));
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

export const createNewTrackingGlobal = createAsyncThunk("tracking/posttrackinglobal", async (payload, thunkAPI) => {
  try {
    const { data: body } = payload;
    let responseTracking = await api.post(`trackings`, body);
    let data = responseTracking.data;
    return data;
  } catch (error) {
    console.log(JSON.stringify(error.response?.data));
    return thunkAPI.rejectWithValue(error.response?.data);
  }
});

const trackingSlice = createSlice({
  name: "tracking",
  initialState: {
    countTrackings: 0,
    trackings: [],
    isFetchingTrackings: false,
    isErrorTrackings: false,
    isSuccessGetTrackings: false,
    messageError: "",
    isCreatingTracking: false,
    isErrorCreatingTracking: false,
    isSuccessCreateTracking: false,
    messageErrorCreateTracking: "",

    // TODO GLOBAL
    isCreatingTrackingGlobal: false,
    isErrorCreatingTrackingGlobal: false,
    isSuccessCreateTrackingGlobal: false,
    messageErrorCreateTrackingGlobal: "",
  },
  reducers: {
    resetCreateTracking: (state, action) => {
      state.isCreatingTracking = false;
      state.isErrorCreatingTracking = false;
      state.isSuccessCreateTracking = false;
      state.messageErrorCreateTracking = "";
    },
  },

  extraReducers: {
    [getCurrentTrackings.rejected]: (state, { payload }) => {
      state.isFetchingTrackings = false;
      state.isErrorTrackings = true;
      state.messageError = payload;
    },
    [getCurrentTrackings.pending]: (state, { payload }) => {
      state.isFetchingTrackings = true;
    },
    [getCurrentTrackings.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.trackings = payload?.results;
      state.countTrackings = payload?.count || 0;
      state.isFetchingTrackings = false;
      state.isErrorTrackings = false;
    },

    [createNewTracking.rejected]: (state, { payload }) => {
      state.isCreatingTracking = false;
      state.isErrorCreatingTracking = true;
      state.messageErrorCreateTracking = payload;
      state.isSuccessCreateTracking = false;
    },
    [createNewTracking.pending]: (state, { payload }) => {
      state.isCreatingTracking = true;
    },
    [createNewTracking.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isCreatingTracking = false;
      state.isErrorCreatingTracking = false;
      state.isSuccessCreateTracking = true;
    },
    // TODO Global
    [createNewTrackingGlobal.rejected]: (state, { payload }) => {
      state.isCreatingTrackingGlobal = false;
      state.isErrorCreatingTrackingGlobal = true;
      state.messageErrorCreateTracking = payload;
      state.isSuccessCreateTrackingGlobal = false;
    },
    [createNewTrackingGlobal.pending]: (state, { payload }) => {
      state.isCreatingTrackingGlobal = true;
    },
    [createNewTrackingGlobal.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isCreatingTrackingGlobal = false;
      state.isErrorCreatingTrackingGlobal = false;
      state.isSuccessCreateTrackingGlobal = true;
    },
  },
});

export default trackingSlice.reducer;

export const { resetCreateTracking } = trackingSlice.actions;
export const trackingSelector = state => state.tracking;
