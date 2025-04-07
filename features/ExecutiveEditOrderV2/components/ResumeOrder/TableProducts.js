import React, { useContext, useEffect, useRef, useState } from "react";
import { TableProd } from "../ProductsForm/styles";
import { Settings, Edit, Delete, Redeem } from "@material-ui/icons";
import { Box, IconButto, Grid, Tooltip } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { quotesSelector } from "../../../../redux/slices/quotesSlice";
import NumberFormat from "react-number-format";
import { formatNumber } from "../../../../utils";
import { headersTableProductsForm } from "../../utils/normalizeOrder";

export default function TableProducts({ productsData }) {
  const heads = headersTableProductsForm;

  const { products, product = [] } = productsData;
  const [productsCotization, setProductsCotizacion] = useState([]);
  const [oportunidad, setOportunidad] = useState([]);
  const [totalShipping, seTtotalShipping] = useState(0);

  useEffect(() => {
    const totalShp = products.reduce((acc, item) => {
      return acc + item.total;
    }, 0);

    seTtotalShipping(totalShp);
  }, [products]);

  return (
    <TableProd>
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
                    {item.quantity}
                    {item.product.ispackage && (
                      <div className="package_products code">
                        {item.inPackage.map((item, index) => (
                          <span key={index}>{item.quantity}</span>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination"></div>
      </div>
    </TableProd>
  );
}
