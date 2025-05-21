import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";

import {
  Add,
  ArrowDropDown,
  Cached,
  ViewCarousel,
  ViewList,
  Assessment, // Informe
  CalendarToday, // Calendario
  Visibility,
  Clear, // Vista
} from "@material-ui/icons";
import { IconButton } from "@material-ui/core";
import ListDropdown from "../../../../componentx/ListDropdown";

export default function HeaderSearch() {
  return (
    <HeaderSearchStyled>
      <div className="left-group">
        <div className="add">
          <button className="addprospects">
            <Add /> Nuevo
          </button>
        </div>
        <ListDropdown />

        <div className="inputSearch">
          <SearchInput
            // value={inputStates.keyword}
            // onChange={(e) => inputStates.handleOnChangeKeyword(e)}
            // onKeyDown={(e) => inputStates.handleOnEnterInput(e)}
            type="text"
            placeholder="Buscar prospecto..."
          />

          {"".length > 0 && (
            <IconButton
              size="small"
              //   onClick={() =>
              // inputStates.handleOnChangeKeyword({ target: { value: "" } })
              //   }
              style={{ position: "absolute", right: "5px" }}
            >
              <Clear fontSize="small" />
            </IconButton>
          )}
        </div>

        <div className="refetch">
          <RefetchButton title="Refrescar datos">
            <Cached />
          </RefetchButton>
        </div>
      </div>
    </HeaderSearchStyled>
  );
}

const HeaderSearchStyled = styled.div`
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

  .inputSearch {
    position: relative;
    display: flex;
    align-items: center;
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

const ViewButton = styled(IconButton)`
  border-radius: 0;
  /* background: ${({ isActive }) =>
    isActive ? "rgba(7, 123, 248, 1)" : "none"}; */
  /* color: ${({ isActive }) => (isActive ? "#007bff" : "inherit")}; */

  background: ${({ isActive }) =>
    isActive ? "rgba(14, 122, 238, 0.4) !important" : "#E5EAED !important"};
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
  position: relative;
  &::placeholder {
    color: #888;
  }

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.15);
  }
`;
