import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Chip } from "@material-ui/core";

// #region constants

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
const ChipsFilters = ({ showChips, filters, removeFilter }) => {
  if (!showChips) return <></>;

  return (
    <div>
      {filters.searchKey && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            removeFilter("searchKey"), removeFilter("nameSearch"), restartPaging();
          }}
          label={filters.searchKey}
          className="chip"
        />
      )}
      {filters.folio?.id && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            setFolio(), restartPaging();
          }}
          label={`Folio: ${filters.folio.folio}`}
          className="chip"
        />
      )}
      {filters.phone && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            removeFilter("phone"), restartPaging();
          }}
          label={`Teléfono: ${filters.phone.phone}`}
          className="chip"
        />
      )}
      {filters.state && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("state")}
          label={`Estado: ${filters.state.label}`}
          className="chip"
        />
      )}
      {filters.executive?.id && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("executive")}
          label={`${"Ejecutivo"}: ${filters.executive.name} ${filters.executive.lastname}`}
          className="chip"
        />
      )}
      {filters.viewOption?.label && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => {
            removeFilter("dateStart"), removeFilter("dateFinish"), removeFilter("viewOption"), setOrder("createdAt");
          }}
          label={
            filters.viewOption.label == "Rango"
              ? `${"Fecha"}: ${filters.viewOption.label} de  ${filters.dateStart
                  ?.split("T")[0]
                  ?.split("-")
                  ?.reverse()
                  ?.join("/")} - ${filters.dateFinish?.split("T")[0]?.split("-")?.reverse()?.join("/")}`
              : `Fecha: ${filters.viewOption.label}`
          }
          className="chip"
        />
      )}
      {filters.bill?.label && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("bill")}
          label={`${"Factura:"} ${filters.bill.label}`}
          className="chip"
        />
      )}
      {filters.cfdi && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("cfdi")}
          label={`${"CFDI:"} ${filters.cfdi.name}`}
          className="chip"
        />
      )}
      {filters.paymentMethod && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("paymentMethod")}
          label={`${"Metodo de Pago:"} ${filters.paymentMethod.name}`}
          className="chip"
        />
      )}
      {filters.paymentMethod && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("paymentMethod")}
          label={`${"Forma de Pago:"} ${filters.paymentMethod.name}`}
          className="chip"
        />
      )}
      {filters.discarted?.value && (
        <Chip
          color="primary"
          size="small"
          onDelete={() => removeFilter("discarted")}
          label={`${"Descartado:"} ${filters.discarted.label}`}
          className="chip"
        />
      )}
    </div>
  );
};

ChipsFilters.propTypes = propTypes;
ChipsFilters.defaultProps = defaultProps;
// #endregion

export default ChipsFilters;
