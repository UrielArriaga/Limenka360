import { createSlice } from "@reduxjs/toolkit";

export const dashboardManager = createSlice({
  name: "dashboardmanager",
  initialState: {
    ejecutiveSelected: null,
  },
  reducers: {
    setEjecutiveSelectedG: (state, action) => {
      console.log(action.payload);
      state.ejecutiveSelected = action.payload.item;
    },
    openMenu: (state, action) => {
      state.openMenuSide = action.payload;
    },

    closeMenu: (state, action) => {
      state.menuaside = action.payload;
    },
    toogleDialog: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
    toogleOpenGroupDialog: (state) => {
      state.group = !state.group;
    },

    toogleOpenNewGroupDialog: (state) => {
      state.newgroup = !state.newgroup;
    },
  },
});
export default dashboardManager.reducer;

export const { openMenu, closeMenu, toogleOpenGroupDialog, toogleOpenNewGroupDialog, toogleDialog, setEjecutiveSelectedG } =
  dashboardManager.actions;

export const dashboardManagerSelector = (state) => state.dashboardmanager;
