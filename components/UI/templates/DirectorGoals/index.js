import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import { CommonFiltersContext } from "../../../../context/commonFiltersContext";
import TableGoalData from "../../organism/TableGoals";
import Filters from "../../../Filters";
import Chips from "../../../ChipsFilters";
import SearchBox from "../../../SearchBox";
import PaginationDirector from "../../molecules/PaginationTable";
import usePagination from "../../../../hooks/usePagination";
import DataOrder from "../../../DataOrder";
import { MetasLayoutStyled } from "../../../../styles/Herramientas/metas.styled";
import { Add, Cached, Star } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import DirectorLayout from "../../../../layouts/DirectorLayout";
export default function DirectorGoals({ handleClickNewGoal }) {
  const { managerOptionsGoals: options } = useContext(CommonFiltersContext);
  const { company } = useSelector(userSelector);
  const { page, setPage, limit, handlePage } = usePagination({ defaultLimit: 30, defaultPage: 1 });
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "", type: "query" });
  const [ASC, setASC] = useState("");
  const [order, setOrder] = useState("createdAt");
  const [goals, setGoals] = useState([]);
  const [count, setCount] = useState(0);

  const [filters, setFilters] = useState([]);
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [goalsCount, setGoalsCount] = useState(0);
  const handleRefetch = () => setRefetch(!refetch);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    getGoalsRequestManager();
  }, [refetch, page, isReadyLocalStorage, ASC, order]);

  const getLocalStorage = () => {
    let filtersDirectorGoals = localStorage.getItem("filtersDirectorGoals");
    let orderDirectorGoals = localStorage.getItem("orderDirectorGoals");
    if (filtersDirectorGoals) {
      let formatFilters = JSON.parse(filtersDirectorGoals);
      setFilters(formatFilters);
    }
    if (orderDirectorGoals) {
      let formatOrders = JSON.parse(orderDirectorGoals);
      let isDescendent = formatOrders.isDescendent ? "-" : "";
      setASC(isDescendent);
      setOrder(formatOrders.orderBy);
    }
    setIsReadyLocalStorage(true);
  };

  const validateFilters = () => {
    let query = {};
    query.goal = {
      companyId: company,
    };
    let queryFilters = filters?.filter(item => item.type === "query");
    for (let i = 0; i < queryFilters?.length; i++) {
      switch (queryFilters[i].id) {
        case "keySearch":
          let keySearch = queryFilters[i].value;
          if (keySearch) {
            query.goal = {
              alias: { iRegexp: `${keySearch.trim()}` },
            };
          }
          break;
        case "goalnameId":
          let goalId = queryFilters[i].value;
          if (goalId) {
            query.goal = {
              goalnameId: goalId,
            };
          }
          break;
        default:
          if (queryFilters[i].typeof === "date") {
            query[queryFilters[i].id] = {
              between: queryFilters[i].value,
            };
          } else {
            query[queryFilters[i].id] = queryFilters[i].value;
          }
          break;
      }
    }
    return JSON.stringify(query);
  };
  const validateOrder = () => {
    let objectOrderLocalStorage = {
      isDescendent: ASC ? true : false,
      orderBy: order,
    };
    localStorage.setItem("orderDirectorGoals", JSON.stringify(objectOrderLocalStorage));
    return `${ASC}${order}`;
  };

  const getGoalsRequestManager = async () => {
    if (isReadyLocalStorage === false) return;
    setisLoading(true);
    try {
      let params = {
        include: "ejecutive,group,company,goal,goal.goaltype,goal.goalname",
        join: "1,2,3,goal,goal.goaltype,goal.goalname",
        where: validateFilters(),
        limit: limit,
        count: 1,
        order: validateOrder(),
        skip: page,
      };
      let response = await api.get("ejecutivesgoals", { params });
      setGoals(response.data.results);
      setGoalsCount(response.data?.count);
      setCount(response.data?.count);
      saveInLocalStorage("filtersDirectorGoals", filters);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };
  const saveInLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return (
    <DirectorLayout>
      <MetasLayoutStyled withbackground={false}>
        <div className="main">
          <div className="main_content">
            <div className="main_content__top">
              <div className="title_count">
                <p className="title_goals">Metas</p>
                <p className="subtitle_goals">
                  <Star /> {count} Registros
                  <Cached className="reload" onClick={() => setRefetch(!refetch)} />
                </p>
              </div>
              <div className="actions">
                <Button variant="contained" className="btn_add" onClick={() => handleClickNewGoal()}>
                  <Add />
                  <p>Agregar Meta</p>
                </Button>
              </div>
            </div>
            <div className="main_content__table">
              <SearchBox
                value={valueToFind}
                setValue={setValueToFind}
                restorePage={restorePage}
                placeholder={"Ingresa Nombre de Meta"}
              />
              <div className="filters_container">
                <DataOrder
                  falling={ASC}
                  setFalling={setASC}
                  order={order}
                  setOrder={setOrder}
                  addOptions={[
                    { label: "Fecha Creación ", value: "createdAt" },
                    { label: "Inicio de Periodo ", value: "initialperiodate" },
                    { label: "Fin de Periodo ", value: "finalperiodate" },
                  ]}
                  addOptionsOrderBy={[
                    { label: "Descendente", value: "-" },
                    { label: "Ascendente ", value: "" },
                  ]}
                />
                <Filters
                  options={options.optionsFilters}
                  keySearchValue={valueToFind}
                  refetch={handleRefetch}
                  filters={filters}
                  setFilters={setFilters}
                  restorePage={restorePage}
                />
              </div>
              <Chips filters={filters} setFilters={setFilters} refetch={handleRefetch} />
              <TableGoalData
                refetch={refetch}
                setRefetch={setRefetch}
                heads={["Responsable", "Tipo de meta", "Avance / Meta", "Periodo", "Metas", "Fecha De Creación"]}
                data={goals}
                setData={setGoals}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                isLoading={isLoading}
                totalgoals={goalsCount}
              />
              {!isLoading && (
                <PaginationDirector
                  count={goalsCount}
                  limit={limit}
                  handlePage={handlePage}
                  page={page}
                  typeOfTitle={"metas"}
                />
              )}
            </div>
          </div>
        </div>
      </MetasLayoutStyled>
    </DirectorLayout>
  );
}
