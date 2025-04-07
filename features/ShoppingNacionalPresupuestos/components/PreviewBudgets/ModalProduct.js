import React, { useState } from "react";
import { ContainerProduct } from "./styles";
import { Button, Grid } from "@material-ui/core";
import { CloseOutlined } from "@material-ui/icons";
import { Controller } from "react-hook-form";
import Autosuggest from "react-autosuggest";
import Select from "react-select";
import { toUpperCaseChart } from "../../../../utils";

export default function ModalProduct({
  open,
  toggleProducts,
  handleSubmit,
  control,
  handleAddTProduct,
  register,
  errors,
  isCreated,
  InputsRegister,
  reset,
  setValue,
  providerValue,
  setProviderValue,
  setProviderId,
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleCancel = () => {
    reset();
    setSuggestions([]);
    toggleProducts();
    setProviderValue("");
    setProviderId("");
  };

  const getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const providerInput = InputsRegister.find(input => input.inputType === "SelectProvider");

    if (!providerInput || inputLength === 0) {
      return [];
    }
    return providerInput.options.filter(provider => provider.companyname.toLowerCase().includes(inputValue));
  };

  const onSuggestionsFetchRequested = ({ value }) => {
    setSuggestions(getSuggestions(value));
  };

  const onSuggestionsClearRequested = () => {
    setSuggestions([]);
  };

  const onSuggestionSelected = (event, { suggestion }) => {
    setProviderValue(suggestion.companyname);
    setProviderId(suggestion.id);
    setValue("provider", suggestion.id);
  };

  const handleInputChange = (event, { newValue }) => {
    setProviderValue(newValue);
    if (!newValue) {
      setProviderId("");
      setValue("provider", "");
    } else {
      const matchingProvider = suggestions.find(suggestion => suggestion.companyname === newValue);
      if (!matchingProvider) {
        setProviderId("");
      }
      setValue("provider", newValue);
    }
  };
  return (
    <ContainerProduct open={open} anchor="right" onClose={toggleProducts}>
      <div className="ctr_add">
        <div className="ctr_add__header">
          <div className="ctr_add__header__close">
            <CloseOutlined className="close" onClick={toggleProducts} />
            <p className="title">Agregar Producto</p>
          </div>
          <Button onClick={handleSubmit(handleAddTProduct)} variant="contained" className="btn_save">
            Guardar
          </Button>
        </div>
        <div style={{ height: "60px" }} />
        <div className="ctr_add__ctr_info">
          <form onSubmit={handleSubmit(handleAddTProduct)}>
            <Grid spacing={1} container className="ctr_inputs">
              {InputsRegister.map((inputItem, index) => {
                switch (inputItem.inputType) {
                  case "Input":
                    return (
                      <Grid key={index} item xs={12} md={6}>
                        <p>
                          {inputItem.label} <strong>*</strong>
                        </p>
                        <input
                          {...register(inputItem.name, { required: true })}
                          id={inputItem.name}
                          name={inputItem.name}
                          placeholder={inputItem.placeholder}
                          className={
                            errors?.[inputItem.name]?.type === "required"
                              ? "ctr_inputs__input error"
                              : "ctr_inputs__input"
                          }
                        />
                      </Grid>
                    );
                  case "SelectProvider":
                    return (
                      <Grid item xs={12} md={6} key={index}>
                        <p>
                          {inputItem.label}
                          {inputItem.required && <strong>*</strong>}
                        </p>
                        <Controller
                          name="provider"
                          control={control}
                          render={() => (
                            <div className="autosuggest-container">
                              <Autosuggest
                                suggestions={suggestions}
                                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                                onSuggestionsClearRequested={onSuggestionsClearRequested}
                                getSuggestionValue={suggestion => suggestion.companyname}
                                renderSuggestion={suggestion => <div>{suggestion.companyname}</div>}
                                inputProps={{
                                  placeholder: "Buscar Proveedor",
                                  value: providerValue,
                                  onChange: handleInputChange,
                                  className: errors.provider ? "autosuggest-input error" : "autosuggest-input",
                                }}
                                renderSuggestionsContainer={({ containerProps, children }) => (
                                  <div {...containerProps} className="autosuggest-suggestions">
                                    {children}
                                  </div>
                                )}
                                onSuggestionSelected={onSuggestionSelected}
                              />
                            </div>
                          )}
                        />
                      </Grid>
                    );
                  case "Select":
                    return (
                      <Grid item xs={12} md={inputItem.required ? 6 : 12} key={index}>
                        <p>
                          {inputItem.label}
                          {inputItem.required && <strong>*</strong>}
                        </p>
                        <Controller
                          name={inputItem.name}
                          control={control}
                          rules={inputItem.required ? { required: "Requerido" } : {}}
                          render={({ field }) => (
                            <Select
                              {...field}
                              className={
                                errors?.[inputItem.name]?.type === "required"
                                  ? "ctr_inputs__select error"
                                  : "ctr_inputs__select"
                              }
                              placeholder={inputItem.placeholder}
                              options={inputItem.options}
                              getOptionLabel={option => toUpperCaseChart(option[inputItem.getLabel])}
                              getOptionValue={option => option[inputItem.getValue]}
                              maxMenuHeight={130}
                              noOptionsMessage={() => "Sin Opciones"}
                            />
                          )}
                        />
                      </Grid>
                    );
                  case "Textarea":
                    return (
                      <Grid item xs={12} md={12} key={index}>
                        <p>{inputItem.label}</p>
                        <textarea
                          {...register(inputItem.name, { required: false })}
                          id={inputItem.name}
                          name={inputItem.name}
                          placeholder={inputItem.placeholder}
                          className="ctr_inputs__textarea"
                        />
                      </Grid>
                    );
                  default:
                    return null;
                }
              })}
            </Grid>
            <Grid container className="ctr_buttons">
              <Button
                disabled={isCreated}
                className={`${isCreated ? "btn_disabled" : "btn_cancel"}`}
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button disabled={isCreated} className={`${isCreated ? "btn_disabled" : "btn_add"}`} type="submit">
                Guardar
              </Button>
            </Grid>
          </form>
        </div>
      </div>
    </ContainerProduct>
  );
}
