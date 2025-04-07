import React from "react";
import { ProductsStyle } from "./styled";
import { Button, IconButton } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import NumberFormat from "react-number-format";

export default function TableProducts({
  provider = null,
  products,
  handleEditProduct,
  handleOpenAddProduct,
  handleDeleteProduct,
  handleBlurProduct,
}) {
  return (
    <ProductsStyle>
      <table>
        <thead>
          <tr className="tr_head">
            <th className="th">Proveedor</th>
            <th className="th">Código</th>
            <th className="th">Producto</th>
            <th className="th">Cantidad</th>
            <th className="th">Precio Unit.</th>
            <th className="th">Importe</th>
            <th className="th" colSpan={2}>
              Acciones
            </th>
          </tr>
        </thead>

        <tbody className="body">
          {products?.results?.length >= 1 &&
            products?.results.map((item, index) => (
              <tr key={index} className="tr_body">
                <td className="td">{item?.provider?.companyname}</td>
                <td className="td">{item?.model}</td>
                <td className="td">{item?.name}</td>
                <td className="td">
                  <input
                    className={`input_datas ${!item.quantity && "empty"}`}
                    type="number"
                    placeholder="Agrega una cantidad"
                    onChange={e => handleEditProduct(e.target.value, "quantity", index, item)}
                    onBlur={() => handleBlurProduct("quantity", index)}
                    value={item.quantity || ""}
                    min="1"
                    step="1"
                    aria-label="Cantidad"
                    style={{ width: "100%" }}
                    inputMode="numeric"
                  />
                </td>

                <td className="td">
                  <input
                    className={`input_datas ${!item.unitprice && "empty"}`}
                    type="number"
                    placeholder="Agrega un precio"
                    onChange={e => handleEditProduct(e.target.value, "unitprice", index, item)}
                    onBlur={() => handleBlurProduct("unitprice", index)}
                    value={item.unitprice || ""}
                    min="1"
                    step="1"
                    aria-label="Precio"
                    style={{ width: "100%" }}
                    inputMode="numeric"
                  />
                  {/* <NumberFormat
                      value={item.unitprice}
                      displayType="text"
                      prefix="$"
                      fixedDecimalScale
                      thousandSeparator
                    /> */}
                  {/* <input
                      className="input_data"
                      placeholder="Agrega una cantidad"
                      onChange={e => handleEditProduct(e.target.value, "unitprice", index, item)}
                      value={item.unitprice}
                    /> */}
                </td>
                <td className="td">
                  <NumberFormat
                    value={item.amount ? item.amount : 0}
                    defaultValue={0}
                    displayType="text"
                    prefix="$ "
                    fixedDecimalScale
                    thousandSeparator
                  />
                </td>
                <td className="td">
                  <IconButton className="bt_delete" onClick={() => handleDeleteProduct(index)}>
                    <Close />
                  </IconButton>
                </td>
              </tr>
            ))}
          {products?.results?.length === 0 && (
            <tr>
              <td className="empty_products" colSpan={5}>
                No Hay Productos
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div className="buttonss">
        {provider && (
          <Button className="add" startIcon={<Add />} onClick={() => handleOpenAddProduct()}>
            Agregar Producto
          </Button>
        )}
      </div>
    </ProductsStyle>
  );
}
