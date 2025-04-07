import { Box, Button, Grid, IconButton, LinearProgress, Paper } from "@material-ui/core";
import { ArrowBack, Assignment, Edit, MailOutline, PersonOutline } from "@material-ui/icons";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { handleGlobalAlert } from "../../../../utils";
import FilesOrdersAdmin from "../../../../components/UI/organism/FilesOrdersAdmin";
import useModal from "../../../../hooks/useModal";
import { api } from "../../../../services/api";
import { useDispatch } from "react-redux";
import { PedidosStyled, ShowProducts } from "../../../../styles/Compras/Pedido/styles";
import ModifiPhaseProduct from "../../../../components/UI/organism/ModalModifyPhaseProduct";
import TableLimenka from "../../../../components/UI/organism/TableLimenka";
import { normalizeTableDataProductShipping } from "../../../../utils/normalizeData";
import InfoClient from "../../../../components/UI/organism/InformationClient";
import InfoSale from "../../../../components/UI/organism/InformationSale";
import InfoEjecutive from "../../../../components/UI/organism/InfoExecutive";
import InfoBill from "../../../../components/UI/organism/InformationBill";
import VerifyOrder from "../../../../components/ModalVerifyOrder";
import RemoveVerifyOrder from "../../../../components/ModalRemoveVerifiedOrder";
import DataOrderPdf from "../../../../components/DataOrderPdf";
import MainLayout from "../../../../components/MainLayout";
import Files from "../../../../components/Files";
import InfomationShippings from "../../../../components/UI/organism/InformationShipping";
export default function Pedido() {
  const dispatch = useDispatch();
  const { open: openVerify, toggleModal: toggleOpenVerify, closeModal: closeModalVerify } = useModal();
  const { open: openRemoveVerify, toggleModal: toggleRemoveVerify, closeModal: closeRemoveVerify } = useModal();
  const { open: openPhaseProduct, toggleModal: togglePhaseProduct, closeModal: closeModalPhaseProduct } = useModal();
  const router = useRouter();
  const [flag, setFlag] = useState(false);
  const [isLoading, setIsLoading] = useState([]);
  const [infoOrders, setInfoOrders] = useState([]);
  const [prospect, setProspect] = useState({});
  const routerOrderId = router.query.pe;
  const routerProspectId = router.query.pr;
  const routerOportunityId = router.query.op;
  const [allProducts, setAllProducts] = useState([]);
  //envios
  const [shippings, setShippings] = useState([]);
  //productos
  const [productsShippings, setProductsShippings] = useState([]);
  const [dataProducts, setDataProducts] = useState({});
  const [refetch, setRefetch] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const idShipping = shippings?.id;
  const [ordersVerify, setOrdersVerify] = useState({});
  const [productsCotization, setProductsCotizacion] = useState([]);
  useEffect(() => {
    let mounted = true;
    if ((mounted, routerProspectId)) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [routerProspectId]);

  useEffect(() => {
    if (routerOrderId) {
      getInitialDataOrders();
    }
  }, [routerOrderId, flag]);

  useEffect(() => {
    if (routerOrderId) {
      getDataShippings();
    }
  }, [routerOrderId]);

  useEffect(() => {
    if (idShipping) {
      getDataShippingsProduct();
    }
  }, [idShipping, refetch, isLoading]);

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
      handleGlobalAlert("error", "Cliente - Error al cargar los datos!", "basic", dispatch);
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
      handleGlobalAlert("error", "Pedido - Error al cargar los datos!", "basic", dispatch);
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
  // productos por envio
  const getDataShippingsProduct = async () => {
    try {
      setIsFetching(true);
      let query = { shippingId: idShipping };
      const params = {
        where: JSON.stringify(query),
        include: "productsoportunity,productsoportunity.product,productphase,shipping,shipping.order",
        limit: "1000",
      };
      let shipping = await api.get(`productsshippings`, { params });
      let newShipping = normalizeTableDataProductShipping(shipping.data.results);
      setProductsShippings(newShipping);
      setIsFetching(false);
    } catch (error) {
      console.log("erro", error);
      setIsFetching(false);
      handleGlobalAlert("error", " ¡Error al cargar productos!", "basic", dispatch);
    }
  };

  const handleClickEditOrders = item => {
    setDataProducts(item.itemBD);
    togglePhaseProduct();
  };

  const handleClickVerify = item => {
    if (item?.data?.isverified !== true) {
      setOrdersVerify(item);
      toggleOpenVerify();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya está verificado!", "basic", dispatch);
    }
  };
  const handleClickRemoveVerified = item => {
    if (item?.data?.isverified !== false) {
      setOrdersVerify(item);
      toggleRemoveVerify();
    } else {
      return handleGlobalAlert("error", "¡El pedido ya fue removido de verificados!", "basic", dispatch);
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
            {!isLoading && (
              <>
                <div className="ctr_order__title">
                  <div className="ctr_order__titles">
                    <IconButton onClick={() => router.back()}>
                      <ArrowBack className="icon" />
                    </IconButton>
                    <p className="ctr_order__info__ctr_title">Pedido</p>
                  </div>
                  {!isLoading && (
                    <div className="buttons">
                      <DataOrderPdf infoOrders={infoOrders} productsCotization={productsCotization} />
                      {infoOrders?.isverified !== true && (
                        <Button
                          variant="contained"
                          className="button_Verified"
                          onClick={() => handleClickVerify(infoOrders)}
                        >
                          Verificar Pedido
                        </Button>
                      )}
                      {infoOrders?.isverified !== false && (
                        <Button
                          variant="contained"
                          className="button_RemoveVerified"
                          onClick={() => handleClickRemoveVerified(infoOrders)}
                        >
                          Remover de Verificados
                        </Button>
                      )}
                    </div>
                  )}
                </div>

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

                    <Grid item xs={6} md={4}>
                      <p className="label">Cuenta de Pago</p>
                      {thereIsData(infoOrders?.paymentaccount?.name)}
                    </Grid>

                    <Grid item xs={6} md={6}>
                      <p className="label">Observaciones Generales</p>
                      {thereIsData(infoOrders?.observations)}
                    </Grid>

                    <Grid item xs={12} md={12}>
                      <InfomationShippings infoOrders={infoOrders} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
                        <p className="label">Productos de Envio</p>
                      </motion.div>
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <TableLimenka
                        data={productsShippings}
                        activeCheck
                        primaryColor="#776ceb"
                        secondaryColor="#dce1f6"
                        heads={["codigo", "producto", "monto", "cantidad", "fase de producto"]}
                        id="tableProductsShipping"
                        isFetching={isFetching}
                        showActions
                        showGeneralActions
                        actions={[
                          {
                            title: "Editar Fase",
                            action: e => handleClickEditOrders(e),
                            icon: <Edit />,
                          },
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <div className="divider" />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <InfoBill infoOrders={infoOrders} />
                    </Grid>
                    <Grid item xs={12} md={12}>
                      <Box component="span" m={2}></Box>
                      <div className="divider" />
                    </Grid>

                    <Grid item xs={12}>
                      {/* <FilesOrdersAdmin idOrder={routerOrderId}></FilesOrdersAdmin> */}
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
              </>
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

        <ModifiPhaseProduct
          open={openPhaseProduct}
          dataShipping={dataProducts}
          close={closeModalPhaseProduct}
          setRefetchShipping={setRefetch}
          refetchShipping={refetch}
        />
        <VerifyOrder
          isRoleShopping={false}
          open={openVerify}
          ordersVerify={ordersVerify}
          close={closeModalVerify}
          refetch={flag}
          setRefetch={setFlag}
          toggleVerify={toggleOpenVerify}
        />
        <RemoveVerifyOrder
          open={openRemoveVerify}
          ordersVerify={ordersVerify}
          close={closeRemoveVerify}
          refetch={flag}
          setRefetch={setFlag}
          toggleVerify={toggleRemoveVerify}
        />
      </PedidosStyled>
    </MainLayout>
  );
}
