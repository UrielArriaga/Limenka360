import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getOrders = createAsyncThunk("orders/getOrders", async (payload, thunkAPI) => {
  if (!payload.params) {
    return thunkAPI.rejectWithValue("No params value");
  }
  const { params } = payload;
  try {
    let response = await api.get(`orders`, { params });
    let data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    ordersresults: [],
    totalOrders: 0,
    isFetching: false,
    isError: false,
    isSucess: false,
    messageError: "",
    reloadFething: false,
  },
  reducers: {
    refetchOrdersNotification: (state, action) => {
      state.reloadFething = !state.reloadFething;
    },
    refetchOrdersNotificationTrue: (state, action) => {
      state.reloadFething = false;
    },
  },
  extraReducers: {
    [getOrders.fulfilled]: (state, { payload }) => {
      state.ordersresults = payload?.results;
      state.totalOrders = payload?.count;
      state.isSucess = true;
      state.isFetching = false;
      state.isError = false;
      state.messageError = "";
    },

    [getOrders.pending]: (state, { payload }) => {
      state.isFetching = true;
    },

    [getOrders.rejected]: (state, { payload }) => {
      state.isSucess = false;
      state.isFetching = false;
      state.isError = true;
      state.messageError = payload;
    },
  },
});

export const { refetchOrdersNotification, refetchOrdersNotificationTrue } = ordersSlice.actions;

export const ordersSelector = state => state.orders;
