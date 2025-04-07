import { Chip } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { formatDate } from "../../../utils";

export default function ChipsLocalStorage({
  chips,
  searchNameOrEmail,
  setSearchNameOrEmail,
  setOrderTablePage,
  filters,
  setFilters,
  drawerFilters,
  setDrawerFilters,
  nameInLocalStorage,
  chipsText,
  setChipsText,
  savedChips,
}) {
  //Erased by spread filters of the drawer
  if (drawerFilters?.categoryId) {
    var { categoryId, ...withoutcategory } = drawerFilters;
  }
  if (drawerFilters?.originId) {
    var { originId, ...withoutorigin } = drawerFilters;
  }
  if (drawerFilters?.clientCompanyId) {
    var { clientCompanyId, ...withoutClientCompany } = drawerFilters;
  }
  if (drawerFilters?.clientTypeId) {
    var { clientTypeId, ...withoutclienttype } = drawerFilters;
  }
  if (drawerFilters?.specialtyId) {
    var { specialtyId, ...withoutspecialty } = drawerFilters;
  }
  if (drawerFilters?.gender) {
    var { gender, ...withoutgender } = drawerFilters;
  }
  if (drawerFilters?.createdAt) {
    var { createdAt, ...withoutdate } = drawerFilters;
  }
  if (drawerFilters?.ejecutiveId) {
    var { ejecutiveId, ...withoutejecutive } = drawerFilters;
  }

  //Borra la key colocada en el local storage
  const localStorageDelete = (key, valueLocalStorage) => {
    let obj = JSON.parse(localStorage.getItem(valueLocalStorage));
    delete obj[key];
    localStorage.setItem(valueLocalStorage, JSON.stringify(obj));
  };

  //Borrar la key del chipsText
  const chipsTextDelete = key => {
    let obj = chipsText;
    delete obj[key];
    setChipsText(obj);
  };

  return (
    <ChipsStyle>
      {searchNameOrEmail && chips?.phone && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setSearchNameOrEmail("");
          }}
          label={"Móvil: " + chips.phone}
          className="chip"
        />
      )}
      {searchNameOrEmail && chips?.email && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setSearchNameOrEmail("");
          }}
          label={"Correo: " + chips.email}
          className="chip"
        />
      )}
      {searchNameOrEmail && chips?.fullname && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setSearchNameOrEmail("");
          }}
          label={"Nombre: " + chips.fullname}
          className="chip"
        />
      )}
      {drawerFilters?.categoryId && filters.category && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutcategory);
            setFilters({ ...filters, category: "" });
          }}
          label={"Categoría: " + filters.category.name}
          className="chip"
        />
      )}
      {drawerFilters?.originId && filters.origin && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutorigin);
            setFilters({ ...filters, origin: "" });
          }}
          label={"Origen: " + filters.origin.name}
          className="chip"
        />
      )}
      {drawerFilters?.clientCompanyId && filters.company && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutClientCompany);
            setFilters({ ...filters, company: "" });
          }}
          label={"Empresa: " + filters.company.name}
          className="chip"
        />
      )}
      {drawerFilters?.clientTypeId && filters.clienttype && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutclienttype);
            setFilters({ ...filters, clienttype: "" });
          }}
          label={"Tipo de cliente: " + filters.clienttype.name}
          className="chip"
        />
      )}
      {drawerFilters?.specialtyId && filters.specialties && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutspecialty);
            setFilters({ ...filters, specialties: "" });
          }}
          label={"Especialidad: " + filters.specialties.name}
          className="chip"
        />
      )}
      {drawerFilters?.gender && filters.gender && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutgender);
            setFilters({ ...filters, gender: "" });
          }}
          label={"Genero: " + filters.gender.name}
          className="chip"
        />
      )}
      {chipsText?.date && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1);
            setDrawerFilters(withoutdate);
            setFilters({ ...filters, date: "" });
            localStorageDelete("createdAt", nameInLocalStorage);
            localStorageDelete("date", savedChips);
            chipsTextDelete("date")
          }}
          label={"Fecha De Creación: " + formatDate(chipsText?.date[0]) + " - " + formatDate(chipsText?.date[1])}
          className="chip"
        />
      )}
      {chipsText?.ejecutive && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setOrderTablePage(1); // *
            setDrawerFilters(withoutejecutive);
            setFilters({ ...filters, ejecutive: "" });
            localStorageDelete("ejecutiveId", nameInLocalStorage);
            localStorageDelete("ejecutive", savedChips);
            chipsTextDelete("ejecutive");
          }}
          label={"Ejecutivo: " + chipsText?.ejecutive}
          className="chip"
        />
      )}
    </ChipsStyle>
  );
}

const ChipsStyle = styled.div`
  height: 30px;
  margin-bottom: 10px;
  .chip {
    text-transform: capitalize;
    margin-right: 5px;
  }
`;
