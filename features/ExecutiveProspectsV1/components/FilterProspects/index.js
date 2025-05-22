import { IconButton } from '@material-ui/core';
import {
  Add,
  ArrowDropDown,
  Cached,
  ViewCarousel,
  ViewList,
  Assessment, // Informe
  CalendarToday, // Calendario
  Visibility, // Vista
} from '@material-ui/icons';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import SelectOrder from './SelectOrder';
import ButtonFilter from '../../../AdvancedFilters/components/common/ButtonFilter';
import FilterAdvanced from './../../../AdvancedFilters/AdvancedFilters';
import { filterClient, filtersprospects } from '../../constants';

const viewTypes = [
  { key: 'table', icon: <ViewList titleAccess="Kanban" /> },
  { key: 'kanban', icon: <ViewCarousel titleAccess="Tabla" /> },
  { key: 'calendar', icon: <CalendarToday titleAccess="Calendario" /> },
  { key: 'report', icon: <Assessment titleAccess="Informe" /> },
  { key: 'view', icon: <Visibility titleAccess="Vista" /> },
];

export default function FilterProspects({
  handleRefetch,
  viewType,
  setViewType,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isOpenFilterAdvanced, setIsOpenFilterAdvanced] = useState(false);

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [filters, setFilters] = useState([]);
  const [query, setQuery] = useState(null);

  console.log(query);

  return (
    <FilterProspectsStyled ref={dropdownRef}>
      <div className="left-group">
        <div className="add">
          <button className="addprospects">
            <Add /> Nuevo
          </button>
        </div>
        <ListDropdown />
        <div className="inputSearch">
          <SearchInput type="text" placeholder="Buscar prospecto..." />
        </div>

        <ButtonFilter
          numFilters={filters?.length}
          onClick={() => setIsOpenFilterAdvanced(true)}
        />

        <div className="refetch">
          <RefetchButton onClick={handleRefetch} title="Refrescar datos">
            <Cached />
          </RefetchButton>
        </div>
      </div>

      <div className="right-group">
        <div className="viewtype">
          {viewTypes.map(({ key, icon }) => (
            <ViewButton
              key={key}
              isActive={viewType === key}
              onClick={() => setViewType(key)}
            >
              {icon}
            </ViewButton>
          ))}
        </div>

        <SelectOrder />
      </div>

      <FilterAdvanced
        idFilter="prospects"
        isOpen={isOpenFilterAdvanced}
        TitleFilters="Filtro avanzados prospectos"
        setIsOpen={setIsOpenFilterAdvanced}
        filtersTypes={filtersprospects}
        onSave={setFilters}
        onWhere={setQuery}
      />
    </FilterProspectsStyled>
  );
}

const FilterProspectsStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;

  .left-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }

  .right-group {
    display: flex;
    align-items: center;
    gap: 16px;
  }

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

    border-radius: 8px;
  }

  .add {
    margin-left: auto;
    .addprospects {
      padding: 6px 8px;
      border: none;
      background: rgb(66, 136, 211);
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
const ViewButton = styled(IconButton)`
  border-radius: 0;
  /* background: ${({ isActive }) =>
    isActive ? 'rgba(7, 123, 248, 1)' : 'none'}; */
  /* color: ${({ isActive }) => (isActive ? '#007bff' : 'inherit')}; */

  background: ${({ isActive }) =>
    isActive ? 'rgba(14, 122, 238, 0.4) !important' : '#E5EAED !important'};
  border-radius: 4px !important;
  margin-right: 4px !important;
  padding: 4px !important;

  transition: background 0.2s, color 0.2s;

  &:hover {
    background: rgba(0, 123, 255, 0.08);
  }
`;
const RefetchButton = styled.button`
  background: #ffffff;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;

  svg {
    color: #007bff;
    font-size: 20px;
  }

  &:hover {
    background: #f0f4ff;
    border-color: #007bff;
  }

  &:active {
    transform: scale(0.97);
  }
`;

const SearchInput = styled.input`
  padding: 10px 14px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 14px;
  width: 320px;
  height: 40px;
  background: #fff;
  outline: none;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);

  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;
