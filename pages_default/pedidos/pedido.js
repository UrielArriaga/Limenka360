import { Dialog, Grid, IconButton, LinearProgress, Tooltip } from "@material-ui/core";
import { ArrowBack, Assignment, AttachMoney, Edit, PersonOutline, TableChartOutlined } from "@material-ui/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { api } from "../../services/api";
import MainLayout from "../../components/MainLayout";
import DataOrderPdf from "../../components/DataOrderPdf";
import Files from "../../components/Files";
import { dialogSelector } from "../../redux/slices/dialogSlice";
import { useDispatch, useSelector } from "react-redux";
import InfomationShippings from "../../components/UI/organism/InformationShipping";
import InfoBill from "../../components/UI/organism/InformationBill";
import InfoSale from "../../components/UI/organism/InformationSale";
import InfoClient from "../../components/UI/organism/InformationClient";
import { handleGlobalAlert } from "../../utils";
import { PedidosStyled } from "../../styles/Pedidos/pedido";
import TableTracing from "../../components/TableTracing";
import useGlobalCommons from "../../hooks/useGlobalCommons";
import TableProductsSerials from "../../components/TableProductsSerials";
import useWarehouseproducts from "../../features/EjecutiveDetailsPedido/hooks/useWarehouseproducts";
const Pedido = () => {
  const router = useRouter();
  const { openMenuSide } = useSelector(dialogSelector);
  const [isLoading, setIsLoading] = useState([]);
  const [infoOrders, setInfoOrders] = useState([]);
  const [prospect, setProspect] = useState({});
  const [prospectTracking, setProspectTracking] = useState({});
  const routerOrderId = router.query.pe;
  const prospecto = router.query.pr;
  const routerOportunityId = router.query.op;
  const [allProducts, setAllProducts] = useState([]);
  const [productsCotization, setProductsCotizacion] = useState([]);
  const dispatch = useDispatch();
  const [flag, setFlag] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const { getCatalogBy } = useGlobalCommons();
  const { serialProducts } = useWarehouseproducts(routerOrderId);
  
  const TabsLabels = [
    { name: "Datos del Pedido", icon: <Assignment /> },
    { name: "Datos de Envio", icon: <Assignment /> },
    { name: "Datos de Factura", icon: <Assignment /> },
    { name: "Datos de Venta", icon: <AttachMoney /> },
    { name: "Datos del Cliente", icon: <PersonOutline /> },
    { name: "Seguimientos del Pedido", icon: <TableChartOutlined /> },
    { name: "Numeros de Serie", icon: <TableChartOutlined /> },
  ];

  const [tabValue, setTabValue] = useState(TabsLabels[0]);

  useEffect(() => {
    getCatalogBy("phases");
    getCatalogBy("actions");
  }, []);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [flag, prospecto]);

  const getDataInitial = async () => {
    if (!prospecto) return;
    try {
      setIsLoading(true);
      let Prospect = await api.get(
        `prospects/${prospecto}?include=category,city,entity,phase,origin,clientcompany,clienttype,specialty,postal,prospectslabels,prospectslabels.label`
      );
      setProspect(Prospect.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "pedido - Error al cargar los datos de cliente!", "basic", dispatch, 6000);
    }
  };

  useEffect(() => {
    getInitialDataOrders();
  }, [routerOrderId]);

  useEffect(() => {
    getQuotesByOportunity();
  }, [routerOportunityId]);

  useEffect(() => {
    if (prospect && Object.keys(prospect).length > 0) {
      handleSomeAction();
    }
  }, [prospect, infoOrders]);

  const getInitialDataOrders = async () => {
    try {
      let include =
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.phase,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime";
      let params = { showproducts: 1, include: include };
      let p = await api.get(`orders/${routerOrderId}`, { params });
      p.data.prospectId = p?.data?.oportunity?.prospectId;
      p.data.phase = p?.data?.oportunity?.phase;
      p.data.orderId = p?.data?.id;
      let results = p.data;
      setInfoOrders(results);
      setAllProducts(results.oportunity.productsoportunities);
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "pedido - Error al cargar los datos de pedido!", "basic", dispatch, 6000);
    }
  };

  const getQuotesByOportunity = async () => {
    setIsLoading(true);
    try {
      let query = {
        oportunityId: routerOportunityId,
      };
      const params = {
        where: JSON.stringify(query),
        include: "product,product.brand",
        all: 1,
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      setProductsCotizacion(products);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  const thereIsData = data => {
    if (data) {
      return <p className="primary_paragraph capitalize">{data}</p>;
    } else {
      return <span>N/A</span>;
    }
  };

  const handleClickEditOrder = item => {
    router.push({
      pathname: "/pedidos/EditarPedido",
      query: {
        pe: item.id,
        op: item?.oportunityId,
      },
    });
  };
  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  const handleSomeAction = () => {
    const tracingDetailsData = {
      id: prospect?.id,
      name: prospect?.name,
      lastname: prospect?.lastname,
      clientcompany: prospect?.clientcompany,
      phase: infoOrders?.oportunity?.phase,
    };
    setProspectTracking(tracingDetailsData);
  };

  const renderDataOrder = () => {
    switch (tabValue.name) {
      case "Datos del Pedido":
        return (
          <>
            <Grid item xs={12} md={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} md={4}>
              <p className="label">Folio</p>
              {thereIsData(infoOrders?.folio)}
            </Grid>
            <Grid item xs={12} md={4}>
              <p className="label">Estado Pedido</p>
              {infoOrders?.orderstatus?.status ? (
                <>
                  {infoOrders?.orderstatus?.status === 1 && (
                    <p className="primary_paragraph capitalize">Pendiente Por Aprobación</p>
                  )}
                  {infoOrders?.orderstatus?.status === 2 && <p className="primary_paragraph capitalize">Aprobado</p>}
                  {infoOrders?.orderstatus?.status === 3 && <p className="primary_paragraph capitalize">Rechazado</p>}
                </>
              ) : (
                <span>N/A</span>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <p className="label">Cuenta de Pago</p>
              {thereIsData(infoOrders?.paymentaccount?.name)}
            </Grid>
            <Grid item xs={12} md={4}>
              <p className="label">Observaciones Generales</p>
              {thereIsData(infoOrders?.observations)}
            </Grid>
          </>
        );
      case "Datos de Envio":
        return (
          <Grid item xs={12} md={12}>
            <InfomationShippings infoOrders={infoOrders} />
          </Grid>
        );
      case "Datos de Factura":
        return (
          <>
            <Grid item xs={12} md={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} md={12}>
              <InfoBill infoOrders={infoOrders} />
            </Grid>
            <Grid item xs={12} md={12}>
              <div className="divider" />
            </Grid>
            <Grid item xs={12} md={12}>
              <Files filesFrom={"order"} data={infoOrders} />
            </Grid>
          </>
        );
      case "Datos de Venta":
        return (
          <Grid item xs={12} md={12}>
            <InfoSale infoOrders={infoOrders} allProducts={allProducts} />
          </Grid>
        );
      case "Datos del Cliente":
        return (
          <Grid item xs={12} md={12}>
            <InfoClient prospect={prospect} />
          </Grid>
        );
      case "Seguimientos del Pedido":
        return (
          <div id="seguimientos" style={{ width: "100%" }}>
            <div className="divider" />
            <TableTracing
              isOrder={true}
              footer={true}
              prospect={prospectTracking}
              handleAlert={handleAlert}
              setAlert={setAlert}
              setFlag={() => setFlag(!flag)}
            />
          </div>
        );
      default:
        return (
          <div style={{width:"100%"}}>
            <div className="divider" />
            <TableProductsSerials serials={serialProducts} orderInfo={infoOrders}/>
          </div>
        );
    }
  };

  return (
    <MainLayout>
      <PedidosStyled isOpen={openMenuSide}>
        <Head>
          <title>CRM JOBS - Pedido</title>
        </Head>
        <div className="main">
          <div className="ctr_order">
            <div className="ctr_order__title">
              {!isLoading && (
                <div className="titleContainer">
                  <IconButton onClick={() => router.back()}>
                    <ArrowBack className="icon" />
                  </IconButton>
                  <p className="ctr_order__info__ctr_title">Información de pedido</p>

                  {infoOrders.orderstatus?.name !== "Aprobado" && (
                    <Tooltip title="Editar Pedido">
                      <Edit className="iconEdit" onClick={() => handleClickEditOrder(infoOrders)} />
                    </Tooltip>
                  )}
                </div>
              )}
              {!isLoading && <DataOrderPdf infoOrders={infoOrders} productsCotization={productsCotization} />}
            </div>
            {!isLoading && (
              <div className="ctr_order__info">
                <div className="ctr_order__info__ctr_title">
                  {TabsLabels?.map(tabOption => (
                    <div
                      className={`ctr_order__info__ctr_title__title ${
                        tabOption?.name == tabValue?.name && "titleSelect"
                      }`}
                    >
                      {tabOption?.icon}
                      <p onClick={() => setTabValue(tabOption)}>{tabOption?.name}</p>
                    </div>
                  ))}
                </div>

                <Grid container spacing={2} className="ctr_order__info__data">
                  {renderDataOrder()}
                </Grid>
              </div>
            )}

            {isLoading && (
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
          </div>
        </div>
      </PedidosStyled>
    </MainLayout>
  );
};

export default Pedido;
