import { IconButton } from "@material-ui/core";
import { Close, Filter, FilterList } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { motion } from "framer-motion";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { setEjecutiveSelectedG } from "../../../../redux/slices/dashboardManager";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import DashboardTableCustomers from "../../organism/DashboardTableCustomers";
import { EntitiesLocal } from "../../../../BD/databd";

const SectionCustomerss = ({ startDate, finishDate }) => {
  const dispatch = useDispatch();

  const [showFilters, setShowFilters] = useState(false);
  const [executives, setExecutives] = useState([]);
  const { clientTypes, specialties } = useSelector(commonSelector);

  const [customers, setCustomers] = useState([]);
  const [clients, setClients] = useState([]);
  const [entities, setEntities] = useState([]);
  const [specialitie, setEspecialitie] = useState([]);
  const [cB, setCB] = useState("");
  const [filterEspecialities, setFilterEspecialities] = useState("");
  const [filterEntities, setFilterEntities] = useState("");

  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchBy, setSearchBy] = useState("byespecialities");
  const { groupId } = useSelector(userSelector);
  const [page, setPage] = useState(1);
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    if (searchBy === "bysales") {
      requestCustomers();
    }
    if (searchBy === "byclientypes") {
      requestClientTypes();
    }

    if (searchBy === "byespecialities") {
      requestEspecialities();
    }

    if (searchBy === "byEntitie") {
      requestEntities();
    }
  }, [page, startDate, finishDate, cB, readyLocalStorage, filterEspecialities, searchBy, filterEntities]);

  useEffect(() => {
    getLocalStorage();
    handleRequest(searchBy);
  }, [searchBy]);

  const saveDataLocalStorage = (value, type, key) => {
    switch (type) {
      case "query":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      case "especialitie":
        localStorage.setItem(key, JSON.stringify(value));
        setFlag(!flag);
        break;

      case "entitie":
        localStorage.setItem(key, JSON.stringify(value));
        setFlag(!flag);
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const getLocalStorage = () => {
    let query = localStorage.getItem("m_query");
    if (query) {
      setCB(JSON.parse(query));
    }

    let especialitie = localStorage.getItem("e_query");
    if (especialitie) {
      setFilterEspecialities(JSON.parse(especialitie));
    }

    let entity = localStorage.getItem("en_query");
    if (entity) {
      setFilterEntities(JSON.parse(entity));
    }

    setReadyLocalStorage(true);
  };

  const requestCustomers = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.oportunity = {};
      query.oportunity.soldat = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.oportunity.iscloseout = true;
      query.groupId = groupId;

      let params = {
        limit: 5,
        include: "prospect",
        // order: "-totalAmount",
        count: 1,
        skip: page,
        // where: JSON.stringify(query),
      };
      let res = await api.get("oportunities", { params });

      setCustomers(res.data.results);
      setIsLoading(false);

      if (res.data?.results?.length > 0 && page == 1) {
        dispatch(setEjecutiveSelectedG({ item: res.data.results[0] }));
      }
    } catch (error) {}
  };

  const requestExecutives = async () => {
    try {
      setIsLoading(true);
      let query = {};
      query.oportunity = {};
      query.oportunity.soldat = {
        $gte: startDate,
        $lte: finishDate,
      };
      query.oportunity.iscloseout = true;
      query.groupId = groupId;

      let params = {
        limit: 5,
        order: "-totalAmount",
        count: 1,
        skip: page,
        where: JSON.stringify(query),
      };
      let res = await api.get("dashboard/ejecutivesamount", { params });

      setData(res.data.results, res.data?.count);
      if (res.data?.results?.length > 0 && page == 1) {
        dispatch(setEjecutiveSelectedG({ item: res.data.results[0] }));
      }
    } catch (error) {}
  };

  const requestClientTypes = async () => {
    if (readyLocalStorage === false) return;
    try {
      setIsLoading(true);
      let query = {};
      query.discarted = false;
      query.isclient = true;
      query.ejecutive = { groupId: groupId };

      if (cB !== "") {
        query.clientTypeId = cB;
      } else {
        delete query.clientTypeId;
      }

      let params = {
        limit: 5,
        count: 1,
        skip: page,
        where: JSON.stringify(query),
        include: "ejecutive,clienttype",
        join: "ejecutive,clienttype",
        subquery: "2",
      };
      let res = await api.get("prospects", { params });

      setDataClientType(res.data.results, res.data?.count);
      saveDataLocalStorage(cB, "query", "m_query");
      setIsLoading(false);
      setFlag(!flag);
    } catch (error) {}
  };

  const requestEspecialities = async () => {
    if (readyLocalStorage === false) return;
    try {
      setIsLoading(true);
      let query = {};
      query.discarted = false;
      query.isclient = true;
      query.ejecutive = { groupId: groupId };

      if (filterEspecialities !== "") {
        query.specialtyId = filterEspecialities;
      } else {
        delete query.specialtyId;
      }

      let params = {
        limit: 5,
        count: 1,
        skip: page,
        where: JSON.stringify(query),
        include: "ejecutive,specialty",
        join: "ejecutive,specialy",
        subquery: "2",
      };
      let res = await api.get("prospects", { params });
      setDataEspecialities(res.data.results, res.data?.count);
      saveDataLocalStorage(filterEspecialities, "especialitie", "e_query");
      setIsLoading(false);
      setFlag(!flag);
    } catch (error) {}
  };

  const requestEntities = async () => {
    if (readyLocalStorage === false) return;
    try {
      setIsLoading(true);
      let query = {};
      query.discarted = false;
      query.isclient = true;
      query.ejecutive = { groupId: groupId };

      if (filterEntities !== "") {
        query.entityId = filterEntities;
      } else {
        delete query.entityId;
      }

      let params = {
        limit: 5,
        count: 1,
        skip: page,
        where: JSON.stringify(query),
        include: "ejecutive,entity",
        join: "ejecutive,entity",
        subquery: "2",
      };
      let res = await api.get("prospects", { params });
      setDataEntities(res.data.results, res.data?.count);
      saveDataLocalStorage(filterEntities, "entitie", "en_query");
      setIsLoading(false);
      setFlag(!flag);
    } catch (error) {}
  };

  const setData = (array, total) => {
    setExecutives(array);
    setCount(total);
    setIsLoading(false);
  };

  const setDataClientType = (array, total) => {
    setClients(array);
    setCount(total);
    setIsLoading(false);
  };

  const setDataEspecialities = (array, total) => {
    setEspecialitie(array);
    setCount(total);
    setIsLoading(false);
  };

  const setDataEntities = (array, total) => {
    setEntities(array);
    setCount(total);
    setIsLoading(false);
  };

  const handleFilterClientsType = e => {
    setCB(e.target.value);
    setFlag(!flag);
    setPage(1);
  };

  const handleFilterEspecialities = e => {
    setFilterEspecialities(e.target.value);
    setFlag(!flag);
    setPage(1);
  };

  const handleFilterEntities = e => {
    setFilterEntities(e.target.value);
    setFlag(!flag);
    setPage(1);
  };

  const handleRequest = value => {
    switch (value) {
      case "bysales":
        requestExecutives();
        break;
      case "byclientypes":
        requestClientTypes();
        break;
      case "byespecialities":
        requestEspecialities();
        break;
      case "byEntitie":
        requestEntities();
        break;
    }
  };

  // * Handlers
  const handleClickFilter = value => {
    setShowFilters(value);
  };

  const handleOnChangeSelect = e => {
    setSearchBy(e.target.value);
    setPage(1);
    handleRequest(e.target.value);
  };

  const handleClickPage = value => {
    // console.log(value);
    setPage(value);
  };
  return (
    <EjecutiveComponent>
      <div className="container">
        <div className="container__top">
          <h3>Clientes</h3>

          <div className="filter">
            <FiltersContainer
              animate={{
                width: showFilters ? "auto" : 0,
                overflow: "hidden",
              }}
            >
              <select name="" id="" onChange={e => handleOnChangeSelect(e)}>
                {optionsExecutives.map((item, index) => (
                  <option key={item.value} defaultValue={searchBy} value={item.value}>
                    {item.name}
                  </option>
                ))}
              </select>

              {searchBy === "byclientypes" ? (
                <div>
                  <select name="" id="" value={cB} onChange={e => handleFilterClientsType(e)}>
                    <option value={""} onClick={() => setCB("")}>
                      Todos los clientes
                    </option>

                    {clientTypes.results.map((item, index) => (
                      <option key={item.id} defaultValue={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                " "
              )}

              {searchBy === "byespecialities" ? (
                <div>
                  <select name="" id="" value={filterEspecialities} onChange={e => handleFilterEspecialities(e)}>
                    <option value={""} onClick={() => setFilterEspecialities("")}>
                      Todos las Especialidades
                    </option>

                    {specialties.results.map((item, index) => (
                      <option key={item.id} defaultValue={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                " "
              )}

              {searchBy === "byEntitie" ? (
                <div>
                  <select name="" id="" value={filterEntities} onChange={e => handleFilterEntities(e)}>
                    <option value={""} onClick={() => setFilterEntities("")}>
                      Todos los estados
                    </option>

                    {EntitiesLocal.map((item, index) => (
                      <option key={item.id} defaultValue={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                " "
              )}
            </FiltersContainer>

            {showFilters && (
              <IconButton className="active">
                <Close className="icon_filter " onClick={() => handleClickFilter(false)} />
              </IconButton>
            )}

            {!showFilters && <FilterList className="icon_filter " onClick={() => handleClickFilter(true)} />}
          </div>
        </div>

        <div>
          <DashboardTableCustomers
            isLoading={isLoading}
            type={searchBy}
            data={customers}
            clients={clients}
            specialitie={specialitie}
            entities={entities}
            heads={returnHeads(searchBy)}
            secondaryColor="#dce1f6"
            primaryColor="#405189"
          />
        </div>

        <div className="pagination">
          <div className="total">Total {count}</div>

          <div className="pages">
            <Pagination
              shape="rounded"
              onChange={(e, value) => handleClickPage(value)}
              count={Math.ceil(count / 5)}
              page={page}
              size="small"
              color="primary"
            />
          </div>
        </div>
      </div>
      {/* <button onClick={() => requestPayments()}>click </button> */}
    </EjecutiveComponent>
  );
};

const returnHeads = key => {
  switch (key) {
    case "bysales":
      return ["Nombre", "Correo", "Monto de Ventas"];
    case "bygoals":
      return ["Nombre", "Avance", "Porcentaje"];
    case "byclientypes":
      return ["Nombre", "Tipo de Cliente", "Número", "Correo"];

    case "byespecialities":
      return ["Nombre", "Especialidad", "Número", "Correo"];

    case "byEntitie":
      return ["Nombre", "Estado", "Número", "Correo"];
    default:
      break;
  }
};

const EjecutiveComponent = styled.div`
  background-color: #eeeeee;
  padding: 10px 10px 10px 10px;
  border-radius: 8px;
  min-height: 380px;
  .container {
    &__top {
      display: flex;
      justify-content: space-between;
    }
    &__top .filter {
      display: flex;
      align-items: center;
      svg {
        cursor: pointer;
      }

      .active {
        background-color: #407aff;
        padding: 4px;
        margin-bottom: 5px;
        color: #fff;
      }
    }
  }

  .container .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    height: 100%;
  }
`;

const FiltersContainer = styled(motion.div)`
  display: flex;
  select {
    border: none;
    height: 30px;
    width: 200px;
    background-color: #ffff;
    border-radius: 2px;
    padding-left: 10px;
    margin-right: 4px;
    margin-bottom: 8px;
    /* border: 2px solid #cfd8dc; */
    background-color: #ffff;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    &:focus {
      outline: 1px solid green;
    }
  }
  /* .icon_filter {
    transition: all 1s ease-in-out;
  } */
`;

export default SectionCustomerss;

const optionsExecutives = [
  {
    value: "byespecialities",
    name: "Por Especialidad",
  },
  {
    value: "byclientypes",
    name: "Por Tipo de cliente",
  },

  {
    value: "byEntitie",
    name: "Por Estado",
  },
  {
    value: "bysales",
    name: "Por Monto de ventas",
  },

  // {
  //   value: "bygoals",
  //   name: "Por Metas",
  // },
];
