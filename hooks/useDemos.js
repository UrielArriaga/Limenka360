import { useEffect, useState } from "react";
import { api } from "../services/api";
import { normalizeTableDemos } from "../utils/normalizeData";
import dayjs from "dayjs";
import { handleAlert } from "../utils";
import { useRouter } from "next/router";

export default function useDemos() {
  const router = useRouter();
  const [keySearch, setKeySearch] = useState("");
  const [demos, setDemos] = useState({ results: [], count: 0 });
  const [refresh, setRefresh] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState(false);
  const [flag, setFlag] = useState(false);
  const [limit] = useState(10);
  const totalPages = Math.ceil(demos?.count / limit);
  const [page, setPage] = useState(1);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [open, setOpen] = useState(false);
  const [isfilterbyRange, setIsFilterbyRange] = useState();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filters, setFilters] = useState([]);
  const [chips, setChips] = useState([]);
  const [opendrawer, setOpendrawer] = useState(false);
  const [demoItem, setDemoItem] = useState();
  const [State, setState] = useState({ severity: null, show: null, message: "", type: null });
  const [city, setCity] = useState({
    isLoading: false,
    data: [],
  });
  const [statusDemo, setStatusDemo] = useState();
  console.log(".....", statusDemo);

  const [valueDate, setValueDate] = useState({
    identifier: null,
    label: null,
    query: null,
    typeDate: null,
    value: null,
  });

  useEffect(() => {
    getDemos();
    getLocalStorage();
    orderstatus();
  }, [refresh, flag, readyLocalStorage, page]);

  useEffect(() => {
    aplyRangeDate();
  }, [startDate, endDate]);

  const validateOrder = () => {
    if (orderBy === "createdAt" || orderBy === "assignedinstructor") {
      let todays = `${ASC ? "" : "-"}${orderBy}`;
      let today = todays;
      return today;
    }
  };

  const getDemos = async () => {
    if (readyLocalStorage == false) return;
    try {
      let query = {};
      let params = {
        include: "address,address.city,address.entity,address.postal,orderstatus",
        limit: limit,
        count: 1,
        order: validateOrder(),
        skip: page,
      };
      for (let i = 0; i < filters?.length; i++) {
        const { identifier, value } = filters[i];

        switch (identifier) {
          case "keySearch":
            if (/^([a-zA-ZñÑáéíóúÁÉÍÓÚ\s]+)*$/im.test(value.trim())) {
              query.assignedinstructor = `${value.trim()}`;
            } else if (/^\d+$/) {
              query.expensebudget = `${value.trim()}`;
            }
            break;
          case "createdAt":
          case "updatedAt":
          case "date":
            query[identifier] = value;
            break;
          case "entity":
            query.address = { entityId: value };
            break;
          case "city":
            query.address = { cityId: value };
            break;
          default:
            query[identifier] = value;
            break;
        }
      }
      setChips(filters);
      localStorage.setItem("filters-Demo", JSON.stringify(filters));
      setDemos({ ...demos, isFeching: true });
      let response = await api.get(`demosales?where=${JSON.stringify(query)}`, { params });

      let demos = normalizeTableDemos(response.data.results) || [];
      setDemos({ ...demos, results: demos, count: response.data.count, isFeching: false });
    } catch (error) {
      setDemos(prevState => ({ ...prevState, isFeching: false }));
    }
  };
  const orderstatus = async () => {
    try {
      let response = await api.get(`orderstatus`);
      let demo = response.data.results;
      console.log("ksdvasldv", demo);

      setStatusDemo(demo);
    } catch (error) {
      console.log(error);
    }
  };

  const DemoUptate = async item => {
    try {
      let data = {
        orderstatusId: statusDemo[0]?.id,
      };
      console.log("data",data);
      let response = await api.put(`demosales/${item.id}`,  data );
      console.log("ressssssss", response);
    } catch (error) {
      console.log(error);
    }
  };
  
  const Declined = async item =>{
    try {
      let data = {
        orderstatusId: statusDemo[1]?.id,
      };
      console.log("data",data);
      let response = await api.put(`demosales/${item.id}`,  data );
      console.log("ressssssss", response);
    } catch (error) {
      console.log(error);
    }
  }

  Declined

  const getLocalStorage = () => {
    let dataFilters = JSON.parse(localStorage.getItem("filters_demos"));
    dataFilters && setFilters(dataFilters);
    setReadyLocalStorage(true);
  };

  const handleDelete = e => {
    let deleteFilter = filters.filter(item => item.identifier != e.identifier);
    setFilters(deleteFilter);
    setKeySearch("");
    setRefresh(!refresh);
  };

  //**FUNCIONES DEL INPUT

  const handleKeySearch = string => setKeySearch(string);

  const handleKeyDown = e => {
    const { value } = e.target;
    if (e.key === "Enter") {
      if (value === " " || value === undefined || value === null) {
        return;
      } else {
        handleAddFilter({
          identifier: "keySearch",
          nameChip: value,
          nameChip: "Intructor",
          value: value,
          nameValue: value,
        });
        setFlag(!flag);
      }
    }
  };

  const handlePagination = (event, page) => setPage(page);

  const handleAddFilter = filter => {
    let copyFilters = [...filters];
    let searchFilter = copyFilters.filter(item => item.identifier !== filter.identifier);
    searchFilter.push(filter);
    setFilters(searchFilter);
    if (page > 1) setPage(1);
  };

  const handleRefresh = () => setRefresh(!refresh);

  //*Funcion de select tipo date

  const handleFilterTypeDate = value => {
    let date = { ...valueDate };
    date.identifier = value.value.split(".").pop();
    date.query = value.queryIdentifier;
    date.typeDate = value.label;

    setStartDate("");
    setEndDate("");
    setValueDate(date);
  };

  const handleFilterRangeDate = value => {
    let typeRange = { ...valueDate };
    if (value.id === "range") {
      typeRange.value = null;
      setIsFilterbyRange(value.id);
    } else {
      handleAddFilter({
        identifier: typeRange.identifier,
        nameChip: typeRange.typeDate,
        value: value.value,
        nameValue: value.label,
      });
    }
    setValueDate(typeRange);
  };

  const aplyRangeDate = () => {
    if (startDate && endDate) {
      const startDay = dayjs(startDate).format();
      const endDay = dayjs(endDate).endOf("day").format();
      if (endDay >= startDay) {
        handleAddFilter({
          identifier: valueDate?.identifier,
          nameChip: valueDate?.typeDate,
          value: { $gte: startDay, $lte: endDay },
          nameValue: `${dayjs(startDate).format("DD/MMM/YY")} - ${dayjs(endDate).format("DD/MMM/YY")}`,
        });
      } else {
        handleAlert("warning", "La fecha inicial es menor, intenta de nuevo", "basic", setState);
      }
    }
  };

  const applyFilters = () => {
    setFlag(!flag);
    setCity({ ...city, data: [], isLoading: true });
    setIsFilterbyRange("");
    setStartDate("");
    setEndDate("");
    setOpen(false);
  };
  //* Drawer Demo

  const handleClickName = (item, show) => {
    if (show) {
      setOpendrawer(true);
      setDemoItem(item);
    } else {
      router.push({
        pathname: "/demos/[demo]",
        query: {
          demo: item.itemBD.id,
        },
      });
    }
  };

  const routeNavigate = eve => {
    if (eve != undefined || eve != null) {
      router.push({
        pathname: "/demos/[demo]",
        query: {
          demo: eve.itemBD.id,
        },
      });
    } else {
      return;
    }
  };

  const closeDrawer = () => {
    setOpendrawer(false);
    setDemoItem(undefined);
  };

  return {
    keySearch,
    demos,
    headsDemo,
    orderBy,
    headsDemo,
    ASC,
    flag,
    totalPages,
    page,
    open,
    chips,
    city,
    isfilterbyRange,
    startDate,
    endDate,
    State,

    handleKeySearch,
    setOrderBy,
    setASC,
    setFlag,
    handlePagination,
    setOpen,
    applyFilters,
    handleDelete,
    handleAddFilter,
    handleKeyDown,
    setCity,
    handleRefresh,
    setStartDate,
    setEndDate,
    handleFilterTypeDate,
    handleFilterRangeDate,
    DemoUptate,
    Declined,
    opendrawer,
    handleClickName,
    closeDrawer,
    demoItem,
    routeNavigate,
  };
}

const headsDemo = [
  "id",
  "instructor",
  "viaticos",
  "estado*",
  "fecha estimada",
  "unidad asignada",
  "estado",
  "ciudad",
  "asentamiento",
  "calle",
];

const initialInQuery = {
  isclient: {
    id: null,
    name: null,
    type: "Clientes",
    show: false,
    identifier: "isclient",
  },
  originId: {
    id: null,
    name: null,
    type: "Origen",
    show: false,
    identifier: "originId",
  },
  categoryId: {
    id: null,
    name: null,
    type: "Categoria",
    show: false,
    identifier: "categoryId",
  },
  phaseId: {
    id: null,
    name: null,
    type: "Fase",
    show: false,
    identifier: "phaseId",
  },
  entityId: {
    id: null,
    name: null,
    type: "Estado",
    show: false,
    identifier: "entityId",
  },
  cityId: {
    id: null,
    name: null,
    type: "Ciudad",
    show: false,
    identifier: "cityId",
  },
  gender: {
    id: null,
    name: null,
    type: "Género",
    show: false,
    identifier: "gender",
  },
  clientTypeId: {
    id: null,
    name: null,
    type: "Tipo de cliente",
    show: false,
    identifier: "clientTypeId",
  },
  specialtyId: {
    id: null,
    name: null,
    type: "Especialidad",
    show: false,
    identifier: "specialtyId",
  },
  viewed: {
    id: null,
    name: null,
    type: "Vistos",
    show: false,
    identifier: "viewed",
  },
  clientCompanyId: {
    id: null,
    name: null,
    type: "Empresa",
    show: false,
    identifier: "clientCompanyId",
  },
  prospectslabels: {
    id: null,
    name: null,
    type: "Etiqueta",
    show: false,
    identifier: "prospectslabels",
  },
  ejecutiveId: {
    id: null,
    name: null,
    type: "Ejecutivo",
    show: false,
    identifier: "ejecutiveId",
  },
};

const initialQuery = {
  discarted: {
    id: null,
    name: null,
    type: "Descartados",
    show: false,
    identifier: "discarted",
  },

  rejected: {
    id: null,
    name: null,
    type: "Rechazadas",
    show: false,
    identifier: "rejected",
  },
  isimportant: {
    id: null,
    name: null,
    type: "Importantes",
    show: false,
    identifier: "isimportant",
  },
};
