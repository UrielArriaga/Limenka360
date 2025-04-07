import React from "react";
import { IconButton } from "@material-ui/core";
import { CheckCircle, Add } from "@material-ui/icons";
import LoadingData from "./LoadingData";

const StockStatus = ({ isDifferentRole, productOportunity, roleId, purcharseOrdersToPickups, handleClickProduct }) => {
  const isStockAvailable = productOportunity?.existStock;
  const isDomesticPurchase = productOportunity?.product?.import === false && roleId === "compras";
  const isInternationalPurchase = productOportunity?.product?.import === true && roleId === "compras_internacional";
  const isPickupDisabled = purcharseOrdersToPickups.length > 0;
  const isProductValid = productOportunity?.product?.name !== "Envio";

  const renderIconButton = () => (
    <IconButton
      disabled={isPickupDisabled}
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
    <div>
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
      {isDomesticPurchase && isProductValid && renderIconButton()}
      {isInternationalPurchase && isProductValid && (
        <div style={{ display: "flex", alignItems: "center" }}>{renderIconButton()}</div>
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
              const isDifferentRole =
                (productOportunity?.product?.import === false && roleId !== "compras") ||
                (productOportunity?.product?.import === true && roleId !== "compras_internacional");

              return (
                <tr key={index} className={isDifferentRole ? "row-different-role" : ""}>
                  <td>
                    <input
                      type="checkbox"
                      checked={purcharseOrdersToPickups.some(item => item.id === productOportunity.id)}
                      onChange={e => handleAddPurcharseOrder(e.target.checked, productOportunity)}
                      disabled={!canSelectProduct(productOportunity)}
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
                    <StockStatus
                      isDifferentRole={isDifferentRole}
                      productOportunity={productOportunity}
                      roleId={roleId}
                      purcharseOrdersToPickups={purcharseOrdersToPickups}
                      handleClickProduct={handleClickProduct}
                    />

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
