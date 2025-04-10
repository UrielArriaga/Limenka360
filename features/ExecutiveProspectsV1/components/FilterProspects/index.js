import {
  Add,
  ArrowDropDown,
  Dashboard,
  TableChart,
  ViewCarousel,
  ViewList,
} from "@material-ui/icons";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { IconButton } from "@material-ui/core";

export default function FilterProspects() {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("Ordenar por: Nombre");
  const [viewType, setViewType] = useState("Vista: Tabla");
  const [showViewOptions, setShowViewOptions] = useState(false);
  const viewOptions = ["Tabla", "Kanban"];

  const dropdownRef = useRef();

  const options = [
    "Nombre",
    "Correo",
    "Teléfono",
    "Fecha de creación",
    "Último contacto",
    "Fuente",
    "Estado",
  ];

  const handleSelect = (option) => {
    setSelected(`Ordenar por: ${option}`);
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <FilterProspectsStyled ref={dropdownRef}>
      <div className="menutypes"></div>
      <ListDropdown />

      <div className="inputSearch">
        <input type="text" placeholder="Buscar" />
      </div>

      <div className="viewtype">
        <IconButton
          style={{
            borderRadius: 0,
            background: "rgba(0, 123, 255, 0.04)",
            color: "#007bff",
          }}
        >
          <ViewCarousel />
        </IconButton>

        <IconButton
          style={{
            borderRadius: 0,
          }}
        >
          <ViewList />
        </IconButton>
      </div>

      {/* <div className="viewtype">
        <button
          className="dropdownBtn"
          onClick={() => setShowViewOptions(!showViewOptions)}
        >
          {viewType} <ArrowDropDown />
        </button>



        <AnimatePresence>
          {showViewOptions && (
            <motion.div
              className="dropdownMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {viewOptions.map((opt, i) => (
                <div
                  key={i}
                  className="dropdownItem"
                  onClick={() => {
                    setViewType(`Vista: ${opt}`);
                    setShowViewOptions(false);
                  }}
                >
                  {opt}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div> */}

      <div className="orderby">
        <button
          className="dropdownBtn"
          onClick={() => setShowOptions(!showOptions)}
        >
          {selected} <ArrowDropDown />
        </button>

        <AnimatePresence>
          {showOptions && (
            <motion.div
              className="dropdownMenu"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {options.map((opt, i) => (
                <div
                  key={i}
                  className="dropdownItem"
                  onClick={() => handleSelect(opt)}
                >
                  {opt}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="add">
        <button className="addprospects">
          <Add /> Agregar Prospecto
        </button>
      </div>
    </FilterProspectsStyled>
  );
}

const FilterProspectsStyled = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  /* padding: 16px; */
  position: relative;
  font-family: "Inter", sans-serif;
  margin-bottom: 40px;

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
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState("All Deals");
  const dropdownRef = useRef();

  const defaultLists = ["Solution Open Deals", "My All Deals"];
  const myLists = [
    "Security Solutions",
    "Closed Opps",
    "My Security Solutions",
    "Inside Sales",
    "Open Opps",
    "Open Opportunities",
    "Solution Open Deals",
    "Open Deals - Solution",
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

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              <h4>Select List or Tag</h4>
              <button className="add-btn">
                <Add />
              </button>
            </div>

            <div className="searchbar">
              <Add size={16} />
              <input
                type="text"
                placeholder="Search for lists and tags"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>

            <div className="section">
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
            </div>

            <h5>My Lists</h5>
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
  font-family: "Inter", sans-serif;
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
