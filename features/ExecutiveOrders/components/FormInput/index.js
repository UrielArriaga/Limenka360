// import all that file needs

import React from "react";
import { Grid } from "@material-ui/core";
import ErrorMessage from "../ErrorMessage";

const FormInput = ({ label, register, name, placeholder, errors, required, onChange }) => {
  let rules = {
    required: required && "*Requerido",
  };
  let phoneRules = {
    maxLength: {
      value: 10,
      message: "*10 Caracteres",
    },
    minLength: {
      value: 10,
      message: "*10 Caracteres",
    },
    pattern: {
      value: /[0-9]+/i,
      message: "*Caracter Invalido",
    },
  };

  let rfcRules = {
    pattern: {
      value: /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/,
      message: "*RFC Incorrecto",
    },
  };

  const getRules = name => {
    switch (name) {
      case "phone":
        return phoneRules;
      case "rfc":
        return rfcRules;
      default:
        return rules;
    }
  };
  return (
    <Grid item className="item" md={4}>
      <div className="labelContainer">
        <p>
          {label} {required && <strong>*</strong>}
        </p>
        {errors[name] && <ErrorMessage message={errors[name]?.message} />}
      </div>
      <input
        className="input"
        placeholder={placeholder}
        {...register(name, {
          ...getRules(name),
        })}
        onChange={onChange && onChange}
      />
    </Grid>
  );
};
export default FormInput;
