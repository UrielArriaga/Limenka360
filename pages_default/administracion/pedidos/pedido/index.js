import { Button, Grid, IconButton, LinearProgress, Paper } from "@material-ui/core";
import { ArrowBack, Assignment, PersonOutline } from "@material-ui/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LoaderCompleteScreen from "../../../../components/LoaderCompleteScreen";
import { useDispatch, useSelector } from "react-redux";
import NavBarDashboardAdministration from "../../../../components/NavBarDashboard/Administration";
import { PedidosStyled } from "../../../../styles/Administracion/pedidos/pedido/pedido.style";
import FilesOrdersAdmin from "../../../../components/UI/organism/FilesOrdersAdmin";
import useModal from "../../../../hooks/useModal";
import ApprovedOrder from "../../../../components/ModalApprovedOrder";
import RejectedOrder from "../../../../components/ModalRejectedOrder";
import { api } from "../../../../services/api";
import InfoClient from "../../../../components/UI/organism/InformationClient";
import InfoSale from "../../../../components/UI/organism/InformationSale";
import InfoEjecutive from "../../../../components/UI/organism/InfoExecutive";
import InfoBill from "../../../../components/UI/organism/InformationBill";
import { handleGlobalAlert } from "../../../../utils";
import DataOrderPdf from "../../../../components/DataOrderPdf";
import InfomationShippings from "../../../../components/UI/organism/InformationShipping";
import Files from "../../../../components/Files";
import MainLayout from "../../../../components/MainLayout";
const Pedido = () => {
  const { open: openRejectedModal, toggleModal: toggleRejectedModal, closeModal: closeModalRejected } = useModal();
  const { open: openApprovedModal, toggleModal: toggleApprovedModal, closeModal: closeModalApproved } = useModal();
  const dispatch = useDispatch();
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState([]);
  const [infoOrders, setInfoOrders] = useState([]);
  const [prospect, setProspect] = useState({});
  const routerOrderId = router.query.pe;
  const routerProspectId = router.query.pr;
  const routerOportunityId = router.query.op;
  const [isLoaderOrder, setIsLoaderOrder] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [ordersReject, setOrdersReject] = useState();
  const [loaderCompleteRejected, setLoaderCompleteRejected] = useState(false);
  const [loaderCompleteApproved, setLoaderCompleteApproved] = useState(false);
  const [ordersApproved, setOrdersApproved] = useState();
  const [productsCotization, setProductsCotizacion] = useState([]);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [routerProspectId, routerOrderId]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getInitialDataOrders();
    }
    return () => (mounted = false);
  }, [routerOrderId, flag]);

  const getDataInitial = async () => {
    try {
      let Prospect = await api.get(
        `prospects/${routerProspectId}?include=category,city,entity,phase,origin,clientcompany,clienttype,specialty,postal,prospectslabels,prospectslabels.label`
      );
      setProspect(Prospect.data);
    } catch (error) {
      console.log(error);
      handleGlobalAlert("error", "Cliente - Error al cargar los datos!", "basic", dispatch);
    }
  };

  useEffect(() => {
    getQuotesByOportunity();
  }, [routerOportunityId]);

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
      handleGlobalAlert("error", " ¡Pedidos-Error al cargar los datos!", "basic", dispatch);
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

  const handleClickRejectOrder = () => {
    toggleRejectedModal();
  };

  const handleClickapproveOrder = () => {
    toggleApprovedModal();
  };

  return (
    <MainLayout>
      <PedidosStyled>
        <Head>
          <title>CRM JOBS - Pedido</title>
        </Head>
        {/* <NavBarDashboardAdministration sideBar={true} /> */}

        <div className="main">
          <div className="ctr_order">
            <div className="ctr_order__title">
              <div className="ctr_order__titles">
                <IconButton onClick={() => router.back()}>
                  <ArrowBack className="icon" />
                </IconButton>
                <p className="ctr_order__info__ctr_title">Información de Pedido</p>
              </div>
              {!isLoading && (
                <div className="buttons">
                  <DataOrderPdf infoOrders={infoOrders} productsCotization={productsCotization} />
                  {infoOrders?.orderstatus?.status !== 2 && (
                    <Button className={`buttons__bt aproved`} onClick={() => handleClickapproveOrder(infoOrders)}>
                      Aprobar Pedido
                    </Button>
                  )}

                  {infoOrders?.orderstatus?.status !== 3 && (
                    <Button className={`buttons__bt denied`} onClick={() => handleClickRejectOrder(infoOrders)}>
                      Rechazar Pedido
                    </Button>
                  )}
                </div>
              )}
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
                  <Grid item xs={12} md={4}>
                    <p className="label">Folio</p>
                    {thereIsData(infoOrders?.folio)}
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <p className="label">Estado Pedido</p>

                    {infoOrders?.folio ? (
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

                  <Grid item xs={12} md={4}>
                    <p className="label">Cuenta de Pago</p>
                    {thereIsData(infoOrders?.paymentaccount?.name)}
                  </Grid>

                  <Grid item xs={12} md={7}>
                    <p className="label">Observaciones Generales</p>
                    {thereIsData(infoOrders?.observations)}
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <InfomationShippings infoOrders={infoOrders} />
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
        <ApprovedOrder
          isRoleShopping={false}
          open={openApprovedModal}
          ordersApproved={infoOrders}
          close={closeModalApproved}
          refetch={flag}
          setRefetch={setFlag}
          setLoaderCompleteApproved={setLoaderCompleteApproved}
          loaderCompleteApproved={loaderCompleteApproved}
          toggleApprovedModal={toggleApprovedModal}
        />
        <RejectedOrder
          isRoleShopping={false}
          open={openRejectedModal}
          ordersReject={infoOrders}
          close={closeModalRejected}
          refetch={flag}
          setRefetch={setFlag}
          toggleRejectedModal={toggleRejectedModal}
          loaderCompleteRejected={loaderCompleteRejected}
          setLoaderCompleteRejected={setLoaderCompleteRejected}
        />
        {isLoaderOrder && <LoaderCompleteScreen />}
      </PedidosStyled>
    </MainLayout>
  );
};

export default Pedido;
