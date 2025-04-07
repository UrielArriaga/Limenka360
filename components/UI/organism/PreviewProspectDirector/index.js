import { Box, Button, Drawer, Fade, Grid, Modal } from "@material-ui/core";
import { PersonPinCircle, Today } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { api } from "../../../../services/api";
import { colors } from "../../../../styles/global.styles";
import { formatDate, formatNumber } from "../../../../utils";
import PendingsPreviePage from "../../molecules/PendingsPreviePage";
import ProductsQuotesPage from "../../molecules/ProductsQuotesPage";
import QuotesClientsPage from "../../molecules/quotesSalesClients";
import SalesClientsPage from "../../molecules/SalesClientsPage";
import TimeLinePrewiew from "../../molecules/TimeLinePrewiew";
export default function PreviewProspectDirector({ executive, open, toogle, prospectSelected }) {
  const [optionSelected, setOptionSelected] = useState("trackings");
  const [prospect, setProspect] = useState({});
  const [oportunity, setOportunity] = useState({});
  const [pendings, setPendings] = useState([]);
  const [trackings, setTrackings] = useState([]);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [isFetchingData, setIsFetchingData] = useState(true);
  const [quotes, setQuotes] = useState([]);
  const [totalQuotes, setTotalQuotes] = useState(0);
  useEffect(() => {
    setIsFetchingData(true);

    if (prospectSelected?.id) {
      getData();
      getPendings();
      getTrackings();
    }

    if (prospectSelected?.id && prospectSelected.isOportunity) {
      getQuotesByOportunity();
      getOportunity();
    }

    if (prospectSelected?.id && prospectSelected.isClient === true) {
      getQuotesClientByOportunity();
      getOportunitiesByProspect();
    }

    setIsFetchingData(false);
  }, [prospectSelected]);

  const getData = async () => {
    try {
      let params = {
        include: "category,origin",
      };
      let response = await api.get(`prospects/${prospectSelected.id}`, { params });
      // console.log(response);
      setProspect(response.data);
    } catch (error) {
      console.log(error);
      // setIsFetchingData(false);
    }
  };

  const getPendings = async () => {
    try {
      // setLoaderBack(true);
      let queryPendings = {};
      queryPendings.prospectId = prospectSelected.id;
      queryPendings.createdbyId = executive.id;
      queryPendings.isdone = false;
      let params = {
        where: JSON.stringify(queryPendings),
        // order: orderPendings.value,
        include: "pendingstype,prospect,prospect.phase",
      };
      let pendings = await api.get(`pendings`, { params });
      // console.log(pendings);
      setPendings(pendings.data.results);
    } catch (error) {
      console.log(error);
      // if (error.response.config.url.includes("pendings")) {
      //   handleAlert("error", "Pendientes - Error al cargar los datos!", "basic");
      // }
    }
  };

  const getTrackings = async () => {
    try {
      let queryPendings = {};
      queryPendings.prospectId = prospectSelected.id;

      let params = {
        where: JSON.stringify(queryPendings),
        order: "createdAt",
        include: "phase",
        all: 1,
      };
      let trackingResponse = await api.get(`trackings`, { params });
      setTrackings(trackingResponse.data.results);
    } catch (error) {}
  };

  const getOportunity = async () => {
    try {
      let query = {
        id: prospectSelected.idOportunity,
      };
      const params = {
        where: JSON.stringify(query),
      };
      let responseOportunity = await api.get(`oportunities`, { params });
      setOportunity(responseOportunity.data.results[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getQuotesByOportunity = async () => {
    try {
      let query = {
        oportunityId: prospectSelected.idOportunity,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product",
      };
      let quotes = await api.get("productsoportunities", { params });

      let products = quotes.data?.results;
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  const getOportunitiesByProspect = async () => {
    try {
      let query = {};
      let inQuery = {};
      query.prospect = inQuery;
      query.iscloseout = false;
      inQuery.isoportunity = true;
      query.discarted = false;
      query.prospectId = prospectSelected.id;

      let params = {
        include: "prospect,phase",
        where: JSON.stringify(query),
        count: "0",
        showproducts: 1,
        order: "-createdAt",
      };

      let oportuntiesResponse = await api.get(`oportunities`, { params });
      setQuotes(oportuntiesResponse.data?.results);
      setTotalQuotes(oportuntiesResponse.data?.count);
      console.log("COTIZACIONES", oportuntiesResponse.data?.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getQuotesClientByOportunity = async () => {
    try {
      let query = {};
      query.prospectId = prospectSelected.id;
      query.discarted = false;
      query.iscloseout = true;
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "prospect",
        order: "-createdAt",
        showproducts: 1,
      };
      let quotes = await api.get("oportunities", { params });
      let quote = quotes.data?.results;
      console.log("VENTAS", quote);
      setSales(quote);
    } catch (error) {
      console.log(error);
    }
  };

  const getClassActive = value => (optionSelected === value ? "tab-selected" : "");
  const validateNullValue = value => (value ? value : <span>N/A</span>);

  const onClickTab = value => {
    setOptionSelected(value);
    console.log("value", value);
  };

  // if (isFetchingData) {
  //   return <div className="body_modal">cargando</div>;
  // }

  const renderContent = () => {
    switch (optionSelected) {
      case "trackings":
        return <TimeLinePrewiew trackings={trackings} />;

      case "pendings":
        return <PendingsPreviePage pendings={pendings} />;

      case "quotes":
        return <ProductsQuotesPage products={products} />;
      case "quotesClients":
        return <QuotesClientsPage quotesClients={quotes} selected={prospectSelected} />;
      case "sales":
        return <SalesClientsPage sales={sales} />;
      default:
        break;
    }
  };
  return (
    <DrawerStyled
      anchor="right"
      open={open}
      onClose={() => {
        toogle();
        setOptionSelected("trackings");
      }}
    >
      <Fade in={open}>
        <div className="body_modal">
          {isFetchingData && <div className="loader_modal">cargando</div>}
          {!isFetchingData && (
            <>
              <div className="header">
                <p className="title">Prospecto</p>
              </div>

              {prospectSelected.isOportunity && (
                <Grid spacing={2} container className="information">
                  <Grid item xs={12} md={4}>
                    <p className="label">Concepto</p>
                    <p className="paragraph capitalize">{oportunity?.concept}</p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Cantidad de productos</p>
                    <p className="paragraph">{oportunity?.quantity}</p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Certeza</p>
                    <p className="paragraph">{oportunity?.certainty}%</p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Monto Total</p>
                    <p className="paragraph">{formatNumber(oportunity?.amount)}</p>
                  </Grid>

                  <Grid item xs={12} md={8}>
                    <p className="label">Comisión</p>
                    <p className="paragraph">{formatNumber(oportunity?.comission)}</p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Fecha de creacion</p>
                    <p className="paragraph">{formatDate(oportunity?.createdAt)}</p>
                  </Grid>

                  <Grid item xs={12} md={4}>
                    <p className="label">Fecha estimada de cierre</p>
                    <p className="paragraph">{formatDate(oportunity?.estimatedclossing)}</p>
                  </Grid>
                </Grid>
              )}
              <Grid spacing={2} container className="information">
                <Grid item xs={12} md={4}>
                  <p className="label">Nombre</p>
                  <p className="paragraph light">{prospect?.fullname}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Correo</p>
                  <p className="paragraph light highlight">{prospect?.email}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Telefono</p>
                  <p className="paragraph light highlight">{prospect?.phone}</p>
                </Grid>
                {/* <Box height={60} /> */}
                <Grid item xs={12} md={4}>
                  <p className="label">Categoría de Interés</p>
                  {validateNullValue(prospect?.category?.name)}
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Origen</p>
                  {validateNullValue(prospect?.origin?.name)}
                </Grid>
              </Grid>

              <div className="tabs">
                <div className={`tab  ${getClassActive("trackings")}`} onClick={() => onClickTab("trackings")}>
                  <p>Seguimientos</p>
                </div>

                <div className={`tab ${getClassActive("pendings")}`} onClick={() => onClickTab("pendings")}>
                  <p>Pendientes</p>
                </div>

                {prospectSelected.isClient && (
                  <>
                    <div
                      className={`tab ${getClassActive("quotesClients")}`}
                      onClick={() => onClickTab("quotesClients")}
                    >
                      <p>Cotizaciones</p>
                    </div>
                    <div className={`tab ${getClassActive("sales")}`} onClick={() => onClickTab("sales")}>
                      <p>Ventas</p>
                    </div>
                  </>
                )}
                {prospectSelected.isOportunity && (
                  <div className={`tab ${getClassActive("quotes")}`} onClick={() => onClickTab("quotes")}>
                    <p>Productos de esta cotizacion</p>
                  </div>
                )}
              </div>

              {renderContent()}
            </>
          )}
        </div>
      </Fade>
    </DrawerStyled>
  );
}

const DrawerStyled = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  outline: 0;
  .body_modal {
    border: none;
    outline: 0;
    background: #fff;
    border-radius: 8px;
    width: 100%;
    min-width: 500px;
    max-width: 650px;
    height: 90vh;
    overflow: scroll;
  }
  p {
    margin: 0;
  }

  .header {
    /* background-color: ${colors.primaryColorDark}; */
    padding: 20px;
  }

  .title {
    font-weight: bold;
  }

  .information {
    padding: 20px;
  }
  .label {
    font-size: 13px;
    font-weight: bold;
    color: #4f4f4f;
    margin-bottom: 2px;
  }
  .paragraph {
    font-size: 16px;
    font-weight: 500;
    color: #000;
  }

  .highlight {
    font-weight: bold;
  }
  .tabs {
    display: flex;
    padding: 20px;
    transition: all 1s ease-in-out;

    .tab {
      cursor: pointer;
      margin-right: 20px;

      /* padding: 20px; */
      border-bottom: 2px solid transparent;
      &:hover {
        color: #2979ff;
        /* font-weight: bold; */
        margin-right: 20px;
        padding-bottom: 7px;
        border-bottom: 2px solid #2979ff;
      }
    }

    .tab-selected {
      color: #2979ff;
      font-weight: bold;
      margin-right: 20px;
      padding-bottom: 7px;
      border-bottom: 2px solid #2979ff;
    }
  }
  // * Para separar pendientes
  .pendings {
    padding: 20px;
  }

  .target_pendings {
    padding: 10px;
    min-height: 150px;
    width: max-content;
    min-width: 320px;
    max-width: 350px;
    border-radius: 8px;
    position: relative;
    box-shadow: rgb(100 100 111 / 20%) 3px 4px 12px 0px;
    &::before {
      top: 0px;
      left: 0px;
      width: 5px;
      bottom: 0px;
      content: "";
      position: absolute;
      background-image: linear-gradient(
        to right bottom,
        #3f51b5,
        #2d499e,
        #1e4086,
        #13376f,
        #0e2d58,
        #122d55,
        #142c51,
        #172c4e,
        #20355c,
        #2a3e6b,
        #35487a,
        #405189
      );
      border-top-left-radius: 4px;
      border-bottom-left-radius: 4px;
    }
    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 5px;
      .item {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        .icon {
          color: #3f51b5;
          font-size: 16px;
        }
        .date {
          font-size: 12px;
          font-weight: bold;
          color: #0c203b;
        }
      }
    }
    .ct_icon_complete {
      justify-content: center;
      color: #008000;
    }
    .ct_icon_incomplete {
      justify-content: center;
      color: red;
    }
    .pendingButton {
      position: absolute;
      width: 300px;
      margin-left: 5px;
      margin: 2px 0px;
      text-transform: capitalize;
      font-size: 12px;
      margin-top: -11px;
    }
    .span {
      font-weight: bold;
      letter-spacing: 0.03em;
      font-size: 11px;
    }

    .time {
      font-size: 14px;
      font-weight: bold;
      color: #103c82;
    }
  }
  // * Para separar pendientes
`;
