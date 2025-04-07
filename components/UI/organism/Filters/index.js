//Organismo con filtros (barra de busqueda, drawer, chips) Aplicado en herramientas/metas
//Prop activeFilters, se encargarra de activar los filtros que se requieran

import React, { useState } from "react";
import DrawerWithFilters2 from "../../molecules/DrawerWithFilters2";
import InputFilter from "../../molecules/InputFilter";
import ChipsLocalStorage from "../../molecules/ChipsLocalStorage";

export default function Filters({
  orderTablePage,
  setOrderTablePage,
  activeFilters,
  drawerFilters,
  setDrawerFilters,
  getData,
  searchNameOrEmail,
  setSearchNameOrEmail,
  placeholder,
  nameInLocalStorage,
  savedChips,
}) {
  //Chip
  const [chips, setChips] = useState();
  const [chipsText, setChipsText] = useState(JSON.parse(localStorage.getItem(savedChips)));
  //Drawer
  const [openDrawer, setopenDrawer] = useState(false);
  //Guarda el valor de los filtros del Drawer
  const [categorySelect, setCategorySelect] = useState(false);
  //Aqui guarda los valores de los filtros para despues aplicarlos al where
  const [filters, setFilters] = useState({
    category: "",
    origin: "",
    company: "",
    clienttype: "",
    specialties: "",
    gender: "",
    date: "",
    ejecutive: "",
  });

  const startNameOrEmailSearch = () => {
    console.log("Valor de busqueda:", searchNameOrEmail);
    getData();
  };

  return (
    <div>
      <InputFilter
        searchNameOrEmail={searchNameOrEmail}
        setSearchNameOrEmail={setSearchNameOrEmail}
        startNameOrEmailSearch={startNameOrEmailSearch}
        openDrawer={() => setopenDrawer(true)}
        setOrderTablePage={setOrderTablePage}
        placeholder={placeholder}
        nameInLocalStorage={nameInLocalStorage}
      />
      {/* Chips pero con uso de local storage */}
      <ChipsLocalStorage
        chips={chips}
        searchNameOrEmail={searchNameOrEmail}
        setSearchNameOrEmail={setSearchNameOrEmail}
        setOrderTablePage={setOrderTablePage}
        filters={filters}
        setFilters={setFilters}
        drawerFilters={drawerFilters}
        setDrawerFilters={setDrawerFilters}
        nameInLocalStorage={nameInLocalStorage}
        chipsText={chipsText}
        setChipsText={setChipsText}
        savedChips={savedChips}
      />
      {/* Nuevo Drawer de filtros */}
      <DrawerWithFilters2
        activeFilters={activeFilters}
        openDrawer={openDrawer}
        setopenDrawer={setopenDrawer}
        setCategorySelect={setCategorySelect}
        drawerFilters={drawerFilters}
        setDrawerFilters={setDrawerFilters}
        filters={filters}
        setFilters={setFilters}
        nameInLocalStorage={nameInLocalStorage}
        chipsText={chipsText}
        setChipsText={setChipsText}
        savedChips={savedChips}
      />
    </div>
  );
}
