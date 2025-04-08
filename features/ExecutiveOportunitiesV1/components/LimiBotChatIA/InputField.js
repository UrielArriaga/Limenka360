import React from "react";
import ReactSelect from "react-select";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";
import { useSelector } from "react-redux";
import { commonSelector } from "../../../../redux/slices/commonSlice";

export default function InputField({ type, itemToUpdate, setfieldToUpdate }) {
  const { getCatalogBy } = useGlobalCommons();
  const commonValues = useSelector(commonSelector);
  if (type === "text") {
    return (
      <input
        className="inputItemData"
        placeholder="Nombre"
        value={itemToUpdate.value}
        autoFocus
        onBlur={() => {
          let isConfirm = window.confirm("¿Desea guardar los cambios?");

          setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
        }}
        onChange={e => setfieldToUpdate({ ...itemToUpdate, value: e.target.value })}
        onKeyDown={e => {
          if (e.key === "Enter") {
            let isConfirm = window.confirm("¿Desea guardar los cambios?");
            if (!isConfirm) return;

            setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
          }
        }}
      />
    );
  } else {
    return (
      <ReactSelect
        className="reactSelect"
        placeholder={"Selecciona una opcion"}
        onMenuOpen={() => getCatalogBy(itemToUpdate.id)}
        options={commonValues[itemToUpdate.id]?.results}
        isLoading={commonValues[itemToUpdate?.id]?.isFetching}
        getOptionValue={option => `${option["id"]}`}
        getOptionLabel={option => option["name"]}
        onBlur={() => {
          if (itemToUpdate.value === itemToUpdate.currentValue) {
            setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
            return;
          }
          let isConfirm = window.confirm("¿Desea guardar los cambios?");

          setfieldToUpdate({ value: "", currentValue: "", identifier: "" });
        }}
        styles={selectStyle}
        // onChange={option => handleLocalOnChangeFilter(option, filterParentSelected)}
      />
    );
  }
}

export const selectStyle = {
  control: (base, state) => ({
    ...base,
    height: 35,
    minHeight: 35,
    fontSize: 12,
    width: "90%",
    // border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    boxShadow: "none",
    "&:hover": {
      border: state.hasValue ? "1px solid #10312b" : "1px solid #dcdcdc",
    },
    // backgroundColor: state.hasValue ? " #039BE5" : " #f8fafc",
    backgroundColor: "#f8fafc",
  }),
  singleValue: (provided, state) => ({
    ...provided,
    // color: "#fff",
    padding: 7,
    marginTop: -1,
    marginLeft: -8,
    fontWeight: "bold",
  }),
  dropdownIndicator: base => ({
    ...base,
    padding: 4,
  }),
  menu: base => ({
    ...base,
    backgroundColor: "#1e3a47",
    color: "#fff",
    borderRadius: "4px",
    marginTop: 10,
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.3)",
  }),
  menuList: base => ({
    ...base,
    padding: 0,
    borderRadius: "4px",
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected ? "#039BE5" : state.isFocused ? "#022b36" : "#1e3a47",
    color: "#fff",
    fontSize: 11,
    // padding: "10px 20px",
    cursor: "pointer",
    "&:active": {
      backgroundColor: state.isSelected ? "#0288d1" : "#022b36",
    },
  }),
};
