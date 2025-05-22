import React, { useState } from "react";
import { TableContainer, StyledTable } from "./styles";
import {
  CheckCircle,
  Cancel,
  EmojiPeople,
  VerifiedUser,
  Build,
} from "@material-ui/icons";
import { Pagination } from "@material-ui/lab";
import { formatDate } from "../../../../utils";
import { Tooltip } from "@material-ui/core";
import ModalTrainings from "../ModalTrainings";
import ModalWarranty from "../ModalWarranties";
import ModalInstallations from "../ModalInstallations";

export default function TableProductsSerialNum({
  wareproducts = [],
  paginationDataWareProducts,
  countWareProducts,
  orderData,
}) {
  const [selectedSerial, setSelectedSerial] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [warrantyModalOpen, setWarrantyModalOpen] = useState(false);
  const [selectedWarrantySerial, setSelectedWarrantySerial] = useState(null);
  const [installationModalOpen, setInstallationModalOpen] = useState(false);
  const [selectedInstallationSerial, setSelectedInstallationSerial] =
    useState(null);
  const handleOpenModal = (product) => {
    setSelectedSerial(product);
    setModalOpen(true);
  };
  const handleOpenWarrantyModal = (product) => {
    setSelectedWarrantySerial(product);
    setWarrantyModalOpen(true);
  };
  const handleOpenInstallationModal = (product) => {
    setSelectedInstallationSerial(product);
    setInstallationModalOpen(true);
  };
  return (
    <TableContainer>
      <div className="header">
        <h3>
          {countWareProducts}{" "}
          {countWareProducts === 1 ? "Producto" : "Productos"}
        </h3>
        <div className="summary"></div>
      </div>
      <ModalTrainings
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedItem={selectedSerial}
        addresssId={orderData?.address?.id}
      />
      <ModalWarranty
        warrantyModalOpen={warrantyModalOpen}
        onCloseWarranty={() => setWarrantyModalOpen(false)}
        orderSelected={selectedWarrantySerial}
      />
      <ModalInstallations
        installationModalOpen={installationModalOpen}
        onCloseInstallation={() => setInstallationModalOpen(false)}
        orderrSelected={selectedInstallationSerial}
        addreesssId={orderData?.address?.id}
      />
      <StyledTable>
        <thead>
          <tr>
            <th className="quantity-col">Nombre</th>
            <th className="price-col">Serial</th>
            <th className="product-col">Fecha de creación</th>
            <th className="quantity-col">Almacén</th>
            <th className="quantity-col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {wareproducts.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="product-info">
                  <div>
                    <div className="product-name">{product.product.name}</div>
                    <div className="product-code">{product.product.code}</div>
                  </div>
                </div>
              </td>
              <td>
                <b style={{ color: "#D11215" }}>{product.serialnumber}</b>
              </td>
              <td>{formatDate(product.createdAt)}</td>
              <td>{product.warehouseorder.warehouse.name}</td>
              <td>
                <p className="ctr_td actions">
                  <Tooltip title="Solicitar capacitación" arrow>
                    <button
                      className="icon-button-person"
                      onClick={() => handleOpenModal(product)}
                    >
                      <EmojiPeople fontSize="small" />
                    </button>
                  </Tooltip>

                  <Tooltip title="Solicitar garantía" arrow>
                    <button
                      className="icon-button-money"
                      onClick={() => handleOpenWarrantyModal(product)}
                    >
                      <VerifiedUser fontSize="small" />
                    </button>
                  </Tooltip>

                  <Tooltip title="Solicitar instalación" arrow>
                    <button
                      className="icon-button-build"
                      onClick={() => handleOpenInstallationModal(product)}
                    >
                      <Build fontSize="small" />
                    </button>
                  </Tooltip>
                </p>
              </td>
            </tr>
          ))}
          {wareproducts.length === 0 && (
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
        {paginationDataWareProducts && paginationDataWareProducts.total > 4 && (
          <Pagination
            variant="outlined"
            count={Math.ceil(
              paginationDataWareProducts.total /
                paginationDataWareProducts.limit
            )}
            onChange={(e, value) =>
              paginationDataWareProducts.handlePage(value)
            }
            size="small"
            page={paginationDataWareProducts.page}
            color="primary"
          />
        )}
      </div>
    </TableContainer>
  );
}
