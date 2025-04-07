import React from "react";
import PropTypes from "prop-types";
import styles from "./InputCRM.module.css";

const InputCRM = ({ text, value, disabled, viewContainer }) => {
  return (
    <div className={`${styles.container} ${viewContainer ? styles.viewContainer : ""}`}>
      <p className={styles.text}>{text}</p>
      {disabled ? (
        <input className={`${styles.input} ${styles.backgroundDisabled}`} value={value} readOnly disabled />
      ) : (
        <input className={styles.input} value={value} readOnly />
      )}
    </div>
  );
};

InputCRM.propTypes = {
  text: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  viewContainer: PropTypes.bool,
};

InputCRM.defaultProps = {
  text: "Ejemplo de texto",
  value: "Valor del input",
  disabled: false,
  viewContainer: false,
};

export default InputCRM;
