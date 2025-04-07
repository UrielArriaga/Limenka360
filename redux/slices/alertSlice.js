import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const alertSlice = createSlice({
  name: "alert",
  initialState: {
    severity: null,
    show: null,
    message: "",
    type: null,

    group: false,
    newgroup: false,
    users: false,
    imports: false,
    menuaside: {
      keepopen: false,
      isOpen: false,
    },

    openMenuSide: true,
  },
  reducers: {
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
      console.log("asdas");
      state.newgroup = !state.newgroup;
    },
    // extraReducers: {
    //   [handleOpenGlobalAlert.fulfilled]: (state, { payload }) => {
    //     console.log("cool");
    //     state.severity = null;
    //   },
    //   [handleOpenGlobalAlert.pending]: (state, { payload }) => {
    //     console.log("pending");
    //     state.severity = "success";
    //     // state.totalOportunities = payload.count;
    //   },
    // },
    handleOpenGlobalAlert: (state, action) => {
      const { show, severity, message, type } = action.payload;
      console.log(action);

      state.show = show;
      state.severity = severity;
      state.message = message;
      state.type = type;
      // setTimeout((state) => {
      //   state.severity = null;
      //   state.show = null;
      //   state.message = "";
      //   state.type = null;
      // }, 3000);
    },
  },
});
export default alertSlice.reducer;

export const { handleOpenGlobalAlert } = alertSlice.actions;

export const alertSelector = (state) => state.alert;
