import { Grid, Tooltip } from "@material-ui/core";
import React from "react";
import { useState } from "react";
import styled from "styled-components";

import dayjs from "dayjs";
import { colors } from "../../../../styles/global.styles";
import { type } from "os";
import InputField from "./InputField";
export default function InfoProspect({ prospectSelected }) {
  const [showAllInfo, setShowAllInfo] = useState(false);
  let separation = 5;

  const printNa = (value) => {
    return value ? value : "N/A";
  };

  const formatDate = (date) => {
    return date ? dayjs(date).format("DD/MM/YYYY") : "N/A";
  };

  const [itemToUpdate, setfieldToUpdate] = useState({
    value: "",
    currentValue: "",
    identifier: "",
  });

  const prospectFields = [
    { label: "Nombre", value: prospectSelected?.fullname, type: "text" },
    { label: "Correo", value: prospectSelected?.email, type: "text" },
    { label: "No. Celular", value: prospectSelected?.phone, type: "text" },
    {
      label: "Producto de Interes",
      value: prospectSelected?.product,
      type: "text",
    },
    {
      label: "Categoria de Interes",
      id: "categories",
      value: prospectSelected?.category?.name,
      type: "cities",
    },
    {
      label: "Fecha de Creacion",
      disabled: true,
      value: formatDate(prospectSelected?.createdAt),
      type: "text",
    },
    {
      label: "Tipo de Cliente",
      value: prospectSelected?.phone,
      type: "select",
    },
    {
      label: "Estado",
      id: "entities",
      value: prospectSelected?.entity?.name,
      type: "select",
    },
  ];

  const handleOnClickField = (field) => {
    if (field.disabled) return;
    setfieldToUpdate({
      value: field.value,
      currentValue: field.value,
      identifier: field.label,
      id: field.id || null,
    });
  };
  return (
    <InfoProspectStyled>
      <h3>DATOS DEL PROSPECTO</h3>
      <Grid container spacing={0}>
        {prospectFields.map((field, index) => {
          return (
            <Grid item md={separation} xs={12}>
              {field.label === itemToUpdate.identifier && (
                <div
                  className="itemData toUpdate"
                  onClick={() => handleOnClickField(field)}
                >
                  <p className="label">Actualizar {field.label}</p>
                  <InputField
                    type={field.type}
                    itemToUpdate={itemToUpdate}
                    setfieldToUpdate={setfieldToUpdate}
                  />
                </div>
              )}

              {field.label !== itemToUpdate.identifier && (
                <div
                  className="itemData"
                  onClick={() => handleOnClickField(field)}
                >
                  <p className="label">{field.label}</p>
                  <p className="value">{printNa(field?.value)}</p>
                </div>
              )}
            </Grid>
          );
        })}

        {/* <pre>{JSON.stringify(prospectSelected, null, 2)}</pre> */}
        {/* <Grid item md={separation} xs={12}>
          <div
            className="itemData"
            onClick={() => {
              setfieldToUpdate({
                value: prospectSelected?.fullname,
                currentValue: prospectSelected?.fullname,
                identifier: "fullname",
              });
            }}
          >
            <p className="label">Nombre</p>
            <Tooltip title="Click para editar" placement="bottom-start">
              {itemToUpdate.identifier === "fullname" ? (
                <>
                  <input
                    className="inputItemData"
                    placeholder="Nombre"
                    value={itemToUpdate.value}
                    onBlur={() => {
                      let isConfirm = window.confirm("¿Desea guardar los cambios?");
                      if (!isConfirm) return;

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
                  <p className="alert">Enter para guardar</p>
                </>
              ) : (
                <p className="value">{printNa(prospectSelected?.fullname)}</p>
              )}
            </Tooltip>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Correo</p>
            <p className="value">{printNa(prospectSelected?.email)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">No. Celular</p>
            <p className="value">{printNa(prospectSelected?.phone)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Producto de Interes</p>
            <p className="value">{printNa(prospectSelected?.product)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Categoria de Interes</p>
            <p className="value">{printNa(prospectSelected?.category?.name)}</p>
          </div>
        </Grid>

        <Grid item md={separation} xs={12}>
          <div className="itemData">
            <p className="label">Fecha de Creacion</p>
            <p className="value">{formatDate(prospectSelected?.createdAt)}</p>
          </div>
        </Grid> */}

        {showAllInfo && (
          <>
            <Grid item md={separation} xs={12}>
              <div className="itemData">
                <p className="label">Tipo de Cliente</p>
                <p className="value">{printNa(prospectSelected?.phone)}</p>
              </div>
            </Grid>
          </>
        )}

        {/* <Grid item md={6} xs={12}></Grid> */}
      </Grid>

      <div className="center">
        <button
          onClick={() => {
            setShowAllInfo(!showAllInfo);
          }}
        >
          Ver mas datos
        </button>
      </div>
    </InfoProspectStyled>
  );
}

const InfoProspectStyled = styled.div`
  background-color: #fff;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 30px;

  h3 {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #000;
    font-weight: bold;
  }

  .itemData {
    margin-bottom: 10px;
    cursor: pointer;
  }

  .toUpdate {
    /* background-color: #f9f9f9; */

    .labe {
      color: red;
    }
  }
  .label {
    /* font-weight: bold; */
    margin-bottom: 5px;
    color: #a3a9b1;
  }
  .value {
    font-weight: bold;
    /* margin-bottom: 5px; */
    color: #000;
    /* border: 1px solid transparent; */
  }

  .inputItemData {
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    padding: 5px;
    width: 90%;
  }

  .center {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  button {
    background-color: transparent;
    border: none;
    color: ${colors.primaryColor};
    /* padding: 10px 20px; */
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
  }
`;
