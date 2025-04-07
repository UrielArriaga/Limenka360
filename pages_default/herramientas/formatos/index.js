import React, { useEffect, useRef, useState } from "react";
import SideBar from "../../../components/SideBar";
import styled from "styled-components";
import NavBarDashboard from "../../../components/NavBarDashboard";

import { Button, TextField, Chip, Grid, Tooltip, Avatar, Box, LinearProgress } from "@material-ui/core";
import { Add, FilterList, SearchOutlined, Cached, Description, InsertDriveFile, Image } from "@material-ui/icons";

import { api } from "../../../services/api";
import dayjs from "dayjs";
import ModalAddFormat from "../../../components/ModalAddFormat";
import DirectorLayout from "../../../layouts/DirectorLayout";
import { colors } from "../../../styles/global.styles";

/**
 * @author Montoya
 */
export default function Formatos() {
  const [showFilters, setshowFilters] = useState(false);
  const [searchKey, setSearchKey] = useState("");

  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const [flag, setFlag] = useState(false);
  const [showChipsProducts, setShowChipsProducts] = useState(false);

  const [formats, setFormats] = useState([]);

  useEffect(() => {
    const getFormats = async () => {
      try {
        setIsLoading(true);
        let query = {};
        if (searchKey) {
          query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }
        let params = {
          where: JSON.stringify(query),
          order: `${"-createdAt"}`,
        };
        let res = await api.get("formats?count=1&all=1", { params });

        setFormats(res.data.results);
        setCount(res.data.count);
        setIsLoading(false);
      } catch (error) {
        console.log("Error", error);
      }
    };
    getFormats();
  }, [flag]);

  const closeDrawerFilters = () => {
    setshowFilters(!showFilters);
    setShowChipsProducts(!showChipsProducts);
  };

  const openAddFile = () => {
    setOpenAdd(true);
  };

  const closeAddFile = () => {
    setOpenAdd(false);
  };

  const handleFilter = e => {
    cleanPagination();
    setShowChipsProducts(!showChipsProducts);
    closeDrawerFilters();
  };

  const cleanPagination = () => {
    setFlag(!flag);
  };

  const removeSearches = () => {
    setSearchKey("");
    cleanPagination();
  };

  const Chips = () => {
    if (showChipsProducts) {
      return (
        <div>
          {searchKey && (
            <Chip
              color="primary"
              size="small"
              onDelete={removeSearches}
              label={`Buscando por nombre:  ${searchKey}`}
              className="chip"
            />
          )}
        </div>
      );
    }
  };

  const reload = () => {
    setFlag(!flag);
  };

  function getDocument(url) {
    if (!url) {
      return (
        <div className="file broken">
          <p> Hubo un problema con el documento</p>
        </div>
      );
    }
    try {
      return (
        <iframe
          src={`https://docs.google.com/viewer?url=${url}&embedded=true`}
          width="180"
          height="240"
          scrolling="no"
          className="file"
          loading="lazy"
          border="0"
          onload={() => console.log("this", this)}
        />
      );
    } catch (error) {
      return <div className="file broken">Problem solving url</div>;
    }
  }

  return (
    <DirectorLayout>
      <ObservationStyled>
        {/* <SideBar />
      <NavBarDashboard sideBar={true} /> */}
        <div className="main">
          <div className="container">
            <div className="sidebar">
              {/* <div className={`btn`}>
              <InsertDriveFile></InsertDriveFile> <p>Documentos</p>
            </div>
            <div className={`btn`}>
              <Image></Image> <p>Imagenes</p>
            </div> */}
              <div className={`btn selected`}>
                <Description></Description> <p>Formatos</p>
              </div>
            </div>
            <div className="cont">
              <div className="head">
                <div className="head__title">
                  <div className="total">
                    <h1>
                      <Description className="icon" /> Formatos
                    </h1>
                    <a>({`${count} registros`})</a>
                    <Tooltip arrow title="Recargar" placement="right">
                      <Cached className="reload" onClick={reload} />
                    </Tooltip>
                  </div>
                </div>

                <Button variant="contained" className="btn_add" onClick={() => openAddFile()}>
                  <Add />
                  <p>Añadir archivo</p>
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
                    label={searchKey !== "" && "Buscar formato"}
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
                {Chips()}
              </div>

              <div className="files">
                {isLoading ? (
                  <Box display="flex" justifyContent="center">
                    <div id="ctr_load">
                      <div id="ctr_load__img">
                        <img src="/load.png" />
                      </div>
                      <div id="ctr_load__load">
                        <p>Cargando</p>
                        <LinearProgress color="primary" />
                      </div>
                    </div>
                  </Box>
                ) : (
                  <>
                    {formats.map((item, index) => {
                      return (
                        <Grid container className={`row ${index % 2 == 0 && "par"}`}>
                          <Grid item xs={4} className="container-image">
                            {getDocument(item.url)}
                          </Grid>
                          <Grid item xs={8} className="info">
                            <div>
                              <p className="name">{item.name}</p>
                              <p className="">
                                ID <b>{item.id}</b>
                              </p>
                              <p>
                                Fecha de creación <b>{dayjs(item.createdAt).format("DD/MM/YYYY h:mm")}</b>
                              </p>
                            </div>
                          </Grid>
                        </Grid>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <ModalAddFormat open={openAdd} setOpen={setOpenAdd} reload={reload} />
      </ObservationStyled>
    </DirectorLayout>
  );
}

const ObservationStyled = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  background: url("https://limenka.sfo3.digitaloceanspaces.com/img/limenka360.png");
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
      max-height: 87vh;
      #ctr_load {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;

        &__img {
          width: 200px;
          animation: slide 3s infinite;
          img {
            width: 100%;
            object-fit: contain;
          }
        }
        &__load {
          display: flex;
          flex-direction: column;
          justify-content: center;
          line-height: 30px;
          width: 400px;
          p {
            text-align: center;
            font-weight: bold;
          }
        }
        @keyframes slide {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
      }

      .sidebar {
        width: 20%;
        float: left;
        background-color: #fff;
        margin: 20px 10px 20px 20px;
        padding: 20px;
        @media (max-width: 550px) {
          display: none;
        }
        .btn {
          border: 1px solid #103c82;
          border-radius: 4px;
          height: 32px;
          display: flex;
          align-content: center;
          text-align: center;
          align-items: center;
          margin: 5px 0;
          color: #103c82;
          background-color: #ffffff;
          transition: all 0.5s;
          box-shadow: -1px 9px 6px -10px rgba(0, 0, 0, 0.67);

          :hover {
            cursor: pointer;
            color: #ffffff;
            background-color: #103c82;
            box-shadow: -1px 9px 6px -6px rgba(0, 0, 0, 0.67);
          }
        }
        .selected {
          color: #ffffff;
          background-color: #103c82;
        }
      }

      .cont {
        padding: 20px;
        background-color: #fff;
        margin: 20px 20px 20px 10px;
        width: 100%;

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
            display: flex;
            flex-wrap: wrap;
            .icon {
              font-size: 27px;
              @media (max-width: 550px) {
                display: none;
              }
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
            p {
              @media (max-width: 550px) {
                display: none;
              }
            }
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
        .files {
          /* height: 640px; */
          height: 60vh;
          overflow-y: auto;
          overflow-x: hidden;
          ::-webkit-scrollbar {
            width: 6px;
            height: 6px;
          }
          ::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px #b7b7b7;
          }
          ::-webkit-scrollbar-thumb {
            -webkit-box-shadow: inset 0 0 20px #b7b7b7;
          }
          .row {
            height: 260px;

            .container-image {
              display: flex;
              align-items: center;
              align-content: center;
              text-align: center;
              margin: auto;
              .image {
                margin: auto;
                width: 60px;
                height: 80px;
              }
              .file {
                margin: auto;

                .ndfHFb-c4YZDc-q77wGc {
                  display: none;
                  opacity: 0;
                }
              }
              .broken {
                width: 180px;
                height: 240px;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                background-color: #ccc;
              }
            }
            .info {
              display: flex;
              align-items: center;
              color: #8e9194;

              .name {
                font-size: 24px;
                margin-bottom: 32px;
              }
            }
          }
          .par {
            background-color: #e9ecef;
          }
        }
      }
    }
  }
`;
