import React, { useEffect, useState, useRef } from "react";
import { IconButton, CircularProgress, Tooltip, Grid, Button, Link } from "@material-ui/core";
import {
  Close,
  CachedOutlined,
  NavigateBefore,
  NavigateNext,
  ExitToApp,
  TextFields,
  PictureAsPdf,
  Image,
  InsertDriveFile,
  Functions,
  Assignment,
} from "@material-ui/icons";
import { useSelector, useDispatch } from "react-redux";
import { ordersSelector, getOrders } from "../../redux/slices/orders";
import { getCountOrders } from "../../redux/slices/dashboardSlice";
import Router, { useRouter } from "next/router";
import { saveAs } from "file-saver";
import DataOrder from "../DataOrder";
import { DrawerStyle, Main } from "./styles";
import { validateURL } from "../../utils";
import { api } from "../../services/api";

export default function DrawerOrdersVerifiedLogistic({ drawerShowOrders, setDrawerShowOrders, ...props }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { ordersresults, totalOrders, isFetching } = useSelector(ordersSelector);
  const [refetch, setRefetch] = useState(false);
  const [orderBy, setOrderBy] = useState("createdAt");
  const [ASC, setASC] = useState("");
  const [limitOrders, setLimitOrders] = useState(3);
  const [page, setPage] = useState(1);
  const mainTop = useRef();
  const [viewMore, setViewMore] = useState(false);
  const [viewMoreDocs, setViewMoreDocs] = useState(false);

  useEffect(() => {
    getData();
  }, [refetch, page, ASC, orderBy]);

  const getData = () => {
    let query = {
      isverified: true,
    };
    let params = {
      where: JSON.stringify(query),
      include:
        "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address,address.entity.city.postal,createdbyid,createdbyid.group,paymentaccount,docs,bill,bill.cfdi,bill.paymentmethod,bill.paymentway,bill.address,bill.taxregime",
      count: 1,
      limit: limitOrders,
      order: `${ASC}${orderBy}`,
      skip: page,
      subquery: 1,
      join: "oportunity,oportunity.soldby,oportunity.productsoportunities,orderstatus,address,address,address.entity.city.postal,createdbyid,createdbyid.group,p,d,bil,bill.cf,bill.p,bill.pw,bill.a,bill.tax",
    };
    dispatch(getOrders({ params }));
    dispatch(getCountOrders());
  };

  const drawerClose = () => {
    setDrawerShowOrders(false);
  };
  const iconReload = () => {
    setRefetch(!refetch);
  };

  const iconTypeFile = file => {
    let typeFile = file.url?.split(".").pop();
    switch (typeFile) {
      case "pdf":
        return <PictureAsPdf className="pdf" />;
      case "docx":
        return <TextFields className="word" />;
      case "xlsx":
        return <Functions className="xlsx" />;
      case "jpeg":
        return <Image className="image" />;
      case "jpg":
        return <Image className="image" />;
      case "png":
        return <Image className="image" />;
      default:
        return <InsertDriveFile className="default" />;
    }
  };

  const openFile = async item => {
    try {
      let typeFile = item.url.split(".").pop();
      let responseURLSave = await api.post(
        "convert/pdfbuffer",
        {
          pdfurl: validateURL(item?.url),
        },
        {
          responseType: "blob",
        }
      );
      const pdfBlob = new Blob([responseURLSave.data], {
        type: `application/${typeFile};charset=utf-8`,
      });
      saveAs(pdfBlob, `${item.name}.${typeFile}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickOrders = item => {
    router.push({
      pathname: "/logistica/pedidos/pedido",
      query: { pe: item.id, pr: item?.oportunity?.prospectId, op: item?.oportunity?.id },
    });
  };

  const thereIsData = data => {
    if (data) {
      return data;
    } else {
      return "N/A";
    }
  };

  return (
    <DrawerStyle onClose={drawerClose} open={drawerShowOrders} anchor="right">
      <Main>
        <p ref={mainTop}></p>
        <div className="drawer_header">
          <div className="title">
            <Tooltip title="Recargar Información">
              <CachedOutlined className="title__iconReload" onClick={() => iconReload()} />
            </Tooltip>
          </div>
          <div className="title">
            <p className="title__Subtitle">Pedidos</p>
            <Tooltip title="Total de Pedidos Verificados.">
              <span className="title__Subtitle__total">{totalOrders}</span>
            </Tooltip>
          </div>
          <Tooltip title="Cerrar">
            <IconButton className="button" onClick={() => setDrawerShowOrders(false)}>
              <Close className="icon" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="contenido">
          {isFetching == true ? (
            <div className="contenido__loader">
              <CircularProgress />
              <p>Cargando</p>
            </div>
          ) : ordersresults.length == 0 ? (
            <div className="contenido__empty">
              <img src="/empty_table.svg" className="contenido__empty__image" />
              <p className="contenido__empty__title">Sin resultados</p>
            </div>
          ) : (
            <>
              <div className="drawer_filters__selectsOrder">
                <DataOrder
                  falling={ASC}
                  setFalling={setASC}
                  order={orderBy}
                  setOrder={setOrderBy}
                  addOptions={[
                    { label: "Fecha Creación ", value: "createdAt" },
                    { label: "Fecha Actualización", value: "updatedAt" },
                  ]}
                  addOptionsOrderBy={[
                    { label: "Descendente", value: "-" },
                    { label: "Ascendente ", value: "" },
                  ]}
                />
              </div>
              {ordersresults?.map((item, index) => (
                <div className="contenido__item" key={index}>
                  <Grid container className="contenido__header">
                    <Grid item md={10} sm={10} xs={10} className="info">
                      <Assignment className="info__icon" />
                      <Tooltip title="Ver pedido">
                        <p className="info__title" onClick={() => handleClickOrders(item)}>
                          Pedido:{item.folio}
                        </p>
                      </Tooltip>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="info">
                      <p className="info__titles">Datos Pedido:</p>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} style={{ display: "flex" }}>
                      <p className="info__subject">
                        <span>Estado de Pedido:</span> {thereIsData(item?.orderstatus?.name)}
                      </p>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <p className="info__subject">
                        <span>Cuenta de Pago:</span> {thereIsData(item?.paymentaccount?.name)}
                      </p>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <p className="info__subject">
                        <span>Observaciones Generales:</span> {thereIsData(item?.observations)}
                      </p>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="info">
                      <p className="info__titles">Datos dirección envio:</p>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                      <p className="info__subject">
                        <span>Recibe:</span> {thereIsData(item.receive)}
                      </p>
                      <p className="info__subject">
                        <span>Telefono:</span> {thereIsData(item.phone)}
                      </p>
                      <p className="info__subject">
                        <span> Dirección:</span>
                        Calle: {thereIsData(item?.address?.street)}, #Exterior: {thereIsData(item?.address?.ext_number)}
                        , #Interior: {thereIsData(item?.address?.int_number)}, Municipio:{" "}
                        {thereIsData(item?.address?.city?.name)}, Estado: {thereIsData(item?.address?.entity?.name)},
                        CP: {thereIsData(item?.address?.postal?.postal_code)}
                      </p>
                      <p></p>
                      <p className="info__subject">
                        <span>Referencias:</span> {thereIsData(item?.address?.references)}
                      </p>
                    </Grid>

                    <Grid item md={12} sm={12} xs={12} className="info">
                      <p className="info__titles">Datos Facturación:</p>
                    </Grid>
                    <Grid item md={12}>
                      <p className="info__subject">{item?.billing ? "Con Factura" : "Sin Factura"}.</p>
                    </Grid>
                    {viewMore && item.billing == true ? (
                      <>
                        <Grid item md={6}>
                          <p className="info__subject">
                            <span>Razón social:</span>
                            {thereIsData(item?.bill?.businessname)}
                          </p>

                          <p className="info__subject">
                            <span>CFDI:</span> {thereIsData(item?.bill?.cfdi?.name)}
                          </p>
                          <p className="info__subject">
                            <span>Forma de pago :</span>
                            {thereIsData(item?.bill?.paymentway?.name)}
                          </p>
                          <p className="info__subject">
                            <span>Método de pago :</span>
                            {thereIsData(item.bill?.paymentmethod?.name)}
                          </p>
                          <p className="info__subject">
                            <span>Regimen Filscal :</span>
                            {thereIsData(item?.bill?.taxregime?.name)}
                          </p>
                        </Grid>
                        <Grid item md={6}>
                          <p className="info__subject">
                            <span>Rfc:</span> {thereIsData(item?.bill?.rfc)}
                          </p>
                          <p className="info__subject">
                            <span>Teléfono:</span> {thereIsData(item.bill?.phone)}
                          </p>

                          <p className="info__subject">
                            <span>Colonia:</span>
                            {thereIsData(item.bill?.address?.settlement)}
                          </p>
                          <p className="info__subject">
                            <span>Codigo Postal:</span>
                            {thereIsData(item?.bill?.address?.postal?.postal_code)}
                          </p>
                          <p className="info__subject">
                            <span>Estado:</span>
                            {thereIsData(item.bill?.address?.entity?.name)}.
                          </p>
                          <p className="info__subject">
                            <span>Municipio:</span>
                            {thereIsData(item.address?.city?.name)}.
                          </p>
                        </Grid>
                        <Grid item xs={12}>
                          <Link className="info__link" onClick={() => setViewMore(false)}>
                            Ver menos
                          </Link>
                        </Grid>
                      </>
                    ) : (
                      item?.billing == true && (
                        <Grid item xs={12}>
                          <Link className="info__link" onClick={() => setViewMore(true)}>
                            Ver más información
                          </Link>
                        </Grid>
                      )
                    )}

                    <Grid item md={12} sm={12} xs={12} className="info">
                      <p className="info__titles">Archivos:</p>
                    </Grid>

                    {item?.docs?.length >= 1 ? (
                      viewMoreDocs == true ? (
                        <>
                          <div className="containerDocs">
                            {item?.docs.map((item, index) => (
                              <Grid key={index} item xs={3} sm={3} md={3} className={`info__containerFiles__item`}>
                                {iconTypeFile(item)}
                                <Tooltip title={"Descargar" + " " + item.name} arrow>
                                  <p className="itemTitleFile" onClick={() => openFile(item)}>
                                    {item.name}
                                  </p>
                                </Tooltip>
                              </Grid>
                            ))}
                          </div>
                          <Grid item md={12} sm={12} xs={12}>
                            <p className="info__linkDocs" onClick={() => setViewMoreDocs(false)}>
                              Ocultar Archivos
                            </p>
                          </Grid>
                        </>
                      ) : (
                        <Grid item md={12} sm={12} xs={12}>
                          <p className="info__linkDocs" onClick={() => setViewMoreDocs(true)}>
                            Ver Archivos
                          </p>
                        </Grid>
                      )
                    ) : (
                      <p className="info__subject">Sin Archivos</p>
                    )}

                    <Grid item md={12} sm={12} xs={12} className="info">
                      <p className="info__titles">Datos Ejecutivo:</p>
                    </Grid>
                    <Grid item md={6} xs={6} sm={6} className="subject">
                      <p className="info__subject">
                        <span>Nombre:</span> {thereIsData(item.oportunity?.soldby?.fullname)}.
                      </p>
                    </Grid>

                    <Grid item md={6} xs={6} sm={6} className="subject">
                      <p className="info__subject">
                        <span>Grupo:</span>
                        {thereIsData(item.createdbyid?.group?.name)}.
                      </p>
                    </Grid>
                    <Grid item md={12} xs={12} sm={12} className="subject">
                      <p className="info__subject">
                        <span>Correo:</span>
                        {thereIsData(item.oportunity?.soldby?.email)}.
                      </p>
                    </Grid>
                  </Grid>
                </div>
              ))}
              <div className="contenido__pagination">
                <IconButton
                  color="primary"
                  disabled={page <= 1 ? true : false}
                  className="contenido__pagination__buttonBefore"
                  onClick={() => setPage(page - 1)}
                >
                  <NavigateBefore className="contenido__pagination__buttonBefore__icon" />
                </IconButton>
                <IconButton
                  color="primary"
                  disabled={page >= Math.ceil(totalOrders / limitOrders) ? true : false}
                  className="contenido__pagination__buttonNext"
                  onClick={() => setPage(page + 1)}
                >
                  <NavigateNext className="contenido__pagination__buttonNext__icon" />
                </IconButton>
              </div>
            </>
          )}
        </div>
      </Main>
      <div className="drawer_footer">
        <Button
          className="drawer_footer__button"
          onClick={() =>
            router.push({
              pathname: "/logistica/pedidos",
            })
          }
        >
          Ver Todos los Pedidos
          <ExitToApp className="drawer_footer__button__icon" />
        </Button>
      </div>
    </DrawerStyle>
  );
}
