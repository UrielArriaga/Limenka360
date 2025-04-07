import { Chip } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { formatDate, formatDateToISO } from "../../../../utils";

export default function ChipsPayments({
  filters,
  setFilters,
  recharge,
  setRecharge,
  showNameSearch,
  setShowNameSearch,
  setNameSearch,
  drawerFilters,
  setDrawerFilters,
}) {
  //Borra el filtro con desestructuración de objeto (se usa var porque es global)
  if (typeof drawerFilters?.ispaid === "boolean") {
    var { ispaid, ...withoutispaid } = drawerFilters;
  }
  if (drawerFilters?.ejecutive) {
    var { ejecutive, ...withoutejecutive } = drawerFilters;
  }
  //phaseoportunity **Nota: el filtro estra dentro de oportunity
  if (drawerFilters?.oportunity?.phaseId) {
    var { phaseId, ...withoutphaseoportunity } = drawerFilters.oportunity;
  }
  //phaseprospect **Nota: el filtro estra dentro de oportunity
  if (drawerFilters?.oportunity?.prospect) {
    var { prospect, ...withoutphaseprospect } = drawerFilters.oportunity;
  }
  if (drawerFilters?.date) {
    var { date, ...withoutdate } = drawerFilters;
  }
  if (drawerFilters?.createdAt) {
    var { createdAt, ...withoutcreatedat } = drawerFilters;
  }

  const deleteOnlyTheExecutive = () => {
    let deleteOE = drawerFilters;
    deleteOE.ejecutiveId.pop();
    return deleteOE;
  };

  const deleteOnlyTheGroup = () => {
    let deleteOG = drawerFilters;
    let lastId = deleteOG.ejecutiveId.pop();
    deleteOG.ejecutiveId = lastId;
    return deleteOG;
  };

  return (
    <ChipsStyle>
      {filters.ejecutive && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setDrawerFilters(filters.group ? deleteOnlyTheExecutive : withoutejecutive);
            setFilters({ ...filters, ejecutive: "" });
            setRecharge(!recharge);
          }}
          label={`Pagos del ejecutivo: ${filters.ejecutive.fullname}`}
          className="chip"
        />
      )}
      {filters.group && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setDrawerFilters(filters.ejecutive ? deleteOnlyTheGroup : withoutejecutive);
            setFilters({ ...filters, group: "" });
            setRecharge(!recharge);
          }}
          label={`Grupo: ${filters.group.name}`}
          className="chip"
        />
      )}
      {filters.ispaid && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            console.log("Chip paid", withoutispaid);
            setDrawerFilters(withoutispaid);
            setFilters({ ...filters, ispaid: "" });
            setRecharge(!recharge);
          }}
          label={`Estatus: ${filters.ispaid.name}`}
          className="chip"
        />
      )}
      {filters.phaseoportunity && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setDrawerFilters({ ...drawerFilters, oportunity: withoutphaseoportunity });
            setFilters({ ...filters, phaseoportunity: "" });
            setRecharge(!recharge);
          }}
          label={`Fase Oportunidad: ${filters.phaseoportunity.name}`}
          className="chip"
        />
      )}
      {filters.phaseprospect && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setDrawerFilters({ ...drawerFilters, oportunity: withoutphaseprospect });
            setFilters({ ...filters, phaseprospect: "" });
            setRecharge(!recharge);
          }}
          label={`Fase Prospecto: ${filters.phaseprospect.name}`}
          className="chip"
        />
      )}
      {showNameSearch.active && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setNameSearch("");
            setShowNameSearch({
              ...showNameSearch,
              active: false,
              name: "",
            });
            setRecharge(!recharge);
          }}
          label={`Nombre: ${showNameSearch.name}`}
          className="chip"
        />
      )}
      {filters.date && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setDrawerFilters(withoutdate);
            setFilters({ ...filters, date: "", datestart: "", datefinish: "" });
            setRecharge(!recharge);
          }}
          label={`Fecha límite  ${filters.date.name} ${
            filters.date.name == "Rango"
              ? (filters.datestart && formatDate(formatDateToISO(filters.datestart))) +
                " - " +
                (filters.datefinish && formatDate(formatDateToISO(filters.datefinish)))
              : ""
          }`}
          className="chip"
        />
      )}
      {filters.soldin && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setDrawerFilters(withoutcreatedat);
            setFilters({ ...filters, soldin: "", soldinstart: "", soldinfinish: "" });
            setRecharge(!recharge);
          }}
          label={`Se vendio ${filters.soldin.name} ${
            filters.soldin.name == "Rango"
              ? (filters.soldinstart && formatDate(formatDateToISO(filters.soldinstart))) +
                " - " +
                (filters.soldinfinish && formatDate(formatDateToISO(filters.soldinfinish)))
              : ""
          }`}
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
