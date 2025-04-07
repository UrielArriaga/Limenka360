import { Button, Fade, Grid } from "@material-ui/core";
import { Close, InfoOutlined } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import { EntitiesLocal } from "../../BD/databd";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import { commonSelector } from "../../redux/slices/commonSlice";
import { FormatOptionLabel } from "../../redux/slices/reactSelect";
import { api } from "../../services/api";
import { toUpperCaseChart } from "../../utils";
import { CategoryStyle, DrawerContainer, ProductStyle } from "./style";
export default function DrawerFiltersOportunities(props) {
  const {
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
    handleSelectProduct,
    inQueryNew,
    queryNew,
    roleId,
    id_user,
    ejecutive,
    setEjecutive,
    tag,
    setTag,
    setValueDate,
    valueDate,
    handleSelectCategory,
  } = props;
  const { products } = useSelector(commonSelector);

  const { getCatalogBy } = useGlobalCommons();
  const { categories, phases, origins, clientTypes, specialties, clientsCompanies, users } =
    useSelector(commonSelector);

  const [loadCities, setLoadCities] = useState(false);
  const [citiesByEntity, setCitiesByEntity] = useState([]);
  const [o, setO] = useState([]);
  const optionDefault = {
    name: "Todos los Ejecutivos de mi grupo",
    lastname: "",
    id: "",
  };
  const filterDescarted = [{ label: "Mostrar Descartados", value: true, type: "Descartados" }];
  const filterImportant = [{ label: "Mostrar Importantes", value: true, type: "Importantes" }];
  const filterIsClient = [{ label: "Mostrar Clientes", value: true, type: "Clientes" }];
  const filterRejected = [{ label: "Mostrar Rechazadas", value: true, type: "Rechazadas" },{ label: "Mostrar No Rechazadas", value: false, type: "Rechazadas" }];
  const filterDate = [
    {
      label: "Fecha de Creación",
      value: "createdAt",
      queryIdentifier: "",
    },
    {
      label: "Fecha de Actualización",
      value: "updatedAt",
      queryIdentifier: "",
    },
    {
      label: "Fecha de Cierre",
      value: "estimatedclossing",
      queryIdentifier: "",
    },
    {
      label: "Fecha de Ultimo Seguimiento",
      value: "lastTrackingcreatedAt",
      queryIdentifier: "",
    },
    {
      label: "Fecha de Creación Prospecto",
      value: "prospect.createdAt",
      queryIdentifier: "prospect",
    },
    {
      label: "Fecha de Actualización Prospecto",
      value: "prospect.updatedAt",
      queryIdentifier: "prospect",
    },
  ];
  const optionsDate = [
    {
      id: "today",
      label: "Hoy",
      value: [dayjs().startOf("day").format(), dayjs().endOf("day").format()],
    },
    {
      id: "week",
      label: "Semana",
      value: [dayjs().startOf("week").format(), dayjs().endOf("week").format()],
    },
    {
      id: "month",
      label: "Mes",
      value: [dayjs().startOf("month").format(), dayjs().endOf("month").format()],
    },
    {
      id: "range",
      label: "Rango",
      value: [dayjs(dateFrom).format(), dayjs(dateTo).endOf("day").format()],
    },
  ];
  const [cat, setCat] = useState([]);

  useEffect(() => {
    // other code
    if (dateTo !== "" && dateFrom !== "") {
      if (dateTo >= dateFrom) {
        let updateDate = { ...valueDate };
        updateDate.value = {
          between: [dayjs(dateFrom).format(), dayjs(dateTo).endOf("day").format()],
        };
        setValueDate(updateDate);
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
    let eje = {
      id: item.id,
      name: item.name,
      lastname: item.lastname,
      type: "Ejecutivo",
    };

    if (item !== "") {
      setEjecutive(eje);
    } else {
      setEjecutive({});
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

  const handleFilterTypeDate = value => {
    let date = { ...valueDate };
    date.identifier = value.value.split(".").pop();
    date.query = value.queryIdentifier;
    date.typeDate = value.label;
    setValueDate(date);
    setDateFrom("");
    setDateTo("");
    setIsRangeOk(false);
  };

  const handleFilterRangeDate = value => {
    let typeRange = { ...valueDate };
    typeRange.label = value.label;
    if (value.id === "range") {
      typeRange.value = null;
    } else {
      typeRange.value = {
        between: value.value,
      };
    }
    setValueDate(typeRange);
  };

  const customFilterSelect = (option, searchText) => {
    if (searchText) {
      if (
        option.data.name.toLowerCase().includes(searchText.toLowerCase()) ||
        option.data.code.toLowerCase().includes(searchText.toLowerCase()) ||
        option.data.category.name.toLowerCase().includes(searchText.toLowerCase())
      ) {
        return true;
      } else {
        return false;
      }
    }
  };
  const customFilterSelectCategory = (option, searchText) => {
    if (searchText) {
      if (option.data.name.toLowerCase().includes(searchText.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    }
  };
  const customFilter = keysearch => {
    let allproducts = products.results;
    let productSearch = [];
    if (keysearch) {
      productSearch = allproducts.filter(
        item =>
          item.name.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.code.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.category?.name.toLowerCase().includes(keysearch.toLowerCase())
      );
    }
    let limitProducts = productSearch.slice(0, 10);
    setO(limitProducts);
  };
  const customFilterCategorys = keysearch => {
    let allcategories = categories.results;
    let categoriesSearch = [];
    if (keysearch) {
      categoriesSearch = allcategories.filter(
        item =>
          item.name.toLowerCase().includes(keysearch.toLowerCase()) ||
          item.id.toLowerCase().includes(keysearch.toLowerCase())
      );
    }
    let limitProducts = categoriesSearch.slice(0, 10);
    setCat(limitProducts);
  };
  const formatOptionLabel = ({ name, code }) => (
    <ProductStyle>
      <div className="product">
        <p className="title">{name}</p>
        <p className="subtitle">
          código: <span className="code">{code}</span>
        </p>
      </div>
    </ProductStyle>
  );
  const formatOptionLabelCategory = ({ name, code, category }) => (
    <CategoryStyle>
      <div className="product">
        <p className="title">{name}</p>
      </div>
    </CategoryStyle>
  );

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
            <p className="label">Filtrar por Fecha </p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona Tipo de Fecha"
              options={filterDate}
              onChange={e => handleFilterTypeDate(e)}
              isSearchable={false}
              value={filterDate.filter(item => item.label === valueDate?.typeDate)}
            />
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Rango de Fecha"
              options={optionsDate}
              onChange={e => handleFilterRangeDate(e)}
              isSearchable={false}
              value={optionsDate.filter(item => item.label === valueDate?.label)}
            />
          </Grid>

          {valueDate.label === "Rango" && (
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
          {roleId !== "ejecutivo" && (
            <Grid item md={12} className="drawer_container__form__containerSelect">
              <p className="label">Ejecutivo</p>
              <Select
                onMenuOpen={() => getCatalogBy("executives")}
                loadingMessage={() => "Cargando Opciones..."}
                options={[optionDefault, ...users.results]}
                isLoading={users.isFetching}
                isClearable={true}
                className="drawer_container__form__containerSelect__select"
                formatOptionLabel={FormatOptionLabel}
                placeholder="Selecciona Ejecutivo"
                onChange={e => (e === null ? handleSelectEjecutives("") : handleSelectEjecutives(e))}
                value={users.results.filter(item => item.id === ejecutive?.id)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} ${option.lastname} - ${option.email} `}
              />
            </Grid>
          )}
          {/* 21/10/20211  se agrego el select para filtrar por categoria */}
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Categoría de Interés</p>
            <Select
              onMenuOpen={() => getCatalogBy("categories")}
              loadingMessage={() => "Cargando Opciones..."}
              options={categories.results}
              isLoading={categories.isFetching}
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona una Categoría"
              isClearable={true}
              onChange={e => handleSelectInQuery(e, "categoryId")}
              value={categories.results.filter(item => item.id === inQueryNew["categoryId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => toUpperCaseChart(`${option.name} `)}
            ></Select>
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Origen</p>
            <Select
              onMenuOpen={() => getCatalogBy("origins")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={origins.isFetching}
              options={origins.results}
              placeholder="Seleccione un origen"
              onChange={e => handleSelectInQuery(e, "originId")}
              isClearable={true}
              value={origins.results.filter(item => item.id === inQueryNew["originId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Fase</p>
            <Select
              onMenuOpen={() => getCatalogBy("phases")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={phases.isFetching}
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
            <p className="label">Clientes</p>
            <Select
              placeholder="Selecciona el Tipo de Cliente"
              options={filterIsClient}
              isClearable={true}
              value={filterIsClient.filter(item => item.value === inQueryNew["isclient"]?.id)}
              onChange={e => handleSelectInQuery(e, "isclient")}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Tipo de cliente</p>
            <Select
              onMenuOpen={() => getCatalogBy("clientTypes")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={clientTypes.isFetching}
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
              onMenuOpen={() => getCatalogBy("clientsCompanies")}
              isLoading={clientsCompanies.isFetching}
              placeholder="Seleccione una compañia"
              loadingMessage={() => "Cargando Opciones..."}
              onChange={e => handleSelectCompanyclients(e)}
              options={clientsCompanies.results}
              value={clientsCompanies.results.filter(item => item.id === inQueryNew["clientCompanyId"]?.id)}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.companyname} `}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Especialidad</p>
            <Select
              isLoading={specialties.isFetching}
              onMenuOpen={() => getCatalogBy("specialties")}
              loadingMessage={() => "Cargando Opciones..."}
              placeholder="Seleccione una opción"
              options={specialties.results}
              isClearable={true}
              value={specialties.results.filter(item => item.id === inQueryNew["specialtyId"]?.id)}
              onChange={e => handleSelectInQuery(e, "specialtyId")}
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

          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Producto Cotizado</p>
            <Select
              placeholder="Buscar Nombre del Producto..."
              options={o}
              isClearable={false}
              noOptionsMessage={() => "Ingrese el Nombre"}
              onInputChange={customFilter}
              formatOptionLabel={formatOptionLabel}
              getOptionLabel={option => option.name}
              getOptionValue={option => option.id}
              onChange={handleSelectProduct}
              filterOption={customFilterSelect}
            />
          </Grid>
          <Grid item md={12} className="drawer_container__form__containerSelect">
            <p className="label">Categoria de Producto Cotizado</p>
            <Select
              onMenuOpen={() => getCatalogBy("categories")}
              loadingMessage={() => "Cargando Opciones..."}
              isLoading={categories.isFetching}
              placeholder="Buscar Nombre de categoria de Producto..."
              options={cat}
              isClearable={false}
              noOptionsMessage={() => "Ingrese el Nombre"}
              onInputChange={customFilterCategorys}
              formatOptionLabel={formatOptionLabelCategory}
              getOptionLabel={option => {
                option.name;
              }}
              getOptionValue={option => option.id}
              onChange={handleSelectCategory}
              filterOption={customFilterSelectCategory}
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
