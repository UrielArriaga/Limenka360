import { Box, Chip, Divider, Grid, IconButton, LinearProgress, Switch, TextField, Tooltip } from "@material-ui/core";
import Head from "next/head";
import React, { useContext, useEffect, useState } from "react";
import { ArrowBack, Cached, People, SearchOutlined } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { api } from "../../services/api";
import { useRouter } from "next/router";
import { toUpperCaseChart } from "../../utils";
import SideBar from "../../components/SideBar";
import NavBarDashboard from "../../components/NavBarDashboard";
import { EjecutivesStyled, PurpleSwitch } from "../../styles/InteligenciaComercial/ejecutives.styled";
import Filters from "../../components/Filters";
import { commonSelector } from "../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import DataOrder from "../../components/DataOrder";
import { CommonFiltersContext } from "../../context/commonFiltersContext";
export default function Ejecutivos() {
  const router = useRouter();
  const { intelligenceEjecutives: options } = useContext(CommonFiltersContext);
  const { daysFilter } = useSelector(commonSelector);
  const [open, setOpen] = useState(false);
  const [totalEjecutives, setTotalEjecutives] = useState(0);
  const [ejecutivesTable, setEjecutivesTable] = useState([]);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 20;
  const [isLoaderData, setIsLoaderData] = useState(false);
  const SEPARATION = 4;
  const [filters, setFilters] = useState([]);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const filterOptionsSelect = [
    {
      id: "createdAt",
      options: daysFilter,
    },
  ];
  const handleRefetch = () => setRefetch(!refetch);

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);
  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAllEjecutives();
    }
    return () => (mounted = false);
  }, [page, refetch, orderby, ASC, isReadyLocalStorage]);
  const getLocalStorage = () => {
    let searchkey = localStorage.getItem("ejecutivesIntelligence_keyword");

    if (searchkey) {
      setNameSearch(searchkey);
      setSearchKey(searchKey);
    }
    let searchkeyword = localStorage.getItem("ejecutivesIntelligence_filters");
    if (searchkeyword) {
      let formatFilters = JSON.parse(searchkeyword);
      setFilters(formatFilters);
    }
    let orderby = localStorage.getItem("ejecutivesIntelligence_order");
    if (orderby) {
      setOrderby(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("ejecutivesIntelligence_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    setIsReadyLocalStorage(true);
  };
  const getAllEjecutives = async () => {
    setIsLoaderData(true);
    try {
      let query = {};
      query.groupId = router.query.groupId;
      query.prospect = { isclient: false, discarted: false, isoportunity: false };
      for (let i = 0; i < filters.length; i++) {
        const currentQuery = filters[i];
        if (currentQuery.typeof === "date") {
          query.prospect[currentQuery.id] = {
            between: currentQuery.value,
          };
        }
      }

      if (hasValue(searchKey)) {
        if (searchKey.includes("@")) {
          query.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(searchKey.trim())) {
          query.phone = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else {
          query.fullname = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }
      } else {
        setSearchKey("");
      }
      let params = {
        count: 1,
        skip: page,
        limit: limit,
        order: `${ASC ? "" : "-"}${orderby}`,
        include: "group",
        where: JSON.stringify(query),
      };
      let response = await api.get(`dashboard/ejecutivesprospect`, { params });
      let dataResults = response.data.results;

      setTotalEjecutives(response.data.count);
      setEjecutivesTable(dataResults);
      saveLocalStorage(filters, "query", "ejecutivesIntelligence_filters");
      saveLocalStorage(orderby, "order", "ejecutivesIntelligence_order");
      saveLocalStorage(ASC, "asc", "ejecutivesIntelligence_asc");
      setIsLoaderData(false);
    } catch (error) {
      setIsLoaderData(false);
      console.log(error);
    }
  };

  const saveLocalStorage = (value, type, key) => {
    switch (type) {
      case "keyword":
        localStorage.setItem(key, value);
        break;

      case "query":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };
  const handlePagination = (event, page) => {
    setPage(page);
  };
  const validateSearchBoxEmpty = string => {
    if (string === "") {
      setNameSearch("");
      setRefetch(!refetch);
    }
    setSearchKey(string);
  };
  const handleClickName = item => {
    router.push({ pathname: "prospectos", query: { ejecutiveId: item.id } });
  };
  const handlClickDeleteFilter = (_, itemXX) => {
    let newArrayFilters = [...filters];
    let query = newArrayFilters.filter((item, index) => item.identifier !== itemXX.identifier);
    setFilters(query);
    setRefetch(!refetch);
  };

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  return (
    <EjecutivesStyled>
      <Head>
        <title>CRM JOBS - Ejecutivos</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <NavBarDashboard sideBar={true} />

      <div className="main">
        <div className="ctr_ejecutives">
          <div className="head">
            <div className="head__title">
              <div className="head__titleDiv">
                <IconButton onClick={() => router.back()} className="buttonIcon">
                  <ArrowBack className="icon" />
                </IconButton>
                <h1>Ejecutivos</h1>
              </div>

              <div className="head__total">
                <People />
                {`${totalEjecutives} Registros`}
                <Cached
                  className="reload"
                  onClick={() => {
                    setRefetch(!refetch);
                  }}
                />
              </div>
            </div>
          </div>
          <div className="ctr_filter">
            <div className="input">
              <TextField
                variant="outlined"
                type="search"
                value={searchKey}
                onChange={e => validateSearchBoxEmpty(e.target.value)}
                placeholder="Ingrese Nombre o correo de ejecutivo"
                size="small"
                className="inputText"
                onKeyDown={e => {
                  if (e.key === "Enter") {
                    setNameSearch(searchKey);
                    setRefetch(!refetch);
                    if (page > 1) {
                      setPage(1);
                    }
                  }
                }}
              />
              <SearchOutlined className="search" />
            </div>
          </div>

          <Box className="filters">
            <Grid
              style={{ marginRight: 8 }}
              component="label"
              container
              alignItems="center"
              justifyContent="flex-end"
              spacing={1}
            >
              <DataOrder
                falling={ASC}
                setFalling={setASC}
                order={orderby}
                setOrder={setOrderby}
                addOptions={[
                  { label: "Fecha Creación ", value: "createdAt" },
                  { label: "Fecha Actualización", value: "updatedAt" },
                  { label: "Total de Prospectos", value: "totalProspects" },
                ]}
                addOptionsOrderBy={[
                  { label: "Descendente", value: "-" },
                  { label: "Ascendente ", value: "" },
                ]}
              />
            </Grid>
            <Filters
              primaryColor=""
              filters={filters}
              setFilters={setFilters}
              options={options.optionsFilters}
              options_by={filterOptionsSelect}
              refetch={handleRefetch}
              closeAfter
            />
          </Box>
          <ActiveFilters filters={filters} onClickDelete={handlClickDeleteFilter} />

          {isLoaderData && (
            <div className="ctr_load">
              <div className="img">
                <img src="/load.png" />
              </div>
              <div className="load">
                <p>Cargando</p>
                <LinearProgress color="primary" />
              </div>
            </div>
          )}

          {!isLoaderData && (
            <>
              <div className="gridtable">
                <Grid container className="header">
                  <Grid item md={SEPARATION}>
                    Nombre
                  </Grid>

                  <Grid item md={SEPARATION}>
                    Correo
                  </Grid>
                  <Grid item md={SEPARATION}>
                    Telefono
                  </Grid>

                  <Grid item md={SEPARATION}>
                    Total de Prospectos
                  </Grid>
                  <Grid item md={SEPARATION}>
                    Grupo
                  </Grid>
                </Grid>
                {ejecutivesTable.length === 0 ? (
                  <div className="ctr_load">
                    <div className="img">
                      <img src="/load.png" />
                    </div>
                    <div className="load">
                      <p>No hay datos</p>
                    </div>
                  </div>
                ) : (
                  ejecutivesTable.map((item, index) => {
                    return (
                      <Grid container key={index} className="body">
                        <Grid item md={SEPARATION} className="name">
                          <Tooltip title={`Ver prospectos de ${item.fullname} `}>
                            <div onClick={() => handleClickName(item, true)} className="name capitalize">
                              {item.fullname}
                            </div>
                          </Tooltip>
                        </Grid>

                        <Grid item md={SEPARATION}>
                          {item?.email}
                        </Grid>
                        <Grid item md={SEPARATION}>
                          {item?.phone}
                        </Grid>
                        <Grid item md={SEPARATION}>
                          {item?.totalProspects}
                        </Grid>
                        <Grid item md={SEPARATION}>
                          {toUpperCaseChart(item?.group?.name)}
                        </Grid>
                      </Grid>
                    );
                  })
                )}
              </div>
              {totalEjecutives > 0 && (
                <div className="pagination">
                  <Pagination
                    style={{ display: "flex", justifyContent: "center" }}
                    page={page}
                    defaultPage={1}
                    onChange={handlePagination}
                    shape="rounded"
                    count={Math.ceil(totalEjecutives / limit)}
                    color="primary"
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </EjecutivesStyled>
  );
}
function ActiveFilters({ filters = [], onClickDelete }) {
  if (filters.length <= 0) return <div />;
  return (
    <div className="activefilterssection">
      {filters.map((item, index) => {
        return (
          <Chip
            key={index}
            color="primary"
            size="small"
            onDelete={() => onClickDelete(index, item)}
            label={`${item.label} : ${item.name}`}
            className="chip"
            style={{ marginRight: 10 }}
          />
        );
      })}
    </div>
  );
}
const optionsOrder = [
  { label: "Fecha de Creación", value: "createdAt" },
  { label: "Fecha de Actualización", value: "updatedAt" },
  { label: " Total de Prospectos", value: "totalProspects" },
];
const optionsFilters = [
  {
    label: "Fecha Alta Prospectos",
    value: "createdAt",
    getNameChip: "label",
    getValue: "value",
    identifier: "createdAt",
    type: "query",
    deleteId: "lastTrackingcreatedAt",
    typeof: "date",
  },
];
