import { LocalShipping } from "@material-ui/icons";
import dayjs from "dayjs";
import React from "react";
const formatDate = date => dayjs(date).fromNow();

const NewCommentOrder = ({ notification }) => {
  return (
    <div className="content-container">
      <p className="fullname">
        <strong>{notification.metadata?.fullname} </strong> realizó nuevo comentario en el pedido
        <strong> {notification.metadata?.folio}</strong>
      </p>
      <div className="message-container">
        <p className="message">{notification?.message}</p>
      </div>
      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewPendingShopping = ({ notification }) => {
  return (
    <div className="content-container">
      <p className="fullname">
        <strong>{notification.metadata?.fullname} </strong> realizo nuevo comentario en el pedido
        <strong> {notification.metadata?.folio}</strong>
      </p>
      <div className="message-container">
        <p className="message">{notification?.message}</p>
      </div>
      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const RequestStockShopping = ({ notification }) => {
  return (
    <div className="content-container">
      <p>
        <strong>{notification.metadata?.fullname} </strong>
        Solicita stock en pedido <strong>{notification.metadata?.folio} </strong>
        de los siguientes productos
      </p>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {notification.metadata?.productcodes?.map((product, index) => (
              <tr key={index}>
                <td>{product.code}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const ReadyToCollect = ({ notification }) => {
  return (
    <div className="content-container">
      <p className="fullname">
        Orden de compra lista para recolección con folio <strong>{notification?.metadata?.folio || "N/A"} </strong>
        marcada por <strong>{notification?.metadata?.fullname || "N/A"}</strong>
      </p>
      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewInventoryTransfer = ({ notification }) => {
  return (
    <div className="content-container">
      {/* <pre>{JSON.stringify(notification, null, 2)}</pre> */}
      <p className="title">Solicitud de transferencia</p>

      <p className="description">
        Traspaso de <strong>{notification?.metadata?.warehouseexitname}</strong> a
        <strong> {notification?.metadata?.warehouseentryname}</strong> de los siguientes productos:
      </p>
      <div className="products-list">
        {notification?.metadata?.warehouseproducts?.map((product, index) => (
          <div key={index} className="product-item">
            <strong>{product.serialnumber}</strong>
          </div>
        ))}
      </div>
    </div>
    //   <small>{formatDate(notification?.metadata?.createdAt)}</small>
  );
};

const NewInventoryTransferExit = ({ notification }) => {
  return (
    <div className="content-container">
      {/* <pre>{JSON.stringify(notification, null, 2)}</pre> */}
      <p className="title">Salida de productos de transpaso con folio {notification?.metadata?.folio}</p>

      <p className="description">
        Numeros de serie de los productos en transito: {notification?.metadata?.warehouseproductstext}
      </p>
      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};
const NewInventoryTransferEntry = ({ notification }) => {
  return (
    <div className="content-container">
      {/* <pre>{JSON.stringify(notification, null, 2)}</pre> */}
      <p className="title">Transpaso completado con folio {notification?.metadata?.folio}</p>

      <p className="description">
        Traspaso de <strong>{notification?.metadata?.warehouseexitname}</strong> a
        <strong> {notification?.metadata?.warehouseentryname}</strong> de los siguientes productos:
      </p>
      <div className="products-list">
        {notification?.metadata?.warehouseproducts?.map((product, index) => (
          <div key={index} className="product-item">
            <strong>{product.serialnumber}</strong>
          </div>
        ))}
      </div>
      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewOrder = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha creado un nuevo pedido con el folio
          <strong> {notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewOrderEdit = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha editado un pedido con folio
          <strong> {notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewOrderApproved = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha
          <span style={{ color: "#4CAF50", fontWeight: "bold" }}> aprobado ✅</span> el pedido con folio
          <strong> {notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewWarehouseOrder = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha asignado un nuevo pedido con el folio{" "}
          <strong>{notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewWarehouseToSupply = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha marcado como{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#5d4037",
            }}
          >
            pedido surtido
          </span>{" "}
          el siguiente folio
          <strong> {notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewWarehouseInFloor = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha marcado como{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#5d4037",
            }}
          >
            pedido en piso
          </span>{" "}
          el siguiente folio
          <strong> {notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

const NewOrderDelivery = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha marcado como{" "}
          <span
            style={{
              fontWeight: "bold",
              color: "#5d4037",
            }}
          >
            <LocalShipping style={{ fontSize: 15, marginRight: 5 }} />
            ruta entregada{" "}
          </span>
          los siguientes folios
          <strong> {notification.metadata?.foliostext}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};
const NewOrderRejected = ({ notification }) => {
  return (
    <div className="content-container">
      <div className="description">
        <p>
          <strong>{notification.metadata?.fullname} </strong> ha
          <span
            style={{
              color: "#FF0000",
              fontWeight: "bold",
            }}
          >
            {" "}
            rechazado ❌
          </span>
          el pedido con folio
          <strong> {notification.metadata?.folio}</strong>
        </p>
      </div>

      <small>{formatDate(notification?.metadata?.createdAt)}</small>
    </div>
  );
};

export default function NotificationsContent({ notification }) {
  const { type } = notification;

  const contentNofications = {
    ready_to_collect: <ReadyToCollect notification={notification} />,
    new_comment_order: <NewCommentOrder notification={notification} />,
    new_pending_shopping: <NewPendingShopping notification={notification} />,
    request_stock_shopping: <RequestStockShopping notification={notification} />,
    new_order: <NewOrder notification={notification} />,
    new_order_edit: <NewOrderEdit notification={notification} />,
    new_inventorytransfer: <NewInventoryTransfer notification={notification} />,
    new_inventorytransfer_exit: <NewInventoryTransferExit notification={notification} />,
    new_inventorytransfer_entry: <NewInventoryTransferEntry notification={notification} />,
    new_order_approved: <NewOrderApproved notification={notification} />,
    new_order_warehouse: <NewWarehouseOrder notification={notification} />,
    new_warehouse_tosupply: <NewWarehouseToSupply notification={notification} />,
    new_warehouse_infloor: <NewWarehouseInFloor notification={notification} />,
    rejected_order: <NewOrderRejected notification={notification} />,
    new_order_delivery: <NewOrderDelivery notification={notification} />,
    notification: null,
    // Logistic
  };

  return <>{contentNofications[type]}</>;
}

// export const getColorStatusOrder = status => {
//   switch (status) {
//     case ORDERSTATUSADMINALMACEN.aprobado:
//       return {
//         bgColor: "#097a09",
//         color: "#fff",
//       };

//     case ORDERSTATUSADMINALMACEN.pendiente:
//       return {
//         bgColor: "#e5ca0a",
//         color: "#fff",
//       };

//     case ORDERSTATUSADMINALMACEN.edicion:
//       return {
//         bgColor: "#407aff",
//         color: "#fff",
//       };

//     case ORDERSTATUSADMINALMACEN.rechazado:
//       return {
//         bgColor: "#bf1818",
//         color: "#fff",
//       };

//     case ORDERSTATUSADMINALMACEN.surtir:
//       return {
//         bgColor: "rgba(255, 109, 0, 0.7)",
//         color: "#fff",
//       };

//     case ORDERSTATUSADMINALMACEN.surtido:
//       return {
//         bgColor: "#5d4037",
//         color: "#fff",
//       };

//     default:
//       return {
//         bgColor: "#ffff",
//         color: "#000",
//       };
//   }
// };
