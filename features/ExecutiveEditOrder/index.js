import React from "react";
import MainLayout from "../../components/MainLayout";
import { EditOrderStyle } from "./style";
import { Button, Grid, IconButton } from "@material-ui/core";
import { ArrowBack, ArrowBackIos } from "@material-ui/icons";
import useEditOrder from "./hooks/useEditOrder";
import { useRouter } from "next/router";
import { tabsNewOrder } from "./data";
import OrderForm from "./components/OrderForm";
import AdressShopp from "./components/AdressShopp";
import AddressBilling from "./components/AdressBilling";
import FilesEdit from "./components/FilesEditOrder";

export default function EditOrder() {
  const router = useRouter();
  const idOrder = router.query.pe;
  const idOportunity = router.query.op;
  const { states, functions, hookActions } = useEditOrder({ idOrder, idOportunity });
  const { oportunity, step, order, requiredBill } = states;
  const { handleRefresh, handleDirectStep } = functions;
  const { setValue, register, control } = hookActions;
  const renderView = () => {
    switch (step) {
      case 1:
        return <OrderForm hookActions={hookActions} />;
      case 2:
        return <AdressShopp hookActions={hookActions} />;
      case 3:
        return <AddressBilling hookActions={hookActions} states={states} functions={functions} />;
      case 4:
        return <FilesEdit hookActions={hookActions} states={states} functions={functions} />;
      default:
        break;
    }
  };

  return (
    <MainLayout>
      <EditOrderStyle>
        <div className="main">
          <div className="content_editOrder">
            <div className="header">
              <IconButton onClick={() => router.back()} className="bt_back">
                <ArrowBack />
              </IconButton>
              <p className="title_header" onClick={() => console.log("orden", order)}>
                Editar Pedido
              </p>
            </div>
            <Grid className="data_oportunity" container spacing={2}>
              <Grid item md={12} sm={12} xs={12}>
                <p className="title_op" onClick={() => handleRefresh()}>
                  Datos de la Venta
                </p>
              </Grid>
              <Grid item md={3}>
                <p className="title_data">Concepto</p>
                <p className="data">{oportunity.concept}</p>
              </Grid>
              <Grid item md={3}>
                <p className="title_data">Monto Total</p>
                <p className="data">{oportunity.amount}</p>
              </Grid>
              <Grid item md={3}>
                <p className="title_data">Comisión</p>
                <p className="data">{oportunity.comission}</p>
              </Grid>
              <Grid item md={3}>
                <p className="title_data">Nombre de Cliente</p>
                <p className="data">{oportunity.prospect?.fullname}</p>
              </Grid>
              <Grid item md={12} sm={12} xs={12}>
                <p className="title_data">Observaciones de la Venta </p>
                <textarea className="observations" value={oportunity.observations} readOnly />
              </Grid>
            </Grid>
            <div className="body">
              <div className="tabs">
                {tabsNewOrder.map((item, index) => (
                  <Button
                    key={index}
                    startIcon={item.icon}
                    className={`tab_option ${step === item.step && "active"}`}
                    onClick={() => handleDirectStep(item.step)}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>
              <div className="content_render">{renderView()}</div>
            </div>
            <div className="buttons">
              <Button className="bt_save">Guardar Cambios</Button>
            </div>
          </div>
        </div>
      </EditOrderStyle>
    </MainLayout>
  );
}
