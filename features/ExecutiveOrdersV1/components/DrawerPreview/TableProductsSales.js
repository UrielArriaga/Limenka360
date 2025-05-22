import React from "react";
import { TableContainer, StyledTable } from "./styles";
import { CheckCircle, Cancel } from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";

const statusIcons = {
  true: <CheckCircle style={{ color: "green" }} />,
  false: <Cancel style={{ color: "red" }} />,
};

export default function TableProductsSales({
  products = [],
  paginationDataProducts,
  countProducts,
}) {
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableContainer>
      <div className="header">
        <h3>Productos</h3>
        <div className="summary">
          <span>
            {countProducts} {countProducts === 1 ? "producto" : "productos"}
          </span>
          <span>
            Total:{" "}
            {formatCurrency(products.reduce((sum, p) => sum + p.total, 0))}
          </span>
        </div>
      </div>

      <StyledTable>
        <thead>
          <tr>
            <th className="product-col">Nombre</th>
            <th className="price-col">Precio</th>
            <th className="quantity-col">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-info">
                  <div>
                    <div className="product-name">{product.product?.name}</div>
                    <div className="product-code">{product.product?.code}</div>
                  </div>
                </div>
              </td>
              <td>{formatCurrency(product.newprice)}</td>
              <td>{product.quantity}</td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan="7"
                style={{ textAlign: "center", padding: "15px", color: "#777" }}
              >
                No hay productos asociados.
              </td>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <div className="pagination">
        {paginationDataProducts && paginationDataProducts.total > 4 && (
          <Pagination
            variant="outlined"
            count={Math.ceil(
              paginationDataProducts.total / paginationDataProducts.limit
            )}
            onChange={(e, value) => paginationDataProducts.handlePage(value)}
            size="small"
            page={paginationDataProducts.page}
            color="primary"
          />
        )}
      </div>
    </TableContainer>
  );
}
