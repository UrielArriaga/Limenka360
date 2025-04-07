import React, { useState } from "react";
import { EmptyDrawerRoundEdges } from "../atoms/EmptyDrawerRoundEdges";
import { Button } from "@material-ui/core";
import { getDataDay, getDataDaysMonth, getDataDaysWeek } from "../../../utils";
import SelectForFilters from "./SelectForFilters/SelectForFilters";

export default function DrawerWithFilters({ openDrawer, setopenDrawer, setDrawerFilters, filters, setFilters }) {
  //For the date range
  const [dateStart, setDateStart] = useState("");
  const [dateFinish, setDateFinish] = useState("");
  //Funciones para guardar en filters para el componenteSelectForFilters
  const setCategory = newCategory => {
    setFilters({ ...filters, category: newCategory });
  };
  const setOrigin = newOrigin => {
    setFilters({ ...filters, origin: newOrigin });
  };
  const setCompany = newCompany => {
    setFilters({ ...filters, company: newCompany });
  };
  const setClienttype = newClienttype => {
    setFilters({ ...filters, clienttype: newClienttype });
  };
  const setSpecialties = newSpecialties => {
    setFilters({ ...filters, specialties: newSpecialties });
  };
  const setGender = newGender => {
    setFilters({ ...filters, gender: newGender });
  };
  const setDate = newDate => {
    setFilters({ ...filters, date: newDate });
  };

  //Funcion para aplicar los filtros al where
  const applyFilters = () => {
    //Hay que normalizar los datos para aplicarlos al where
    let normalizeWhere;
    if (filters.category) {
      normalizeWhere = { ...normalizeWhere, categoryId: filters.category.id };
    }
    if (filters.origin) {
      normalizeWhere = { ...normalizeWhere, originId: filters.origin.id };
    }
    if (filters.company) {
      normalizeWhere = { ...normalizeWhere, clientCompanyId: filters.company.id };
    }
    if (filters.clienttype) {
      normalizeWhere = { ...normalizeWhere, clientTypeId: filters.clienttype.id };
    }
    if (filters.specialties) {
      normalizeWhere = { ...normalizeWhere, specialtyId: filters.specialties.id };
    }
    if (filters.gender) {
      normalizeWhere = { ...normalizeWhere, gender: filters.gender.id };
    }
    switch (filters.date.id) {
      case "day":
        normalizeWhere = { ...normalizeWhere, createdAt: { between: getDataDay(new Date()) } };
        break;
      case "week":
        normalizeWhere = { ...normalizeWhere, createdAt: { between: getDataDaysWeek(new Date()) } };
        break;
      case "month":
        normalizeWhere = { ...normalizeWhere, createdAt: { between: getDataDaysMonth(new Date()) } };
        break;
      case "range":
        if (dateStart < dateFinish) {
          normalizeWhere = { ...normalizeWhere, createdAt: { between: [dateStart, dateFinish] } };
        }
        break;
      default:
        break;
    }
    console.log("Datos normalizados para el where: ", normalizeWhere);
    setDrawerFilters(normalizeWhere);
  };

  return (
    <EmptyDrawerRoundEdges anchor="right" open={openDrawer} onClose={() => setopenDrawer(false)}>
      <div className="ctr_drawer">
        <div className="ctr_drawer__top">
          <p className="title" onClick={() => console.log("Valores de filtros: ", filters)}>
            Filtra por tu preferencia
          </p>
        </div>
       <SelectForFilters
          selectTitle={"Fecha De Creación"}
          setSaveSelection={setDate}
          selectedFilter={filters.date}
          dateStart={dateStart}
          setDateStart={setDateStart}
          dateFinish={dateFinish}
          setDateFinish={setDateFinish}
          dataForOptions={[
            { name: "Hoy", id: "day" },
            { name: "Semana", id: "week" },
            { name: "Mes", id: "month" },
            { name: "Rango", id: "range" },
          ]}
        />
       <SelectForFilters
          route={"categories"}
          selectTitle={"Categoría de interés"}
          setSaveSelection={setCategory}
          selectedFilter={filters.category}
        />
       <SelectForFilters
          route={"origins"}
          selectTitle={"Origen"}
          setSaveSelection={setOrigin}
          selectedFilter={filters.origin}
        />
       <SelectForFilters
          route={"clientscompanies"}
          selectTitle={"Empresa"}  
          setSaveSelection={setCompany}
          selectedFilter={filters.company}
        />
       <SelectForFilters
          route={"clienttypes"}
          selectTitle={"Tipo de cliente"}
          setSaveSelection={setClienttype}
          selectedFilter={filters.clienttype}
        />
       <SelectForFilters
          route={"specialties"}
          selectTitle={"Especialidad"}
          setSaveSelection={setSpecialties}
          selectedFilter={filters.specialties}
        />
       <SelectForFilters
          selectTitle={"Genero"}
          setSaveSelection={setGender}
          selectedFilter={filters.gender}
          dataForOptions={[
            { name: "Hombre", id: "Hombre" },
            { name: "Mujer", id: "Mujer" },
          ]}
        />
        <div className="ctr_drawer__ctr_buttons">
          <Button variant="contained" className="btn_cancel" onClick={() => setopenDrawer(false)}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="btn_apply"
            onClick={() => {
              applyFilters();
              setopenDrawer(false);
            }}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </EmptyDrawerRoundEdges>
  );
}
