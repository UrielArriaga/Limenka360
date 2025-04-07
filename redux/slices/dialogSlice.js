import { createSlice } from "@reduxjs/toolkit";

export const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    group: false,
    newgroup: false,
    users: false,
    imports: false,
    menuaside: {
      keepopen: false,
      isOpen: true,
    },
    openMenuSide: true,
    openRecentActivities: true,
  },
  reducers: {
    openMenu: (state, action) => {
      state.openMenuSide = action.payload;
    },
    handleToggleMenu: (state, action) => {
      state.openMenuSide = action.payload;
    },

    handleToggleActivities: (state, action) => {
      state.openRecentActivities = action.payload;
    },

    closeMenu: (state, action) => {
      state.menuaside = action.payload;
    },
    toogleDialog: (state, action) => {
      state[action.payload] = !state[action.payload];
    },
    toogleOpenGroupDialog: state => {
      state.group = !state.group;
    },

    toogleOpenNewGroupDialog: state => {
      state.newgroup = !state.newgroup;
    },
  },
});
export default dialogSlice.reducer;

export const {
  handleToggleActivities,
  openMenu,
  closeMenu,
  toogleOpenGroupDialog,
  toogleOpenNewGroupDialog,
  toogleDialog,
  handleToggleMenu,
} = dialogSlice.actions;

export const dialogSelector = state => state.dialog;
