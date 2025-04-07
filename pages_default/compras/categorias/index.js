import React, { useEffect, useState } from "react";
import CategoriesTable from "../../../components/TableCategories";
import { Button, TextField, CircularProgress, Chip, Grid, Tooltip } from "@material-ui/core";
import { Add, Close, FilterList, Group, People, SearchOutlined, Cached, Category } from "@material-ui/icons";
import router from "next/router";
import MainLayout from "../../../components/MainLayout";
import { CategoriesStyled } from "../../../styles/Compras/categorias";

export default function Categories(page, isLoading, handleAlert, setAlert) {
  const [totalCategories, setTotalCategories] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [filterCompany, setFilterCompany] = useState("");
  const [filterCategorie, setFilterCategorie] = useState("");
  const [flag, setFlag] = useState(false);
  const [showChipsProducts, setShowChipsProducts] = useState(false);

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
  };
  const navigateCreateNew = () => {
    router.push("../compras/categorias/nuevo");
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

  const removeCategorie = () => {
    setFilterCategorie("");
    setSearchKey("");
    cleanPagination();
  };

  const removeSearches = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("Compras-Categorias");
    cleanPagination();
  };

  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div className="chip">
          {filterCategorie !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeCategorie}
              label={`${"Buscando por Categoría"}`}
              className="chip"
            />
          )}
          {searchKey !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeSearches}
              label={` Buscando por categoría : ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  return (
    <MainLayout>
      <CategoriesStyled>
        <div className="main">
          <div className="container">
            <div className="head">
              <div className="head__title">
                {/* <h1>
                {" "}
                <Category /> Categorías {`(${totalCategories} registros)`}
              </h1> */}
                <div className="total">
                  <h1>
                    <Category className="icon" /> Categorías
                  </h1>
                  <a>({`${totalCategories} registros`})</a>
                  <Tooltip arrow title="Recargar" placement="right">
                    <Cached className="reload" onClick={() => setFlag(!flag)} />
                  </Tooltip>
                </div>
              </div>
              <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
                <Add />
                <p>Agregar Categoría</p>
              </Button>
            </div>
            <div className="ctr_filter">
              <div className="ctr_filter__ctr_input">
                <TextField
                  variant="outlined"
                  type="search"
                  value={nameSearch}
                  onChange={e => {
                    setNameSearch(e.target.value);
                  }}
                  label={nameSearch !== "" && "Buscar categoría"}
                  placeholder="Búsqueda"
                  size="small"
                  className="inputText"
                  onKeyDown={e => {
                    if (e.key === "Enter" && e.target.value.length > 0) {
                      setSearchKey(e.target.value);
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

            <div className="filters_chip" c={{ marginBlockEnd: "1%" }}>
              {Chips()}
            </div>
            <CategoriesTable
              totalCategories={totalCategories}
              setTotalCategories={setTotalCategories}
              searchKey={searchKey}
              setSearchKey={setSearchKey}
              filterCompany={filterCompany}
              filterCategorie={filterCategorie}
              flag={flag}
              setFlag={() => setFlag(!flag)}
              setShowChipsProducts={setShowChipsProducts}
              setNameSearch={setNameSearch}
              localstorage={"Compras-Categorias"}
            />
          </div>
        </div>
        {/* <DrawerContainer anchor="right" open={showFilters} onClose={closeDrawerFilters}>
        <div className="ctr_drawer">
          <div className="ctr_drawer__top">
            <p className="title">Filtra por tu preferencia</p>
            <Close className="close_icon" onClick={closeDrawerFilters} />
          </div>

          <Grid container className="container" spacing={2}>
            <Grid item md={12} className="casilla">
              <Category className="icon" />
              <label className="label2"> Buscar por Categoría</label>

              <input
                onChange={e => {
                  setFilterCategorie(e.target.value);
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
      </DrawerContainer> */}
      </CategoriesStyled>
    </MainLayout>
  );
}
