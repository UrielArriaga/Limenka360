import { createSlice } from "@reduxjs/toolkit";

export const quotesSlice = createSlice({
  name: "quotes",
  initialState: {
    productSelect: {},
    productsSelected: [],
    extraproductsSelected: [],
    extraproductSelect: {},
    group: false,
    newgroup: false,
    users: false,
    imports: false,
    menuaside: {
      keepopen: false,
      isOpen: false,
    },
  },

  reducers: {
    openMenu: (state, action) => {
      state.menuaside = action.payload;
    },

    setProductSelect: (state, action) => {
      state.productSelect = action.payload;
    },

    setArrayExtraProducts: (state, action) => {
      state.extraproductsSelected = action.payload;
    },
    setExtraProductSelect: (state, action) => {
      state.productSelect = action.payload;
    },

    resetProductSelect: (state, action) => {
      state.productSelect = {};
    },
    setArrayProducts: (state, action) => {
      state.productsSelected = action.payload;
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

export const { setProductSelect, setArrayProducts, resetProductSelect, setArrayExtraProducts, setExtraProductSelect } =
  quotesSlice.actions;

export default quotesSlice.reducer;

export const quotesSelector = state => state.quotes;
