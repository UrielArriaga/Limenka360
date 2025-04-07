import { Grid, IconButton, LinearProgress } from "@material-ui/core";
import { ArrowBack, Assignment, Edit } from "@material-ui/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { handleGlobalAlert } from "../../../../utils";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import InfoClient from "../../../../components/UI/organism/InformationClient";
import InfoSale from "../../../../components/UI/organism/InformationSale";
import InfoEjecutive from "../../../../components/UI/organism/InfoExecutive";
import InfoBill from "../../../../components/UI/organism/InformationBill";
import { PedidosStyled } from "../../../../styles/Logistica/pedidos/pedido";
import InfomationShippings from "../../../../components/UI/organism/InformationShipping";
import ProductsInformationProfile from "../../../../components/UI/organism/InformationTablePorductsProfile";
import DataOrderPdf from "../../../../components/DataOrderPdf";
import Files from "../../../../components/Files";
import MainLayout from "../../../../components/MainLayout";
import FilesOrdersAdmin from "../../../../components/UI/organism/FilesOrdersAdmin";
const Pedido = () => {
  const dispatch = useDispatch();

  const router = useRouter();
  const [isLoading, setIsLoading] = useState([]);
  const [infoOrders, setInfoOrders] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [prospect, setProspect] = useState({});
  const routerOrderId = router.query.pe;
  const routerProspectId = router.query.pr;
  const routerOportunityId = router.query.op;
  const [shippings, setShippings] = useState([]);
  const [productsCotization, setProductsCotizacion] = useState([]);
  const idShipping = shippings?.id;
  //datos de cliente
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [routerProspectId]);

  useEffect(() => {
    if (routerOrderId) {
      getDataShippings();
      getInitialDataOrders();
    }
  }, [routerOrderId]);

  useEffect(() => {
    getQuotesByOportunity();
  }, [routerOportunityId]);

  const getDataInitial = async () => {
    try {
      let Prospect = await api.get(
        `prospects/${routerProspectId}?include=category,city,entity,phase,origin,clientcompany,clienttype,specialty,postal,prospectslabels,prospectslabels.label`
      );
      setProspect(Prospect.data);
    } catch (error) {
      console.log(error);
      handleAlert("error", "Cliente - Error al cargar los datos!", "basic");
    }
  };

  const getInitialDataOrders = async () => {
    try {
      setIsLoading(true);
      let include =
        "address,address.entity.city.postal,paymentaccount,orderstatus,oportunity,oportunity.prospect,oportunity.productsoportunities,oportunity,oportunity.soldby,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime";
      let params = { showproducts: 2, include: include, subquery: 1, showbilladdress: 0 };
      let p = await api.get(`orders/${routerOrderId}`, { params });
      p.data.prospectId = p?.data?.oportunity?.prospectId;
      p.data.orderId = p?.data?.id;
      let results = p.data;
      setInfoOrders(results);
      setAllProducts(results.oportunity.productsoportunities);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      handleAlert("error", "Pedido - Error al cargar los datos!", "basic");
    }
  };

  //envio de una order
  const getDataShippings = async () => {
    try {
      let query = { orderId: routerOrderId };
      const params = {
        where: JSON.stringify(query),
        include: "address,address.city,address.entity,address.postal",
      };
      let shipping = await api.get(`shippings`, { params });
      let result = shipping.data.results[0];
      setShippings(result);
    } catch (error) {
      handleGlobalAlert("error", " ¡Error al cargar Datos de Envios!", "basic", dispatch);
    }
  };

  const getQuotesByOportunity = async () => {
    try {
      let query = {
        oportunityId: routerOportunityId,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product, product.brand",
        all: 1,
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      setProductsCotizacion(products);
    } catch (error) {
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

  return (
    <MainLayout>
      <PedidosStyled>
        <Head>
          <title>CRM JOBS - Pedido</title>
        </Head>

        <div className="main">
          <div className="ctr_order">
            <div className="ctr_order__title">
              <div className="ctr_order__titles">
                <div className="titleContainer">
                  <IconButton onClick={() => router.back()}>
                    <ArrowBack className="icon" />
                  </IconButton>
                  <p className="ctr_order__info__ctr_title">Pedido</p>
                </div>
              </div>
              {!isLoading && <DataOrderPdf infoOrders={infoOrders} productsCotization={productsCotization} />}{" "}
            </div>
            {!isLoading && (
              <div className="ctr_order__info">
                <div className="ctr_order__info__ctr_title">
                  <div className="ctr_order__info__ctr_title__title">
                    <Assignment />
                    <p>Datos de Pedido</p>
                  </div>
                </div>
                <Grid container spacing={2} className="ctr_order__info__data">
                  <Grid item md={4} sm={6} xs={12}>
                    <p className="label">Folio</p>
                    {thereIsData(infoOrders?.folio)}
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <p className="label">Estado Pedido</p>
                    {infoOrders?.orderstatus?.status ? (
                      <>
                        {infoOrders?.orderstatus?.status === 1 && (
                          <p className="primary_paragraph capitalize">Pendiente Por Aprobación</p>
                        )}
                        {infoOrders?.orderstatus?.status === 2 && (
                          <p className="primary_paragraph capitalize">Aprobado</p>
                        )}
                        {infoOrders?.orderstatus?.status === 3 && (
                          <p className="primary_paragraph capitalize">Rechazado</p>
                        )}
                      </>
                    ) : (
                      <span>N/A</span>
                    )}
                  </Grid>
                  <Grid item md={4} sm={6} xs={12}>
                    <p className="label">Cuenta de Pago</p>
                    {thereIsData(infoOrders?.paymentaccount?.name)}
                  </Grid>
                  <Grid item xs={12}>
                    <p className="label">Observaciones Generales</p>
                    {thereIsData(infoOrders?.observations)}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InfomationShippings infoOrders={infoOrders} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <p className="label">Productos de Envio</p>
                    <ProductsInformationProfile idShipping={idShipping} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className="divider" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InfoBill infoOrders={infoOrders} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className="divider" />
                  </Grid>
                  <Grid item xs={12}>
                    {/* <FilesOrdersAdmin idOrder={routerOrderId} /> */}
                    <Files filesFrom={"order"} data={infoOrders} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <div className="divider" />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InfoEjecutive infoOrders={infoOrders} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InfoSale infoOrders={infoOrders} allProducts={allProducts} />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InfoClient prospect={prospect} />
                  </Grid>
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
