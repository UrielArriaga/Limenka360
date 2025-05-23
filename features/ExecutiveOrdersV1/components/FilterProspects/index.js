import {
  Add,
  ArrowDropDown,
  ArrowUpward,
  ArrowDownward,
  Clear,
} from "@material-ui/icons";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

export default function FilterProspects({
  viewType,
  setViewType,
  onSearch,
  onOrder,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("Ordenar por:");
  const [orderBy, setOrderBy] = useState(null);
  const [orderDirection, setOrderDirection] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const dropdownRef = useRef();
  const options = [
    { label: "Estatus", value: "orderstatusId" },
    { label: "Fechas creación", value: "createdAt" },
    { label: "Fecha actualización", value: "updatedAt" },
  ];

  const handleSelect = (option) => {
    const newOrderDirection =
      orderDirection === "asc" && orderBy === option.value ? "desc" : "asc";
    setSelected(option.label);
    setOrderBy(option.value);
    setOrderDirection(newOrderDirection);
    setShowOptions(false);
    onOrder?.(option.value, newOrderDirection);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
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

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch?.(searchTerm);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, onSearch]);

  return (
    <FilterProspectsStyled ref={dropdownRef}>
      <div className="menutypes"></div>
      <div className="inputSearch">
        <input
          type="text"
          placeholder="Buscar por nombre"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
        />
        {searchTerm && (
          <Clear className="clearIcon" onClick={handleClearSearch} />
        )}
      </div>

      <div className="orderby">
        <button
          className="dropdownBtn"
          onClick={() => setShowOptions(!showOptions)}
        >
          {selected.startsWith("Ordenar por:")
            ? selected
            : `Ordenar por: ${selected}`}
          {orderBy && orderDirection === "asc" ? (
            <ArrowUpward style={{ marginLeft: 4, fontSize: "13px" }} />
          ) : orderBy && orderDirection === "desc" ? (
            <ArrowDownward style={{ marginLeft: 4, fontSize: "13px" }} />
          ) : (
            <ArrowDropDown />
          )}
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
              {options.map((opt, i) => {
                const nextOrderDirection =
                  orderDirection === "asc" && orderBy === opt.value
                    ? "desc"
                    : "asc";
                const directionIndicator =
                  nextOrderDirection === "asc" ? (
                    <ArrowUpward style={{ fontSize: "13px", marginLeft: 4 }} />
                  ) : (
                    <ArrowDownward
                      style={{ fontSize: "13px", marginLeft: 4 }}
                    />
                  );

                return (
                  <div
                    key={i}
                    className="dropdownItem"
                    onClick={() => handleSelect(opt)}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {opt.label}
                    {orderBy === opt.value && directionIndicator}
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </FilterProspectsStyled>
  );
}

const FilterProspectsStyled = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  /* padding: 16px; */
  position: relative;
  font-family: "Inter", sans-serif;
  margin-bottom: -5px;

  .inputSearch {
    position: relative;
    display: flex;
    align-items: center;
  }

  .inputSearch input {
    padding: 10px 14px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 13px;
    width: 250px;
    height: 34px;
    background: #fff;
    outline: none;
    transition: all 0.2s ease;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    padding-right: 35px;
  }

  .inputSearch input:focus {
    border-color: #999;
  }

  .clearIcon {
    position: absolute;
    right: 10px;
    color: #999;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: #666;
    }
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
    font-size: 13px;
    transition: background 0.2s;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    height: 34px;
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
    font-size: 13px;
    transition: background 0.2s;
    display: flex;
    justify-content: space-between;
    align-items: center;
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
      font-size: 13px;
      transition: background 0.2s;
    }
  }
`;
