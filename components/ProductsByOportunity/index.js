import React from "react";
import { ProductsStyle, TableProducts } from "./style";
import NumberFormat from "react-number-format";
import LoaderPreview from "../LoaderPreviews";
import EmptyData from "../PreviewEmpty";

export default function ProductsOportunity(props) {
  const { products, fetching } = props;
  if (fetching) return <LoaderPreview />;
  if (products.length <= 0) return <EmptyData />;
  return (
    <ProductsStyle>
      <div className="products_container">
        {products.length > 0 ? (
          <TableProducts>
            <thead className="head_table">
              <tr className="row_head">
                {headsTable.map((item, index) => (
                  <th className={item.identifier ? "identifier" : "item_head"} key={index}>
                    {item.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="body_table">
              {products.map((item, index) => (
                <tr key={index}>
                  <td className="item_body name_product">{item.product.name}</td>
                  <td className="item_body center">
                    <NumberFormat
                      value={item.newprice}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                    />
                  </td>
                  <td className="item_body center">
                    <NumberFormat value={item.quantity} displayType="text" thousandSeparator="," />
                  </td>
                  <td className="item_body center">
                    <NumberFormat
                      value={item.discount}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                    />
                  </td>
                  <td className="item_body center">
                    <NumberFormat
                      value={item.total}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                    />
                  </td>
                  <td className="item_body center">
                    <NumberFormat
                      value={item.iva}
                      displayType="text"
                      thousandSeparator=","
                      prefix="$"
                      decimalScale={2}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </TableProducts>
        ) : (
          <p>Sin Productos</p>
        )}
      </div>
    </ProductsStyle>
  );
}

const headsTable = [
  { title: "Nombre del Producto", identifier: true },
  { title: "Precio", identifier: false },
  { title: "Cantidad", identifier: false },
  { title: "Descuento", identifier: false },
  { title: "Total", identifier: false },
  { title: "IVA", identifier: false },
];
