import { Button, Grid, LinearProgress, Tooltip } from "@material-ui/core";
import { AttachMoney, Edit, Money, PersonOutlineOutlined } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import NavBarDashboard from "../../components/NavBarDashboard";
import TableTracing from "../../components/TableTracing";
import TableSlopes from "../../components/TableSlopes";
import { useRouter } from "next/router";
import { api } from "../../services/api";
import SideBar from "../../components/SideBar";
import dayjs from "dayjs";
import { months } from "../../BD/databd";
import DrawerEditProspect from "../../components/EditProspect";
import AlertGlobal from "../../components/Alerts/AlertGlobal";
import TableQuotes from "../../components/TableQuotes";
import { OportunityStyled } from "../../styles/Oportunidades/oportunidad.styles";
import { formatDate } from "../../utils";
import NumberFormat from "react-number-format";
import { normalizeProductToQuote } from "../../utils/normalizeData";
import { motion } from "framer-motion";
import LoaderData from "../../components/LoaderData";
import DrawerEditOportunity from "../../components/DrawerEditOportunity";
import { dialogSelector } from "../../redux/slices/dialogSlice";
import { useSelector } from "react-redux";
import { makeTemplate } from "../../templates/makeTemplate";
import axios from "axios";
import { userSelector } from "../../redux/slices/userSlice";

const Oportunidad = () => {
  const { openMenuSide } = useSelector(dialogSelector);
  const { userData } = useSelector(userSelector);
  const router = useRouter();
  const [prospect, setProspect] = useState({});
  const [oportunity, setOportunity] = useState({});
  const [quote, setQuote] = useState({});
  const [productsOfQuote, setProductsOfQuote] = useState([]);
  const [isLoading, setIsLoading] = useState([]);
  const [flag, setFlag] = useState(false);
  const [prospectEdit, setprospectEdit] = useState({});
  const [openEdit, setOpenEdit] = useState(false);
  const [Alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [isCreatingPdf, setIsCreatingPdf] = useState(false);
  const [showDataProspect, setShowDataProspect] = useState(false);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getDataInitial();
    }
    return () => (mounted = false);
  }, [flag]);

  const getDataInitial = async () => {
    let param = router.query.oportunidad;
    try {
      setIsLoading(true);
      let responseOportunity = await api.get(`oportunities/${param}?include=phase`);
      let { prospectId } = responseOportunity.data;
      setOportunity(responseOportunity.data);
      if (responseOportunity.status !== 200) return setIsLoading(false);

      let responseProspect = await api.get(`prospects/${prospectId}?include=city,entity,phase,origin,clientcompany,clienttype,specialty,postal`);
      setProspect(responseProspect.data);
      let query = {};
      query.oportunityId = param;
      let resQuotes = await api.get(`quotes?where=${JSON.stringify(query)}`);
      let { productsquotes } = resQuotes.data.results[0];
      let newProducts = productsquotes.map((item, index) => normalizeProductToQuote(item));
      setProductsOfQuote(newProducts);
      setIsLoading(false);
    } catch (error) {
      console.log(error);

      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setprospectEdit(prospect);
    setOpenEdit(!openEdit);
  };

  const navigateToClient = (oportunityParam) => {
    router.push({
      pathname: `/clientes/[cliente]/`,
      query: { cliente: oportunityParam.id },
    });
  };

  const generarPdf = () => {
    setIsCreatingPdf(true);
    let data = {
      prospect: {
        name: prospect?.name,
        lastname: prospect?.lastname,
        entity: prospect?.entity?.name,
      },
      products: productsOfQuote,
      total: oportunity?.amount,
      ejecutive: {
        name: userData?.name,
        lastname: userData?.lastname,
        email: userData?.email,
      },
      footer: {
        showIn: "pageFooter-last",
        data: `*Precio sujeto a cambio sin previo aviso *Las existencias de los equipos son salvo venta, una vez confirmado el pedido no se aceptan cambios o devoluciones, *En caso de cancelación
        solicitarse por escrito y enviarse por correo a su ejecutivo de ventas, se cobrará el 30% del monto total de la compra y el reembolso se realiza 30 días hábiles posteriores a la
        cancelación. *Cualquier pago deberá ser notificado a su ejecutivo de ventas, es indispensable enviar el comprobante de pago para tramitar el pedido de los equipos solicitados. *Cuando
        el equipo sea enviado por paqueteria, NO FIRMAR DE RECIBIDO sin antes haber revisado que el equipo este en perfectas condiciones. *Precios en USD O EURO A M.N. en el momento de la
        compra al tipo de cambio de BBVA BANCOMER a la venta. Los números de guia se daran despues del tercer dia.`,
      },
    };

    console.log(prospect);
    console.log(userData);
    console.log(data);

    let response = makeTemplate(1, data);

    const form = new FormData();
    form.append("name", "cotizacion");
    form.append("data", response);
    form.append("company", "companyprueba");
    form.append("group", "mio");
    form.append("ejecutive", "01");

    const options = {
      method: "POST",
      url: "https://apipg.cvjobs.com.mx/convert/pdf",
      headers: {
        "Content-Type": "multipart/form-data; boundary=---011000010111000001101001",
        Authorization:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyZGVmQkhTM3lVWXdpY3Y1TlZLWGpGeiIsInJvbGUiOiI2MmQ0N2VjUnU0ak1EZFBRbGpMZ3RJSDQiLCJncm91cCI6IjYyZGpxdG1iWHhocXg3MGtzTXBzcEoyMiIsImNvbXBhbnkiOiI2MmR6M3FuaW1UcXpmUGZLcHQ3SnRPdEUiLCJpYXQiOjE2NjEzNTc2NzYsImV4cCI6MTY5NTQ4NTY3Nn0.cJN37qG5cYFxgo8K8FbErI4os8VCyGAQnKOd1yYq7yY",
      },
      data: form,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);

        window.open(response.data.url, "_blank");
      })
      .catch(function (error) {
        console.error(error);
      })
      .finally(() => setIsCreatingPdf(false));
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <OportunityStyled isOpen={openMenuSide}>
      <SideBar />
      <NavBarDashboard sideBar={true} />
      <div className="main">
        <div className="ctr_oportunity">
          <p className="ctr_oportunity__title">Oportunidad</p>
          {isLoading && <LoaderData />}

          {!isLoading && (
            <div className="ctr_oportunity__info">
              <div className="ctr_oportunity__info__ctr_title">
                <div className="ctr_oportunity__info__ctr_title__title">
                  <AttachMoney />
                  <p>Datos de la oportunidad</p>
                </div>
                <Tooltip title="Editar oportunidad">
                  <Edit className="ctr_oportunity__info__ctr_title__edit" onClick={() => handleEdit()} />
                </Tooltip>
              </div>
              <Grid container spacing={2} className="ctr_oportunity__info__data">
                <Grid item xs={12} md={4}>
                  <p className="label">Folio</p>
                  <p className="paragraph capitalize folio">{`${oportunity?.concept}`}</p>
                </Grid>

                <Grid item xs={12} md={3}>
                  <p className="label">Numero de productos</p>
                  <p className="paragraph capitalize">{`${oportunity?.quantity}`}</p>
                </Grid>

                <Grid item xs={12} md={3}>
                  <p className="label">Monto Montal</p>
                  <NumberFormat thousandSeparator={true} prefix={"$"} displayType={"text"} className="paragraph capitalize" value={oportunity?.amount} />
                </Grid>

                <Grid item xs={12} md={2}>
                  <p className="label">Comision</p>
                  <NumberFormat thousandSeparator={true} prefix={"$"} displayType={"text"} className="paragraph capitalize" value={oportunity?.comission} />
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Fecha de creación</p>
                  <p className="paragraph">{formatDate(oportunity?.createdAt)}</p>
                </Grid>
                <Grid item xs={12} md={3}>
                  <p className="label">Ultima actualización</p>
                  <p className="paragraph">{formatDate(oportunity?.updatedAt)}</p>
                </Grid>
                <Grid item xs={12}>
                  <div className="oportunity">
                    <Button variant="contained" color="primary" onClick={() => generarPdf()}>
                      <AttachMoney />
                      <p>Generar PDF</p>
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => setShowDataProspect(!showDataProspect)}>
                      <AttachMoney />
                      {!showDataProspect ? <p>Ver datos de prospecto</p> : <p>Ocultar datos de prospecto</p>}
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => navigateToClient(oportunity)}>
                      <AttachMoney />
                      <p>Convertir a Venta</p>
                    </Button>
                  </div>
                </Grid>
              </Grid>

              {showDataProspect && (
                <motion.div initial={{ height: 0, scale: 0.5 }} animate={{ height: "auto", scale: 1 }} transition={{ duration: 0.5 }}>
                  <div className="ctr_oportunity__info__ctr_title">
                    <div className="ctr_oportunity__info__ctr_title__title">
                      <PersonOutlineOutlined />
                      <p>Datos del Prospecto</p>
                    </div>

                    <Edit className="ctr_oportunity__info__ctr_title__edit" onClick={() => handleEdit()} />
                  </div>
                  <Grid container spacing={2} className="ctr_oportunity__info__data">
                    <Grid item xs={12} md={4}>
                      <p className="label">Nombre</p>
                      <p className="paragraph capitalize">{`${prospect?.name} ${prospect?.lastname}`}</p>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <p className="label">Correo</p>
                      <p className="paragraph">{prospect?.email}</p>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label">Movil</p>
                      <p className="paragraph capitalize">{prospect?.phone}</p>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label">Teléfono</p>
                      {prospect?.optionalphone ? <p className="paragraph">{prospect?.optionalphone}</p> : <span>N/A</span>}
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <p className="label">Estado</p>
                      <p className="paragraph"> {prospect?.entity?.name}</p>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="label">Ciudad / Municipio</p>
                      {prospect?.city ? <p className="paragraph"> {prospect?.city?.name}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label ">Dirección</p>
                      {prospect?.street ? <p className="paragraph capitalize">{prospect?.street}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label ">Empresa</p>
                      {prospect?.clientcompany ? <p className="paragraph capitalize">{prospect?.clientcompany?.company}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="label">Origen</p>
                      {prospect?.origin ? <p className="paragraph capitalize">{prospect?.origin?.name}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="label">Fase</p>
                      {prospect?.phase ? <p className="paragraph capitalize">{prospect?.phase?.name}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label">Equipo de Interés</p>
                      {prospect?.product ? <p className="paragraph capitalize">{prospect?.product}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label">Tipo de Cliente</p>
                      {prospect?.clienttype ? <p className="paragraph capitalize">{prospect?.clienttype?.name}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="label">Genero</p>
                      {prospect?.gender ? <p className="paragraph capitalize">{prospect?.gender}</p> : <span>N/A</span>}
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <p className="label">Web</p>
                      {prospect?.url ? (
                        <p className="paragraph">
                          <a target={"_blank"} without rel="noreferrer" href={prospect?.url}>
                            {prospect?.url}
                          </a>
                        </p>
                      ) : (
                        <span>N/A</span>
                      )}
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label">Fecha de creación</p>
                      <p className="paragraph">{formatDate(prospect?.createdAt)}</p>
                    </Grid>
                    <Grid item xs={12} md={2}>
                      <p className="label">Ultima actualización</p>
                      <p className="paragraph">{formatDate(prospect?.updatedAt)}</p>
                    </Grid>
                    <Grid item xs={12}>
                      <p className="label">Observaciones</p>
                      {prospect?.product ? <p className="paragraph capitalize">{prospect?.observations}</p> : <span>N/A</span>}
                    </Grid>
                  </Grid>
                </motion.div>
              )}

              {/* <TableQuotes products={productsOfQuote} footer={true} prospect={prospect} handleAlert={handleAlert} setAlert={setAlert} setFlag={() => setFlag(!flag)} /> */}
              <div className="divider" />
              {/* <TableQuotes footer={true} prospect={prospect} handleAlert={handleAlert} setAlert={setAlert} setFlag={() => setFlag(!flag)} />
              <TableTracing footer={true} prospect={prospect} handleAlert={handleAlert} setAlert={setAlert} setFlag={() => setFlag(!flag)} />
              <div className="divider" />
              <TableSlopes footer={true} prospect={prospect} handleAlert={handleAlert} setAlert={setAlert} setFlag={() => setFlag(!flag)} /> */}
            </div>
          )}
        </div>
      </div>
      <DrawerEditProspect openEdit={openEdit} setOpenEdit={setOpenEdit} prospectEdit={prospectEdit} setFlag={() => setFlag(!flag)} />

      <DrawerEditOportunity openEdit={openEdit} setOpenEdit={setOpenEdit} prospectEdit={prospectEdit} setFlag={() => setFlag(!flag)} />
      {Alert?.show && <AlertGlobal severity={Alert.severity} message={Alert.message} show={Alert.show} type={Alert.type} />}
    </OportunityStyled>
  );
};

export default Oportunidad;
