import React from "react";
import { IconButton } from "@material-ui/core";
import { CheckCircle, Add, FindReplace } from "@material-ui/icons";
import LoadingData from "./LoadingData";
import { MoreDaysHavePassed, getLargestNumber } from "../../utils";

const StockStatus = ({
  isDifferentRole,
  productOportunity,
  roleId,
  purcharseOrdersToPickups,
  handleClickProduct,
  isReplaced,
}) => {
  const isStockAvailable = productOportunity?.existStock;
  const isAnyPurchase =
    (productOportunity?.product?.import === true || productOportunity?.product?.import === false) &&
    roleId === "director_compras";
  const isPickupDisabled = purcharseOrdersToPickups.length > 0;
  const isProductValid = productOportunity?.product?.name !== "Envio";

  const renderIconButton = () => (
    <IconButton
      disabled={isPickupDisabled || isReplaced}
      className={isPickupDisabled ? "icnButtonDisabled" : "icnButton"}
      onClick={() => handleClickProduct(productOportunity)}
    >
      <Add className="icon" />
    </IconButton>
  );

  if (isDifferentRole) {
    return (
      <p style={{ color: "red" }} className="titleAction">
        Acciones no disponibles
      </p>
    );
  }

  return isStockAvailable ? (
    <div style={{ opacity: isReplaced ? 0.5 : 1 }}>
      <div style={{ color: "#00A86B", display: "flex", alignItems: "center" }}>
        <p>Stock suficiente</p>
        <CheckCircle />
      </div>
      {productOportunity?.totalshopping > 0 && (
        <p>Piezas agregadas a orden de compra {productOportunity?.totalshopping}</p>
      )}
    </div>
  ) : (
    <>
      {isAnyPurchase && isProductValid && (
        <div style={{ display: "flex", alignItems: "center", opacity: isReplaced ? 0.5 : 1 }}>{renderIconButton()}</div>
      )}
    </>
  );
};

const ProductTable = ({
  productsData,
  purcharseOrdersToPickups,
  handleAddPurcharseOrder,
  canSelectProduct,
  handleClickProduct,
  getSortedProductsByRole,
  roleId,
  formatNumber,
  calculateUtility,
  selectAll,
  handleSelectAll,
  onOpenReplaceDrawer,
}) => {
  const isActive = purcharseOrdersToPickups.length > 0;

  return (
    <div className="contentpreview__products">
      <table>
        <thead className={isActive ? "header-active" : "header-inactive"}>
          <tr>
            <th>
              <div className="tablehead checkboxhead">
                <input type="checkbox" checked={selectAll} onChange={e => handleSelectAll(e.target.checked)} />
              </div>
            </th>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Precio de lista</th>
            <th>Precio</th>
            <th>Utilidad</th>
            <th>Iva</th>
            <th>Subtotal</th>
            <th>Stock</th>
            <th>Estatus</th>
            <th>Plazos de Entrega</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody className="bodyTable">
          {productsData.isFetching ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>
                <LoadingData />
              </td>
            </tr>
          ) : (
            getSortedProductsByRole(productsData.results, roleId).map((productOportunity, index) => {
              const fecha = getLargestNumber(productOportunity?.deliverytime?.deliverytimes || "0");
              const resultDay = MoreDaysHavePassed(productOportunity?.createdAt, fecha);
              const isDifferentRole = roleId !== "director_compras";
              const isReplaced = productOportunity.productreplaceId !== null;

              return (
                <tr
                  key={index}
                  className={`${isDifferentRole ? "row-different-role" : ""} ${isReplaced ? "replaced-product" : ""}`}
                  style={{
                    textDecoration: isReplaced ? "line-through" : "none",
                    opacity: isReplaced ? 0.6 : 1,
                    backgroundColor: isReplaced ? "#f8f8f8" : "transparent",
                  }}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={purcharseOrdersToPickups.some(item => item.id === productOportunity.id)}
                      onChange={e => handleAddPurcharseOrder(e.target.checked, productOportunity)}
                      disabled={!canSelectProduct(productOportunity) || isReplaced}
                    />
                  </td>
                  <td>{productOportunity?.product?.code}</td>
                  <td>
                    <p>
                      {productOportunity?.product?.name}
                      <span
                        style={{
                          color:
                            (roleId === "compras" && productOportunity?.product?.import === false) ||
                            (roleId === "compras_internacional" && productOportunity?.product?.import === true)
                              ? "orange"
                              : "gray",
                          marginLeft: 4,
                        }}
                      >
                        ({productOportunity?.product?.import === true ? "Importado" : "Nacional"})
                      </span>
                    </p>
                  </td>
                  <td>{productOportunity?.product?.provider?.companyname}</td>
                  <td>{productOportunity.quantity}</td>
                  <td>{formatNumber(productOportunity?.product?.amount)}</td>
                  <td>{formatNumber(productOportunity.newprice)}</td>
                  <td>
                    <div
                      className={`tdutility ${
                        calculateUtility(productOportunity?.product?.amount, productOportunity?.newprice).valueString
                      }`}
                    >
                      {calculateUtility(productOportunity?.product?.amount, productOportunity.newprice).percent}%
                    </div>
                  </td>
                  <td>{formatNumber(productOportunity.iva)}</td>
                  <td>{formatNumber(productOportunity.total)}</td>
                  <td>{productOportunity.product.stock}</td>
                  <td>{productOportunity?.statuspoo}</td>
                  <td>
                    <div
                      className={`
                        ${productOportunity?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
                        ${productOportunity?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
                   `}
                    >
                      {productOportunity?.deliverytime?.deliverytimes || "Sin fecha"}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <StockStatus
                        isDifferentRole={isDifferentRole}
                        productOportunity={productOportunity}
                        roleId={roleId}
                        purcharseOrdersToPickups={purcharseOrdersToPickups}
                        handleClickProduct={handleClickProduct}
                        isReplaced={isReplaced}
                      />
                      {/* 
                      // * Descomentar hasta terminar ejecutivos y vista
                      {!isDifferentRole && !productOportunity?.existStock && !isReplaced && (
                        <IconButton onClick={() => onOpenReplaceDrawer(productOportunity)} title="Remplazar Producto">
                          <FindReplace style={{ color: "#E17902" }} fontSize="large" />
                        </IconButton>
                      )} */}
                    </div>

                    {/* {!isDifferentRole ? (
                      productOportunity?.existStock ? (
                        <div style={{ color: "#00A86B", display: "flex", alignItems: "center" }}>
                          <p>Stock suficiente</p>
                          <CheckCircle />
                        </div>
                      ) : (
                        <>
                          {productOportunity?.product?.import === false && roleId === "compras" && (
                            <>
                              {productOportunity?.product?.name !== "Envio" && !productOportunity?.existStock && (
                                <IconButton
                                  disabled={purcharseOrdersToPickups.length > 0}
                                  className="icnButton"
                                  onClick={() => handleClickProduct(productOportunity)}
                                >
                                  <Add className="icon" />
                                </IconButton>
                              )}
                            </>
                          )}

                          {productOportunity?.product?.import === true && roleId === "compras_internacional" && (
                            <>
                              <div style={{ display: "flex", alignItems: "center" }}>
                                {productOportunity?.product?.name !== "Envio" && !productOportunity?.existStock && (
                                  <IconButton
                                    disabled={purcharseOrdersToPickups.length > 0}
                                    className={purcharseOrdersToPickups.length > 0 ? "icnButtonDisabled" : "icnButton"}
                                    onClick={() => handleClickProduct(productOportunity)}
                                  >
                                    <Add className="icon" />
                                  </IconButton>
                                )}
                              </div>
                            </>
                          )}
                        </>
                      )
                    ) : (
                      <>
                        <p style={{ color: "red" }} className="titleAction">
                          Acciónes no disponibles
                        </p>
                      </>
                    )} */}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
