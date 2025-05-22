import { Button } from "@material-ui/core";
import React from "react";
//import MainLayout from "../../components/MainLayout";
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
import useTourAddProducts from "./hooks/useTourAddProducts";
// import { DevTool } from "@hookform/devtools";

export default function ExecutiveEditOrderV2() {
  const { oportunity, orderData, isFetchingOrder } = useOrder();
  const { formControls, viewControl } = useExecutiveEditOrder(
    oportunity,
    orderData
  );
  const { filesData, filesControl } = useFiles(oportunity, orderData);
  const { productsData, fetchProducts, productsControl } = useProducts(
    oportunity,
    orderData
  );

  const { handleSaveChangesOrder } = useUpdateOrder(
    formControls,
    productsData,
    filesData,
    orderData
  );

  const { tourControl } = useTourAddProducts(viewControl.view);

  const views = {
    orderFormEdit: <OrderFormEdit formControls={formControls} />,
    addressShoppingEdit: <AddressShoppingEdit formControls={formControls} />,
    billingEdit: <BillingEdit formControls={formControls} />,
    filesEdit: <FilesEdit filesData={filesData} filesControl={filesControl} />,
    productsEdit: (
      <ProductsEdit
        productsData={productsData}
        productsControl={productsControl}
        tourControl={tourControl}
      />
    ),
    resume: (
      <ResumeOrder
        productsData={productsData}
        formControls={formControls}
        filesData={filesData}
      />
    ),
  };

  return (
    <ExecutiveOrdersStyled>
      <div className="header">
        <h1>Editar pedido</h1>
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
                  <Button
                    variant="contained"
                    className="btn_generate"
                    onClick={handleSaveChangesOrder}
                  >
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
    </ExecutiveOrdersStyled>
  );
}
