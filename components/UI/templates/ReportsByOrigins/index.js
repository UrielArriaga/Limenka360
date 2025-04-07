import { Box, Button, Chip, Grid, LinearProgress, TableBody, TextField, Tooltip } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { PurpleSwitch, ReportProspectsLayout } from "./styles";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import ModalReasigned from "../../../ModalReasigned";
import { api } from "../../../../services/api";
import { Cached, People, SearchOutlined } from "@material-ui/icons";
import PaginationWithText from "../../molecules/PaginationWithText";
import SelectFilterManager from "../../atoms/SelectFilterManager";
import { normalizeTableDataOpotunity, normalizeTableDataProspectReportst } from "../../../../utils/normalizeData";
import TableComponent from "../../organism/TableReportsByOriginsManager";
import AddPending from "../../../ModalAddPendings";
import ModalTracking from "../../../ModalTracking";
import AlertGlobal from "../../../Alerts/AlertGlobal";
import TableComponentOportunitites from "../../organism/TableReportsByOriginsOportunities";
export default function ReportsByOrigins() {
  const router = useRouter();
  const [isLoading, setisLoading] = useState(true);
  const { origins } = useSelector(commonSelector);
  const [prospects, setProspects] = useState([]);
  const [Prospect, setProspect] = useState({});
  const [totalProspects, setTotalProspects] = useState(0);
  const [oportunities, setOportunities] = useState([]);
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [limit] = useState(10);
  const [origin, setOrigin] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [showChips, setShowChips] = useState(false);
  const [orderby, setOrderby] = useState("createdAt");
  const [ASC, setASC] = useState(true);
  const [openReasing, setopenReasing] = useState(false);
  const [prospectTrackings, setProspectTrackings] = useState({});
  const handleCloseAddTrackigns = () => setShowAddTrackings(false);
  const [showAddTrackings, setShowAddTrackings] = useState(false);
  const [prospectPending, setProspectPending] = useState({});
  const [showAddPending, setShowAddPending] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const handleCloseAddPending = () => setShowAddPending(false);
  const tipo = router.query.tipo;
  const [dataTable, setDataTable] = useState({
    heads: [
      "id",
      "nombre",
      "correo",
      "movil",
      "teléfono",
      "categoria de interés",
      "código de producto",
      "género",
      "puesto",
      "empresa",
      "comentarios",
      "codigo postal",
      "estado",
      "ciudad",
      "colonia",
      "calle",
      "tipo de cliente",
      "fase",
      "origen",
      "título",
      "especialidad",
      "web",
      "facebook",
      "google maps",
      "fecha de creación",
      "ultima actualización",
    ],
    data: [prospects],
  });
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      handleRequests();
    }
    return () => (mounted = false);
  }, [router.query.e, page, flag, orderby, ASC, tipo]);

  const handleRequests = () => {
    switch (tipo) {
      case "prospectos":
        getProspect();
        break;
      case "clientes":
        getProspect();
        break;
      case "oportunidades":
        getOportunities();
        break;

      default:
        break;
    }
  };
  const getProspect = async () => {
    setisLoading(true);
    try {
      let query = {};
      if (tipo === "prospectos") {
        query.isclient = false;
        query.isoportunity = false;
      }
      if (tipo === "clientes") {
        query.isclient = true;
      }
      if (origin !== "") {
        query.originId = origin.id;
      } else {
        delete query.origin;
      }
      if (hasValue(searchKey)) {
        if (searchKey.includes("@")) {
          query.email = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else if (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im.test(searchKey.trim())) {
          query.phone = { iRegexp: `${searchKey.trim().toLocaleLowerCase()}` };
        } else {
          query.fullname = { iRegexp: `${searchKey.toLocaleLowerCase()}` };
        }
      } else {
        setSearchKey("");
      }
      query.ejecutiveId = router.query.id;
      let includeValue = "category,city,entity,phase,ejecutive,clientcompany,origin,clienttype,specialty,postal";
      let joins = "cat,cy,ey,pe,ejecutive,cy,on,ce,sy,pl";
      let params = {
        where: JSON.stringify(query),
        limit: limit,
        count: "1",
        skip: page,
        include: includeValue,
        join: joins,
        order: `${ASC ? "" : "-"}${orderby}`,
      };

      let prospectsBd = await api.get(`prospects`, { params });
      let prospectsResults = prospectsBd.data.results;
      let prospectsCount = prospectsBd.data.count;
      console.log("prospects results", prospectsResults);
      let normalizeData = prospectsResults.map(item => normalizeTableDataProspectReportst(item));
      setProspects(normalizeData);
      setTotalProspects(prospectsCount);
      setisLoading(false);
    } catch (error) {
      setisLoading(false);
    }
  };

  const generateFilters = () => {
    let query = {};
    let inQuery = {};

    query.prospect = inQuery;
    query.iscloseout = false;
    inQuery.isoportunity = true;
    inQuery.discarted = false;
    inQuery.ejecutiveId = router.query.id;
    if (origin !== "") {
      inQuery.originId = origin.id;
    } else {
      delete inQuery.originId;
    }
    if (hasValue(searchKey)) {
      const regex = new RegExp(/(@)\w+/g);
      let isEmail = regex.test(searchKey);
      if (isEmail === true) {
        inQuery.email = { regexp: searchKey };
      } else {
        inQuery.or = [
          { fullname: { iRegexp: `${searchKey.toLocaleLowerCase()}` } },
          { phone: { regexp: `${searchKey}` } },
        ];
      }
    } else {
      setSearchKey("");
    }

    return query;
  };
  const getOportunities = async () => {
    setisLoading(true);
    let query = generateFilters();
    try {
      let params = {
        include: "prospect,prospect.phase,prospect.origin,prospect.ejecutive,prospect.category,prospect.clientcompany",
        where: JSON.stringify(query),
        limit: limit,
        count: 1,
        join: "prospect,prospect.phase,prospect.origin,prospect.ejecutive,cd,cli",
        order: `${ASC ? "" : "-"}${orderby}`,
        skip: page,
      };
      let responseOportunities = await api.get(`oportunities`, { params });
      let results = responseOportunities?.data.results;
      let count = responseOportunities.data?.count;
      let normalizeData = results.map(item => normalizeTableDataOpotunity(item));
      setOportunities(normalizeData);
      setTotalProspects(count);
      setisLoading(false);
    } catch (error) {
      console.log(error);
      setisLoading(false);
    }
  };

  const hasValue = value => (value === "" || value === undefined || value == null ? false : true);

  const handleSelectProspect = event => {
    if (event === null) {
      setOrigin("");
    } else {
      setOrigin(event);
    }
    cleanPagination();
  };

  const cleanPagination = () => {
    setFlag(!flag);
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const removeSearchKey = () => {
    setSearchKey("");
    setNameSearch("");
    cleanPagination();
  };
  const handleClickReportProspect = element => {
    switch (tipo) {
      case "prospecto":
        router.push({
          pathname: "../prospectos/[prospecto]",
          query: { prospecto: element.id },
        });
        break;
      case "cliente":
        router.push({
          pathname: "../clientes/[prospecto]",
          query: { prospecto: element.id },
        });
        break;
      case "oportunidades":
        router.push({ pathname: "../oportunidades/[prospecto]", query: { prospecto: element?.itemBD?.id } });
        break;
      default:
        break;
    }
  };
  const handleClickAddPending = item => {
    setProspectPending(item);
    setShowAddPending(!showAddPending);
  };
  const handleClickAddTracking = item => {
    setProspectTrackings(item);
    setShowAddTrackings(!showAddTrackings);
  };

  const handleClickReasingProspect = item => {
    setProspect(item);
    setopenReasing(!openReasing);
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };
  const showBy = Type => {
    switch (Type) {
      case "prospectos":
        return (
          <TableComponent
            data={prospects}
            id="nombre"
            heads={dataTable.heads}
            secondaryColor="#dce1f6"
            primaryColor="#405189"
            handleClickName={(item, e) => handleClickReportProspect(item, e)}
            handleClickAddTracking={handleClickAddTracking}
            handleClickAddPending={handleClickAddPending}
            handleClickReasingProspect={handleClickReasingProspect}
          />
        );
      case "oportunidades":
        return (
          <TableComponentOportunitites
            data={oportunities}
            id="nombre"
            heads={headsOportunities}
            secondaryColor="#dce1f6"
            primaryColor="#405189"
            handleClickName={(item, e) => handleClickReportProspect(item, e)}
            handleClickAddTracking={handleClickAddTracking}
            handleClickAddPending={handleClickAddPending}
            handleClickReasingProspect={handleClickReasingProspect}
          />
        );
      case "clientes":
        return (
          <TableComponent
            data={prospects}
            id="nombre"
            heads={dataTable.heads}
            secondaryColor="#dce1f6"
            primaryColor="#405189"
            handleClickName={(item, e) => handleClickReportProspect(item, e)}
            handleClickAddTracking={handleClickAddTracking}
            handleClickAddPending={handleClickAddPending}
            handleClickReasingProspect={handleClickReasingProspect}
          />
        );

      default:
    }
  };

  return (
    <ReportProspectsLayout>
      <div className="top">
        <p className="titleOrigin">Origen:</p>
        <SelectFilterManager selectOptions={origins.results} changeFilterValue={handleSelectProspect} />
      </div>
      <Box height={20} />
      <div className="ctr_filter">
        <div className="ctr_filter__ctr_input">
          <SearchOutlined className="search" />
          <TextField
            variant="outlined"
            type="search"
            value={nameSearch}
            onChange={e => setNameSearch(e.target.value)}
            label={nameSearch !== "" && "Buscar prospecto"}
            placeholder="Buscar prospectos"
            size="small"
            className="inputText"
            onKeyDown={e => {
              if (e.key === "Enter" && e.target.value.length > 0) {
                setSearchKey(e.target.value);
                setShowChips(true);
                cleanPagination();
              }
            }}
          />
        </div>
      </div>
      <Box height={10} />
      <Grid container spacing={2}>
        <div className="containerDate">
          <div className="head__title">
            <div>
              <p className="total">
                <People />

                {`${totalProspects} Registros`}
                <Tooltip arrow title="Recargar" placement="right">
                  <Cached
                    className="reload"
                    onClick={() => {
                      setRefetch(!refetch);
                      setFlag(!flag);
                    }}
                  />
                </Tooltip>
              </p>
            </div>

            {searchKey !== "" && (
              <Chip color="primary" size="small" onDelete={removeSearchKey} label={searchKey} className="chip" />
            )}
          </div>
          <Box display="flex" justifyContent="flex-end" alignItems="center">
            <Grid component="label" container alignItems="center" justifyContent="flex-end" spacing={1}>
              <Box>
                <label style={{ marginRight: 5, fontSize: 11 }}>Ordernar por</label>
                <select
                  className="order-select"
                  onChange={e => setOrderby(e.target.value)}
                  defaultValue={orderby}
                  value={orderby}
                  name=""
                  id=""
                  style={{ marginRight: 5 }}
                >
                  <option
                    value="createdAt"
                    name="Fech
                  a de creacion"
                  >
                    Fecha de creacion
                  </option>

                  <option
                    value="updatedAt"
                    name="Fech
                  a de creacion"
                  >
                    Fecha de actualizacion
                  </option>
                </select>
              </Box>

              <Grid item>
                <p style={{ fontSize: 11 }}>Ascendente</p>
              </Grid>
              <Grid item>
                <PurpleSwitch
                  checked={ASC}
                  onChange={e => {
                    setASC(e.target.checked);
                  }}
                  name="checkedC"
                />
              </Grid>
              <Grid item>
                <p style={{ fontSize: 11 }}>Descendente</p>
              </Grid>
            </Grid>
          </Box>
        </div>
        {!isLoading && (
          <Grid item md={12} className="table">
            {showBy(tipo)}
          </Grid>
        )}
        {isLoading && (
          <div className="cont_load">
            <div className="cont_load__img">
              <img src="/load.png" />
            </div>
            <div className="cont_load__load">
              <p>Cargando</p>
              <LinearProgress color="primary" />
            </div>
          </div>
        )}
      </Grid>
      <Box height={20} />
      <PaginationWithText
        total={totalProspects}
        actualPage={page}
        setActualPage={setPage}
        totalPages={Math.ceil(totalProspects / limit)}
      />
      <AddPending
        isclient={tipo === "clientes" || tipo === "prospectos" ? true : false}
        prospect={prospectPending}
        open={showAddPending}
        close={handleCloseAddPending}
        handleAlert={handleAlert}
        flag={flag}
        setFlag={setFlag}
        setAlert={setAlert}
        tipo={tipo}
      />
      <ModalTracking
        isclient={tipo === "prospectos" || tipo === "oportunidades" ? false : true}
        prospect={prospectTrackings}
        open={showAddTrackings}
        close={handleCloseAddTrackigns}
        handleAlert={handleAlert}
        setAlert={setAlert}
        flag={flag}
        setFlag={setFlag}
        prospectEdit={prospectTrackings}
      />
      <ModalReasigned
        open={openReasing}
        setopen={setopenReasing}
        Prospect={Prospect?.itemBD}
        setProspect={setProspect}
        setFlag={setFlag}
        flag={flag}
      />
      {Alert?.show && (
        <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
      )}
    </ReportProspectsLayout>
  );
}

const headsOportunities = [
  "id",
  // "prospectId",
  "nombre",
  "concepto",
  "correo",
  "certeza",
  "télefono",
  "género",
  "puesto",
  "categoría de interes",
  "origen",
  "Empresa",
  // "etiquetas",
  "fase",
  "monto",
  "fecha de cierre",
  "fecha de creacion",
];
