import { ArrowDropDown } from "@material-ui/icons";
import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";

const options = [
  { name: "Nombre (ASC)", value: "-name" },
  { name: "Nombre (DESC)", value: "name" },
  {
    name: "Fecha de creación (ASC)",
    value: "-createdAt",
  },
  {
    name: "Fecha de creación (DESC)",
    value: "createdAt",
  },
  {
    name: "Fecha de último contacto (ASC)",
    value: "-lastContact",
  },
];

export default function SelectOrder() {
  const [showOptions, setShowOptions] = useState(false);
  const [selected, setSelected] = useState("Ordenar por: Nombre");

  const handleSelect = (option) => {
    setSelected(`Ordenar por: ${option.name}`);
    setShowOptions(false);
  };

  return (
    <SelectOrderStyled>
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
                {opt.name}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SelectOrderStyled>
  );
}

import styled from "styled-components";

const SelectOrderStyled = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  .dropdownMenu {
    position: absolute;
    top: 42px;
    left: 0;
    background: white;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
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
`;
