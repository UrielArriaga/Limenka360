import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import OriginsTable from "../../../components/TableOrigins";

import ChannelsTable from "../../../components/TableChannels";
import { Button, TextField, CircularProgress, Chip, Grid, Tooltip } from "@material-ui/core";
import {
  Add,
  Close,
  FilterList,
  Group,
  People,
  SearchOutlined,
  Cached,
  Category,
  PersonPinCircle,
  TrackChangesOutlined,
} from "@material-ui/icons";
import router from "next/router";
import { DrawerContainer } from "../../../styles/Propectos";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import DirectorLayout from "../../../layouts/DirectorLayout";
import Head from "next/head";
import LoaderPage from "../../../components/LoaderPage";
import useValidateLogin from "../../../hooks/useValidateLogin";

export default function Origins(page, isLoading, handleAlert, setAlert) {
  const { isLoadingPage } = useValidateLogin(["Admin_compania", "admin", "director"]);
  const { roleId } = useSelector(userSelector);
  const [totalChanel, setTotalChanel] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterChanel, setFilterChanel] = useState("");
  const [flag, setFlag] = useState(false);
  const [showChipsProducts, setShowChipsProducts] = useState(false);

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
  };

  const navigateCreateNew = () => {
    router.push("../catalogos/canales/nuevo");
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

  const removeOrigin = () => {
    setFilterChanel("");
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
          {filterChanel !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeOrigin}
              label={`${"Buscando por Canal"}`}
              className="chip"
            />
          )}
          {searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeSearches}
              label={` Buscando por Canal : ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };
  if (isLoadingPage) return <LoaderPage />;
  return (
    <DirectorLayout>
      <OriginStyled>
        <Head>
          <title>CRM JOBS - Canales</title>
        </Head>
        {/* <SideBar />
      <NavBarDashboard sideBar={false} /> */}
        <div className="main">
          <div className="container">
            <div className="head">
              <div className="head__title">
                <div className="total">
                  <h1>
                    <TrackChangesOutlined className="icon" /> Canales
                  </h1>
                  <a>({`${totalChanel} registros`})</a>
                  <Tooltip arrow title="Recargar" placement="right">
                    <Cached className="reload" onClick={() => setFlag(!flag)} />
                  </Tooltip>
                </div>
              </div>
              <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
                <Add />
                <p>Agregar Canal</p>
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
                  label={searchKey !== "" && "Buscar origen"}
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
                  }}
                />
              </div>
            </div>

            <div className="filters_chip" style={{ marginBlockEnd: "1%" }}>
              {Chips()}
            </div>
            <ChannelsTable
              totalChanel={totalChanel}
              setTotalChanel={setTotalChanel}
              searchKey={searchKey}
              filterChanel={filterChanel}
              flag={flag}
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
                <PersonPinCircle className="icon" />
                <label className="label2"> Buscar por canal</label>

                <input
                  onChange={e => {
                    setFilterChanel(e.target.value);
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
      </OriginStyled>
    </DirectorLayout>
  );
}

const OriginStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  .main {
    height: calc(100vh - 60px);
    width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    .container {
      width: calc(100% - 50px);
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
          margin-bottom: 10px;
          h1 {
            font-size: 24px;
            svg {
              font-size: 24px;
              margin-right: 5px;
              color: #103c82;
            }
          }
        }

        .total {
          .icon {
            font-size: 27px;
          }
          a {
            margin-left: 10px;
            font-size: 15px;
          }

          display: flex;
          align-items: center;
          font-weight: 600;
          svg {
            font-size: 14px;
            margin-right: 5px;
            color: #103c82;
          }
          .reload {
            font-size: 18px;
            margin-left: 10px;
            cursor: pointer;
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
