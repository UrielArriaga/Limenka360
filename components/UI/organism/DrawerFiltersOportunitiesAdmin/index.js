import { Box, Button, Drawer, Fade, Grid } from "@material-ui/core";
import { Close, InfoOutlined } from "@material-ui/icons";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EntitiesLocal } from "../../../../BD/databd";
import {
  commonSelector,
  getClientTypesCommon,
  getOriginsCommon,
  getPhasesCommon,
  getSpecialtiesCommon,
} from "../../../../redux/slices/commonSlice";
import { api } from "../../../../services/api";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";
import RequestCommon from "../../../../services/request_Common";
import { FormatOptionLabel } from "../../../../redux/slices/reactSelect";
import { StyleExecutiveGroup, StyleGroup } from "../../../../styles/global.styles";
import { DrawerContainer } from "./styles";
export default function DrawerFiltersOportunitiesAdmin({
  open,
  setOpen,
  typeDate,
  setTypeDate,
  rangeDate,
  setRangeDate,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  isRangeOk,
  setIsRangeOk,
  applyFilters,
  handleSelectQuery,
  handleSelectInQuery,
  inQueryNew,
  queryNew,
  roleId,
  id_user,
  ejecutive,
  setEjecutive,
  group,
  setGroup,
  respaldo,
  setRespaldo,
  ejecutives,
  setEjecutives,
}) {
  const { phases, origins, clientTypes, specialties } = useSelector(commonSelector);
  const [loadCities, setLoadCities] = useState(false);
  const [citiesByEntity, setCitiesByEntity] = useState([]);
  const [tags, setTags] = useState([]);

  const [dataGroups, setDataGroups] = useState([]);
  //21/10/2022 categorias
  const [categories, setCategories] = useState([]);
  const [clientsCompanies, setClientsCompanies] = useState([]);
  const dispatch = useDispatch();
  const commonApi = new RequestCommon();
  const filterDescarted = [
    { label: "Mostrar Descartados", value: true, type: "Descartados" },
    // { label: "Quitar", value: false },
  ];
  const filterImportant = [{ label: "Mostrar Importantes", value: true, type: "Importantes" }];
  const filterRejected = [{ label: "Mostrar Rechazadas", value: true, type: "Rechazadas" }];

  useEffect(() => {
    let params = {
      limit: 100,
      count: "1",
      order: "name",
    };
    dispatch(getOriginsCommon({ params }));
    dispatch(getPhasesCommon({ params }));
    dispatch(getSpecialtiesCommon({ params }));
    dispatch(getClientTypesCommon({ params }));
    getLabels();
    getUsers();
    getCategories();
    getClientscompanies();
    getDataGroups();
  }, []);

  useEffect(() => {
    // other code
    if (dateTo !== "" && dateFrom !== "") {
      if (dateTo >= dateFrom) {
        setIsRangeOk(true);
      } else {
        setIsRangeOk(false);
      }
    } else {
      setIsRangeOk(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateTo, dateFrom]);

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
  const getClientscompanies = async () => {
    try {
      let query = {};

      let clientsCompany = await commonApi.getClientsCompanies(query);
      setClientsCompanies(clientsCompany.data.results);
    } catch (error) {
      console.log(error.response);
    }
  };
  const getLabels = async () => {
    try {
      let tag = await commonApi.getLabels();
      setTags(tag?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };
  //21/10/2022 peticion para categorias de interes
  const getCategories = async () => {
    try {
      let categories = await commonApi.getCategories();
      setCategories(categories?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getUsers = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
        include: "group",
      };
      let response = await api.get(`ejecutives`, { params });
      setEjecutives(response?.data?.results);

      setRespaldo(response?.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getDataGroups = async () => {
    try {
      let query = {};
      let params = {
        where: JSON.stringify(query),
        all: 1,
        order: "name",
      };
      let response = await api.get(`groups`, { params });
      setDataGroups(response.data.results);
    } catch (error) {
      console.log(error);
    }
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
      handleSelectInQuery(entitie, "entityId");
    }
  };
  const handleSelectCity = item => {
    if (item !== null) {
      let city = {
        id: item.id,
        name: item.name,
        type: "Ciudad",
      };
      handleSelectInQuery(city, "cityId");
    }
  };

  const handleSelectEjecutives = item => {
    if (item) {
      let eje = {
        id: item.id,
        name: item.name,
        lastname: item.lastname,
        type: "Ejecutivo",
      };
      handleSelectInQuery(eje, "ejecutiveId");
    } else {
      handleSelectInQuery(null, "ejecutiveId");
    }
  };

  const handleSelectGroup = group => {
    if (group) {
      let groups = {
        id: group.id,
        name: group.name,
        type: "Grupo",
      };
      let newPaymentsAdd = respaldo.filter(item => item?.group?.id === group?.id);
      setEjecutives(newPaymentsAdd);
      handleSelectInQuery(groups, "groupId");
    } else {
      setEjecutives(respaldo);
      handleSelectInQuery(null, "groupId");
    }
  };

  const handleSelectCompanyclients = item => {
    if (item !== null) {
      let clients = {
        id: item.id,
        name: item.companyname,
        type: "Empresa",
      };

      handleSelectInQuery(clients, "clientCompanyId");
    } else {
    }
  };

  const handleSelectRange = item => {
    if (item !== null) {
      let rangeDate = {
        id: item.id,
        name: item.value,
        type: item.type,
      };
      item !== "" ? setRangeDate(rangeDate) : setRangeDate({});
    }
  };

  const FormatOptionsExecutiveGroup = ({ fullname, group, email }) => {
    return (
      <StyleExecutiveGroup>
        <div className="dataExecutive">
          <p className="fullname">{fullname} - </p>
          <p className="email">{email}</p>
        </div>
        <p className="groupname">
          Grupo: <span className="name">{group.name}</span>
        </p>
      </StyleExecutiveGroup>
    );
  };

  const FormatOptionsGroup = ({ name }) => {
    return (
      <StyleGroup>
        <p className="groupname">{name}</p>
      </StyleGroup>
    );
  };

  return (
    <DrawerContainer
      anchor="right"
      open={open}
      onClose={() => {
        setOpen(!open);
      }}
    >
      <div className="drawer_container">
        <div className="drawer_container__top">
          <p className="title">Filtra por tu preferencia</p>
          <Close className="close_icon" onClick={() => setOpen(false)} />
        </div>
        <Grid container className="drawer_container__form">
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Rango de Fecha </p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Rango de Fecha"
              onChange={e => handleSelectRange(e)}
              isSearchable={false}
              value={optionsDate.filter(item => item.id === rangeDate?.id)}
              options={optionsDate}
              getOptionValue={option => `${option["value"]}`}
              getOptionLabel={option => `${option.value} `}
            />
          </Grid>

          {rangeDate.id === 4 && (
            <>
              <Grid item md={6} className="drawer_container__form__containerSelect">
                <p className="label">Del </p>
                <input
                  type="date"
                  className="drawer_container__form__containerSelect__calendarFrom"
                  value={dateFrom}
                  onChange={e => setDateFrom(e.target.value)}
                />
              </Grid>
              <Grid item md={6} className="drawer_container__form__containerSelect">
                <p className="label">Al </p>
                <input
                  type="date"
                  className="drawer_container__form__containerSelect__calendarTo"
                  value={dateTo}
                  onChange={e => setDateTo(e.target.value)}
                />
              </Grid>
              <Fade in={isRangeOk === true ? false : true}>
                <Grid item md={12} className="alert">
                  <InfoOutlined className="alert__iconAlert" />
                  <p className="alert__title">La Fecha de Inicio No puede ser Menor a la de Fin</p>
                </Grid>
              </Fade>
            </>
          )}
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Zona Geográfica</p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona un Estado"
              onChange={e => handleSelectEntitie(e)}
              value={EntitiesLocal.filter(item => item.id === inQueryNew["entityId"]?.id)}
              options={EntitiesLocal}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>

          <Grid item md={12} className="drawer_container__form__containerSelect">
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona una Ciudad"
              onChange={e => handleSelectCity(e)}
              isLoading={loadCities}
              options={citiesByEntity}
              value={citiesByEntity.filter(item => item.id === inQueryNew["cityId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Gupo</p>
            <Select
              placeholder="Selecciona un Grupo"
              isClearable={true}
              onChange={e => handleSelectGroup(e)}
              formatOptionLabel={FormatOptionsGroup}
              value={dataGroups.filter(item => item.id === inQueryNew["groupId"]?.id)}
              options={dataGroups}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name}`}
            />
          </Grid>

          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Ejecutivo</p>
            <Select
              isClearable={true}
              className="drawer_container__form__containerSelect__selectEje"
              formatOptionLabel={e => FormatOptionsExecutiveGroup(e)}
              placeholder="Selecciona Ejecutivo"
              onChange={e => handleSelectEjecutives(e)}
              value={ejecutives.filter(item => item.id === inQueryNew["ejecutiveId"]?.id)}
              options={ejecutives}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} ${option.lastname}-${option.email}`}
              styles={{
                menu: provided => ({ ...provided, zIndex: 9999 }),
              }}
            />
          </Grid>

          <Box mt={8}></Box>
          {/* 21/10/20211  se agrego el select para filtrar por categoria */}
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Categoría de Interés</p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona una Categoría"
              isClearable={true}
              onChange={e => handleSelectInQuery(e, "categoryId")}
              options={categories}
              value={categories.filter(item => item.id === inQueryNew["categoryId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            ></Select>
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Origen</p>
            <Select
              placeholder="Seleccione un origen"
              onChange={e => handleSelectInQuery(e, "originId")}
              options={origins.results}
              isClearable={true}
              value={origins.results.filter(item => item.id === inQueryNew["originId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Fase</p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona la Fase"
              isClearable={true}
              onChange={e => handleSelectInQuery(e, "phaseId")}
              value={phases.results.filter(item => item.id === inQueryNew["phaseId"]?.id)}
              options={phases.results}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Tipo de cliente</p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona el Tipo de Cliente"
              onChange={e => handleSelectInQuery(e, "clientTypeId")}
              isClearable={true}
              value={clientTypes.results.filter(item => item.id === inQueryNew["clientTypeId"]?.id)}
              options={clientTypes.results}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${toUpperCaseChart(option.name)} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Compañía</p>

            <Select
              placeholder="Seleccione una compañia"
              onChange={e => handleSelectCompanyclients(e)}
              options={clientsCompanies}
              value={clientsCompanies.filter(item => item.id === inQueryNew["clientCompanyId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.companyname} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Especialidad</p>
            <Select
              placeholder="Seleccione una opción"
              options={specialties.results}
              isClearable={true}
              value={specialties.results.filter(item => item.id === inQueryNew["specialtyId"]?.id)}
              onChange={e => handleSelectInQuery(e, "specialtyId")}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>

          {/* <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Etiquetas Prospecto</p>
            <Select
              placeholder="Seleccione una Etiqueta"
              onChange={e => handleSelectTags(e)}
              options={tags}

              value={tags.filter(item => item.id === inQueryNew["prospectslabels"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.label} `}
            />
          </Grid> */}
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Pagina web</p>

            <Select
              placeholder="Seleccione una Opcion"
              onChange={e => handleSelectInQuery(e, "url")}
              options={filterWeb}
              value={filterWeb.filter(item => item.id === inQueryNew["url"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Facebook</p>

            <Select
              placeholder="Seleccione una opcion"
              onChange={e => handleSelectInQuery(e, "facebook")}
              options={filterFacebook}
              value={filterFacebook.filter(item => item.id === inQueryNew["facebook"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Rechazadas</p>
            <Select
              placeholder="Seleccione una opción"
              isClearable={true}
              options={filterRejected}
              value={filterRejected.filter(item => item.value === queryNew["rejected"]?.id)}
              onChange={e => handleSelectQuery(e, "rejected")}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Descartadas</p>
            <Select
              placeholder="Seleccione una opción"
              options={filterDescarted}
              isClearable={true}
              value={filterDescarted.filter(item => item.value === queryNew["discarted"]?.id)}
              onChange={e => handleSelectQuery(e, "discarted")}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Importantes</p>

            <Select
              placeholder="Seleccione una opción"
              options={filterImportant}
              isClearable={true}
              value={filterImportant.filter(item => item.value === queryNew["isimportant"]?.id)}
              onChange={e => handleSelectQuery(e, "isimportant")}
            />
          </Grid>
        </Grid>
        <div className="drawer_container__ctr_buttons">
          <Button variant="contained" className="btn_cancel" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="contained" className="btn_apply" onClick={() => applyFilters()}>
            Aplicar
          </Button>
        </div>
      </div>
    </DrawerContainer>
  );
}



const optionsDate = [
  {
    id: 1,
    value: "Hoy",
    type: "today",
  },
  {
    id: 2,
    value: "Semana",
    type: "week",
  },
  {
    id: 3,
    value: "Mes",
    type: "mounth",
  },
  {
    id: 4,
    value: "Rango de Fecha",
    type: "range",
  },
];


const filterWeb = [
  { id: "15251", name: "Con pagina web", value: true },
  { id: "15898", name: "sin pagina web", value: true },
];
const filterFacebook = [
  { id: "1525158", name: "Con Facebook", value: true },
  { id: "1589854", name: "Sin Facebook", value: true },
];
