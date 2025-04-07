import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TableGoalData from "../../organism/TableGoals";
import { userSelector } from "../../../../redux/slices/userSlice";
import { handleGlobalAlert, validateIncludes, validateJoins } from "../../../../utils";
import { api } from "../../../../services/api";
import PaginationWithText from "../../molecules/PaginationWithText";
import { Add, Cached, Delete, ErrorOutline, FilterList, Input, Search, Star } from "@material-ui/icons";
import { Button, Chip, CircularProgress, Dialog, Grid, IconButton, InputAdornment, TextField } from "@material-ui/core";
import Select from "react-select";
import MainLayout from "../../../MainLayout";
import {
  ConfirmDelete,
  FiltersDrawerGoals,
  FiltersStyle,
  InputSearch,
  MassDeleteStyle,
  MetasLayoutStyled,
} from "../../../../styles/Herramientas/metas.styled";
import { KeyboardDatePicker } from "@material-ui/pickers";
import dayjs, { Dayjs } from "dayjs";
import useModal from "../../../../hooks/useModal";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function ManagerGoals({ handleClickNewGoal }) {
  const dispatch = useDispatch();
  const { open: openMassDelete, toggleModal: toggleMassDelete, closeModal: closeMassDelete } = useModal();
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { getCatalogBy } = useGlobalCommons();
  const [goalsGroup, setGoalsGroup] = useState([]);
  const { users } = useSelector(commonSelector);
  const { id_user, groupId, companyId } = useSelector(userSelector);
  const [refetch, setRefetch] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  //Pagination
  const orderTableLimit = 30;
  const [orderCount, setOrderCount] = useState(0);
  const [orderTablePage, setOrderTablePage] = useState(1);
  //Component Filters
  const nameInLocalStorage = "goalFilters";
  const [drawerFilters, setDrawerFilters] = useState(JSON.parse(localStorage.getItem(nameInLocalStorage)));
  const [searchNameOrEmail, setSearchNameOrEmail] = useState();
  const [count, setCount] = useState(0);

  const [startDate, setStartDate] = useState(dayjs().startOf("month").format());
  const [finishDate, setFinishDate] = useState(dayjs().endOf("month").format());

  //Filtros
  const [filters, setFilters] = useState([]);
  const [filtersChips, setFiltersChips] = useState([]);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  //
  useEffect(() => {
    getDataLocalStorage();
    getCatalogBy("executives");
  }, []);
  //Data of the table
  useEffect(() => {
    if (users.isFetching) return;

    getGpoalsRequestManager();
  }, [refetch, orderTablePage, isReadyLocalStorage, users.isFetching]);
  //Aplica los filtros del componente <Filters>
  useEffect(() => {
    setOrderTablePage(1);
    getGpoalsRequestManager();
  }, [drawerFilters]);
  //When searchNameOrEmail is cleared, it reloads the table data <Filters>
  useEffect(() => {
    if (searchNameOrEmail == "") {
      getGpoalsRequestManager();
      setOrderTablePage(1);
    }
  }, [searchNameOrEmail]);

  const allTheIdOfTheExecutives = async () => {
    try {
      let norm = [];
      let params = {
        keys: "id",
        all: "1",
      };
      let res = await api.get("ejecutives", { params });
      res.data.results.map((item, index) => norm.push(item.id));
      setAllID(norm);

      console.log(norm);
    } catch (error) {
      setisLoading(false);
      handleGlobalAlert("error", " ¡Error al cargar metas refresca la página!", "basic", dispatch);
      console.log(error);
    }
  };

  //Filtros al Local Storage
  const getDataLocalStorage = () => {
    let filters = localStorage.getItem("filtersGoals_manager");
    if (filters) setFilters(JSON.parse(filters));
    setIsReadyLocalStorage(true);
  };
  const saveDataLocalStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));
  //

  //<Filters>
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  let typeinclude = {
    ejecutive: {
      include: "ejecutive,group,company,goal,goal.goaltype,goal.goalname",
      join: "ejecutive,2,3,goal,goal.goaltype,goal.goalname",
    },
    group: {
      include: "ejecutive,group,company,goal,goal.goaltype,goal.goalname",
      join: "1,group,3,goal,goal.goaltype,goal.goalname",
    },
  };

  //Get goals
  const getGpoalsRequestManager = async () => {
    if (!isReadyLocalStorage) return;
    try {
      let query = {};
      for (let i = 0; i < filters.length; i++) {
        if (filters[i].value) {
          if (!filters[i].inQuery) {
            query[filters[i].identifier] = filters[i].value;
          } else {
            if (!query[filters[i].inQuery]) query[filters[i].inQuery] = {};
            query[filters[i].inQuery][filters[i].identifier] = filters[i].value;
          }
        }
      }

      console.log(filters);

      // let normalizeExecutives = users.results.map(item => item.id);
      // if (!query.ejecutiveId) query.or = [{ groupId: groupId }, { ejecutiveId: normalizeExecutives }];

      query = {
        ...query,
        ejecutive: { groupId: groupId },
      };

      if (query.goal) {
        query.goal = {
          goaltypeId: "62dilssNQWT5RUcANZqAcDuZ",
          ...query.goal,
        };
      } else {
        query.goal = {
          goaltypeId: "62dilssNQWT5RUcANZqAcDuZ",
        };
      }

      if (query?.goal?.goaltypeId !== "62dilssNQWT5RUcANZqAcDuZ") {
        delete query.ejecutive;

        query = {
          ...query,
          group: {
            id: groupId,
          },
        };
      }

      console.log(query);

      setisLoading(true);

      let isIncludeEjecutive = query?.goal?.goaltypeId === "62dilssNQWT5RUcANZqAcDuZ";

      let params = {
        include: isIncludeEjecutive ? typeinclude.ejecutive.include : typeinclude.group.include,
        join: isIncludeEjecutive ? typeinclude.ejecutive.join : typeinclude.group.join,
        where: JSON.stringify(query),
        limit: orderTableLimit,
        count: "0",
        order: "-createdAt",
        skip: orderTablePage,
      };
      //Alica el filtro del drawer del componente <Filters>
      // params.where = { ...params.where, ...drawerFilters };
      // PENDIENTE
      // Aplica el filto de la barra del componente <Filters> (se ingresa a ejecutive)
      if (hasValue(searchNameOrEmail)) {
        params.where = {
          ...params.where,
          goal: { goalname: { name: { iRegexp: `${searchNameOrEmail.trim().toLocaleLowerCase()}` } } },
        };
      }

      let responseGoals = await api.get("ejecutivesgoals", { params });
      setGoalsGroup(responseGoals.data.results);
      setOrderCount(responseGoals.data?.count);
      setCount(responseGoals.data?.count);
      setFiltersChips(filters);
      saveDataLocalStorage("filtersGoals_manager", filters);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
      handleGlobalAlert("error", " ¡Error al cargar metas refresca la página!", "basic", dispatch);
    }
  };
  const handleOnChangeDate = (date, type) => {
    let newDate = dayjs(date).format();
    if (type === "start") {
      setStartDate(newDate);
      return;
    }
    setFinishDate(newDate);
  };

  const reloadData = () => setRefetch(!refetch);

  return (
    <MainLayout>
      <MetasLayoutStyled withbackground={true}>
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
              <div container={true} className="container_dates">
                <div className="filters_container">
                  <Filters
                    filters={filters}
                    setFilters={setFilters}
                    refetch={reloadData}
                    setFiltersChips={setFiltersChips}
                    filtersChips={filtersChips}
                    page={orderTablePage}
                    setPage={setOrderTablePage}
                    getCatalogBy={getCatalogBy}
                  />
                </div>
                {/* <Button
                  className="bt_delete"
                  size="small"
                  startIcon={<Delete />}
                  variant="contained"
                  color="secondary"
                  onClick={() => toggleMassDelete()}
                >
                  Eliminar por Periodo
                </Button> */}
              </div>
              <TableGoalData
                refetch={refetch}
                setRefetch={setRefetch}
                heads={["Responsable", "Tipo de meta", "Avance / Meta", "Periodo", "Metas", "Fecha De Creación"]}
                data={goalsGroup}
                setData={setGoalsGroup}
                secondaryColor="#dce1f6"
                primaryColor="#405189"
                isLoading={isLoading}
                alert={alert}
                setAlert={setAlert}
                totalgoals={count}
              />
              <PaginationWithText
                total={orderCount}
                actualPage={orderTablePage}
                setActualPage={setOrderTablePage}
                totalPages={Math.ceil(orderCount / orderTableLimit)}
                text={"Metas: "}
              />
              <MassDelete open={openMassDelete} close={closeMassDelete} reload={reloadData} />
            </div>
          </div>
        </div>
      </MetasLayoutStyled>
    </MainLayout>
  );
}

function Filters({ filters, setFilters, refetch, setFiltersChips, filtersChips, page, setPage, getCatalogBy }) {
  const { open: openFilters, toggleModal: toggleFilters, closeModal: closeFilters } = useModal();
  const { users, goalnames, goaltypes } = useSelector(commonSelector);

  const [typeDate, setTypeDate] = useState({});
  const [startDate, setStartDate] = useState("");
  const [finishDate, setFinishDate] = useState("");
  //Fechas para filtro de metas
  useEffect(() => {
    if (finishDate && startDate) {
      let labelChip = dayjs(startDate).format("DD-MM-YYYY") + " - " + dayjs(finishDate).format("DD-MM-YYYY");
      if (finishDate >= startDate) {
        let range = { between: [dayjs(startDate).format(), dayjs(finishDate).endOf("day").format()] };
        handleSelectFilter("filter_date", typeDate.identifier, range, typeDate.label, labelChip, null, null);
      } else {
        handleSelectFilter("filter_date", typeDate.identifier, null, typeDate.label, labelChip, null, null);
      }
    }
  }, [startDate, finishDate]);
  //

  const handleSelectFilter = (id, identifier, value, label, labelValue, inQuery) => {
    let copyFilters = [...filters];
    let newFilters = copyFilters.filter(filter => filter.id !== id);
    let filterBody = {
      id: id,
      identifier: identifier,
      value: value,
      label: label,
      labelValue: labelValue,
      inQuery: inQuery,
    };
    newFilters.push(filterBody);
    setFilters(newFilters);
  };
  const applyFilter = () => {
    closeFilters();
    refetch();
    setTypeDate({});
    if (page > 1) setPage(1);
  };
  const handleDeleteFilter = filter => {
    let deleteFilter = filters.filter(item => item.id !== filter.id);
    if (filter.id === "filter_date") setTypeDate({});
    setFiltersChips(deleteFilter);
    setFilters(deleteFilter);
    refetch();
  };

  return (
    <FiltersStyle>
      <div className="content_filtersGoals">
        <div className="buttons">
          <Button className="bt_filters" startIcon={<FilterList />} onClick={toggleFilters}>
            Filtros
          </Button>
        </div>
        <div className="filters_chips">
          {filtersChips.length > 0 &&
            filtersChips.map((item, index) => (
              <Chip
                key={index}
                className="chip_filter"
                size="small"
                label={`${item.label} : ${item.labelValue}`}
                onDelete={() => handleDeleteFilter(item)}
                color="primary"
              />
            ))}
        </div>
      </div>
      <FiltersDrawerGoals open={openFilters} onClose={closeFilters} anchor={"right"}>
        <div className="container_filters">
          <div className="container_filters__head">
            <p>Filtra por tu preferencia</p>
          </div>
          <div className="container_filters__body">
            <Grid container={true} className="filters" spacing={2}>
              <Grid item={true} md={12} className="item_filter">
                <p className="title_filter">Filtrar por Fecha</p>
                <Select
                  className="select_options"
                  placeholder="Seleccione una Opción"
                  noOptionsMessage={() => "Sin Opciones"}
                  options={optionsTypeDate}
                  onChange={e =>
                    setTypeDate({ ...typeDate, identifier: e.identifier, label: e.label, value: e.value, sync: null })
                  }
                />

                {typeDate.identifier !== undefined && (
                  <Select
                    className="select_options"
                    placeholder="Seleccione una Opción"
                    noOptionsMessage={() => "Sin Opciones"}
                    options={optionsDates}
                    getOptionLabel={option => option.labelValue}
                    getOptionValue={option => option.value}
                    value={optionsDates.filter(item => item.type === typeDate.sync)}
                    onChange={e => {
                      if (e.value !== "range") {
                        handleSelectFilter(
                          "filter_date",
                          typeDate.identifier,
                          e.value,
                          typeDate.label,
                          e.labelValue,
                          null,
                          null
                        );
                      }
                      setTypeDate({ ...typeDate, sync: e.type });
                    }}
                  />
                )}
                {typeDate.sync === "range" && (
                  <>
                    <div className="range_dates">
                      <div className="date_content">
                        <p className="title_date">Inicio de Rango</p>
                        <input className="date" type="date" onChange={e => setStartDate(e.target.value)} />
                      </div>
                      <div className="date_content">
                        <p className="title_date">Fin de Rango</p>
                        <input className="date" type="date" onChange={e => setFinishDate(e.target.value)} />
                      </div>
                    </div>
                    {startDate > finishDate && (
                      <div className="alert_range">
                        <ErrorOutline className="icon_alert" />
                        <p className="title_alert">La fecha de Fin debe ser Mayor a la de Inicio</p>
                      </div>
                    )}
                  </>
                )}
              </Grid>
              <Grid item={true} md={12} className="item_filter">
                <p className="title_filter">Filtrar por Ejecutivo</p>
                <Select
                  className="select_options"
                  placeholder="Seleccione una Opción"
                  noOptionsMessage={() => "Sin Opciones"}
                  options={users.results}
                  onMenuOpen={() => getCatalogBy("executives")}
                  loadingMessage={() => "Cargando Opciones..."}
                  isLoading={users.isFetching}
                  getOptionLabel={option => option.fullname}
                  getOptionValue={option => option.id}
                  onChange={e =>
                    handleSelectFilter("filter_executive", "ejecutiveId", e.id, "Ejecutivo: ", e.fullname, null)
                  }
                />
              </Grid>
              <Grid item={true} md={12} className="item_filter">
                <p className="title_filter">Filtrar por Meta</p>
                <Select
                  className="select_options"
                  placeholder="Seleccione una Opción"
                  noOptionsMessage={() => "Sin Opciones"}
                  onMenuOpen={() => getCatalogBy("goalnames")}
                  loadingMessage={() => "Cargando Opciones..."}
                  isLoading={goalnames.isFetching}
                  options={goalnames.results}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                  onChange={e => handleSelectFilter("filter_goalname", "goalnameId", e.id, "Meta: ", e.name, "goal")}
                />
              </Grid>
              <Grid item={true} md={12} className="item_filter">
                <p className="title_filter">Filtrar por Tipo de Meta</p>
                <Select
                  className="select_options"
                  placeholder="Seleccione una Opción"
                  noOptionsMessage={() => "Sin Opciones"}
                  onMenuOpen={() => getCatalogBy("goaltypes")}
                  loadingMessage={() => "Cargando Opciones..."}
                  isLoading={goaltypes.isFetching}
                  options={goaltypes.results}
                  getOptionLabel={option => option.name}
                  getOptionValue={option => option.id}
                  onChange={e =>
                    handleSelectFilter("filter_goaltype", "goaltypeId", e.id, "Tipo de Meta: ", e.name, "goal")
                  }
                />
              </Grid>
            </Grid>
          </div>
          <div className="container_filters__footer">
            <div className="buttons">
              <Button className="bt_cancel" onClick={closeFilters}>
                Cancelar
              </Button>
              <Button className="bt_apply" onClick={applyFilter}>
                Aplicar
              </Button>
            </div>
          </div>
        </div>
      </FiltersDrawerGoals>
    </FiltersStyle>
  );
}

function MassDelete({ open, close, reload }) {
  const { open: openConfirmDelete, toggleModal: toggleConfirmDelete, closeModal: closeConfirmDelete } = useModal();
  const dispatch = useDispatch();
  const [initialRange, setInitialRange] = useState("");
  const [endRange, setEndRange] = useState("");
  const [canDelete, setCanDelete] = useState("");
  const [typePeriod, setTypePeriod] = useState("");
  const [saveChanges, setSaveChanges] = useState(false);
  useEffect(() => {
    if (initialRange && endRange) {
      if (endRange >= initialRange) {
        setCanDelete(true);
      } else {
        setCanDelete(false);
      }
    } else {
      setCanDelete(false);
    }
  }, [initialRange, endRange]);

  const deleteMassisve = async () => {
    setSaveChanges(true);
    try {
      let initialDate = dayjs(initialRange).toJSON();
      let endDate = dayjs(endRange).endOf("day").toJSON();
      let query = { [typePeriod]: { between: [initialDate, endDate] } };
      let deleteMassiveResponse = await api.delete(
        `ejecutivesgoals/deletemassive/dates?where=${JSON.stringify(query)}`
      );
      handleGlobalAlert("success", "Metas Eliminadas Correctamente", "basic", dispatch, 6000);
      reload();
      close();
      closeConfirmDelete();
      setInitialRange("");
      setEndRange("");
      setTypePeriod("");
      setSaveChanges(false);
    } catch (error) {
      handleGlobalAlert("error", "Ocurrio un error al eliminar metas", "basic", dispatch, 6000);
      setSaveChanges(false);
      console.log(error);
    }
  };

  const applyChanges = () => {
    if (!typePeriod) return handleGlobalAlert("warning", "Valida el tipo de Periodo", "basic", dispatch, 6000);
    if (!canDelete)
      return handleGlobalAlert("warning", "Valida las fechas del rango a eliminar", "basic", dispatch, 6000);
    toggleConfirmDelete();
  };

  const handleTypePeriod = value => {
    let validateValue = value ? value.identifier : "";
    setTypePeriod(validateValue);
  };
  return (
    <MassDeleteStyle open={open} onClose={close} openconfirm={openConfirmDelete}>
      <div className="container_delete">
        <div className="container_delete__head">
          <p className="title_head" onClick={() => console.log("tipo periodo", typePeriod)}>
            Eliminación de Metas
          </p>
        </div>
        <div className="container_delete__body">
          <div className="form">
            <p className="title_form">Selecciona un rango a eliminar</p>
            <div className="type_period">
              <p className="title_type">Eliminar por</p>
              <Select
                className="select_period"
                placeholder="Selecciona Tipo de Periodo"
                options={optionsDeleteType}
                value={optionsDeleteType.filter(option => option.identifier === typePeriod)}
                noOptionsMessage={() => "Sin Opciones"}
                onChange={e => handleTypePeriod(e)}
                isClearable={true}
                styles={{
                  menu: base => ({ ...base, zIndex: 9999 }),
                  control: (base, state) => ({
                    ...base,
                    boxShadow: "none",
                    "&:hover": {
                      border: "1px solid grey",
                    },
                  }),
                }}
              />
            </div>
            <div className="dates">
              <div className="item_date">
                <p className="title_date">De</p>
                <input
                  className="input_date"
                  type="date"
                  value={initialRange}
                  onChange={e => setInitialRange(e.target.value)}
                />
              </div>
              <div className="item_date">
                <p className="title_date">Al</p>
                <input
                  className="input_date"
                  type="date"
                  value={endRange}
                  onChange={e => setEndRange(e.target.value)}
                />
              </div>
            </div>
            <div className="buttons">
              <Button className="bt_delete" onClick={applyChanges}>
                Eliminar
              </Button>
              <Button className="bt_cancel" onClick={close}>
                Cancelar
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="container_delete__footer"></div>
      <ConfirmDelete open={openConfirmDelete} onClose={closeConfirmDelete}>
        <div className="container_confirm">
          <div className="content_title">
            <p className="title" onClick={() => console.log("fechas", initialRange, endRange)}>
              <ErrorOutline className="icon_alert" />
              ¿Realmente quieres Eliminar las metas dentro del Rango?
            </p>
            <div className="buttons">
              {saveChanges ? (
                <CircularProgress size={30} />
              ) : (
                <>
                  <Button className="bt_accept" onClick={() => deleteMassisve()}>
                    Aceptar
                  </Button>
                  <Button className="bt_back" onClick={closeConfirmDelete}>
                    Cancelar
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </ConfirmDelete>
    </MassDeleteStyle>
  );
}

const optionsTypeDate = [
  {
    identifier: "createdAt",
    label: "Fecha de Creación",
    value: 1,
  },
  {
    identifier: "initialperiodate",
    label: "Fecha de Inicio de la Meta",
    value: 2,
  },
  {
    identifier: "finalperiodate",
    label: "Fecha de Fin del la Meta",
    value: 3,
  },
];

const optionsDates = [
  {
    type: "today",
    value: { between: [dayjs().startOf("day").format(), dayjs().endOf("day").format()] },
    labelValue: "Hoy",
  },
  {
    type: "week",
    value: { between: [dayjs().startOf("week").format(), dayjs().endOf("week").format()] },
    labelValue: "Semana",
  },
  {
    type: "month",
    value: { between: [dayjs().startOf("month").format(), dayjs().endOf("month").format()] },
    labelValue: "Mes",
  },
  {
    type: "range",
    value: "range",
    labelValue: "Rango",
  },
];

const optionsDeleteType = [
  {
    identifier: "createdAt",
    label: "Fecha de Creación",
    value: 1,
  },
  {
    identifier: "initialperiodate",
    label: "Fecha Inicial del Periodo",
    value: 2,
  },
];
