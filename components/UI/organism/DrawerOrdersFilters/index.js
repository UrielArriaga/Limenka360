import { Button } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import styled from "styled-components";
import {
  useCFDI,
  useExecutives,
  useFolios,
  usePaymentMethods,
  usePaymentWay,
  usePhones,
} from "../../../../hooks/useCommons";
import { DrawerContainer, Error } from "../../../../styles/Propectos";

// #region constants
const FiltersOrder = [
  { label: "Hoy", value: "day" },
  { label: "Semana", value: "week" },
  { label: "Mes", value: "month" },
  { label: "Rango", value: "range" },
];

const FiltersState = [
  { label: "Pendiente de aprobación", value: "1" },
  { label: "Aprobado", value: "2" },
  { label: "Rechazado", value: "3" },
];

const FilterBill = [
  { label: "Con factura", value: true },
  { label: "Sin factura", value: false },
];

const filterDescarted = [
  { label: "Descartado", value: true },
  { label: "Sin descartar", value: false },
];

// #endregion

// #region styled-components

// #endregion

// #region functions

// #endregion

// #region component
const propTypes = {};

const defaultProps = {};

/**
 *
 */
const DrawerOrdersFilters = ({ showFilters, closeDrawerFilters, filters, handleChangeFilters, handleFilter }) => {
  const { executives } = useExecutives();
  const { paymentWay } = usePaymentWay();
  const { phones } = usePhones();
  const { paymentMethods } = usePaymentMethods();
  const { CFDI } = useCFDI();
  const { folios } = useFolios();

  return (
    <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
      <div className="ctr_drawer">
        <div className="ctr_drawer__top">
          <p className="title">Filtra por tu preferencia</p>
          <Close className="close_icon" onClick={closeDrawerFilters} />
        </div>
        <div className="ctr_drawer__ctr_inputs">
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Fecha</label>

            <Select
              isSearchable={false}
              isClearable={true}
              theme={theme => ({
                ...theme,
                borderRadius: "6px",
                colors: { ...theme.colors, primary: "#405189" },
              })}
              placeholder="Selecciona un Periodo"
              options={FiltersOrder}
              value={filters.viewOption}
              onChange={e => handleChangeFilters("viewOption", e)}
            />
            <div className="ctr_drawer__ctr_inputs__input">
              {filters.viewOption?.label === "Rango" && (
                <>
                  <div className="ranges">
                    <div className="dateOne">
                      <label className="label">Fecha Inicio</label>
                      <input
                        className="input"
                        type="date"
                        value={filters.dateStart}
                        onChange={e => {
                          handleChangeFilters("dateStart", e?.target.value);
                        }}
                      ></input>
                    </div>
                    <div className="dateTwo">
                      <label className="label">Fecha Termino </label>
                      <input
                        className="input"
                        type="date"
                        value={filters.dateFinish}
                        onChange={e => {
                          handleChangeFilters("dateFinish", e?.target.value);
                        }}
                      ></input>
                      {filters.dateFinish !== "" && filters.dateFinish < filters.dateStart && (
                        <Error>
                          <p className="alert_title">La fecha Final del Rango no puede ser Menor a la Inicial</p>
                        </Error>
                      )}
                      {filters.dateStart === filters.dateFinish && (
                        <Error>
                          <p className="alert_title">No hay un rango de fechas, selecciona otro periodo diferente</p>
                        </Error>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Ejecutivo</label>
            <Select
              placeholder="Selecciona un Ejecutivo"
              onChange={e =>
                handleChangeFilters("executive", {
                  id: e?.id,
                  name: e?.name,
                  lastname: e?.lastname,
                  type: "Ejecutivo",
                })
              }
              isClearable={true}
              value={executives?.filter(item => item.id === filters.executive?.id)}
              options={executives}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.name} ${option.lastname}, ${option.email}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Folio</label>
            <Select
              placeholder="Selecciona un Folio"
              onChange={e => handleChangeFilters("folio", { id: e?.id, folio: e?.folio })}
              isClearable={true}
              value={filters.folio?.id ? filters.folio : ""}
              options={folios}
              getOptionValue={option => `${option["id"]}`}
              getOptionLabel={option => `${option.folio}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Teléfono</label>
            <Select
              placeholder="Selecciona un teléfono"
              onChange={e => handleChangeFilters("phone", e)}
              isClearable={true}
              value={phones.filter(item => item.phone === filters.phone?.phone)}
              options={phones}
              getOptionLabel={option => `${option.phone}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Estado de pedido</label>
            <Select
              placeholder="Selecciona un Estado"
              onChange={e => handleChangeFilters("state", { value: e?.value, label: e?.label })}
              isClearable={true}
              value={FiltersState.filter(item => item.value === filters.state?.value)}
              options={FiltersState}
              getOptionValue={option => `${option.value}`}
              getOptionLabel={option => `${option.label}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Factura</label>
            <Select
              placeholder="Selecciona un Estado"
              onChange={e => handleChangeFilters("bill", { value: e?.value, label: e?.label })}
              isClearable={true}
              value={FilterBill.filter(item => item.value === filters.bill?.value)}
              options={FilterBill}
              getOptionValue={option => `${option.value}`}
              getOptionLabel={option => `${option.label}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">CFDI</label>
            <Select
              placeholder="Selecciona un CFDI"
              onChange={e => handleChangeFilters("cfdi", e)}
              isClearable={true}
              value={CFDI?.filter(item => item.id === filters.cfdi?.id)}
              options={CFDI}
              getOptionValue={option => `${option.id}`}
              getOptionLabel={option => `${option.name}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Metodo de Pago</label>
            <Select
              placeholder="Selecciona un metodo de pago"
              onChange={e => handleChangeFilters("paymentMethod", e)}
              isClearable={true}
              value={paymentMethods?.filter(item => item.id === filters.paymentMethod?.id)}
              options={paymentMethods}
              getOptionValue={option => `${option.id}`}
              getOptionLabel={option => `${option.name}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Forma de Pago</label>
            <Select
              placeholder="Selecciona una forma de pago"
              onChange={e => handleChangeFilters("paymentWay", e)}
              isClearable={true}
              value={paymentWay?.filter(item => item.id === filters.paymentWay?.id)}
              options={paymentWay}
              getOptionValue={option => `${option.id}`}
              getOptionLabel={option => `${option.name}`}
            />
          </div>
          <div className="ctr_drawer__ctr_inputs__input">
            <label className="label">Descartados</label>
            <Select
              placeholder="Selecciona una opción"
              onChange={e => handleChangeFilters("discarted", e)}
              isClearable={true}
              value={filterDescarted.filter(item => item.value === filters.discarted?.value)}
              options={filterDescarted}
              getOptionValue={option => `${option.value}`}
              getOptionLabel={option => `${option.label}`}
            />
          </div>
        </div>
        <div className="ctr_drawer__ctr_buttons">
          <Button variant="contained" className="btn_cancel" onClick={closeDrawerFilters}>
            Cancelar
          </Button>
          <Button variant="contained" className="btn_apply" onClick={() => handleFilter()}>
            Aplicar
          </Button>
        </div>
      </div>
    </DrawerContainer>
  );
};

DrawerOrdersFilters.propTypes = propTypes;
DrawerOrdersFilters.defaultProps = defaultProps;
// #endregion

export default DrawerOrdersFilters;
