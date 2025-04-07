import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fillExecutives = createAsyncThunk("executives/fill", async (payload) => {
  try {
    let responseExecutives = await api.get("ejecutives");
    let data = responseExecutives.data;
    if (responseExecutives.status === 200) {
      return data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error.data);
  }
});

export const ejecutivosSlice = createSlice({
  name: "executives",
  initialState: {
    isOpenDrawer: false,
    isFetching: true,
    isError: false,
    isSucess: false,
    executives: [],
  },
  reducers: {
    openDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },

    closeDrawer: (state, action) => {
      state.isOpenDrawer = action.payload;
    },
    toogleDrawer: (state, action) => {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
  },
  extraReducers: {
    [fillExecutives.fulfilled]: (state, { payload }) => {
      state.executives = payload.results;
      state.isError = false;
      state.isSucess = true;
      state.isFetching = false;
    },
  },
});

export default ejecutivosSlice.reducer;

export const { toogleDrawer } = ejecutivosSlice.actions;

export const useExecutives = (state) => state.executives;
