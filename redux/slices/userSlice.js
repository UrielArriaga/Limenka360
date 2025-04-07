import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";
const initialState = {
  username: "",
  email: "",
  isFetching: true,
  isSuccess: false,
  isLogged: false,
  isError: false,
  errorMessage: "",
  group: "",
  groupId: "",
  grouplogo: "",
  roleId: null,
  roleName: null,
  isLogged_User: false,
  id_user: null,
  isOnline: false,
  name: "",
  company: null,
  userData: null,
  userPhoto: null,
};

export const loginUser = createAsyncThunk("users/login", async ({ email, password }, thunkAPI) => {
  try {
    const response = await api.post("auth/login", { email, password });
    let data = await response.data;
    if (response.status === 200) {
      api.defaults.headers.common["Authorization"] = data.tokenSession;
      localStorage.setItem("token", data.tokenSession);

      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log("Error", e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const fetchUserBytoken = createAsyncThunk("users/fetchUserByToken", async ({}, thunkAPI) => {
  try {
    let token = localStorage.getItem("token");

    if (token === undefined || token === null) {
      return thunkAPI.rejectWithValue({ email: "" });
    }
    api.defaults.headers.common["Authorization"] = token;
    const response = await api.post("auth/me");
    let data = response.data;
    if (response.status === 201) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log(error);
    console.log("Error", e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const logoutUser = createAsyncThunk("users/logoutUser", async ({}, thunkAPI) => {
  console.log("here");
  try {
    let token = localStorage.getItem("token");

    if (token == null || token === undefined) {
    }
    if (response.status === 200) {
      return { ...data };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log("Error", e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state, { payload }) => {
      let token = localStorage.removeItem("token");
      let modal = localStorage.removeItem("modal");
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.email = "";
      state.roleId = null;
      state.isLogged_User = false;

      return state;
    },
    changeStatus: (state, { payload }) => {
      state.isOnline = payload;
      return state;
    },
    login: (state, { payload }) => {
      state.email = payload.data?.email;
      state.name = payload.data?.name;
      state.username = payload.data?.username;
      state.company = payload.data?.companyId;
      // state.isFetching = false;
      // state.isSuccess = true;
      state.roleId = payload.data?.roleId;
      state.roleName = payload.data?.roleId;
      state.group = payload.data?.groupName;
      state.groupId = payload.data?.groupId;
      state.isLogged = true;
      state.id_user = payload.data?.id;
      state.isLogged_User = true;
      state.userData = payload?.data;
      state.userPhoto = payload?.data.photo;
      return state;
    },
    updatePhoto: (state, { payload }) => {
      state.userPhoto = payload.photo;
      state.userData.photo = payload.photo;
    },
  },
  extraReducers: {
    [logoutUser.fulfilled]: (state, { payload }) => {
      //console.log(payload, "logout full");
      state.isError = false;
      state.isSuccess = false;
      state.isFetching = false;
      state.email = "";
      state.roleId = null;
      state.roleName = null;
      state.isLogged_User = false;
    },
    [logoutUser.pending]: (state, { payload }) => {
      //console.log(payload, "logout pend");
      state.isFetching = true;
    },
    [logoutUser.rejected]: (state, { payload }) => {
      //console.log(payload, "logout reje");
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.table(payload);
      console.log("datos de payload");
      state.isFetching = false;
      state.isSuccess = true;
      state.isLogged = true;
      state.isLogged_User = true;
      state.email = payload.data?.email;
      state.name = payload.data?.name;
      state.username = payload.name;
      state.roleId = payload.data?.roleId;
      state.roleName = payload.data?.roleId;
      state.group = payload.data?.groupName;
      state.groupId = payload.data?.groupId;
      state.id_user = payload.data?.id;
      state.company = payload?.data?.companyId;
      state.userData = payload?.data;
      state.userPhoto = payload?.user?.photo;
      return state;
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = "Error";
    },
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserBytoken.pending]: state => {
      state.isFetching = true;
    },
    [fetchUserBytoken.fulfilled]: (state, { payload }) => {
      //console.log(payload);
      state.isFetching = false;
      state.isSuccess = true;
      state.isLogged = true;
      state.isLogged_User = true;
      state.email = payload?.user?.email;
      state.name = payload?.user?.name;
      state.username = payload.name;
      state.roleId = payload?.user?.roleId;
      state.roleName = payload?.user?.roleId;
      state.id_user = payload.user?.id;
      state.group = payload.user?.groupName;
      state.grouplogo = payload?.user?.grouplogo;
      state.groupId = payload.user?.groupId;
      state.company = payload?.user?.companyId;
      state.userData = payload?.user;
      state.userPhoto = payload?.user?.photo;
    },
    [fetchUserBytoken.rejected]: state => {
      //console.log("fetchUserBytoken");
      state.isFetching = false;
      state.isError = true;
    },
  },
});

export const signupUser = createAsyncThunk("users/signupUser", async ({ name, email, password }, thunkAPI) => {
  try {
    // TODO Logica de registro
    let data = await response.json();
    if (response.status === 200) {
      localStorage.setItem("token", data.token);
      return { ...data, username: name, email: email };
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  } catch (e) {
    console.log("Error", e.response.data);
    return thunkAPI.rejectWithValue(e.response.data);
  }
});

export const { clearState, changeStatus, login, updatePhoto } = userSlice.actions;

export const userSelector = state => state.user;
