import { Grid } from "@material-ui/core";
import { Assignment, AttachMoney } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import Error from "../Error";

export default function BillingForm({ register, errors = {} }) {
  return (
    <AddressShoppingStyled>
      <div className="sectionheader">
        <h1 className="title">Dirección de Envío.</h1>
        <Assignment className="icon_primary" />
      </div>

      <Grid container spacing={2}>
        <Grid item className="item" md={4}>
          <div className="labelContainer">
            <p>
              Recibe <strong>*</strong>
            </p>

            {errors.receive && (
              <>
                <div className="point"></div>
                <Error> {errors.receive?.message}</Error>
              </>
            )}
          </div>
          <input
            className="input"
            placeholder="Recibe"
            {...register("receive", {
              required: "*Requerido",
            })}
          />
        </Grid>
        <Grid item className="item" md={4}>
          <div className="labelContainer">
            <p>
              Calle <strong>*</strong>
            </p>
          </div>
          <input
            className="input"
            placeholder="Recibe"
            {...register("receive", {
              required: "*Requerido",
            })}
          />
        </Grid>
      </Grid>
    </AddressShoppingStyled>
  );
}

const AddressShoppingStyled = styled.div`
  .sectionheader {
    display: flex;
    align-items: center;
    margin: 15px 0px 15px 0px;

    .icon_primary {
      width: 30px;
      height: 30px;
      padding: 5px;

      background: #dce1f6;
      color: #103c82;
      border-radius: 50%;
    }
    p {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;

      color: rgb(86 86 86);
    }
    .title {
      font-size: 18px;
      letter-spacing: 0.04em;
      font-weight: 600;
      color: rgb(86 86 86);
    }
  }

  .item {
    .labelContainer {
      display: flex;
      margin-bottom: 10px;

      p {
        margin-bottom: 2px;
        font-size: 14px;
        margin-top: 5px;
        margin-bottom: 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: rgb(86 86 86);
      }
      strong {
        color: red;
      }
    }
    .input {
      background-clip: padding-box;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
      color: #495057;
      display: block;
      font-size: 0.8125rem;
      font-weight: 400;
      line-height: 1.5;
      padding: 0.47rem 0.75rem;
      transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
      width: 100%;
      min-height: 38px;
    }
  }
`;
