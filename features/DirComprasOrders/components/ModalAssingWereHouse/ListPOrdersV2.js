import { Button } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import dayjs from "dayjs";
import React from "react";

export default function ListPOrders({
  orders,
  orderSelected,
  setView,
  setOrderSelected,
  paginationData,
  setIsCreatingNew,
  productToOrderSelected,
}) {
  return (
    <div className="listorders">
      <div className="infoproductselected">
        <h3 className="infoTile">
          <div>
            <p style={{color: "#103c82"}}>Proveedor: {productToOrderSelected[0]?.product?.provider?.companyname.toUpperCase()}</p>
            <p>RFC: {productToOrderSelected[0]?.product?.provider?.rfc}</p>
          </div>
          Ordenes de compra activas{" "}
          <span className="warnning">
            Estas ordenes aun no han sido enviadas al proveedor{" "}
            {productToOrderSelected[0]?.product?.provider?.companyname}
          </span>
          {orders?.data?.length == 0 && (
            <div
              style={{
                display: "flex",
                width: "100%",
              }}
            >
              <p style={{ color: "rgba(88, 88, 88, 1.3" }}>
                No hay ordenes de compra para el proveedor {productToOrderSelected[0]?.product?.provider?.companyname}
              </p>
            </div>
          )}
        </h3>
        <div className="crearnueva">
          <Button
            className="crearnueva__btn"
            color="primary"
            variant="contained"
            onClick={() => {
              setIsCreatingNew(true);
              setView("createorder");
            }}
          >
            Crear nueva orden de compra
          </Button>
        </div>
      </div>
      <div className="contentPreview">
        <div className="containerTable">
          <div className="containerTable__products">
            <div className="table">
              <div className="tableheader">
                <div className="tablehead">
                  <p>Folio</p>
                </div>
                <div className="tablehead code">
                  <p>Proveedor</p>
                </div>
                <div className="tablehead">
                  <p>Fecha de Creación</p>
                </div>
                <div className="tablehead">
                  <p>Total de Productos</p>
                </div>
                <div className="tablehead">
                  <p>Acciones</p>
                </div>
              </div>

              <div className="tablebody">
                {orders?.data?.length > 0 &&
                  orders?.data?.map((product, index) => (
                    <div key={index} className={`tablerow-container ${index % 2 === 0 ? "even-row" : "odd-row"}`}>
                      <div className="tablerow">
                        <div className="tablecell code">
                          <p>{product?.folio}</p>
                        </div>
                        <div className="tablecell code">
                          <p>{product?.provider?.companyname}</p>
                        </div>
                        <div className="tablecell code">
                          <p>{dayjs(product.createdAt).format("DD/MM/YYYY")}</p>
                        </div>
                        <div className="tablecell code">
                          <p>{product?.quantity}</p>
                        </div>
                        <div className="tablecell code">
                          <Button
                            size="small"
                            onClick={() => {
                              setView("addProduct");
                              setOrderSelected(product);
                            }}
                            className="btnAdd"
                          >
                            Agregar Productos
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                {orders?.data?.length == 0 && (
                  <p className="notExits">
                    No hay ordenes de compra para el proveedor <b>(crea una nueva)</b>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {orders?.data?.length > 0 && (
          <div className="pagination">
            <Pagination
              count={Math.ceil(paginationData.total / paginationData.limit)}
              onChange={(e, value) => paginationData.handlePagination(e, value)}
              page={paginationData.page}
              size="small"
              color="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
}
