import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../services/api";

// Thunk para hacer el POST a "tracking"
export const postTracking = createAsyncThunk("tracking/postTracking", async (payload, thunkAPI) => {
  try {
    const response = await api.post("trackings/type", payload);
    return response.data;
  } catch (error) {
    console.error(error);
    return thunkAPI.rejectWithValue(error.response?.data || "Error desconocido");
  }
});

// Slice para el manejo de "tracking"
export const trackingSlice = createSlice({
  name: "tracking",
  initialState: {
    data: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    // Reducer para reiniciar el estado
    resetTrackingState: state => {
      state.data = null;
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    // Reducer para manejar manualmente el estado de error
    setTrackingError: (state, action) => {
      state.error = action.payload;
    },
    // Reducer para establecer manualmente el estado de éxito
    setTrackingSuccess: (state, action) => {
      state.success = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(postTracking.pending, state => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(postTracking.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.loading = false;
        state.success = true;
      })
      .addCase(postTracking.rejected, (state, { payload }) => {
        state.error = payload;
        state.loading = false;
        state.success = false;
      });
  },
});

// Exportación de las acciones de los reducers
export const { resetTrackingState, setTrackingError, setTrackingSuccess } = trackingSlice.actions;

// Selectores
export const trackingSelector = state => state.tracking;

export default trackingSlice.reducer;
