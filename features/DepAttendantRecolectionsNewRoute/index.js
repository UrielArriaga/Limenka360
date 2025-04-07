import { Fab } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { useRouter } from "next/router";
import FormAddRoutes from "./components/FormAddRoutes/FormAddRoutes.js";
import ListOrders from "./components/ListOrders/index.js";
import Modal from "./components/Modal/index.js";
import { DepAttendantNewRouteStyled } from "./styles.js";
import usePurcharseOrder from "./hooks/usePurcharseOrder.js";

const DepAttendantRecoletionsNewRoute = () => {
  const router = useRouter();
  const { o } = router.query;
  const {
    orderById,
    dataPickUp,
    dataPurcharseOrders,
    isOpenModalPurcharseOrders,
    handleToggleModalPurcharseOrders,
    handleOnChangeAddOrder,
    ordersToAdd,
    deleteOfListOrder,
    dataDrivers,
    dataTransportunits,
    handleAddPurcharseOrder,
    purcharseOrdersToPickups,
    handlePage,
    page,
    createRouteRecoleccion,
    totalProducts,
    handleAddAllPurchaseOrders
  } = usePurcharseOrder(o);

  return (
    <DepAttendantNewRouteStyled>
      <FormAddRoutes
        dataTransportunits={dataTransportunits}
        dataDrivers={dataDrivers}
        dataPickUp={dataPickUp}
        purcharseOrdersToPickups={purcharseOrdersToPickups}
        createRouteRecoleccion={createRouteRecoleccion}
        totalProducts={totalProducts}
      />

      <ListOrders
        order={orderById}
        orders={ordersToAdd}
        deleteOfListOrder={deleteOfListOrder}
        handleAddPurcharseOrder={handleAddPurcharseOrder}
        purcharseOrdersToPickups={purcharseOrdersToPickups}
        handleAddAllPurchaseOrders={handleAddAllPurchaseOrders}
      />

      <Modal
        ordersToAdd={ordersToAdd}
        handleOnChangeAddOrder={handleOnChangeAddOrder}
        orders={dataPurcharseOrders}
        open={isOpenModalPurcharseOrders}
        onClose={handleToggleModalPurcharseOrders}
        handlePage={handlePage}
        page={page}
        purcharseOrdersToPickups={purcharseOrdersToPickups}
      />

      <div className="floatingbutton">
        <Fab
          variant="extended"
          style={{ backgroundColor: "#697987", color: "white" }}
          onClick={handleToggleModalPurcharseOrders}
        >
          <Add />
          Agregar orden a Recoleccion
        </Fab>
      </div>
    </DepAttendantNewRouteStyled>
  );
};

export default DepAttendantRecoletionsNewRoute;
