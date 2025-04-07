import { Grid, Switch } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import Select from "react-select";
import SelectField from "../../common/SelectField";

export default function PaymentItem({
  payment,
  index,
  conceptImports,
  handleOnClickDeletePayment,
  handleOnChangeProperty,
}) {
  return (
    <PaymentItemStyled>
      <p className="title">Pago {index}</p>
      <Grid container spacing={2}>
        <Grid item md={2}>
          <div className="input-item">
            <label>Monto</label>
            <input
              placeholder="$MXN"
              type="text"
              value={payment.payment}
              onChange={e => handleOnChangeProperty(payment.id, "payment", e.target.value)}
            />
          </div>
        </Grid>

        <Grid item md={2}>
          <div className="input-item">
            <label>Tipo de cambio</label>
            <input
              placeholder="$USD"
              type="text"
              value={payment.exchangerate}
              onChange={e => handleOnChangeProperty(payment.id, "exchangerate", e.target.value)}
            />
          </div>
        </Grid>

        <Grid item md={2}>
          <div className="input-item">
            <label>Fecha</label>
            <input
              placeholder="$USD"
              type="date"
              value={payment.date}
              onChange={e => handleOnChangeProperty(payment.id, "date", e.target.value)}
            />
          </div>
        </Grid>

        <Grid item md={2}>
          <div className="input-item">
            <label>Iva</label>
            <input
              placeholder="$MXN"
              type="text"
              value={payment.payment}
              onChange={e => handleOnChangeProperty(payment.id, "payment", e.target.value)}
            />
          </div>
        </Grid>

        <Grid item md={3}>
          <div className="input-item">
            <label>Destino</label>
            {/* {JSON.stringify(conceptImports.results, null, 2)} */}
            <Select
              label={"Direccion"}
              name={"xxx"}
              className="select_data"
              placeholder="Selecciona una opcion"
              isLoading={false}
              styles={customStyles}
              options={conceptImports?.results}
              getOptionValue={option => `${option.id}`}
              getOptionLabel={option => `${option.name}`}
              value={conceptImports?.results.filter(item => item.id === payment.conceptimport.id)}
              onChange={e => handleOnChangeProperty(payment.id, "conceptimport", e)}
              // styles={neumorphismStyles}
              // control={control}
              // options={addressesData?.data}
              // components={{ Option: CustomOption }}
              // errors={errors}
              // handleChange={handleOnChangeSelect}
            />
          </div>
        </Grid>
        <Grid item md={1}>
          <div className="input-item">
            <label>Estatus</label>
            <Switch
              checked={payment.ispaid}
              onChange={e => handleOnChangeProperty(payment.id, "ispaid", e.target.checked)}
            />
          </div>
        </Grid>
      </Grid>

      <div className="flex-aling-end">
        <button className="deletepayment" onClick={() => handleOnClickDeletePayment(payment?.id)}>
          Eliminar
        </button>
      </div>
    </PaymentItemStyled>
  );
}

const PaymentItemStyled = styled(Grid)`
  background-color: #fafafa;
  padding: 10px;
  margin-bottom: 10px;

  .title {
    font-size: 12px;
    letter-spacing: 0.04em;
    font-weight: 600;
    color: rgb(86 86 86);
    margin-bottom: 10px;
  }

  .input-item {
    display: flex;
    flex-direction: column;

    label {
      font-size: 14px;
      color: rgb(86 86 86);
      margin-bottom: 5px;
    }
    input {
      padding: 5px;
      border-radius: 5px;
      border: 1px solid #d1d1d1;
      outline: none;
      font-size: 14px;
      color: rgb(86 86 86);
      margin-bottom: 10px;
      height: 40px;
    }
  }

  .select_data {
    font-size: 14px;
  }

  .deletepayment {
    color: red;
    background-color: #fff;
    border: none;
    cursor: pointer;
  }
`;
const customStyles = {
  control: (base, state) => ({
    ...base,
    borderRadius: "6px",
    border: state.isFocused ? "1px solid #000" : "1px solid #ccc", // Borde similar a los inputs
    padding: "5px 10px",
    height: "40px",
    minHeight: "40px",
    boxShadow: "none",
    "&:hover": { border: "1px solid #888" },
  }),
  valueContainer: base => ({
    ...base,
    height: "40px",
    display: "flex",
    alignItems: "center",
    padding: "0 8px",
  }),
  indicatorsContainer: base => ({
    ...base,
    height: "40px",
  }),
  placeholder: base => ({
    ...base,
    color: "#888", // Color similar a los placeholders de los inputs
    fontSize: "14px",
  }),
  option: (base, { isFocused, isSelected }) => ({
    ...base,
    backgroundColor: isSelected ? "#007bff" : isFocused ? "#f0f0f0" : "white",
    color: isSelected ? "white" : "black",
    padding: "10px",
    cursor: "pointer",
    height: "40px",
    display: "flex",
    alignItems: "center",
  }),
};
