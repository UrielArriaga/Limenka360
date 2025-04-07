import { Dialog, Grid } from "@material-ui/core";
import {WhatsApp} from '@material-ui/icons';
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Select from "react-select";
import { useState } from "react";
import { EntitiesLocal} from "../../../BD/databd";
import {toUpperCaseChart } from "../../../utils";
export default function Modalconta({ open, close }) {
  const [entity, setEntity] = useState("");

  return (
    <DialogContainer className="container" open={open} onClose={close}>
      <Grid className="main-right">
        <div className="cont-rigth">
          <h2>!Bienvenido a Limenka 360!</h2>
          <img src="contact-modal.png" alt="image-modal" />
        </div>
      </Grid>
      <Grid className="main-left">
        <div className="cont-left">
          <h2>CONTÁCTENOS</h2>
          <p>Nos encantaría saber de usted.</p>
          <form className="form-modal">
            <input placeholder="Nombre" className="input" />
            <input placeholder="Correo" className="input" />
            <input placeholder="Telefono" className="input" />
            <Select 
            className="select-options" 
            placeholder="Selecciona un Estado"
            options={EntitiesLocal} 
            value={EntitiesLocal.filter(item => item.id === entity)}
            getOptionValue={option => `${option["id"]}`}
            getOptionLabel={option => `${toUpperCaseChart(option.name)}`}
            />
            <button className="button-sub">Recibir información</button>
            <button className="button-whats"><WhatsApp/> Atención Perzonalizada</button>
          </form>
        </div>
      </Grid>
    </DialogContainer>
  );
}

export const DialogContainer = styled(Dialog)`
  .MuiDialog-paperWidthSm {
    min-width: 800px;
    min-height: 500px;
    display: flex;
    flex-direction: row;
    border-radius: 30px;
  }
  .container {
    background: yellow;
  }
  .main-right {
    background:#600ee4;
    width: 50%;
    padding: 20px;
  }
  .cont-rigth {
    width: 100%;
    margin-top: 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    h2 {
      width: 100%;
      margin-top: 5%;
      color: white;
      text-align: center;
    }
    img {
      margin-top: 10%;
    }
  }
  .main-left {
    padding: 20px;
    width: 50%;
  }
  .cont-left {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    h2 {
      width: 100%;
      margin-top: 5%;
      color: #333366;
      text-align: center;
    }
  }
  form.form-modal {
    margin-top: 24px;
    width: 90%;
  }
  .input {
    border-radius: 4px;
    height: 40px;
    width: 100%;
    outline: 0px;
    padding-left: 10px;
    border: 1px solid rgb(224, 224, 224);
    margin-bottom: 10px;
  }

  .button-sub {
    width: 100%;
    margin-top: 6%;
    margin-bottom: 5%;
    height: 35px;
    border: none;
    background: #600ee4;
    color: white;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
}
.button-whats {
    width: 100%;
    display: flex;
    margin-top: 6%;
    margin-bottom: 5%;
    height: 35px;
    justify-content: center;
    align-items: center;
    background: #42d17f;
    border: none;
    color: white;
    font-weight: 900;
    border-radius: 10px;
    cursor: pointer;
}
`;
