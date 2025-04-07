import NavBarDashboard from "../../components/NavBarDashboard";
import SideBar from "../../components/SideBar";
import { Grid, LinearProgress } from "@material-ui/core";
import { TrendingUp, HowToReg, ThumbUp, AttachMoney, FilterListOutlined } from "@material-ui/icons";
import { AdminStyled } from "../../styles/Dashboard/admin.styles";
import { useState, useEffect } from "react";
import CardAdmin from "../../components/CardAdmin";
import { useDispatch, useSelector } from "react-redux";
import { userSelector } from "../../redux/slices/userSlice";
import Graphics from "../../features/ReportsExecutives/components/GraphicsGeneral";
import { api } from "../../services/api";
import Head from "next/head";
import TableCustom from "../../components/TableCustom";
import { normalizesalesEjecutive } from "../../utils/normalizeData";
import { Pagination } from "@material-ui/lab";
import { Filter } from "../../components/FilterDashboard";
import dayjs from "dayjs";
import AlertGlobal from "../../components/Alerts/AlertGlobal";

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [dataprospect, Setdataprospect] = useState([]);
  const [dataSalesejecutive, SetdataSalesejecutive] = useState([]);
  const [datacoutes, SetdataCoutes] = useState([]);
  const [cuotestate, Setcuotestate] = useState([]);
  const [cuotetotal, Setcuotetotal] = useState([]);
  const [datapending, Setdatapending] = useState([]);
  const [totalclients, Settotalclients] = useState(0);
  const [totalprospect, setTotalProspect] = useState(0);
  const [totaloportunities, setTotalOpotunities] = useState(0);
  const [Originname, SetOriginname] = useState([]);
  const [mountprospects, Setmountprospects] = useState([]);
  const [statename, Setstatename] = useState([]);
  const [mountstate, Setmountstate] = useState([]);
  const [groupname, Setgroupname] = useState([]);
  const [mountgroup, Setmountgroup] = useState([]);
  const [ejecutivesprospect, SetEjecutivesprospect] = useState([]);
  const [prospect, SetProspect] = useState([]);
  const [limitejective, SetlimitEjecutive] = useState(20);
  const [order, setOrder] = useState({ value: "-createdAt", label: "Fecha de Creación" });
  const [page, setPage] = useState(1);
  const [flag, setFlag] = useState(false);
  const [limit, setLimit] = useState(10);
  const [limitejecutive, setLimitejecutive] = useState(12);
  const [limitopotunities, setLimitopotunities] = useState(7);
  const [loader, setLoader] = useState(false);
  const { name, roleId } = useSelector(userSelector);
  const [totalejecutives, SetTotalejecutives] = useState(0);
  const paginasejecutivos = Math.ceil(totalejecutives / limit);
  const [groupsprospect, Setgroupsprospect] = useState([]);
  const [totalprospectgroup, Settotalprospectgroup] = useState([]);
  const [groupssales, Setgroupssales] = useState([]);
  const [totalgroupsales, Settotalgroupsales] = useState([]);
  const [showfilter, Setshowfilter] = useState(false);
  const [filter, Setfilter] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [dateStart, setDateStart] = useState(dayjs().startOf("month").format("YYYY-MM-DD"));
  const [dateFinish, setDateFinish] = useState(dayjs().endOf("month").format("YYYY-MM-DD"));

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    getProspect();
    getProspectsOrigin();
    getProspectsState();
    getProspectsEjecutive();
    getSalesGroup();
    getstatequote();
    getsalesejectuve();
    getgroupprospect();
    getprospectsquote();
    setLoader(true);
  }, [page, flag, limitejecutive, refetch]);

  useEffect(() => {
    if (dateStart !== "" && dateFinish !== "") {
      if (dateFinish < dateStart) {
        console.log("error: dateStart");
        Setfilter(false);
      } else {
        Setfilter(true);
        setRefetch(!refetch);
      }
    } else {
      Setfilter(false);
    }
  }, [dateStart, dateFinish]);

  const getsalesejectuve = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let include = "group";
      let ejecutives = await api.get(
        `dashboard/ejecutivesAmount?where={"prospect":${JSON.stringify(
          query
        )}}&include=${include}&count=1&skip=${page}&order=-totalAmount`
      );
      let normalizeDataejectutives = ejecutives.data?.results.map((item, index) => normalizesalesEjecutive(item));
      SetTotalejecutives(ejecutives.data.count);
      SetdataSalesejecutive(normalizeDataejectutives);
      setLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getProspect = async () => {
    try {
      let query = {};
      let query2 = {};
      query.isclient = false;
      query.isoportunity = false;
      query2.isclient = true;
      let include = "city,entity,phase,ejecutive,clientcompany";
      let clients = await api.get(
        `prospects?where=${JSON.stringify(query2)}&include=${include}&order=${
          order.value
        }&skip=${page}&count=1&limit=${limit}`
      );
      let prospect = await api.get(
        `prospects?where=${JSON.stringify(query)}&include=${include}&order=${
          order.value
        }&skip=${page}&count=1&limit=${limitejective}`
      );
      Setdataprospect(prospect.data.results);
      setTotalProspect(prospect.data.count);
      Settotalclients(clients.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  const getProspectsOrigin = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let OriginResponse = await api.get(
        `dashboard/originsprospect?where={"prospect":${JSON.stringify(query)}}&order=-totalProspects&limit=${limit}`
      );
      let arrayOrigin = [];
      let arrayProspects = [];
      let results = OriginResponse.data.results;
      results.map((item, index) => {
        arrayOrigin.push(item.name);
        arrayProspects.push(item.totalProspects);
        if (index == results.length - 1) {
          SetOriginname(arrayOrigin);
          Setmountprospects(arrayProspects);
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getProspectsState = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let StateResponse = await api.get(
        `dashboard/entitiesprospect?where={"prospect":${JSON.stringify(query)}}&order=-totalProspects&limit=${limit}`
      );
      let results = StateResponse.data.results;
      let arrayState = [];
      let arrayProspects = [];
      results.map(item => {
        arrayState.push(item.name);
        arrayProspects.push(item.totalProspects);
      });
      Setstatename(arrayState);
      Setmountstate(arrayProspects);
    } catch (error) {
      console.log(error);
    }
  };

  const getProspectsEjecutive = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let salesResponse = await api.get(
        `dashboard/ejecutivesprospect?where={"prospect":${JSON.stringify(
          query
        )}}&order=-totalProspects&limit=${limitejective}`
      );
      let results = salesResponse.data.results;
      let arrayEjecutives = [];
      let arrayProspects = [];
      results.map(item => {
        arrayEjecutives.push(item.name);
        arrayProspects.push(item.totalProspects);
      });
      SetEjecutivesprospect(arrayEjecutives);
      SetProspect(arrayProspects);
    } catch (error) {
      console.log(error);
    }
  };

  const getSalesGroup = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let salesResponse = await api.get(
        `dashboard/groupsamount?where={"prospect":${JSON.stringify(query)}}&order=-totalAmount&limimit=${limit}`
      );
      let results = salesResponse.data.results;
      let arrayGroup = [];
      let arrayMount = [];
      results.map(item => {
        arrayGroup.push(item.name);
        arrayMount.push(item.totalAmount);
      });
      Setgroupname(arrayGroup);
      Setmountgroup(arrayMount);
    } catch (error) {
      console.log(error);
    }
  };

  const getstatequote = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let statequoteResponse = await api.get(
        `dashboard/entitiesquote?where={"oportunity":${JSON.stringify(query)}}&order=-totalQuotes&limimit=${limit}`
      );
      let results = statequoteResponse.data.results;
      let arrayCoutes = [];
      let arrayTotal = [];
      results.map(item => {
        arrayCoutes.push(item.name);
        arrayTotal.push(item.totalQuotes);
      });
      Setcuotestate(arrayCoutes);
      Setcuotetotal(arrayTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const getgroupprospect = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let prosctsgroupresponse = await api.get(
        `dashboard/groupsprospect?where={"prospect":${JSON.stringify(
          query
        )}}&order=-totalProspects&limit=${limitejecutive}`
      );
      let results = prosctsgroupresponse.data.results;
      let arraygroup = [];
      let arrayTotal = [];
      results.map(item => {
        arraygroup.push(item.name);
        arrayTotal.push(item.totalProspects);
      });
      Setgroupsprospect(arraygroup);
      Settotalprospectgroup(arrayTotal);
    } catch (error) {
      console.log(error);
    }
  };

  const getprospectsquote = async () => {
    try {
      let query = { createdAt: {} };
      query.createdAt.gte = `${dateStart}T21:00:00.000Z`;
      query.createdAt.lte = `${dateFinish}T00:00:00.000Z`;
      let prospectsquote = await api.get(
        `dashboard/prospectsquote?where={"oportunity":${JSON.stringify(query)}}&order=-totalQuotes&limit=${limit}`
      );
      let results = prospectsquote.data.results;
      let arraygroup = [];
      let arrayTotal = [];

      results.map(item => {
        arraygroup.push(item.name + " " + item.lastname);
        arrayTotal.push(item.totalQuotes);
      });
      Settotalgroupsales(arrayTotal);
      Setgroupssales(arraygroup);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePage = (event, value) => {
    setPage(value);
    setFlag(!flag);
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <AdminStyled style={{ height: "auto", display: "flex" }}>
      <Head>
        <title>Dashboard CRM</title>
      </Head>
      <SideBar open={open} setOpen={setOpen} />
      <div className="main">
        <NavBarDashboard />

        <div className="main-cointainer">
          <div className="header">
            <h2>Bienvenid@ {name} ! </h2>
            <Filter
              dateStart={dateStart}
              setDateStart={setDateStart}
              dateFinish={dateFinish}
              setDateFinish={setDateFinish}
              handleAlert={handleAlert}
            />
          </div>
          <Grid className="container-stadistic">
            <CardAdmin
              total={totalclients}
              title="Total de clientes"
              percentaje={24}
              isUp
              Icon={<TrendingUp />}
              // iconBg="#DCF2ED"
            />
            <CardAdmin
              total={totalprospect}
              title="Total de prospectos"
              percentaje={24}
              isUp={false}
              Icon={<HowToReg />}
            />
            <CardAdmin
              total={totaloportunities}
              title="Total de oportunidades"
              percentaje={24}
              isUp={false}
              Icon={<ThumbUp />}
            />
            <CardAdmin total={3000} title="Monto de ventas" percentaje={24} isUp={true} Icon={<AttachMoney />} />
          </Grid>
          <Grid className="container-stadistic">
            <Grid className="oportunities">
              <div className="title-stadistic">
                <h3>Total de prospectos por ejecutivo</h3>
              </div>
              <div className="grap-prospect">
                <Graphics
                  type={"line"}
                  title={"Prospectos por ejecutivo"}
                  datalabels={ejecutivesprospect}
                  graphicsData={prospect}
                />
              </div>
            </Grid>
            <Grid className="sales-stadistic">
              <div className="grap-prospect">
                {loader ? (
                  <div className="ctr_load">
                    <div className="ctr_load__img">
                      <img src="/load.png" />
                    </div>
                    <div className="ctr_load__load">
                      <LinearProgress color="primary" />
                      <p className="loader">Cargando</p>
                    </div>
                  </div>
                ) : (
                  <TableCustom
                    heads={["Ejecutivo", "Monto Ventas"]}
                    data={dataSalesejecutive}
                    identificador={"name"}
                    custom={false}
                    selectmultiple={false}
                    primaryColor={"#405189"}
                    secondaryColor={"#dce1f6"}
                    actionsPerItem={[{ title: "vizualizar" }]}
                  />
                )}
                {dataSalesejecutive.length > 0 && (
                  <div className="footer-sales">
                    <Pagination
                      style={{ display: "flex", justifyContent: "center" }}
                      page={page}
                      defaultPage={1}
                      onChange={handlePage}
                      shape="rounded"
                      count={paginasejecutivos}
                      color="primary"
                    />
                  </div>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid className="container-stadistic">
            <Grid className="card-header">
              <div className="title-stadistic">
                <h3>Prospectos por grupo</h3>
              </div>
              <div className="sellers">
                <Graphics
                  type={"doughnut"}
                  title={"Prospectos por origen"}
                  options={{ indexAxis: "y" }}
                  datalabels={groupsprospect}
                  graphicsData={totalprospectgroup}
                />
              </div>
            </Grid>
            <Grid className="card-header">
              <div className="title-stadistic">
                <h3>Mejores origenes de prospectos</h3>
              </div>
              <div className="sellers">
                <Graphics
                  type={"doughnut"}
                  title={"Prospectos por origen"}
                  options={{ indexAxis: "y" }}
                  datalabels={Originname}
                  graphicsData={mountprospects}
                />
              </div>
            </Grid>
            <Grid className="card-header">
              <div className="title-stadistic">
                <h3>Estados con mayor prospectos</h3>
              </div>
              <div className="cointainer-users">
                <div className="graphicsstate">
                  <div className="container-states">
                    <Graphics
                      type={"doughnut"}
                      title={"Prospectos por estado"}
                      options={{ indexAxis: "y" }}
                      datalabels={statename}
                      graphicsData={mountstate}
                      style={{ Height: 100 }}
                    />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
          <Grid className="container-stadistic">
            <Grid className="card-header">
              <div className="title-stadistic">
                <h3>Cotizaciones por estado</h3>
              </div>
              <div className="sellers">
                <Graphics
                  type={"doughnut"}
                  title={"Cotizaciones por estado"}
                  options={{ indexAxis: "y" }}
                  datalabels={cuotestate}
                  graphicsData={cuotetotal}
                  style={{ Height: 100 }}
                />
              </div>
            </Grid>
            <Grid className="card-header">
              <div className="title-stadistic">
                <h3>Ventas por grupo</h3>
              </div>
              <Graphics
                style={{ backgroundColor: "red" }}
                type={"doughnut"}
                datalabels={groupname}
                graphicsData={mountgroup}
                title={"ventas"}
                options={{ indexAxis: "y" }}
              />
            </Grid>
            <Grid className="card-header">
              <div className="title-stadistic">
                <h3>Cotizaciones por prospecto</h3>
              </div>
              <Graphics
                type={"doughnut"}
                datalabels={groupssales}
                graphicsData={totalgroupsales}
                title={"ventas"}
                options={{ indexAxis: "y" }}
              />
            </Grid>
          </Grid>
          {Alert?.show && (
            <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />
          )}
        </div>
      </div>
    </AdminStyled>
  );
}
