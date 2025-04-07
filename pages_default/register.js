import React from "react";
import { useState } from "react";
import { Contenedor } from "../styles/register.js";
import Snackbar from "@material-ui/core/Snackbar";

export default function Login() {
  const [name, setname] = useState();
  const [lastName, setlastName] = useState();
  const [nameUser, setnameUser] = useState();
  const [email, setemail] = useState();
  const [rol, setrol] = useState();

  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });

  const { vertical, horizontal, open } = state;

  //Valida los campos
  const handleClick = (newState) => () => {
    console.log("Iniciar registro");
    console.log(name, lastName, nameUser, email, rol);

    if (name == null || !name.replace(/\s/g, "").length) {
      setmessageAlert("Coloca el nombre");
      setState({ open: true, ...newState });
    } else if (lastName == null || lastName == "" || !lastName.replace(/\s/g, "").length) {
      setmessageAlert("Coloca el apellido");
      setState({ open: true, ...newState });
    } else if (nameUser == null || nameUser == "" || !nameUser.replace(/\s/g, "").length) {
      setmessageAlert("Coloca el nombre de usuario");
      setState({ open: true, ...newState });
    } else if (email == null || email == "" || !email.replace(/\s/g, "").length) {
      setmessageAlert("Coloca el email");
      setState({ open: true, ...newState });
      console.log("No hay email");
    } else if (
      !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(email)
    ) {
      setmessageAlert("Coloca un email valido");
      setState({ open: true, ...newState });
      console.log("Ingresa un email valido");
    } else if (rol == null || rol == "" || !rol.replace(/\s/g, "").length) {
      setmessageAlert("Selecciona un rol");
      setState({ open: true, ...newState });
      console.log("No hay rol");
    } else {
      //Todo bien, manda los datos aqui
      console.log("Todo bien al 100");
    }
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  //Guarda el mensaje
  const [messageAlert, setmessageAlert] = useState("");

  return (
    <Contenedor>
      <div className="register">
        <p className="title">Registro</p>

        <div className="conteinerForm">
          <div>
            <p>Nombre</p>
            <input onChange={(event) => setname(event.target.value)} />

            <p>Apellido</p>
            <input onChange={(event) => setlastName(event.target.value)} />

            <p>Nombre de Usuario</p>
            <input onChange={(event) => setnameUser(event.target.value)} />
          </div>

          <div>
            <p>Correo</p>
            <input type="email" onChange={(event) => setemail(event.target.value)} />

            <p>Rol</p>
            <select onChange={(event) => setrol(event.target.value)}>
              <option value="">Selecciona un Rol</option>
              <option value="rol 1">Rol 1</option>
              <option value="rol 2">Rol 2</option>
              <option value="rol 3">Rol 3</option>
            </select>
          </div>
        </div>

        <div>
          <button
            className="buttonRegistrar"
            onClick={handleClick({
              vertical: "top",
              horizontal: "right",
            })}
          >
            Registrarme
          </button>
        </div>
      </div>

      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={messageAlert}
        key={vertical + horizontal}
      ></Snackbar>
    </Contenedor>
  );
}
