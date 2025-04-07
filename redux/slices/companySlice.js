import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getCompanyById = createAsyncThunk("companies/getcompanybyid", async ({ company }, thunkAPI) => {
  try {
    let response = await api.get(`companies/${company}`);
    let data = response.data;

    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const companySlice = createSlice({
  name: "company",
  initialState: {
    isFetching: true,
    company: null,
    photo: "",
    id_company: null,
    isError: false,
    companyData: null,
  },
  reducers: {},
  extraReducers: {
    [getCompanyById.pending]: (state, { payload }) => {
      state.isFetching = true;
    },
    [getCompanyById.fulfilled]: (state, { payload }) => {
      state.company = payload?.company;
      state.id_company = payload?.id;
      state.isFetching = false;
      state.companyData = payload;
      state.photo = payload?.photo;
    },
    [getCompanyById.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const { clearState, changeStatus } = companySlice.actions;

export const companySelector = state => state.company;
