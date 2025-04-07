import { Button } from "@material-ui/core";
import React from "react";
import MainLayout from "../../components/MainLayout";
import { ExecutiveOrdersStyled } from "../ExecutiveOrders/styles";
import AddressShoppingEdit from "./components/AddressShoppingEdit";
import InfoOrders from "./components/InfoOrder";
import OrderFormEdit from "./components/OrderFormEdit";
import { tabsorder } from "./data";
import useExecutiveEditOrder from "./hooks/useExecutiveEditOrder";
import useOrder from "./hooks/useOrder";
import AddProduct from "./components/AddProduct";
import AddConfirm from "./components/AddProduct/AddConfirm";
import BillingEdit from "./components/BillingEdit";
import FilesEdit from "./components/FilesEdit";
import ProductsEdit from "./components/ProductsEdit";
import ResumeOrder from "./components/ResumeOrder";
import useFiles from "./hooks/useFiles";
import useProducts from "./hooks/useProducts";
import useUpdateOrder from "./hooks/useUpdateOrder";
import LoaderCompleteScreen from "../../components/LoaderCompleteScreen";

export default function ExecutiveNewOrder() {
  const { oportunity, orderData, isFetchingOrder } = useOrder();
  const { formControls, viewControl, handleToggleBilling } = useExecutiveEditOrder(oportunity);
  const { filesData, filesControl } = useFiles(oportunity, formControls);
  const { productsData, fetchProducts, productsControl } = useProducts(oportunity);

  const { handleSaveChangesOrder, isCreatingOrder } = useUpdateOrder(
    formControls,
    productsData,
    filesData,
    orderData,
    oportunity
  );

  const views = {
    orderFormEdit: <OrderFormEdit formControls={formControls} />,
    addressShoppingEdit: <AddressShoppingEdit formControls={formControls} />,
    billingEdit: <BillingEdit formControls={formControls} handleToggleBilling={handleToggleBilling} />,
    filesEdit: <FilesEdit filesData={filesData} filesControl={filesControl} />,
    productsEdit: <ProductsEdit productsData={productsData} productsControl={productsControl} />,
    resume: <ResumeOrder productsData={productsData} formControls={formControls} filesData={filesData} />,
  };

  return (
    <MainLayout>
      <ExecutiveOrdersStyled>
        <div className="header">
          <h1>Nuevo pedido</h1>
        </div>

        {isFetchingOrder ? (
          <div>Cargando...</div>
        ) : (
          <>
            <div className="main_datalles">
              <InfoOrders
                selectedTypeSale={"sregisterss"}
                oportunity={oportunity}
                typesale={formControls.getValues("order.typesale")}
              />
            </div>

            <div className="main_orders">
              <div className="tabs">
                {tabsorder.map((item, index) => (
                  <Button
                    startIcon={item.icon}
                    key={index}
                    className="tab_option"
                    onClick={() => viewControl.setView(item.view)}
                  >
                    {item.name}
                  </Button>
                ))}
              </div>

              <div className="data">
                {views[viewControl.view] || null}

                {viewControl.view === "resume" && (
                  <div className="actions">
                    <Button variant="contained" className="btn_generate" onClick={handleSaveChangesOrder}>
                      Guardar Cambios
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
        <AddProduct
          open={productsControl.openDrawerProducts}
          toggleDrawer={productsControl.toggleDrawerProducts}
          productsControl={productsControl}
        />
        <AddConfirm
          open={productsControl.openConfirm}
          toggleDrawer={productsControl.onCloseConfirmModal}
          productsControl={productsControl}
        />
        {isCreatingOrder && <LoaderCompleteScreen />}
      </ExecutiveOrdersStyled>
    </MainLayout>
  );
}
