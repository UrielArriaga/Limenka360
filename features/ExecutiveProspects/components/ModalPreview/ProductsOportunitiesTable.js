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
  ExpandMore,
  ExpandLess,
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
  {
    id: "9CKgtKdUHYudshKjzWC1bMAF",
    quantity: 2,
    discount: 100,
    dispercentage: 5,
    iva: 190,
    newprice: 1800,
    total: 3790,
    observations: "Producto con garantía extendida",
    note: "Cliente VIP - Descuento especial aplicado",
    shownote: true,
    isshipped: true,
    delivered: true,
    trainingrequest: false,
    installationrequest: true,
    product: {
      id: "SoNCX44XuEBn5SQrX7HEuDkl",
      name: "MONITOR CARDIACO PRO",
      code: "MON-2024",
      stock: 5,
      description: "Monitor cardiaco de última generación",
    },
  },
];

export default function ProductsOportunitiesTable({
  products = productsBackend,
}) {
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;
  const [expandedRows, setExpandedRows] = React.useState({});

  const toggleRow = (id) => {
    setExpandedRows((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <TableContainer>
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
