import React, { useEffect, useState } from "react";
import {
  CardPaymentsStyle,
  MenuFile,
  PreviewOportunitiesStyle,
  PreviewSalesStyle,
} from "../../../MenuInfoClient/styles";
import EmptyData from "../../../PreviewEmpty";
import LoaderPreview from "../../../LoaderPreviews";
import { AttachMoney, FiberManualRecord, MoreVert, Today } from "@material-ui/icons";
import dayjs from "dayjs";
import { Box, Button, LinearProgress, Tooltip } from "@material-ui/core";
import { formatDate, formatNumber, formatNumberNoSymbol, handleGlobalAlert, toUpperCaseChart } from "../../../../utils";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { api } from "../../../../services/api";

export default function CustomerPayments({ isFetching, payments, reloadData }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [fileSelected, setFileSelected] = useState({});
  const open = Boolean(anchorEl);
  const router = useRouter();
  const id = open ? "simple-popover" : undefined;
  const dispatch = useDispatch();
  const handleClose = () => setAnchorEl(null);

  const handleClick = (event, file) => {
    setFileSelected(file);
    setAnchorEl(event.currentTarget);
  };

  const checkPayment = async itemClient => {
    let payment = await api.get(`salespayments/${itemClient?.id}`);
    if (!payment.data.ispaid) {
      payment.data.ispaid = true;
      payment.data.paymentId = payment.data.id;
      delete payment.data.id;
      let data = { payments: [payment.data] };
      await api.put("salespayments", data);
      handleGlobalAlert("success", "Pago - Se ha confirmado el Pago, Estatus Actualizado!", "basic", dispatch, 6000);
      reloadData();
    }
  };
  const handleClickPaymentComplete = itemPayment => {
    router.push({ pathname: `/pagos/pago_completo/`, query: { i: itemPayment.id, o: itemPayment.oportunityId } });
  };
  return (
    <CardPaymentsStyle>
      {!isFetching?.payments && payments?.count <= 0 && <EmptyData />}
      {isFetching?.payments && <LoaderPreview />}
      {!isFetching?.payments &&
        payments?.results?.map((item, index) => {
          return (
            <div key={index} className="card">
              <div className="top">
                <div className="item">
                  <FiberManualRecord className="iconStatus" />
                  <Tooltip title="Ver Pago Completo">
                    <p className="dateRedirect" onClick={e => handleClickPaymentComplete(item)}>
                      Concepto: {item?.oportunity?.concept}
                    </p>
                  </Tooltip>
                </div>
                <div className="item">
                  <Today className="icon" />
                  <p className="date">Fecha Pago: {formatDate(item?.date)}.</p>
                  <Tooltip title="Opciones" arrow={true} className="menuButton">
                    <MoreVert className="options" aria-describedby={id} onClick={e => handleClick(e, item)} />
                  </Tooltip>
                  <MenuFile
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "center",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "center",
                    }}
                  >
                    <div className="container">
                      {fileSelected?.ispaid === false && (
                        <Button
                          className="option"
                          onClick={() => {
                            handleClose();
                            checkPayment(fileSelected);
                          }}
                        >
                          Marcar Como pagado
                        </Button>
                      )}
                      <Button
                        className="option"
                        onClick={() => {
                          handleClose();
                          router.push({
                            pathname: `/pagos/editarPagos/`,
                            query: { i: fileSelected.id, o: fileSelected.oportunityId },
                          });
                        }}
                      >
                        Editar
                      </Button>
                      <Button
                        className="option"
                        onClick={() => {
                          handleClose();
                          router.push({
                            pathname: `/pagos/pago_completo/`,
                            query: { i: fileSelected.id, o: fileSelected.oportunityId },
                          });
                        }}
                      >
                        Ver Pago Completo
                      </Button>
                    </div>
                  </MenuFile>
                </div>
              </div>
              <div className="itemPayment">
                <span className="span">Estado Pago: </span>{" "}
                {item?.ispaid === true ? (
                  <p className="paymentTrue"> Pagado</p>
                ) : (
                  <p className="paymentFalse"> Pendiente</p>
                )}
              </div>

              <div className="itemContainerDates">
                <span className="span"> Monto:</span>
                <p className="code"> {formatNumber(item.payment)}</p>
              </div>
              <div className="itemContainerDates">
                <span className="span">Comisión:</span>
                <p className="code"> {formatNumber(item.comission)}</p>
              </div>
              <div className="itemContainerDates">
                <span className="span">Observaciones:</span>
                {item?.observations === "" ? (
                  <span className="span">N/A</span>
                ) : (
                  <p className="code"> {item.observations.slice(0, 80)}</p>
                )}
              </div>
            </div>
          );
        })}
    </CardPaymentsStyle>
  );
}
