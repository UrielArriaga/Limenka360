import { Button } from "@material-ui/core";
import React from "react";
import { EmptyDrawerRoundEdges } from "../../atoms/EmptyDrawerRoundEdges";
import SelectForFilters from "../SelectForFilters/SelectForFilters";
import { useSelector } from "react-redux";
import { userSelector } from "../../../../redux/slices/userSlice";
import { currentMonth, getDataDay, getDataDaysWeek } from "../../../../utils";
import { api } from "../../../../services/api";


export default function DrawerPayments({
  filters,
  setFilters,
  showFilters,
  closeDrawerFilters,
  cancelFilters,
  setDrawerFilters,
}) {
  const { roleId } = useSelector(userSelector);
  //Funciones para guardar en filters para el componenteSelectForFilters
  const setIsPaid = newIsPaid => {
    setFilters({ ...filters, ispaid: newIsPaid });
  };
  const setPhaseOportunity = newPhaseOportunity => {
    setFilters({ ...filters, phaseoportunity: newPhaseOportunity });
  };
  const setPhaseProspect = newPhaseProspect => {
    setFilters({ ...filters, phaseprospect: newPhaseProspect });
  };
  const setDate = newDate => {
    setFilters({ ...filters, date: newDate });
  };
  const setDateStart = newDateStart => {
    setFilters({ ...filters, datestart: newDateStart });
  };
  const setDateFinish = newDatefinish => {
    setFilters({ ...filters, datefinish: newDatefinish });
  };
  const setSoldIn = newSoldIn => {
    setFilters({ ...filters, soldin: newSoldIn });
  };
  const setSoldInStart = newsoldInStart => {
    setFilters({ ...filters, soldinstart: newsoldInStart });
  };
  const setSoldInFinish = newSoldInFinish => {
    setFilters({ ...filters, soldinfinish: newSoldInFinish });
  };
  const setEjecutive = newEjecutive => {
    setFilters({ ...filters, ejecutive: newEjecutive });
  };
  const setGroup = newGroup => {
    setFilters({ ...filters, group: newGroup });
  };

  const getGroupExecutives = async groupId => {
    let params = { where: { groupId: groupId }, keys: "id", all: "1" };
    let res = await api.get("/ejecutives", { params });
    return res.data.results.map(item => item.id);
  };

  //Funcion para aplicar los filtros al where
  const applyFilters = async () => {
    let normalizeWhere;

    if (filters.ejecutive && filters.group) {
      let ejecutiveId = await getGroupExecutives(filters.group.id);
      ejecutiveId.push(filters.ejecutive.id);
      normalizeWhere = { ...normalizeWhere, ejecutiveId: ejecutiveId };
    } else {
      if (filters.ejecutive) {
        normalizeWhere = { ...normalizeWhere, ejecutiveId: filters.ejecutive.id };
      }
      if (filters.group) {
        normalizeWhere = { ...normalizeWhere, ejecutiveId: await getGroupExecutives(filters.group.id) };
      }
    }

    if (filters.ispaid) {
      normalizeWhere = { ...normalizeWhere, ispaid: filters.ispaid.id };
    }

    //Filtros anidados
    if (filters.phaseprospect && filters.phaseoportunity) {
      normalizeWhere = {
        ...normalizeWhere,
        oportunity: { prospect: { phaseId: filters.phaseprospect.id }, phaseId: filters.phaseoportunity.id },
      };
    } else {
      if (filters.phaseprospect) {
        normalizeWhere = { ...normalizeWhere, oportunity: { prospect: { phaseId: filters.phaseprospect.id } } };
      }
      if (filters.phaseoportunity) {
        normalizeWhere = { ...normalizeWhere, oportunity: { phaseId: filters.phaseoportunity.id } };
      }
    }

    switch (filters.date.id) {
      case "day":
        normalizeWhere = { ...normalizeWhere, date: { between: getDataDay(new Date()) } };
        break;
      case "week":
        normalizeWhere = { ...normalizeWhere, date: { between: getDataDaysWeek(new Date()) } };
        break;
      case "month":
        normalizeWhere = { ...normalizeWhere, date: { between: currentMonth() } };
        break;
      case "range":
        if (filters.datestart < filters.datefinish) {
          normalizeWhere = { ...normalizeWhere, date: { between: [filters.datestart, filters.datefinish] } };
        }
        break;
      default:
        break;
    }
    switch (filters.soldin.id) {
      case "day":
        normalizeWhere = { ...normalizeWhere, createdAt: { between: getDataDay(new Date()) } };
        break;
      case "week":
        normalizeWhere = { ...normalizeWhere, createdAt: { between: getDataDaysWeek(new Date()) } };
        break;
      case "month":
        normalizeWhere = { ...normalizeWhere, createdAt: { between: currentMonth() } };
        break;
      case "range":
        if (filters.soldinstart < filters.soldinfinish) {
          normalizeWhere = { ...normalizeWhere, createdAt: { between: [filters.soldinstart, filters.soldinfinish] } };
        }
        break;
      default:
        break;
    }

    console.log("Datos normalizados para el where: ", normalizeWhere);
    setDrawerFilters(normalizeWhere);
  };

  return (
    <EmptyDrawerRoundEdges anchor="right" open={showFilters} onClose={closeDrawerFilters}>
      <div className="ctr_drawer">
        <div className="ctr_drawer__top">
          <p className="title">Filtra por tu preferencia</p>
        </div>

       <SelectForFilters
          selectTitle={"Fecha límite"}
          setSaveSelection={setDate}
          selectedFilter={filters.date}
          dateStart={filters.datestart}
          setDateStart={setDateStart}
          dateFinish={filters.datefinish}
          setDateFinish={setDateFinish}
          dataForOptions={[
            { name: "Hoy", id: "day" },
            { name: "Semana", id: "week" },
            { name: "Mes", id: "month" },
            { name: "Rango", id: "range" },
          ]}
        />

       <SelectForFilters
          selectTitle={"Se vendio en"}
          setSaveSelection={setSoldIn}
          selectedFilter={filters.soldin}
          dateStart={filters.soldinstart}
          setDateStart={setSoldInStart}
          dateFinish={filters.soldinfinish}
          setDateFinish={setSoldInFinish}
          dataForOptions={[
            { name: "Hoy", id: "day" },
            { name: "Semana", id: "week" },
            { name: "Mes", id: "month" },
            { name: "Rango", id: "range" },
          ]}
        />

        {(roleId == "gerente" || roleId == "director") && (
         <SelectForFilters
            selectTitle={"Ejecutivo"}
            setSaveSelection={setEjecutive}
            selectedFilter={filters.ejecutive}
            fullname={true}
            route={"ejecutives"}
          />
        )}

        {roleId == "director" && (
         <SelectForFilters
            selectTitle={"Grupo"}
            setSaveSelection={setGroup}
            selectedFilter={filters.group}
            route={"groups"}
          />
        )}

       <SelectForFilters
          selectTitle={"Estatus del Pago"}
          setSaveSelection={setIsPaid}
          selectedFilter={filters.ispaid}
          dataForOptions={[
            { name: "Pagado", id: true },
            { name: "Pendiente", id: false },
          ]}
        />

        {/*<SelectForFilters
          selectTitle={"Fase Oportunidad"}
          setSaveSelection={setPhaseOportunity}
          selectedFilter={filters.phaseoportunity}
          route={"phases"}
        />

       <SelectForFilters
          selectTitle={"Fase Prospecto"}
          setSaveSelection={setPhaseProspect}
          selectedFilter={filters.phaseprospect}
          route={"phases"}
        /> */}

        <div className="ctr_drawer__ctr_buttons">
          <Button
            variant="contained"
            className="btn_cancel"
            onClick={() => {
              closeDrawerFilters();
            }}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            className="btn_apply"
            onClick={() => {
              cancelFilters();
              applyFilters();
            }}
          >
            Aplicar
          </Button>
        </div>
      </div>
    </EmptyDrawerRoundEdges>
  );
}
