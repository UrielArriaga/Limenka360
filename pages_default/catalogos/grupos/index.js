import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import NavBarDashboard from "../../../components/NavBarDashboard";
import GroupsTable from "../../../components/TableGroups";
import { Button, TextField, Grid, Chip, Tooltip } from "@material-ui/core";
import { Add, Close, FilterList, Group, People, SearchOutlined, GroupWork, Cached } from "@material-ui/icons";
import router from "next/router";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";
import { DrawerContainer } from "../../../styles/Propectos";
import AlertGlobal from "../../../components/Alerts/AlertGlobal";
import Head from "next/head";
import { GruposStyled } from "../../../styles/Catalogos/Grupos/NewGroups";
import DirectorLayout from "../../../layouts/DirectorLayout";
export default function Groups(page) {
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [totalGroups, setTotalGroups] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [filterGroup, setFilterGroup] = useState("");
  const [flag, setFlag] = useState(false);
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const { isLoadingPage } = useValidateLogin(["Admin_compania", "admin", "director", "inteligencia_comercial"]);
  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
  };

  const handleFilter = e => {
    cleanPagination();
    setShowChipsProducts(!showChipsProducts);
    closeDrawerFilters();
  };

  const cleanPagination = () => {
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeGroup = () => {
    setFilterGroup("");
    setSearchKey("");
    cleanPagination();
  };
  const removeSearches = () => {
    setSearchKey("");
    cleanPagination();
  };
  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {filterGroup !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeGroup}
              label={`${"Buscando por Grupo:"}`}
              className="chip"
            />
          )}
          {searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeSearches}
              label={`Buscando por Grupo: ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const navigateCreateNew = () => {
    router.push("../catalogos/grupos/nuevo");
  };
  if (isLoadingPage) return <LoaderPage />;
  return (
    <DirectorLayout>
      <GruposStyled>
        <Head>
          <title>CRM JOBS - Grupos</title>
        </Head>
        {/* <SideBar />
        <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="container">
            <div className="head">
              <div className="head__title">
                <h1>
                  <Group /> Grupos {`(${totalGroups} registros)`}
                </h1>
                <Tooltip arrow title="Recargar" placement="right">
                  <Cached className="reload" onClick={() => setFlag(!flag)} />
                </Tooltip>
              </div>
              <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
                <Add />
                <p>Agregar Grupo</p>
              </Button>
            </div>
            <div className="ctr_filter">
              <div className="ctr_filter__ctr_input">
                <TextField
                  variant="outlined"
                  type="search"
                  value={searchKey}
                  onChange={e => {
                    setSearchKey(e.target.value);

                    if (e.target.value == "") {
                      setFlag(!flag);
                    }
                  }}
                  label={searchKey !== "" && "Buscar grupo"}
                  placeholder="Búsqueda"
                  size="small"
                  className="inputText"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      setNameSearch(searchKey);
                      setFlag(!flag);
                      setShowChipsProducts(true);
                    }
                  }}
                />
                <SearchOutlined className="search" />
                {/* <FilterList
                className="filters"
                onClick={() => {
                  setShowChipsProducts(false);
                  setshowFilters(!showFilters);
                }}
              /> */}
              </div>
            </div>
            <div className="filters_chip" style={{ marginBlockEnd: "1%" }}>
              {Chips()}{" "}
            </div>
            <GroupsTable
              handleAlert={handleAlert}
              totalGroups={totalGroups}
              setTotalGroups={setTotalGroups}
              searchKey={searchKey}
              filterGroup={filterGroup}
              flag={flag}
              setFlag={setFlag}
            />
          </div>
        </div>
        <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
          <div className="ctr_drawer">
            <div className="ctr_drawer__top">
              <p className="title">Filtra por tu preferencia</p>
              <Close className="close_icon" onClick={closeDrawerFilters} />
            </div>
            <Grid container className="container" spacing={2}>
              <Grid item md={12} className="casilla">
                <Group className="icon" />
                <label className="label2"> Buscar por Grupo</label>

                <input
                  onChange={e => {
                    setFilterGroup(e.target.value);
                  }}
                  type="checkbox"
                  className="checkBox"
                />
              </Grid>
            </Grid>

            <div className="ctr_drawer__ctr_buttons">
              <Button variant="contained" className="btn_cancel" onClick={closeDrawerFilters}>
                Cancelar
              </Button>

              <Button variant="contained" className="btn_apply" onClick={() => handleFilter()}>
                Aplicar
              </Button>
            </div>
          </div>
        </DrawerContainer>
        {Alert?.show && (
          <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
        )}
      </GruposStyled>
    </DirectorLayout>
  );
}
