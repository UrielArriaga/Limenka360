import { Grid, IconButton, Button, Paper, Tooltip, CircularProgress } from "@material-ui/core";
import { AttachMoney, Cached, Close, DeleteForever } from "@material-ui/icons";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { DiscountStyled, ItemDiscount, AlertStyle } from "./style";
import { useSelector } from "react-redux";
import { userSelector } from "../../../redux/slices/userSlice";
import { ACTIONIDPRODUCTIONMODE, api, PHASEIDPRODUCTIONMODE } from "../../../services/api";
import { Alert } from "@material-ui/lab";
export default function DiscountPermission(data) {
  const { open, close, dataDiscount, isDiscountAccept, setIsDiscountAccept, prospect, oportunity } = data;
  const { id_user } = useSelector(userSelector);
  const [alert, setAlert] = useState({ severity: null, show: null, message: "", type: null });
  const [discounts, setDataDiscounts] = useState([]);
  const [discount, setDiscount] = useState({});
  const [idDiscount, setIdDiscount] = useState("");
  const [isHaveDiscount, setIsHaveDiscount] = useState(false);
  const [isResendDiscount, setIsResendDiscount] = useState(false);
  const [refetchDiscounts, setRefetchDiscounts] = useState(false);
  const [isLoader, setIsLoader] = useState(false);
  const [firstRefetch, setFirstRefetch] = useState(false);
  useEffect(() => {
    if (open) {
      validateDiscountSend();
    }
  }, [discounts, open, refetchDiscounts]);

  useEffect(() => {
    if (open && firstRefetch === false) {
      setFirstRefetch(true);
    }
  }, [open]);

  useEffect(() => {
    getDiscountsEjecutive();
  }, [refetchDiscounts, prospect, firstRefetch]);

  const getDiscountsEjecutive = async () => {
    setIsLoader(true);
    try {
      let query = {
        ejecutiveId: id_user,
        concept: dataDiscount.concept,
      };

      let params = {
        where: JSON.stringify(query),
        include: `prospect,ejecutive,deniedBy,approvedBy`,
        order: "-createdAt",
        all: "1",
      };
      let discounts = await api.get(`ejecutivediscounts`, { params });
      setIsLoader(false);
      setDataDiscounts(discounts.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const validateRequest = (approved, denied, dateUpdated) => {
    if (dateUpdated) {
      if (approved === false && denied === false) {
        return " A Espera de Respuesta";
      } else {
        return dayjs(dateUpdated).format(" DD MMMM YYYY - HH:mm A");
      }
    } else {
      if (approved === false && denied === false) {
        return <p className="status pending">Pendiente</p>;
      }
    }
  };

  const sendRequest = async () => {
    try {
      let bodyDiscount = {
        approved: false,
        denied: false,
        concept: dataDiscount.concept,
        prospectId: dataDiscount.prospectId,
        ejecutiveId: id_user,
        total: dataDiscount.total,
        subtotal: dataDiscount.subtotal,
        ivatotal: dataDiscount.ivatotal,
        totalextracosts: dataDiscount.totalextracosts,
        discount: dataDiscount.discount,
        dispercentage: dataDiscount.dispercentage,
        comission: dataDiscount.comission,
        compercentage: dataDiscount.porcentComission,
      };
      handleAlert("success", `Descuento Solicitado!`, "basic");
      let response = await api.post(`ejecutivediscounts`, bodyDiscount);
      createTrackingDiscount();
      setRefetchDiscounts(!refetchDiscounts);
    } catch (error) {
      handleAlert("error", `Error al Generar la Solicitud!`, "basic");
      console.log(error);
    }
  };

  const updateRequestDiscount = async () => {
    try {
      let body = {
        approved: false,
        denied: false,
        approvedbyId: null,
        deniedbyId: null,
        total: dataDiscount.total,
        subtotal: dataDiscount.subtotal,
        ivatotal: dataDiscount.ivatotal,
        totalextracosts: dataDiscount.totalextracosts,
        discount: dataDiscount.discount,
        dispercentage: dataDiscount.dispercentage,
        comission: dataDiscount.comission,
        compercentage: dataDiscount.porcentComission,
      };
      let response = await api.put(`ejecutivediscounts/${idDiscount}`, body);
      createTrackingDiscount();
      setRefetchDiscounts(!refetchDiscounts);
    } catch (error) {
      console.log(error);
    }
  };

  const createTrackingDiscount = async () => {
    try {
      let bodyNewTracking = {
        prospectId: prospect.id,
        status: "2",
        actionId: ACTIONIDPRODUCTIONMODE,
        oportunityId: oportunity.id,
        reason: `Seguimiento Automático - Solicitud de Descuento ${discount.concept}`,
        observations: `Se Solicita un Descuento del %${discount.dispercentage}, el dia ${dayjs().format(
          "DD MMMM YYYY - HH:mm A"
        )}`,
        createdbyId: id_user,
        phaseId: PHASEIDPRODUCTIONMODE,
      };
      let response = await api.post(`trackings`, bodyNewTracking);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteRequest = async () => {
    try {
      let response = await api.delete(`ejecutivediscounts/${discount.id}`);
      handleAlert("success", `Solicitud Eliminada!`, "basic");
      setRefetchDiscounts(!refetchDiscounts);
    } catch (error) {
      handleAlert("success", `Error al Eliminar la Solicitud`, "basic");
      console.log(error);
    }
  };

  const validateDiscountSend = () => {
    let findDiscount = discounts.filter(item => item.concept === dataDiscount.concept);
    if (findDiscount.length >= 1) {
      let discount = findDiscount[0];
      setIdDiscount(discount.id);
      if (discount.approved === false && discount.denied === false) {
        setDiscount(discount);
        setIsResendDiscount(false);
      } else {
        setDiscount(dataDiscount);
        setIsResendDiscount(true);
      }
      validateStatusRequest(discount);
      setIsHaveDiscount(true);
    } else {
      setIdDiscount("");
      setIsResendDiscount(false);
      setDiscount(dataDiscount);
      setIsHaveDiscount(false);
    }
  };

  const validateStatusRequest = discount => {
    if (discount.approved === true && discount.denied === false) {
      setIsDiscountAccept(true);
    } else {
      setIsDiscountAccept(false);
    }
  };

  const handleAlert = (severity, message, type) => {
    setAlert({ severity: severity, show: true, message: message, type: type });
    setTimeout(() => {
      setAlert({ severity: severity, show: false, message: message, type: null });
    }, 3000);
  };

  return (
    <DiscountStyled open={open} onClose={close} anchor="right">
      <div className="container">
        <div className="container__header">
          <p className="title">Permisos de Descuentos del Prospecto</p>
          <IconButton className="buttonIcon" onClick={close}>
            <Close className="buttonIcon__icon" />
          </IconButton>
        </div>
        <div className="container__body">
          <div className="buttons_header">
            <Tooltip title="Recargar Datos" arrow={true}>
              <IconButton className="button_reload" onClick={() => setRefetchDiscounts(!refetchDiscounts)}>
                <Cached className="icon" />
              </IconButton>
            </Tooltip>
          </div>
          <Grid container className="info_discount" spacing={1}>
            <Grid item md={6} sm={6} xs={12} className="item">
              <p className="title">Concepto</p>
              <p className="data">{discount.concept}</p>
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="item">
              <p className="title">IVA</p>
              <NumberFormat
                className="data"
                value={discount.ivatotal}
                thousandSeparator={true}
                prefix="$"
                displayType="text"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="item">
              <p className="title">Descuento</p>
              <NumberFormat
                className="data"
                value={discount.dispercentage}
                thousandSeparator={true}
                prefix="%"
                displayType="text"
              />{" "}
              -
              <NumberFormat
                className="data"
                value={discount.discount}
                thousandSeparator={true}
                prefix=" $"
                displayType="text"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="item">
              <p className="title">Comisión</p>
              <NumberFormat
                className="data"
                value={discount.comission}
                thousandSeparator={true}
                prefix="$"
                displayType="text"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="item">
              <p className="title">Total</p>
              <NumberFormat
                className="data"
                value={discount.total}
                thousandSeparator={true}
                prefix="$"
                displayType="text"
              />
            </Grid>
            <Grid item md={6} sm={6} xs={12} className="item">
              <p className="title">Subtotal</p>
              <NumberFormat
                className="data"
                value={discount.subtotal}
                thousandSeparator={true}
                prefix="$"
                displayType="text"
              />
            </Grid>
          </Grid>
          <div className="buttons">
            {isResendDiscount ? (
              <Button className="request_button resend" onClick={() => updateRequestDiscount()}>
                Reenviar Descuento
              </Button>
            ) : (
              <Button
                className={`request_button ${isHaveDiscount ? "delete" : "send"}`}
                startIcon={isHaveDiscount ? <DeleteForever /> : <AttachMoney />}
                onClick={() => (isHaveDiscount ? deleteRequest() : sendRequest())}
              >
                {isHaveDiscount ? "Eliminar Solicitud" : "Solicitar Descuento"}
              </Button>
            )}
          </div>
          <div className="data_discounts">
            {isLoader ? (
              <div className="loader">
                <CircularProgress />
              </div>
            ) : (
              <>
                {discounts.length <= 0 && (
                  <div className="empty">
                    <img src="/empty_table.svg" className="empty__image" />
                    <p className="empty__title">Sin resultados</p>
                  </div>
                )}
                {discounts.map((item, index) => (
                  <ItemDiscount key={index} elevation={2} onClick={() => console.log(item)}>
                    <div className="header">
                      <p className="title">
                        Concepto: <span className="data">{item.concept}</span>
                      </p>
                      {validateRequest(item.approved, item.denied)}
                      {item.approved && <p className="status approved">Aprobada</p>}
                      {item.denied && <p className="status denied">Rechazada</p>}
                    </div>
                    <div className="body">
                      <div className="discount_information">
                        <p className="title">Datos del Descuento</p>
                        <Grid container spacing={1}>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">IVA</p>
                            <NumberFormat
                              className="data"
                              value={item.ivatotal}
                              thousandSeparator={true}
                              prefix="$"
                              displayType="text"
                            />
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">Descuento</p>
                            <NumberFormat
                              className="data"
                              value={item.dispercentage}
                              thousandSeparator={true}
                              prefix="%"
                              displayType="text"
                            />{" "}
                            -
                            <NumberFormat
                              className="data"
                              value={item.discount}
                              thousandSeparator={true}
                              prefix=" $"
                              displayType="text"
                            />
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">Comisión</p>
                            <NumberFormat
                              className="data"
                              value={item.comission}
                              thousandSeparator={true}
                              prefix="$"
                              displayType="text"
                            />
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">Total</p>
                            <NumberFormat
                              className="data"
                              value={item.total}
                              thousandSeparator={true}
                              prefix="$"
                              displayType="text"
                            />
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">Subtotal</p>
                            <NumberFormat
                              className="data"
                              value={item.subtotal}
                              thousandSeparator={true}
                              prefix="$"
                              displayType="text"
                            />
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">Fecha de Solicitud</p>
                            <p className="date">{dayjs(item.createdAt).format(" DD MMMM YYYY - HH:mm A")}</p>
                          </Grid>
                          <Grid item md={6} sm={6} xs={12}>
                            <p className="title">Fecha de Respuesta</p>
                            <p className="date">{validateRequest(item.approved, item.denied, item.updatedAt)}</p>
                          </Grid>
                        </Grid>
                      </div>
                    </div>
                    <div className="footer"></div>
                  </ItemDiscount>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="container__footer"></div>
      </div>
      {alert?.show && (
        <AlertStyle>
          <Alert severity={alert.severity} show={alert.show.toString()} type={alert.type}>
            {alert.message}
          </Alert>
        </AlertStyle>
      )}
    </DiscountStyled>
  );
}
