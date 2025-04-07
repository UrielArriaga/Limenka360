import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fillGroups = createAsyncThunk("executives/fill", async (payload) => {
  try {
    let responseExecutives = await api.get("groups");
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

export const groupsSlice = createSlice({
  name: "groups",
  initialState: {
    isOpenDrawer: false,
    isFetching: true,
    isError: false,
    isSucess: false,
    groups: [],
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
    [fillGroups.fulfilled]: (state, { payload }) => {
      state.groups = payload.results;
      state.isError = false;
      state.isSucess = true;
      state.isFetching = false;
    },
  },
});

export default groupsSlice.reducer;

export const { toogleDrawer } = groupsSlice.actions;

export const groupsSelector = (state) => state.groups;
