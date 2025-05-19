import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";
import RequestCommon from "../../services/request_Common";
import dayjs from "dayjs";
export const getPhasesCommon = createAsyncThunk(
  "common/getphases",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get("phases", { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getCities = createAsyncThunk(
  "common/getcities",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get("cities", { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getActionsCommon = createAsyncThunk(
  "common/getactions",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get("actions", { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getEntities = createAsyncThunk(
  "common/getentities",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get("entities", { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getClientTypesCommon = createAsyncThunk(
  "common/getclienttypes",
  async (payload, thunkAPI) => {
    const { params } = payload;

    try {
      let response = await api.get("clienttypes", { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getOriginsCommon = createAsyncThunk(
  "common/getorigins",
  async (payload, thunkAPI) => {
    const { params } = payload;

    let defaultParams = {
      limit: 100,
      count: "1",
      order: "-createdAt",
    };

    try {
      let response = await api.get(`origins`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getLabelsProspect = createAsyncThunk(
  "common/getlabelsprospect",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`labels`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getGoalNames = createAsyncThunk(
  "common/getgoalnames",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`goalnames`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getGoalTypes = createAsyncThunk(
  "common/getgoaltypes",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`goaltypes`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getChannelsCommon = createAsyncThunk(
  "common/getChannels",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`channels`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getSpecialtiesCommon = createAsyncThunk(
  "common/getspecialties",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`specialties`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getCategoriesCommon = createAsyncThunk(
  "common/getcategories",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`categories`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getUsersCommon = createAsyncThunk(
  "common/getusers",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`ejecutives`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getClientsCompany = createAsyncThunk(
  "common/getClientsCompanies",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`clientscompanies`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getDiscardReasons = createAsyncThunk(
  "common/getdiscardreasons",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`reasons`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getProductsCommon = createAsyncThunk(
  "common/getProductsCommon",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let product = await api.get(`products`, { params });
      let data = product.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getActivitiesCommon = createAsyncThunk(
  "common/getActivities",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let activies = await api.get(`activities?include=ejecutive`, { params });
      let data = activies.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getGroupsCommon = createAsyncThunk(
  "common/getGroupsCommon",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let groups = await api.get(`groups`, { params });
      let data = groups.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getCfdisCommon = createAsyncThunk(
  "common/getCfdisCommon",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let cfdis = await api.get(`cfdi`, { params });
      let data = cfdis.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getpaymentways = createAsyncThunk(
  "common/getpaymentways",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let paymentways = await api.get(`paymentways`, { params });
      let data = paymentways.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getpaymentmethods = createAsyncThunk(
  "common/getpaymentmethods",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let paymentmethod = await api.get(`paymentmethods`, { params });
      let data = paymentmethod.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// pendingstypes
export const getPendingsTypes = createAsyncThunk(
  "common/getpendingstypes",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let pendingstypes = await api.get(`pendingstypes`, { params });
      let data = pendingstypes.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const gettaxregimens = createAsyncThunk(
  "common/gettaxregimens",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let taxRegimes = await api.get(`taxregimes`, { params });
      let data = taxRegimes.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getpaymentAccount = createAsyncThunk(
  "common/getpaymentAccount",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let paymentsacounts = await api.get(`paymentsacounts`, { params });
      let data = paymentsacounts.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTypeSales = createAsyncThunk(
  "common/getTypeSales",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let paymentsacounts = await api.get(`typesales`, { params });
      let data = paymentsacounts.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDiscardReasonsOrders = createAsyncThunk(
  "common/getDiscardReasonsOrders",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let response = await api.get(`orderreasons`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getshippingtypes = createAsyncThunk(
  "common/getshippingtypes",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let response = await api.get(`shippingtypes`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getOrdersStatus = createAsyncThunk(
  "common/getOrdersStatus",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let response = await api.get(`orderstatus`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getfileTypes = createAsyncThunk(
  "common/getfileTypes",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let filetypes = await api.get(`filetypes`, { params });
      let data = filetypes.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getConcepts = createAsyncThunk(
  "common/getConcepts",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let concept = await api.get("oportunities", { params });
      let data = concept.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBrandsCommon = createAsyncThunk(
  "common/getBrands",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let brands = await api.get("brands", { params });
      let data = brands.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTypeProductsCommon = createAsyncThunk(
  "common/getTypeProducts",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let typeProducts = await api.get("productstypes", { params });
      let data = typeProducts.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getRejectedReasonsCommon = createAsyncThunk(
  "common/getRejectedReasons",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let rejectedReasons = await api.get("rejected", { params });
      let data = rejectedReasons.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getImportantResasonCommon = createAsyncThunk(
  "common/getImportantResasonCommon",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let importantResason = await api.get("important", { params });
      let data = importantResason.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTemplatesWp = createAsyncThunk(
  "common/getTemplatesWp",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;

    try {
      let templates = await api.get("templates", { params });
      let data = templates.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProductsTypes = createAsyncThunk(
  "common/getproductstypes",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`productstypes`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);
export const getBrands = createAsyncThunk(
  "common/getbrands",
  async (payload, thunkAPI) => {
    const { params } = payload;
    try {
      let response = await api.get(`brands`, { params });
      let data = response.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(e.response.data);
    }
  }
);

export const getpaymentperiods = createAsyncThunk(
  "common/getpaymentperiods",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let paymentperiods = await api.get(`paymentperiods`, { params });
      let data = paymentperiods.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getWarehousesStatus = createAsyncThunk(
  "common/getwarehousesstatus",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let warehouses = await api.get("warehousesstatus", { params });
      let data = warehouses.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTaxInformations = createAsyncThunk(
  "common/gettaxinformations",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let tax = await api.get("taxinformation", { params });
      let data = tax.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getProviders = createAsyncThunk(
  "common/getproviders",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let providers = await api.get("providers", { params });
      let data = providers.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getStatuspoo = createAsyncThunk(
  "common/getStatuspoo",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let status = await api.get("statuspoo", { params });
      let data = status.data;

      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDrivers = createAsyncThunk(
  "common/getDrivers",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let drivers = await api.get("drivers", { params });
      let data = drivers.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getTransportunits = createAsyncThunk(
  "common/getTransportunits",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let transportunits = await api.get("transportunits", { params });
      let data = transportunits.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getOrderRejectedReasons = createAsyncThunk(
  "common/getorderrejected",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let orderrejected = await api.get("orderrejected", { params });
      let data = orderrejected.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getDeliveryTimes = createAsyncThunk(
  "common/getDeliveryTimes",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let deliverytimes = await api.get(`deliverytimes`, { params });
      let data = deliverytimes.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getWareHouses = createAsyncThunk(
  "common/getWareHouses",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let warehouses = await api.get(`warehouses`, { params });
      let data = warehouses.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getTypesEntries = createAsyncThunk(
  "common/getTypesEntries",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let typesentries = await api.get(`typesentries`, { params });
      let data = typesentries.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getNotifications = createAsyncThunk(
  "common/getNotificationsNews",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let notifications = await api.get(`notifications`, { params });
      let data = notifications.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
export const getOrderReturn = createAsyncThunk(
  "common/getOrderReturn",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let typereturns = await api.get("typereturns", { params });
      let data = typereturns.data;
      console.log("ksdjfkdfdf", data);
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getReasonWarranties = createAsyncThunk(
  "common/getReasonWarranties",
  async (payload, thunkAPI) => {
    const { params = {} } = payload;
    try {
      let reasons = await api.get(`reasonwarranties`, { params });
      let data = reasons.data;
      return data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const commonSlice = createSlice({
  name: "common",
  initialState: {
    actions: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    paymentperiods: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    brands: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    typeProducts: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    groups: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    phases: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    goalnames: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    productstypes: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    goaltypes: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    clientsCompanies: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    clientTypes: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    cities: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    entities: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    origins: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    labels: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    specialties: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    channels: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    categories: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
      isDone: false,
    },
    pendingstypes: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    users: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    discardreasons: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    products: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    activities: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    cfdi: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    paymentway: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    discardreasonsOrders: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    shippingtype: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    orderstatus: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    rejectedreasons: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },

    typesSales: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },

    importantresons: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    paymentmethod: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    taxregime: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    paymentsacount: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    filetypes: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    concepts: {
      isFetching: true,
      isError: false,
      results: [],
      count: 0,
    },
    templateswp: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    warehouses: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    warehouse: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    taxinformations: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    providers: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    statusOrders: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    transportunits: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    drivers: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    orderrejected: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    deliverytimes: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    typesentries: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    notifications: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
      messageError: "",
      isSuccess: false,
      show: false,
    },
    typereturns: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    reasonwarranties: {
      isFetching: false,
      isError: false,
      results: [],
      count: 0,
    },
    dates: [
      { label: "Hoy", value: "day" },
      { label: "Semana Actual", value: "week" },
      { label: "Mes Actual", value: "month" },
      { label: "Rango", value: "range", startRange: "", finishRange: "" },
    ],
    daysFilter: [
      {
        label: "Hoy",
        value: [dayjs().startOf("day").format(), dayjs().endOf("day").format()],
      },
      {
        label: "Semana Actual",
        value: [
          dayjs().startOf("week").format(),
          dayjs().endOf("week").format(),
        ],
      },
      {
        label: "Mes Actual",
        value: [
          dayjs().startOf("month").format(),
          dayjs().endOf("month").format(),
        ],
      },
      { label: "Rango", value: "range" },
    ],
    filtersCertainty: [
      { label: "10%", value: 10 },
      { label: "20%", value: 20 },
      { label: "30%", value: 30 },
      { label: "40%", value: 40 },
      { label: "50%", value: 50 },
      { label: "60%", value: 60 },
      { label: "70%", value: 70 },
      { label: "80%", value: 80 },
      { label: "90%", value: 90 },
      { label: "100%", value: 100 },
    ],
    optionIsClient: [{ label: "Mostrar", value: true, type: "Clientes" }],
    filterRejected: [{ label: "Mostrar", value: true, type: "Rechazadas" }],
    filterDescarted: [{ label: "Mostrar", value: true, type: "Descartados" }],
    filterBill: [
      { label: "Mostrar pedidos con Factura", value: true, type: "Factura" },
    ],
    filterVerified: [
      {
        label: "Mostrar pedidos Verificados",
        value: true,
        type: "Verificados",
      },
      {
        label: "Mostrar pedidos No Verificados",
        value: false,
        type: "Verificados",
      },
    ],
    filterImportant: [{ label: "Mostrar", value: true, type: "Importantes" }],
    datesStatusOrder: [
      { label: "Aprobado", value: "9eQCIBnRvc990VlJfgswanCh" },
      { label: "Pendiente de aprobación", value: "YDBO8hIj4LPZzGvgzSeyhhOs" },
      { label: "Rechazado", value: "CwNWIj2RxW6N2B9v4WiwD1V9" },
    ],
    filterIsPaid: [
      { label: "Pagado", value: true },
      { label: "Pendiente", value: false },
    ],
    filterSaleByOrder: [
      { label: "Si", value: true },
      { label: "No", value: false },
    ],
    filterStatusProduct: [
      { name: "Activo", id: true },
      { name: "Inactivo", id: false },
    ],
    filterImportProduct: [
      { name: "Si", id: true },
      { name: "No", id: false },
    ],
  },

  reducers: {
    AddCommentToOrder: (state, action) => {
      const dataNotifications = action.payload;
      state.notifications.results = [
        ...state.notifications.results,
        dataNotifications,
      ];
    },
    RemoveNotification: (state, action) => {
      const dataNotifications = action.payload;
      state.notifications.results = state.notifications.results.filter(
        (item) => item.id != dataNotifications.id
      );
    },
    UpdateNotification: (state, action) => {
      const dataNotifications = action.payload;
      state.notifications.results = [
        ...state.notifications.results.filter(
          (item) => item.id != dataNotifications.id
        ),
        dataNotifications,
      ];
    },
    hideNotification: (state) => {
      state.notifications.show = false;
    },
    AddMultipleNotifications: (state, action) => {
      const data = action.payload;
      state.notifications.results = [
        ...state.notifications.results,
        ...data.datax,
      ];
    },
  },
  extraReducers: {
    // * Actions
    [getActionsCommon.pending]: (state, { payload }) => {
      state.actions.isFetching = true;
    },
    [getActionsCommon.fulfilled]: (state, { payload }) => {
      state.actions.results = payload?.results;
      state.actions.count = payload?.count ? payload?.count : 0;
      state.actions.isFetching = false;
    },
    [getActionsCommon.rejected]: (state, { payload }) => {
      state.actions.isFetching = false;
      state.actions.isError = false;
    },

    // * Brands
    [getBrandsCommon.pending]: (state, { payload }) => {
      state.brands.isFetching = true;
    },
    [getBrandsCommon.fulfilled]: (state, { payload }) => {
      state.brands.results = payload?.results;
      state.brands.count = payload?.count ? payload?.count : 0;
      state.brands.isFetching = false;
    },
    [getBrandsCommon.rejected]: (state, { payload }) => {
      state.brands.isFetching = false;
      state.brands.isError = false;
    },
    // * phases
    [getPhasesCommon.pending]: (state, { payload }) => {
      state.phases.isFetching = true;
    },
    [getPhasesCommon.fulfilled]: (state, { payload }) => {
      state.phases.results = payload?.results;
      state.phases.count = payload?.count ? payload?.count : 0;
      state.phases.isFetching = false;
    },
    [getPhasesCommon.rejected]: (state, { payload }) => {
      state.phases.isFetching = false;
      state.phases.isError = false;
    },
    // * Type Products

    [getTypeProductsCommon.pending]: (state, { payload }) => {
      state.typeProducts.isFetching = true;
    },
    [getTypeProductsCommon.fulfilled]: (state, { payload }) => {
      state.typeProducts.results = payload?.results;
      state.typeProducts.count = payload?.count ? payload?.count : 0;
      state.typeProducts.isFetching = false;
    },
    [getTypeProductsCommon.rejected]: (state, { payload }) => {
      state.typeProducts.isFetching = false;
      state.typeProducts.isError = false;
    },

    // * client types
    [getClientTypesCommon.pending]: (state, { payload }) => {
      state.clientTypes.isFetching = true;
    },
    [getClientTypesCommon.fulfilled]: (state, { payload }) => {
      state.clientTypes.results = payload?.results;
      state.clientTypes.count = payload?.count ? payload?.count : 0;
      state.clientTypes.isFetching = false;
    },
    [getClientTypesCommon.rejected]: (state, { payload }) => {
      state.clientTypes.isFetching = false;
      state.clientTypes.isError = false;
    },
    //* Goal names
    [getGoalNames.pending]: (state, { payload }) => {
      state.goalnames.isFetching = true;
    },
    [getGoalNames.fulfilled]: (state, { payload }) => {
      state.goalnames.results = payload?.results;
      state.goalnames.count = payload?.count ? payload?.count : 0;
      state.goalnames.isFetching = false;
    },
    [getGoalNames.rejected]: (state, { payload }) => {
      state.goalnames.isFetching = false;
      state.goalnames.isError = false;
    },
    // * Pendingstypes

    [getPendingsTypes.pending]: (state, { payload }) => {
      state.pendingstypes.isFetching = true;
    },
    [getPendingsTypes.fulfilled]: (state, { payload }) => {
      state.pendingstypes.results = payload?.results;
      state.pendingstypes.count = payload?.count ? payload?.count : 0;
      state.pendingstypes.isFetching = false;
    },
    [getPendingsTypes.rejected]: (state, { payload }) => {
      state.pendingstypes.isFetching = false;
      state.pendingstypes.isError = false;
    },
    //*Goal Types

    [getGoalTypes.pending]: (state, { payload }) => {
      state.goaltypes.isFetching = true;
    },
    [getGoalTypes.fulfilled]: (state, { payload }) => {
      state.goaltypes.results = payload?.results;
      state.goaltypes.count = payload?.count ? payload?.count : 0;
      state.goaltypes.isFetching = false;
    },
    [getGoalTypes.rejected]: (state, { payload }) => {
      state.goaltypes.isFetching = false;
      state.goaltypes.isError = false;
    },

    // * Labels
    [getLabelsProspect.pending]: (state, { payload }) => {
      state.labels.isFetching = true;
    },
    [getLabelsProspect.fulfilled]: (state, { payload }) => {
      state.labels.results = payload?.results;
      state.labels.count = payload?.count ? payload?.count : 0;
      state.labels.isFetching = false;
    },
    [getLabelsProspect.rejected]: (state, { payload }) => {
      state.labels.isFetching = false;
      state.labels.isError = false;
    },

    // * TYPE FILES
    [getfileTypes.pending]: (state, { payload }) => {
      state.filetypes.isFetching = true;
    },
    [getfileTypes.fulfilled]: (state, { payload }) => {
      state.filetypes.results = payload?.results;
      state.filetypes.count = payload?.count ? payload?.count : 0;
      state.filetypes.isFetching = false;
    },
    [getfileTypes.rejected]: (state, { payload }) => {
      state.filetypes.isFetching = false;
      state.filetypes.isError = false;
    },

    // * ORIGINS
    [getOriginsCommon.pending]: (state, { payload }) => {
      state.origins.isFetching = true;
    },
    [getOriginsCommon.fulfilled]: (state, { payload }) => {
      state.origins.results = payload?.results;
      state.origins.count = payload?.count ? payload?.count : 0;

      state.origins.isFetching = false;
    },
    [getOriginsCommon.rejected]: (state, { payload }) => {
      state.origins.isFetching = false;
      state.origins.isError = false;
    },
    // * Entities
    [getEntities.pending]: (state, { payload }) => {
      state.entities.isFetching = true;
    },
    [getEntities.fulfilled]: (state, { payload }) => {
      state.entities.results = payload?.results;
      state.entities.count = payload?.count ? payload?.count : 0;
      state.entities.isFetching = false;
    },
    [getEntities.rejected]: (state, { payload }) => {
      state.entities.isFetching = false;
      state.entities.isError = false;
    },
    //*Cities
    [getCities.pending]: (state, { payload }) => {
      state.cities.isFetching = true;
    },
    [getCities.fulfilled]: (state, { payload }) => {
      state.cities.results = payload?.results;
      state.cities.count = payload?.count ? payload?.count : 0;
      state.cities.isFetching = false;
    },
    [getCities.rejected]: (state, { payload }) => {
      state.cities.isFetching = false;
      state.cities.isError = false;
    },
    //*Clients Company
    [getClientsCompany.pending]: (state, { payload }) => {
      state.clientsCompanies.isFetching = true;
    },
    [getClientsCompany.fulfilled]: (state, { payload }) => {
      state.clientsCompanies.results = payload?.results;
      state.clientsCompanies.count = payload?.count ? payload?.count : 0;
      state.clientsCompanies.isFetching = false;
    },
    [getClientsCompany.rejected]: (state, { payload }) => {
      state.clientsCompanies.isFetching = false;
      state.clientsCompanies.isError = false;
    },

    // * specialties
    [getSpecialtiesCommon.pending]: (state, { payload }) => {
      state.specialties.isFetching = true;
    },
    [getSpecialtiesCommon.fulfilled]: (state, { payload }) => {
      state.specialties.results = payload?.results;
      state.specialties.count = payload?.count ? payload?.count : 0;
      state.specialties.isFetching = false;
    },
    [getSpecialtiesCommon.rejected]: (state, { payload }) => {
      state.specialties.isFetching = false;
      state.specialties.isError = false;
    },
    // * channels
    [getChannelsCommon.pending]: (state, { payload }) => {
      state.channels.isFetching = true;
    },
    [getChannelsCommon.fulfilled]: (state, { payload }) => {
      state.channels.results = payload?.results;
      state.channels.count = payload?.count ? payload?.count : 0;
      state.channels.isFetching = false;
    },
    [getChannelsCommon.rejected]: (state, { payload }) => {
      state.channels.isFetching = false;
      state.channels.isError = false;
    },

    // * Categories
    [getCategoriesCommon.pending]: (state, { payload }) => {
      state.categories.isFetching = true;
    },
    [getCategoriesCommon.fulfilled]: (state, { payload }) => {
      state.categories.results = payload?.results;
      state.categories.count = payload?.count ? payload?.count : 0;
      state.categories.isFetching = false;
    },
    [getCategoriesCommon.rejected]: (state, { payload }) => {
      state.categories.isFetching = false;
      state.categories.isError = false;
    },

    // * Important Reasons
    [getImportantResasonCommon.pending]: (state, { payload }) => {
      state.importantresons.isFetching = true;
    },
    [getImportantResasonCommon.fulfilled]: (state, { payload }) => {
      state.importantresons.results = payload?.results;
      state.importantresons.count = payload?.count ? payload?.count : 0;
      state.importantresons.isFetching = false;
    },
    [getImportantResasonCommon.rejected]: (state, { payload }) => {
      state.importantresons.isFetching = false;
      state.importantresons.isError = false;
    },
    // * Users
    [getUsersCommon.pending]: (state, { payload }) => {
      state.users.isFetching = true;
    },
    [getUsersCommon.fulfilled]: (state, { payload }) => {
      state.users.results = payload?.results;
      state.users.count = payload?.count ? payload?.count : 0;
      state.users.isFetching = false;
    },
    [getUsersCommon.rejected]: (state, { payload }) => {
      state.users.isFetching = false;
      state.users.isError = false;
    },
    // * Users
    [getDiscardReasons.pending]: (state, { payload }) => {
      state.discardreasons.isFetching = true;
    },
    [getDiscardReasons.fulfilled]: (state, { payload }) => {
      state.discardreasons.results = payload?.results;
      state.discardreasons.count = payload?.count ? payload?.count : 0;
      state.discardreasons.isFetching = false;
    },
    [getDiscardReasons.rejected]: (state, { payload }) => {
      state.discardreasons.isFetching = false;
      state.discardreasons.isError = false;
    },
    // * Groups
    [getGroupsCommon.pending]: (state, { payload }) => {
      state.groups.isFetching = true;
    },
    [getGroupsCommon.fulfilled]: (state, { payload }) => {
      state.groups.results = payload?.results;
      state.groups.count = payload?.count ? payload?.count : 0;
      state.groups.isFetching = false;
    },
    [getGroupsCommon.rejected]: (state, { payload }) => {
      state.groups.isFetching = false;
      state.groups.isError = false;
    },
    // * Products
    [getProductsCommon.pending]: (state, { payload }) => {
      state.products.isFetching = true;
    },
    [getProductsCommon.fulfilled]: (state, { payload }) => {
      state.products.results = payload?.results;
      state.products.count = payload?.count ? payload?.count : 0;
      state.products.isFetching = false;
    },
    [getProductsCommon.rejected]: (state, { payload }) => {
      state.products.isFetching = false;
      state.products.isError = false;
    },

    // * Activities
    [getActivitiesCommon.pending]: (state, { payload }) => {
      state.activities.isFetching = true;
    },
    [getActivitiesCommon.fulfilled]: (state, { payload }) => {
      state.activities.results = payload?.results;
      state.activities.count = payload?.count ? payload?.count : 0;
      state.activities.isFetching = false;
    },
    [getActivitiesCommon.rejected]: (state, { payload }) => {
      state.activities.isFetching = false;
      state.activities.isError = false;
    },
    //*CFDIS
    [getCfdisCommon.pending]: (state, { payload }) => {
      state.cfdi.isFetching = true;
    },
    [getCfdisCommon.fulfilled]: (state, { payload }) => {
      state.cfdi.results = payload?.results;
      state.cfdi.count = payload?.count ? payload?.count : 0;
      state.cfdi.isFetching = false;
    },
    [getCfdisCommon.rejected]: (state, { payload }) => {
      state.cfdi.isFetching = false;
      state.cfdi.isError = false;
    },
    // * forma de pago
    [getpaymentways.pending]: (state, { payload }) => {
      state.paymentway.isFetching = true;
    },
    [getpaymentways.fulfilled]: (state, { payload }) => {
      state.paymentway.results = payload?.results;
      state.paymentway.count = payload?.count ? payload?.count : 0;
      state.paymentway.isFetching = false;
    },
    [getpaymentways.rejected]: (state, { payload }) => {
      state.paymentway.isFetching = false;
      state.paymentway.isError = false;
    },
    // * periodos de pago
    [getpaymentperiods.pending]: (state, { payload }) => {
      state.paymentperiods.isFetching = true;
    },
    [getpaymentperiods.fulfilled]: (state, { payload }) => {
      state.paymentperiods.results = payload?.results;
      state.paymentperiods.count = payload?.count ? payload?.count : 0;
      state.paymentperiods.isFetching = false;
    },
    [getpaymentperiods.rejected]: (state, { payload }) => {
      state.paymentperiods.isFetching = false;
      state.paymentperiods.isError = false;
    },
    // *Metodo de pago
    [getpaymentmethods.pending]: (state, { payload }) => {
      state.paymentmethod.isFetching = true;
    },
    [getpaymentmethods.fulfilled]: (state, { payload }) => {
      state.paymentmethod.results = payload?.results;
      state.paymentmethod.count = payload?.count ? payload?.count : 0;
      state.paymentmethod.isFetching = false;
    },
    [getpaymentmethods.rejected]: (state, { payload }) => {
      state.paymentmethod.isFetching = false;
      state.paymentmethod.isError = false;
    },
    // *Regimen fiscal
    [gettaxregimens.pending]: (state, { payload }) => {
      state.taxregime.isFetching = true;
    },
    [gettaxregimens.fulfilled]: (state, { payload }) => {
      state.taxregime.results = payload?.results;
      state.taxregime.count = payload?.count ? payload?.count : 0;
      state.taxregime.isFetching = false;
    },
    [gettaxregimens.rejected]: (state, { payload }) => {
      state.taxregime.isFetching = false;
      state.taxregime.isError = false;
    },

    // *Cuenta de pago
    [getpaymentAccount.pending]: (state, { payload }) => {
      state.paymentsacount.isFetching = true;
    },
    [getpaymentAccount.fulfilled]: (state, { payload }) => {
      state.paymentsacount.results = payload?.results;
      state.paymentsacount.count = payload?.count ? payload?.count : 0;
      state.paymentsacount.isFetching = false;
    },
    [getpaymentAccount.rejected]: (state, { payload }) => {
      state.paymentsacount.isFetching = false;
      state.paymentsacount.isError = false;
    },
    // *Rejected orders Reasons
    [getDiscardReasonsOrders.pending]: (state, { payload }) => {
      state.discardreasonsOrders.isFetching = true;
    },
    [getDiscardReasonsOrders.fulfilled]: (state, { payload }) => {
      state.discardreasonsOrders.results = payload?.results;
      state.discardreasonsOrders.count = payload?.count ? payload?.count : 0;
      state.discardreasonsOrders.isFetching = false;
    },
    [getDiscardReasonsOrders.rejected]: (state, { payload }) => {
      state.discardreasonsOrders.isFetching = false;
      state.discardreasonsOrders.isError = false;
    },

    // *Tipos de envio orders
    [getshippingtypes.pending]: (state, { payload }) => {
      state.shippingtype.isFetching = true;
    },
    [getshippingtypes.fulfilled]: (state, { payload }) => {
      state.shippingtype.results = payload?.results;
      state.shippingtype.count = payload?.count ? payload?.count : 0;
      state.shippingtype.isFetching = false;
    },
    [getshippingtypes.rejected]: (state, { payload }) => {
      state.shippingtype.isFetching = false;
      state.shippingtype.isError = false;
    },
    // *estado de order
    [getOrdersStatus.pending]: (state, { payload }) => {
      state.orderstatus.isFetching = true;
    },
    [getOrdersStatus.fulfilled]: (state, { payload }) => {
      state.orderstatus.results = payload?.results;
      state.orderstatus.count = payload?.count ? payload?.count : 0;
      state.orderstatus.isFetching = false;
    },
    [getOrdersStatus.rejected]: (state, { payload }) => {
      state.orderstatus.isFetching = false;
      state.orderstatus.isError = false;
    },

    // * Rejected Reasons
    [getRejectedReasonsCommon.pending]: (state, { payload }) => {
      state.rejectedreasons.isFetching = true;
    },
    [getRejectedReasonsCommon.fulfilled]: (state, { payload }) => {
      state.rejectedreasons.results = payload?.results;
      state.rejectedreasons.count = payload?.count ? payload?.count : 0;
      state.rejectedreasons.isFetching = false;
    },
    [getRejectedReasonsCommon.rejected]: (state, { payload }) => {
      state.rejectedreasons.isFetching = false;
      state.rejectedreasons.isError = false;
    },

    // * Types sales
    [getTypeSales.pending]: (state, { payload }) => {
      state.typesSales.isFetching = true;
    },
    [getTypeSales.fulfilled]: (state, { payload }) => {
      state.typesSales.results = payload?.results;
      state.typesSales.count = payload?.count ? payload?.count : 0;
      state.typesSales.isFetching = false;
    },
    [getTypeSales.rejected]: (state, { payload }) => {
      state.typesSales.isFetching = false;
      state.typesSales.isError = false;
    },

    // * Templates WP
    [getTemplatesWp.pending]: (state, { payload }) => {
      state.templateswp.isFetching = true;
    },
    [getTemplatesWp.fulfilled]: (state, { payload }) => {
      state.templateswp.results = payload?.results;
      state.templateswp.count = payload?.count ? payload?.count : 0;
      state.templateswp.isFetching = false;
    },
    [getTemplatesWp.rejected]: (state, { payload }) => {
      state.templateswp.isFetching = false;
      state.templateswp.isError = false;
    },

    //conceptos
    [getConcepts.pending]: (state, { payload }) => {
      state.concepts.isFetching = true;
    },
    [getConcepts.fulfilled]: (state, { payload }) => {
      state.concepts.results = payload?.results;
      state.concepts.count = payload?.count ? payload?.count : 0;
      state.concepts.isFetching = false;
    },
    [getConcepts.rejected]: (state, { payload }) => {
      state.concepts.isFetching = false;
      state.concepts.isError = false;
    },

    //tipos de productos
    [getProductsTypes.pending]: (state, { payload }) => {
      state.productstypes.isFetching = true;
    },
    [getProductsTypes.fulfilled]: (state, { payload }) => {
      state.productstypes.results = payload?.results;
      state.productstypes.count = payload?.count ? payload?.count : 0;
      state.productstypes.isFetching = false;
    },
    [getProductsTypes.rejected]: (state, { payload }) => {
      state.productstypes.isFetching = false;
      state.productstypes.isError = false;
    },
    //tipos de marcas
    [getBrands.pending]: (state, { payload }) => {
      state.brands.isFetching = true;
    },
    [getBrands.fulfilled]: (state, { payload }) => {
      state.brands.results = payload?.results;
      state.brands.count = payload?.count ? payload?.count : 0;
      state.brands.isFetching = false;
    },
    [getBrands.rejected]: (state, { payload }) => {
      state.brands.isFetching = false;
      state.brands.isError = false;
    },

    //estatus almacen-ordenes
    [getWarehousesStatus.pending]: (state, { payload }) => {
      state.warehouses.isFetching = true;
    },
    [getWarehousesStatus.fulfilled]: (state, { payload }) => {
      state.warehouses.results = payload?.results;
      state.warehouses.count = payload?.count ? payload?.count : 0;
      state.warehouses.isFetching = false;
    },
    [getWarehousesStatus.rejected]: (state, { payload }) => {
      state.warehouses.isFetching = false;
      state.warehouses.isError = false;
    },
    //almacenes-ordenes
    [getWareHouses.pending]: (state, { payload }) => {
      state.warehouse.isFetching = true;
    },
    [getWareHouses.fulfilled]: (state, { payload }) => {
      state.warehouse.results = payload?.results;
      state.warehouse.count = payload?.count ? payload?.count : 0;
      state.warehouse.isFetching = false;
    },
    [getWareHouses.rejected]: (state, { payload }) => {
      state.warehouse.isFetching = false;
      state.warehouse.isError = false;
    },

    //tipo de impuesto
    [getTaxInformations.pending]: (state, { payload }) => {
      state.taxinformations.isFetching = true;
    },
    [getTaxInformations.fulfilled]: (state, { payload }) => {
      state.taxinformations.results = payload?.results;
      state.taxinformations.count = payload?.count ? payload?.count : 0;
      state.taxinformations.isFetching = false;
    },
    [getTaxInformations.rejected]: (state, { payload }) => {
      state.taxinformations.isFetching = false;
      state.taxinformations.isError = false;
    },

    //provedores
    [getProviders.pending]: (state, { payload }) => {
      state.providers.isFetching = true;
    },
    [getProviders.fulfilled]: (state, { payload }) => {
      state.providers.results = payload?.results;
      state.providers.count = payload?.count ? payload?.count : 0;
      state.providers.isFetching = false;
    },
    [getProviders.rejected]: (state, { payload }) => {
      state.providers.isFetching = false;
      state.providers.isError = false;
    },

    // * phases
    [getStatuspoo.pending]: (state, { payload }) => {
      state.statusOrders.isFetching = true;
    },
    [getStatuspoo.fulfilled]: (state, { payload }) => {
      state.statusOrders.results = payload?.results;
      state.statusOrders.count = payload?.count ? payload?.count : 0;
      state.statusOrders.isFetching = false;
    },
    [getStatuspoo.rejected]: (state, { payload }) => {
      state.statusOrders.isFetching = false;
      state.statusOrders.isError = false;
    },

    //  * drivers
    [getDrivers.pending]: (state, { payload }) => {
      state.drivers.isFetching = true;
    },
    [getDrivers.fulfilled]: (state, { payload }) => {
      state.drivers.isFetching = false;
      state.drivers.results = payload?.results;
      state.drivers.count = payload?.count ? payload?.count : 0;
    },
    [getDrivers.rejected]: (state, { payload }) => {
      state.drivers.isFetching = false;
      state.drivers.isError = false;
    },

    //  * transportunit
    [getTransportunits.pending]: (state, { payload }) => {
      state.transportunits.isFetching = true;
    },
    [getTransportunits.fulfilled]: (state, { payload }) => {
      state.transportunits.isFetching = false;
      state.transportunits.results = payload?.results;
      state.transportunits.count = payload?.count ? payload?.count : 0;
    },
    [getTransportunits.rejected]: (state, { payload }) => {
      state.transportunits.isFetching = false;
      state.transportunits.isError = false;
    },

    //  * order rejected reasons
    [getOrderRejectedReasons.pending]: (state, { payload }) => {
      state.orderrejected.isFetching = true;
    },
    [getOrderRejectedReasons.fulfilled]: (state, { payload }) => {
      state.orderrejected.isFetching = false;
      state.orderrejected.results = payload?.results;
      state.orderrejected.count = payload?.count ? payload?.count : 0;
    },
    [getOrderRejectedReasons.rejected]: (state, { payload }) => {
      state.orderrejected.isFetching = false;
      state.orderrejected.isError = false;
    },

    // * deliverytimes
    [getDeliveryTimes.pending]: (state, { payload }) => {
      state.deliverytimes.isFetching = true;
    },
    [getDeliveryTimes.fulfilled]: (state, { payload }) => {
      state.deliverytimes.isFetching = false;
      state.deliverytimes.results = payload?.results;
      state.deliverytimes.count = payload?.count ? payload?.count : 0;
    },
    [getDeliveryTimes.rejected]: (state, { payload }) => {
      state.deliverytimes.isFetching = false;
      state.deliverytimes.isError = false;
    },
    // * typesentries
    [getTypesEntries.pending]: (state, { payload }) => {
      state.typesentries.isFetching = true;
    },
    [getTypesEntries.fulfilled]: (state, { payload }) => {
      state.typesentries.isFetching = false;
      state.typesentries.results = payload?.results;
      state.typesentries.count = payload?.count ? payload?.count : 0;
    },
    [getTypesEntries.rejected]: (state, { payload }) => {
      state.typesentries.isFetching = false;
      state.typesentries.isError = false;
    },
    // * Notifications
    [getNotifications.pending]: (state, { payload }) => {
      state.notifications.isFetching = true;
    },
    [getNotifications.fulfilled]: (state, { payload }) => {
      state.notifications.isFetching = false;
      state.notifications.results = payload?.results;
      state.notifications.count = payload?.count ? payload?.count : 0;
      state.notifications.messageError = "";
      state.notifications.isSuccess = true;
      state.notifications.show = true;
    },
    [getNotifications.rejected]: (state, { paylaod }) => {
      state.notifications.isFetching = false;
      state.notifications.isError = true;
      state.notifications.isSuccess = false;
      state.notifications.messageError = paylaod;
    },
    [getOrderReturn.pending]: (state, { payload }) => {
      state.typereturns.isFetching = true;
    },
    [getOrderReturn.fulfilled]: (state, { payload }) => {
      state.typereturns.isFetching = false;
      state.typereturns.results = payload?.results;
      state.typereturns.count = payload?.count ? payload?.count : 0;
    },
    [getOrderReturn.rejected]: (state, { payload }) => {
      state.typereturns.isFetching = false;
      state.typereturns.isError = false;
    },
    [getReasonWarranties.pending]: (state, { payload }) => {
      state.reasonwarranties.isFetching = true;
    },
    [getReasonWarranties.fulfilled]: (state, { payload }) => {
      state.reasonwarranties.isFetching = false;
      state.reasonwarranties.results = payload?.results;
      state.reasonwarranties.count = payload?.count ? payload?.count : 0;
    },
    [getReasonWarranties.rejected]: (state, { payload }) => {
      state.reasonwarranties.isFetching = false;
      state.reasonwarranties.isError = false;
    },
  },
});

// export const { clearState, changeStatus } = commonSlice.actions;
export const {
  AddCommentToOrder,
  RemoveNotification,
  UpdateNotification,
  hideNotification,
  AddMultipleNotifications,
} = commonSlice.actions;

export const commonSelector = (state) => state.common;

// getRejectReasons "rejected"
// getDiscartReasons "reasons"
// getImportantReasons "important"
