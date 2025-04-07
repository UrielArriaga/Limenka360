import dayjs from "dayjs";
import React from "react";

export default function ListPOrders({ orders, orderSelected, setView, setOrderSelected, productToOrderSelected }) {
  return (
    <div className="listorders">
      {orders?.data?.length == 0 && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p>No hay ordenes de compra para el proveedor {productToOrderSelected?.product?.provider?.companyname}</p>
        </div>
      )}
      {orders?.data?.map((item, index) => {
        return (
          <div key={index}>
            <div
              onClick={() => {
                console.log(item);
              }}
              className={`itemorder  ${orderSelected?.id == item.id && "selected"}`}
            >
              <div className="row">
                <div>
                  <p>{item.id}</p>
                  <p className="itemorder__item--name">{item.folio || "Folio no generado"}</p>
                  <p className="itemorder__item--date">
                    Orden de compra creada el {dayjs(item.createdAt).format("DD/MM/YYYY")}
                  </p>
                  <p>
                    Proveedor :<span className="providername">{item?.provider?.companyname}</span>
                  </p>
                </div>

                <div className="actions">
                  {/* <button onClick={() => setOrderSelected(item)}>Ver los productos de orden</button> */}
                  <button
                    onClick={() => {
                      setView("addProduct");
                      setOrderSelected(item);
                    }}
                  >
                    Agregar producto {productToOrderSelected?.product?.code} a esta orden (
                    {item?.folio || "Folio no generado"})
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
