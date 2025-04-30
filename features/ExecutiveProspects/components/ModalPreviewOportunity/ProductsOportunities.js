import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import {
  LocalShipping,
  Build,
  School,
  CheckCircle,
  Cancel,
  Inventory,
  Info,
} from "@material-ui/icons";

let productsBackend = [
  {
    id: "8BKgtKdUHYudshKjzWC1bMAE",
    quantity: 1,
    discount: 0,
    dispercentage: 0,
    iva: 208,
    newprice: 1300,
    total: 1508,
    observations: "Producto frágil, manejar con cuidado",
    note: "Cliente solicita entrega antes del viernes",
    shownote: true,
    isshipped: false,
    totalorder: 0,
    isfullorder: false,
    isfullshopping: false,
    totalshopping: 0,
    deliverytimedone: null,
    shoppingstatus: "",
    delivered: false,
    trainingrequest: true,
    installationrequest: false,
    isreplace: false,
    createdAt: "2025-03-24T20:03:23.452Z",
    updatedAt: "2025-03-24T20:03:23.452Z",
    productpackageId: null,
    productreplaceId: null,
    productId: "RoNCX44XuEBn5SQrX7HEuDkk",
    oportunityId: "GgaRx3Vpix2AWjEFXwEsiTM6",
    warehouseId: null,
    companyId: "62dz3qnimTqzfPfKpt7JtOtE",
    deliverytimeId: null,
    statuspooId: null,
    product: {
      id: "RoNCX44XuEBn5SQrX7HEuDkk",
      name: "KIT DE PRIMEROS AUXILIOS MEDKIT PRO",
      amount: 1000,
      storeamount: 1100,
      callamount: 1300,
      code: "PACK01",
      import: false,
      isactive: true,
      system: false,
      description:
        "Kit profesional de primeros auxilios con 35 piezas esenciales",
      physicalstock: 12,
      stock: 10,
      stockrepair: null,
      stockapart: null,
      stockassigned: null,
      totaldollars: 0,
      length: 30,
      width: 20,
      weight: 2.5,
      height: 15,
      ispackage: true,
      stockintransit: 0,
      stocktotal: 0,
      createdAt: "2024-10-23T19:53:45.438Z",
      updatedAt: "2025-03-28T22:08:22.985Z",
      categoryId: "62d09Tuuhp22mowzna3pH002",
      brandId: "62d09Tuuhp22mowzna3pO051",
      producttypeId: "62d09Tuuhp22mowzna3pR005",
      providerId: "62d09Tuuhp22mowzna3pG050",
      companyId: "62dz3qnimTqzfPfKpt7JtOtE",
      warrantytimeId: null,
    },
  },
  // Podrías agregar más productos aquí para ver el listado completo
];

export default function ProductsOportunities({
  products = productsBackend,
  fetching,
}) {
  const formatDate = (date) => dayjs(date).format("MMMM D, YYYY");
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  return (
    <ProductsOportunitiesStyled>
      <div className="header">
        <h2>Productos en Cotización</h2>
        <div className="summary">
          <span>{products.length} productos</span>
          <span>
            Total:{" "}
            {formatCurrency(products.reduce((sum, p) => sum + p.total, 0))}
          </span>
        </div>
      </div>

      <div className="products-grid">
        {productsBackend.map((product) => (
          <ProductCard key={product.id}>
            <div className="product-header">
              <div className="product-title">
                <h3>
                  <span className="product-code">{product.product.code}</span>{" "}
                  {product.product.name}
                </h3>
              </div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">Precio unitario:</span>
                <span className="detail-value">
                  {formatCurrency(product.newprice)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cantidad:</span>
                <span className="detail-value">{product.quantity}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total:</span>
                <span className="detail-value highlight">
                  {formatCurrency(product.total)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stock disponible:</span>
                <span
                  className={`detail-value ${
                    product.product.stock < 5 ? "low-stock" : ""
                  }`}
                >
                  {product.product.stock} unidades
                </span>
              </div>
            </div>

            {product.observations && (
              <div className="product-notes">
                <div className="note-header">
                  <Info className="note-icon" />
                  <span>Observaciones</span>
                </div>
                <p>{product.observations}</p>
              </div>
            )}

            {/* <div className="product-header">
              <div className="product-image">
                <Inventory />
              </div>
              <div className="product-title">
                <h3>{product.product.name}</h3>
                <span className="product-code">{product.product.code}</span>
              </div>
              <div className="product-status">
                {product.delivered ? (
                  <span className="status delivered">
                    <CheckCircle /> Entregado
                  </span>
                ) : (
                  <span className="status pending">
                    <Cancel /> Pendiente
                  </span>
                )}
              </div>
            </div>

            <div className="product-details">
              <div className="detail-row">
                <span className="detail-label">Precio unitario:</span>
                <span className="detail-value">
                  {formatCurrency(product.newprice)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Cantidad:</span>
                <span className="detail-value">{product.quantity}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Total:</span>
                <span className="detail-value highlight">
                  {formatCurrency(product.total)}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stock disponible:</span>
                <span
                  className={`detail-value ${
                    product.product.stock < 5 ? "low-stock" : ""
                  }`}
                >
                  {product.product.stock} unidades
                </span>
              </div>
            </div>

            {product.observations && (
              <div className="product-notes">
                <div className="note-header">
                  <Info className="note-icon" />
                  <span>Observaciones</span>
                </div>
                <p>{product.observations}</p>
              </div>
            )}

            {product.note && product.shownote && (
              <div className="product-notes special">
                <div className="note-header">
                  <Info className="note-icon" />
                  <span>Nota especial</span>
                </div>
                <p>{product.note}</p>
              </div>
            )}

            <div className="product-actions">
              {product.trainingrequest && (
                <span className="action-tag training">
                  <School /> Requiere capacitación
                </span>
              )}
              {product.installationrequest && (
                <span className="action-tag installation">
                  <Build /> Requiere instalación
                </span>
              )}
              {!product.isshipped && (
                <span className="action-tag shipping">
                  <LocalShipping /> Por enviar
                </span>
              )}
            </div>

            <div className="product-footer">
              <span className="date">
                Agregado el: {formatDate(product.createdAt)}
              </span>
              <button className="details-btn">Ver detalles</button>
            </div> */}
          </ProductCard>
        ))}
      </div>
    </ProductsOportunitiesStyled>
  );
}

const ProductsOportunitiesStyled = styled.div`
  padding: 20px;
  background: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 20px;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px solid #e0e0e0;

    h2 {
      margin: 0;
      color: #2c3e50;

      font-size: 12px;
    }

    .summary {
      display: flex;
      gap: 20px;
      font-size: 0.9rem;
      color: #7f8c8d;

      span:last-child {
        font-weight: bold;
        color: #2c3e50;
      }
    }
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
  }
`;

const ProductCard = styled.div`
  /* background: white; */
  border-radius: 8px;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  /* padding: 20px; */
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
  gap: 15px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .product-header {
    display: flex;
    align-items: center;
    /* gap: 15px; */
    /* padding-bottom: 15px; */
    border-bottom: 1px solid #f0f0f0;

    .product-image {
      width: 50px;
      height: 50px;
      background: #e3f2fd;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #1976d2;

      svg {
        font-size: 28px;
      }
    }

    .product-title {
      flex: 1;

      h3 {
        margin: 0;
        font-size: 0.8rem;
        color: #2c3e50;
      }

      .product-code {
        font-size: 1rem;
        color: #7f8c8d;
        background: rgb(220, 220, 220);
        padding: 2px 8px;
        border-radius: 10px;
      }
    }

    .product-status {
      .status {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 0.8rem;
        padding: 4px 10px;
        border-radius: 12px;
        font-weight: 500;

        &.delivered {
          background: #e8f5e9;
          color: #2e7d32;
        }

        &.pending {
          background: #fff8e1;
          color: #f57f17;
        }

        svg {
          font-size: 16px;
        }
      }
    }
  }

  .product-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .detail-label {
        font-size: 0.85rem;
        color: #7f8c8d;
      }

      .detail-value {
        font-size: 0.9rem;
        font-weight: 500;
        color: #2c3e50;

        &.highlight {
          font-weight: bold;
          color: #1976d2;
        }

        &.low-stock {
          color: #e53935;
          font-weight: bold;
        }
      }
    }
  }

  .product-notes {
    background: #f5f5f5;
    border-radius: 6px;
    padding: 12px;
    font-size: 0.85rem;
    color: #555;

    &.special {
      background: #fff3e0;
      border-left: 3px solid #ff9800;
    }

    .note-header {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 5px;
      font-weight: 500;
      color: #333;

      .note-icon {
        font-size: 18px;
      }
    }

    p {
      margin: 0;
    }
  }

  .product-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .action-tag {
      display: flex;
      align-items: center;
      gap: 5px;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 12px;
      font-weight: 500;

      &.training {
        background: #e3f2fd;
        color: #1565c0;
      }

      &.installation {
        background: #e8f5e9;
        color: #2e7d32;
      }

      &.shipping {
        background: #fff3e0;
        color: #e65100;
      }

      svg {
        font-size: 14px;
      }
    }
  }

  .product-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    padding-top: 15px;
    border-top: 1px solid #f0f0f0;

    .date {
      font-size: 0.75rem;
      color: #7f8c8d;
    }

    .details-btn {
      background: none;
      border: 1px solid #1976d2;
      color: #1976d2;
      padding: 5px 15px;
      border-radius: 15px;
      font-size: 0.8rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        background: #1976d2;
        color: white;
      }
    }
  }
`;
