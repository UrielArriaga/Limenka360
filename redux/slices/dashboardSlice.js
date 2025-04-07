import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getCountProspect = createAsyncThunk("dashboard/getcounts", async (payload, thunkAPI) => {
  try {
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
});

export const getCountOportunities = createAsyncThunk("dashboard/getoportunitiescount", async (payload, thunkAPI) => {
  try {
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
});

export const getCountCustomers = createAsyncThunk("dashboard/getcustomerscount", async (payload, thunkAPI) => {
  try {
    let query = {};
    query.iscloseout = true;
    query["prospect"] = {
      ejecutiveId: payload.id,
      isclient: true,
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
});

export const getCountOrders = createAsyncThunk("dashboard/getorderscount", async thunkAPI => {
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

export const getCountClientes = createAsyncThunk("dashboard/getclientscount", async (payload, thunkAPI) => {
  try {
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
});

export const getTotalSales = createAsyncThunk("dashboard/gettotalsales", async (payload, thunkAPI) => {
  try {
    let responseProspectsClients = await api.get(`oportunities`, { params: payload.params });
    let data = responseProspectsClients.data;

    if (responseProspectsClients.status === 200) {
      return data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error.data);
  }
});

export const getPayments = createAsyncThunk("dashboard/getPayments", async (payload, thunkAPI) => {
  try {
    let responseOportunities = await api.get(`salespayments`, payload);
    let data = responseOportunities.data;
    if (responseOportunities.status === 200) {
      return data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error.data);
  }
});

export const getOrders = createAsyncThunk("dashboard/getOrders", async (payload, thunkAPI) => {
  try {
    let query = {};
    query.discarted = false;
    query.createdbyId = payload.id;

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
    return 1;
    console.log(error);
  }
});

export const getCountGroups = createAsyncThunk("dashboard/getcountgroups", async (payload, thunkAPI) => {
  try {
    let responseProspects = await api.get(`groups`, { params: payload.params });

    let data = responseProspects.data;
    if (responseProspects.status === 200) {
      return data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error.data);
  }
});

export const getCountEjecutives = createAsyncThunk("dashboard/getcountejecutives", async (payload, thunkAPI) => {
  try {
    let responseProspects = await api.get(`ejecutives`, { params: payload.params });

    let data = responseProspects.data;
    if (responseProspects.status === 200) {
      return data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error.data);
  }
});
export const getCountOrdersAllStatus = createAsyncThunk("dashboard/getCountOrdersAllStatus", async thunkAPI => {
  try {
    let params = {
      count: 1,
      all: 1,
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
export const getCountCategories = createAsyncThunk("dashboard/getCountCategories", async thunkAPI => {
  try {
    let params = {
      count: 1,
      all: 1,
    };
    let responseOrders = await api.get(`categories`, { params });
    if (responseOrders.status === 200) {
      return responseOrders.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});
export const getCountProviders = createAsyncThunk("dashboard/getCountProviders", async thunkAPI => {
  try {
    let params = {
      count: 1,
      all: 1,
    };
    let responseproviders = await api.get(`providers`, { params });
    if (responseproviders.status === 200) {
      return responseproviders.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});
export const getCountFormats = createAsyncThunk("dashboard/getCountFormats", async (payload, thunkAPI) => {
  try {
    let responsereports = await api.get(`formats`, { params: payload.params });
    if (responsereports.status === 200) {
      return responsereports.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});

export const getCountShippings = createAsyncThunk("dashboard/getCountShippings", async thunkAPI => {
  try {
    let params = {
      count: 1,
      all: 1,
    };
    let responseShippings = await api.get(`shippings`, { params });
    if (responseShippings.status === 200) {
      return responseShippings.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});

export const getCountActivities = createAsyncThunk("dashboard/getCountActivities", async thunkAPI => {
  try {
    let params = {
      count: 1,
      all: 1,
    };
    let responseAct = await api.get(`trackings`, { params });
    if (responseAct.status === 200) {
      return responseAct.data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    console.log(error);
  }
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    totalProspects: 0,
    totalOportunities: 0,
    totalClients: 0,
    totalSells: 0,
    totalSales: 0,
    totalPayments: 0,
    totalOrders: 0,
    totalOrdersEjecutive: 0,
    totalGroups: 0,
    totalEjecutives: 0,
    totalOrdersAllStatus: 0,
    totalCategories: 0,
    totalProviders: 0,
    totalFormats: 0,
    totalShipping: 0,
    totalActivities: 0,
  },

  extraReducers: {
    [getCountProspect.fulfilled]: (state, { payload }) => {
      state.totalProspects = payload?.count;
    },
    [getCountOportunities.fulfilled]: (state, { payload }) => {
      state.totalOportunities = payload?.count;
    },
    [getCountOrders.fulfilled]: (state, { payload }) => {
      state.totalOrders = payload?.count;
    },
    [getCountCustomers.fulfilled]: (state, { payload }) => {
      state.totalSells = payload?.count;
    },
    [getCountClientes.fulfilled]: (state, { payload }) => {
      state.totalClients = payload?.count;
    },
    [getPayments.fulfilled]: (state, { payload }) => {
      // state.totalPayments = payload.count;
      state.totalPayments = payload?.count;
    },
    [getPayments.rejected]: (state, { payload }) => {
      //Ocurrio un error state.error = action.error.message;
    },
    [getTotalSales.fulfilled]: (state, { payload }) => {
      state.totalSales = payload?.count;
    },
    [getTotalSales.rejected]: (state, { payload }) => {
      // state.totalSales = "Error";
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.totalOrdersEjecutive = payload?.count;
    },
    [getCountGroups.fulfilled]: (state, { payload }) => {
      state.totalGroups = payload?.count;
    },
    [getCountEjecutives.fulfilled]: (state, { payload }) => {
      state.totalEjecutives = payload?.count;
    },
    [getCountOrdersAllStatus.fulfilled]: (state, { payload }) => {
      state.totalOrdersAllStatus = payload?.count;
    },
    [getCountCategories.fulfilled]: (state, { payload }) => {
      state.totalCategories = payload?.count;
    },
    [getCountProviders.fulfilled]: (state, { payload }) => {
      state.totalProviders = payload?.count;
    },
    [getCountFormats.fulfilled]: (state, { payload }) => {
      state.totalFormats = payload?.count;
    },
    [getCountShippings.fulfilled]: (state, { payload }) => {
      state.totalShipping = payload?.count;
    },
    [getCountActivities.fulfilled]: (state, { payload }) => {
      state.totalActivities = payload?.count;
    },
  },
});

export default dashboardSlice.reducer;

export const dashboardSelectos = state => state.dashboard;
