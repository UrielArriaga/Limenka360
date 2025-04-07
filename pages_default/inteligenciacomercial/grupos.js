import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import SideBar from "../../components/SideBar";
import NavBarDashboard from "../../components/NavBarDashboard";
import { URL_SPACE, api } from "../../services/api";
import { toUpperCaseChart } from "../../utils";
import { Avatar, Box, Chip, Grid, LinearProgress, Switch, TextField, Tooltip, withStyles } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Cached, People, Refresh, SearchOutlined } from "@material-ui/icons";
import { GropupsStyled, PurpleSwitch } from "../../styles/InteligenciaComercial/groups.styles";
import Filters from "../../components/Filters";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import DataOrder from "../../components/DataOrder";
import { CommonFiltersContext } from "../../context/commonFiltersContext";
import MainLayout from "../../components/MainLayout";
export default function Groups() {
  const { intelligenceGroups: options } = useContext(CommonFiltersContext);
  const { daysFilter } = useSelector(commonSelector);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [groupsTable, setGroupsTable] = useState([]);
  const [totalgroupsTable, setTotalGroupsTable] = useState(0);
  const limit = 20;
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoaderData, setIsLoaderData] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const SEPARATION = 3;
  const [filters, setFilters] = useState([]);
  const handleRefetch = () => setRefetch(!refetch);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const filterOptionsSelect = [
    {
      id: "createdAt",
      options: daysFilter,
    },
  ];
  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAllGroups();
    }
    return () => (mounted = false);
  }, [page, refetch, orderby, ASC, isReadyLocalStorage]);

  const getLocalStorage = () => {
    let searchkeywords = localStorage.getItem("groupsIntelligence_keyword");

    if (searchkeywords) {
      setSearchKey(searchkeywords);
    }
    let searchkeyword = localStorage.getItem("filtersGroupsIntelligence");
    if (searchkeyword) {
      let formatFilters = JSON.parse(searchkeyword);
      setFilters(formatFilters);
    }
    let orderby = localStorage.getItem("groupsIntelligence_order");
    if (orderby) {
      setOrderby(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("groupsIntelligence_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    setIsReadyLocalStorage(true);
  };
  const getAllGroups = async () => {
    if (isReadyLocalStorage === false) return;
    setIsLoaderData(true);

    try {
      let query = {};
      query.prospect = { isclient: false, discarted: false, isoportunity: false };
      if (hasValue(searchKey)) {
        query.name = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        saveLocalStorage(searchKey, "keyword", "groupsIntelligence_keyword");
      }
      for (let i = 0; i < filters.length; i++) {
        const currentQuery = filters[i];
        if (currentQuery.typeof === "date") {
          query.prospect[currentQuery.id] = {
            between: currentQuery.value,
          };
        }
      }

      let params = {
        count: 1,
        skip: page,
        limit: limit,
        order: `${ASC ? "" : "-"}${orderby}`,
        where: JSON.stringify(query),
      };
      let response = await api.get(`dashboard/groupsprospect`, { params });
      let dataResults = response.data.results;

      setTotalGroupsTable(response.data.count);
      setGroupsTable(dataResults);
      saveLocalStorage(filters, "query", "filtersGroupsIntelligence");
      saveLocalStorage(orderby, "order", "groupsIntelligence_order");
      saveLocalStorage(ASC, "asc", "groupsIntelligence_asc");
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

  const handleClickName = item => {
    router.push({ pathname: "ejecutivos", query: { groupId: item.id } });
  };
  const thereIsData = data => {
    if (data) {
      return <p className="cell">{data}</p>;
    } else {
      return <p className="na">N/A</p>;
    }
  };
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);
  const validPhoto = photo => (photo ? URL_SPACE + photo : "");

  const handlClickDeleteFilter = (_, itemXX) => {
    let newArrayFilters = [...filters];
    let query = newArrayFilters.filter((item, index) => item.identifier !== itemXX.identifier);
    setFilters(query);
    setRefetch(!refetch);
  };

  const restorePage = () => {
    if (page > 1) setPage(1);
  };

  const handlePagination = (event, page) => {
    setPage(page);
  };

  const removeSearches = () => {
    setSearchKey("");
    setNameSearch("");
    localStorage.removeItem("groupsIntelligence_keyword");
    restorePage();
    setRefetch(!refetch);
  };
  return (
    <MainLayout>
      <GropupsStyled>
        <Head>
          <title>CRM JOBS -Grupos</title>
        </Head>
        <div className="main">
          <div className="ctr_groups">
            <div className="head">
              <div className="head__title">
                <h1>Grupos</h1>
                <div className="head__total">
                  <People />
                  {`${totalgroupsTable} Registros`}
                  <Tooltip arrow title="Recargar" placement="right">
                    <Cached
                      className="reload"
                      onClick={() => {
                        setRefetch(!refetch);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>
            <div className="ctr_filter">
              <div className="input">
                <TextField
                  variant="outlined"
                  type="search"
                  value={nameSearch}
                  onChange={e => {
                    setNameSearch(e.target.value);
                  }}
                  placeholder="Ingresa Grupo"
                  size="small"
                  className="inputText"
                  onKeyDown={e => {
                    if (e.key === "Enter") {
                      setSearchKey(e.target.value);
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
            <div className="filters">
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
                refetch={handleRefetch}
                closeAfter
              />
            </div>

            <ActiveFilters
              filters={filters}
              onClickDelete={handlClickDeleteFilter}
              removeSearches={removeSearches}
              searchKey={searchKey}
            />

            {isLoaderData && (
              <div className="ctr_load">
                <div className="ctr_load__img">
                  <img src="/load.png" />
                </div>
                <div className="ctr_load__load">
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
                      Grupo
                    </Grid>
                    <Grid item md={SEPARATION}>
                      Logo
                    </Grid>

                    <Grid item md={SEPARATION}>
                      Total de Prospectos
                    </Grid>
                    <Grid item md={SEPARATION}>
                      Color Primario
                    </Grid>
                    <Grid item md={SEPARATION}>
                      Color Secundario
                    </Grid>
                  </Grid>
                  {groupsTable.length === 0 ? (
                    <div className="ctr_load">
                      <div className="ctr_load__img">
                        <img src="/load.png" />
                      </div>
                      <div className="ctr_load__load">
                        <p>No hay datos</p>
                      </div>
                    </div>
                  ) : (
                    groupsTable.map((item, index) => {
                      return (
                        <Grid container key={index} className="body">
                          <Grid item md={SEPARATION} className="name">
                            <Tooltip title={`Ver ejecutivos de ${item?.name} `}>
                              <div onClick={() => handleClickName(item, true)} className="name capitalize">
                                {thereIsData(toUpperCaseChart(item?.name))}
                              </div>
                            </Tooltip>
                          </Grid>
                          <Grid item md={SEPARATION} className="containerAvatar">
                            <Avatar src={validPhoto(item.logo)} alt={item.name} className="avatars">
                              {item.fullName?.charAt(0)}
                            </Avatar>
                          </Grid>
                          <Grid item md={SEPARATION} className="total">
                            {thereIsData(item.totalProspects)}
                          </Grid>
                          <Grid item md={SEPARATION} className="containerColor">
                            <input className="inputColor" type="color" value={item.primarycolor} disabled />
                          </Grid>
                          <Grid item md={SEPARATION} className="containerColor">
                            <input className="inputColor" type="color" value={item.secondarycolor} disabled />
                          </Grid>
                        </Grid>
                      );
                    })
                  )}
                </div>
                {totalgroupsTable > 0 && (
                  <div className="pagination">
                    <Pagination
                      style={{ display: "flex", justifyContent: "center" }}
                      page={page}
                      defaultPage={1}
                      onChange={handlePagination}
                      shape="rounded"
                      count={Math.ceil(totalgroupsTable / limit)}
                      color="primary"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </GropupsStyled>
    </MainLayout>
  );
}

function ActiveFilters({ filters = [], onClickDelete, removeSearches, searchKey }) {
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
const optionsOrder = [
  { label: "Fecha de Creación", value: "createdAt" },
  { label: "Fecha de Actualización", value: "updatedAt" },
  { label: " Total de Prospectos", value: "totalProspects" },
];
const optionsFilters = [
  {
    label: "Fecha de Alta Prospectos",
    value: "createdAt",
    getNameChip: "label",
    getValue: "value",
    identifier: "createdAt",
    type: "query",
    deleteId: "lastTrackingcreatedAt",
    typeof: "date",
  },
];
