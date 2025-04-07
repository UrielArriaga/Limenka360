//Sirve para usar el contexto UserContext

import { useContext } from "react";
import UserContext from "../context/UserContext";

export default () => useContext(UserContext);