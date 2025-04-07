import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const DEFAULT_HEADERS = [
  { value: "default", name: "Selecciona la columna" },
  { value: "hidecolumn", name: "Ocultar columna" },
  { value: "name", name: "Nombre" },
  { value: "email", name: "Correo" },
  { value: "phone", name: "Telefono" },
  { value: "clientTypeId", name: "Tipo de Cliente" },
  { value: "product", name: "Producto" },
  { value: "observations", name: "Comentarios" },
  { value: "channelId", name: "Canal" },
  { value: "originId", name: "Origen" },
  { value: "campaign", name: "Campaña" },
  { value: "entityId", name: "Estado" },
  { value: "date", name: "Fecha" },
  { value: "categoryId", name: "Categoria" },
  { value: "ejecutiveId", name: "Ejecutivo" },
  { value: "createdAt", name: "Fecha de entrada" },
];

export const fillExecutivesToImport = createAsyncThunk("executivesimport/fill", async (payload, thunkAPI) => {
  try {
    let responseExecutives = await api.get(`ejecutives?where=${JSON.stringify(query)}&order=name&count=1?&all=1`);
    let data = responseExecutives.data;
    if (responseExecutives.status === 200) {
      return data;
    } else {
      thunkAPI.rejectWithValue({ bane });
    }
  } catch (error) {
    thunkAPI.rejectWithValue(error.data);
  }
});

export const importsSlice = createSlice({
  name: "imports",
  initialState: {
    heads: [],
    head_default: DEFAULT_HEADERS,
    prospects: [],
    prospectsToSave: [],
    prospectsToSaveBackup: [],
    selected: [],
    showexecutives: false,
    isFetchingExecutives: true,
    isErrorExecutives: false,
    isSucessExecutives: false,
    executives: [],
    totalExecutives: 0,
  },

  reducers: {
    setHeadsImports: (state, action) => {
      state.heads = action.payload;
    },

    setProspectsImports: (state, action) => {
      state.prospects = action.payload;
    },

    saveProspectBackup: (state, action) => {
      state.prospectsToSaveBackup = action.payload;
    },

    setProspectsToSave: (state, action) => {
      state.prospectsToSave = action.payload;
    },

    selectAll: (state, action) => {
      state.selected = action.payload;
    },

    toogleExecutives: (state, action) => {
      state.showexecutives = action.payload;
    },

    changePropertyValue: (state, { payload }) => {
      const { position, property, childProperty, value } = payload;

      // console.log(position);

      // console.log(property);

      // console.log(childProperty);
      // console.log(state.prospects[position]);

      state.prospects[position][property][childProperty] = value;

      return;
      // state.prospects[0]["categoryId"]["errorSintaxis"] = true;
      return;
      // let newProspects = state.prospects.map((item,index) => ({

      //   state.prospectsTemp[0]["category"]["errorSintaxis"] = true;

      // }))
    },

    changePropertyValueBackup: (state, { payload }) => {
      const { position, property, childProperty, value } = payload;

      console.log(payload);

      // console.log(position);

      // console.log(property);

      // console.log(childProperty);
      // console.log(state.prospects[position]);

      state.prospectsToSaveBackup[position][property][childProperty] = value;

      return;
      // state.prospects[0]["categoryId"]["errorSintaxis"] = true;
      return;
      // let newProspects = state.prospects.map((item,index) => ({

      //   state.prospectsTemp[0]["category"]["errorSintaxis"] = true;

      // }))
    },

    changeGroupProspect: (state, { payload }) => {
      let newProspects = state.prospects.map((item, index) => {
        let itemProspect = item;
        if (item.email.value === payload.prospect.email.value) {
          itemProspect.groupId = {
            disabled: false,
            type: "groupId",
            value: payload.value,
          };
          return itemProspect;
        } else {
          return itemProspect;
        }
      });
      state.prospectsToSave = newProspects;
    },

    changeExecutive: (state, action) => {
      let mutationProspect = state.prospects.map((item, index) => {
        let itemPerMut = item;
        if (item.email.value === action.payload.prospect.email.value) {
          // itemPerMut.ejecutiveId = {
          //   disabled: false,
          //   type: "id",
          //   value: action.payload.value,
          // };
          itemPerMut.ejecutiveId = {
            disabled: false,
            type: "id",
            value: action.payload.value,
          };
          return itemPerMut;
        } else {
          return item;
        }
      });

      console.log(mutationProspect);

      state.prospectsToSave = mutationProspect;
    },

    deleteValue: (state, { payload }) => {
      state.prospects.splice(payload.index, 1);
    },

    orderExecutives: (state, action) => {
      let otroocunt = -1;
      for (let i = 0; i < state.prospects.length; i++) {
        if (otroocunt === action.payload.executives.length - 1) {
          otroocunt = 0;
        } else {
          otroocunt += 1;
        }

        state.prospects[i].ejecutiveId = {
          value: action.payload.executives[otroocunt].id,
          disabled: false,
          rulated: true,
          info: action.payload.executives[otroocunt],
          type: "id",
        };
        if (state.prospectsToSave.length >= 1) {
          state.prospectsToSave[i].ejecutiveId = action.payload.executives[otroocunt].id;
        }
      }
    },
  },
  extraReducers: {
    [fillExecutivesToImport.fulfilled]: (state, { payload }) => {
      state.executives = payload.results;
      state.isErrorExecutives = false;
      state.isSucessExecutives = true;
      state.isFetchingExecutives = false;
      state.totalExecutives = payload.count;
    },

    [fillExecutivesToImport.rejected]: (state, { payload }) => {},
  },
});

export const {
  changePropertyValue,
  orderExecutives,
  changeExecutive,
  changeGroupProspect,
  setProspectsToSave,
  saveProspectBackup,
  setProspectsImports,
  setHeadsImports,
  selectAll,
  toogleExecutives,
  changePropertyValueBackup,
  deleteValue,
} = importsSlice.actions;
export const useImportsSlice = state => state.imports;

export default importsSlice.reducer;
// export const useExecutives = (state) => state.executives;
