import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useRouter } from "next/router";
import useFetchData from "../../hooks/useFetchData.js";
import DrawerCartPort from "./components/DrawerCartPort/index.js";
import FormAddRoutes from "./components/FormAddRoutes/FormAddRoutes.js";
import ListOrders from "./components/ListOrders/index.js";
import Modal from "./components/Modal/index.js";
import useCreateRoute from "./hooks/useCreateRoute.js";
import useDepAttendantOrders from "./hooks/useDepAttendantOrders.js";
import useDepAttendantRoute from "./hooks/useDepAttendantRoute.js";
import useDrivers from "./hooks/useDrivers.js";
import useOrderById from "./hooks/useOrderById.js";
import useTemplate from "./hooks/useTemplate.js";
import useTemplateDrawer from "./hooks/useTemplateDrawer.js";
import useTransportunits from "./hooks/useTransportunits.js";
import { DepAttendantNewRouteStyled } from "./styles.js";
import { orderParams, processResponseResult } from "./utils/index.js";
import FilesUpload from "../../componentx/common/DirLog/FilesUpload/index.js";
import useDirLogFiles from "./hooks/useDirLogFiles.js";
import { useState } from "react";
import useCartPort from "./hooks/useCartPort.js";
import useAddShippingToOrders from "./hooks/useAddShippingToOrders.js";

export default function FleetChiefNewRoute() {
  const router = useRouter();
  const { orderId } = router.query;
  const [driverSelect, setDriverSelect] = useState();
  const { data: order } = useFetchData("orders", processResponseResult, orderParams(orderId));
  const { readTemplate, updateTemplates } = useTemplate();

  const {
    open,
    handleOpenDrawer,
    handleCloseDrawer,
    preview,
    zoomCount,
    emailUpdate,
    setEmailUpdate,
    handleTemplateDrawer,
    RenderSelectTemplate,
    templateData,
    finalData,
  } = useTemplateDrawer(updateTemplates, order);

  // * Drawer Logic and neew Data
  const {
    isOpenModalOrders,
    handleToggleModalOrders,
    ordersToAdd,
    handleOnChangeAddOrder,
    handleDeleteOrder,
    handleOnSubmit,
    handleSubmit,
    register,
    control,
  } = useDepAttendantOrders(productsModal);
  // console.log(ordersToAdd,"la nueva orden",);

  // * Main  hook to fetch orders and products by order
  const {
    articlesData,
    orders,
    orderSelected,
    handleOnClickSelectOrder,
    productRute,
    GetprodutinventoryExit,
    productsModal,
  } = useDepAttendantRoute(handleOnChangeAddOrder);

  const { dataDrivers } = useDrivers();
  const { dataTransportunits } = useTransportunits();
  const { dataOrder } = useOrderById(orderId);
  const { CreateRoute } = useCreateRoute();

  const { openFiles, handleToggleFiles, paginationFiles, statesFiles, actionsFiles, funtionSeleccion } = useDirLogFiles(
    dataOrder?.data
  );
  const { handleEditProduct } = useCartPort(ordersToAdd);

  const { shippingToOrders, isPackage } = useAddShippingToOrders(ordersToAdd);

  return (
    <DepAttendantNewRouteStyled>
      <FormAddRoutes
        dataTransportunits={dataTransportunits}
        dataDrivers={dataDrivers}
        order={dataOrder}
        CreateRoute={CreateRoute}
        ordersToAdd={ordersToAdd}
        handleToggleFiles={handleToggleFiles}
        handleOpenDrawer={handleOpenDrawer}
        setDriverSelect={setDriverSelect}
      />

      <ListOrders
        handleEditProduct={handleEditProduct}
        orders={shippingToOrders}
        isPackage={isPackage}
        orderSelected={orderSelected}
        handleOnClickSelectOrder={handleOnClickSelectOrder}
        funtionSeleccion={funtionSeleccion}
        handleDeleteOrder={handleDeleteOrder}
        GetprodutinventoryExit={GetprodutinventoryExit}
      />

      <Modal
        ordersToAdd={ordersToAdd}
        handleOnChangeAddOrder={handleOnChangeAddOrder}
        orders={orders}
        open={isOpenModalOrders}
        onClose={handleToggleModalOrders}
        GetprodutinventoryExit={GetprodutinventoryExit}
        productsModal={productsModal}
      />

      <div className="floatingbutton">
        <Fab
          variant="extended"
          style={{ backgroundColor: "#697987", color: "white" }}
          onClick={handleToggleModalOrders}
        >
          <Add />
          Agregar orden a ruta
        </Fab>
      </div>

      <DrawerCartPort
        dataOrder={dataOrder}
        isPackage={isPackage}
        open={open}
        onClose={handleCloseDrawer}
        finalData={finalData}
        driverSelect={driverSelect}
        productRute={productRute}
        ordersToAdd={ordersToAdd}
      />

      <FilesUpload
        open={openFiles}
        handletoogle={handleToggleFiles}
        orderData={dataOrder?.data}
        statesFiles={statesFiles}
        actionsFiles={actionsFiles}
        paginationFiles={paginationFiles}
      />
    </DepAttendantNewRouteStyled>
  );
}
