import { Close, InfoOutlined } from "@material-ui/icons";
import { DrawerContainerDemo } from "./style";
import { Button, Fade, Grid } from "@material-ui/core";
import Select from "react-select";
import dayjs from "dayjs";
import { EntitiesLocal } from "../../BD/databd";
import { api } from "../../services/api";

export default function DrawerFiltersDemo(props) {
  const {
    open,
    setOpen,
    applyFilters,
    handleAddFilter,
    city,
    setCity,
    isfilterbyRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleFilterTypeDate,
    handleFilterRangeDate
  } = props;

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
      label: "Fecha de Demostracion",
      value: "date",
      queryIdentifier: "",
    },
  ];

  const optionsDate = [
    {
      id: "today",
      label: "Hoy",
      value: { $gte: dayjs().startOf("day").format(), $lte: dayjs().endOf("day").format() },
    },
    {
      id: "week",
      label: "Semana",
      value: { $gte: dayjs().startOf("week").format(), $lte: dayjs().endOf("week").format() },
    },
    {
      id: "month",
      label: "Mes",
      value: { $gte: dayjs().startOf("month").format(), $lte: dayjs().endOf("month").format() },
    },
    {
      id: "range",
      label: "Rango",
      value: [dayjs(startDate).format(), dayjs(endDate).endOf("day").format()],
    },
  ];

  const getCities = async entityId => {
    try {
      let query = {};
      query.entityId = entityId;
      let params = {
        limit: 1000,
        order: "name",
      };
      setCity({ ...city, isLoading: true });
      let cities = await api.get(`cities?where=${JSON.stringify(query)}`, { params });
      setCity({ ...city, data: cities.data.results, isLoading: false });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DrawerContainerDemo anchor="right" open={open} onClose={() => setOpen(!open)}>
      <div className="drawer_container">
        <div className="drawer_container__top">
          <p className="title">Filtra por tu preferencia</p>
          <Close className="close_icon" onClick={() => setOpen(false)} />
        </div>
        <Grid container={true} className="drawer_container__form">
          <Grid item={true} md={12} className="drawer_container__form__containerSelect">
            <p className="label">Filtrar por Fecha </p>
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Selecciona Tipo de Fecha"
              options={filterDate}
              onChange={e => handleFilterTypeDate(e)}
              isSearchable={false}
            />
            <Select
              className="drawer_container__form__containerSelect__select"
              placeholder="Rango de Fecha"
              options={optionsDate}
              onChange={e => handleFilterRangeDate(e)}
              isSearchable={false}
            />
          </Grid>
        </Grid>
        {isfilterbyRange === "range" && (
          <>
            <Grid item={true} md={12} className="drawer_container__form__containerSelect">
              <p className="label">Del </p>
              <input
                type="date"
                className="drawer_container__form__containerSelect__calendarFrom"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
              />
            </Grid>
            <Grid item={true} md={12} className="drawer_container__form__containerSelect">
              <p className="label">Al </p>
              <input
                type="date"
                className="drawer_container__form__containerSelect__calendarTo"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
              />
            </Grid>
            <Fade in={true}>
              <Grid item={true} md={12} className="alert">
                <InfoOutlined className="alert__iconAlert" />
                <p className="alert__title">La Fecha de Inicio No puede ser Menor a la de Fin</p>
              </Grid>
            </Fade>
          </>
        )}

        <Grid item={true} md={12} className="drawer_container__form__containerSelect">
          <p className="label">Zona Geográfica </p>

          <Select
            className="drawer_container__form__containerSelect__select"
            placeholder="Estado"
            options={EntitiesLocal}
            onChange={e => {
              handleAddFilter({
                identifier: "entity",
                nameChip: e.label,
                nameChip: "Estado",
                value: e?.id ? e?.id : e?.value,
                nameValue: e.name,
              });
              getCities(e.id);
            }}
            isSearchable={false}
            getOptionValue={option => `${option["id"]}`}
            getOptionLabel={option => `${option.name} `}
          />
          <Select
            className="drawer_container__form__containerSelect__select"
            placeholder="Ciudad"
            options={city?.data}
            isLoading={city?.isLoading}
            onChange={e => {
              handleAddFilter({
                identifier: "city",
                nameChip: e.label,
                nameChip: "Ciudad",
                value: e?.id ? e?.id : e?.value,
                nameValue: e.name,
              });
            }}
            isSearchable={false}
            getOptionValue={option => `${option["id"]}`}
            getOptionLabel={option => `${option.name} `}
          />
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
    </DrawerContainerDemo>
  );
}
