// Para filtros simples solo id y name (companyname)
// Para usar el compoente
// <SelectForFilters
//      route={"clientscompanies"} ruta para llenar los select, puedes usar dataForOptions={datos} si ya tienes los datos
//      selectTitle={"Empresa"}  titulo
//      setSaveSelection={setCompany} fucion para guardar la seleccion
//      selectedFilter={filters.company} filtros para aplicar "where"
//      fullname={true} **cuando necesites usar fullname en lugar de name, normamamente en nombres de ejecutivos
// />
//
// Ejemplo de un setSaveSelection (setCompany)
// const setCompany = newCompany => {
//   setFilters({ ...filters, company: newCompany });
// };

import Select from "react-select";
import { api } from "../../../../services/api";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export default function SelectForFilters({
  selectTitle,
  route,
  setSaveSelection,
  selectedFilter,
  dataForOptions,
  dateStart,
  setDateStart,
  dateFinish,
  setDateFinish,
  fullname,
}) {
  const [options, setOptions] = useState();

  useEffect(() => {
    //Cuando se manda una ruta hace una petición
    if (route) {
      get();
    }
    //Cuando se mandan las opciones por props las asigna a options
    if (dataForOptions) {
      setOptions(dataForOptions);
    }
  }, []);

  const get = async () => {
    let params = { all: "1" };
    let res = await api.get(route, { params });
    setOptions(res.data.results);
  };

  return (
    <div className="ctr_drawer__ctr_inputs">
      <div className="ctr_drawer__ctr_inputs__input">
        <label className="label">{selectTitle}</label>
        <SelectStyle>
          <Select
            placeholder="Selecciona una opción"
            onChange={e =>
              e === null
                ? setSaveSelection("")
                : setSaveSelection({ id: e.id, name: e.name ? e.name : e.companyname, fullname: e.fullname })
            }
            isClearable={true}
            value={selectedFilter}
            options={options}
            getOptionValue={options => `${options.id}`}
            getOptionLabel={options =>
              `${fullname ? options.fullname : options.name ? options.name : options.companyname}`
            }
          />
        </SelectStyle>
      </div>
      {selectedFilter?.name === "Rango" && (
        <div className="ctr_drawer__ctr_inputs__input">
          <div className="dateOne">
            <label className="label">Fecha Inicio</label>
            <input
              className="input"
              type="date"
              value={dateStart}
              onChange={e => {
                setDateStart(e.target.value);
              }}
            />
          </div>
          <div className="dateTwo">
            <label className="label">Fecha Termino </label>
            <input
              className="input"
              type="date"
              value={dateFinish}
              onChange={e => {
                setDateFinish(e.target.value);
              }}
            />
          </div>
          {dateFinish !== "" && dateFinish < dateStart && (
            <p className="label red_text">La fecha Final del Rango no puede ser Menor a la Inicial.</p>
          )}
          {dateStart == dateFinish && (
            <p className="label red_text">No hay un rango de fechas, selecciona otro periodo diferente.</p>
          )}
        </div>
      )}
    </div>
  );
}

const SelectStyle = styled.div`
  text-transform: capitalize;
`;