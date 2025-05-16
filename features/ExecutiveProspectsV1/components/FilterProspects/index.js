import { IconButton } from '@material-ui/core';
import {
  Add,
  ArrowDownward,
  ArrowDropDown,
  ArrowUpward,
  Cached,
  ViewCarousel,
  ViewList,
} from '@material-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SelectOrder from './SelectOrder';
import FilterAdvanced from './../../../AdvancedFilters/AdvancedFilters';
import Button from '@material-ui/core/Button';
import FilterListIcon from '@material-ui/icons/FilterList';
import { EntitiesLocal } from '../../../../BD/databd';
import ButtonFilter from '../../../AdvancedFilters/components/common/ButtonFilter';

const options = [
  { name: 'Nombre (ASC)', value: '-name' },
  { name: 'Nombre (DESC)', value: 'name' },
  {
    name: 'Fecha de creación (ASC)',
    value: '-createdAt',
  },
  {
    name: 'Fecha de creación (DESC)',
    value: 'createdAt',
  },
  {
    name: 'Fecha de último contacto (ASC)',
    value: '-lastContact',
  },
];

export default function FilterProspects({
  handleRefetch,
  viewType,
  setViewType,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState('Ordenar por: Nombre');
  const [sortDirection, setSortDirection] = useState('asc');

  const [showViewOptions, setShowViewOptions] = useState(false);
  const viewOptions = ['Tabla', 'Kanban'];

  const [isOpenFilterAdvanced, setIsOpenFilterAdvanced] = useState(false);

  const dropdownRef = useRef();

  const handleSelect = (option) => {
    setSelected(`Ordenar por: ${option.name}`);
    setShowOptions(false);
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [filters, setFilters] = useState();

  console.log(filters);

  return (
    <FilterProspectsStyled ref={dropdownRef}>
      <div className="menutypes"></div>
      <ListDropdown />

      <div className="inputSearch">
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="refetech">
        <button className="refetchBtn" onClick={() => handleRefetch()}>
          <Cached />
        </button>
      </div>

      <div className="viewtype">
        <IconButton
          onClick={() => setViewType('table')}
          style={{
            borderRadius: 0,
            background:
              viewType === 'table' ? 'rgba(0, 123, 255, 0.04)' : 'none',
            color: viewType === 'table' ? '#007bff' : 'inherit',
          }}
        >
          <ViewCarousel />
        </IconButton>
        <IconButton
          onClick={() => setViewType('kanban')}
          style={{
            borderRadius: 0,
            borderRadius: 0,
            background:
              viewType === 'kanban' ? 'rgba(0, 123, 255, 0.04)' : 'none',
            color: viewType === 'kanban' ? '#007bff' : 'inherit',
          }}
        >
          <ViewList />
        </IconButton>
      </div>

      <ButtonFilter
        numFilters={filters?.length}
        onClick={() => setIsOpenFilterAdvanced(true)}
      />

      <SelectOrder />

      <div className="add">
        <button className="addprospects">
          <Add /> Agregar Prospecto
        </button>
      </div>

      <FilterAdvanced
        isOpen={isOpenFilterAdvanced}
        TitleFilters="Filtro avanzados prospectos"
        setIsOpen={setIsOpenFilterAdvanced}
        filtersTypes={filterAdvancedOptionsProspects}
        onSave={setFilters}
      />
    </FilterProspectsStyled>
  );
}

const FilterProspectsStyled = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  /* padding: 16px; */
  position: relative;
  font-family: 'Inter', sans-serif;
  margin-bottom: 20px;
  /* height: 50px; */
  /* border: 1px solid red; */

  .inputSearch input {
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    width: 420px;
    height: 40px;
    background: #fff;
    outline: none;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }

  .inputSearch input:focus {
    border-color: #999;
  }

  .orderby {
    position: relative;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .dropdownBtn {
    padding: 10px 14px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    transition: background 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    height: 40px;
  }

  .dropdownBtn:hover {
    background: #f5f5f5;
  }

  .sortDirectionBtn {
    padding: 8px;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    height: 40px;
    width: 40px;

    &:hover {
      background: #f5f5f5;
    }
  }

  .dropdownMenu {
    position: absolute;
    top: 42px;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 220px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
    z-index: 1000;
    overflow: hidden;
  }

  .dropdownItem {
    padding: 10px 14px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.2s;
  }

  .dropdownItem:hover {
    background: #f0f0f0;
  }

  .viewtype {
    position: relative;
  }

  .add {
    margin-left: auto;
    .addprospects {
      padding: 10px 14px;
      border: none;
      background: #007bff;
      color: white;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      transition: background 0.2s;
    }
  }
`;

// import React, { useState, useRef, useEffect } from "react";
// import styled from "styled-components";
// import { motion, AnimatePresence } from "framer-motion";
// import { Add, ArrowDropDown } from "@material-ui/icons";
// import { FiSearch } from "react-icons/fi";

function ListDropdown() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('Todos los prospectos');
  const dropdownRef = useRef();

  const defaultLists = ['Solution Open Deals', 'My All Deals'];
  const myLists = [
    'Todos los prospectos',
    'Ultimo seguimiento hace 5 dias',
    'Prospectos reasignados',
  ];

  const filteredLists = myLists.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={() => setOpen(!open)}>
        <span>{selected}</span>
        <ArrowDropDown />
      </DropdownHeader>

      <AnimatePresence>
        {open && (
          <DropdownMenu
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="dropdown-top">
              <h4>Selecciona una opcion</h4>
              <button className="add-btn">
                <Add />
              </button>
            </div>

            <div className="searchbar">
              <Add size={16} />
              <input
                type="text"
                placeholder="Buscar accesso rapido"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            {/* <div className="section">
              {defaultLists.map((item, i) => (
                <div
                  key={i}
                  className="item"
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div> */}

            <h5>Accesos rapidos</h5>
            <div className="section scroll">
              {filteredLists.map((item, i) => (
                <div
                  key={i}
                  className="item"
                  onClick={() => {
                    setSelected(item);
                    setOpen(false);
                  }}
                >
                  {item}
                </div>
              ))}
            </div>
          </DropdownMenu>
        )}
      </AnimatePresence>
    </DropdownContainer>
  );
}

const DropdownContainer = styled.div`
  position: relative;
  width: 260px;
  font-family: 'Inter', sans-serif;
`;

const DropdownHeader = styled.button`
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #ccc;
  background: #fff;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  height: 40px;

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownMenu = styled(motion.div)`
  position: absolute;
  top: 50px;
  width: 100%;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 8px;
  z-index: 1000;
  padding: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);

  .dropdown-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    h4 {
      font-size: 14px;
      margin: 0;
    }

    .add-btn {
      background: #eef2f7;
      border: none;
      border-radius: 4px;
      padding: 4px;
      cursor: pointer;
    }
  }

  .searchbar {
    margin: 10px 0;
    display: flex;
    align-items: center;
    background: #f5f5f5;
    border-radius: 8px;
    padding: 6px 10px;
    input {
      border: none;
      background: transparent;
      outline: none;
      margin-left: 8px;
      width: 100%;
      font-size: 14px;
    }
  }

  h5 {
    font-size: 13px;
    margin: 8px 0 4px;
    color: #666;
  }

  .section {
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 150px;
    overflow-y: auto;

    .item {
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      cursor: pointer;
      transition: background 0.2s;

      &:hover {
        background: #f0f0f0;
      }
    }
  }
`;

const AdvancedFiltersButton = styled.button`
  border-radius: 50%;
  padding: 8px;
  border: none;
  background-color: #f3f0ff;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  & svg {
    color: #862e9c;
  }
`;
// filtro de
export const filterAdvancedOptionsProspects = [
  {
    label: 'Fecha de creación',
    value: 'createdAt1',
    // type: 'date1',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
      { label: 'Igual', value: 'igual' },
    ],
  },
  {
    label: 'Fecha de ultimo seguimiento',
    value: 'createdAt2',
    // type: 'date2',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
      { label: 'Igual', value: 'igual' },
    ],
  },
  {
    label: 'Fecha de actualización',
    value: 'createdAt3',
    // type: 'date3',
    custom: true,
    customOptions: [
      { value: 'Hoy', label: 'Hoy' },
      { value: 'Semana', label: 'Semana' },
      { value: 'Mes', label: 'Mes' },
      { label: 'Rango', value: 'range', special: 'range' },
    ],
    operators: [
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
      { label: 'Igual', value: 'igual' },
    ],
  },
  {
    label: 'Licitante',
    value: 'bidder',
    // type: 'bidder',
    custom: true,
    customOptions: [
      { label: 'Licitantes', value: 'true' },
      { label: 'No Licitantes', value: 'false' },
    ],
    operators: [
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
      { label: 'Igual', value: 'igual' },
    ],
  },
  {
    label: 'Zona geografica',
    value: 'entitiesLocal',
    // type: 'entitiesLocal',
    custom: true,
    customOptions: EntitiesLocal.map((entity) => ({
      value: entity.id,
      label: entity.name,
    })),
    virtualConfig: {
      custom: false,
      label: 'Ciudades',
      value: 'cities',
      valuedbIdName: 'id',
      valuedbFieldName: 'name',
    },
    operators: [
      { label: 'Mayor que', value: 'mayor_que' },
      { label: 'Menor que', value: 'menor_que' },
      { label: 'Igual', value: 'igual' },
    ],
  },
  {
    label: 'Proveedor',
    value: 'providers',
    valuedbIdName: 'id',
    valuedbFieldName: 'fullname',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
  {
    label: 'Origen',
    value: 'origins',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
  {
    label: 'Categoría de interes',
    value: 'categories',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
  {
    label: 'Fase',
    value: 'phases',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
  // {
  //   label: 'Compañias',
  //   value: 'clientsCompanies',
  //   valuedbIdName: 'id',
  //   valuedbFieldName: 'companyname',
  //   custom: false,
  //   customOptions: [],
  //   operators: [
  //     { label: 'Es igual a', value: 'igual' },
  //     { label: 'No es igual a', value: 'no_igual' },
  //     { label: 'Contiene', value: 'contiene' },
  //   ],
  // },
  {
    label: 'Tipo de clientes',
    value: 'clientTypes',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
  {
    label: 'Especialidades',
    value: 'specialties',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
  {
    label: 'Canales',
    value: 'channels',
    valuedbIdName: 'id',
    valuedbFieldName: 'name',
    custom: false,
    customOptions: [],
    operators: [
      { label: 'Es igual a', value: 'igual' },
      { label: 'No es igual a', value: 'no_igual' },
      { label: 'Contiene', value: 'contiene' },
    ],
  },
];
