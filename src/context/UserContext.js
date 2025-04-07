//Es el contexto

import { createContext } from "react";

const UserContext = createContext({
    name: null,
    lastname: null,
    username:null,
    email: null,
    rol: null,
});

export default UserContext;