import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";
import { Pagination } from "@material-ui/lab";
import Select from "react-select";
import { DrawerContainer, ProspectosStyled } from "../../../../styles/Propectos";
import { toUpperCaseChart } from "../../../../utils";
import { EntitiesLocal } from "../../../../BD/databd";
import DrawerEditProspect from "../../../EditProspect";
import { useForm } from "react-hook-form";
import { normalizeTableRecepcion } from "../../../../utils/normalizeData";
import TableCustom from "../../../TableCustom";
import {
  Button,
  LinearProgress,
  TextField,
  Chip,
  Tooltip,
  Badge,
  Grid,
  Box,
  Switch,
  withStyles,
  Collapse,
} from "@material-ui/core";
import { Add, FilterList, Close, People, SearchOutlined, Cached } from "@material-ui/icons";
import dayjs from "dayjs";
import { colors } from "../../../../styles/global.styles";
import { userSelector } from "../../../../redux/slices/userSlice";
import { api } from "../../../../services/api";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { dashboardViewExecutiveSelector } from "../../../../redux/slices/dashboardViewExecutiveSlice";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function ProspectosRecepcion({ from }) {
  const router = useRouter();
  const { getCatalogBy } = useGlobalCommons();
  const { id_user } = useSelector(userSelector);
  const { id_executive } = useSelector(dashboardViewExecutiveSelector);
  const [prospectsNew, setProspectsNew] = useState(0);
  const [isLoading, setisLoading] = useState(true);
  const [statusSearch, setStatusSearch] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChips(!showChips);
  };
  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [prospectsTable, setProspectsTable] = useState([]);
  const [Alert, setAlert] = useState({
    severity: null,
    show: null,
    message: "",
    type: null,
  });
  const [page, setPage] = useState(1);
  const [totalProspects, setTotalProspects] = useState(0);
  const [flag, setFlag] = useState(false);
  const [queryNew, setQueryNew] = useState(initialQuery);
  const [citiesByEntity, setCitiesByEntity] = useState(null);
  const [filterDate, setFilterDate] = useState({
    applyFilter: false,
    identifier: "",
    label: "",
    filterby: "",
    value: "",
  });
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [ejecutive, setEjecutive] = useState("");
  const [loadCities, setLoadCities] = useState(false);
  const [showChips, setShowChips] = useState(false);
  const limit = 30;
  const [readyLocalStorage, setReadyLocalStorage] = useState(false);
  const { phases, categories, origins, clientTypes, specialties, channels, clientsCompanies } =
    useSelector(commonSelector);
  const [showed, setShowed] = useState([]);
  const [filterTracking, setFilterTracking] = useState(false);

  const {
    setValue,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProspectv2();
    setisLoading(true);
  }, [id_user, page, flag, orderby, ASC, readyLocalStorage]);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    if (dateFinish && dateStart) {
      if (dateFinish >= dateStart) {
        setFilterDate({
          ...filterDate,
          value: [dayjs(dateStart).format(), dayjs(dateFinish).endOf("day").format()],
          applyFilter: true,
        });
      } else {
        setFilterDate({ ...filterDate, value: null, applyFilter: false });
      }
    }
  }, [dateStart, dateFinish]);

  const navigateCreateNew = () => router.push("/recepcion/nuevo");

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const getLocalStorage = () => {
    // const localStorageVariables = {
    //   p_keyord: {
    //     stateVariable: setSearchKey,
    //   },
    //   p_query: {
    //     stateVariable: setQueryNew,
    //     additionalAction: () => setShowChips(true),
    //   },
    //   p_order: {
    //     stateVariable: setOrderby,
    //     parse: JSON.parse,
    //   },
    //   p_asc: {
    //     stateVariable: setASC,
    //     parse: JSON.parse,
    //   },
    //   p_filterDate: {
    //     stateVariable: setFilterDate,
    //     parse: JSON.parse,
    //     additionalAction: dataFilter => {
    //       if (dataFilter.filterby === "Rango" && dataFilter?.value) {
    //         setDateStart(dayjs(dataFilter.value[0]).format("YYYY-MM-DD"));
    //         setDateFinish(dayjs(dataFilter.value[1]).format("YYYY-MM-DD"));
    //       } else {
    //         const searchValue = filterByDate.find(item => item.label === dataFilter.label);
    //         if (searchValue) dataFilter.value = searchValue.value;
    //       }
    //     },
    //   },
    // };

    // Object.entries(localStorageVariables).forEach(([key, value]) => {
    //   const storedValue = localStorage.getItem(key);
    //   if (storedValue) {
    //     const parsedValue = value.parse ? value.parse(storedValue) : storedValue;
    //     value.stateVariable(parsedValue);
    //     if (value.additionalAction) value.additionalAction(parsedValue);
    //   }
    // });

    setReadyLocalStorage(true);
  };
  const getProspectv2 = async () => {
    if (readyLocalStorage === false) return;
    try {
      let query = {
        isclient: false,
        isoportunity: false,
      };

      query.createdbyId = from === "managerview" ? id_executive : id_user;

      if (hasValue(searchKey)) {
        // saveDataLocalStorage(searchKey, "keyword", "p_keyword");
        if (searchKey.includes("@")) {
          query.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchKey.trim())) {
          query.phone = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else {
          query.fullname = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }
      } else {
        setSearchKey("");
      }

      Object.keys(queryNew).forEach((propertyName, index) => {
        if (queryNew[propertyName].show === true) {
          query[propertyName] = queryNew[propertyName].id;
        }
      });

      if (filterDate.applyFilter) {
        query[filterDate.identifier] = { between: filterDate.value };
      }

      let includeValues = "";

      let joins = "";

      let includesArray = ["phase,category,clienttype,entity,channel,origin,ejecutive"];
      let joinsArray = ["ph"];

      showed?.map(element => {
        if (element.showColumn) {
          switch (element.headText) {
            case "categoria de interés":
              joinsArray.push("cat");
              break;
            case "ciudad":
              includesArray.push("city");
              joinsArray.push("cy");
              break;
            case "estado":
              joinsArray.push("ty");
              break;
            case "tipo de cliente":
              joinsArray.push("pe");
              joinsArray.push("ejecutive");
              break;
            case "especialidad":
              includesArray.push("specialty");
              joinsArray.push("cy");
              break;
            case "canal":
              joinsArray.push("cha");
              break;
            case "codigo postal":
              includesArray.push("postal");
              joinsArray.push("po");
            default:
              break;
          }
        }
      });

      includeValues = includesArray.toString();

      joins = joinsArray?.length === 0 ? "on,ce,sy,ptl,pl" : joinsArray.toString() + ",on,ce,sy,ptl,pl";

      let paramsQuery = {
        where: JSON.stringify(query),
        limit: limit,
        count: 1,
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
        include: includeValues,
      };
      paramsQuery.join = joins;

      let prospectv2 = await api.get(`prospects`, { params: paramsQuery });

      setTotalProspects(prospectv2.data.count);
      setProspectsTable(normalizeTableRecepcion(prospectv2.data.results));

      console.log(queryNew);

      // saveKeyWordLocalStorage(searchKey);
      // saveDataLocalStorage(queryNew, "query", "p_query");
      // saveDataLocalStorage(orderby, "order", "p_order");
      // saveDataLocalStorage(ASC, "asc", "p_asc");
      // saveDataLocalStorage(filterDate, "filterDate", "p_filterDate");
      let queryCountNew = query;
      queryCountNew.viewed = false;
      let paramsCountNew = {
        where: JSON.stringify(queryCountNew),
        limit: 0,
        count: 1,
        order: `-createdAt`,
        skip: page,
        include: includeValues,
        subquery: "1",
      };
      paramsCountNew.join = joins;
      let countProspectNew = await api.get(`prospects`, { params: paramsCountNew });
      setProspectsNew(countProspectNew.data?.count);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const handleOnChangePage = (event, value) => {
    setPage(value);
  };

  const getCities = async entityId => {
    try {
      setLoadCities(true);
      let query = {};
      query.entityId = entityId;
      let cities = await api.get(`cities?where=${JSON.stringify(query)}&include=entity&limit=1000&order=name`);
      setCitiesByEntity(cities.data.results);
      setLoadCities(false);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFilter = i => {
    if (page > 1) {
      setPage(1);
    } else {
      setFlag(!flag);
    }
    setShowChips(!showChips);
    if (i == undefined) {
      closeDrawerFilters();
    }

    let propertiesName = Object.keys(queryNew);

    let queryFinal = queryNew;

    for (let i = 0; i < propertiesName.length; i++) {
      const element = propertiesName[i];
      if (queryFinal[element].name !== null) {
        queryFinal[element].show = true;
      }

      setStatusSearch(2);
      setShowChips(true);
    }
    setQueryNew(queryFinal);
  };

  const handleSelectQueryDelete = identifier => {
    let queryItem = {};
    let queryToMutate = queryNew;
    queryItem["id"] = null;
    queryItem["name"] = null;
    queryItem["show"] = false;
    queryItem["identifier"] = identifier;

    queryToMutate[identifier] = {
      ...queryToMutate[identifier],
      ...queryItem,
    };

    setQueryNew({
      ...queryToMutate,
    });
    setFlag(!flag);
  };

  const handleSelectQuery = (e, identifier) => {
    let queryToMutation = queryNew;

    if (identifier === "gender") {
      if (e === null) {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: null,
          name: null,
          show: false,
        };
      } else {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: e.value,
          name: e.label,
        };
      }
    } else {
      if (e === null) {
        queryToMutation[identifier] = {
          ...queryToMutation[identifier],
          id: null,
          name: null,
          show: false,
        };
      } else {
        if (identifier !== "channelId") {
          queryToMutation[identifier] = {
            ...queryToMutation[identifier],
            id: e.id,
            name: e.companyname ? e.companyname : e.name,
          };
        } else {
          queryToMutation[identifier] = {
            ...queryToMutation[identifier],
            id: e.id,
            name: e.name,
            type: e.type,
            identifier: e.identifier,
          };
        }
      }
    }
    setQueryNew({ ...queryToMutation });
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("p_keyord");
    if (page > 1) {
      setPage(page - 1);
    } else {
      setFlag(!flag);
    }
  };
  const removeEjecutive = () => {
    setEjecutive("");
    if (page > 1) {
      setPage(page - 1);
    } else {
      setFlag(!flag);
    }
  };

  const handleClickEditProspect = item => {
    setprospectEdit(item.itemBD);
    setOpenEdit(!openEdit);
  };

  const handleSelectEntitie = item => {
    if (item !== null) {
      let entitie = {
        id: item.id,
        name: item.name,
        type: "Entidad",
      };
      if (item !== "") {
        getCities(item.id);
      } else {
        setCitiesByEntity([]);
      }
      handleSelectQuery(entitie, "entityId");
    }
  };

  const handleSelectCity = item => {
    if (item !== null) {
      let city = {
        id: item.id,
        name: item.name,
        type: "Ciudad",
      };
      handleSelectQuery(city, "cityId");
    }
  };

  const handleSelectChannel = item => {
    if (item !== null) {
      let canal = {
        id: item?.id,
        name: item?.name,
        type: "Canal",
        show: true,
        identifier: "channelId",
      };
      handleSelectQuery(canal, "channelId");
    }
  };

  const saveKeyWordLocalStorage = value => {
    if (value === "") return;
    localStorage.setItem("p_keyord", value);
  };

  const saveDataLocalStorage = (value, type, key) => {
    switch (type) {
      case "keyword":
        localStorage.setItem(key, value);
        break;

      case "query":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const handleValueFilterDate = (event, type) => {
    if (type === "typeDate") {
      setFilterDate({ ...filterDate, identifier: event.identifier, label: event.label });
    } else {
      setFilterDate({
        ...filterDate,
        value: event.value,
        filterby: event.label,
        applyFilter: event.identifier === "range" ? false : true,
      });
    }
    setDateStart("");
    setDateFinish("");
  };

  const handleDeleteFilterDate = () => {
    setPage(1);
    setFlag(!flag);
    setFilterDate({ identifier: "", label: "", filterby: "", value: "", applyFilter: false });
    setDateStart("");
    setDateFinish("");
    setStatusSearch(0);
  };
  return (
    <ProspectosStyled>
      <Head>
        <title>CRM JOBS - Prospectos</title>
      </Head>

      <div className="main">
        <div className="ctr_prospects">
          <div className="head">
            <div className="head__title">
              <Badge
                overlap="rectangular"
                color="primary"
                size="small"
                badgeContent={prospectsNew}
                max={99}
                showZero={false}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <h1>Prospectos</h1>
              </Badge>

              <div className="total">
                <People />
                {`${totalProspects} Registros`}
                <Tooltip arrow title="Recargar" placement="right">
                  <Cached
                    className="reload"
                    onClick={() => {
                      setFlag(!flag);
                    }}
                  />
                </Tooltip>
              </div>
            </div>

            <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
              <Add />
              <p>Agregar Prospecto</p>
            </Button>
          </div>
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <TextField
                variant="outlined"
                type="search"
                value={nameSearch}
                onChange={e => setNameSearch(e.target.value)}
                label={nameSearch !== "" && "Buscar prospecto"}
                placeholder="Ingresa Nombre o correo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter" && e.target.value.length > 0) {
                    setSearchKey(e.target.value);
                    setFlag(!flag);
                    setShowChips(true);
                    setPage(1);
                  }
                }}
              />
              <SearchOutlined className="search" />
              <div
                className="ctr_filters"
                onClick={() => {
                  setShowChips(false);
                  setshowFilters(!showFilters);
                }}
              >
                <FilterList className="filters" />
                <p className="text">Filtros</p>
              </div>
            </div>
          </div>

          <div className="filters_chip">
            {showChips && (
              <div>
                {ejecutive.id && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={removeEjecutive}
                    label={`${"Ejecutivo"}: ${ejecutive.name} ${ejecutive.lastname}`}
                    className="chip"
                  />
                )}
                {searchKey !== "" && (
                  <Chip color="primary" size="small" onDelete={removeSearchKey} label={searchKey} className="chip" />
                )}

                {filterTracking && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={() => {
                      setFilterTracking(false);
                      setFlag(!flag);
                    }}
                    label={"Prospectos sin Seguimiento"}
                    className="chip"
                  />
                )}

                {filterDate?.applyFilter && (
                  <Chip
                    color="primary"
                    size="small"
                    onDelete={handleDeleteFilterDate}
                    label={`${filterDate.label} : ${filterDate.filterby} ${
                      filterDate.filterby === "Rango" ? `(${dateStart} - ${dateFinish})` : ""
                    }`}
                    className="chip"
                  />
                )}

                {Object.keys(queryNew)?.map((item, index) => {
                  if (queryNew[item]?.show == true) {
                    return (
                      <Chip
                        key={index}
                        color="primary"
                        size="small"
                        onDelete={() => handleSelectQueryDelete(queryNew[item].identifier)}
                        label={`${queryNew[item].type} : ${queryNew[item].name}`}
                        className="chip"
                      />
                    );
                  }
                  return null;
                })}
              </div>
            )}
          </div>

          <Box className="ordersAndView">
            <OrderByProspects ASC={ASC} setASC={setASC} setOrderby={setOrderby} orderby={orderby} />
          </Box>
          {isLoading && (
            <div className="ctr_load">
              <div className="ctr_load__img">
                <img src="/load.png" />
              </div>
              <div className="ctr_load__load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          )}
          {!isLoading && (
            <TableCustom
              heads={heads}
              data={prospectsTable}
              identificador={"nombre"}
              custom={false}
              selectmultiple={false}
              keyJson="AttachedFiles"
              actionsPerItem={[{ title: "editar", action: e => handleClickEditProspect(e) }]}
            />
          )}
          {prospectsTable.length > 0 && (
            <div className="ctr_prospects__tfooter">
              <div className="ctr_prospects__tfooter__ctr_button"></div>
              <div className="ctr_prospects__tfooter__ctr_pagination">
                <p className="">{`Total de Prospectos: ${totalProspects} Página: ${page} - ${Math.ceil(
                  totalProspects / limit
                )}`}</p>
                <div className="ctr_prospects__tfooter__ctr_pagination__pagination">
                  <Pagination
                    style={{ display: "flex", justifyContent: "center" }}
                    page={page}
                    defaultPage={1}
                    onChange={handleOnChangePage}
                    shape="rounded"
                    count={Math.ceil(totalProspects / limit)}
                    color="primary"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={closeDrawerFilters} />
          </div>
          <div className="ctr_drawer__ctr_inputs">
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fecha</label>
              <Select
                className="selects"
                placeholder="Selecciona una Opción"
                options={filtersTypeDate}
                value={filtersTypeDate.filter(item => item.identifier === filterDate?.identifier)}
                onChange={event => handleValueFilterDate(event, "typeDate")}
                getOptionValue={option => option.identifier}
              />
              <Select
                className="selects"
                placeholder="Selecciona una Opción"
                options={filterByDate}
                value={filterByDate.filter(item => item.label === filterDate?.filterby)}
                onChange={event => handleValueFilterDate(event, "filterType")}
              />
              <Collapse in={filterDate?.filterby === "Rango" ? true : false}>
                <Grid className="range_dates" container={true} spacing={1}>
                  <Grid item={true} md={6}>
                    <p className="title_date">De</p>
                    <input
                      className="input_date"
                      type="date"
                      value={dateStart}
                      onChange={e => {
                        setDateStart(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item={true} md={6}>
                    <p className="title_date">Al</p>
                    <input
                      className="input_date"
                      type="date"
                      value={dateFinish}
                      onChange={e => setDateFinish(e.target.value)}
                    />
                  </Grid>
                </Grid>
              </Collapse>
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Zona geografica</label>
              <Select
                placeholder="Selecciona un Estado"
                onChange={e => handleSelectEntitie(e)}
                value={EntitiesLocal.filter(item => item.id === queryNew["entityId"]?.id)}
                options={EntitiesLocal}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              {citiesByEntity !== null && (
                <Select
                  placeholder="Selecciona una Ciudad"
                  onChange={e => handleSelectCity(e)}
                  isLoading={loadCities}
                  options={citiesByEntity}
                  value={citiesByEntity?.filter(item => item.id === queryNew["cityId"]?.id)}
                  getOptionValue={option => `${option["id"]}`}
                  getOptionLabel={option => `${option.name} `}
                />
              )}
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Categoría de interes</label>
              <Select
                placeholder="Seleccione una categoría"
                onChange={e => handleSelectQuery(e, "categoryId")}
                onMenuOpen={() => getCatalogBy("categories")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={categories.isFetching}
                options={categories.results}
                isClearable={false}
                value={categories.results.filter(
                  item => queryNew["categoryId"] && item.id === queryNew["categoryId"].id
                )}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Origen</label>
              <Select
                placeholder="Seleccione un origen"
                onChange={e => handleSelectQuery(e, "originId")}
                onMenuOpen={() => getCatalogBy("origins")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={origins.isFetching}
                options={origins.results}
                isClearable={false}
                value={origins.results.filter(item => item.id === queryNew["originId"]?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Fase</label>
              <Select
                placeholder="Seleccione una fase"
                onChange={e => handleSelectQuery(e, "phaseId")}
                onMenuOpen={() => getCatalogBy("phases")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={phases.isFetching}
                isClearable={false}
                options={phases.results}
                value={phases.results.filter(item => queryNew["phaseId"] && item.id === queryNew["phaseId"].id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Género</label>
              <Select
                placeholder="Seleccione una género"
                isSearchable={true}
                isClearable={false}
                options={filtergenders}
                value={filtergenders.filter(item => item.value === queryNew["gender"]?.id)}
                onChange={e => handleSelectQuery(e, "gender")}
              />
            </div>

            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Compañia</label>
              <Select
                placeholder="Selecciona Compañia"
                onChange={e => handleSelectQuery(e, "clientCompanyId")}
                isClearable={false}
                onMenuOpen={() => getCatalogBy("clientsCompanies")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientsCompanies.isFetching}
                value={clientsCompanies.results.filter(item => item.id === queryNew["clientCompanyId"]?.id)}
                options={clientsCompanies.results}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.companyname} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Tipo de cliente</label>
              <Select
                className="drawer_container__form__containerSelect__select"
                placeholder="Selecciona el Tipo de Cliente"
                onChange={e => handleSelectQuery(e, "clientTypeId")}
                onMenuOpen={() => getCatalogBy("clientTypes")}
                loadingMessage={() => "Cargando Opciones..."}
                isLoading={clientTypes.isFetching}
                isClearable={false}
                value={clientTypes.results.filter(item => item.id === queryNew["clientTypeId"]?.id)}
                options={clientTypes.results}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Especialidad</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={false}
                isLoading={specialties.isFetching}
                options={specialties.results}
                onMenuOpen={() => getCatalogBy("specialties")}
                loadingMessage={() => "Cargando Opciones..."}
                value={specialties.results.filter(item => item.id === queryNew["specialtyId"]?.id)}
                onChange={e => handleSelectQuery(e, "specialtyId")}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
            <div className="ctr_drawer__ctr_inputs__input">
              <label className="label">Canal</label>
              <Select
                placeholder="Seleccione una opción"
                isClearable={false}
                options={channels.results}
                value={channels.results.filter(item => item.id === queryNew["channelId"]?.id)}
                onChange={e => handleSelectChannel(e)}
                isLoading={channels.isFetching}
                onMenuOpen={() => getCatalogBy("channels")}
                loadingMessage={() => "Cargando Opciones..."}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </div>
          </div>
          <div className="ctr_drawer__ctr_buttons">
            <Button variant="contained" className="btn_cancel" onClick={closeDrawerFilters}>
              Cancelar
            </Button>

            <Button variant="contained" className="btn_apply" onClick={() => handleFilter()}>
              Aplicar
            </Button>
          </div>
        </div>
      </DrawerContainer>
      <DrawerEditProspect
        openEdit={openEdit}
        setOpenEdit={setOpenEdit}
        prospectEdit={prospectEdit}
        setFlag={() => setFlag(!flag)}
      />

      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </ProspectosStyled>
  );
}

function OrderByProspects({ ASC, setASC, orderby, setOrderby }) {
  return (
    <>
      <div>
        <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
        <select
          className="order-select"
          onChange={e => setOrderby(e.target.value)}
          value={orderby}
          name=""
          id=""
          style={{ marginRight: 5 }}
        >
          <option
            value="createdAt"
            name="Fech
                  a de creacion"
          >
            Fecha de creacion
          </option>
        </select>
      </div>

      <div className="orderAsc">
        <p style={{ fontSize: 11 }}>Ascendente</p>

        <PurpleSwitch
          checked={ASC}
          onChange={e => {
            setASC(e.target.checked);
          }}
          name="checkedC"
        />

        <p style={{ fontSize: 11 }}>Descendente</p>
      </div>
    </>
  );
}
const filtergenders = [
  { label: "Hombre", value: "Hombre" },
  { label: "Mujer", value: "Mujer" },
];

const heads = [
  "id",
  "nombre",
  "correo",
  "movil",
  "ejecutivo",
  "categoria de interés",
  "tipo de cliente",
  "origen",
  "estado",
  "comentarios",
  "canal",
  "fecha de creación",
];

const initialQuery = {
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
  categoryId: {
    id: null,
    name: null,
    type: "Categoria",
    show: false,
    identifier: "categoryId",
  },
  originId: {
    id: null,
    name: null,
    type: "Origen",
    show: false,
    identifier: "originId",
  },
  phaseId: {
    id: null,
    name: null,
    type: "Fase",
    show: false,
    identifier: "phaseId",
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
  channelId: {
    id: null,
    name: null,
    type: "Canal",
    show: false,
    identifier: "channelId",
  },
};

const PurpleSwitch = withStyles({
  switchBase: {
    color: colors.primaryColor,
    "&$checked": {
      color: colors.primaryColor,
    },
    "&$checked + $track": {
      backgroundColor: colors.primaryColor,
    },
  },
  checked: {},
  track: {},
})(Switch);

const filtersTypeDate = [
  {
    label: "Fecha de Creación",
    identifier: "createdAt",
  },
];

const filterByDate = [
  {
    identifier: "month",
    label: "Mes",
    value: [dayjs().startOf("month").format(), dayjs().endOf("month").format()],
  },
  {
    identifier: "week",
    label: "Semana",
    value: [dayjs().startOf("week").format(), dayjs().endOf("week").format()],
  },
  {
    identifier: "day",
    label: "Hoy",
    value: [dayjs().startOf("day").format(), dayjs().endOf("day").format()],
  },
  {
    identifier: "range",
    label: "Rango",
    value: null,
  },
];
