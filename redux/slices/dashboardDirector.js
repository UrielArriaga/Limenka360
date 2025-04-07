import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const dashboardDirector = createSlice({
  name: "dashboarddirector",
  initialState: {
    groupSelected: null,
    startDateGlobal: dayjs().startOf("month").format(),
    finishDateGlobal: dayjs().endOf("month").format(),
    typeCalendar: { value: "months", isActive: true },
    isOpenModal: false,
  },
  reducers: {
    setGroupGlobalGroup: (state, action) => {
      console.log(action.payload);
      state.groupSelected = action.payload.item;
    },
    setStartDateGlobal: (state, action) => {
      state.startDateGlobal = action.payload.startDate;
    },

    setTypeCalendarGlobal: (state, action) => {
      state.typeCalendar = action.payload.typeCalendar;
    },

    setFinishDateGlobal: (state, action) => {
      state.finishDateGlobal = action.payload.finishDate;
    },
    openMenu: (state, action) => {
      state.openMenuSide = action.payload;
    },

    closeMenu: (state, action) => {
      state.menuaside = action.payload;
    },

    openModalGroup: (state, action) => {
      state.isOpenModal = action.payload;
    },

    closeModalGroup: (state, action) => {
      state.isOpenModal = action.payload;
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
export default dashboardDirector.reducer;

export const {
  openMenu,
  closeMenu,
  toogleOpenGroupDialog,
  toogleOpenNewGroupDialog,
  toogleDialog,
  setGroupGlobalGroup,
  setStartDateGlobal,
  setFinishDateGlobal,
  setTypeCalendarGlobal,
} = dashboardDirector.actions;

export const dashboardDirectorSelector = state => state.dashboarddirector;
