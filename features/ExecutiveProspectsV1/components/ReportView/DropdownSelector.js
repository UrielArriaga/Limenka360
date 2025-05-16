import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDropDown } from "@material-ui/icons";

export default function DropdownSelector({
  options = [],
  onSelect,
  selected,
  placeholder = "Selecciona una opción",
}) {
  const [open, setOpen] = useState(false);

  const handleSelect = (item) => {
    onSelect(item);
    setOpen(false);
  };

  return (
    <Wrapper>
      <Selector onClick={() => setOpen(!open)}>
        <span>{selected?.label || placeholder}</span>
        <ArrowDropDown className="icon" />
      </Selector>

      <AnimatePresence>
        {open && (
          <Dropdown
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt) => (
              <Option key={opt.value} onClick={() => handleSelect(opt)}>
                {opt.label}
              </Option>
            ))}
          </Dropdown>
        )}
      </AnimatePresence>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
  min-width: 180px;
`;

const Selector = styled.div`
  background: rgb(152, 157, 161);
  padding: 8px 12px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #ffff;
  transition: background 0.2s;

  &:hover {
    background: #e3eaf0;
  }

  .icon {
    margin-left: 8px;
  }
`;

const Dropdown = styled(motion.div)`
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  background: white;
  border-radius: 8px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  z-index: 99;
  overflow: hidden;
`;

const Option = styled.div`
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.15s;
  color: #333;

  &:hover {
    background: rgba(0, 123, 255, 0.08);
  }
`;
