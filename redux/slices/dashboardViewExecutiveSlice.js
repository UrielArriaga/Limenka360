import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getCountProspectFromManager = createAsyncThunk(
  "dashboardviewexecutive/getcounts",
  async (payload, thunkAPI) => {
    try {
      // let query = {
      //   ejecutiveId: payload.id,
      //   isoportunity: false,
      //   discarted: false,
      //   isclient: false,
      // };
      // let responseProspects = await api.get(`prospects?where=${JSON.stringify(query)}&count=1&limit=0`);
      let responseProspects = await api.get(`prospects`, { params: payload.params });
      let data = responseProspects.data;
      if (responseProspects.status === 200) {
        return data;
      } else {
        thunkAPI.rejectWithValue({ bane });
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getCountOportunitiesFromManager = createAsyncThunk(
  "dashboardviewexecutive/getoportunitiescount",
  async (payload, thunkAPI) => {
    try {
      let query = {
        iscloseout: false,
        discarted: false,
        prospect: {
          // ejecutiveId: payload.id,
          isoportunity: true,
        },
      };

      // let responseProspects = await api.get(`oportunities?where=${JSON.stringify(query)}&count=1&limit=0`);

      let responseProspects = await api.get(`prospects`, { params: payload.params });
      let data = responseProspects.data;
      if (responseProspects.status === 200) {
        return data;
      } else {
        thunkAPI.rejectWithValue({ bane });
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getCountCustomersFromManager = createAsyncThunk(
  "dashboardviewexecutive/getcustomerscount",
  async (payload, thunkAPI) => {
    try {
      let query = {};
      query.iscloseout = true;
      query["prospect"] = {
        ejecutiveId: payload.id,
        isclient: true,
      };
      let params = {
        include: "prospect",
        where: JSON.stringify(query),
        limit: 0,
        count: "1",
        order: "-createdAt",
      };
      let responseOportunities = await api.get(`prospects`, { params: payload.params });

      if (responseOportunities.status === 200) {
        return responseOportunities.data;
      } else {
        thunkAPI.rejectWithValue({ bane });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getCountOrdersFromManager = createAsyncThunk("dashboardviewexecutive/getorderscount", async thunkAPI => {
  try {
    let query = {
      orderstatus: {
        status: 1,
      },
    };

    let params = {
      where: JSON.stringify(query),
      count: 1,
      all: 1,
      include: "orderstatus",
    };
    let responseOrders = await api.get(`orders`, { params });
    if (responseOrders.status === 200) {
      return responseOrders.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});

export const getCountClientesFromManager = createAsyncThunk(
  "dashboardviewexecutive/getclientscount",
  async (payload, thunkAPI) => {
    try {
      let query = {
        ejecutiveId: payload.id,
        isclient: true,
        discarted: false,
      };

      let responseProspectsClients = await api.get(`prospects`, { params: payload.params });
      let data = responseProspectsClients.data;

      if (responseProspectsClients.status === 200) {
        return data;
      } else {
        thunkAPI.rejectWithValue({ bane });
      }
    } catch (error) {
      thunkAPI.rejectWithValue(error.data);
    }
  }
);

export const getPaymentsFromManager = createAsyncThunk(
  "dashboardviewexecutive/getpayments",
  async (payload, thunkAPI) => {
    try {
      let responseOportunities = await api.get(`salespayments`, { params: payload.params });

      if (responseOportunities.status === 200) {
        return responseOportunities.data;
      } else {
        thunkAPI.rejectWithValue({ bane });
      }
    } catch (error) {
      console.log(error);
    }
  }
);

export const getOrdersFromManager = createAsyncThunk("dashboardviewexecutive/getOrders", async (payload, thunkAPI) => {
  try {
    let query = {};
    (query.discarted = false),
      (query["oportunity"] = {
        soldbyId: payload.id,
      });

    let params = {
      where: JSON.stringify(query),
      limit: 0,
      count: "1",
      order: "-createdAt",
      include: "oportunity,oportunity.prospect",
      join: "oportunity,oportunity.prospect",
    };
    let responseOrders = await api.get(`orders`, { params });
    if (responseOrders.status === 200) {
      return responseOrders.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});

export const fetchUserBytokenFromManager = createAsyncThunk(
  "users/fetchUserByTokenFromManager",
  async (payload, thunkAPI) => {
    try {
      const response = await api.get(`ejecutives/${payload.ejecutivo}`);
      let data = response.data;
      if (response.status === 200) {
        return { ...data };
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      console.log(error);
      console.log("Error", e.response.data);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

const dashboardViewExecutiveSlice = createSlice({
  name: "dashboardviewexecutive",
  initialState: {
    id_executive: null,
    userDataExecutive: null,
    totalProspects: 0,
    totalOportunities: 0,
    totalClients: 0,
    totalSells: 0,
    totalPayments: 0,
    totalOrders: 0,
    totalOrdersEjecutive: 0,
    userData: null,
    isFetchingData: true,
  },

  reducers: {
    setGlobalExecutive: (state, { payload }) => {
      state.id_executive = payload.id_user;
      state.userDataExecutive = payload.userData;
    },
  },

  extraReducers: {
    [getCountProspectFromManager.fulfilled]: (state, { payload }) => {
      state.totalProspects = payload.count;
    },
    [getCountOportunitiesFromManager.fulfilled]: (state, { payload }) => {
      state.totalOportunities = payload.count;
    },
    [getCountOrdersFromManager.fulfilled]: (state, { payload }) => {
      state.totalOrders = payload.count;
    },
    [getCountCustomersFromManager.fulfilled]: (state, { payload }) => {
      state.totalSells = payload.count;
    },
    [getCountClientesFromManager.fulfilled]: (state, { payload }) => {
      state.totalClients = payload.count;
    },
    [getPaymentsFromManager.fulfilled]: (state, { payload }) => {
      state.totalPayments = payload.count;
    },
    [getPaymentsFromManager.rejected]: (state, { payload }) => {
      console.log(payload);
    },
    [getOrdersFromManager.fulfilled]: (state, { payload }) => {
      state.totalOrdersEjecutive = payload.count;
    },
    [fetchUserBytokenFromManager.pending]: state => {
      // state.isFetching = true;
    },
    [fetchUserBytokenFromManager.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.isFetchingData = false;
      state.userDataExecutive = payload;
      state.id_executive = payload.id;
    },
    [fetchUserBytokenFromManager.rejected]: state => {
      // state.isFetching = false;
      // state.isError = true;
    },
  },
});

export const { setGlobalExecutive } = dashboardViewExecutiveSlice.actions;

export default dashboardViewExecutiveSlice.reducer;

export const dashboardViewExecutiveSelector = state => state.dashboardviewexecutive;
