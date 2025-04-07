import React, { useEffect, useState } from "react";
import { Avatar, Button, Card, Divider, Fade, Grid, IconButton, Paper, Slide, Tooltip } from "@material-ui/core";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import {
  AttachMoney,
  Dns,
  Event,
  EventAvailable,
  EventNote,
  Feedback,
  PermContactCalendar,
  VerifiedUser,
} from "@material-ui/icons";
import NumberFormat from "react-number-format";
import {
  InfoExecutiveStyle,
  OportunitiesStyle,
  Oportunity,
  PreviewExecutiveStyled,
  ProspectsStyle,
  SalesStyle,
} from "./style";
import { api, URL_SPACE } from "../../services/api";
import PreviewPendings from "../PreviewPendings";
import EmptyData from "../PreviewEmpty";
import usePagination from "../../hooks/usePagination";
import PaginationDirector from "../UI/molecules/PaginationTable";
import LoaderPreview from "../LoaderPreviews";
import { validateURL } from "../../utils";

export default function PreviewExecutive(props) {
  const { isOpen, close, executive, setExecutive } = props;
  const {
    page: pagePend,
    setPage: setPagePend,
    limit: limitPend,
    handlePage: handlePagePend,
  } = usePagination({ defaultLimit: 10, defaultPage: 1 });

  const {
    page: pagePros,
    setPage: setPagePros,
    limit: limitPros,
    handlePage: handlePagePros,
  } = usePagination({ defaultLimit: 6, defaultPage: 1 });

  const {
    page: pageOp,
    setPage: setPageOp,
    limit: limitOp,
    handlePage: handlePageOp,
  } = usePagination({ defaultLimit: 6, defaultPage: 1 });

  const {
    page: pageSale,
    setPage: setPageSale,
    limit: limitSale,
    handlePage: handlePageSale,
  } = usePagination({ defaultLimit: 6, defaultPage: 1 });

  const [pendings, setPendings] = useState([]);
  const [prospects, setProspects] = useState({});
  const [oportunities, setOportunities] = useState({});
  const [loaderPendings, setLoaderPendings] = useState(false);
  const [loaderProspects, setLoaderProspects] = useState(false);
  const [loaderOportunities, setLoaderOportunities] = useState(false);
  const [loaderSales, setLoaderSales] = useState(false);
  const [reloadAll, setReloadAll] = useState(false);
  const [sales, setSales] = useState();
  const [optionSelected, setOptionSelected] = useState("pending");
  const dayDate = [dayjs().startOf("day").format(), dayjs().endOf("day").format()];
  useEffect(() => {
    if (executive && isOpen) getPendings();
  }, [executive, pagePend, reloadAll]);

  useEffect(() => {
    if (executive && isOpen) getProspects();
  }, [executive, pagePros, reloadAll]);

  useEffect(() => {
    if (executive && isOpen) getOportunities();
  }, [executive, pageOp, reloadAll]);

  useEffect(() => {
    if (executive && isOpen) getSales();
  }, [executive, pageSale, reloadAll]);

  useEffect(() => {
    if (!isOpen) {
      setOptionSelected("pending");
    }
  }, [isOpen]);

  useEffect(() => {
    setPagePend(1);
    setPagePros(1);
    setPageOp(1);
    setPageSale(1);
  }, [optionSelected, executive]);

  const handleReaload = () => setReloadAll(!reloadAll);

  const getPendings = async () => {
    setLoaderPendings(true);
    try {
      let query = {
        ejecutiveId: executive.id,
        isdone: false,
        date_from: {
          between: dayDate,
        },
      };
      let params = {
        include: "pendingstype,prospect,prospect.phase",
        where: JSON.stringify(query),
        count: 1,
        limit: limitPend,
        skip: pagePend,
      };
      let responsePending = await api.get(`pendings`, { params });
      let pendings = {
        pendings: responsePending.data.results,
        count: responsePending.data.count,
      };
      setPendings(pendings);
      setLoaderPendings(false);
    } catch (error) {
      setLoaderPendings(false);
      console.log(error);
    }
  };
  const getProspects = async () => {
    setLoaderProspects(true);
    try {
      let query = {
        ejecutiveId: executive.id,
        createdAt: {
          between: dayDate,
        },
      };
      let params = {
        where: JSON.stringify(query),
        include: "city,entity,phase,origin,clienttype,category",
        join: "ph,or,cl,ca",
        count: 1,
        limit: limitPros,
        skip: pagePros,
      };

      let responseProspect = await api.get(`prospects`, { params });
      let prospects = {
        prospects: responseProspect.data.results,
        count: responseProspect.data.count,
      };
      setProspects(prospects);
      setLoaderProspects(false);
    } catch (error) {
      setLoaderProspects(false);
      console.log(error);
    }
  };
  const getOportunities = async () => {
    setLoaderOportunities(true);
    try {
      let query = {
        iscloseout: false,
        prospect: {
          ejecutiveId: executive.id,
        },
        createdAt: {
          between: dayDate,
        },
      };
      let params = {
        where: JSON.stringify(query),
        count: 1,
        limit: limitOp,
        skip: pageOp,
        include: "phase",
      };
      let responseOportunity = await api.get(`oportunities`, { params });
      let oportunities = {
        oportunities: responseOportunity.data.results,
        count: responseOportunity.data.count,
      };
      setOportunities(oportunities);
      setLoaderOportunities(false);
    } catch (error) {
      setLoaderOportunities(false);
      console.log(error);
    }
  };
  const getSales = async () => {
    setLoaderSales(true);
    try {
      let query = {
        iscloseout: true,
        prospect: {
          ejecutiveId: executive.id,
        },
        createdAt: {
          between: dayDate,
        },
      };
      let params = {
        where: JSON.stringify(query),
        count: 1,
        limit: limitSale,
        skip: pageSale,
        include: "phase",
      };
      let responsesSales = await api.get(`oportunities`, { params });
      let sales = {
        sales: responsesSales.data.results,
        count: responsesSales.data.count,
      };
      setSales(sales);
      setLoaderSales(false);
    } catch (error) {
      setLoaderSales(false);
      console.log(error);
    }
  };

  const RenderContentPreview = preview => {
    switch (preview) {
      case "pending":
        return (
          <PreviewPendings
            pendings={pendings}
            fetching={loaderPendings}
            page={pagePend}
            limit={limitPend}
            handlePage={handlePagePend}
          />
        );
      case "prospect":
        return (
          <Prospects
            prospects={prospects}
            page={pagePros}
            limit={limitPros}
            handlePage={handlePagePros}
            fetching={loaderProspects}
          />
        );
      case "oportunity":
        return (
          <Oportunities
            oportunities={oportunities}
            page={pageOp}
            limit={limitOp}
            handlePage={handlePageOp}
            fetching={loaderOportunities}
          />
        );
      case "sales":
        return (
          <Sales sales={sales} page={pageSale} limit={limitSale} handlePage={handlePageSale} fetching={loaderSales} />
        );
      default:
        return <></>;
    }
  };

  return (
    <PreviewExecutiveStyled open={isOpen} onClose={close} anchor="right">
      <div className="preview">
        <div className="preview__header">
          <p className="title_preview">Información del Ejecutivo</p>

          <Button className="button_reload" onClick={handleReaload}>
            Actualizar Datos
          </Button>
        </div>
        <div className="preview__body">
          <InfoExecutive executive={executive} />
          <div className="tabs">
            <Tabs options={optionTabs} value={optionSelected} setValue={setOptionSelected} />
          </div>
          {RenderContentPreview(optionSelected)}
        </div>
        <div className="preview__footer"></div>
      </div>
    </PreviewExecutiveStyled>
  );
}

const optionTabs = [
  {
    id: "pending",
    name: "Pendientes",
  },
  {
    id: "prospect",
    name: "Prospectos",
  },
  {
    id: "oportunity",
    name: "Oportunidades",
  },
  {
    id: "sales",
    name: "Ventas",
  },
];

function Tabs({ options, value, setValue }) {
  const handleOption = option => setValue(option);
  return (
    <>
      {options.map(item => (
        <p key={item.id} className={`title ${value === item.id && "selected"}`} onClick={() => handleOption(item.id)}>
          {item.name}
        </p>
      ))}
    </>
  );
}

function InfoExecutive({ executive }) {
  return (
    <InfoExecutiveStyle container className="infoExecutive">
      <Grid item md={2} className="media">
        <Avatar className="avatar" src={validateURL(executive?.photo)} alt={executive?.name?.toUpperCase()} />
      </Grid>
      <Grid item md={10} className="data">
        <Grid container spacing={2}>
          <Grid item md={4}>
            <p className="title">Nombre del Ejecutivo</p>
            <p className="info">{executive?.fullname}</p>
          </Grid>
          <Grid item md={4}>
            <p className="title">Iniciales</p>
            <p className="info">{executive?.username}</p>
          </Grid>
          <Grid item md={4}>
            <p className="title">Correo Electrónico</p>
            <p className="info noneCapitalize">{executive?.email}</p>
          </Grid>
          <Grid item md={4}>
            <p className="title">Contacto</p>
            <p className="info">{executive?.phone}</p>
          </Grid>
          <Grid item md={4}>
            <p className="title">Grupo</p>
            <p className="info">{executive.group?.name}</p>
          </Grid>
          <Grid item md={4}>
            <p className="title">Rol</p>
            <p className="info">{executive.role?.name}</p>
          </Grid>
        </Grid>
      </Grid>
    </InfoExecutiveStyle>
  );
}

function Prospects({ prospects, page, limit, handlePage, fetching }) {
  if (fetching) return <LoaderPreview />;
  if (prospects?.count <= 0) return <EmptyData />;
  return (
    <Fade in={true}>
      <ProspectsStyle container spacing={2}>
        <p className="title">Prospectos del Dia</p>
        {prospects?.prospects.map((item, index) => (
          <Paper elevation={2} className="prospect" key={index}>
            <div className="media">
              <Avatar />
            </div>
            <div className="data">
              <div className="data__header">
                <p className="title">
                  Nombre del Prospecto
                  <span className="info capitalize">{item?.fullname}</span>
                </p>
                <p className="title">
                  Categoría de Interés
                  <span className="info capitalize">{item.categoryId ? item?.category?.name : "Sin Categoría"}</span>
                </p>
                <p className="title">
                  Estado, Ciudad/Municipio
                  <span className="info capitalize">
                    {item?.entity?.name} {item?.city?.name && ", " + item?.city?.name}
                  </span>
                </p>
              </div>
            </div>
          </Paper>
        ))}
        <PaginationDirector
          count={prospects?.count}
          limit={limit}
          handlePage={handlePage}
          page={page}
          typeOfTitle={"prospectos"}
        />
      </ProspectsStyle>
    </Fade>
  );
}

function Oportunities({ oportunities, page, limit, handlePage, fetching }) {
  if (fetching) return <LoaderPreview />;
  if (oportunities?.count <= 0) return <EmptyData />;
  return (
    <Fade in={true}>
      <OportunitiesStyle>
        <p className="title_header">Oportunidades del Dia</p>
        <div className="oportunity">
          {oportunities?.oportunities.map((item, index) => (
            <Oportunity elevation={2} key={index} onClick={() => console.log("item", item)}>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <p className="title">
                    <Dns /> Concepto
                  </p>
                  <p className="data">{item.concept}</p>
                </Grid>
                <Grid item md={6}>
                  <p className="title">
                    <Feedback /> Estado de la Oportunidad
                  </p>
                  <p className="data">{item.discarted ? "Descartada" : "Activa"}</p>
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <VerifiedUser />
                    Certeza
                  </p>
                  <p className="data">{item.certainty}%</p>
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <AttachMoney />
                    Monto Total
                  </p>
                  <NumberFormat
                    className="data"
                    value={item.amount}
                    thousandSeparator=","
                    displayType="text"
                    prefix="$"
                  />
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <AttachMoney />
                    Comisión
                  </p>
                  <NumberFormat
                    className="data"
                    value={item.comission}
                    thousandSeparator=","
                    displayType="text"
                    prefix="$"
                  />
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <PermContactCalendar />
                    Fase
                  </p>
                  <p className="data capitalize">{item?.phase?.name}</p>
                </Grid>

                <Grid item md={4}>
                  <p className="title">
                    <EventNote />
                    Fecha de Cotización
                  </p>
                  <p className="data capitalize">{dayjs(item.createdAt).format("DD MMMM YYYY")}</p>
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <Event /> Fecha Estimada de Cierre
                  </p>
                  <p className="data">{dayjs(item.estimatedclossing).format("DD MMMM YYYY")}</p>
                </Grid>

                <Grid item md={4}>
                  <p className="title">
                    <EventAvailable /> Fecha de Ultimo Seguimiento
                  </p>
                  <p className="data">
                    {item.lastTrackingcreatedAt
                      ? dayjs(item.lastTrackingcreatedAt).format("DD MMMM YYYY")
                      : "No se ha Realizado Seguimiento"}
                  </p>
                </Grid>
              </Grid>
            </Oportunity>
          ))}
        </div>
        <PaginationDirector
          count={oportunities?.count}
          limit={limit}
          handlePage={handlePage}
          page={page}
          typeOfTitle={"oportunidades"}
        />
      </OportunitiesStyle>
    </Fade>
  );
}
function Sales({ sales, page, limit, handlePage, fetching }) {
  if (fetching) return <LoaderPreview />;
  if (sales?.count <= 0) return <EmptyData />;
  return (
    <Fade in={true}>
      <SalesStyle>
        <p className="title_header">Ventas del Dia</p>
        <div className="oportunity">
          {sales?.sales.map((item, index) => (
            <Oportunity elevation={2} key={index}>
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <p className="title">
                    <Dns /> Concepto
                  </p>
                  <p className="data">{item.concept}</p>
                </Grid>
                <Grid item md={6}>
                  <p className="title">
                    <Feedback /> Estado de la Venta
                  </p>
                  <p className="data">{item.ispaid ? "Pagada" : "Pendiente de Pagos"}</p>
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <VerifiedUser />
                    Certeza
                  </p>
                  <p className="data">{item.certainty}%</p>
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <AttachMoney />
                    Monto Total
                  </p>
                  <NumberFormat
                    className="data"
                    value={item.amount}
                    thousandSeparator=","
                    displayType="text"
                    prefix="$"
                  />
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <AttachMoney />
                    Comisión
                  </p>
                  <NumberFormat
                    className="data"
                    value={item.comission}
                    thousandSeparator=","
                    displayType="text"
                    prefix="$"
                  />
                </Grid>
                <Grid item md={4}>
                  <p className="title">
                    <PermContactCalendar />
                    Fase
                  </p>
                  <p className="data capitalize">{item?.phase?.name}</p>
                </Grid>

                <Grid item md={4}>
                  <p className="title">
                    <EventNote />
                    Fecha de Venta
                  </p>
                  <p className="data capitalize">{dayjs(item.soldat).format("DD MMMM YYYY")}</p>
                </Grid>
              </Grid>
            </Oportunity>
          ))}
        </div>
        <PaginationDirector
          count={sales?.count}
          limit={limit}
          handlePage={handlePage}
          page={page}
          typeOfTitle={"ventas"}
        />
      </SalesStyle>
    </Fade>
  );
}
