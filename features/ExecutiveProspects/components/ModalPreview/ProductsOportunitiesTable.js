import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import { CheckCircle, Cancel } from "@material-ui/icons";

const statusIcons = {
  true: <CheckCircle style={{ color: "green" }} />,
  false: <Cancel style={{ color: "red" }} />,
};

export default function ProductsOportunitiesTable({
  products = [],
}) {
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  return (
    <TableContainer>
      <div className="header">
        <h2>Productos en Cotización</h2>
        <div className="summary">
          <span>
            {products.length} {products.length === 1 ? "producto" : "productos"}
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
            <th className="product-col">Producto</th>
            <th className="price-col">Precio</th>
            <th className="quantity-col">Cantidad</th>
            <th className="total-col">Total</th>
            <th className="stock-col">Stock</th>
            <th className="status-col">Estado</th>
            <th className="actions-col"></th>
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
              <td>{formatCurrency(product.total)}</td>
              <td className={product.product?.stock <= 5 ? "low-stock" : ""}>
                {product.product?.stock !== null
                  ? product.product.stock
                  : "N/A"}
              </td>
              <td>
                <div
                  className={`status ${
                    product.delivered ? "delivered" : "pending"
                  }`}
                >
                  {statusIcons[product.delivered]}
                  {product.delivered ? "Entregado" : "Pendiente"}
                </div>
              </td>
              <td className="actions-col"></td>
            </tr>
          ))}
          {products.length === 0 && (
            <tr>
              <td
                colSpan="7"
                style={{ textAlign: "center", padding: "15px", color: "#777" }}
              >
                No hay productos asociados a esta oportunidad.
              </td>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
}

const TableContainer = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    h2 {
      margin: 0;
      color: #2c3e50;
      font-size: 1.4rem;
    }

    .summary {
      display: flex;
      gap: 20px;
      font-size: 0.95rem;
      color: #7f8c8d;

      span:last-child {
        font-weight: bold;
        color: #2c3e50;
      }
    }
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;

  th {
    text-align: left;
    padding: 12px 15px;
    color: #7f8c8d;
    font-weight: 500;
    border-bottom: 2px solid #f0f0f0;
  }

  td {
    padding: 12px 15px;
    border-bottom: 1px solid #f0f0f0;
    vertical-align: middle;
  }

  .main-row {
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #f9f9f9;
    }
  }

  .details-row {
    background-color: #fafafa;

    td {
      padding: 0;
    }

    .details-container {
      padding: 15px;
    }

    .details-section {
      margin-bottom: 15px;

      h4 {
        margin: 0 0 8px 0;
        display: flex;
        align-items: center;
        gap: 8px;
        color: #555;
        font-size: 0.9rem;

        .icon {
          font-size: 18px;
          color: #1976d2;
        }
      }

      p {
        margin: 0;
        color: #666;
        font-size: 0.85rem;
        line-height: 1.5;
      }

      &.special-note {
        background-color: #fff8e1;
        padding: 12px;
        border-radius: 6px;
        border-left: 3px solid #ffb74d;

        h4 {
          color: #e65100;
        }
      }
    }

    .tags-container {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 15px;
    }
  }

  .product-col {
    width: 33%;
  }

  .price-col,
  .quantity-col,
  .total-col,
  .stock-col {
    width: 22%;
  }

  .status-col {
    width: 18%;
  }

  .actions-col {
    width: 8%;
    text-align: center;
  }

  .product-info {
    display: flex;
    align-items: center;
    gap: 12px;

    .product-icon {
      width: 36px;
      height: 36px;
      background-color: #e3f2fd;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1976d2;
    }

    .product-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .product-code {
      font-size: 0.8rem;
      color: #78909c;
      margin-top: 2px;
    }
  }

  .highlight {
    font-weight: bold;
    color: #1976d2;
  }

  .low-stock {
    color: #e53935;
    font-weight: bold;
  }

  .status {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;

    &.delivered {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    &.pending {
      background-color: #fff3e0;
      color: #f57f17;
    }
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 0.75rem;

    &.training {
      background-color: #e3f2fd;
      color: #1565c0;
    }

    &.installation {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    &.shipping {
      background-color: #fff3e0;
      color: #e65100;
    }
  }
`;
