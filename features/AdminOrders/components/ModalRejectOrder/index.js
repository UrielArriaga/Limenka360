import { Button, Dialog } from "@material-ui/core";
import React from "react";
import { DialogCompleteApproved } from "./styles";
import { Warning } from "@material-ui/icons";
import Select from "react-select";
import { commonSelector } from "../../../../redux/slices/commonSlice";
import { useSelector } from "react-redux";
import useGlobalCommons from "../../../../hooks/useGlobalCommons";

export default function ModalRejectOrder({
  open,
  handletoogle,
  orderSelectedData,
  handleOnChangeReason,
  reasonSelected,
  handleOnClickReject,
  isSaving,
  // setLoaderCompleteApproved,
  // ordersApproved,
  // close,
  // loaderCompleteApproved,
  // toggleApprovedModal,
  // refetch,
  // setRefetch,
}) {
  // const dispatch = useDispatch();
  // const { id_user } = useSelector(userSelector);
  // const { socket, online } = useContext(SocketContext);

  // const approveOrder = async () => {
  //   setLoaderCompleteApproved(true);
  //   try {
  //     let bodyNewTrackingChange = {
  //       prospectId: ordersApproved?.oportunity?.prospectId,
  //       status: "5",
  //       actionId: ACTIONIDPRODUCTIONMODE,
  //       oportunityId: ordersApproved?.oportunity?.id,
  //       orderId: ordersApproved?.id,
  //       reason: `Seguimiento Automatico`,
  //       observations: `El Pedido ${ordersApproved?.folio} fue Aprobado.`,
  //       createdbyId: id_user,
  //       phaseId: PHASEIDPRODUCTIONMODE,
  //     };
  //     let data = {
  //       orderstatusId: "9eQCIBnRvc990VlJfgswanCh",
  //     };
  //     let responseApproved = await api.put(`orders/${ordersApproved?.id}`, data);
  //     if (responseApproved.status === 200) {
  //       handleGlobalAlert("success", "El estatus del pedido cambio", "basic", dispatch, 6000);
  //       toggleApprovedModal();
  //       setLoaderCompleteApproved(false);
  //       setRefetch(!refetch);
  //       sendNotifyOrder(ordersApproved);
  //       dispatch(
  //         createNewTracking({
  //           data: bodyNewTrackingChange,
  //         })
  //       );
  //     }
  //   } catch (error) {
  //     console.log("errpr", error);
  //     handleGlobalAlert("error", "Pedido - ocurrio un error al marcar como aprobado", "basic", dispatch, 6000);
  //     setLoaderCompleteApproved(false);
  //   }
  // };

  // const sendNotifyOrder = item => {
  //   console.log("item socket orden aprobada", item);
  //   socket?.emit("send_notify_individual_order", {
  //     to: item?.oportunity?.soldbyId,
  //     orderId: item?.id,
  //     type: "approve",
  //   });

  //   socket?.emit("newnotification", {
  //     orderId: item?.id,
  //     notificationtype: "pedidonuevo",
  //     message: "Pedido Nuevo aprobado por administraciòn",
  //   });
  // };

  const { orderrejected } = useSelector(commonSelector);
  const { getCatalogBy } = useGlobalCommons();

  return (
    // <Dialog >
    <DialogCompleteApproved onClose={handletoogle} open={open}>
      <div className="title">
        <Warning className="title__icon" />
        <p>¿Estás Seguro de esto?</p>
        {/* {loaderCompleteApproved && <CircularProgress className="title__loader" />} */}
      </div>

      <div className="description">
        <p className="description__message">
          El pedido con folio <span>{orderSelectedData?.folio}</span> sera marcado como rechazado
        </p>

        <div className="description__options">
          <Select
            maxMenuHeight={220}
            // className="dialogContainer__item__select"
            placeholder="Selecciona una opción"
            options={orderrejected.results}
            isLoading={orderrejected.isFetching}
            getOptionValue={option => `${option.id}`}
            getOptionLabel={option => `${option.reason}`}
            onMenuOpen={() => getCatalogBy("orderrejected")}
            onChange={handleOnChangeReason}
            value={reasonSelected}
            // onChange={e => setRejectedOptionSelected(e.id)}
            // getOptionValue={option => `${option["id"]}`}
            // getOptionLabel={option => `${toUpperCaseChart(option.reason)}`}
          />
        </div>
      </div>

      <div className="actions">
        <Button
          // disabled={loaderCompleteApproved}
          className={`actions__cancel ${"disabled"}`}
          onClick={handletoogle}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          // disabled={loaderCompleteApproved}
          className={`actions__approved ${"disabled"}`}
          onClick={handleOnClickReject}
          disabled={isSaving}
        >
          Aceptar
        </Button>
      </div>
      {/* <div className="containerBody">
          <Grid container>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <p className="content">El pedido {ordersApproved?.folio} se marcara como aprobado.</p>
                </div>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <Box m={1}></Box>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <p className="content">Datos de pedido:</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AccountBox />
                  <p className="label">Nombre Ejecutivo</p>
                </div>

                <p className="content">{toUpperCaseChart(ordersApproved?.oportunity?.soldby?.fullname)} </p>
              </div>
            </Grid>

            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Folio Pedido</p>
                </div>
                <p className="content"> {ordersApproved?.folio} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Monto Total</p>
                </div>
                <p className="content"> {ordersApproved?.oportunity?.amount} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <AttachMoney />
                  <p className="label">Comisión Total</p>
                </div>
                <p className="content"> {formatNumber(ordersApproved?.oportunity?.comission)} </p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Factura</p>
                </div>
                <p className="content">{ordersApproved?.data?.billing ? "Facturado" : "No Factura"}</p>
              </div>
            </Grid>
            <Grid item md={6}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Estado de la orden</p>
                </div>
                <p className="content">{ordersApproved?.orderstatus?.name}</p>
              </div>
            </Grid>
            <Grid item md={12}>
              <div className="column">
                <div className="row">
                  <Note />
                  <p className="label">Observaciones</p>
                </div>
                <p className="content"> {ordersApproved?.observations} </p>
              </div>
            </Grid>
          </Grid>

          <div className="buttons">
            <Button
              disabled={loaderCompleteApproved}
              className={`dialogContainer__buttons__cancel ${loaderCompleteApproved && "disabled"}`}
              color="primary"
              onClick={close}
            >
              Cancelar
            </Button>

            <Button
              disabled={loaderCompleteApproved}
              className={`dialogContainer__buttons__acept ${loaderCompleteApproved && "disabled"}`}
              color="primary"
              onClick={approveOrder}
            >
              Aceptar
            </Button>
          </div>
        </div> */}
    </DialogCompleteApproved>
    // </Dialog>
  );
}
