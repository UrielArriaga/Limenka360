import React, { useEffect } from "react";
import { TableProductsStyles } from "./style";
import { Button, Collapse, Tooltip } from "@material-ui/core";
import { headersTableProductsForm, normalizeProductsPackage } from "../../utils/normalizeOrder";
import { formatNumber } from "../../../../utils";
import useTableProducts from "../../hooks/useTableProducts";
import AddProduct from "../AddProduct";
import { Add, Close, Edit, LocalMall, MoveToInbox, Redeem, Visibility } from "@material-ui/icons";
import EditPackage from "../EditPackage";
import NumberFormat from "react-number-format";

export default function TableProducts(props) {
  const heads = headersTableProductsForm;
  const { productsData, setProductsData, hookActions } = props;
  const { states, functions } = useTableProducts({ productsData, setProductsData });
  const { packageSelected, openAddProducts, openUpdatePackage } = states;
  const { products, count } = productsData;
  const { handleSelectPackage, handleCloseAddProduct, handleCloseUpdatePackage } = functions;

  const { register, watch, setValue, setError } = hookActions;

  return (
    <TableProductsStyles>
      <button
        onClick={() => {
          console.log(productsData);
        }}
      >
        Click me
      </button>
      <div className="table_product">
        <div className="content_table">
          <table className="table" cellSpacing={0}>
            <thead className="thead">
              <tr className="tr_head">
                {heads.map((item, index) => (
                  <th className={`th ${item === "Nombre del Producto" && "principal"}`} key={index}>
                    {item}
                  </th>
                ))}
                <th className="th center">Acciones</th>
              </tr>
            </thead>
            <tbody className="tbody">
              {products.map((item, index) => (
                <tr key={index} className="tr_body">
                  <td className="td">
                    {item.product.ispackage ? (
                      <Tooltip className="icon_package" title="Viene en Paquete" arrow>
                        <Redeem />
                      </Tooltip>
                    ) : (
                      ""
                    )}
                    {item.product.name}
                    {item.product.ispackage && (
                      <div className="package_products">
                        {item.inPackage.map((item, index) => (
                          <span key={index}>-{item.name_product}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="td">
                    {item.product.code}
                    {item.product.ispackage && (
                      <div className="package_products code">
                        {item.inPackage.map((item, index) => (
                          <span key={index}>{item.code}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="td">
                    <NumberFormat value={item.quantity} displayType="text" thousandSeparator />
                    {item.product.ispackage && (
                      <div className="package_products code">
                        {item.inPackage.map((item, index) => (
                          <NumberFormat key={index} value={item.quantity} displayType="text" thousandSeparator />
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="td">
                    {formatNumber(item.newprice)}
                    {item.product.ispackage && (
                      <div className="package_products code">
                        {item.inPackage.map((item, index) => (
                          <span key={index}>{formatNumber(item.callamount)}</span>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="td">{formatNumber(item.total || 0)}</td>
                  <td className="td center">
                    {item.product.ispackage ? (
                      <>
                        <Tooltip title="Agregar Productos" onClick={() => handleSelectPackage(index, item, "add")}>
                          <Add className="icon_actions" />
                        </Tooltip>
                        <Tooltip title="Editar Paquete">
                          <Edit className="icon_actions" onClick={() => handleSelectPackage(index, item, "edit")} />
                        </Tooltip>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination"></div>
      </div>
      <div className="buttons"></div>
      <AddProduct
        open={openAddProducts}
        close={handleCloseAddProduct}
        functionsProducts={{ productsData, setProductsData }}
        packageSelected={packageSelected}
      />
      <EditPackage
        open={openUpdatePackage}
        close={handleCloseUpdatePackage}
        functionsProducts={{ productsData, setProductsData }}
        packageSelected={packageSelected}
      />
    </TableProductsStyles>
  );
}
