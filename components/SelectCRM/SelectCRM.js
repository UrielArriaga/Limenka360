import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import styles from "./SelectCRM.module.css";

const SelectCRM = ({ text, options, onChange }) => {
  return (
    <div>
      <p className={styles.text}>{text}</p>
      <Select
        options={options}
        onChange={(selectedOption) => onChange(selectedOption)}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
      />
    </div>
  );
};

SelectCRM.propTypes = {
  text: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  onChange: PropTypes.func,
};

SelectCRM.defaultProps = {
  text: "Ejemplo de texto",
  options: [
    { value: "option1", label: "Opción 1" },
    { value: "option2", label: "Opción 2" },
    { value: "option3", label: "Opción 3" },
  ],
  onChange: () => {},
};

export default SelectCRM;
