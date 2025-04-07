import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import ProvidersTable from "../../../components/TableProviders";
import { Button, TextField, Grid, Chip, Tooltip } from "@material-ui/core";
import {
  Add,
  CheckBox,
  Close,
  FilterList,
  Group,
  People,
  FingerprintOutlined,
  ReceiptOutlined,
  SearchOutlined,
  MailOutline,
  CallEndOutlined,
  PhoneAndroidOutlined,
  Business,
  Contacts,
  PolicyOutlined,
  WorkOutline,
  Tune,
} from "@material-ui/icons";
import router from "next/router";
import { DrawerContainer } from "../../../styles/Propectos";
import { $CombinedState } from "@reduxjs/toolkit";
import { set } from "react-hook-form";
import Head from "next/head";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";

export default function Providers({ page }) {
  const { isLoadingPage } = useValidateLogin(["Admin_compania", "admin", "director"]);
  const [totalProviders, setTotalProviders] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterName, setFilterName] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterOpPhone, setFilterOpPhone] = useState("");
  const [filterRfc, setFilterRfc] = useState("");
  const [filterIdentifier, setFilterIdentifier] = useState("");

  const [filterNifCif, setFilterNifCif] = useState("");
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [optionChecked, setOptionChecked] = useState("");
  const [flag, setFlag] = useState(false);

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
    setOptionChecked("");
  };
  const navigateCreateNew = () => {
    router.push("../catalogos/proveedores/nuevo");
  };

  const handleFilter = e => {
    cleanPagination();
    setShowChipsProducts(!showChipsProducts);
    closeDrawerFilters();

    console.log("a");
  };
  const cleanPagination = () => {
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeCompany = () => {
    setFilterCompany("");
    setSearchKey("");
    cleanPagination();
  };

  const removeName = () => {
    setFilterName("");
    setSearchKey("");
    cleanPagination();
  };

  const removePhone = () => {
    setFilterPhone("");
    setSearchKey("");
    cleanPagination();
  };

  const removeOpPhone = () => {
    setFilterOpPhone("");
    setSearchKey("");
    cleanPagination();
  };

  const removeEmail = () => {
    setFilterType("");
    setSearchKey("");
    cleanPagination();
  };

  const removeRfc = () => {
    setFilterRfc("");
    setSearchKey("");
    cleanPagination();
  };

  const removeId = () => {
    setFilterIdentifier("");
    setSearchKey("");
    cleanPagination();
  };

  const removeNif = () => {
    setFilterNifCif("");
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
        <div style={{ marginBlockEnd: "0.5%" }}>
          {filterCompany !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeCompany}
              label={`${"Buscando por CompañÍa  "}:${searchKey}`}
              className="chip"
            />
          )}
          {filterName !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeName}
              label={`${"Buscando por Contacto"}: ${searchKey}`}
              className="chip"
            />
          )}
          {filterPhone !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removePhone}
              label={`${"Buscando por Teléfono"}: ${searchKey}`}
              className="chip"
            />
          )}
          {filterOpPhone !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeOpPhone}
              label={`${"Buscando por Móvil"}: ${searchKey}`}
              className="chip"
            />
          )}
          {filterType !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeEmail}
              label={`${"Buscando por Email"}:${searchKey}`}
              className="chip"
            />
          )}
          {filterRfc !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeRfc}
              label={`${"Buscando por RFC"}: ${searchKey}`}
              className="chip"
            />
          )}
          {filterIdentifier !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeId}
              label={`${"Buscando por ID"} :${searchKey}`}
              className="chip"
            />
          )}
          {filterNifCif !== "" && searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeNif}
              label={`${"Buscando por NIF/CIF"}: ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };
  if (isLoadingPage) return <LoaderPage />;
  return (
    <ProvidersStyled>
      <Head>
        <title>CRM JOBS - Proveedores</title>
      </Head>
      <SideBar />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="container">
          <div className="head">
            <div className="head__title">
              <h1>
                {" "}
                <Group /> Proveedores {`(${totalProviders} registros)`}
              </h1>
            </div>
            <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
              <Add />
              <p>Agregar Proveedor</p>
            </Button>
          </div>
          <div className="ctr_filter">
            <div className="ctr_filter__ctr_input">
              <Tooltip title="Ingresa y Selecciona una opción para poder realizar la busqueda">
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
                  label={searchKey !== "" && " Busca por compañia, por contacto ó  Correo"}
                  placeholder=" Busca por compañia, por contacto ó  Correo..."
                  size="small"
                  className="inputText"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      setSearchKey(e.target.value);
                      setFlag(!flag);
                      setShowChipsProducts(true);
                    }
                  }}
                />
              </Tooltip>
              <SearchOutlined className="search" />
              <FilterList
                className="filters"
                onClick={() => {
                  setShowChipsProducts(false);
                  setshowFilters(!showFilters);
                  setOptionChecked("");
                }}
              />
            </div>
          </div>

          <div className="filters_chip" style={{ marginBlockEnd: "1%" }}>
            {Chips()}
          </div>
          <ProvidersTable
            totalProviders={totalProviders}
            setTotalProviders={setTotalProviders}
            searchKey={searchKey}
            setSearchKey={setSearchKey}
            filterCompany={filterCompany}
            filterType={filterType}
            filterName={filterName}
            filterPhone={filterPhone}
            filterOpPhone={filterOpPhone}
            filterRfc={filterRfc}
            filterIdentifier={filterIdentifier}
            filterNifCif={filterNifCif}
            flag={flag}
            setFilterName={setFilterName}
            setFlag={() => setFlag(!flag)}
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
              <Business className="icon" />
              <label className="label2"> Buscar por compañía</label>

              <input
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("company");
                    setFilterCompany(e.target.value);
                    setFilterName("");
                    setFilterType("");
                    setFilterPhone("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                    setFilterIdentifier("");
                    setFilterNifCif("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                checked={optionChecked === "company" ? true : false}
                type="checkbox"
                className="checkBox"
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <Contacts className="icon" />
              <label className="label2">Buscar por contacto</label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("contacto");
                    setFilterName(e.target.value);
                    setFilterCompany("");
                    setFilterType("");
                    setFilterPhone("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                    setFilterIdentifier("");
                    setFilterNifCif("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "contacto" ? true : false}
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <MailOutline className="icon" />
              <label className="label2"> Buscar por correo </label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("correo");
                    setFilterType(e.target.value);
                    setFilterName("");
                    setFilterCompany("");
                    setFilterPhone("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                    setFilterIdentifier("");
                    setFilterNifCif("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "correo" ? true : false}
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <CallEndOutlined className="icon" />
              <label className="label2"> Buscar por teléfono </label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("telefono");
                    setFilterPhone(e.target.value);
                    setFilterName("");
                    setFilterCompany("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                    setFilterIdentifier("");
                    setFilterNifCif("");
                    setFilterType("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "telefono" ? true : false}
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <PhoneAndroidOutlined className="icon" />
              <label className="label2">Buscar por móvil</label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("movil");
                    setFilterOpPhone(e.target.value);
                    setFilterName("");
                    setFilterCompany("");
                    setFilterPhone("");
                    setFilterRfc("");
                    setFilterIdentifier("");
                    setFilterNifCif("");
                    setFilterType("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "movil" ? true : false}
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <ReceiptOutlined className="icon" />
              <label className="label2"> Buscar por RFC </label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("rfc");
                    setFilterRfc(e.target.value);
                    setFilterName("");
                    setFilterCompany("");
                    setFilterPhone("");
                    setFilterOpPhone("");
                    setFilterIdentifier("");
                    setFilterNifCif("");
                    setFilterType("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "rfc" ? true : false}
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <FingerprintOutlined className="icon" />
              <label className="label2"> Buscar por Identificador </label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("ide");
                    setFilterIdentifier(e.target.value);
                    setFilterName("");
                    setFilterCompany("");
                    setFilterPhone("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                    setFilterNifCif("");
                    setFilterType("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "ide" ? true : false}
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <PolicyOutlined className="icon" />
              <label className="label2"> Buscar por NIF/CIF </label>
              <input
                className="checkBox"
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("nif");
                    setFilterNifCif(e.target.value);
                    setFilterName("");
                    setFilterCompany("");
                    setFilterPhone("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                    setFilterIdentifier("");
                    setFilterType("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                type="checkbox"
                checked={optionChecked === "nif" ? true : false}
              />
            </Grid>

            {/* <Grid item md={12}>
              <label className="label3"> Buscar por Giro </label>
              <select className="select2">
                <option hidden> Seleccione Giro</option>
              </select>
            </Grid> */}
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
    </ProvidersStyled>
  );
}

const ProvidersStyled = styled.div`
  background-color: #f3f3f8;
  height: 100vh;
  width: 100%;
  display: flex;

  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .main {
    width: 100%;
    height: calc(100vh - 60px);
    padding: 0px 20px;
    margin-top: 60px;
    overflow-y: scroll;

    .container {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 20px;
      margin-bottom: 20px;
      min-height: calc(100% - 100px);
      padding: 20px 20px;
      background: #fff;
      border-radius: 10px;
      box-shadow: rgb(149 157 165 / 20%) 0px 8px 24px;
      .head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        &__title {
          font-size: 14px;
          margin-bottom: 10px;
          h1 {
            margin-bottom: 8px;
            svg {
              font-size: 24px;
              margin-right: 5px;
              color: #103c82;
            }
          }
        }
        .btn_add {
          padding: 10px 15px;
          text-transform: capitalize;
          background: #103c82;
          color: #fff;
          font-size: 13px;
          border-radius: 10px;
          svg {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            border: 1px solid #fff;
            padding: 2px;
            margin-right: 5px;
          }
        }
      }
      .ctr_filter {
        display: flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        &__ctr_input {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          position: relative;
          margin-bottom: 10px;
          .inputText {
            width: 100%;
            height: 40px;

            input {
              padding-left: 40px;
              padding-right: 40px;
            }
          }
          .MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-formControl.MuiInputBase-marginDense.MuiOutlinedInput-marginDense {
            border-radius: 10px;
          }
          .search {
            width: 30px;
            height: 30px;
            padding: 5px;
            color: #8a8a8a;
            transition: all 0.4s ease;
            position: absolute;
            left: 10px;
          }
          .filters {
            width: 30px;
            height: 30px;
            padding: 5px;
            color: #8a8a8a;
            transition: all 0.4s ease;
            position: absolute;
            right: 10px;
            &:hover {
              padding: 3px;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
`;
