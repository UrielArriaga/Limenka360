import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import BrandsTable from "../../../components/TableBrands";

import { Button, TextField, Chip, Grid, Tooltip } from "@material-ui/core";
import { Close, FilterList, SearchOutlined, Cached, PersonPinCircle, TrackChangesOutlined } from "@material-ui/icons";
import { DrawerContainer } from "../../../styles/Propectos";
import { userSelector } from "../../../redux/slices/userSlice";
import { useSelector } from "react-redux";

export default function Brands(isLoading, handleAlert, setAlert) {
  const { roleId } = useSelector(userSelector);
  const [totalBrands, setTotalBrands] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterBrand, setFilterBrand] = useState("");
  const [flag, setFlag] = useState(false);
  const [page, setPage] = useState(1);

  const [showChipsProducts, setShowChipsProducts] = useState(false);

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

  const removeBrand = () => {
    setFilterBrand("");
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
          {filterBrand !== "" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeBrand}
              label={`${"Buscando por Marca"}`}
              className="chip"
            />
          )}
          {searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeSearches}
              label={` Buscando por Marca : ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  return (
    <BrandStyled>
      <SideBar />
      <NavBarDashboard sideBar={false} />
      <div className="main">
        <div className="container">
          <div className="head">
            <div className="head__title">
              <div className="total">
                <h1>
                  <TrackChangesOutlined className="icon" /> Marcas
                </h1>
                <a>({`${totalBrands} registros`})</a>
                <Tooltip arrow title="Recargar" placement="right">
                  <Cached className="reload" onClick={() => setFlag(!flag)} />
                </Tooltip>
              </div>
            </div>
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
                    setPage(1);
                  }
                }}
                label={searchKey !== "" && "Buscar marca"}
                placeholder="Búsqueda"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setSearchKey(e.target.value);
                    setFlag(!flag);
                    setPage(1);
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
          <BrandsTable
            page={page}
            setPage={setPage}
            totalBrands={totalBrands}
            setTotalBrands={setTotalBrands}
            searchKey={searchKey}
            filterBrand={filterBrand}
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
              <label className="label2"> Buscar por marca</label>

              <input
                onChange={e => {
                  setFilterBrand(e.target.value);
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
    </BrandStyled>
  );
}

const BrandStyled = styled.div`
  background-color: #f3f3f8;
  height: 100vh;
  width: 100%;
  display: flex;
  .main {
    width: calc(100%);
    height: calc(100vh - 60px);
    padding: 0px 20px;
    margin-top: 60px;
    overflow-y: scroll;
    background: url(https://img.freepik.com/foto-gratis/textura-pared-estuco-azul-marino-relieve-decorativo-abstracto-grunge-fondo-color-rugoso-gran-angular_1258-28311.jpg?t=st=1660239016~exp=1660239616~hmac=cfca96be2fc16afcbcbebcde45a58e0f4f6b8d3dad43c0600c676f1d640b7b92);
    .container {
      width: 100%;
      max-width: 1400px;
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
