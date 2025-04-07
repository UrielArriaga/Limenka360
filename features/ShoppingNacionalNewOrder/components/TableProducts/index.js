import React from "react";
import { ProductsStyle } from "./styles";
import { Button, IconButton } from "@material-ui/core";
import { Add, Close } from "@material-ui/icons";
import NumberFormat from "react-number-format";

export default function TableProducts({
  provider = null,
  products,
  handleEditProduct,
  handleOpenAddProduct,
  handleDeleteProduct,
}) {
  console.log("productos", products);
  return (
    <ProductsStyle>
      <div className="content_table">
        <table className="table">
          <thead className="head">
            <tr className="tr_head">
              <th className="th">Proveedor</th>
              <th className="th">Código</th>
              <th className="th">Producto</th>
              <th className="th">Cantidad</th>
              <th className="th">Precio Unit.</th>
              <th className="th">Subtotal</th>
              <th className="th">Iva</th>
              <th className="th">Importe</th>
              <th className="th">Acciones</th>
            </tr>
          </thead>
          <tbody className="body">
            {products.length >= 1 &&
              products.map((item, index) => (
                <tr key={index} className="tr_body">
                  <td className="td">{item?.provider?.companyname}</td>
                  <td className="td">{item.model}</td>
                  <td className="td">
                    <input
                      disabled
                      className={`input_data ${!item.name && "empty"}`}
                      placeholder="Agrega una Descripción"
                      onChange={e => handleEditProduct(e.target.value, "description", index)}
                      value={item.name}
                    />
                  </td>
                  <td className="td">
                    <input
                      className={`input_data ${!item.quantity && "empty"}`}
                      placeholder="Agrega una cantidad"
                      value={item.quantity}
                      type="number"
                      min={1}
                      step={1}
                      onChange={e => handleEditProduct(e.target.value, "quantity", index, item)}
                      onKeyDown={e => {
                        if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                    />
                  </td>

                  <td className="td">
                    <input
                      className={`input_data ${!item.unitprice && "empty"}`}
                      value={item.unitprice}
                      type="number"
                      min={1}
                      step={1}
                      onChange={e => handleEditProduct(e.target.value, "unitprice", index, item)}
                      onKeyDown={e => {
                        if (e.key.length === 1 && !/[0-9]/.test(e.key)) e.preventDefault();
                      }}
                    />
                  </td>
                                         <td className="td">
                    <NumberFormat
                      value={item.subtotal ? item.subtotal : 0}
                      defaultValue={0}
                      displayType="text"
                      prefix="$ "
                      fixedDecimalScale
                      thousandSeparator
                    />
                  </td>
                  <td className="td">
                    <NumberFormat
                      value={item.totalIva ? item.totalIva : 0}
                      defaultValue={0}
                      displayType="text"
                      prefix="$ "
                      fixedDecimalScale
                      thousandSeparator
                    />
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
                    <IconButton className="bt_delete" onClick={() => handleDeleteProduct(item)}>
                      <Close />
                    </IconButton>
                  </td>
                </tr>
              ))}
            {products.length === 0 && (
              <tr>
                <td className="empty_products" colSpan={6}>
                  No Hay Productos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="buttons">
        <Button className="add_product" startIcon={<Add />} onClick={() => handleOpenAddProduct()}>
          Agregar Producto
        </Button>
      </div>
    </ProductsStyle>
  );
}
