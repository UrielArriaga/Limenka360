//Componente hijo sin props

import React from "react";
import useUser from "../../src/hooks/useUser";

export default function MoreInfo(){

    const { name, lastname, username, email, rol } = useUser();

    return(
        <div>
            <h1>Informacion del usuario</h1>
            <p>Nombre: {name}</p>
            <p>Apellido: {lastname}</p>
            <p>Nombre de usuario: {username}</p>
            <p>Email: {email}</p>
            <p>Rol: {rol}</p>
        </div>
    );
}