import { useRouter } from "next/router";
import React, { useState } from "react";

export default function useOportunities() {
  const router = useRouter();
  const [keySearch, setKeySearch] = useState("");
  const [oportunities, setOportunities] = useState([]);
  const [showDiscatedTableOportunities, setshowDiscatedTableOportunities] = useState(false);
  const [showDiscatedTable, setshowDiscatedTable] = useState(false);
  const heads = [
    "id",
    "nombre",
    "correo",
    "télefono",
    "monto",
    "certeza",
    "categoría de interes",
    "concepto",
    "tipo de cliente",
    "género",
    "puesto",
    "canal",
    "fecha de cierre",
    "fecha de creacion",
  ];
  const headsDiscarted = [
    "id",
    "nombre",
    "concepto",
    "correo",
    "certeza",
    "télefono",
    "fecha de cierre",
    "fecha de creacion",
  ];
  const handleKeySearch = e => {
    let key = e.target.value;
    setKeySearch(key);
  };
  const handleClickEditOportunity = item => {
    router.push({
      pathname: `/oportunidades/editar/`,
      query: { o: item.id },
    });
  };

  return {
    heads,
    headsDiscarted,
    keySearch,
    oportunities,
    showDiscatedTableOportunities,
    showDiscatedTable,
    handleKeySearch,
    handleClickEditOportunity,
  };
}
