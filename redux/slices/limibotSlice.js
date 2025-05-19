import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const limibotSlice = createSlice({
  name: "limibot",
  initialState: {
    prospectSelected: null,
  },
  reducers: {
    setProspectToLimiBot: (state, action) => {
      state.prospectSelected = action.payload;
    },
  },
});
export default limibotSlice.reducer;

export const { setProspectToLimiBot } = alertSlice.actions;

export const limibotSelector = (state) => state.limibot;
