import { Button, Grid, LinearProgress } from "@material-ui/core";
import { FiberManualRecord, Today } from "@material-ui/icons";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useEffect } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { companySelector } from "../../redux/slices/companySlice";
import { userSelector } from "../../redux/slices/userSlice";
import { api } from "../../services/api";
import { formatDate, formatNumber } from "../../utils";
import ProspectData from "../ProspectData";
import FormWhatsapp from "../SendWhatsapp";
import { DrawerStyled } from "./styles";
import { setArrayProducts } from "../../redux/slices/quotesSlice";

export default function DrawerPreviewSale({ prospect, open, setOpen, oportunitySelect: oportunityData }) {
  const dispatch = useDispatch();
  //pagos
  const [payments, setPayments] = useState([]);
  const router = useRouter();
  //Pdf
  const { userData, roleId } = useSelector(userSelector);
  const [isCreatingPdf, setIsCreatingPdf] = useState(false);
  const [products, setProducts] = useState([]);
  const { photo, company } = useSelector(companySelector);
  const [load, setload] = useState(true);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [openWhats, setOpenWhats] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const opens = Boolean(anchorEl);

  const id = opens ? "simple-popover" : undefined;
  useEffect(() => {
    getPaymentsByOportunity();
    getQuotesByOportunity();
  }, [oportunityData]);
  //pagos
  const getPaymentsByOportunity = async () => {
    if (!oportunityData) return;
    setload(true);
    try {
      let query = {
        oportunityId: oportunityData.id,
      };
      const params = {
        count: "1",
        order: "date",
        where: JSON.stringify(query),
      };
      let paymentsResults = await api.get("salespayments", { params });
      let paymentsRes = paymentsResults.data?.results;
      setPayments(paymentsRes);
      setload(false);
    } catch (error) {
      console.log(error);
      setload(false);
    }
  };
  //pdf
  const getQuotesByOportunity = async () => {
    if (!oportunityData) return;
    try {
      let query = {
        oportunityId: oportunityData.id,
      };
      const params = {
        count: "1",
        where: JSON.stringify(query),
        include: "product,product.brand",
      };
      let quotes = await api.get("productsoportunities", { params });
      let products = quotes.data?.results;
      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  const generarPdf = () => {
    // setIsCreatingPdf(true);
    // console.log(oportunityData);
    // console.log(prospect);
    let normalizeProduct = products.map((item, index) => ({
      name: item.product.name,
      amount: item.product.callamount,
      quantity: item.quantity,
      code: item.product.code,
      iva: item.iva,
      total: item.total,
      brand: item?.product?.brand?.name,
    }));

    let data = {
      company: {
        name: company,
        photo: photo,
      },
      quoteInfo: {
        folio: oportunityData.concept,
        observations: oportunityData.observations,
        date: dayjs(oportunityData.createdAt).format("DD/MM/YYYY"),
      },
      prospect: {
        name: prospect?.name,
        lastname: prospect?.lastname,
        entity: prospect?.entity?.name,
        email: prospect?.email,
        phone: prospect?.phone,
      },
      products: normalizeProduct,
      total: oportunityData?.amount,
      ejecutive: {
        name: userData?.name,
        lastname: userData?.lastname,
        email: userData?.email,
        phone: userData?.phone,
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

    // console.log(prospect);
    // console.log(userData);
    // console.log(data);
    console.log(JSON.stringify(data));

    return;

    let response = makeTemplate(1, data);

    console.log(response);

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
  const handleClickOrder = () => {
    router.push({
      pathname: "/pedidos/nuevo",
      query: { o: oportunityData?.id, p: prospect?.id },
    });
    dispatch(setArrayProducts([]));
  };
  if (!oportunityData) return null;
  return (
    <DrawerStyled open={open} anchor="right" onClose={() => setOpen(!open)}>
      {load ? (
        <div className="ctr_load">
          <div className="ctr_load__img">
            <img src="/load.png" />
          </div>
          <div className="ctr_load__load">
            <p>Cargando</p>
            <LinearProgress color="primary" />
          </div>
        </div>
      ) : (
        <div className="drawer_container">
          <div className="drawer_container__top">
            <div className="drawer_container__top__title">
              <p>Venta</p>
            </div>
            {roleId !== "administrador_de_ventas" && (
              <div className="drawer_container__top__close">
                {oportunityData.isorder == false ? (
                  <Button
                    onClick={() => handleClickOrder()}
                    variant="contained"
                    color="primary"
                    className="btn_view"
                    style={{ marginRight: 12 }}
                  >
                    Realizar Pedido
                  </Button>
                ) : (
                  <Button className="OrderButtonDisabled" variant="contained" color="primary" size="small" disabled>
                    Realizar Pedido
                  </Button>
                )}
              </div>
            )}
          </div>
          <div className="divider" />
          <div className="drawer_container__data">
            <div className="ctr_targets">
              <div className="title">
                <p className="text">Datos de la Venta</p>
              </div>
              <Grid container spacing={2} className="ctr_information__data">
                <Grid item xs={12} md={4}>
                  <p className="label">Concepto</p>

                  <p className="paragraph capitalize">{oportunityData?.concept?.slice(0, 12)}</p>
                </Grid>
                <Grid item xs={12} md={4}>
                  <p className="label">Certeza</p>
                  <p className="paragraph">{oportunityData?.certainty}%</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Monto Total</p>
                  <p className="paragraph">{formatNumber(oportunityData?.amount)}</p>
                </Grid>

                <Grid item xs={12} md={8}>
                  <p className="label">Comisión Total</p>
                  <p className="paragraph">{formatNumber(oportunityData?.comission)}</p>
                </Grid>

                <Grid item xs={12} md={4}>
                  <p className="label">Fecha Venta</p>
                  <p className="paragraph">{formatDate(oportunityData?.soldat)}</p>
                </Grid>
              </Grid>
            </div>
            <div className="divider" />
            <div className="ctr_targets">
              <div className="title">
                <p className="text">Datos Cliente</p>
              </div>
              <ProspectData
                prospect={prospect}
                handleClick={handleClick}
                id={id}
                anchorEl={anchorEl}
                handleCloseMenu={handleCloseMenu}
                setOpenWhats={setOpenWhats}
                open={opens}
              />
            </div>

            <div className="divider" />

            <div className="ctr_targets">
              <div className="title">
                <p className="text">Productos</p>
              </div>

              <div className="ctr_grid">
                {products.slice(0, 6).map((item, index) => (
                  <div key={index} style={{ padding: 5 }}>
                    <div className="target_products">
                      <div className="top">
                        <div className="item">
                          <FiberManualRecord className="icon" />
                          <span className="span">Producto #{index + 1}:</span>
                        </div>
                      </div>
                      <span className="span">Nombre:</span>
                      <p> {item.product.name}</p>
                      <span className="span">Ultimo Precio:</span>
                      <p className="date">
                        <NumberFormat
                          value={item.newprice}
                          displayType="text"
                          thousandSeparator=","
                          prefix="$"
                          className="info"
                        />
                      </p>

                      <span className="span">Cantidad:</span>
                      <p className="date">
                        <NumberFormat value={item.quantity} displayType="text" thousandSeparator="," className="info" />
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="divider" />
            <div className="drawer_container__products">
              <div className="drawer_container__products__top">
                <div className="drawer_container__products__top__title">
                  <p>Pagos</p>
                </div>
              </div>
              <div className="drawer_container__products__containercards">
                {payments.map((item, index) => {
                  return (
                    <div key={index} className="drawer_container__products__containercards__card">
                      <div className="top">
                        <div className="item">
                          <FiberManualRecord className="iconStatus" />
                          <p className="date capitalize">Pago: {index + 1}</p>
                        </div>
                        <div className="item">
                          <Today className="icon" />
                          <p className="date">Fecha Pago: {formatDate(item.date)}</p>
                        </div>
                      </div>
                      <div className="itemPayment">
                        <span className="span">Estado Pago: </span>{" "}
                        {item.ispaid === true ? (
                          <p className="paymentTrue"> Pagado</p>
                        ) : (
                          <p className="paymentFalse"> Pendiente</p>
                        )}
                      </div>
                      <p className="code">Monto: {formatNumber(item.payment)}</p>
                      <p className="code">Comisión: {formatNumber(item.comission)}</p>
                      <p className="code">Observaciones: {item.observations.slice(0, 80)}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <FormWhatsapp
              idOportunity={oportunityData.id}
              isOportunity={true}
              openWhats={openWhats}
              setOpenWhats={setOpenWhats}
              prospect={prospect}
              handleCloseMenu={handleCloseMenu}
            />
          </div>
        </div>
      )}
    </DrawerStyled>
  );
}
