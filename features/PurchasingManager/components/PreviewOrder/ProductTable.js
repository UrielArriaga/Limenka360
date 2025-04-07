import React from "react";
import { IconButton } from "@material-ui/core";
import { CheckCircle, Add } from "@material-ui/icons";
import LoadingData from "./LoadingData";
import { MoreDaysHavePassed, getLargestNumber } from "../../utils";

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
  return (
    <div className="contentpreview__products">
      <table>
        <thead className={purcharseOrdersToPickups.length > 0 ? "header-active" : "header-inactive"}>
          <tr>
            <th>
              <div className="tablehead checkboxhead">
                <input type="checkbox" checked={selectAll} onChange={e => handleSelectAll(e.target.checked)} />
              </div>
            </th>
            <th>Producto</th>
            <th>Proveedor</th>
            <th>Cantidad</th>
            <th>Precio de lista</th>
            <th>Precio</th>
            <th>Utilidad</th>
            <th>Iva</th>
            <th>Subtotal</th>
            <th>Stock</th>
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
              return(
              <tr key={index}>
                <td>
                  <input
                    type="checkbox"
                    checked={purcharseOrdersToPickups.some(item => item.id === productOportunity.id)}
                    onChange={e => handleAddPurcharseOrder(e.target.checked, productOportunity)}
                    disabled={!canSelectProduct(productOportunity)}
                  />
                </td>
                <td>
                  <p>
                    {productOportunity?.product?.name}
                    <span
                      style={{
                        color: productOportunity?.product?.import === true ? "orange" : "gray",
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
                <td>
                  <div className={`
                        ${productOportunity?.exitstatus !== "surtido" && resultDay ? "content_day" : ""}
                        ${productOportunity?.exitstatus !== "surtido" && !resultDay ? "content_daypast" : ""}
                   `}>
                      {productOportunity?.deliverytime?.deliverytimes || "Sin fecha"}
                  </div>
                </td>
                <td>
                  {productOportunity?.existStock ? (
                    <div style={{ color: "#00A86B", display: "flex", alignItems: "center" }}>
                      <p>Stock suficiente</p>
                      <CheckCircle />
                    </div>
                  ) : (
                    <>
                      {productOportunity?.product?.import === true && (
                        <>
                          {productOportunity?.product?.name !== "Envio" && !productOportunity?.existStock && (
                            <IconButton
                              disabled={purcharseOrdersToPickups.length > 0}
                              className={purcharseOrdersToPickups.length > 0 ? "icnButtonDisabled" : "icnButton"}
                              onClick={() => handleClickProduct(productOportunity)}
                            >
                              <Add className="icon" />
                            </IconButton>
                          )}
                        </>
                      )}

                      {/*{productOportunity?.product?.import === true && (
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
                      )}*/}
                    </>
                  )}
                </td>
              </tr>
            )
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
