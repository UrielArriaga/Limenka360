import React, { useEffect, useState } from "react";
import SideBar from "../../SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../NavBarDashboard";
import PhaseTable from "../../TablePhase";
import CompaniesTable from "../../TableClientsCompanies";
import { Add, DynamicFeed, FilterList, SearchOutlined, Close, Business, GroupWork } from "@material-ui/icons";
import { Button, TextField, Chip, Grid } from "@material-ui/core";
import router from "next/router";
import { DrawerContainer } from "../../../styles/Propectos";
import { api } from "../../../services/api";
import Select from "react-select";
import MainLayout from "../../MainLayout";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import Head from "next/head";

export default function ClientsCompaniesManager(page) {
  const { roleId } = useSelector(userSelector);
  const [totalPhases, setTotalPhases] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");

  const [optionChecked, setOptionChecked] = useState("");
  const [filterCompany, setFilterCompany] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");
  const [filterOpPhone, setFilterOpPhone] = useState("");
  const [filterRfc, setFilterRfc] = useState("");

  const [flag, setFlag] = useState(false);
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [comercial, setComercial] = useState([]);
  const [orders, setOrders] = useState([
    { id: "amount", name: "Monto adjudicado ascendente" },
    { id: "-amount", name: "Monto adjudicado descendente" },
  ]);

  const [cB, setCB] = useState("");
  const [filterOrder, setFilterOrder] = useState("");
  useEffect(() => {
    getComercialBusiness();
  }, []);

  const getComercialBusiness = async () => {
    try {
      let comercial = await api.get(`commercialbusinesses?limit=100`);
      setComercial(comercial.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
    setOptionChecked("");
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

  const removePhase = () => {
    setFilterCompany("");
    setSearchKey("");
    cleanPagination();
  };

  const removeEmail = () => {
    setFilterEmail("");
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

  const removeRfc = () => {
    setFilterRfc("");
    setSearchKey("");
    cleanPagination();
  };

  const removeOrder = () => {
    setFilterOrder("");
    setSearchKey("");
    cleanPagination();
    setFlag(!flag);
  };

  const removeGiro = () => {
    setCB("");
    cleanPagination();
  };
  const removeSearches = () => {
    setSearchKey("");
    cleanPagination();
  };

  const handleSelectTags = item => {
    let tag = {
      value: item.id,
      label: item.name,
    };
    item !== "" ? setCB(tag) : setCB({});

    console.log(tag);
  };

  const handleOrder = item => {
    let ord = {
      value: item.id,
      label: item.name,
    };
    item !== "" ? setFilterOrder(ord) : setFilterOrder({});
  };

  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {filterCompany !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removePhase}
              label={`${"Buscando por compañía:"}`}
              className="chip"
            />
          )}
          {filterEmail !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeEmail}
              label={`${"Buscando por correo:"}`}
              className="chip"
            />
          )}
          {filterPhone !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removePhone}
              label={`${"Buscando por teléfono:"}`}
              className="chip"
            />
          )}
          {filterOpPhone !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeOpPhone}
              label={`${"Buscando por Móvil:"}`}
              className="chip"
            />
          )}
          {filterOrder && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeOrder}
              label={`${"Monto adjudicado"}`}
              className="chip"
            />
          )}

          {filterRfc !== "" && (
            <Chip color="primary" size="small" onDelete={removeRfc} label={`${"Buscando por Rfc:"}`} className="chip" />
          )}
          {cB && <Chip color="primary" size="small" onDelete={removeGiro} label={`${cB?.label}`} className="chip" />}
          {searchKey && (
            <Chip color="primary" size="small" onDelete={removeSearches} label={` ${searchKey}`} className="chip" />
          )}
        </div>
      );
    }
  };

  const navigateCreateNew = () => {
    router.push("../catalogos/empresas/nuevo");
  };
  return (
    <GruposStyled>
      <Head>
        <title>CRM JOBS - Clientes Compañias</title>
      </Head>
      <div className="main">
        <div className="container">
          <div className="head">
            <div className="head__title">
              <h1>
                {" "}
                <DynamicFeed /> Clientes Compañías {`(${totalPhases} registros)`}
              </h1>
            </div>
            <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
              <Add />
              <p>Compañía nueva</p>
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
                label={searchKey !== "" && "Buscar Fase"}
                placeholder="Búsqueda"
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
          <CompaniesTable
            totalPhases={totalPhases}
            setTotalPhases={setTotalPhases}
            searchKey={searchKey}
            filterCompany={filterCompany}
            filterEmail={filterEmail}
            filterPhone={filterPhone}
            filterOpPhone={filterOpPhone}
            filterRfc={filterRfc}
            filterOrder={filterOrder}
            cB={cB}
            flag={flag}
            comercial={comercial}
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
              <GroupWork className="icon" />
              <label className="label2"> Buscar por Compañía</label>

              <input
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("company");
                    setFilterCompany(e.target.value);
                    setFilterEmail("");
                    setFilterOpPhone("");
                    setFilterPhone("");
                    setFilterRfc("");
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
              <GroupWork className="icon" />
              <label className="label2"> Buscar por Correo</label>

              <input
                onChange={e => {
                  if (e.target.checked === true) {
                    setOptionChecked("email");
                    setFilterEmail(e.target.value);
                    setFilterPhone("");
                    setFilterCompany("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                checked={optionChecked === "email" ? true : false}
                type="checkbox"
                className="checkBox"
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <GroupWork className="icon" />
              <label className="label2"> Buscar por Teléfono</label>

              <input
                onChange={e => {
                  if (e.target.checked === true) {
                    setFilterPhone(e.target.value);
                    setOptionChecked("phone");
                    setFilterCompany("");
                    setFilterEmail("");
                    setFilterOpPhone("");
                    setFilterRfc("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                checked={optionChecked === "phone" ? true : false}
                type="checkbox"
                className="checkBox"
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <GroupWork className="icon" />
              <label className="label2"> Buscar por Móvil</label>

              <input
                onChange={e => {
                  if (e.target.checked === true) {
                    setFilterOpPhone(e.target.value);
                    setOptionChecked("opphone");
                    setFilterCompany("");
                    setFilterEmail("");
                    setFilterRfc("");
                    setFilterPhone("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                checked={optionChecked === "opphone" ? true : false}
                type="checkbox"
                className="checkBox"
              />
            </Grid>

            <Grid item md={12} className="casilla">
              <GroupWork className="icon" />
              <label className="label2"> Buscar por Rfc</label>

              <input
                onChange={e => {
                  if (e.target.checked === true) {
                    setFilterRfc(e.target.checked === true);
                    setFilterOpPhone("");
                    setOptionChecked("rfc");
                    setFilterCompany("");
                    setFilterEmail("");
                    setFilterPhone("");
                  } else {
                    setOptionChecked("");
                  }
                }}
                checked={optionChecked === "rfc" ? true : false}
                type="checkbox"
                className="checkBox"
              />
            </Grid>

            <Grid item md={12}>
              <label className="label3"> Giro Comercial</label>

              <Select
                placeholder="Seleccione una opción"
                onChange={e => (e === null ? handleSelectTags("") : handleSelectTags(e))}
                isClearable={true}
                options={comercial}
                value={comercial?.filter(item => item.id === cB?.value)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
              />
            </Grid>

            <Grid item md={12}>
              <label className="label3"> Ordenar </label>

              <Select
                placeholder="Seleccione una opción"
                onChange={e => (e === null ? handleOrder("") : handleOrder(e))}
                isClearable={true}
                options={orders}
                value={orders?.filter(item => item.id === filterOrder?.value)}
                getOptionValue={option => `${option["id"]}`}
                getOptionLabel={option => `${option.name} `}
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
    </GruposStyled>
  );
}

const GruposStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100vh;
  background-size: cover;
  * {
    margin: 0;
  }

  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .container {
      width: calc(100% - 30px);
      margin: auto;
      margin-top: 26px;
      margin-bottom: 20px;
      min-height: calc(100% - 50%);
      padding: 25px 20px;
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
