import {
  Box,
  Chip,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  Switch,
  TextField,
  Tooltip,
  withStyles,
} from "@material-ui/core";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { ArrowBack, Cached, Edit, OpenInNew, People, Person, SearchOutlined } from "@material-ui/icons";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import { Pagination } from "@material-ui/lab";
import SideBar from "../../components/SideBar";
import NavBarDashboard from "../../components/NavBarDashboard";
import TableLimenka from "../../components/UI/organism/TableLimenka";
import dayjs from "dayjs";
import ModalReasigned from "../../components/ModalReasigned";
import { normalizeGroups } from "../../utils/normalizeData";
import { ProspectosStyled, PurpleSwitch, TableDataId } from "../../styles/InteligenciaComercial/prospects.styled";
import { useSelector } from "react-redux";
import { commonSelector } from "../../redux/slices/commonSlice";
import Filters from "../../components/Filters";
import useModal from "../../hooks/useModal";
import PreviewProspectIntelligence from "../../components/PreviewProspectIntelig";
import { CommonFiltersContext } from "../../context/commonFiltersContext";
import { useContext } from "react";
import DataOrder from "../../components/DataOrder";
import NumberFormat from "react-number-format";
import MainLayout from "../../components/MainLayout";
export default function Prospectos() {
  const { intelligenceProspects: options } = useContext(CommonFiltersContext);
  const { daysFilter } = useSelector(commonSelector);
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [totalProspects, setTotalProspects] = useState(0);
  const [prospectsTable, setProspectsTable] = useState([]);
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [refetch, setRefetch] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoaderData, setIsLoaderData] = useState(false);
  const [nameSearch, setNameSearch] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const limit = 30;
  //Reagiancion
  const [Prospect, setProspect] = useState({});
  const [isMultiReasign, setIsMultiReasign] = useState(false);
  const [openReasing, setopenReasing] = useState(false);
  const [filters, setFilters] = useState([]);
  const [isReadyLocalStorage, setIsReadyLocalStorage] = useState(false);
  const [ProspectPreview, setProspectPreview] = useState({});
  const { open: showDrawer, toggleModal } = useModal();
  const [valueToFind, setValueToFind] = useState({ search: false, keySearch: "" });
  const handleRefetch = () => setRefetch(!refetch);

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getAllProspects();
    }
    return () => (mounted = false);
  }, [page, refetch, orderby, ASC, isReadyLocalStorage]);

  const getLocalStorage = () => {
    let filtersProspects = localStorage.getItem("prospectsIntelligence_filters");
    if (filtersProspects) {
      let formatFilters = JSON.parse(filtersProspects);
      setFilters(formatFilters);
    }
    let orderby = localStorage.getItem("prospectsIntelligence_order");
    if (orderby) {
      setOrderby(JSON.parse(orderby));
    }

    let asc = localStorage.getItem("prospectsIntelligence_asc");
    if (asc) {
      setASC(JSON.parse(asc));
    }
    setIsReadyLocalStorage(true);
  };

  const gerateQuery = () => {
    let query = {};
    // query.isclient = false;
    // query.isoportunity = false;
    // query.discarted = false;
    query.ejecutiveId = router.query.ejecutiveId;
    for (let i = 0; i < filters.length; i++) {
      const currentQuery = filters[i];
      switch (currentQuery.id) {
        case "keySearch":
          let key = currentQuery.value;
          if (key) {
            if (key.includes("@")) {
              query.email = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
            } else if (/^[\+]?[(]?[0-9]{1,3}[)]?[-\s\.]?[0-9]{1,3}[-\s\.]?[0-9]{1,4}$/im.test(key.trim())) {
              query.phone = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
            } else if (/\s/.test(key) === false && key.length === 24) {
              query.id = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
            } else {
              query.fullname = { iRegexp: `${key.trim().toLocaleLowerCase()}` };
            }
          }
          break;
        case "groupId":
          query[currentQuery.inQueryParent] = {
            [currentQuery.id]: currentQuery.value,
          };
        default:
          if (currentQuery.typeof === "date") {
            query[currentQuery.id] = {
              between: currentQuery.value,
            };
          } else {
            if (currentQuery.id !== "groupId") {
              query[currentQuery.id] = currentQuery.value;
            }
          }
          break;
      }
    }

    return query;
  };
  const getAllProspects = async () => {
    if (isReadyLocalStorage === false) return;
    setIsLoaderData(true);
    try {
      let params = {
        count: 1,
        skip: page,
        limit: limit,
        include: "createdby,ejecutive,entity,city,category,clienttype,specialty",
        join: "c,ejecutive,e,c,cat,cli,spe",
        order: `${ASC ? "" : "-"}${orderby}`,
        where: gerateQuery(),
      };
      let response = await api.get(`prospects`, { params });
      let dataResults = response.data.results;
      let dataNormalized = normalizeGroups(dataResults);
      setTotalProspects(response.data.count);
      setProspectsTable(dataNormalized);
      saveLocalStorage(filters, "prospectsIntelligence_filters");
      saveLocalStorage(orderby, "prospectsIntelligence_order");
      saveLocalStorage(ASC, "prospectsIntelligence_asc");
    } catch (error) {
      console.log(error);
    }
    setIsLoaderData(false);
  };
  const saveLocalStorage = (value, key) => {
    switch (key) {
      case "prospectsIntelligence_filters":
        localStorage.setItem(key, JSON.stringify(value));
        break;

      default:
        localStorage.setItem(key, JSON.stringify(value));
        break;
    }
  };

  const validateSearchBoxEmpty = string => {
    if (string === "") {
      setNameSearch("");
      setRefetch(!refetch);
    }
    setSearchKey(string);
  };

  const handlClickDeleteFilter = (_, itemXX) => {
    let newArrayFilters = [...filters];
    let query = newArrayFilters.filter((item, index) => item.identifier !== itemXX.identifier);
    setFilters(query);
    setRefetch(!refetch);
    //limpiar buscador
    if (itemXX?.id === "keySearch") {
      setValueToFind({ search: false, keySearch: "" });
    }
  };

  const handleClickReasingProspect = item => {
    setProspect(item);
    setIsMultiReasign(false);
    setopenReasing(!openReasing);
  };
  const handleClickName = rowSelected => {
    rowSelected.prospectId = rowSelected.id;
    setProspectPreview(rowSelected);
    toggleModal();
  };
  const handlePagination = (event, page) => {
    setPage(page);
  };
  const restorePage = () => {
    if (page > 1) setPage(1);
  };
  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);
  return (
    <MainLayout>
      <ProspectosStyled>
        <Head>
          <title>CRM JOBS - Prospectos</title>
        </Head>
        <div className="main">
          <div className="ctr_ejecutives">
            <div className="head">
              <div className="head__title">
                <div className="head__titleDiv">
                  <IconButton onClick={() => router.back()} className="buttonIcon">
                    <ArrowBack className="icon" />
                  </IconButton>
                  <h1>Prospectos</h1>
                </div>
                <div className="head__total">
                  <People className="people" />
                  <p className="count" display="text">
                    <NumberFormat value={totalProspects} displayType="text" thousandSeparator="," suffix="  " />
                    Registros
                  </p>
                  <Tooltip arrow title="Recargar" placement="right">
                    <Cached
                      className="cached"
                      onClick={() => {
                        setRefetch(!refetch);
                      }}
                    />
                  </Tooltip>
                </div>
              </div>
            </div>

            <SearchProspects value={valueToFind} setValue={setValueToFind} restorePage={restorePage} />
            <Box className="filter" mb={2}>
              <DataOrder
                falling={ASC}
                setFalling={setASC}
                order={orderby}
                setOrder={setOrderby}
                addOptions={[
                  { label: "Fecha Creación ", value: "createdAt" },
                  { label: "Fecha Actualización", value: "updatedAt" },
                  { label: "Ultimo Seguimiento", value: "lastTrackingcreatedAt" },
                ]}
                addOptionsOrderBy={[
                  { label: "Descendente", value: "-" },
                  { label: "Ascendente ", value: "" },
                ]}
              />
              <Filters
                options={options.optionsFilters}
                keySearchValue={valueToFind}
                refetch={handleRefetch}
                filters={filters}
                setFilters={setFilters}
                restorePage={restorePage}
              />
            </Box>
            <ActiveFilters filters={filters} onClickDelete={handlClickDeleteFilter} />

            <div className="gridtable">
              <TableLimenka
                // showActions={true}
                data={prospectsTable}
                activeCheck
                primaryColor="#776ceb"
                secondaryColor="#dce1f6"
                heads={tableHead}
                isFetching={isLoaderData}
                id="tableProspects_intelligence"
                actions={[{ title: "Reasignar", action: e => handleClickReasingProspect(e), icon: <Person /> }]}
                customColums={[
                  {
                    columname: "nombre",
                    component: (item, itemData, isPar, isNew) => {
                      return (
                        <TableIndex
                          handleClickName={handleClickName}
                          item={item}
                          itemData={itemData}
                          isPar={isPar}
                          isNew={isNew}
                        />
                      );
                    },
                  },
                ]}
              />
            </div>
            {totalProspects > 0 && (
              <div className="pagination">
                <Pagination
                  style={{ display: "flex", justifyContent: "center" }}
                  page={page}
                  defaultPage={1}
                  onChange={handlePagination}
                  shape="rounded"
                  count={Math.ceil(totalProspects / limit)}
                  color="primary"
                />
              </div>
            )}
          </div>
        </div>
        <PreviewProspectIntelligence isOpen={showDrawer} close={toggleModal} prospect={ProspectPreview} />

        <ModalReasigned
          open={openReasing}
          setopen={setopenReasing}
          Prospect={Prospect.itemBD}
          setProspect={setProspect}
          setFlag={setRefetch}
          flag={refetch}
          isMultiReasign={isMultiReasign}
          setIsMultiReasign={setIsMultiReasign}
        />
      </ProspectosStyled>
    </MainLayout>
  );
}
function TableIndex({ item, itemData, isPar, isNew, handleClickName }) {
  const getDiferrenceDates = date => dayjs(date).fromNow();

  return (
    <TableDataId className="column_id" isPar={isPar} isNew={isNew}>
      <div className="content">
        <div className="content__flex">
          <div className="content__more"></div>

          <Tooltip title="Abrir Vista Previa">
            <p
              onClick={() => {
                handleClickName(itemData);
              }}
              className="name"
            >
              {item}
            </p>
          </Tooltip>
        </div>
        <div className="content__more">
          <p className="txt-createdAt">
            Creado el <span>{dayjs(itemData?.itemBD?.createdAt).format("DD/MM/YYYY")} </span>
          </p>
        </div>
      </div>
    </TableDataId>
  );
}

const tableHead = ["id", "nombre", "Telefono", "Correo", "Estado", "Ejecutivo", "Creado Por"];

function SearchProspects({ value, setValue, restorePage }) {
  const handleOnChange = e => {
    setValue({ search: false, keySearch: e.target.value });
  };

  const handleKeyDown = e => {
    if (e.key === "Enter" && e.target.value.length > 0) {
      setValue({ search: true, keySearch: e.target.value });
      restorePage();
    }
  };

  return (
    <div className="ctr_filter">
      <div className="input">
        <TextField
          variant="outlined"
          size="small"
          className="inputText"
          value={value?.keySearch}
          onChange={e => handleOnChange(e)}
          onKeyDown={e => handleKeyDown(e)}
          type="search"
          placeholder="Ingresa Id,nombre o correo de prospecto"
        />
        <SearchOutlined className="search" />
      </div>
    </div>
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
