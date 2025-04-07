import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableGoalData from "../../organism/TableGoals";
import { userSelector } from "../../../../redux/slices/userSlice";
import { formatNumber, handleGlobalAlert, validateIncludes, validateJoins } from "../../../../utils";
import { api } from "../../../../services/api";
import PaginationWithText from "../../molecules/PaginationWithText";
import Filters from "../../organism/Filters";
import { MetasLayoutStyled } from "../../../../styles/Herramientas/metas.styled";
import { Add, Cached, Star } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import MainLayout from "../../../MainLayout";
export default function EjecutiveGoals({ handleClickNewGoal }) {
  const dispatch = useDispatch();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [goalsGroup, setGoalsGroup] = useState([]);
  const { id_user, groupId } = useSelector(userSelector);
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  //Pagination
  const orderTableLimit = 20;
  const [orderCount, setOrderCount] = useState(0);
  const [orderTablePage, setOrderTablePage] = useState(1);
  //Component Filters
  const [drawerFilters, setDrawerFilters] = useState();
  const [searchNameOrEmail, setSearchNameOrEmail] = useState();
  const [count, setCount] = useState(0);

  useEffect(() => {
    getGoalsEjecutive();
  }, [refetch, orderTablePage]);
  //Aplica los filtros del componente <Filters>
  useEffect(() => {
    setOrderTablePage(1);
    getGoalsEjecutive();
  }, [drawerFilters]);
  //When searchNameOrEmail is cleared, it reloads the table data <Filters>
  useEffect(() => {
    if (searchNameOrEmail == "") {
      getGoalsEjecutive();
    }
  }, [searchNameOrEmail]);
  //<Filters>
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);
  //Get goals
  const getGoalsEjecutive = async () => {
    try {
      setisLoading(true);
      let params = {
        include: validateIncludes({}),
        join: validateJoins({}),
        where: { or: [{ groupId: groupId }, { ejecutiveId: id_user }] },
        limit: orderTableLimit,
        count: "0",
        order: "-createdAt",
        skip: orderTablePage,
      };
      //Alica el filtro del drawer del componente <Filters>
      params.where = { ...params.where, ...drawerFilters };
      // PENDIENTE
      // Aplica el filto de la barra del componente <Filters> (se ingresa a ejecutive)
      if (hasValue(searchNameOrEmail)) {
        params.where = {
          ...params.where,
          goal: { goaltype: { name: { iRegexp: searchNameOrEmail } } },
        };
      }
      if (searchNameOrEmail) {
        console.log("-Valor de params: ", params);
      }
      let responseGoals = await api.get("ejecutivesgoals", { params });
      setGoalsGroup(responseGoals.data.results);
      setOrderCount(responseGoals.data?.count);
      setCount(responseGoals.data?.count);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
      handleGlobalAlert("error", " ¡Error al cargar metas refresca la página!", "basic", dispatch);
    }
  };

  return (
    <MainLayout>
      <MetasLayoutStyled withbackground={true}>
        <div className="main">
          <div className="main_content">
            <div className="main_content__top">
              <div className="title_count">
                <p className="title_goals" onClick={() => console.log("rol", roleId)}>
                  Metas
                </p>
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
              <Filters
                getData={getGoalsEjecutive}
                orderTablePage={orderTablePage}
                setOrderTablePage={setOrderTablePage}
                drawerFilters={drawerFilters}
                setDrawerFilters={setDrawerFilters}
                searchNameOrEmail={searchNameOrEmail}
                setSearchNameOrEmail={setSearchNameOrEmail}
                placeholder={"Tipo de meta"}
                activeFilters={{ date: true, ejecutive: true }}
              />
              <TableGoalData
                refetch={refetch}
                setRefetch={setRefetch}
                heads={["Responsable", "Tipo de meta", "Avance / Meta", "Periodo", "Metas", "Fecha De Creación"]}
                data={goalsGroup}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                isLoading={isLoading}
                alert={alert}
                setAlert={setAlert}
              />
              <PaginationWithText
                total={orderCount}
                actualPage={orderTablePage}
                setActualPage={setOrderTablePage}
                totalPages={Math.ceil(orderCount / orderTableLimit)}
                text={"Metas: "}
              />
            </div>
          </div>
        </div>
      </MetasLayoutStyled>
    </MainLayout>
  );
}
