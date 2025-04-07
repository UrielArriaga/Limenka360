import React, { useEffect, useState } from "react";
import SideBar from "../../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";
import TemplatesTable from "../../../components/TableTemplates";
import { Button, TextField, Grid, Chip } from "@material-ui/core";
import {Add,Close,FilterList,Group,People,SearchOutlined,GroupWork,DescriptionOutlined,MergeType} from "@material-ui/icons";
import router from "next/router";
import { DrawerContainer } from "../../../styles/Propectos";
import useValidateLogin from "../../../hooks/useValidateLogin";
import LoaderPage from "../../../components/LoaderPage";
import MainLayout from "../../../components/MainLayout";
import ReactSelect from "react-select";

export default function Templates(page) {
  const { isLoadingPage } = useValidateLogin(["gerente", "ejecutivo"]);
  const [totalTemplates, setTotalTemplates] = useState(0);
  const [showFilters, setshowFilters] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterPlantilla, setFilterPlantilla] = useState("");
  const [filterTipo, setFilterTipo] = useState("");
  const [flag, setFlag] = useState(false);
  const [showChipsProducts, setShowChipsProducts] = useState(false);
  const [optionChecked, setOptionChecked] = useState("");
  const [filter, setFilter] = useState("");

  const [orderBy, setOrderBy] = useState('createdAt'); 
  const [order, setOrder] = useState('asc');


  const [options] = useState([
    { id: "description", name: "Buscar por descripción" },
    { id: "type", name: "Buscar por tipo" },
  ]);

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
    setOptionChecked("");
  };
  const handleOrderToggle = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc'); 
  };
  const handleOrderByDate = () => {
    setOrderBy('createdAt');  
    setOrder('asc');          
  };
  
  
  const handleOption = item => {
    let ord = {
      value: item.id,
      label: item.name,
    };
    setOptionChecked(item.id);
    item !== "" ? setFilter(ord) : setFilter({});
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

  const removeFilter = () => {
    setFilter("");
    setSearchKey("");
    cleanPagination();
  };

  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {filter?.value === "description" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeFilter}
              label={`${"Buscando por nombre de plantilla:"} ${searchKey}`}
              className="chip"
            />
          )}
          {filter?.value === "type" && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeFilter}
              label={`${"Buscando por tipo de plantilla:"} ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  const navigateCreateNew = () => {
    router.push("../herramientas/plantillas/nuevo");
  };

  if (isLoadingPage) return <LoaderPage />;

  const ToggleButton = styled('div')(({ isAsc }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '50px',
    height: '24px',
    backgroundColor: '#E0E0E0',
    borderRadius: '12px',
    position: 'relative',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '& .toggle-circle': {
      width: '20px',
      height: '20px',
      backgroundColor: '#0288D1',
      borderRadius: '50%',
      position: 'absolute',
      top: '2px',
      left: isAsc ? '2px' : 'calc(100% - 22px)',
      transition: 'left 0.3s ease',
    },
  }));
  return (
    <MainLayout>
      <PlantillasStyled>
        <div className="main">
          <div className="container">
            <div className="head">
              <div className="head__title">
                <h1>
                  <DescriptionOutlined /> Plantillas {`(${totalTemplates} registros)`}
                </h1>
              </div>
              <Button variant="contained" className="btn_add" onClick={() => navigateCreateNew()}>
                <Add />
                <p>Agregar Plantilla</p>
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
            <Grid container alignItems="center" justifyContent="flex-end" spacing={2}>
               
                <Grid item>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Ascendente</p>
                </Grid>

                <Grid item>
                  <ToggleButton isAsc={order === 'asc'} onClick={handleOrderToggle}>
                    <div className="toggle-circle" />
                  </ToggleButton>
                </Grid>

                <Grid item>
                  <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold', color: '#555' }}>Descendente</p>
                </Grid>
              </Grid>
         {/*
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleOrderByDate}
                    style={{ marginBottom: '15px' }}
                  >
                    Ordenar por Fecha
                  </Button>
                 */}  

            <div className="filters_chip" style={{ marginBlockEnd: "1%" }}>
              {Chips()}{" "}
            </div>
            <TemplatesTable
                totalTemplates={totalTemplates}
                setTotalTemplates={setTotalTemplates}
                searchKey={searchKey}
                filterPlantilla={filterPlantilla}
                flag={flag}
                setFlag={() => setFlag(!flag)}
                filterTipo={filterTipo}
                filter={filter}
                order={order} 
                orderBy={orderBy} 
                handleOrderToggle={handleOrderToggle} 
                handleOrderByDate={handleOrderByDate} 
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
                <DescriptionOutlined className="icon" />
                <label className="label2"> Buscar por:</label>
                <ReactSelect
                  placeholder="Seleccione una opción"
                  onChange={e => (e === null ? handleOption("") : handleOption(e))}
                  isClearable={true}
                  options={options}
                  value={options?.filter(item => item.id === filter?.value)}
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
      </PlantillasStyled>
    </MainLayout>
  );
  
}

const PlantillasStyled = styled.div`
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

